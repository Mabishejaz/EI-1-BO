
import React, { useState } from 'react';
import { X, Paperclip, Smile, Link, Send, Minimize2 } from 'lucide-react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { closeCompose } from '../store/uiSlice';
import { addEmail } from '../store/emailsSlice';
import { toast } from 'sonner';
const ComposeEmail = () => {
  const dispatch = useAppDispatch();
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);

  const handleClose = () => {
    dispatch(closeCompose());
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleSend = () => {
    if (!to || !subject || !body) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    
    const newEmail = {
      id: Date.now().toString(),
      from: 'me@gmail.com',
      to: to,
      subject: subject,
      body: body,
      timestamp: new Date(), // Current timestamp ensures it appears at the top
      isRead: true,
      isStarred: false,
      isImportant: false,
      labels: [],
      hasAttachments: false,
      folder: 'sent' as const
    };

    // Add to sent folder
    dispatch(addEmail(newEmail));
    
    toast.success('Email sent successfully!');
    dispatch(closeCompose());
    
    // Reset form
    setTo('');
    setSubject('');
    setBody('');
  };

  const handleSaveDraft = () => {
    if (!to && !subject && !body) {
      toast.error('Nothing to save');
      return;
    }

    const draftEmail = {
      id: Date.now().toString(),
      from: 'me@gmail.com',
      to: to,
      subject: subject || '(no subject)',
      body: body,
      timestamp: new Date(),
      isRead: true,
      isStarred: false,
      isImportant: false,
      labels: ['Draft'],
      hasAttachments: false,
      folder: 'drafts' as const
    };

    dispatch(addEmail(draftEmail));
    toast.success('Draft saved');
  };

  return (
    <div className={`fixed bottom-0 right-6 bg-white rounded-t-lg shadow-2xl border border-gray-200 transition-all duration-300 ${
      isMinimized ? 'w-64 h-12' : 'w-96 h-[500px]'
    } animate-slide-in-right z-50`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
        <h3 className="font-medium text-gray-900">New Message</h3>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleMinimize}
            className="p-1 hover:bg-gray-200 rounded transition-colors duration-200"
          >
            <Minimize2 className="h-4 w-4 text-gray-600" />
          </button>
          <button 
            onClick={handleClose}
            className="p-1 hover:bg-gray-200 rounded transition-colors duration-200"
          >
            <X className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <div className="flex flex-col h-full">
          <div className="p-4 space-y-3 flex-1">
            <div>
              <input
                type="email"
                placeholder="To"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full px-0 py-2 border-0 border-b border-gray-200 focus:border-blue-500 focus:outline-none transition-colors duration-200"
              />
            </div>
            
            <div>
              <input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-0 py-2 border-0 border-b border-gray-200 focus:border-blue-500 focus:outline-none transition-colors duration-200"
              />
            </div>
            
            <div className="flex-1 pb-20">
              <textarea
                placeholder="Compose email"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full h-full px-0 py-2 border-0 resize-none focus:outline-none"
                style={{ minHeight: '200px' }}
              />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-4 border-t border-gray-200 bg-white rounded-b-lg">
            <div className="flex items-center gap-2">
              <button 
                onClick={handleSend}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                <Send className="h-4 w-4" />
                Send
              </button>
              
              <button 
                onClick={handleSaveDraft}
                className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded transition-colors duration-200"
              >
                Save Draft
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded transition-colors duration-200">
                <Paperclip className="h-4 w-4" />
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded transition-colors duration-200">
                <Link className="h-4 w-4" />
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded transition-colors duration-200">
                <Smile className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComposeEmail;
