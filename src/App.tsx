import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "@/components/AuthProvider";
import { LoginPage } from "@/components/LoginPage";
import Index from "./pages/Index";
import Plans from "./pages/Plans";
import NotFound from "./pages/NotFound";
import { useState } from "react";

const queryClient = new QueryClient();

const AppContent = () => {
  const { user, loading } = useAuth();
  const [actionPlans, setActionPlans] = useState([
    {
      id: "1",
      title: "Daily 2-Minute Rule",
      book: "Atomic Habits",
      author: "James Clear",
      status: "In Progress",
      streak: 7,
      schedule: { frequency: "daily", duration: "15-min" },
      goals: { streakTarget: 30, expertiseWeeks: 8 }
    },
    {
      id: "2", 
      title: "Morning Vulnerability Practice",
      book: "Daring Greatly",
      author: "Brené Brown",
      status: "Scheduled",
      streak: 3,
      schedule: { frequency: "daily", duration: "30-min" },
      goals: { streakTarget: 21, expertiseWeeks: 6 }
    },
    {
      id: "3",
      title: "Weekly 80/20 Review", 
      book: "4-Hour Workweek",
      author: "Tim Ferriss",
      status: "Draft",
      streak: 0,
      schedule: { frequency: "weekly", duration: "1-hour" },
      goals: { streakTarget: 12, expertiseWeeks: 12 }
    }
  ]);

  const [currentView, setCurrentView] = useState<'home' | 'plans'>('home');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage onSuccess={() => {}} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            currentView === 'home' ? (
              <Index 
                actionPlans={actionPlans}
                setActionPlans={setActionPlans}
                onNavigateToPlans={() => setCurrentView('plans')}
              />
            ) : (
              <Plans 
                actionPlans={actionPlans}
                setActionPlans={setActionPlans}
                onBack={() => setCurrentView('home')}
              />
            )
          } 
        />
        <Route path="/auth/callback" element={<div>Processing...</div>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AppContent />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
