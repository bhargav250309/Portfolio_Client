import React, { useState } from 'react';
import '../../styles/contact.css';
import { MdOutlineMail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import config from '../../utils/apiService';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

function ContactPage({links}) {
  // State to store form input values
  const [formData, setFormData] = useState({
    contactName: '',
    contactEmail: '',
    contactMessage: ''
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${config.baseUrl}/user/create-contact-message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const result = await response.json();

      if (result.success) {
        toast.success(result.message);
        setFormData({
          contactName: '',
          contactEmail: '',
          contactMessage: ''
        });
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Error sending form data:', error.message);
    }
  };

  return (
    <>
      <div className="contact-main">
      <Toaster
                    position="top-right"
                />
        <div className="container py-5">
          <div className="row">
            <div className="col-md-6 contact-first-part py-5">
              <span>Let's talk?</span>
              <p>If you have any questions, proposals, or just want to
                have a chat, feel free to get in touch.</p>

              <Link to={`mailto:${links?.email}`} className='mt-3'><MdOutlineMail className='mx-2 ct-icon' />E-mail</Link>
              <Link to={`https://wa.me/${links?.whatsapp}`} target='_blank' className='mt-4'><FaWhatsapp className='mx-2 ct-icon' />WhatsApp</Link>
            </div>

            <p className='text-center ortag' style={{ display: "none" }}>---------------------- Or --------------------------</p>

            <div className="col-md-5 contact-second-part">
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name" className='mb-2'>Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    placeholder="Insert your name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className='mb-2'>Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    placeholder="Insert your email"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message" className='mb-2'>Your Message</label>
                  <textarea
                    id="message"
                    name="contactMessage"
                    value={formData.contactMessage}
                    onChange={handleChange}
                    placeholder="Write your message"
                    required
                  />
                </div>
                <button type="submit" className="btn-send">Send Message</button>
              </form>
            </div>


          </div>

        </div>

        <div className="col-md-12 footer">&copy; 2025 Bhargav Jotangiya - All rights reserved</div>
      </div>
    </>
  );
}

export default ContactPage;
