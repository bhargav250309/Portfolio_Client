import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAboutUser } from '../../store/slices/aboutSlice';
import toast from 'react-hot-toast';
import config from '../../utils/apiService';

function AdminAbout() {
  const [formData, setFormData] = useState({
    userName: '',
    description: '',
    aboutImage: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  const fileInputRef = useRef(null); 

  const dispatch = useDispatch()
  const { isLoading, error, aboutUser } = useSelector((state) => state.aboutUser);

  useEffect(() => {
    dispatch(getAboutUser());
  }, [dispatch]);

 
  useEffect(() => {
    if (aboutUser) {
      console.log(aboutUser)
      setFormData({
        userName: aboutUser.userName,
        description: aboutUser.description,
        aboutImage: aboutUser.imageUrl,
      });
      setImagePreview(aboutUser.aboutImage);
    }

  }, [aboutUser])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    const file = files[0];

    setFormData((prevData) => ({
      ...prevData,
      aboutImage: file,
    }));

    // Create a preview URL for the selected image
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    const form = new FormData();
    form.append('userName', formData.userName);
    form.append('description', formData.description);
    
    if (formData.aboutImage) {
      form.append('aboutImage', formData.aboutImage); // Appending the image once
    }
  
    const aboutUserId = aboutUser?._id;
    
    try {
      // Directly call the API to update the about user
      const response = await fetch(`${config.baseUrl}/admin/update-aboutUser/${aboutUserId}`, {
        method: "PUT",
        body: form, // FormData already handles the headers 
      });
      
      const result = await response.json();
      if (result.success) {
        toast.success(result.message);

        if (fileInputRef.current) {
          fileInputRef.current.value = ''; // Reset the file input field
        }
        dispatch(getAboutUser()); // Fetch user data again after update
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  


  return (
    <div className="container">
      <h1 className="mb-5">Create About User</h1>
      {error && <div className="alert alert-danger">{error.message || 'An unexpected error occurred.'}</div>}

      <form onSubmit={handleUpdate}>
        <div className="row">
          {/* First Column */}
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="userName" className="form-label">User Name</label>
              <input
                type="text"
                className="form-control"
                id="userName"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary">Update About User</button>
          </div>

          {/* Second Column */}
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="aboutImage" className="form-label">About Image</label>
              <input
                type="file"
                className="form-control"
                id="aboutImage"
                name="aboutImage"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
              />
            </div>

            {/* Image Preview */}
            {imagePreview && (
              <div className="image-preview-container mt-3">
                <h5>Image Preview:</h5>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="img-fluid rounded"
                  style={{ maxHeight: '200px', objectFit: 'cover' }}
                />
              </div>
            )}
          </div>
        </div>

        {isLoading ? 'Loading...' : ''}
      </form>
    </div>
  );
}

export default AdminAbout;
