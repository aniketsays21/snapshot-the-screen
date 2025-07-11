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

const Index = () => {
  const [selectedStory, setSelectedStory] = useState<any>(null);
  const [selectedAuthor, setSelectedAuthor] = useState<any>(null);
  const [showActionPlanCreator, setShowActionPlanCreator] = useState(false);
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

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto">
      <AppHeader />

      <div className="px-4 pb-20">
        <PowerShortsSection onStorySelect={setSelectedStory} />
        <AuthorsSection onAuthorSelect={setSelectedAuthor} />
        <ActionPlansSection 
          actionPlans={actionPlans}
          onNewPlan={() => setShowActionPlanCreator(true)}
        />
        <MyShelfSection />
      </div>

      <BottomNavigation />

      {/* Story Viewer */}
      {selectedStory && (
        <PowerStory
          book={selectedStory}
          onClose={() => setSelectedStory(null)}
        />
      )}

      {/* Author Chat */}
      {selectedAuthor && (
        <AuthorChat
          author={selectedAuthor}
          onClose={() => setSelectedAuthor(null)}
        />
      )}

      {/* Action Plan Creator */}
      {showActionPlanCreator && (
        <ActionPlanCreator
          onClose={() => setShowActionPlanCreator(false)}
          onCreatePlan={(plan) => {
            setActionPlans([...actionPlans, plan]);
            setShowActionPlanCreator(false);
          }}
        />
      )}
    </div>
  );
};

export default Index;