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

  // Styles object
  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem',
      paddingTop: '100px',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh'
    },
    title: {
      color: '#2c3e50',
      textAlign: 'center',
      marginBottom: '2rem',
      fontSize: '2.2rem',
      fontWeight: 'bold'
    },
    alert: {
      padding: '1rem',
      borderRadius: '8px',
      marginBottom: '1.5rem',
      fontWeight: '500',
      textAlign: 'center'
    },
    alertSuccess: {
      backgroundColor: '#d4edda',
      color: '#155724',
      border: '1px solid #c3e6cb'
    },
    alertError: {
      backgroundColor: '#f8d7da',
      color: '#721c24',
      border: '1px solid #f5c6cb'
    },
    alertReady: {
      backgroundColor: '#d1ecf1',
      color: '#0c5460',
      border: '1px solid #bee5eb'
    },
    alertNotReady: {
      backgroundColor: '#fff3cd',
      color: '#856404',
      border: '1px solid #ffeaa7'
    },
    formContainer: {
      backgroundColor: '#ffffff',
      padding: '2rem',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      marginBottom: '2rem'
    },
    formSection: {
      marginBottom: '1.5rem',
      padding: '1.5rem',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      border: '1px solid #e9ecef'
    },
    formTitle: {
      color: '#2c3e50',
      marginTop: '0',
      marginBottom: '1.5rem',
      fontSize: '1.5rem',
      fontWeight: '600'
    },
    formSubtitle: {
      color: '#2c3e50',
      marginTop: '0',
      marginBottom: '1rem',
      fontSize: '1.2rem',
      fontWeight: '600'
    },
    formGroup: {
      marginBottom: '1.2rem'
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      fontWeight: '600',
      color: '#495057'
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      border: '1px solid #ced4da',
      borderRadius: '6px',
      fontSize: '1rem',
      transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
      boxSizing: 'border-box'
    },
    inputFocus: {
      borderColor: '#80bdff',
      outline: '0',
      boxShadow: '0 0 0 0.2rem rgba(0, 123, 255, 0.25)'
    },
    textarea: {
      width: '100%',
      padding: '0.75rem',
      border: '1px solid #ced4da',
      borderRadius: '6px',
      fontSize: '1rem',
      minHeight: '100px',
      resize: 'vertical',
      boxSizing: 'border-box'
    },
    formRow: {
      display: 'flex',
      gap: '1rem'
    },
    formRowItem: {
      flex: '1'
    },
    imagePreview: {
      maxWidth: '200px',
      maxHeight: '200px',
      marginTop: '1rem',
      border: '1px solid #dee2e6',
      borderRadius: '6px'
    },
    galleryPreview: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1rem',
      marginTop: '1rem'
    },
    galleryItem: {
      position: 'relative',
      width: '100px',
      height: '100px'
    },
    galleryImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      border: '1px solid #dee2e6',
      borderRadius: '6px'
    },
    galleryRemoveBtn: {
      position: 'absolute',
      top: '0.25rem',
      right: '0.25rem',
      width: '1.5rem',
      height: '1.5rem',
      background: '#dc3545',
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      fontSize: '0.8rem',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    tagInputGroup: {
      display: 'flex',
      gap: '0.5rem',
      marginBottom: '0.5rem'
    },
    tagInput: {
      flex: '1',
      padding: '0.5rem',
      border: '1px solid #ced4da',
      borderRadius: '6px'
    },
    tagAddBtn: {
      padding: '0.5rem 1rem',
      background: '#28a745',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'background-color 0.15s'
    },
    tagsContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.5rem'
    },
    tagItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
      background: '#e9ecef',
      padding: '0.4rem 0.75rem',
      borderRadius: '20px',
      fontSize: '0.9rem'
    },
    tagRemoveBtn: {
      background: 'none',
      border: 'none',
      color: '#6c757d',
      cursor: 'pointer',
      fontSize: '1rem',
      lineHeight: '1'
    },
    packageFormGroup: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '0.75rem',
      marginBottom: '1rem'
    },
    packageInput: {
      width: '100%',
      padding: '0.5rem',
      border: '1px solid #ced4da',
      borderRadius: '6px',
      boxSizing: 'border-box'
    },
    packageTextarea: {
      gridColumn: 'span 2',
      width: '100%',
      padding: '0.5rem',
      border: '1px solid #ced4da',
      borderRadius: '6px',
      minHeight: '80px',
      boxSizing: 'border-box'
    },
    packageAddBtn: {
      gridColumn: 'span 2',
      padding: '0.5rem',
      background: '#17a2b8',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'background-color 0.15s'
    },
    packagesContainer: {
      display: 'grid',
      gap: '1rem'
    },
    packageItem: {
      padding: '1rem',
      background: '#ffffff',
      border: '1px solid #dee2e6',
      borderRadius: '6px'
    },
    packageName: {
      marginTop: '0',
      marginBottom: '0.5rem',
      color: '#2c3e50',
      fontSize: '1.1rem',
      fontWeight: '600'
    },
    packageDetail: {
      margin: '0.25rem 0',
      color: '#495057'
    },
    packageDescription: {
      margin: '0.5rem 0',
      color: '#6c757d',
      fontSize: '0.9rem'
    },
    packageRemoveBtn: {
      padding: '0.25rem 0.5rem',
      background: '#dc3545',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '0.8rem',
      cursor: 'pointer',
      transition: 'background-color 0.15s'
    },
    formActions: {
      display: 'flex',
      gap: '1rem',
      marginTop: '1.5rem'
    },
    submitBtn: {
      padding: '0.75rem 1.5rem',
      background: canSubmit ? '#007bff' : '#6c757d',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontSize: '1rem',
      fontWeight: '500',
      cursor: canSubmit ? 'pointer' : 'not-allowed',
      transition: 'background-color 0.15s',
      opacity: canSubmit ? 1 : 0.6
    },
    cancelBtn: {
      padding: '0.75rem 1.5rem',
      background: '#6c757d',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontSize: '1rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.15s'
    },
    centersListSection: {
      background: '#ffffff',
      padding: '2rem',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
    },
    centersListTitle: {
      color: '#2c3e50',
      marginTop: '0',
      marginBottom: '1.5rem',
      fontSize: '1.5rem',
      fontWeight: '600'
    },
    noCentersMessage: {
      color: '#6c757d',
      textAlign: 'center',
      padding: '2rem'
    },
    centersGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '1.5rem'
    },
    centerCard: {
      border: '1px solid #dee2e6',
      borderRadius: '12px',
      overflow: 'hidden',
      transition: 'transform 0.2s, box-shadow 0.2s',
      backgroundColor: '#ffffff'
    },
    centerCardHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
    },
    centerImage: {
      width: '100%',
      height: '200px',
      objectFit: 'cover'
    },
    centerContent: {
      padding: '1.25rem'
    },
    centerName: {
      marginTop: '0',
      marginBottom: '0.5rem',
      color: '#2c3e50',
      fontSize: '1.2rem',
      fontWeight: '600'
    },
    centerLocation: {
      margin: '0',
      color: '#6c757d',
      fontSize: '0.95rem'
    },
    centerActions: {
      display: 'flex',
      gap: '0.75rem',
      marginTop: '1rem'
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Dive Center Admin</h1>
      
      {message && (
        <div style={{
          ...styles.alert,
          ...(message.includes('success') ? styles.alertSuccess : styles.alertError)
        }}>
          {message}
        </div>
      )}
      
      {/* Submit readiness notification */}
      {!isFormEmpty && (
        <div style={{
          ...styles.alert,
          ...(canSubmit ? styles.alertReady : styles.alertNotReady)
        }}>
          {canSubmit 
            ? 'Form is ready to submit! All required fields are filled.' 
            : 'Please fill in all required fields (Name, Location, and Description) to submit the form.'
          }
        </div>
      )}
      
      <div>
        <div style={styles.formContainer}>
          <div style={styles.formSection}>
            <h2 style={styles.formTitle}>
              {selectedCenter ? 'Edit Center' : 'Add New Center'}
            </h2>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Location *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
            </div>
            
            <div style={styles.formRow}>
              <div style={styles.formRowItem}>
                <label style={styles.label}>Rating</label>
                <input
                  type="number"
                  name="rating"
                  min="0"
                  max="5"
                  step="0.1"
                  value={formData.rating}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>
              
              <div style={styles.formRowItem}>
                <label style={styles.label}>Total Reviews</label>
                <input
                  type="number"
                  name="totalReviews"
                  min="0"
                  value={formData.totalReviews}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                style={styles.textarea}
                required
              />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Main Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={styles.input}
              />
              {formData.mainImage && (
                <img 
                  src={formData.mainImage} 
                  alt="Preview" 
                  style={styles.imagePreview}
                />
              )}
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Gallery Images</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleGalleryUpload}
                style={styles.input}
              />
              <div style={styles.galleryPreview}>
                {formData.gallery.map((img, index) => (
                  <div key={index} style={styles.galleryItem}>
                    <img src={img} alt={`Gallery ${index}`} style={styles.galleryImage} />
                    <button 
                      type="button" 
                      style={styles.galleryRemoveBtn}
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        gallery: prev.gallery.filter((_, i) => i !== index)
                      }))}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div style={styles.formSection}>
            <h3 style={styles.formSubtitle}>Features</h3>
            <div style={styles.tagInputGroup}>
              <input
                type="text"
                value={tempFeature}
                onChange={(e) => setTempFeature(e.target.value)}
                placeholder="Add feature"
                style={styles.tagInput}
              />
              <button 
                type="button" 
                onClick={addFeature} 
                style={styles.tagAddBtn}
              >
                Add
              </button>
            </div>
            <div style={styles.tagsContainer}>
              {formData.features.map((feature, index) => (
                <div key={index} style={styles.tagItem}>
                  <span>{feature}</span>
                  <button 
                    type="button" 
                    style={styles.tagRemoveBtn}
                    onClick={() => removeFeature(index)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div style={styles.formSection}>
            <h3 style={styles.formSubtitle}>Specialties</h3>
            <div style={styles.tagInputGroup}>
              <input
                type="text"
                value={tempSpecialty}
                onChange={(e) => setTempSpecialty(e.target.value)}
                placeholder="Add specialty"
                style={styles.tagInput}
              />
              <button 
                type="button" 
                onClick={addSpecialty} 
                style={styles.tagAddBtn}
              >
                Add
              </button>
            </div>
            <div style={styles.tagsContainer}>
              {formData.specialties.map((specialty, index) => (
                <div key={index} style={styles.tagItem}>
                  <span>{specialty}</span>
                  <button 
                    type="button" 
                    style={styles.tagRemoveBtn}
                    onClick={() => removeSpecialty(index)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div style={styles.formSection}>
            <h3 style={styles.formSubtitle}>Packages</h3>
            <div style={styles.packageFormGroup}>
              <input
                type="text"
                placeholder="Package name"
                value={newPackage.name}
                onChange={(e) => setNewPackage({...newPackage, name: e.target.value})}
                style={styles.packageInput}
              />
              <input
                type="text"
                placeholder="Price"
                value={newPackage.price}
                onChange={(e) => setNewPackage({...newPackage, price: e.target.value})}
                style={styles.packageInput}
              />
              <input
                type="text"
                placeholder="Duration"
                value={newPackage.duration}
                onChange={(e) => setNewPackage({...newPackage, duration: e.target.value})}
                style={styles.packageInput}
              />
              <textarea
                placeholder="Description"
                value={newPackage.description}
                onChange={(e) => setNewPackage({...newPackage, description: e.target.value})}
                style={styles.packageTextarea}
              />
              <button 
                type="button" 
                onClick={addPackage} 
                style={styles.packageAddBtn}
              >
                Add Package
              </button>
            </div>
            
            <div style={styles.packagesContainer}>
              {formData.packages.map(pkg => (
                <div key={pkg.id} style={styles.packageItem}>
                  <h4 style={styles.packageName}>{pkg.name}</h4>
                  <p style={styles.packageDetail}><strong>Price:</strong> {pkg.price}</p>
                  <p style={styles.packageDetail}><strong>Duration:</strong> {pkg.duration}</p>
                  <p style={styles.packageDescription}>{pkg.description}</p>
                  <button 
                    type="button" 
                    style={styles.packageRemoveBtn}
                    onClick={() => removePackage(pkg.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div style={styles.formActions}>
            <button 
              type="button"
              onClick={handleSubmit} 
              style={styles.submitBtn}
              disabled={!canSubmit}
            >
              {selectedCenter ? 'Update Center' : 'Add Center'}
            </button>
            <button 
              type="button" 
              onClick={resetForm}
              style={styles.cancelBtn}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiveCenterAdmin; 