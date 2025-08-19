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
    <div className="p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-bold text-foreground">Your Action Plans</h2>
          <p className="text-sm text-muted-foreground">Track your learning progress</p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-primary border-primary/30 hover:bg-primary/5 rounded-lg font-medium"
          onClick={onNewPlan}
        >
          + Add New
        </Button>
      </div>

      <div className="space-y-3">
        {actionPlans.slice(0, 3).map((plan) => (
          <div key={plan.id} className="bg-card/70 rounded-xl p-4 border border-border/50 hover:border-primary/30 transition-all duration-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-sm text-foreground mb-1">{plan.title}</h3>
                <p className="text-xs text-muted-foreground">
                  {plan.book} • {plan.author}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {plan.streak > 0 && (
                  <div className="flex items-center gap-1 bg-orange-100 px-2 py-1 rounded-full">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-xs font-bold text-orange-700">{plan.streak}</span>
                  </div>
                )}
                <Lock className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <Badge 
                className={cn(
                  "border-0 text-xs font-medium",
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
                className="text-primary text-xs hover:bg-primary/10 rounded-lg"
                onClick={() => onEditSchedule(plan)}
              >
                {plan.status === "Draft" ? "Set Schedule" : "Edit Schedule"}
              </Button>
            </div>
            
            {plan.streak > 0 && (
              <div className="text-xs text-muted-foreground mt-2 p-2 bg-orange-50 rounded-lg">
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