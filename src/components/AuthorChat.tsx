import { useState } from "react";
import { ArrowLeft, Plus, Bookmark, Send } from "lucide-react";
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
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary via-purple-600 to-blue-600 px-4 py-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <img 
              src={author.image} 
              alt={author.name} 
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <h1 className="font-semibold">{author.name}</h1>
              <p className="text-xs text-white/80">Online now</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={saveToActionPlan} className="text-white hover:bg-white/20">
              <Plus className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={saveToShelf} className="text-white hover:bg-white/20">
              <Bookmark className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isAuthor ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                message.isAuthor
                  ? 'bg-muted text-foreground'
                  : 'bg-primary text-primary-foreground'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className={`text-xs mt-1 ${
                message.isAuthor ? 'text-muted-foreground' : 'text-primary-foreground/70'
              }`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-background">
        <div className="flex items-center gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={`Message ${author.name}...`}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-1"
          />
          <Button onClick={sendMessage} size="sm" className="bg-primary hover:bg-primary/90">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};