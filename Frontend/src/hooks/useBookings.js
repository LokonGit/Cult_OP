import { useState, useEffect } from 'react';
import { getMyBookings, getAllBookings } from '../api/booking.api';

const useBookings = (isAdmin = false) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = isAdmin ? await getAllBookings() : await getMyBookings();
      setBookings(res.data.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [isAdmin]);

  return { bookings, loading, error, refetch: fetchBookings };
};

export default useBookings;