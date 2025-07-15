import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ActionPlansSection } from "@/components/ActionPlansSection";
import { ActionPlanCreator } from "@/components/ActionPlanCreator";

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

interface PlansProps {
  actionPlans: ActionPlan[];
  setActionPlans: (plans: ActionPlan[]) => void;
  onBack: () => void;
}

const Plans = ({ actionPlans, setActionPlans, onBack }: PlansProps) => {
  const [showActionPlanCreator, setShowActionPlanCreator] = useState(false);
  const [actionPlanData, setActionPlanData] = useState<any>(null);
  const [actionPlanStep, setActionPlanStep] = useState(1);

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b px-4 py-4 z-10">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold text-foreground">Action Plans</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-20">
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
        />
      </div>

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

export default Plans;