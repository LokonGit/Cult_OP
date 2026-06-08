const assetService = require('../services/asset.service');
const { createdResponse, successResponse } = require('../utils/response');

const createAsset = async (req, res, next) => {
  try {
    const asset = await assetService.createAsset(req.body, req.user.enrollment_no);
    createdResponse(res, asset, 'Asset created successfully');
  } catch (error) {
    next(error);
  }
};

const getAllAssets = async (req, res, next) => {
  try {
    const assets = await assetService.listAssets(req.query);
    successResponse(res, assets, 'Assets retrieved successfully');
  } catch (error) {
    next(error);
  }
};

const getAssetById = async (req, res, next) => {
  try {
    const asset = await assetService.getAsset(req.params.id);
    successResponse(res, asset, 'Asset retrieved successfully');
  } catch (error) {
    next(error);
  }
};

const updateAsset = async (req, res, next) => {
  try {
    const asset = await assetService.updateAsset(req.params.id, req.body, req.user.enrollment_no);
    successResponse(res, asset, 'Asset updated successfully');
  } catch (error) {
    next(error);
  }
};

const deleteAsset = async (req, res, next) => {
  try {
    await assetService.deleteAsset(req.params.id, req.user.enrollment_no);
    successResponse(res, null, 'Asset deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createAsset,
  getAllAssets,
  getAssetById,
  updateAsset,
  deleteAsset
};