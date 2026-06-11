import useAnalytics from '../../hooks/useAnalytics';
import useBookings from '../../hooks/useBookings';
import Spinner from '../../components/ui/Spinner';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend,
} from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const StatCard = ({ title, value }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
    <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{value ?? '-'}</p>
  </div>
);

const AdminDashboard = () => {
  const { data, loading, error } = useAnalytics();
  const { bookings } = useBookings(true);
  const pendingCount = Array.isArray(bookings) ? bookings.filter(b => b.status === 'pending').length : 0;

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Assets" value={data.dashboard?.inventorySummary?.total_assets} />
      <StatCard title="Total Bookings" value={bookings.length} />
       <StatCard title="Pending Bookings" value={pendingCount} />
        <StatCard title="Active Issues" value={data.dashboard?.activeBookingCount?.count} />
      </div>

      {/* Booking Trend */}
      {data.bookingTrend && (<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Booking Trend</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data.bookingTrend}>
            <XAxis dataKey="date" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>)}

      {/* Top Assets + Category Distribution */}
      {data.categoryDist  && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Category Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={data.categoryDist} dataKey="asset_count" nameKey="category" cx="50%" cy="50%" outerRadius={80}>
                {data.categoryDist?.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

      )}
      {/* Utilization */}
      {data.utilization && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Asset Utilization</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data.utilization}>
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Bar dataKey="utilization_rate" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;