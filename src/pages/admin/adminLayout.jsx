import React, { useState } from 'react';
import AdminSidebar from '../../components/admin-view/sidebar';
import AdminNavbar from '../../components/admin-view/navbar';
import { Outlet } from 'react-router-dom'; // This renders the child components for nested routes
import '../../styles/adminLayout.css';
import { Toaster } from 'react-hot-toast';

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <>
            <div className="admin-layout">
                <Toaster
                    position="bottom-right"
                />
                {/* Admin Navbar */}
                <AdminNavbar toggleSidebar={toggleSidebar} />

                <div className="second-part d-flex h-100 w-full">
                    {/* Admin Sidebar */}
                    <AdminSidebar sidebarOpen={sidebarOpen} />

                    {/* Main Content Area */}
                    <div className="content-area w-100 container">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminLayout;
