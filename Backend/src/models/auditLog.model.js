const supabase = require('../config/supabase');

const createLog = async ({ actor_enrollment_no, action, entity_type, entity_id, payload }) => {
  const { error } = await supabase
    .from('audit_logs')
    .insert([{ actor_enrollment_no, action, entity_type, entity_id, payload }]);

  if (error) console.error('Audit log failed:', error);
};

const getLogs = async ({ entity_type, entity_id, actor_enrollment_no, page = 1, limit = 20 }) => {
  let query = supabase.from('audit_logs').select('*', { count: 'exact' });

  if (entity_type) query = query.eq('entity_type', entity_type);
  if (entity_id) query = query.eq('entity_id', entity_id);
  if (actor_enrollment_no) query = query.eq('actor_enrollment_no', actor_enrollment_no);

  const { data, error, count } = await query
    .range((page - 1) * limit, page * limit - 1);

  if (error) throw error;
  return { data, total: count };
};

module.exports = {
  createLog,
  getLogs
};