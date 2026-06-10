import useBookings from '../../hooks/useBookings';
import { approveBooking, rejectBooking, issueAsset, returnAsset } from '../../api/booking.api';
import Table from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Spinner from '../../components/ui/Spinner';
import { formatDate } from '../../utils/helpers';

const AdminBookings = () => {
  const { bookings, loading, error, refetch } = useBookings(true);

  const handleAction = async (action, id) => {
    try {
      await action(id);
      refetch();
    } catch (err) {
      alert(err.response?.data?.error || 'Action failed');
    }
  };

  const columns = [
    { key: 'id', label: 'ID', render: (row) => row.id.slice(0, 8) + '...' },
    { key: 'asset', label: 'Asset', render: (row) => row.asset?.name || '-' },
    { key: 'user', label: 'User', render: (row) => row.user?.name || '-' },
    { key: 'quantity', label: 'Qty' },
    { key: 'requested_from', label: 'From', render: (row) => formatDate(row.requested_from) },
    { key: 'requested_until', label: 'Until', render: (row) => formatDate(row.requested_until) },
    { key: 'status', label: 'Status', render: (row) => <Badge status={row.status} /> },
  ];

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">All Bookings</h1>
      <Table
        columns={columns}
        data={bookings}
        actions={(row) => (
          <div className="flex gap-2 flex-wrap">
            {row.status === 'pending' && (
              <>
                <Button variant="success" onClick={() => handleAction(approveBooking, row.id)}>Approve</Button>
                <Button variant="danger" onClick={() => handleAction(rejectBooking, row.id)}>Reject</Button>
              </>
            )}
            {row.status === 'approved' && (
              <Button onClick={() => handleAction(issueAsset, row.id)}>Issue</Button>
            )}
            {row.status === 'issued' && (
              <Button variant="secondary" onClick={() => handleAction(returnAsset, row.id)}>Return</Button>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default AdminBookings;