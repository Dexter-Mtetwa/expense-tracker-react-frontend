import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider, useAuth } from './context/AuthContext';

import Sidebar from './components/Navigation/Sidebar';
import Header from './components/Navigation/Header';

import AuthContainer from './components/Auth/AuthContainer';
import DashboardView from './components/Dashboard/DashboardView';
import ExpensesView from './components/Expenses/ExpensesView';
import CategoriesView from './components/Categories/CategoriesView';
import UsersView from './components/Users/UsersView';
import GuideView from './components/Guide/GuideView';

import ToastContainer from './components/UI/Toast';
import WelcomeTutorialModal from './components/UI/WelcomeTutorialModal';

function MainApp() {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isCreateExpenseOpen, setIsCreateExpenseOpen] = useState(false);

  if (!isAuthenticated) {
    return (
      <>
        <AuthContainer />
        <ToastContainer />
      </>
    );
  }

  const getPageTitle = () => {
    switch (activeTab) {
      case 'expenses': return 'Expense Records';
      case 'categories': return 'Category Management';
      case 'guide': return 'App Guide & System Rules';
      case 'users': return 'User Directory & RBAC';
      default: return 'Financial Overview';
    }
  };

  const handleOpenNewExpense = () => {
    setActiveTab('expenses');
    setIsCreateExpenseOpen(true);
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Area */}
      <div className="main-content">
        <Header
          title={getPageTitle()}
          onOpenNewExpense={handleOpenNewExpense}
        />

        <main className="page-wrapper animate-fade-in">
          {activeTab === 'dashboard' && (
            <DashboardView onNavigateToExpenses={() => setActiveTab('expenses')} />
          )}

          {activeTab === 'expenses' && (
            <ExpensesView
              isCreateOpen={isCreateExpenseOpen}
              setIsCreateOpen={setIsCreateExpenseOpen}
            />
          )}

          {activeTab === 'categories' && (
            <CategoriesView />
          )}

          {activeTab === 'guide' && (
            <GuideView />
          )}

          {activeTab === 'users' && (
            <UsersView />
          )}
        </main>
      </div>

      <WelcomeTutorialModal />
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <MainApp />
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
