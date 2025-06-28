import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const DiveCenterAdmin = () => {
  const [diveCenters, setDiveCenters] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFormEmpty, setIsFormEmpty] = useState(true);
  const [canSubmit, setCanSubmit] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    rating: "",
    totalReviews: "",
    description: "",
    features: [],
    specialties: [],
    packages: [],
  });

  const [mainImageFile, setMainImageFile] = useState(null);
  const [mainImageUrl, setMainImageUrl] = useState("");
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [galleryImageUrls, setGalleryImageUrls] = useState([]);

  const [tempFeature, setTempFeature] = useState("");
  const [tempSpecialty, setTempSpecialty] = useState("");
  const [newPackage, setNewPackage] = useState({
    name: "",
    price: "",
    duration: "",
    description: "",
  });

  const resetForm = useCallback(() => {
    setSelectedCenter(null);
    setFormData({
      name: "",
      location: "",
      rating: "",
      totalReviews: "",
      description: "",
      features: [],
      specialties: [],
      packages: [],
    });
    setMainImageFile(null);
    setMainImageUrl("");
    setGalleryFiles([]);
    setGalleryImageUrls([]);
    setTempFeature("");
    setTempSpecialty("");
    setNewPackage({
      name: "",
      price: "",
      duration: "",
      description: "",
    });
    setMessage("");
  }, []);

  const fetchDiveCenters = useCallback(async () => {
    const token = localStorage.getItem("diveme_token"); // get token fresh here

    try {
      setLoading(true);

      const res = await axios.get("http://localhost:5000/api/dive-centers", {
        headers: {
          Authorization: `Bearer ${token}`, // send full token
        },
      });

      setDiveCenters(res.data);
    } catch (err) {
      console.error(
        "Error fetching dive centers:",
        err.response || err.message || err
      );
      setMessage("Failed to load dive centers.");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 3000);
    }
  }, []);

  useEffect(() => {
    fetchDiveCenters();
  }, [fetchDiveCenters]);

  useEffect(() => {
    const requiredFieldsFilled =
      formData.name.trim() !== "" &&
      formData.location.trim() !== "" &&
      formData.description.trim() !== "";

    const formHasContent =
      formData.name !== "" ||
      formData.location !== "" ||
      formData.description !== "" ||
      formData.features.length > 0 ||
      formData.specialties.length > 0 ||
      formData.packages.length > 0 ||
      mainImageFile !== null ||
      mainImageUrl !== "" ||
      galleryFiles.length > 0 ||
      galleryImageUrls.length > 0;

    setIsFormEmpty(!formHasContent);
    setCanSubmit(requiredFieldsFilled);
  }, [formData, mainImageFile, mainImageUrl, galleryFiles, galleryImageUrls]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMainImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImageFile(file);
      setMainImageUrl(URL.createObjectURL(file));
    } else {
      setMainImageFile(null);
      setMainImageUrl("");
    }
  };

  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files);
    setGalleryFiles((prev) => [...prev, ...files]);
  };

  const removeGalleryImage = (indexToRemove, isNewFile = false) => {
    if (isNewFile) {
      setGalleryFiles((prev) => prev.filter((_, i) => i !== indexToRemove));
    } else {
      setGalleryImageUrls((prev) => prev.filter((_, i) => i !== indexToRemove));
    }
  };

  const addFeature = () => {
    if (tempFeature.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, tempFeature.trim()],
      }));
      setTempFeature("");
    }
  };

  const removeFeature = (index) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const addSpecialty = () => {
    if (tempSpecialty.trim()) {
      setFormData((prev) => ({
        ...prev,
        specialties: [...prev.specialties, tempSpecialty.trim()],
      }));
      setTempSpecialty("");
    }
  };

  const removeSpecialty = (index) => {
    setFormData((prev) => ({
      ...prev,
      specialties: prev.specialties.filter((_, i) => i !== index),
    }));
  };

  const addPackage = () => {
    if (newPackage.name.trim() && newPackage.price.trim()) {
      setFormData((prev) => ({
        ...prev,
        packages: [...prev.packages, { ...newPackage, id: Date.now() }],
      }));
      setNewPackage({
        name: "",
        price: "",
        duration: "",
        description: "",
      });
    }
  };

  const removePackage = (id) => {
    setFormData((prev) => ({
      ...prev,
      packages: prev.packages.filter((pkg) => pkg.id !== id && pkg._id !== id),
    }));
  };

  const handleEdit = (center) => {
    setSelectedCenter(center);
    setFormData({
      name: center.name || "",
      location: center.location || "",
      rating: center.rating || "",
      totalReviews: center.totalReviews || "",
      description: center.description || "",
      features: [...(center.features || [])],
      specialties: [...(center.specialties || [])],
      packages: [...(center.packages || [])],
    });
    setMainImageUrl(center.mainImage || "");
    setMainImageFile(null);
    setGalleryImageUrls([...(center.gallery || [])]);
    setGalleryFiles([]);
    setTempFeature("");
    setTempSpecialty("");
    setNewPackage({
      name: "",
      price: "",
      duration: "",
      description: "",
    });
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("diveme_token");
    console.log("Sending token:", token); // DEBUG: check token here

    if (!token) {
      setMessage("You are not logged in. Please login first.");
      return;
    }

    if (!canSubmit) {
      setMessage(
        "Please fill in all required fields (Name, Location, and Description) before submitting."
      );
      return;
    }

    setLoading(true);

    const form = new FormData();
    form.append("name", formData.name);
    form.append("location", formData.location);
    form.append("rating", formData.rating);
    form.append("totalReviews", formData.totalReviews);
    form.append("description", formData.description);

    formData.features.forEach((feature) => {
      form.append("features", feature);
    });
    formData.specialties.forEach((specialty) => {
      form.append("specialties", specialty);
    });
    formData.packages.forEach((pkg) => {
      form.append("packages", JSON.stringify(pkg));
    });

    if (mainImageFile) {
      form.append("mainImage", mainImageFile);
    }
    galleryFiles.forEach((file) => {
      form.append("gallery", file);
    });
    galleryImageUrls.forEach((url) => {
      form.append("existingGalleryUrls", url);
    });

    try {
      if (selectedCenter) {
        await axios.put(
          `http://localhost:5000/api/dive-centers/${selectedCenter._id}`,
          form,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`, // << token here!
            },
          }
        );
        setMessage("Dive center updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/dive-centers", form, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // << token here too!
          },
        });
        setMessage("Dive center created successfully!");
      }
      resetForm();
      fetchDiveCenters();
    } catch (err) {
      console.error(
        "Error submitting form:",
        err.response ? err.response.data : err.message
      );
      setMessage(
        err.response?.data?.message || "Error submitting dive center."
      );
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this dive center?")) {
      try {
        setLoading(true);
        await axios.delete(`http://localhost:5000/api/dive-centers/${id}`);
        setMessage("Dive center deleted successfully!");
        fetchDiveCenters();
        if (selectedCenter && selectedCenter._id === id) {
          resetForm();
        }
      } catch (err) {
        console.error("Error deleting dive center:", err);
        setMessage("Failed to delete dive center.");
      } finally {
        setLoading(false);
        setTimeout(() => setMessage(""), 3000);
      }
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Dive Center Admin Panel</h1>

      {loading && (
        <div style={styles.overlay}>
          <div style={styles.spinner}></div>
        </div>
      )}

      {message && (
        <div
          style={{
            ...styles.messageBox,
            backgroundColor: message.includes("successfully")
              ? "#d4edda"
              : "#f8d7da",
            color: message.includes("successfully") ? "#155724" : "#721c24",
            borderColor: message.includes("successfully")
              ? "#c3e6cb"
              : "#f5c6cb",
          }}
        >
          {message}
        </div>
      )}

      <div style={styles.contentWrapper}>
        <div style={styles.formContainer}>
          <h2 style={styles.subHeading}>
            {selectedCenter ? "Edit Dive Center" : "Create New Dive Center"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Location:</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Rating (e.g., 4.5):</label>
              <input
                type="number"
                step="0.1"
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Total Reviews:</label>
              <input
                type="number"
                name="totalReviews"
                value={formData.totalReviews}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Description:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows="5"
                style={styles.textarea}
              ></textarea>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Main Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleMainImageUpload}
                style={styles.fileInput}
              />
              {mainImageUrl && (
                <div style={styles.imagePreviewContainer}>
                  <img
                    src={mainImageUrl}
                    alt="Main Preview"
                    style={styles.imagePreview}
                  />
                </div>
              )}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Gallery Images:</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleGalleryUpload}
                style={styles.fileInput}
              />
              <div style={styles.galleryPreviewContainer}>
                {galleryImageUrls.map((url, index) => (
                  <div
                    key={`existing-${url}`}
                    style={styles.galleryImageWrapper}
                  >
                    <img
                      src={url}
                      alt={`Gallery ${index}`}
                      style={styles.galleryImage}
                    />
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(index, false)}
                      style={styles.removeImageButton}
                    >
                      &#x2715;
                    </button>
                  </div>
                ))}
                {galleryFiles.map((file, index) => (
                  <div
                    key={`new-${file.name}-${index}`}
                    style={styles.galleryImageWrapper}
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`New Gallery ${index}`}
                      style={styles.galleryImage}
                    />
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(index, true)}
                      style={styles.removeImageButton}
                    >
                      &#x2715;
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Features:</label>
              <div style={styles.addItemGroup}>
                <input
                  type="text"
                  value={tempFeature}
                  onChange={(e) => setTempFeature(e.target.value)}
                  placeholder="Add a feature"
                  style={styles.input}
                />
                <button
                  type="button"
                  onClick={addFeature}
                  style={styles.addButton}
                >
                  Add
                </button>
              </div>
              <div style={styles.tagsContainer}>
                {formData.features.map((feature, index) => (
                  <span key={index} style={styles.tag}>
                    {feature}
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      style={styles.removeTagButton}
                    >
                      &#x2715;
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Specialties:</label>
              <div style={styles.addItemGroup}>
                <input
                  type="text"
                  value={tempSpecialty}
                  onChange={(e) => setTempSpecialty(e.target.value)}
                  placeholder="Add a specialty"
                  style={styles.input}
                />
                <button
                  type="button"
                  onClick={addSpecialty}
                  style={styles.addButton}
                >
                  Add
                </button>
              </div>
              <div style={styles.tagsContainer}>
                {formData.specialties.map((specialty, index) => (
                  <span key={index} style={styles.tag}>
                    {specialty}
                    <button
                      type="button"
                      onClick={() => removeSpecialty(index)}
                      style={styles.removeTagButton}
                    >
                      &#x2715;
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Packages:</label>
              <div style={styles.packageForm}>
                <input
                  type="text"
                  name="name"
                  value={newPackage.name}
                  onChange={(e) =>
                    setNewPackage({ ...newPackage, name: e.target.value })
                  }
                  placeholder="Package Name"
                  style={styles.input}
                />
                <input
                  type="text"
                  name="price"
                  value={newPackage.price}
                  onChange={(e) =>
                    setNewPackage({ ...newPackage, price: e.target.value })
                  }
                  placeholder="Price"
                  style={styles.input}
                />
                <input
                  type="text"
                  name="duration"
                  value={newPackage.duration}
                  onChange={(e) =>
                    setNewPackage({ ...newPackage, duration: e.target.value })
                  }
                  placeholder="Duration (e.g., 3 Days/2 Nights)"
                  style={styles.input}
                />
                <textarea
                  name="description"
                  value={newPackage.description}
                  onChange={(e) =>
                    setNewPackage({
                      ...newPackage,
                      description: e.target.value,
                    })
                  }
                  placeholder="Package Description"
                  rows="3"
                  style={styles.textarea}
                ></textarea>
                <button
                  type="button"
                  onClick={addPackage}
                  style={styles.primaryButton}
                >
                  Add Package
                </button>
              </div>
              <div style={styles.packagesList}>
                {formData.packages.map((pkg) => (
                  <div key={pkg._id || pkg.id} style={styles.packageItem}>
                    <strong>{pkg.name}</strong> - {pkg.price}
                    {pkg.duration && ` (${pkg.duration})`}
                    <p style={styles.packageDescription}>{pkg.description}</p>
                    <button
                      type="button"
                      onClick={() => removePackage(pkg._id || pkg.id)}
                      style={styles.removePackageButton}
                    >
                      &#x2715;
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div style={styles.buttonGroup}>
              <button
                type="submit"
                disabled={!canSubmit || loading}
                style={
                  canSubmit && !loading
                    ? styles.submitButton
                    : styles.disabledButton
                }
              >
                {selectedCenter ? "Update Dive Center" : "Create Dive Center"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                disabled={isFormEmpty && !selectedCenter}
                style={
                  isFormEmpty && !selectedCenter
                    ? styles.disabledButton
                    : styles.cancelButton
                }
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        <div style={styles.listContainer}>
          <h2 style={styles.subHeading}>Existing Dive Centers</h2>
          <ul style={styles.ul}>
            {diveCenters.map((center) => (
              <li
                key={center._id}
                style={{
                  ...styles.listItem,
                  backgroundColor:
                    selectedCenter?._id === center._id ? "#e6f7ff" : "white",
                  borderColor:
                    selectedCenter?._id === center._id ? "#91d5ff" : "#eee",
                }}
              >
                <div>
                  <strong style={styles.centerName}>{center.name}</strong> -{" "}
                  {center.location}
                  <p style={styles.centerDetails}>
                    Rating: {center.rating} ({center.totalReviews} reviews)
                  </p>
                </div>
                <div style={styles.listItemActions}>
                  <button
                    onClick={() => handleEdit(center)}
                    style={styles.editButton}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(center._id)}
                    style={styles.deleteButton}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "30px",
    maxWidth: "1400px",
    margin: "60px auto",
    backgroundColor: "#f4f7f6",
    borderRadius: "12px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
    position: "relative",
  },
  heading: {
    textAlign: "center",
    color: "#2c3e50",
    marginBottom: "30px",
    fontSize: "2.5em",
    fontWeight: "600",
  },
  messageBox: {
    padding: "12px 20px",
    marginBottom: "25px",
    borderRadius: "8px",
    border: "1px solid",
    fontWeight: "bold",
    textAlign: "center",
    position: "relative",
    zIndex: 100,
  },
  contentWrapper: {
    display: "flex",
    gap: "30px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  formContainer: {
    flex: "1",
    minWidth: "450px",
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
    border: "1px solid #e0e0e0",
  },
  listContainer: {
    flex: "1",
    minWidth: "450px",
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
    border: "1px solid #e0e0e0",
  },
  subHeading: {
    color: "#34495e",
    marginBottom: "25px",
    fontSize: "1.8em",
    borderBottom: "2px solid #e9ecef",
    paddingBottom: "10px",
  },
  formGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    color: "#555",
    fontWeight: "500",
    fontSize: "0.95em",
  },
  input: {
    width: "calc(100% - 24px)",
    padding: "12px",
    border: "1px solid #ced4da",
    borderRadius: "6px",
    fontSize: "1em",
    transition: "border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
  },
  textarea: {
    width: "calc(100% - 24px)",
    padding: "12px",
    border: "1px solid #ced4da",
    borderRadius: "6px",
    fontSize: "1em",
    resize: "vertical",
    minHeight: "100px",
    transition: "border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
  },
  fileInput: {
    display: "block",
    width: "100%",
    padding: "8px 0",
    marginBottom: "10px",
  },
  imagePreviewContainer: {
    marginTop: "15px",
    border: "1px dashed #ced4da",
    padding: "10px",
    borderRadius: "8px",
    display: "inline-block",
  },
  imagePreview: {
    maxWidth: "180px",
    maxHeight: "180px",
    objectFit: "contain",
    borderRadius: "6px",
  },
  galleryPreviewContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    marginTop: "15px",
    padding: "10px",
    border: "1px dashed #ced4da",
    borderRadius: "8px",
    minHeight: "120px",
    alignItems: "center",
  },
  galleryImageWrapper: {
    position: "relative",
    width: "100px",
    height: "100px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    overflow: "hidden",
  },
  galleryImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  removeImageButton: {
    position: "absolute",
    top: "3px",
    right: "3px",
    backgroundColor: "rgba(220, 53, 69, 0.85)",
    color: "white",
    border: "none",
    borderRadius: "50%",
    width: "24px",
    height: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.9em",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  addItemGroup: {
    display: "flex",
    gap: "10px",
    marginBottom: "10px",
  },
  addButton: {
    padding: "10px 18px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "1em",
    transition: "background-color 0.2s",
  },
  tagsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    paddingTop: "5px",
  },
  tag: {
    backgroundColor: "#e9ecef",
    color: "#495057",
    padding: "7px 12px",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    gap: "7px",
    fontSize: "0.9em",
    fontWeight: "500",
  },
  removeTagButton: {
    background: "none",
    border: "none",
    color: "#6c757d",
    cursor: "pointer",
    fontSize: "1em",
    transition: "color 0.2s",
  },
  packageForm: {
    border: "1px dashed #a0aec0",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "15px",
    backgroundColor: "#fdfdfd",
  },
  packagesList: {
    borderTop: "1px solid #e9ecef",
    paddingTop: "15px",
  },
  packageItem: {
    backgroundColor: "#f2f7fb",
    padding: "12px 15px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "1px solid #e0e6ed",
    position: "relative",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  },
  packageDescription: {
    fontSize: "0.9em",
    color: "#6c757d",
    marginTop: "5px",
    lineHeight: "1.5",
  },
  removePackageButton: {
    position: "absolute",
    top: "8px",
    right: "8px",
    backgroundColor: "transparent",
    border: "none",
    color: "#dc3545",
    cursor: "pointer",
    fontSize: "1.1em",
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
    marginTop: "20px",
    justifyContent: "flex-end",
  },
  primaryButton: {
    padding: "12px 25px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "1em",
    fontWeight: "500",
    transition: "background-color 0.2s",
  },
  submitButton: {
    padding: "12px 25px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "1em",
    fontWeight: "500",
    transition: "background-color 0.2s",
  },
  cancelButton: {
    padding: "12px 25px",
    backgroundColor: "#6c757d",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "1em",
    fontWeight: "500",
    transition: "background-color 0.2s",
  },
  disabledButton: {
    padding: "12px 25px",
    backgroundColor: "#cce5ff",
    color: "#6699ff",
    border: "none",
    borderRadius: "6px",
    cursor: "not-allowed",
    fontSize: "1em",
    fontWeight: "500",
  },
  ul: {
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    border: "1px solid #eee",
    padding: "18px 20px",
    marginBottom: "12px",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    transition: "background-color 0.2s, border-color 0.2s",
    boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
  },
  centerName: {
    fontSize: "1.15em",
    color: "#333",
    marginBottom: "5px",
    display: "block",
  },
  centerDetails: {
    fontSize: "0.9em",
    color: "#666",
    margin: 0,
  },
  listItemActions: {
    display: "flex",
    gap: "8px",
  },
  editButton: {
    padding: "8px 15px",
    backgroundColor: "#ffc107",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.9em",
    transition: "background-color 0.2s",
  },
  deleteButton: {
    padding: "8px 15px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.9em",
    transition: "background-color 0.2s",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
    backdropFilter: "blur(5px)",
  },
  spinner: {
    border: "8px solid #f3f3f3",
    borderTop: "8px solid #3498db",
    borderRadius: "50%",
    width: "60px",
    height: "60px",
    animation: "spin 1s linear infinite",
  },
};

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`;
document.head.appendChild(styleSheet);

export default DiveCenterAdmin;
