import { useAuth } from '../../context/AuthContext';


const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="h-16 px-6 flex items-center justify-between bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
        Asset Management System
      </h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600 dark:text-gray-300">{user?.name  || user?.enrollment_no }</span>
        <button
          onClick={logout}
          className="text-sm text-red-500 hover:text-red-600 font-medium"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;