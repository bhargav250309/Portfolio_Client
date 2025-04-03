import React from 'react';
import { Outlet } from 'react-router-dom';
import '../../styles/authLayout.css';
import { Toaster } from 'react-hot-toast';

function AuthLayout() {
  return (
    <div className="auth-layout">
      <Toaster
        position="bottom-right"
      />
      <div className="row h-100">
        {/* Left Partition with Background, Big Text, and Links */}
        <div className="left-partition col-md-6">
          <h1 className="auth-title">Hello Admin....</h1>
          <p className="auth-description">To access the Portfolio, please login.</p>
          <div className="auth-links">
          </div>
        </div>

        {/* Right Partition for Dynamic Content */}
        <div className="right-partition col-md-6">
          <div className="mx-5">
            <Outlet /> {/* This will render the Register or Login page */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
