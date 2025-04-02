import React, { useEffect } from 'react'
import '../../styles/links.css'
import { useDispatch, useSelector } from 'react-redux';
import { getLinks } from '../../store/slices/linksSlice';
import config from '../../utils/apiService';
import toast from 'react-hot-toast';

function Links() {
    const [formData, setFormData] = React.useState({
        github: '',
        linkedin: '',
        instagram: '',
        facebook: '',
        email: '',
        whatsapp: '',
    });

    const dispatch = useDispatch();
    const { loading, links, error } = useSelector((state) => state.link);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        dispatch(getLinks());
    }, [dispatch]);


    useEffect(() => {
        if (links) {
            setFormData({
                github: links.github || '',
                linkedin: links.linkedin || '',
                instagram: links.instagram || '',
                facebook: links.facebook || '',
                email: links.email || '',
                whatsapp: links.whatsapp || '',
            });
        }
    }, [links]);



    const handleUpdate = async (e) => {
        e.preventDefault();
        console.log(formData);

        const linkId = links?._id;

        try {
            const response = await fetch(`${config.baseUrl}/admin/update-link/${linkId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (result.success) {
                // console.log();
                toast.success(result.message);
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            console.log('something went wrong');
        }
    };


    return (
        <>
            <div className="container">
                <h1 className="mb-5">All Links</h1>
                {error && <div className="alert alert-danger">{error}</div>}

                <form>

                    <div className="mb-3 links-align">
                        <label htmlFor="github" className="form-label col-md-2">Github :</label>
                        <input
                            type="text"
                            className="form-control"
                            id="github"
                            name="github"
                            value={formData.github}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3 links-align">
                        <label htmlFor="linkedin" className="form-label col-md-2">Linkedin :</label>
                        <input
                            type="text"
                            className="form-control"
                            id="linkedin"
                            name="linkedin"
                            value={formData.linkedin}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3 links-align">
                        <label htmlFor="instagram" className="form-label col-md-2">Instagram :</label>
                        <input
                            type="text"
                            className="form-control"
                            id="instagram"
                            name="instagram"
                            value={formData.instagram}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3 links-align">
                        <label htmlFor="facebook" className="form-label col-md-2">Facebook :</label>
                        <input
                            type="text"
                            className="form-control"
                            id="facebook"
                            name="facebook"
                            value={formData.facebook}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3 links-align">
                        <label htmlFor="email" className="form-label col-md-2">email :</label>
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3 links-align">
                        <label htmlFor="whatsapp" className="form-label col-md-2">Whatsapp :</label>
                        <input
                            type="text"
                            className="form-control"
                            id="whatsapp"
                            name="whatsapp"
                            value={formData.whatsapp}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" onClick={handleUpdate}>Submit</button>
                    {loading && <div>Loading...</div>}
                </form>
            </div>
        </>
    )
}

export default Links