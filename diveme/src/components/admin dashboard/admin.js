import React, { useState, useEffect } from 'react';

const DiveCenterAdmin = () => {
  const [diveCenters, setDiveCenters] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [message, setMessage] = useState('');
  const [isFormEmpty, setIsFormEmpty] = useState(true);
  const [canSubmit, setCanSubmit] = useState(false);

  // Form data with all fields
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    rating: '',
    totalReviews: '',
    description: '',
    features: [],
    specialties: [],
    packages: [],
    mainImage: '',
    gallery: []
  });

  // Temporary input states
  const [tempFeature, setTempFeature] = useState('');
  const [tempSpecialty, setTempSpecialty] = useState('');
  const [newPackage, setNewPackage] = useState({
    name: '',
    price: '',
    duration: '',
    description: ''
  });

  // Check if form is empty and can be submitted
  useEffect(() => {
    const isEmpty = 
      formData.name === '' &&
      formData.location === '' &&
      formData.description === '' &&
      formData.features.length === 0 &&
      formData.specialties.length === 0 &&
      formData.packages.length === 0 &&
      formData.mainImage === '' &&
      formData.gallery.length === 0;
    
    const canSubmitForm = formData.name.trim() !== '' && 
                         formData.location.trim() !== '' && 
                         formData.description.trim() !== '';
    
    setIsFormEmpty(isEmpty);
    setCanSubmit(canSubmitForm);
  }, [formData]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, mainImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle gallery images upload
  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files);
    const newGallery = [...formData.gallery];
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newGallery.push(reader.result);
        setFormData(prev => ({ ...prev, gallery: newGallery }));
      };
      reader.readAsDataURL(file);
    });
  };

  // Add feature
  const addFeature = () => {
    if (tempFeature.trim()) {
      setFormData(prev => ({ 
        ...prev, 
        features: [...prev.features, tempFeature.trim()] 
      }));
      setTempFeature('');
    }
  };

  // Remove feature
  const removeFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  // Add specialty
  const addSpecialty = () => {
    if (tempSpecialty.trim()) {
      setFormData(prev => ({ 
        ...prev, 
        specialties: [...prev.specialties, tempSpecialty.trim()] 
      }));
      setTempSpecialty('');
    }
  };

  // Remove specialty
  const removeSpecialty = (index) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.filter((_, i) => i !== index)
    }));
  };

  // Add package
  const addPackage = () => {
    if (newPackage.name && newPackage.price) {
      setFormData(prev => ({
        ...prev,
        packages: [...prev.packages, { ...newPackage, id: Date.now() }]
      }));
      setNewPackage({
        name: '',
        price: '',
        duration: '',
        description: ''
      });
    }
  };

  // Remove package
  const removePackage = (id) => {
    setFormData(prev => ({
      ...prev,
      packages: prev.packages.filter(pkg => pkg.id !== id)
    }));
  };

  // Edit existing center
  const handleEdit = (center) => {
    setSelectedCenter(center);
    setFormData({
      name: center.name,
      location: center.location,
      rating: center.rating,
      totalReviews: center.totalReviews,
      description: center.description,
      features: [...center.features],
      specialties: [...center.specialties],
      packages: [...center.packages],
      mainImage: center.mainImage,
      gallery: [...center.gallery]
    });
  };

  // Reset form
  const resetForm = () => {
    setSelectedCenter(null);
    setFormData({
      name: '',
      location: '',
      rating: '',
      totalReviews: '',
      description: '',
      features: [],
      specialties: [],
      packages: [],
      mainImage: '',
      gallery: []
    });
  };

  // Submit form
  const handleSubmit = () => {
    // Validate required fields
    if (!formData.name || !formData.location || !formData.description) {
      setMessage('Please fill in all required fields');
      setTimeout(() => setMessage(''), 3000);
      return;
    }
    
    if (selectedCenter) {
      // Update existing center
      setDiveCenters(prev =>
        prev.map(center =>
          center.id === selectedCenter.id ? { ...formData, id: selectedCenter.id } : center
        )
      );
      setMessage('Dive center updated successfully');
    } else {
      // Add new center
      const newCenter = {
        ...formData,
        id: Date.now(),
        reviews: []
      };
      setDiveCenters(prev => [...prev, newCenter]);
      setMessage('Dive center added successfully');
    }
    
    setTimeout(() => setMessage(''), 3000);
    resetForm();
  };
  };

export default DiveCenterAdmin;