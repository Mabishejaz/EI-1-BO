
import React from 'react';
import { 
  Inbox, 
  Star, 
  Send, 
  FileText, 
  Trash2, 
  Archive, 
  AlertCircle,
  Plus,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { setCurrentFolder } from '../store/emailsSlice';
import { openCompose } from '../store/uiSlice';
import { toast } from 'sonner';

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const { currentFolder, emails } = useAppSelector(state => state.emails);
  const { sidebarOpen } = useAppSelector(state => state.ui);

  const handleFolderClick = (folder: string) => {
    dispatch(setCurrentFolder(folder));
    toast.success(`Switched to ${folder}`);
  };

  const handleComposeClick = () => {
    dispatch(openCompose());
    toast.success('Compose window opened');
  };

  const getUnreadCount = (folder: string) => {
    return emails.filter(email => email.folder === folder && !email.isRead).length;
  };

  const menuItems = [
    { id: 'inbox', icon: Inbox, label: 'Inbox', count: getUnreadCount('inbox') },
    { id: 'starred', icon: Star, label: 'Starred', count: emails.filter(e => e.isStarred).length },
    { id: 'sent', icon: Send, label: 'Sent', count: 0 },
    { id: 'drafts', icon: FileText, label: 'Drafts', count: getUnreadCount('drafts') },
    { id: 'important', icon: AlertCircle, label: 'Important', count: emails.filter(e => e.isImportant).length },
    { id: 'spam', icon: Archive, label: 'Spam', count: getUnreadCount('spam') },
    { id: 'trash', icon: Trash2, label: 'Trash', count: getUnreadCount('trash') },
  ];

  return (
    <aside className={`w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 ${
      sidebarOpen ? 'translate-x-0' : '-translate-x-full'
    } fixed left-0 top-16 bottom-0 z-10 lg:relative lg:top-0 lg:translate-x-0`}>
      <div className="p-4">
        <button
          onClick={handleComposeClick}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-full flex items-center gap-3 font-medium transition-all duration-200 hover:shadow-lg transform hover:scale-105"
        >
          <Plus className="h-5 w-5" />
          <span className="hidden sm:inline">Compose</span>
        </button>
      </div>

      <nav className="flex-1 px-2 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleFolderClick(item.id)}
                className={`w-full flex items-center justify-between px-4 py-2 rounded-r-full transition-all duration-200 hover:bg-gray-100 ${
                  currentFolder === item.id ? 'bg-red-100 text-red-700 font-medium' : 'text-gray-700'
                }`}
              >
                <div className="flex items-center gap-4">
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  <span className="hidden sm:inline">{item.label}</span>
                </div>
                {item.count > 0 && (
                  <span className="text-sm bg-gray-200 text-gray-700 px-2 py-1 rounded-full hidden sm:inline">
                    {item.count}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
