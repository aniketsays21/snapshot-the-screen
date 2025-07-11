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

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto">
      <AppHeader />

      <div className="px-4 pb-20">
        <PowerShortsSection onStorySelect={setSelectedStory} />
        <AuthorsSection onAuthorSelect={setSelectedAuthor} />
        <ActionPlansSection 
          actionPlans={actionPlans}
          onNewPlan={() => setShowActionPlanCreator(true)}
          onSeeAll={onNavigateToPlans}
        />
        <MyShelfSection />
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
          }}
          onCreatePlan={(plan) => {
            setActionPlans([...actionPlans, plan]);
            setShowActionPlanCreator(false);
            setActionPlanData(null);
          }}
          initialData={actionPlanData}
        />
      )}
    </div>
  );
};

export default Index;