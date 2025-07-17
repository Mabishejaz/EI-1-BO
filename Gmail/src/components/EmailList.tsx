
import React from 'react';
import { 
  Star, 
  Archive, 
  Trash2, 
  MoreHorizontal,
  Paperclip,
  AlertCircle,
  RefreshCw,
  Inbox
} from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { 
  toggleEmailSelection, 
  selectAllEmails, 
  deselectAllEmails,
  toggleStar,
  toggleImportant,
  setCurrentEmail,
  markAsRead,
  deleteEmails,
  archiveEmails,
  refreshEmails
} from '../store/emailsSlice';
import { toast } from 'sonner';

const EmailList = () => {
  const dispatch = useAppDispatch();
  const { emails, selectedEmails, currentFolder, searchQuery } = useAppSelector(state => state.emails);

  const filteredEmails = emails.filter(email => {
    const matchesFolder = currentFolder === 'starred' 
      ? email.isStarred 
      : currentFolder === 'important' 
      ? email.isImportant 
      : currentFolder === 'sent'
      ? email.folder === 'sent'
      : currentFolder === 'drafts'
      ? email.folder === 'drafts'
      : currentFolder === 'trash'
      ? email.folder === 'trash'
      : email.folder === 'inbox' || email.folder === 'sent'; // Show both inbox and sent emails in main view
    
    const matchesSearch = searchQuery === '' || 
      email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.body.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFolder && matchesSearch;
  }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const handleSelectAll = () => {
    if (selectedEmails.length === filteredEmails.length) {
      dispatch(deselectAllEmails());
    } else {
      dispatch(selectAllEmails());
    }
  };

  const handleEmailClick = (email: any) => {
    dispatch(setCurrentEmail(email));
    if (!email.isRead) {
      dispatch(markAsRead([email.id]));
    }
  };

  const handleStarClick = (e: React.MouseEvent, emailId: string) => {
    e.stopPropagation();
    dispatch(toggleStar(emailId));
    toast.success('Email starred');
  };

  const handleImportantClick = (e: React.MouseEvent, emailId: string) => {
    e.stopPropagation();
    dispatch(toggleImportant(emailId));
    toast.success('Email marked as important');
  };

  const handleDelete = () => {
    if (selectedEmails.length > 0) {
      dispatch(deleteEmails(selectedEmails));
      toast.success(`${selectedEmails.length} email(s) moved to trash`);
    }
  };

  const handleArchive = () => {
    if (selectedEmails.length > 0) {
      dispatch(archiveEmails(selectedEmails));
      toast.success(`${selectedEmails.length} email(s) archived`);
    }
  };

  const handleRefresh = () => {
    dispatch(refreshEmails());
    toast.success('Emails refreshed');
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <Checkbox
            checked={selectedEmails.length === filteredEmails.length && filteredEmails.length > 0}
            onCheckedChange={handleSelectAll}
            className="h-5 w-5"
          />
          
          {selectedEmails.length > 0 && (
            <div className="flex items-center gap-2 animate-fade-in">
              <button
                onClick={handleArchive}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                title="Archive"
              >
                <Archive className="h-4 w-4 text-gray-600" />
              </button>
              <button
                onClick={handleDelete}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                title="Delete"
              >
                <Trash2 className="h-4 w-4 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
                <MoreHorizontal className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 ml-auto">
          <span className="text-sm text-gray-500 hidden sm:inline">
            {filteredEmails.length} emails
          </span>
          <button 
            onClick={handleRefresh}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            title="Refresh"
          >
            <RefreshCw className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredEmails.length === 0 ? (
          <div className="flex items-center justify-center h-64 text-gray-500">
            <div className="text-center">
              <Inbox className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No emails found</p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredEmails.map((email) => (
              <div
                key={email.id}
                onClick={() => handleEmailClick(email)}
                className={`flex items-center gap-2 sm:gap-4 p-2 sm:p-4 hover:bg-gray-50 cursor-pointer transition-all duration-200 ${
                  !email.isRead ? 'bg-white border-l-4 border-l-blue-500' : 'bg-gray-50'
                } ${selectedEmails.includes(email.id) ? 'bg-blue-50' : ''}`}
              >
                <Checkbox
                  checked={selectedEmails.includes(email.id)}
                  onCheckedChange={() => dispatch(toggleEmailSelection(email.id))}
                  onClick={(e) => e.stopPropagation()}
                  className="h-5 w-5 flex-shrink-0"
                />

                <button
                  onClick={(e) => handleStarClick(e, email.id)}
                  className="flex-shrink-0 hover:scale-110 transition-transform duration-200"
                >
                  <Star 
                    className={`h-5 w-5 ${
                      email.isStarred ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`} 
                  />
                </button>

                <button
                  onClick={(e) => handleImportantClick(e, email.id)}
                  className="flex-shrink-0 hover:scale-110 transition-transform duration-200 hidden sm:block"
                >
                  <AlertCircle 
                    className={`h-5 w-5 ${
                      email.isImportant ? 'text-yellow-600 fill-current' : 'text-gray-300'
                    }`} 
                  />
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm truncate ${
                          !email.isRead ? 'font-semibold text-gray-900' : 'text-gray-700'
                        }`}>
                          {email.from}
                        </span>
                        {email.hasAttachments && (
                          <Paperclip className="h-4 w-4 text-gray-400 flex-shrink-0 hidden sm:block" />
                        )}
                      </div>
                      
                      <div className="mt-1">
                        <span className={`text-sm ${
                          !email.isRead ? 'font-medium text-gray-900' : 'text-gray-600'
                        }`}>
                          {email.subject}
                        </span>
                        <span className="text-sm text-gray-500 ml-2 hidden sm:inline">
                          - {email.body.substring(0, 50)}...
                        </span>
                      </div>
                      
                      {email.labels.length > 0 && (
                        <div className="mt-2 flex gap-1 hidden sm:flex">
                          {email.labels.map((label) => (
                            <span
                              key={label}
                              className="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded"
                            >
                              {label}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex-shrink-0 ml-2 sm:ml-4 text-right">
                      <span className="text-xs sm:text-sm text-gray-500">
                        {formatTime(email.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailList;
