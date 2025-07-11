import { Home, Zap, Users, ClipboardList, Bookmark } from "lucide-react";

export const BottomNavigation = () => {
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t px-4 py-3">
      <div className="flex items-center justify-around">
        <div className="flex flex-col items-center gap-1">
          <Home className="w-6 h-6 text-primary" />
          <span className="text-xs text-primary font-medium">Home</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Zap className="w-6 h-6 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Shorts</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Users className="w-6 h-6 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Authors</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <ClipboardList className="w-6 h-6 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Plans</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Bookmark className="w-6 h-6 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Shelf</span>
        </div>
      </div>
    </div>
  );
};