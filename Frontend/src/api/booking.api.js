import api from './axiosInstance';

export const createBooking = (data) => api.post('/bookings', data);
export const getMyBookings = () => api.get('/bookings/my');
export const getAllBookings = () => api.get('/bookings');
export const getBookingById = (id) => api.get(`/bookings/${id}`);
export const approveBooking = (id) => api.patch(`/bookings/${id}/approve`);
export const rejectBooking = (id) => api.patch(`/bookings/${id}/reject`);
export const issueAsset = (id) => api.patch(`/bookings/${id}/issue`);
export const returnAsset = (id) => api.patch(`/bookings/${id}/return`);