import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Calendar, Target, BookOpen, Clock, Trophy, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import jamesClearImg from "@/assets/james-clear.jpg";
import breneBrownImg from "@/assets/brene-brown.jpg";
import timFerrissImg from "@/assets/tim-ferriss.jpg";
import carolDweckImg from "@/assets/carol-dweck.jpg";

interface ActionPlanCreatorProps {
  onClose: () => void;
  onCreatePlan: (plan: any) => void;
}

export const ActionPlanCreator = ({ onClose, onCreatePlan }: ActionPlanCreatorProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [selectedChapter, setSelectedChapter] = useState<any>(null);
  const [customTopic, setCustomTopic] = useState("");
  const [schedule, setSchedule] = useState({
    frequency: "",
    duration: "",
    startDate: undefined as Date | undefined,
    reminderTime: ""
  });
  const [resources, setResources] = useState("");
  const [goals, setGoals] = useState({
    streakTarget: 30,
    expertiseWeeks: 12
  });

  const books = [
    {
      id: "atomic-habits",
      title: "Atomic Habits",
      author: "James Clear",
      image: jamesClearImg,
      color: "from-purple-500 to-purple-600",
      chapters: [
        { id: "ch1", title: "The Surprising Power of Atomic Habits", category: "Foundation" },
        { id: "ch2", title: "The 2-Minute Rule", category: "Strategy" },
        { id: "ch3", title: "Identity-Based Habits", category: "Mindset" }
      ]
    },
    {
      id: "daring-greatly",
      title: "Daring Greatly",
      author: "Brené Brown",
      image: breneBrownImg,
      color: "from-green-500 to-green-600",
      chapters: [
        { id: "ch1", title: "Scarcity vs Sufficiency", category: "Courage" },
        { id: "ch2", title: "Debunking Vulnerability Myths", category: "Understanding" }
      ]
    },
    {
      id: "4-hour-workweek",
      title: "4-Hour Workweek",
      author: "Tim Ferriss",
      image: timFerrissImg,
      color: "from-blue-500 to-blue-600",
      chapters: [
        { id: "ch1", title: "The 80/20 Principle", category: "Productivity" },
        { id: "ch2", title: "Elimination Before Optimization", category: "Efficiency" }
      ]
    }
  ];

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleCreatePlan = () => {
    const newPlan = {
      id: Date.now().toString(),
      title: customTopic || selectedChapter?.title || selectedBook?.title,
      book: selectedBook?.title,
      author: selectedBook?.author,
      chapter: selectedChapter?.title,
      schedule,
      resources,
      goals,
      status: "Draft",
      createdAt: new Date(),
      streak: 0
    };
    onCreatePlan(newPlan);
    onClose();
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return selectedBook;
      case 2: return selectedChapter || customTopic;
      case 3: return schedule.frequency && schedule.duration;
      case 4: return true;
      case 5: return true;
      default: return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Choose a Book</h3>
            <div className="grid gap-3">
              {books.map((book) => (
                <Card 
                  key={book.id}
                  className={cn(
                    "p-4 cursor-pointer border-2 transition-all",
                    selectedBook?.id === book.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                  )}
                  onClick={() => setSelectedBook(book)}
                >
                  <div className="flex items-center gap-3">
                    <img src={book.image} alt={book.author} className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{book.title}</h4>
                      <p className="text-sm text-muted-foreground">{book.author}</p>
                      <Badge className="mt-1 text-xs">{book.chapters.length} chapters</Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Select Chapter or Define Topic</h3>
            
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Available Chapters:</h4>
              {selectedBook?.chapters.map((chapter: any) => (
                <Card 
                  key={chapter.id}
                  className={cn(
                    "p-3 cursor-pointer border-2 transition-all",
                    selectedChapter?.id === chapter.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                  )}
                  onClick={() => setSelectedChapter(chapter)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium text-foreground text-sm">{chapter.title}</h5>
                      <Badge variant="secondary" className="mt-1 text-xs">{chapter.category}</Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-foreground">Or Define Custom Topic:</h4>
              <Input 
                placeholder="e.g., Building morning routines, Overcoming procrastination..."
                value={customTopic}
                onChange={(e) => setCustomTopic(e.target.value)}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Set Your Schedule</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Frequency</label>
                <Select value={schedule.frequency} onValueChange={(value) => setSchedule({...schedule, frequency: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="How often?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="3-times-week">3 times a week</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Duration per session</label>
                <Select value={schedule.duration} onValueChange={(value) => setSchedule({...schedule, duration: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="How long?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15-min">15 minutes</SelectItem>
                    <SelectItem value="30-min">30 minutes</SelectItem>
                    <SelectItem value="45-min">45 minutes</SelectItem>
                    <SelectItem value="1-hour">1 hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Start Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !schedule.startDate && "text-muted-foreground"
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {schedule.startDate ? format(schedule.startDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={schedule.startDate}
                      onSelect={(date) => setSchedule({...schedule, startDate: date})}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Reminder Time</label>
                <Select value={schedule.reminderTime} onValueChange={(value) => setSchedule({...schedule, reminderTime: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="When to remind?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning (9:00 AM)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (2:00 PM)</SelectItem>
                    <SelectItem value="evening">Evening (6:00 PM)</SelectItem>
                    <SelectItem value="custom">Custom time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Resources & Assets</h3>
            
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">
                What resources do you need to succeed?
              </label>
              <Textarea 
                placeholder="e.g., Notebook for tracking, specific apps, books, materials, or tools..."
                value={resources}
                onChange={(e) => setResources(e.target.value)}
                className="min-h-[120px]"
              />
              
              <div className="text-xs text-muted-foreground">
                💡 Be specific about tools, materials, or support you'll need
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Set Your Goals</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Flame className="w-4 h-4 text-orange-500" />
                  Streak Target (days)
                </label>
                <Input 
                  type="number"
                  value={goals.streakTarget}
                  onChange={(e) => setGoals({...goals, streakTarget: parseInt(e.target.value)})}
                  min="1"
                  max="365"
                />
                <div className="text-xs text-muted-foreground">
                  How many consecutive days do you want to maintain this habit?
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-yellow-500" />
                  Time to Expertise (weeks)
                </label>
                <Input 
                  type="number"
                  value={goals.expertiseWeeks}
                  onChange={(e) => setGoals({...goals, expertiseWeeks: parseInt(e.target.value)})}
                  min="1"
                  max="52"
                />
                <div className="text-xs text-muted-foreground">
                  How many weeks until you consider yourself proficient in this topic?
                </div>
              </div>

              <Card className="p-4 bg-primary/5 border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-primary" />
                  <span className="font-medium text-foreground">Your Plan Summary</span>
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p><strong>Topic:</strong> {customTopic || selectedChapter?.title}</p>
                  <p><strong>From:</strong> {selectedBook?.title} by {selectedBook?.author}</p>
                  <p><strong>Schedule:</strong> {schedule.frequency} for {schedule.duration}</p>
                  <p><strong>Goal:</strong> {goals.streakTarget} day streak, expertise in {goals.expertiseWeeks} weeks</p>
                </div>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-background max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            {currentStep > 1 && (
              <Button variant="ghost" size="sm" onClick={handlePrevious}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
            )}
            <div>
              <h2 className="font-semibold text-foreground">Create Action Plan</h2>
              <p className="text-xs text-muted-foreground">Step {currentStep} of 5</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="px-4 py-2">
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all"
              style={{ width: `${(currentStep / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-[60vh]">
          {renderStep()}
        </div>

        {/* Footer */}
        <div className="p-4 border-t">
          <div className="flex gap-2">
            {currentStep < 5 ? (
              <Button 
                onClick={handleNext} 
                disabled={!canProceed()}
                className="flex-1"
              >
                Next Step
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button 
                onClick={handleCreatePlan}
                className="flex-1"
              >
                <Target className="w-4 h-4 mr-1" />
                Create Action Plan
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};