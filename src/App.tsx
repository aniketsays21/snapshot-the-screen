import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Plans from "./pages/Plans";
import NotFound from "./pages/NotFound";
import { useState } from "react";

const queryClient = new QueryClient();

const App = () => {
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

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
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
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
