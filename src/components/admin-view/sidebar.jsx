import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // For navigation links

const AdminSidebar = ({ sidebarOpen }) => {
    const location = useLocation(); // To get the current route
    const [activeTab, setActiveTab] = useState(location.pathname);

    const handleTabClick = (path) => {
        setActiveTab(path);
    };

    return (
        <div className={`admin-sidebar ${sidebarOpen ? 'open' : 'closed'} h-100`}>
            <ul>
                <li>
                    <Link to="/admin/home">
                        <div
                            className={`sidebar-tab ${activeTab === '/admin/home' ? 'active' : ''}`}
                            onClick={() => handleTabClick('/admin/home')}
                        >
                            Home
                        </div>
                    </Link>
                </li>
                <li>
                    <Link to="/admin/stack">
                        <div
                            className={`sidebar-tab ${activeTab === '/admin/stack' ? 'active' : ''}`}
                            onClick={() => handleTabClick('/admin/stack')}
                        >
                            Stack
                        </div>
                    </Link>
                </li>
                <li>
                    <Link to="/admin/project">
                        <div
                            className={`sidebar-tab ${activeTab === '/admin/project' ? 'active' : ''}`}
                            onClick={() => handleTabClick('/admin/project')}
                        >
                            Project
                        </div>
                    </Link>
                </li>
                <li>
                    <Link to="/admin/about">
                        <div
                            className={`sidebar-tab ${activeTab === '/admin/about' ? 'active' : ''}`}
                            onClick={() => handleTabClick('/admin/about')}
                        >
                            About
                        </div>
                    </Link>
                </li>
                <li>
                    <Link to="/admin/contact">
                        <div
                            className={`sidebar-tab ${activeTab === '/admin/contact' ? 'active' : ''}`}
                            onClick={() => handleTabClick('/admin/contact')}
                        >
                            Contact
                        </div>
                    </Link>
                </li>
                <li>
                    <Link to="/admin/links">
                        <div
                            className={`sidebar-tab ${activeTab === '/admin/links' ? 'active' : ''}`}
                            onClick={() => handleTabClick('/admin/links')}
                        >
                            Links
                        </div>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default AdminSidebar;
