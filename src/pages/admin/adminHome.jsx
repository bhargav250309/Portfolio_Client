import React, { useState, useEffect } from 'react';
import '../../styles/AdminHome.css';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { updateUserInfo, getUserInfo } from '../../store/slices/userInfoSlice';
import { Editor } from '@tinymce/tinymce-react';

function AdminHome() {
  const [formData, setFormData] = useState({
    navText: '',
    designation: '',
    userName: '',
    shortDesc: '',
    email: '',
  });

  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.userInfo);

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormData({
        navText: user.navText || '',
        designation: user.designation || '',
        userName: user.userName || '',
        shortDesc: user.shortDesc || '',
        email: user.email || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditorChange = (content) => {
    setFormData((prevData) => ({
      ...prevData,
      shortDesc: content,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const userId = user?._id;

    try {
      const result = await dispatch(updateUserInfo({ formData, userId })).unwrap();
      if (result.success) {
        toast.success(result.message);
        dispatch(getUserInfo());
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Error updating user information');
    }
  };

  return (
    <div className="container">
      <h1 className="mb-5">Add User Information</h1>
      {error && <div className="alert alert-danger">{error}</div>}

      <form>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="navText" className="form-label">Nav Text</label>
              <input type="text" className="form-control" id="navText" name="navText" value={formData.navText} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label htmlFor="designation" className="form-label">Designation</label>
              <input type="text" className="form-control" id="designation" name="designation" value={formData.designation} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label htmlFor="shortDesc" className="form-label">Short Description</label>
              <Editor
                apiKey='8kme5jsbp5ox920wx4glwz2mxdhizizq0ai25vjf5dxyofd7'
                init={{
                  plugins: ['anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount'],
                  toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link table | checklist numlist bullist indent outdent',
                }}
                initialValue={formData.shortDesc}
                onEditorChange={handleEditorChange}
              /> 
            </div>

            <button type="button" className="btn btn-primary" onClick={handleUpdate}>Update Value</button>
          </div>

          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="userName" className="form-label">User Name</label>
              <input type="text" className="form-control" id="userName" name="userName" value={formData.userName} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
          </div>
        </div>

        {loading ? 'Submitting...' : ''}
      </form>

    </div>
  );
}

export default AdminHome;

