const auditLogModel = require('../models/auditLog.model');

const log = async ({ actor_enrollment_no, action, entity_type, entity_id, payload }) => {
  try {
    await auditLogModel.createLog({ actor_enrollment_no, action, entity_type, entity_id, payload });
  } catch (error) {
    console.error('Failed to create audit log:', error);
  }
};

const getLogs = async (filters) => {
  return await auditLogModel.getLogs(filters);
};

module.exports = {
  log,
  getLogs
};