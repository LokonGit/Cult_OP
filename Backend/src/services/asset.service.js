const assetModel = require('../models/asset.model');
const auditLogService = require('./auditLog.service');

const createAsset = async (data, actor_enrollment_no) => {
  if (data.available_quantity > data.total_quantity) {
    throw new Error('Available quantity cannot exceed total quantity');
  }

  const asset = await assetModel.createAsset(data);
  await auditLogService.log({
    actor_enrollment_no,
    action: 'asset_created',
    entity_type: 'asset',
    entity_id: asset.id,
    payload: data
  });

  return asset;
};

const updateAsset = async (id, data, actor_enrollment_no) => {
  const existingAsset = await assetModel.getAssetById(id);
  if (!existingAsset) {
    throw new Error('Asset not found');
  }

  if (data.total_quantity && data.total_quantity < (existingAsset.total_quantity - existingAsset.available_quantity)) {
    throw new Error('Total quantity cannot be less than already issued quantity');
  }

  const updatedAsset = await assetModel.updateAsset(id, data);
  await auditLogService.log({
    actor_enrollment_no,
    action: 'asset_updated',
    entity_type: 'asset',
    entity_id: id,
    payload: { before: existingAsset, after: updatedAsset }
  });

  return updatedAsset;
};

const deleteAsset = async (id, actor_enrollment_no) => {
  const existingAsset = await assetModel.getAssetById(id);
  if (!existingAsset) {
    throw new Error('Asset not found');
  }

  // Check for active bookings
  // This would require a booking model method to check for active bookings
  // For now, we'll assume it's handled in the controller or another service

  await assetModel.deleteAsset(id);
  await auditLogService.log({
    actor_enrollment_no,
    action: 'asset_deleted',
    entity_type: 'asset',
    entity_id: id,
    payload: existingAsset
  });
};

const listAssets = async (filters) => {
  return await assetModel.getAllAssets(filters);
};

const getAsset = async (id) => {
  const asset = await assetModel.getAssetById(id);
  if (!asset) {
    throw new Error('Asset not found');
  }
  return asset;
};

module.exports = {
  createAsset,
  updateAsset,
  deleteAsset,
  listAssets,
  getAsset
};