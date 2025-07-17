import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Email {
  id: string;
  from: string;
  to: string;
  subject: string;
  body: string;
  timestamp: Date;
  isRead: boolean;
  isStarred: boolean;
  isImportant: boolean;
  labels: string[];
  hasAttachments: boolean;
  folder: 'inbox' | 'sent' | 'drafts' | 'spam' | 'trash' | 'starred' | 'important';
}

interface EmailsState {
  emails: Email[];
  selectedEmails: string[];
  currentEmail: Email | null;
  searchQuery: string;
  currentFolder: string;
}

const initialState: EmailsState = {
  emails: [
    {
      id: '1',
      from: 'john.doe@company.com',
      to: 'me@gmail.com',
      subject: 'Important Project Update',
      body: 'Hi there,\n\nI wanted to update you on the latest project developments. We have made significant progress on the frontend implementation and are ahead of schedule.\n\nPlease let me know if you have any questions.\n\nBest regards,\nJohn',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isRead: false,
      isStarred: true,
      isImportant: true,
      labels: ['Work'],
      hasAttachments: false,
      folder: 'inbox'
    },
    {
      id: '2',
      from: 'notifications@github.com',
      to: 'me@gmail.com',
      subject: 'New pull request in your repository',
      body: 'A new pull request has been opened in your repository. Please review the changes and provide feedback.',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      isRead: true,
      isStarred: false,
      isImportant: false,
      labels: ['GitHub'],
      hasAttachments: false,
      folder: 'inbox'
    },
    {
      id: '3',
      from: 'team@company.com',
      to: 'me@gmail.com',
      subject: 'Weekly Team Meeting Notes',
      body: 'Hello team,\n\nPlease find attached the notes from our weekly team meeting. We discussed the upcoming deadlines and assigned new tasks.\n\nThanks,\nTeam Lead',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      isRead: false,
      isStarred: false,
      isImportant: false,
      labels: ['Work', 'Meetings'],
      hasAttachments: true,
      folder: 'inbox'
    },
    {
      id: '4',
      from: 'support@service.com',
      to: 'me@gmail.com',
      subject: 'Your subscription expires soon',
      body: 'Your premium subscription will expire in 7 days. Renew now to continue enjoying premium features.',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      isRead: false,
      isStarred: false,
      isImportant: false,
      labels: ['Subscriptions'],
      hasAttachments: false,
      folder: 'inbox'
    }
  ],
  selectedEmails: [],
  currentEmail: null,
  searchQuery: '',
  currentFolder: 'inbox'
};

const emailsSlice = createSlice({
  name: 'emails',
  initialState,
  reducers: {
    toggleEmailSelection: (state, action: PayloadAction<string>) => {
      const emailId = action.payload;
      const index = state.selectedEmails.indexOf(emailId);
      if (index === -1) {
        state.selectedEmails.push(emailId);
      } else {
        state.selectedEmails.splice(index, 1);
      }
    },
    selectAllEmails: (state) => {
      const visibleEmails = state.emails.filter(email => 
        email.folder === state.currentFolder
      );
      state.selectedEmails = visibleEmails.map(email => email.id);
    },
    deselectAllEmails: (state) => {
      state.selectedEmails = [];
    },
    markAsRead: (state, action: PayloadAction<string[]>) => {
      action.payload.forEach(emailId => {
        const email = state.emails.find(email => email.id === emailId);
        if (email) {
          email.isRead = true;
        }
      });
    },
    markAsUnread: (state, action: PayloadAction<string[]>) => {
      action.payload.forEach(emailId => {
        const email = state.emails.find(email => email.id === emailId);
        if (email) {
          email.isRead = false;
        }
      });
    },
    toggleStar: (state, action: PayloadAction<string>) => {
      const email = state.emails.find(email => email.id === action.payload);
      if (email) {
        email.isStarred = !email.isStarred;
      }
    },
    toggleImportant: (state, action: PayloadAction<string>) => {
      const email = state.emails.find(email => email.id === action.payload);
      if (email) {
        email.isImportant = !email.isImportant;
      }
    },
    deleteEmails: (state, action: PayloadAction<string[]>) => {
      action.payload.forEach(emailId => {
        const email = state.emails.find(email => email.id === emailId);
        if (email) {
          email.folder = 'trash';
        }
      });
      state.selectedEmails = [];
    },
    archiveEmails: (state, action: PayloadAction<string[]>) => {
      state.emails = state.emails.filter(email => 
        !action.payload.includes(email.id)
      );
      state.selectedEmails = [];
    },
    setCurrentEmail: (state, action: PayloadAction<Email | null>) => {
      state.currentEmail = action.payload;
      if (action.payload) {
        const email = state.emails.find(email => email.id === action.payload.id);
        if (email) {
          email.isRead = true;
        }
      }
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setCurrentFolder: (state, action: PayloadAction<string>) => {
      state.currentFolder = action.payload;
      state.selectedEmails = [];
      state.currentEmail = null;
    },
    addEmail: (state, action: PayloadAction<Email>) => {
      state.emails.unshift(action.payload);
    },
    refreshEmails: (state) => {
      // Simply refresh the UI state without adding fake emails
      // This simulates refreshing the email list to show all current emails
      state.selectedEmails = [];
      state.searchQuery = '';
    }
  }
});

export const {
  toggleEmailSelection,
  selectAllEmails,
  deselectAllEmails,
  markAsRead,
  markAsUnread,
  toggleStar,
  toggleImportant,
  deleteEmails,
  archiveEmails,
  setCurrentEmail,
  setSearchQuery,
  setCurrentFolder,
  addEmail,
  refreshEmails
} = emailsSlice.actions;

export default emailsSlice.reducer;
