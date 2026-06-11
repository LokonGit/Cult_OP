import useBookings from '../../hooks/useBookings';
import Spinner from '../../components/ui/Spinner';
import Badge from '../../components/ui/Badge';
import { formatDate } from '../../utils/helpers';
import { useAuth } from '../../context/AuthContext';

const StatCard = ({ title, value }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
    <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{value ?? 0}</p>
  </div>
);

const UserDashboard = () => {
  const { user } = useAuth();
  const { bookings: rawBookings, loading, error } = useBookings();
  const bookings = Array.isArray(rawBookings) ? rawBookings : [];
  
  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500">{error}</p>;

  const pending = bookings.filter((b) => b.status === 'pending').length;
  const approved = bookings.filter((b) => b.status === 'approved').length;
  const issued = bookings.filter((b) => b.status === 'issued').length;

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Welcome, {user?.name}
      </h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Bookings" value={bookings.length} />
        <StatCard title="Pending" value={pending} />
        <StatCard title="Approved" value={approved} />
        <StatCard title="Issued" value={issued} />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Bookings</h2>
        {bookings.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-sm">No bookings yet.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {bookings.slice(0, 5).map((b) => (
              <div key={b.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{b.asset?.name || '-'}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{formatDate(b.requested_from)} - {formatDate(b.requested_until)}</p>
                </div>
                <Badge status={b.status} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;