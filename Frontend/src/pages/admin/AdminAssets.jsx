import { useState } from 'react';
import useAssets from '../../hooks/useAssets';
import { createAsset, updateAsset, deleteAsset } from '../../api/asset.api';
import Table from '../../components/ui/Table';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import Spinner from '../../components/ui/Spinner';

const emptyForm = { name: '', category: '', total_quantity: '', available_quantity: '' };

const AdminAssets = () => {
  const { assets, loading, error, refetch } = useAssets();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const openCreate = () => {
    setEditingAsset(null);
    setForm(emptyForm);
    setFormError(null);
    setModalOpen(true);
  };

  const openEdit = (asset) => {
    setEditingAsset(asset);
    setForm({
      name: asset.name,
      category: asset.category,
      total_quantity: asset.total_quantity,
      available_quantity: asset.available_quantity,
    });
    setFormError(null);
    setModalOpen(true);
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      setFormError(null);
      if (editingAsset) {
        await updateAsset(editingAsset.id, form);
      } else {
        await createAsset(form);
      }
      setModalOpen(false);
      refetch();
    } catch (err) {
      setFormError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure?')) return;
    try {
      await deleteAsset(id);
      refetch();
    } catch (err) {
      alert(err.response?.data?.error || 'Delete failed');
    }
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'category', label: 'Category' },
    { key: 'total_quantity', label: 'Total' },
    { key: 'available_quantity', label: 'Available' },
  ];

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Assets</h1>
        <Button onClick={openCreate}>Add Asset</Button>
      </div>

      <Table
        columns={columns}
        data={assets}
        actions={(row) => (
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => openEdit(row)}>Edit</Button>
            <Button variant="danger" onClick={() => handleDelete(row.id)}>Delete</Button>
          </div>
        )}
      />

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingAsset ? 'Edit Asset' : 'Add Asset'}
      >
        <div className="flex flex-col gap-4">
          {formError && <p className="text-red-500 text-sm">{formError}</p>}
          <Input label="Name" name="name" value={form.name} onChange={handleChange} />
          <Input label="Category" name="category" value={form.category} onChange={handleChange} />
          <Input label="Total Quantity" name="total_quantity" type="number" value={form.total_quantity} onChange={handleChange} />
          <Input label="Available Quantity" name="available_quantity" type="number" value={form.available_quantity} onChange={handleChange} />
          <Button onClick={handleSubmit} disabled={submitting}>
            {submitting ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default AdminAssets;