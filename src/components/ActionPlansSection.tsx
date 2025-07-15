import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";

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

interface ActionPlansSectionProps {
  actionPlans: ActionPlan[];
  onNewPlan: () => void;
  onEditSchedule: (plan: ActionPlan) => void;
  onSeeAll?: () => void;
}

export const ActionPlansSection = ({ actionPlans, onNewPlan, onEditSchedule, onSeeAll }: ActionPlansSectionProps) => {
  return (
    <div className="py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Action Plans</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-primary"
          onClick={onNewPlan}
        >
          + New Plan
        </Button>
      </div>

      <div className="space-y-4">
        {actionPlans.slice(0, 3).map((plan) => (
          <div key={plan.id} className="bg-card rounded-lg p-4 border">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-medium text-sm text-foreground">{plan.title}</h3>
              <div className="flex items-center gap-2">
                {plan.streak > 0 && (
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-xs font-medium text-orange-600">{plan.streak}</span>
                  </div>
                )}
                <Lock className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              From: {plan.book} • {plan.author}
            </p>
            <div className="flex items-center justify-between mb-2">
              <Badge 
                className={cn(
                  "border-0",
                  plan.status === "In Progress" && "bg-blue-100 text-blue-700",
                  plan.status === "Scheduled" && "bg-green-100 text-green-700", 
                  plan.status === "Draft" && "bg-gray-100 text-gray-700"
                )}
              >
                {plan.status}
              </Badge>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-primary text-xs"
                onClick={() => onEditSchedule(plan)}
              >
                {plan.status === "Draft" ? "Set Schedule" : "Edit Schedule"}
              </Button>
            </div>
            {plan.streak > 0 && (
              <div className="text-xs text-muted-foreground">
                🔥 {plan.streak} day streak • {plan.goals.streakTarget - plan.streak} days to goal
              </div>
            )}
          </div>
        ))}
        
        {onSeeAll && actionPlans.length > 3 && (
          <div className="pt-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full text-primary"
              onClick={onSeeAll}
            >
              See all {actionPlans.length} plans
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};