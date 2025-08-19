import { Button } from "@/components/ui/button";
import jamesClearImg from "@/assets/james-clear.jpg";
import breneBrownImg from "@/assets/brene-brown.jpg";
import timFerrissImg from "@/assets/tim-ferriss.jpg";
import carolDweckImg from "@/assets/carol-dweck.jpg";

interface AuthorsSectionProps {
  onAuthorSelect: (author: any) => void;
}

export const AuthorsSection = ({ onAuthorSelect }: AuthorsSectionProps) => {
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
    <div className="p-5">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-foreground">Talk to Authors</h2>
        <p className="text-sm text-muted-foreground">Get personalized advice from bestselling authors</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {authors.map((author) => (
          <div key={author.name} className="bg-card/50 rounded-xl p-4 border border-border/50 hover:border-primary/30 transition-all duration-200 hover-scale">
            <div className="text-center">
              <div className="relative mb-3">
                <img 
                  src={author.image} 
                  alt={author.name} 
                  className="w-14 h-14 rounded-full mx-auto object-cover ring-2 ring-primary/20"
                />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-online-status rounded-full border-2 border-background animate-pulse"></div>
              </div>
              <h3 className="font-semibold text-sm text-foreground mb-1">{author.name}</h3>
              <p className="text-xs text-primary font-medium mb-1">{author.specialty}</p>
              <p className="text-xs text-muted-foreground mb-2">{author.book}</p>
              <div className="text-xs text-muted-foreground mb-3 space-y-1">
                <p className="font-medium">{author.activeChatters} chatting now</p>
              </div>
              <Button 
                variant="default" 
                size="sm" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg h-8 text-xs font-medium"
                onClick={() => onAuthorSelect(author)}
              >
                Start Chat
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};