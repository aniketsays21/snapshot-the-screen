import { useState } from "react";
import { PowerStory } from "@/components/PowerStory";
import { AuthorChat } from "@/components/AuthorChat";
import { ActionPlanCreator } from "@/components/ActionPlanCreator";
import { AppHeader } from "@/components/AppHeader";
import { PowerShortsSection } from "@/components/PowerShortsSection";
import { AuthorsSection } from "@/components/AuthorsSection";
import { ActionPlansSection } from "@/components/ActionPlansSection";
import { MyShelfSection } from "@/components/MyShelfSection";
import { BottomNavigation } from "@/components/BottomNavigation";
import { Button } from "@/components/ui/button";

interface ActionPlan {
  id: string;
  title: string;
  book: string;
  author: string;
  status: string;
  streak: number;
  schedule: { frequency: string; duration: string };
  goals: { streakTarget: number; expertiseWeeks: number };
}

interface IndexProps {
  actionPlans: ActionPlan[];
  setActionPlans: (plans: ActionPlan[]) => void;
  onNavigateToPlans: () => void;
}

const Index = ({ actionPlans, setActionPlans, onNavigateToPlans }: IndexProps) => {
  const [selectedStory, setSelectedStory] = useState<any>(null);
  const [selectedAuthor, setSelectedAuthor] = useState<any>(null);
  const [showActionPlanCreator, setShowActionPlanCreator] = useState(false);
  const [actionPlanData, setActionPlanData] = useState<any>(null);
  const [actionPlanStep, setActionPlanStep] = useState(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5 max-w-md mx-auto">
      <AppHeader />

      {/* Quick Action Hero Section */}
      <div className="px-4 pt-6 pb-4">
        <div className="bg-gradient-to-r from-primary/10 via-purple-500/10 to-blue-500/10 rounded-2xl p-6 border border-primary/20 backdrop-blur-sm">
          <h1 className="text-xl font-bold text-foreground mb-2">
            Continue Your Growth Journey
          </h1>
          <p className="text-sm text-muted-foreground mb-4">
            Pick up where you left off or start something new
          </p>
          <div className="flex gap-3">
            <Button 
              onClick={() => {
                setActionPlanStep(1);
                setShowActionPlanCreator(true);
              }}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-12 font-medium"
            >
              Create New Plan
            </Button>
            <Button 
              variant="outline" 
              onClick={onNavigateToPlans}
              className="px-6 rounded-xl h-12 border-primary/30 hover:bg-primary/5"
            >
              View All
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 pb-20 space-y-8">
        {/* Current Action Plans - Priority Section */}
        {actionPlans.length > 0 && (
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-1 border border-border/50">
            <ActionPlansSection 
              actionPlans={actionPlans}
              onNewPlan={() => {
                setActionPlanStep(1);
                setShowActionPlanCreator(true);
              }}
              onEditSchedule={(plan) => {
                setActionPlanData(plan);
                setActionPlanStep(3);
                setShowActionPlanCreator(true);
              }}
              onSeeAll={onNavigateToPlans}
            />
          </div>
        )}

        {/* Learning Content Grid */}
        <div className="space-y-6">
          {/* Power Shorts */}
          <div className="bg-card/30 backdrop-blur-sm rounded-2xl p-1 border border-border/30">
            <PowerShortsSection onStorySelect={setSelectedStory} />
          </div>

          {/* Authors */}
          <div className="bg-card/30 backdrop-blur-sm rounded-2xl p-1 border border-border/30">
            <AuthorsSection onAuthorSelect={setSelectedAuthor} />
          </div>

          {/* My Shelf */}
          <div className="bg-card/30 backdrop-blur-sm rounded-2xl p-1 border border-border/30">
            <MyShelfSection onAddToActionPlan={() => {
              setActionPlanStep(3);
              setShowActionPlanCreator(true);
            }} />
          </div>
        </div>
      </div>

      <BottomNavigation onNavigateToPlans={onNavigateToPlans} />

      {/* Story Viewer */}
      {selectedStory && (
        <PowerStory
          book={selectedStory}
          onClose={() => setSelectedStory(null)}
          onAddToPlan={(data) => {
            setActionPlanData(data);
            setShowActionPlanCreator(true);
          }}
        />
      )}

      {/* Author Chat */}
      {selectedAuthor && (
        <AuthorChat
          author={selectedAuthor}
          onClose={() => setSelectedAuthor(null)}
          onAddToPlan={(data) => {
            setActionPlanData(data);
            setShowActionPlanCreator(true);
          }}
        />
      )}

      {/* Action Plan Creator */}
      {showActionPlanCreator && (
        <ActionPlanCreator
          onClose={() => {
            setShowActionPlanCreator(false);
            setActionPlanData(null);
            setActionPlanStep(1);
          }}
          onCreatePlan={(plan) => {
            setActionPlans([...actionPlans, plan]);
            setShowActionPlanCreator(false);
            setActionPlanData(null);
            setActionPlanStep(1);
          }}
          initialData={actionPlanData}
          initialStep={actionPlanStep}
        />
      )}
    </div>
  );
};

export default Index;