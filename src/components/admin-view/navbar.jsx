import React from 'react';
import { FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';  // Import React Hot Toast
import config from '../../utils/apiService';  // Ensure your API service path is correct
import { IoMdLogOut } from "react-icons/io";

const AdminNavbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${config.baseUrl}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // credentials: 'include',  // Uncomment if using cookies with credentials
      });

      const result = await response.json();

      if (result.success) {
        // Clear the authentication token from sessionStorage or localStorage
        sessionStorage.removeItem('token');  // Or use localStorage.removeItem() if the token is there
        toast.success('Logged out successfully!');  // Show success toast
        navigate('/auth/login');  // Redirect to login page
      } else {
        toast.error('Error logging out: ' + result.message);  // Show error toast
      }
    } catch (error) {
      // console.error('Error logging out:', error.message);
      toast.error('Something went wrong.');  // Show error toast
    }
  };

  return (
    <nav className="admin-navbar d-flex justify-content-between align-items-center py-2 px-5">
      {/* Toggler button */}
      <button className="navbar-toggler" type="button" onClick={toggleSidebar}>
        <FaBars />
      </button>
      <span className="navbar-brand">Admin Panel</span>
      <button onClick={handleLogout} className='logout-btn'>LogOut<IoMdLogOut className='mx-1'/></button>
    </nav>
  );
};

export default AdminNavbar;
