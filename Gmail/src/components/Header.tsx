
import React, { useState } from 'react';
import { Search, Menu, Settings, Bell, User, Grid3x3 } from 'lucide-react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { toggleSidebar, toggleSettings } from '../store/uiSlice';
import { setSearchQuery } from '../store/emailsSlice';
import { toast } from 'sonner';

const Header = () => {
  const dispatch = useAppDispatch();
  const { searchQuery } = useAppSelector(state => state.emails);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setSearchQuery(localSearch));
    if (localSearch) {
      toast.success(`Searching for: ${localSearch}`);
    }
  };

  const handleMenuClick = () => {
    dispatch(toggleSidebar());
  };

  const handleSettingsClick = () => {
    dispatch(toggleSettings());
    toast.info('Settings opened');
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center px-4 gap-4">
      <div className="flex items-center gap-4">
        <button
          onClick={handleMenuClick}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
        >
          <Menu className="h-6 w-6 text-gray-600" />
        </button>
        
        <div className="flex items-center gap-2">
          <img 
            src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r2.png" 
            alt="Gmail" 
            className="h-8"
          />
        </div>
      </div>

      <div className="flex-1 max-w-2xl mx-20">
        <form onSubmit={handleSearch} className="relative">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Search mail"
              className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-full focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
          </div>
        </form>
      </div>

      <div className="flex items-center ml-60 gap-2">
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
          <Grid3x3 className="h-6 w-6 text-gray-600" />
        </button>
        
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
          <Bell className="h-6 w-6 text-gray-600" />
        </button>
        
        <button
          onClick={handleSettingsClick}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
        >
          <Settings className="h-6 w-6 text-gray-600" />
        </button>
        
        <div className="ml-4">
          <button className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-200">
            <User className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
