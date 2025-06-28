const DiveCenter = require("../model/DiveCenter");

const parseArrayField = (field) => {
  if (!field) return [];
  if (Array.isArray(field)) {
    return field.map((item) => item.trim()).filter((item) => item !== "");
  }
  if (typeof field === "string") {
    return field
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "");
  }
  return [];
};

const parsePackagesField = (packagesField) => {
  if (!packagesField) return [];
  let parsedPackages = [];
  if (typeof packagesField === "string") {
    try {
      const tempPackages = JSON.parse(packagesField);
      if (Array.isArray(tempPackages)) {
        parsedPackages = tempPackages.filter(
          (pkg) => typeof pkg === "object" && pkg !== null
        );
      } else if (typeof tempPackages === "object" && tempPackages !== null) {
        parsedPackages = [tempPackages];
      }
    } catch (e) {
      console.error("Error parsing package string:", packagesField, e);
    }
  } else if (Array.isArray(packagesField)) {
    parsedPackages = packagesField
      .map((pkgString) => {
        try {
          return JSON.parse(pkgString);
        } catch (e) {
          console.error(
            "Error parsing package string from array:",
            pkgString,
            e
          );
          return null;
        }
      })
      .filter((pkg) => pkg !== null);
  }
  return parsedPackages.map((pkg) => {
    const { id, ...rest } = pkg;
    return { ...rest, _id: pkg._id || undefined };
  });
};

const getPublicIdFromCloudinaryUrl = (url) => {
  if (!url) return null;
  const parts = url.split("/");
  const uploadIndex = parts.indexOf("upload");
  if (uploadIndex === -1 || uploadIndex + 1 >= parts.length) return null;

  let publicIdParts = parts.slice(uploadIndex + 1);

  if (publicIdParts[0].startsWith("v") && publicIdParts[0].length > 1) {
    publicIdParts = publicIdParts.slice(1);
  }

  const lastPart = publicIdParts[publicIdParts.length - 1];
  const filenameWithoutExt = lastPart.split(".")[0];

  publicIdParts[publicIdParts.length - 1] = filenameWithoutExt;

  return publicIdParts.join("/");
};

exports.getAllCenters = async (req, res) => {
  try {
    const diveCenters = await DiveCenter.find({});
    res.status(200).json(diveCenters);
  } catch (error) {
    console.error("Get Dive Centers Error:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.getAllDiveCenters = async (req, res) => {
  try {
    const diveCenters = await DiveCenter.find({ adminId: req.user._id });
    res.status(200).json(diveCenters);
  } catch (error) {
    console.error("Get Dive Centers Error:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.getDiveCenterById = async (req, res) => {
  try {
    const center = await DiveCenter.findById(req.params.id);
    if (!center)
      return res.status(404).json({ message: "Dive center not found" });
    res.status(200).json(center);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createDiveCenter = async (req, res) => {
  try {
    const { name, location, rating, totalReviews, description } = req.body;

    const parsedFeatures = parseArrayField(req.body.features);
    const parsedSpecialties = parseArrayField(req.body.specialties);
    const parsedPackages = parsePackagesField(req.body.packages);

    const mainImageUrl = req.files?.mainImage?.[0]?.path || "";
    const galleryUrls = req.files?.gallery?.map((file) => file.path) || [];

    console.log("Main image URL:", mainImageUrl);
    console.log("Gallery URLs:", galleryUrls);

    const newCenter = new DiveCenter({
      name,
      location,
      rating: parseFloat(rating) || 0,
      totalReviews: parseInt(totalReviews) || 0,
      description,
      features: parsedFeatures,
      specialties: parsedSpecialties,
      packages: parsedPackages,
      mainImage: mainImageUrl,
      gallery: galleryUrls,
      reviews: [],
      adminId: req.user._id,
    });

    await newCenter.save();

    res.status(201).json(newCenter);
  } catch (error) {
    console.error("Error creating dive center:", error);
    if (error.name === "ValidationError") {
      res.status(400).json({ message: error.message, errors: error.errors });
    } else {
      res
        .status(400)
        .json({ message: error.message || "Failed to create dive center." });
    }
  }
};

exports.updateDiveCenter = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    if (req.body.features) {
      updates.features = parseArrayField(req.body.features);
    } else {
      updates.features = [];
    }

    if (req.body.specialties) {
      updates.specialties = parseArrayField(req.body.specialties);
    } else {
      updates.specialties = [];
    }

    updates.packages = parsePackagesField(req.body.packages);

    const existingCenter = await DiveCenter.findById(id);
    if (!existingCenter) {
      return res.status(404).json({ error: "Dive Center not found" });
    }

    if (req.files?.mainImage?.[0]) {
      if (existingCenter.mainImage) {
        const publicId = getPublicIdFromCloudinaryUrl(existingCenter.mainImage);
        if (publicId) {
          await cloudinary.uploader.destroy(publicId, (error, result) => {
            if (error)
              console.error("Cloudinary deletion error for main image:", error);
          });
        }
      }
      updates.mainImage = req.files.mainImage[0].path;
    }

    const newGalleryUrls = req.files?.gallery?.map((file) => file.path) || [];

    const existingGalleryUrlsFromFrontend = Array.isArray(
      req.body.existingGalleryUrls
    )
      ? req.body.existingGalleryUrls
      : req.body.existingGalleryUrls
      ? [req.body.existingGalleryUrls]
      : [];

    const imagesToDeleteFromCloudinary = existingCenter.gallery.filter(
      (url) => !existingGalleryUrlsFromFrontend.includes(url)
    );

    for (const url of imagesToDeleteFromCloudinary) {
      const publicId = getPublicIdFromCloudinaryUrl(url);
      if (publicId) {
        await cloudinary.uploader.destroy(publicId, (error, result) => {
          if (error)
            console.error(
              "Cloudinary deletion error for gallery image:",
              error
            );
        });
      }
    }

    updates.gallery = [...existingGalleryUrlsFromFrontend, ...newGalleryUrls];

    if (updates.rating !== undefined)
      updates.rating = parseFloat(updates.rating) || 0;
    if (updates.totalReviews !== undefined)
      updates.totalReviews = parseInt(updates.totalReviews) || 0;

    const updated = await DiveCenter.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updated)
      return res.status(404).json({ error: "Dive Center not found" });
    res.json(updated);
  } catch (err) {
    console.error("Error updating dive center:", err);
    if (err.name === "ValidationError") {
      res.status(400).json({ message: err.message, errors: err.errors });
    } else {
      res
        .status(400)
        .json({ error: err.message || "Failed to update dive center." });
    }
  }
};

exports.deleteDiveCenter = async (req, res) => {
  try {
    const deletedCenter = await DiveCenter.findByIdAndDelete(req.params.id);
    if (!deletedCenter)
      return res.status(404).json({ error: "Dive Center not found" });

    if (deletedCenter.mainImage) {
      const publicId = getPublicIdFromCloudinaryUrl(deletedCenter.mainImage);
      if (publicId) {
        await cloudinary.uploader.destroy(publicId, (error, result) => {
          if (error)
            console.error("Cloudinary deletion error for main image:", error);
        });
      }
    }
    for (const imagePath of deletedCenter.gallery) {
      const publicId = getPublicIdFromCloudinaryUrl(imagePath);
      if (publicId) {
        await cloudinary.uploader.destroy(publicId, (error, result) => {
          if (error)
            console.error(
              "Cloudinary deletion error for gallery image:",
              error
            );
        });
      }
    }

    res.json({ message: "Dive Center deleted" });
  } catch (err) {
    console.error("Error deleting dive center:", err);
    res.status(500).json({ error: err.message });
  }
};
