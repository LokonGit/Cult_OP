import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

import AdminLayout from '../layouts/AdminLayout';
import UserLayout from '../layouts/UserLayout';

import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminAssets from '../pages/admin/AdminAssets';
import AdminBookings from '../pages/admin/AdminBookings';

import UserDashboard from '../pages/user/UserDashboard';
import UserAssets from '../pages/user/UserAssets';
import MyBookings from '../pages/user/MyBookings';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
    if (!user) return <Navigate to="/login" />;
    return children;
};

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
    if (!user) return <Navigate to="/login" />;
    if (user.role !== 'admin') return <Navigate to="/dashboard" />;
    return children;
};

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
                <Route index element={<AdminDashboard />} />
                <Route path="assets" element={<AdminAssets />} />
                <Route path="bookings" element={<AdminBookings />} />
            </Route>

            {/* User Routes */}
            <Route path="/dashboard" element={<ProtectedRoute><UserLayout /></ProtectedRoute>}>
                <Route index element={<UserDashboard />} />
                <Route path="assets" element={<UserAssets />} />
                <Route path="bookings" element={<MyBookings />} />
            </Route>

            <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
    );
};

export default AppRoutes;