const express = require('express');
const { createAssetValidator, updateAssetValidator } = require('../validators/asset.validator');
const { createAsset, getAllAssets, getAssetById, updateAsset, deleteAsset } = require('../controllers/asset.controller');
const validate = require('../middlewares/validate.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const { adminOnly } = require('../middlewares/role.middleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/', getAllAssets);
router.get('/:id', getAssetById);
router.post('/', adminOnly, createAssetValidator, validate, createAsset);
router.put('/:id', adminOnly, updateAssetValidator, validate, updateAsset);
router.delete('/:id', adminOnly, deleteAsset);

module.exports = router;