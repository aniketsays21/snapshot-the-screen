import { useState } from "react";
import { Bell, User, Home, Zap, Users, ClipboardList, Bookmark, Calendar, Lock, FileText, MessageSquare, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PowerStory } from "@/components/PowerStory";
import { StoryPreview } from "@/components/StoryPreview";
import { AuthorChat } from "@/components/AuthorChat";
import { ActionPlanCreator } from "@/components/ActionPlanCreator";
import { cn } from "@/lib/utils";
import jamesClearImg from "@/assets/james-clear.jpg";
import breneBrownImg from "@/assets/brene-brown.jpg";
import timFerrissImg from "@/assets/tim-ferriss.jpg";
import carolDweckImg from "@/assets/carol-dweck.jpg";

const Index = () => {
  const [selectedStory, setSelectedStory] = useState<any>(null);
  const [selectedAuthor, setSelectedAuthor] = useState<any>(null);
  const [showActionPlanCreator, setShowActionPlanCreator] = useState(false);
  const [actionPlans, setActionPlans] = useState([
    {
      id: "1",
      title: "Daily 2-Minute Rule",
      book: "Atomic Habits",
      author: "James Clear",
      status: "In Progress",
      streak: 7,
      schedule: { frequency: "daily", duration: "15-min" },
      goals: { streakTarget: 30, expertiseWeeks: 8 }
    },
    {
      id: "2", 
      title: "Morning Vulnerability Practice",
      book: "Daring Greatly",
      author: "Brené Brown",
      status: "Scheduled",
      streak: 3,
      schedule: { frequency: "daily", duration: "30-min" },
      goals: { streakTarget: 21, expertiseWeeks: 6 }
    },
    {
      id: "3",
      title: "Weekly 80/20 Review", 
      book: "4-Hour Workweek",
      author: "Tim Ferriss",
      status: "Draft",
      streak: 0,
      schedule: { frequency: "weekly", duration: "1-hour" },
      goals: { streakTarget: 12, expertiseWeeks: 12 }
    }
  ]);

  const books = [
    {
      id: "atomic-habits",
      title: "Atomic Habits",
      author: "James Clear",
      authorImage: jamesClearImg,
      color: "from-purple-500 to-purple-600",
      chapters: [
        {
          id: "ch1",
          title: "The Surprising Power of Atomic Habits",
          content: "Small changes can make a big difference. The aggregation of marginal gains - improving by just 1% each day can lead to remarkable results over time.",
          category: "Foundation"
        },
        {
          id: "ch2",
          title: "The 2-Minute Rule",
          content: "When you start a new habit, it should take less than two minutes to do. The point is to master the habit of showing up, not the performance.",
          category: "Strategy"
        },
        {
          id: "ch3",
          title: "Identity-Based Habits",
          content: "The most effective way to change your habits is to focus not on what you want to achieve, but on who you wish to become.",
          category: "Mindset"
        }
      ]
    },
    {
      id: "daring-greatly",
      title: "Daring Greatly",
      author: "Brené Brown",
      authorImage: breneBrownImg,
      color: "from-green-500 to-green-600",
      chapters: [
        {
          id: "ch1",
          title: "Scarcity vs Sufficiency",
          content: "Vulnerability is not weakness; it's our greatest measure of courage. When we dare to show up and be seen, we create connection.",
          category: "Courage"
        },
        {
          id: "ch2",
          title: "Debunking Vulnerability Myths",
          content: "Vulnerability isn't about oversharing or being weak. It's about uncertainty, risk, and emotional exposure in pursuit of meaningful connection.",
          category: "Understanding"
        }
      ]
    },
    {
      id: "4-hour-workweek",
      title: "4-Hour Workweek",
      author: "Tim Ferriss",
      authorImage: timFerrissImg,
      color: "from-blue-500 to-blue-600",
      chapters: [
        {
          id: "ch1",
          title: "The 80/20 Principle",
          content: "80% of results come from 20% of efforts. Focus on the few critical tasks that produce the most significant outcomes.",
          category: "Productivity"
        },
        {
          id: "ch2",
          title: "Elimination Before Optimization",
          content: "Before automating or delegating, eliminate the unnecessary. Being busy is a form of laziness - lazy thinking and indiscriminate action.",
          category: "Efficiency"
        }
      ]
    }
  ];

  const authors = [
    {
      name: "James Clear",
      image: jamesClearImg,
      specialty: "Productivity",
      book: "Atomic Habits",
      introMessage: "Hey there! I'm James Clear, and I'm excited to chat with you about building better habits. Whether you're struggling to start a new habit or break a bad one, I'm here to help you understand the science behind lasting change. What's one habit you'd like to work on?",
      chatCount: 2847,
      activeChatters: 23
    },
    {
      name: "Brené Brown",
      image: breneBrownImg,
      specialty: "Psychology",
      book: "Daring Greatly",
      introMessage: "Hello! I'm Brené Brown, and I believe that vulnerability is the birthplace of innovation, creativity, and change. I'm here to explore with you what it means to live wholeheartedly and embrace courage over comfort. What's been on your mind about courage and vulnerability?",
      chatCount: 1923,
      activeChatters: 18
    },
    {
      name: "Tim Ferriss",
      image: timFerrissImg,
      specialty: "Business",
      book: "4-Hour Workweek",
      introMessage: "What's up! Tim Ferriss here. I'm all about optimizing life and work to create more freedom and impact. Whether it's about productivity, entrepreneurship, or life design, I'm here to help you find the 20% that creates 80% of your results. What would you like to optimize in your life?",
      chatCount: 3156,
      activeChatters: 31
    },
    {
      name: "Carol Dweck",
      image: carolDweckImg,
      specialty: "Mindset",
      book: "Growth Mindset",
      introMessage: "Hi! I'm Carol Dweck, and I'm passionate about helping people develop a growth mindset. I believe that our beliefs about our abilities can transform our lives. Whether you're facing challenges or looking to unlock your potential, let's explore how you can embrace the power of 'yet'. What's something you'd like to get better at?",
      chatCount: 1567,
      activeChatters: 12
    }
  ];

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
              3 Books
            </Badge>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-2">
            {books.map((book) => (
              <StoryPreview
                key={book.id}
                book={book}
                onClick={() => setSelectedStory(book)}
              />
            ))}
          </div>
        </div>

        {/* Talk to Authors */}
        <div className="py-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Talk to Authors</h2>
          
          <div className="grid grid-cols-2 gap-4">
            {authors.map((author) => (
              <div key={author.name} className="text-center">
                <div className="relative mb-3">
                  <img 
                    src={author.image} 
                    alt={author.name} 
                    className="w-16 h-16 rounded-full mx-auto object-cover"
                  />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-online-status rounded-full border-2 border-background"></div>
                </div>
                <h3 className="font-medium text-sm text-foreground">{author.name}</h3>
                <p className="text-xs text-muted-foreground">{author.specialty}</p>
                <p className="text-xs text-muted-foreground mb-1">{author.book}</p>
                <div className="text-xs text-muted-foreground mb-3">
                  <p>{author.chatCount.toLocaleString()} chats</p>
                  <p>{author.activeChatters} chatting now</p>
                </div>
                <Button 
                  variant="default" 
                  size="sm" 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg"
                  onClick={() => setSelectedAuthor(author)}
                >
                  Chat Now
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Action Plans */}
        <div className="py-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Action Plans</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-primary"
              onClick={() => setShowActionPlanCreator(true)}
            >
              + New Plan
            </Button>
          </div>

          <div className="space-y-4">
            {actionPlans.map((plan) => (
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
                  <Button variant="ghost" size="sm" className="text-primary text-xs">
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

      {/* Story Viewer */}
      {selectedStory && (
        <PowerStory
          book={selectedStory}
          onClose={() => setSelectedStory(null)}
        />
      )}

      {/* Author Chat */}
      {selectedAuthor && (
        <AuthorChat
          author={selectedAuthor}
          onClose={() => setSelectedAuthor(null)}
        />
      )}

      {/* Action Plan Creator */}
      {showActionPlanCreator && (
        <ActionPlanCreator
          onClose={() => setShowActionPlanCreator(false)}
          onCreatePlan={(plan) => {
            setActionPlans([...actionPlans, plan]);
            setShowActionPlanCreator(false);
          }}
        />
      )}
    </div>
  );
};

export default Index;