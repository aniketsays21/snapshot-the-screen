import { Bell, User } from "lucide-react";

export const AppHeader = () => {
  return (
    <div className="bg-gradient-to-r from-primary via-purple-600 to-blue-600 px-4 py-6 text-white">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-medium">Hi Aniket 👋</h1>
        <div className="flex items-center gap-3">
          <Bell className="w-6 h-6" />
          <User className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};