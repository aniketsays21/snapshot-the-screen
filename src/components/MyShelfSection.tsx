import { Button } from "@/components/ui/button";
import { MessageSquare, Zap, FileText } from "lucide-react";

export const MyShelfSection = ({ onAddToActionPlan }: { onAddToActionPlan?: () => void }) => {
  const shelfItems = [
    {
      id: "1",
      title: "Growth Mindset Chat",
      description: "Saved from Carol Dweck conversation",
      icon: MessageSquare,
      bgColor: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      id: "2",
      title: "Productivity Power Short",
      description: "The 2-minute rule explanation",
      icon: Zap,
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600"
    },
    {
      id: "3",
      title: "Leadership Insights",
      description: "Taking care of your team discussion",
      icon: FileText,
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600"
    }
  ];

  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-bold text-foreground">My Shelf</h2>
          <p className="text-sm text-muted-foreground">Your saved insights and notes</p>
        </div>
        <span className="text-sm text-primary font-medium">24 items</span>
      </div>

      <div className="space-y-3">
        {shelfItems.map((item) => (
          <div key={item.id} className="bg-card/70 rounded-xl p-4 border border-border/50 hover:border-primary/30 transition-all duration-200">
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 ${item.bgColor} rounded-xl flex items-center justify-center ring-2 ring-white/50`}>
                <item.icon className={`w-5 h-5 ${item.iconColor}`} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm text-foreground mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground mb-3">{item.description}</p>
                <Button 
                  variant="default" 
                  size="sm" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs rounded-lg h-8 font-medium"
                  onClick={onAddToActionPlan}
                >
                  Add to Action Plan
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};