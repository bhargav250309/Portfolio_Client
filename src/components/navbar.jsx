import React, { useState } from 'react';
import '../styles/navbar.css';
import { IoMoonOutline } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";
import { Link } from 'react-scroll';
import { HiMenuAlt4 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { FaCaretRight } from "react-icons/fa";
function Navbar({ toggleTheme, isDarkMode, navName }) {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [activeTab, setActiveTab] = useState("home"); // Track the active tab

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const handleSetActive = (tab) => {
        setActiveTab(tab); // Update the active tab state
    };
    

    return (
        <>
            <div className="navbar-main">
                <nav className="d-flex justify-content-between align-items-center px-4">
                    <div className="nav-logo">{navName}</div>
                    <ul className="mt-2">
                        <li>
                            <Link
                                to="home"
                                smooth={true}
                                duration={100}
                                onClick={() => handleSetActive("home")} // Detect when "home" is active
                                className={activeTab === "home" ? "active" : ""}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="project"
                                smooth={true}
                                duration={100}
                                onClick={() => handleSetActive("project")} // Detect when "project" is active
                                className={activeTab === "project" ? "active" : ""}
                            >
                                Projects
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="about"
                                smooth={true}
                                duration={100}
                                onClick={() => handleSetActive("about")} // Detect when "about" is active
                                className={activeTab === "about" ? "active" : ""}
                            >
                                About
                            </Link>
                        </li>
                    </ul>
                    <div className="theme-toggle d-flex gap-3">
                        <Link to="reachout" style={{ textDecoration: 'none' }}>
                            <button className="react-btn px-4"
                            onClick={() => handleSetActive("")}
                            >Reach Out</button>
                        </Link>
                        <button onClick={toggleTheme} className="theme-btn">
                            {isDarkMode ? <IoSunny size={20} /> : <IoMoonOutline size={20} />}
                        </button>
                    </div>
                </nav>
            </div>

            <div className="navbar-main respo-menu">
                <nav className="d-flex justify-content-between align-items-center px-4">
                    <div className="nav-logo">BJ</div>

                    <div className="theme-toggle d-flex gap-3">
                        <a href="#reachout" style={{ textDecoration: 'none' }}>
                            <button className="react-btn px-4">Reach Out</button>
                        </a>
                        <button onClick={toggleTheme} className="theme-btn">
                            {isDarkMode ? <IoSunny size={20} /> : <IoMoonOutline size={20} />}
                        </button>
                    </div>
                    <HiMenuAlt4 onClick={toggleSidebar} className="open-nav-sidebar" />
                    <div className={`nav-sidebar-comp ${sidebarVisible ? "nav-sidebar-show" : ""}`}>
                        <IoClose className="nav-sidebar-close" onClick={toggleSidebar} />
                        <ul className="">
                            <li>
                                <Link
                                    to="home"
                                    smooth={true}
                                    duration={100}
                                    onClick={() => { 
                                        handleSetActive("home");
                                        setSidebarVisible(false); // Close sidebar when link clicked
                                    }}
                                >
                                     {activeTab === "home" && <FaCaretRight size={40} />}
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="project"
                                    smooth={true}
                                    duration={100}
                                    onClick={() => { 
                                        handleSetActive("project");
                                        setSidebarVisible(false); // Close sidebar when link clicked
                                    }}
                                >
                                    {activeTab === "project" && <FaCaretRight size={40} />}
                                    Projects
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="about"
                                    smooth={true}
                                    duration={100}
                                    onClick={() => { 
                                        handleSetActive("about");
                                        setSidebarVisible(false); // Close sidebar when link clicked
                                    }}
                                >
                                    {activeTab === "about" && <FaCaretRight size={40} />}
                                    About
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </>
    );
}

export default Navbar;
