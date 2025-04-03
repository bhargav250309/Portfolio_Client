import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProject, deleteProject, getProject, getProjectById, updateProject } from '../../store/slices/projectSlice';
import toast from 'react-hot-toast';


function AdminProject() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    stack: '',
    priviewLink: '',
    githubLink: '',
    projectImage: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  const fileInputRef = useRef(null);

  const dispatch = useDispatch();
  const { loading, error, projectsRecord } = useSelector((state) => state.project);

  useEffect(() => {
    dispatch(getProject());  // Dispatch getProject action to fetch data
  }, [dispatch]);



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

    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        projectImage: file,
      }));

      // Create a preview URL for the selected image
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  ///////////////// add project
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('title', formData.title);
    form.append('description', formData.description);
    form.append('stack', formData.stack);
    form.append('priviewLink', formData.priviewLink);
    form.append('githubLink', formData.githubLink);

    if (formData.projectImage) {
      form.append('projectImage', formData.projectImage);
    }

    try {
      let result;
      if (formData.projectId) {
        result = await dispatch(updateProject({ projectId: formData.projectId, formData: form })).unwrap();
      } else {
        result = await dispatch(createProject(form)).unwrap();
      }


      if (result.success) {
        toast.success(result.message);
        setImagePreview(null);
        // Reset form fields
        setFormData({
          title: '',
          description: '',
          stack: '',
          priviewLink: '',
          githubLink: '',
          projectImage: null,
        });

        if (fileInputRef.current) {
          fileInputRef.current.value = ''; // Reset the file input field
        }
        // Fetch updated projects list
        dispatch(getProject());
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  ///////////////// update project
  const handleUpdate = async (projectId) => {
    try {
      const result = await dispatch(getProjectById(projectId)).unwrap();
      console.log(result)
      if (result) {
        // Set form data based on the selected project details
        setFormData({
          projectId: result._id,
          title: result.title,
          description: result.description,
          stack: result.stack,
          priviewLink: result.priviewLink,
          githubLink: result.githubLink,
          projectImage: null,  // Clear the existing image
        });
        setImagePreview(result.projectImage);

      } else {
        toast.error("Failed to fetch project details.");
      }
    } catch (error) {
      toast.error("Error fetching project details.");
    }
  };

  ///////////////// delete project
  const handleDelete = async (projectId) => {
    try {
      const result = await dispatch(deleteProject(projectId)).unwrap();
      if (result.success) {
        setFormData({
          title: '',
          description: '',
          stack: '',
          priviewLink: '',
          githubLink: '',
          projectImage: null,
        });
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Error deleting project.");
    }
  };


  return (
    <div className="container">
      <h1 className="mb-5">Create a New Project</h1>
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Project Form */}
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="title" className="form-label mb-1">Project Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder='Eg. Project Title'
              />
            </div>

            <div className="mb-3">
              <label htmlFor="stack" className="form-label mb-1">Tech Stack (comma separated)</label>
              <input
                type="text"
                className="form-control"
                id="stack"
                name="stack"
                value={formData.stack}
                onChange={handleChange}
                required
                placeholder='Eg. Node.js, React, Express'
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label mb-1">Project Description</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                required
                placeholder='Eg. A simple Node.js application with a RESTful API'
              ></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="projectImage" className="form-label mb-1">Project Image</label>
              <input
                type="file"
                className="form-control"
                id="projectImage"
                name="projectImage"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef} // Attach the ref to the file input
              />
            </div>

            {/* <button type="submit" className="btn btn-primary">Create Project</button> */}
            <button type="submit" className="btn btn-primary">
              {formData.projectId ? "Update Project" : "Create Project"}
            </button>

          </div>

          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="priviewLink" className="form-label mb-1">Preview Link</label>
              <input
                type="url"
                className="form-control"
                id="priviewLink"
                name="priviewLink"
                value={formData.priviewLink}
                onChange={handleChange}
                required
                placeholder='Eg. https://example.com'
              />
            </div>

            <div className="mb-3">
              <label htmlFor="githubLink" className="form-label mb-1">GitHub Link</label>
              <input
                type="url"
                className="form-control"
                id="githubLink"
                name="githubLink"
                value={formData.githubLink}
                onChange={handleChange}
                required
                placeholder='Eg. https://github.com/example/project'
              />
            </div>

            <div className="col-md-12">
              {imagePreview && (
                <div className="image-preview-container">
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
        </div>
        {loading ? 'loading....' : ''}
      </form>

      {/* Projects Table */}
      <div className="mt-5">
        <h3>Existing Projects</h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Title</th>
              <th>Preview Link</th>
              <th>GitHub Link</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(projectsRecord) && projectsRecord.map((project) => (
              <tr key={project._id}>
                <td>{project.title}</td>
                <td><a href={project.priviewLink} target="_blank" rel="noopener noreferrer">Preview</a></td>
                <td><a href={project.githubLink} target="_blank" rel="noopener noreferrer">GitHub</a></td>
                <td>
                  <button onClick={() => handleUpdate(project._id)} className="btn btn-warning btn-sm">Update</button> {/* Changed project.id to project._id */}
                  <button onClick={() => handleDelete(project._id)} className="btn btn-danger btn-sm ms-2">Delete</button> {/* Changed project.id to project._id */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminProject;
