import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function CheckAuth({ children }) {
    const location = useLocation();
    const token = sessionStorage.getItem('token');

    if (token && (location.pathname === '/admin' || location.pathname === '/admin/')) {
        return <Navigate to="/admin/home" />;
    }

    if (token && location.pathname.includes('/auth')) {
        return <Navigate to="/admin/home" />;
    }

    if (!token && location.pathname.includes('/admin')) {
        return <Navigate to="/auth/login" />;
    }

    if (!token && !location.pathname.includes('/auth/login') && !location.pathname.includes('/auth/register')) {
        return <Navigate to="/auth/login" />;
    }

    if (token && location.pathname.includes('/admin') && !location.pathname.includes('/auth')) {
        return <>{children}</>;
    }

    if (!token && location.pathname.includes('/auth/login') || location.pathname.includes('/auth/register')) {
        return <>{children}</>;
    }

    if (!token && !location.pathname.includes('/auth')) {
        return <Navigate to="/auth/login" />;
    }

    return <>{children}</>;
}

export default CheckAuth;
