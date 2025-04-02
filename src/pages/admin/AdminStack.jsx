import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStack, getallStacks, getStacksById, updateStack } from '../../store/slices/stackSlice';
import toast from 'react-hot-toast';
import { TiEdit } from "react-icons/ti";
import { MdOutlineDeleteOutline } from "react-icons/md";
import config from '../../utils/apiService';

function AdminStack() {
    const [formData, setFormData] = useState({
        stackName: '',
        stackImage: null,
        stackId: null,  // Add stackId to manage editing
    });
    const [imagePreview, setImagePreview] = useState(null); // Preview for the image

    const fileInputRef = useRef(null); // Create a ref for the file input

    const dispatch = useDispatch();
    const { loading, allStacks,error } = useSelector((state) => state.stack);

    useEffect(() => {
        dispatch(getallStacks());
    }, [dispatch]);

    
    // Handle form data changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle file input change and perform validations
    const handleFileChange = (e) => {
        const { files } = e.target;
        const file = files[0];

        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];
        const maxSize = 5 * 1024 * 1024; // Max file size (5MB)

        if (file) {
            if (!allowedTypes.includes(file.type)) {
                toast.error('Invalid image type. Only JPG, PNG, WebP, and SVG are allowed.');
                return;
            }

            if (file.size > maxSize) {
                toast.error('File size exceeds 5MB limit.');
                return;
            }

            setFormData((prevData) => ({
                ...prevData,
                stackImage: file,
            }));

            setImagePreview(URL.createObjectURL(file)); // Preview the image
        }
    };

    // Handle form submission for create and update
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('stackName', formData.stackName);

        // Append image file only if new image is selected
        if (formData.stackImage) {
            formDataToSend.append('stackImage', formData.stackImage);
        }

        try {
            let result;
            if (formData.stackId) {
                // Update stack
                result = await dispatch(updateStack({ stackId: formData.stackId, formData: formDataToSend })).unwrap();
            } else {
                // Create new stack
                result = await dispatch(createStack(formDataToSend)).unwrap();
            }

            if (result.success) {
                toast.success(result.message);
                setFormData({ stackName: '', stackImage: null, stackId: null }); // Reset form
                setImagePreview(null); // Clear image preview
                if (fileInputRef.current) {
                    fileInputRef.current.value = ''; // Reset the file input
                }
                dispatch(getallStacks()); // Reload all stacks
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error(error);
        }
    };

    // Handle editing stack
    const handleEdit = async (stackId) => {
        try {
            const result = await dispatch(getStacksById(stackId)).unwrap();
            if (result.success) {
                setFormData({
                    stackId: result.data._id, // Set stackId for update
                    stackName: result.data.stackName,
                    stackImage: result.data.imageUrl,
                });
                setImagePreview(result.data.stackImage); // Set image preview for editing
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Handle deleting stack
    const handleDelete = async (stackId) => {
        try {
            const response = await fetch(`${config.baseUrl}/admin/delete-stack/${stackId}`, {
                method: 'DELETE',
            });
            const result = await response.json();
            if (result.success) {
                toast.success(result.message);
                dispatch(getallStacks());
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error(error);
        }
    };

    console.log(allStacks)

    return (
        <div className="container">
            <h1 className="mb-5">Add Technology</h1>

            {error && <div className="alert alert-danger">{error}</div>}
            
            <form onSubmit={handleSubmit}>
                <div className="row">
                    {/* First Column */}
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="stackName" className="form-label">
                                Technology name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="stackName"
                                name="stackName"
                                value={formData.stackName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="stackImage" className="form-label">
                                Upload Image
                            </label>
                            <input
                                type="file"
                                className="form-control"
                                id="stackImage"
                                name="stackImage"
                                accept="image/*"
                                onChange={handleFileChange}
                                ref={fileInputRef} // Attach the ref to the file input
                            />
                        </div>

                        {loading && <p>Loading...</p>}

                        <button type="submit" className="btn btn-primary">
                            {formData.stackId ? "Update Project" : "Create Project"}
                        </button>
                    </div>

                    {/* Second Column */}
                    <div className="col-md-6">
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
            </form>

            {/* Display Stack Cards */}
            <div className="mt-5">
                <h2>All Technologies</h2>
                <div className="row">
                    {allStacks && allStacks.length > 0 ? (
                        allStacks.map((stack) => (
                            <div className="col-md-3" key={stack._id}>
                                <div className="card">
                                    <img
                                        src={stack.stackImage} // Assuming this is the URL for the image
                                        className="card-img-top p-3"
                                        alt={stack.stackName}
                                        style={{ height: '150px', objectFit: 'contain' }}
                                    />
                                    <div className="card-body d-flex justify-content-between align-items-center">
                                        <h5 className="card-title">{stack.stackName}</h5>
                                        <div className="btn-card">
                                            <button className="btn btn-warning me-2" onClick={() => handleEdit(stack._id)}>
                                                <TiEdit />
                                            </button>
                                            <button className="btn btn-danger" onClick={() => handleDelete(stack._id)}>
                                                <MdOutlineDeleteOutline />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No technologies available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdminStack;
