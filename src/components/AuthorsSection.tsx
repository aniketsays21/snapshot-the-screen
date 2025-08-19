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
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground mb-2">Chat with World-Class Authors</h2>
        <p className="text-sm text-muted-foreground">Get personalized insights and guidance from bestselling authors</p>
        <div className="flex items-center gap-2 mt-3">
          <div className="w-2 h-2 bg-online-status rounded-full pulse-glow"></div>
          <span className="text-xs text-online-status font-medium">54 authors online now</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {authors.map((author) => (
          <div key={author.name} className="group bg-white rounded-2xl p-5 border border-white/20 hover-lift cursor-pointer" 
               style={{ boxShadow: 'var(--shadow-card)' }}
               onClick={() => onAuthorSelect(author)}>
            <div className="text-center">
              <div className="relative mb-4">
                <img 
                  src={author.image} 
                  alt={author.name} 
                  className="w-16 h-16 rounded-full mx-auto object-cover ring-3 ring-primary/20 group-hover:ring-primary/40 transition-all"
                />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-online-status rounded-full border-2 border-white pulse-glow"></div>
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-white text-xs px-2 py-1 rounded-full font-medium">
                    LIVE
                  </div>
                </div>
              </div>
              <h3 className="font-bold text-sm text-foreground mb-1">{author.name}</h3>
              <p className="text-xs font-semibold text-primary mb-1">{author.specialty}</p>
              <p className="text-xs text-muted-foreground mb-3 line-clamp-1">"{author.book}"</p>
              
              <div className="bg-primary-soft rounded-lg p-2 mb-4">
                <div className="flex items-center justify-center gap-2 text-xs">
                  <div className="w-1.5 h-1.5 bg-online-status rounded-full"></div>
                  <span className="text-primary font-semibold">{author.activeChatters} chatting</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{author.chatCount.toLocaleString()} total chats</p>
              </div>
              
              <Button 
                variant="default" 
                size="sm" 
                className="w-full bg-primary hover:bg-primary-glow text-primary-foreground rounded-xl h-9 text-xs font-semibold shadow-md group-hover:shadow-lg transition-all"
              >
                Start Chat
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <Button variant="outline" className="text-primary border-primary/30 hover:bg-primary/5 rounded-xl px-6">
          Explore All Authors
        </Button>
      </div>
    </div>
  );
};