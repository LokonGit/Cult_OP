import { useState } from 'react';
import useAssets from '../../hooks/useAssets';
import { createBooking } from '../../api/booking.api';
import Table from '../../components/ui/Table';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import Spinner from '../../components/ui/Spinner';

const emptyForm = { quantity: '', requested_from: '', requested_until: '' };

const UserAssets = () => {
  const { assets, loading, error } = useAssets();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const openBook = (asset) => {
    setSelectedAsset(asset);
    setForm(emptyForm);
    setFormError(null);
    setSuccess(false);
    setModalOpen(true);
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      setFormError(null);
      await createBooking({
        asset_id: selectedAsset.id,
        quantity: parseInt(form.quantity),
        requested_from: form.requested_from,
        requested_until: form.requested_until,
      });
      setSuccess(true);
    } catch (err) {
      setFormError(err.response?.data?.error || 'Booking failed');
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'category', label: 'Category' },
    { key: 'available_quantity', label: 'Available' },
  ];

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Assets</h1>
      <Table
        columns={columns}
        data={assets}
        actions={(row) => (
          <Button
            onClick={() => openBook(row)}
            disabled={row.available_quantity === 0}
          >
            {row.available_quantity === 0 ? 'Unavailable' : 'Book'}
          </Button>
        )}
      />

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={`Book — ${selectedAsset?.name}`}
      >
        {success ? (
          <p className="text-green-500 text-sm">Booking request submitted successfully.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {formError && <p className="text-red-500 text-sm">{formError}</p>}
            <Input label="Quantity" name="quantity" type="number" value={form.quantity} onChange={handleChange} />
            <Input label="From" name="requested_from" type="date" value={form.requested_from} onChange={handleChange} />
            <Input label="Until" name="requested_until" type="date" value={form.requested_until} onChange={handleChange} />
            <Button onClick={handleSubmit} disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit Request'}
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UserAssets;