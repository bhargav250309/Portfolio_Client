import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { contacts, deleteMessage } from '../../store/slices/contactSlice';
import toast from 'react-hot-toast';
import { FaTrashAlt } from 'react-icons/fa';
import { AiOutlineCloseCircle } from 'react-icons/ai';

function AdminContact() {
  const dispatch = useDispatch();
  const { getRecords, error } = useSelector((state) => state.contact);

  // State to manage modal visibility and content
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    dispatch(contacts());
  }, [dispatch]);

  const handleDelete = async (contactId) => {
    try {
      const result = await dispatch(deleteMessage(contactId)).unwrap();
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Internal server error');
    } finally {
      dispatch(contacts());
    }
  };

  const handleRowClick = (contact) => {
    setSelectedContact(contact);  // Set the clicked contact
    setIsModalOpen(true);  // Show the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);  // Close the modal
    setSelectedContact(null);  // Clear selected contact
  };

  return (
    <div className="container">
      <h1 className="mb-5 text-center">Contact Messages</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* Contact Table */}
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Message</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(getRecords) &&
            getRecords.map((contact) => (
              <tr
                key={contact.id}
                onClick={() => handleRowClick(contact)}
                className="clickable-row"
                style={{ cursor: 'pointer' }}
              >
                <td>{contact.contactName}</td>
                <td>{contact.contactEmail}</td>
                <td>{contact.contactMessage}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent row click
                      handleDelete(contact._id);
                    }}
                  >
                    <FaTrashAlt /> Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Modal to show contact details */}
      {isModalOpen && selectedContact && (
        <div
          className="modal fade show contact-medel"
          style={{ display: 'block'}}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="contactModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog d-flex justify-content-center align-items-center" role="document">
            <div className="modal-content">
              <div className="modal-header px-4 d-flex justify-content-between">
                <h5 className="modal-title" id="contactModalLabel">
                  Contact Details
                </h5>
                <button
                  type="button"
                  className="close"
                  onClick={handleCloseModal}
                  aria-label="Close"
                >
                  <AiOutlineCloseCircle size={34} />
                </button>
              </div>
              <div className="modal-body p-4">
                <h5><strong>Name:</strong> {selectedContact.contactName}</h5>
                <p><strong>Email:</strong> {selectedContact.contactEmail}</p>
                <p><strong>Message:</strong> {selectedContact.contactMessage}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminContact;
