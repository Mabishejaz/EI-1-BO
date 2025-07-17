
import React from 'react';
import { 
  ArrowLeft, 
  Archive, 
  Trash2, 
  Reply, 
  ReplyAll, 
  Forward,
  Star,
  AlertCircle,
  MoreHorizontal,
  Printer,
  Download
} from 'lucide-react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { setCurrentEmail, toggleStar, toggleImportant, deleteEmails } from '../store/emailsSlice';
import { toast } from 'sonner';

const EmailView = () => {
  const dispatch = useAppDispatch();
  const { currentEmail } = useAppSelector(state => state.emails);

  if (!currentEmail) return null;

  const handleBack = () => {
    dispatch(setCurrentEmail(null));
  };

  const handleStar = () => {
    dispatch(toggleStar(currentEmail.id));
    toast.success(currentEmail.isStarred ? 'Removed from starred' : 'Added to starred');
  };

  const handleImportant = () => {
    dispatch(toggleImportant(currentEmail.id));
    toast.success(currentEmail.isImportant ? 'Removed from important' : 'Marked as important');
  };

  const handleDelete = () => {
    dispatch(deleteEmails([currentEmail.id]));
    dispatch(setCurrentEmail(null));
    toast.success('Email moved to trash');
  };

  const handleReply = () => {
    toast.success('Reply compose opened');
  };

  const handleReplyAll = () => {
    toast.success('Reply all compose opened');
  };

  const handleForward = () => {
    toast.success('Forward compose opened');
  };

  const formatFullDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <button 
            onClick={handleBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={handleStar}
              className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-110"
            >
              <Star className={`h-5 w-5 ${
                currentEmail.isStarred ? 'text-yellow-400 fill-current' : 'text-gray-400'
              }`} />
            </button>
            
            <button 
              onClick={handleImportant}
              className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-110"
            >
              <AlertCircle className={`h-5 w-5 ${
                currentEmail.isImportant ? 'text-yellow-600 fill-current' : 'text-gray-400'
              }`} />
            </button>
            
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
              <Archive className="h-5 w-5 text-gray-600" />
            </button>
            
            <button 
              onClick={handleDelete}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <Trash2 className="h-5 w-5 text-gray-600" />
            </button>
            
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
              <MoreHorizontal className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
            <Printer className="h-5 w-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
            <Download className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-normal text-gray-900 mb-6">
              {currentEmail.subject}
            </h1>
            
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">
                    {currentEmail.from.charAt(0).toUpperCase()}
                  </span>
                </div>
                
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">
                      {currentEmail.from}
                    </span>
                    {currentEmail.isImportant && (
                      <AlertCircle className="h-4 w-4 text-yellow-600 fill-current" />
                    )}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    to {currentEmail.to}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-sm text-gray-500">
                  {formatFullDate(currentEmail.timestamp)}
                </div>
                {currentEmail.isStarred && (
                  <Star className="h-4 w-4 text-yellow-400 fill-current mt-1 ml-auto" />
                )}
              </div>
            </div>
          </div>

          <div className="prose max-w-none">
            <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
              {currentEmail.body}
            </div>
          </div>

          {currentEmail.labels.length > 0 && (
            <div className="mt-6 flex gap-2">
              {currentEmail.labels.map((label) => (
                <span
                  key={label}
                  className="inline-block bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                >
                  {label}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center gap-2">
          <button 
            onClick={handleReply}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200"
          >
            <Reply className="h-4 w-4" />
            Reply
          </button>
          
          <button 
            onClick={handleReplyAll}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors duration-200"
          >
            <ReplyAll className="h-4 w-4" />
            Reply all
          </button>
          
          <button 
            onClick={handleForward}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors duration-200"
          >
            <Forward className="h-4 w-4" />
            Forward
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailView;
