import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function CheckAuth({ children }) {
    const location = useLocation();
    const token = sessionStorage.getItem('token');

    if (token && (location.pathname === '/admin' || location.pathname === '/admin/')) {
        return <Navigate to="/admin/home" />;
    }

    // If the user is logged in and tries to access the login or register pages, redirect to /admin/home
    if (token && location.pathname.includes('/auth')) {
        return <Navigate to="/admin/home" />;
    }

    // If the user is not logged in and trying to access an /admin page, redirect to login page
    if (!token && location.pathname.includes('/admin')) {
        return <Navigate to="/auth/login" />;
    }

    // If no token and trying to access anything other than login/register, redirect to /auth/login
    if (!token && !location.pathname.includes('/auth/login') && !location.pathname.includes('/auth/register')) {
        return <Navigate to="/auth/login" />;
    }

    // If the user is logged in and tries to access the admin route, allow access
    if (token && location.pathname.includes('/admin') && !location.pathname.includes('/auth')) {
        return <>{children}</>;
    }

    // If the user is not logged in and trying to access the login page, allow it
    if (!token && location.pathname.includes('/auth/login') || location.pathname.includes('/auth/register')) {
        return <>{children}</>;
    }

    // If no token and trying to access any other non-auth page, redirect to /auth/login
    if (!token && !location.pathname.includes('/auth')) {
        return <Navigate to="/auth/login" />;
    }

    return <>{children}</>;
}

export default CheckAuth;
