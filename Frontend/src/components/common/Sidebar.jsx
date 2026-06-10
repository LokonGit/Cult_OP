import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const adminLinks = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/assets', label: 'Assets' },
  { to: '/admin/bookings', label: 'Bookings' },
];

const userLinks = [
  { to: '/dashboard', label: 'Dashboard', end: true },
  { to: '/dashboard/assets', label: 'Assets' },
  { to: '/dashboard/bookings', label: 'My Bookings' },
];

const Sidebar = () => {
  const { user } = useAuth();
  const links = user?.role === 'admin' ? adminLinks : userLinks;

  return (
    <div className="w-64 h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-700">
        <span className="text-xl font-bold text-blue-600">AMS</span>
      </div>
      <nav className="flex-1 px-4 py-6 flex flex-col gap-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
      <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-400 dark:text-gray-500">Logged in as</p>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{user?.name}</p>
        <p className="text-xs text-gray-400 dark:text-gray-500">{user?.role}</p>
      </div>
    </div>
  );
};

export default Sidebar;