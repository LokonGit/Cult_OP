import { getStatusColor, formatStatus } from '../../utils/helpers';

const Badge = ({ status }) => {
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
      {formatStatus(status)}
    </span>
  );
};

export default Badge;