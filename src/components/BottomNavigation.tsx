import { Home, MessageCircle, Compass, BookOpen, User } from "lucide-react";

interface BottomNavigationProps {
  onNavigateToPlans: () => void;
}

export const BottomNavigation = ({ onNavigateToPlans }: BottomNavigationProps) => {
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md premium-glass border-t border-white/20 px-4 py-3">
      <div className="flex items-center justify-around">
        <div className="flex flex-col items-center gap-1">
          <div className="relative">
            <Home className="w-6 h-6 text-primary" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></div>
          </div>
          <span className="text-xs text-primary font-semibold">Home</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="relative">
            <MessageCircle className="w-6 h-6 text-muted-foreground" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-online-status rounded-full pulse-glow"></div>
          </div>
          <span className="text-xs text-muted-foreground">Chat</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Compass className="w-6 h-6 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Discover</span>
        </div>
        <div className="flex flex-col items-center gap-1 cursor-pointer" onClick={onNavigateToPlans}>
          <BookOpen className="w-6 h-6 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Library</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <User className="w-6 h-6 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Profile</span>
        </div>
      </div>
    </div>
  );
};