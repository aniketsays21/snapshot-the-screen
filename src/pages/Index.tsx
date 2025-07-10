import { Bell, User, Home, Zap, Users, ClipboardList, Bookmark, Calendar, Lock, FileText, MessageSquare, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import jamesClearImg from "@/assets/james-clear.jpg";
import breneBrownImg from "@/assets/brene-brown.jpg";
import timFerrissImg from "@/assets/tim-ferriss.jpg";
import carolDweckImg from "@/assets/carol-dweck.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background max-w-md mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary via-purple-600 to-blue-600 px-4 py-6 text-white">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-medium">Hi Aniket 👋</h1>
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6" />
            <User className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="px-4 pb-20">
        {/* Today's Power Shorts */}
        <div className="py-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Today's Power Shorts</h2>
            <Badge className="bg-primary text-primary-foreground rounded-full px-3 py-1">
              18 New
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-4 text-white">
              <div className="text-sm font-medium mb-2">Productivity</div>
              <p className="text-sm mb-4 leading-relaxed">
                "The 2-minute rule: If it takes less than 2 minutes, do it now instead of adding it to your to-do list."
              </p>
              <Button 
                variant="secondary" 
                size="sm" 
                className="bg-white/20 text-white border-white/20 hover:bg-white/30"
              >
                Read Full Explanation
              </Button>
            </div>
            
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-4 text-white">
              <div className="text-sm font-medium mb-2">Minds</div>
              <p className="text-sm mb-4 leading-relaxed">
                "Your comfort zone is a beautiful place, but nothing ever grows there." - Growth
              </p>
              <Button 
                variant="secondary" 
                size="sm" 
                className="bg-white/20 text-white border-white/20 hover:bg-white/30"
              >
                Read
              </Button>
            </div>
          </div>
        </div>

        {/* Talk to Authors */}
        <div className="py-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Talk to Authors</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="relative mb-3">
                <img 
                  src={jamesClearImg} 
                  alt="James Clear" 
                  className="w-16 h-16 rounded-full mx-auto object-cover"
                />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-online-status rounded-full border-2 border-background"></div>
              </div>
              <h3 className="font-medium text-sm text-foreground">James Clear</h3>
              <p className="text-xs text-muted-foreground">Productivity</p>
              <p className="text-xs text-muted-foreground mb-3">Atomic Habits</p>
              <Button 
                variant="default" 
                size="sm" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg"
              >
                Chat Now
              </Button>
            </div>

            <div className="text-center">
              <div className="relative mb-3">
                <img 
                  src={breneBrownImg} 
                  alt="Brené Brown" 
                  className="w-16 h-16 rounded-full mx-auto object-cover"
                />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-online-status rounded-full border-2 border-background"></div>
              </div>
              <h3 className="font-medium text-sm text-foreground">Brené Brown</h3>
              <p className="text-xs text-muted-foreground">Psychology</p>
              <p className="text-xs text-muted-foreground mb-3">Daring Greatly</p>
              <Button 
                variant="default" 
                size="sm" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg"
              >
                Chat Now
              </Button>
            </div>

            <div className="text-center">
              <div className="relative mb-3">
                <img 
                  src={timFerrissImg} 
                  alt="Tim Ferriss" 
                  className="w-16 h-16 rounded-full mx-auto object-cover"
                />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-online-status rounded-full border-2 border-background"></div>
              </div>
              <h3 className="font-medium text-sm text-foreground">Tim Ferriss</h3>
              <p className="text-xs text-muted-foreground">Business</p>
              <p className="text-xs text-muted-foreground mb-3">4-Hour Workweek</p>
              <Button 
                variant="default" 
                size="sm" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg"
              >
                Chat Now
              </Button>
            </div>

            <div className="text-center">
              <div className="relative mb-3">
                <img 
                  src={carolDweckImg} 
                  alt="Carol Dweck" 
                  className="w-16 h-16 rounded-full mx-auto object-cover"
                />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-online-status rounded-full border-2 border-background"></div>
              </div>
              <h3 className="font-medium text-sm text-foreground">Carol Dweck</h3>
              <p className="text-xs text-muted-foreground">Mindset</p>
              <p className="text-xs text-muted-foreground mb-3">Growth Mindset</p>
              <Button 
                variant="default" 
                size="sm" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg"
              >
                Chat Now
              </Button>
            </div>
          </div>
        </div>

        {/* Action Plans */}
        <div className="py-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Action Plans</h2>
            <Button variant="ghost" size="sm" className="text-primary">
              + New Plan
            </Button>
          </div>

          <div className="space-y-4">
            <div className="bg-card rounded-lg p-4 border">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-sm text-foreground">Daily 2-Minute Rule</h3>
                <Lock className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground mb-3">From: Atomic Habits • James Clear</p>
              <div className="flex items-center justify-between">
                <Badge className="bg-blue-100 text-blue-700 border-0">In Progress</Badge>
                <Button variant="ghost" size="sm" className="text-primary text-xs">
                  Set Schedule
                </Button>
              </div>
            </div>

            <div className="bg-card rounded-lg p-4 border">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-sm text-foreground">Morning Vulnerability Practice</h3>
                <Lock className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground mb-3">From: Chat with Brené Brown</p>
              <div className="flex items-center justify-between">
                <Badge className="bg-green-100 text-green-700 border-0">Scheduled</Badge>
                <Button variant="ghost" size="sm" className="text-primary text-xs">
                  Edit Schedule
                </Button>
              </div>
            </div>

            <div className="bg-card rounded-lg p-4 border">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-sm text-foreground">Weekly 80/20 Review</h3>
                <Lock className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground mb-3">From: 4-Hour Workweek • Tim Ferriss</p>
              <div className="flex items-center justify-between">
                <Badge className="bg-gray-100 text-gray-700 border-0">Draft</Badge>
                <Button variant="ghost" size="sm" className="text-primary text-xs">
                  Set Schedule
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* My Shelf */}
        <div className="py-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">My Shelf</h2>
            <span className="text-sm text-muted-foreground">24 items saved</span>
          </div>

          <div className="space-y-3">
            <div className="bg-card rounded-lg p-4 border">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm text-foreground">Growth Mindset Chat</h3>
                  <p className="text-xs text-muted-foreground mb-2">Saved from Carol Dweck conversation</p>
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs mr-2"
                  >
                    Add to Action Plan
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg p-4 border">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-4 h-4 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm text-foreground">Productivity Power Short</h3>
                  <p className="text-xs text-muted-foreground mb-2">The 2-minute rule explanation</p>
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs mr-2"
                  >
                    Add to Action Plan
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg p-4 border">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-4 h-4 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm text-foreground">Leadership Insights</h3>
                  <p className="text-xs text-muted-foreground mb-2">Taking care of your team discussion</p>
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs mr-2"
                  >
                    Add to Action Plan
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
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
    </div>
  );
};

export default Index;