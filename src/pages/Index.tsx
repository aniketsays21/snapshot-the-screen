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
  const [showPowerShorts, setShowPowerShorts] = useState(true);
  const [showActionPlanCreator, setShowActionPlanCreator] = useState(false);
  const [actionPlanData, setActionPlanData] = useState<any>(null);
  const [actionPlanStep, setActionPlanStep] = useState(1);

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto">
      <AppHeader />

      <div className="px-4 pb-20">
        {showPowerShorts && (
          <PowerShortsSection 
            onStorySelect={setSelectedStory} 
            onClose={() => setShowPowerShorts(false)}
          />
        )}
        <AuthorsSection onAuthorSelect={setSelectedAuthor} />
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
        <MyShelfSection onAddToActionPlan={() => {
          setActionPlanStep(3);
          setShowActionPlanCreator(true);
        }} />
      </div>

      <BottomNavigation onNavigateToPlans={onNavigateToPlans} />

      {/* Story Viewer */}
      {selectedStory && (
        <PowerStory
          book={selectedStory}
          onClose={() => setSelectedStory(null)}
          onAddToPlan={(data) => {
            setActionPlanData(data);
            setSelectedStory(null);
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