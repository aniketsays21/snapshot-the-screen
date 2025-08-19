import { useState } from "react";
import { ArrowLeft, MoreVertical, Send, Paperclip, Mic, Plus, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface Author {
  name: string;
  image: string;
  specialty: string;
  book: string;
  introMessage: string;
  chatCount: number;
  activeChatters: number;
}

interface AuthorChatProps {
  author: Author;
  onClose: () => void;
  onAddToPlan: (data: { author: string; book: string }) => void;
}

interface Message {
  id: string;
  text: string;
  isAuthor: boolean;
  timestamp: Date;
}

export const AuthorChat = ({ author, onClose, onAddToPlan }: AuthorChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: author.introMessage,
      isAuthor: true,
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const { toast } = useToast();

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      isAuthor: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");

    // Simulate author response after 2 seconds
    setTimeout(() => {
      const authorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAuthorResponse(newMessage, author.name),
        isAuthor: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, authorResponse]);
    }, 2000);
  };

  const getAuthorResponse = (userMessage: string, authorName: string) => {
    const responses = {
      "James Clear": [
        "That's a great question! The key is to focus on systems, not goals. Small improvements compound over time.",
        "Remember, you don't rise to the level of your goals, you fall to the level of your systems.",
        "Start with the 2-minute rule - make it so easy you can't say no."
      ],
      "Brené Brown": [
        "Vulnerability is not weakness - it's our greatest measure of courage.",
        "Shame cannot survive being spoken. It grows in silence and secrecy.",
        "Connection is why we're here. We are hardwired to connect with others."
      ],
      "Tim Ferriss": [
        "Focus on the 20% that produces 80% of your results.",
        "Being busy is a form of laziness - lazy thinking and indiscriminate action.",
        "What would this look like if it were easy?"
      ],
      "Carol Dweck": [
        "The view you adopt for yourself profoundly affects the way you lead your life.",
        "Becoming is better than being.",
        "Challenges are opportunities to learn and grow."
      ]
    };

    const authorResponses = responses[authorName as keyof typeof responses] || responses["James Clear"];
    return authorResponses[Math.floor(Math.random() * authorResponses.length)];
  };

  const saveToActionPlan = () => {
    onAddToPlan({ 
      author: author.name, 
      book: author.book 
    });
  };

  const saveToShelf = () => {
    toast({
      title: "Saved to Shelf",
      description: "Chat conversation saved to your shelf.",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: 'var(--chat-background)' }}>
      {/* Premium Header */}
      <div className="premium-glass border-b border-white/20 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onClose} className="hover:bg-white/10">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </Button>
            <div className="relative">
              <img 
                src={author.image} 
                alt={author.name} 
                className="w-11 h-11 rounded-full object-cover ring-2 ring-primary/30"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-online-status rounded-full border-2 border-white pulse-glow"></div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-foreground">{author.name}</h1>
                <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full font-medium">
                  Online
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Author of "{author.book}" • {author.specialty}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hover:bg-white/10">
              <MoreVertical className="w-5 h-5 text-muted-foreground" />
            </Button>
          </div>
        </div>
      </div>

      {/* Premium Welcome Section */}
      <div className="p-6 bg-gradient-to-b from-primary-soft to-transparent border-b border-white/10">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span className="text-sm font-medium text-foreground">Premium Chat Session</span>
          </div>
          <h2 className="text-lg font-bold text-foreground mb-2">Welcome to your conversation with {author.name}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Ask about {author.specialty.toLowerCase()}, insights from "{author.book}", or get personalized advice for your growth journey.
          </p>
        </div>
      </div>

      {/* Premium Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 premium-scroll">
        {messages.map((message, index) => (
          <div key={message.id}>
            {index === 0 && (
              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-muted-foreground">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  Today, {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            )}
            <div className={`flex ${message.isAuthor ? 'justify-start' : 'justify-end'} items-end gap-3`}>
              {message.isAuthor && (
                <div className="relative">
                  <img 
                    src={author.image} 
                    alt={author.name} 
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-white/50"
                  />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-online-status rounded-full border border-white"></div>
                </div>
              )}
              
              <div className="flex flex-col max-w-xs lg:max-w-md">
                <div className={`px-5 py-3 ${
                  message.isAuthor ? 'chat-bubble-author' : 'chat-bubble-user'
                }`}>
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
                <p className={`text-xs mt-1 px-2 ${
                  message.isAuthor ? 'text-muted-foreground' : 'text-muted-foreground text-right'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
            
            {/* Premium Action Buttons for Author Messages */}
            {message.isAuthor && (
              <div className="flex gap-2 ml-12 mt-3">
                <Button 
                  onClick={saveToActionPlan}
                  variant="outline" 
                  size="sm"
                  className="hover-lift border-primary/30 text-primary hover:bg-primary/5 rounded-xl"
                >
                  <Plus className="w-3 h-3 mr-1.5" />
                  Add to Plan
                </Button>
                <Button 
                  onClick={saveToShelf}
                  variant="outline" 
                  size="sm"
                  className="hover-lift border-border/50 text-muted-foreground hover:bg-accent rounded-xl"
                >
                  <Bookmark className="w-3 h-3 mr-1.5" />
                  Save
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Premium Input Section */}
      <div className="p-4 border-t border-white/10 premium-glass">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="hover:bg-white/10 text-muted-foreground">
            <Paperclip className="w-5 h-5" />
          </Button>
          <div className="flex-1 relative">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Ask anything about personal growth..."
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              className="bg-white/80 backdrop-blur-sm border-white/30 rounded-2xl pr-12 h-12 text-sm placeholder:text-muted-foreground/70"
            />
            <Button 
              onClick={sendMessage} 
              size="sm" 
              disabled={!newMessage.trim()}
              className="absolute right-1 top-1 h-10 w-10 bg-primary hover:bg-primary-glow disabled:bg-muted disabled:text-muted-foreground rounded-xl p-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <Button variant="ghost" size="sm" className="hover:bg-white/10 text-muted-foreground">
            <Mic className="w-5 h-5" />
          </Button>
        </div>
        
        {/* Quick Actions */}
        <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-hide">
          {[
            "What's your best productivity tip?",
            "How do I build better habits?",
            "Tell me about your book",
            "What's your morning routine?"
          ].map((suggestion, i) => (
            <Button 
              key={i}
              variant="outline" 
              size="sm" 
              onClick={() => setNewMessage(suggestion)}
              className="whitespace-nowrap text-xs bg-white/60 border-white/30 hover:bg-white/80 rounded-xl"
            >
              {suggestion}
            </Button>
          ))}
        </div>
      </div>

    </div>
  );
};