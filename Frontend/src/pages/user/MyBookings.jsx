import useBookings from '../../hooks/useBookings';
import Table from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import Spinner from '../../components/ui/Spinner';
import { formatDate } from '../../utils/helpers';

const MyBookings = () => {
  const { bookings, loading, error } = useBookings();

  const columns = [
    { key: 'asset', label: 'Asset', render: (row) => row.asset?.name || '-' },
    { key: 'quantity', label: 'Qty' },
    { key: 'requested_from', label: 'From', render: (row) => formatDate(row.requested_from) },
    { key: 'requested_until', label: 'Until', render: (row) => formatDate(row.requested_until) },
    { key: 'status', label: 'Status', render: (row) => <Badge status={row.status} /> },
  ];

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Bookings</h1>
      {bookings.length === 0 ? (
        <p className="text-gray-500 dark:text-gray.400 text-sm">No bookings yet.</p>
      ) : (
        <Table columns={columns} data={bookings} />
      )}
    </div>
  );
};

export default MyBookings;