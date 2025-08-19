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
import { Button } from "@/components/ui/button";

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

interface IndexProps {
  actionPlans: ActionPlan[];
  setActionPlans: (plans: ActionPlan[]) => void;
  onNavigateToPlans: () => void;
}

const Index = ({ actionPlans, setActionPlans, onNavigateToPlans }: IndexProps) => {
  const [selectedStory, setSelectedStory] = useState<any>(null);
  const [selectedAuthor, setSelectedAuthor] = useState<any>(null);
  const [showActionPlanCreator, setShowActionPlanCreator] = useState(false);
  const [actionPlanData, setActionPlanData] = useState<any>(null);
  const [actionPlanStep, setActionPlanStep] = useState(1);

  return (
    <div className="min-h-screen max-w-md mx-auto" style={{ background: 'var(--gradient-subtle)' }}>
      <AppHeader />

      {/* Chat-First Hero Section */}
      <div className="px-4 pt-6 pb-6">
        <div className="hero-gradient premium-glass rounded-3xl p-8 text-center text-white shadow-lg" style={{ boxShadow: 'var(--shadow-floating)' }}>
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 text-sm font-medium mb-4">
              <div className="w-2 h-2 bg-white rounded-full pulse-glow"></div>
              Chat with world-class authors
            </div>
            <h1 className="text-2xl font-bold mb-3">
              Your Personal Growth Journey Starts with a Conversation
            </h1>
            <p className="text-white/90 text-sm leading-relaxed">
              Get personalized insights from bestselling authors. Ask questions, explore ideas, and transform conversations into action plans.
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button 
              onClick={() => setSelectedAuthor(null)}
              className="flex-1 bg-white text-primary hover:bg-white/90 rounded-xl h-12 font-semibold shadow-lg"
            >
              Start Chatting
            </Button>
            <Button 
              variant="outline" 
              onClick={() => {
                setActionPlanStep(1);
                setShowActionPlanCreator(true);
              }}
              className="px-6 rounded-xl h-12 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
            >
              Create Plan
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Chat Access */}
      <div className="px-4 pb-4">
        <div className="bg-white/70 backdrop-blur-md rounded-2xl p-4 border border-white/20">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground">Continue Recent Chats</h3>
            <span className="text-xs text-muted-foreground">3 active</span>
          </div>
          <div className="flex gap-3">
            {[
              { name: "James Clear", avatar: "/assets/james-clear.jpg", lastMessage: "Great question about habits!" },
              { name: "Brené Brown", avatar: "/assets/brene-brown.jpg", lastMessage: "Vulnerability is strength..." },
              { name: "Tim Ferriss", avatar: "/assets/tim-ferriss.jpg", lastMessage: "Focus on the 80/20 rule..." }
            ].map((chat, i) => (
              <div 
                key={i} 
                className="flex-1 bg-white rounded-xl p-3 hover-lift cursor-pointer"
                onClick={() => setSelectedAuthor({ name: chat.name, image: chat.avatar })}
              >
                <div className="relative mb-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full mx-auto"></div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-online-status rounded-full border-2 border-white pulse-glow"></div>
                </div>
                <p className="text-xs font-medium text-center text-foreground truncate">{chat.name}</p>
                <p className="text-xs text-muted-foreground text-center truncate mt-1">{chat.lastMessage}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content - Chat-Focused Layout */}
      <div className="px-4 pb-20 space-y-6">
        {/* Featured Authors - Primary Section */}
        <div className="premium-glass rounded-2xl overflow-hidden" style={{ boxShadow: 'var(--shadow-card)' }}>
          <AuthorsSection onAuthorSelect={setSelectedAuthor} />
        </div>

        {/* Action Plans Integration */}
        {actionPlans.length > 0 && (
          <div className="bg-white/60 backdrop-blur-md rounded-2xl p-1 border border-white/30">
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
              onSeeAll={onNavigateToPlans}
            />
          </div>
        )}

        {/* Supporting Content */}
        <div className="grid grid-cols-1 gap-4">
          {/* Power Shorts */}
          <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-white/30">
            <PowerShortsSection onStorySelect={setSelectedStory} />
          </div>

          {/* My Shelf */}
          <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-white/30">
            <MyShelfSection onAddToActionPlan={() => {
              setActionPlanStep(3);
              setShowActionPlanCreator(true);
            }} />
          </div>
        </div>
      </div>

      <BottomNavigation onNavigateToPlans={onNavigateToPlans} />

      {/* Story Viewer */}
      {selectedStory && (
        <PowerStory
          book={selectedStory}
          onClose={() => setSelectedStory(null)}
          onAddToPlan={(data) => {
            setActionPlanData(data);
            setShowActionPlanCreator(true);
          }}
        />
      )}

      {/* Author Chat */}
      {selectedAuthor && (
        <AuthorChat
          author={selectedAuthor}
          onClose={() => setSelectedAuthor(null)}
          onAddToPlan={(data) => {
            setActionPlanData(data);
            setShowActionPlanCreator(true);
          }}
        />
      )}

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

export default Index;