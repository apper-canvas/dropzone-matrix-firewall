import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useContext } from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { AuthContext } from "@/App";

const UserSection = () => {
const { user, isAuthenticated, userType, userRole } = useSelector((state) => state.user);
  const { logout } = useContext(AuthContext);

  if (!isAuthenticated || !user) {
    return null;
  }

  // Get user type badge styling
const getUserTypeBadge = (type) => {
    if (!type) return null;
    
    const badgeStyles = {
      'Admin': 'bg-gradient-to-r from-blue-500 to-blue-600 text-white',
      'Standard': 'bg-gradient-to-r from-purple-500 to-purple-600 text-white',
      'Guest': 'bg-gray-600 text-gray-200'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${badgeStyles[type] || badgeStyles['Guest']}`}>
        {type}
      </span>
    );
  };

  const getUserRoleBadge = (role) => {
    if (!role) return null;
    
    const roleBadgeStyles = {
      'Admin': 'bg-gradient-to-r from-orange-500 to-orange-600 text-white',
      'Manager': 'bg-gradient-to-r from-teal-500 to-teal-600 text-white',
      'Developer': 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white',
      'Designer': 'bg-gradient-to-r from-pink-500 to-pink-600 text-white',
      'Standard': 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white',
      'Guest': 'bg-slate-600 text-slate-200'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${roleBadgeStyles[role] || roleBadgeStyles['Guest']}`}>
        {role}
      </span>
    );
  };

  const handleLogout = async () => {
    await logout();
  };

return (
    <div className="flex items-center space-x-3">
      <div className="hidden sm:block text-right">
<div className="flex items-center justify-end space-x-2 mb-1">
          <p className="text-sm font-medium text-white">
            {user.firstName} {user.lastName}
          </p>
          <div className="flex items-center space-x-1">
            {getUserTypeBadge(userType)}
            {getUserRoleBadge(userRole)}
          </div>
        </div>
        <p className="text-xs text-gray-400">{user.emailAddress}</p>
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={handleLogout}
        className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-surface/60"
      >
        <ApperIcon name="LogOut" size={16} />
        <span className="hidden sm:inline">Logout</span>
      </Button>
    </div>
  );
};

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-r from-surface/80 to-background/80 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-xl shadow-lg">
              <ApperIcon name="CloudUpload" size={24} className="text-white" />
            </div>
<div>
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Files Manager Pro
              </h1>
              <p className="text-gray-400 text-sm">
                Upload and manage your files with ease
              </p>
            </div>
          </div>
<div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 bg-surface/60 rounded-lg px-4 py-2">
              <ApperIcon name="Shield" size={16} className="text-green-400" />
              <span className="text-sm text-green-400 font-medium">Secure Upload</span>
            </div>
            
            <div className="hidden sm:flex items-center space-x-2 bg-surface/60 rounded-lg px-4 py-2">
              <ApperIcon name="Zap" size={16} className="text-yellow-400" />
              <span className="text-sm text-yellow-400 font-medium">Fast Processing</span>
            </div>

            <UserSection />
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;