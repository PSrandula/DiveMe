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
