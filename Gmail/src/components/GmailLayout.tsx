
import React from 'react';
import { useAppSelector } from '../hooks/useAppSelector';
import Sidebar from './Sidebar';
import Header from './Header';
import EmailList from './EmailList';
import EmailView from './EmailView';
import ComposeEmail from './ComposeEmail';

const GmailLayout = () => {
  const { sidebarOpen, composeOpen } = useAppSelector(state => state.ui);
  const { currentEmail } = useAppSelector(state => state.emails);

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      <Header />
      
      <div className="flex-1 flex overflow-hidden relative">
        <Sidebar />
        
        <main className="flex-1 overflow-hidden">
          <div className="flex h-full">
            <div className={`transition-all duration-300 ${
              currentEmail ? 'w-1/2 lg:w-1/3' : 'w-full'
            }`}>
              <EmailList />
            </div>
            
            {currentEmail && (
              <div className="flex-1 border-l border-gray-200 animate-slide-in-right">
                <EmailView />
              </div>
            )}
          </div>
        </main>
      </div>
      
      {composeOpen && <ComposeEmail />}
    </div>
  );
};

export default GmailLayout;
