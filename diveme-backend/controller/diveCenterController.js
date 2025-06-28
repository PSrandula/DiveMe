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
