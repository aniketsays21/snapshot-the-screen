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
    <div className="py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">My Shelf</h2>
        <span className="text-sm text-muted-foreground">24 items saved</span>
      </div>

      <div className="space-y-3">
        {shelfItems.map((item) => (
          <div key={item.id} className="bg-card rounded-lg p-4 border">
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 ${item.bgColor} rounded-lg flex items-center justify-center`}>
                <item.icon className={`w-4 h-4 ${item.iconColor}`} />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-sm text-foreground">{item.title}</h3>
                <p className="text-xs text-muted-foreground mb-2">{item.description}</p>
                <Button 
                  variant="default" 
                  size="sm" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs mr-2"
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