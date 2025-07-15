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
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onClose}>
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Button>
          <img 
            src={author.image} 
            alt={author.name} 
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h1 className="font-semibold text-gray-900">{author.name}</h1>
            <p className="text-xs text-gray-500">Author of "{author.book}"</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </Button>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="p-4 bg-gray-50 border-b">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3">
            <img 
              src={author.image} 
              alt={author.name} 
              className="w-12 h-12 rounded-full object-cover"
            />
          </div>
          <p className="text-sm text-gray-700 mb-2">Welcome to your chat with {author.name}</p>
          <p className="text-xs text-gray-500">
            Ask about habits, productivity, or specific concepts from {author.book}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message, index) => (
          <div key={message.id}>
            {index === 0 && (
              <div className="text-center text-xs text-gray-500 mb-4">
                Today, {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            )}
            <div className={`flex ${message.isAuthor ? 'justify-start' : 'justify-end'} mb-2`}>
              {message.isAuthor && (
                <img 
                  src={author.image} 
                  alt={author.name} 
                  className="w-8 h-8 rounded-full object-cover mr-2 mt-1"
                />
              )}
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                  message.isAuthor
                    ? 'bg-white text-gray-800 border'
                    : 'bg-blue-500 text-white'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className={`text-xs mt-1 ${
                  message.isAuthor ? 'text-gray-500' : 'text-white/70'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
            
            {/* Action Buttons for Author Messages */}
            {message.isAuthor && (
              <div className="flex gap-2 ml-10 mt-2">
                <Button 
                  onClick={saveToActionPlan}
                  variant="outline" 
                  size="sm"
                  className="hover-scale border-blue-500 text-blue-600 hover:bg-blue-50"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  Add to Action Plan
                </Button>
                <Button 
                  onClick={saveToShelf}
                  variant="outline" 
                  size="sm"
                  className="hover-scale border-gray-300 text-gray-600 hover:bg-gray-50"
                >
                  <Bookmark className="w-3 h-3 mr-1" />
                  Add to Shelf
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-white">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Paperclip className="w-5 h-5 text-gray-500" />
          </Button>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-1 border-gray-300 rounded-full"
          />
          <Button variant="ghost" size="sm">
            <Mic className="w-5 h-5 text-gray-500" />
          </Button>
          <Button onClick={sendMessage} size="sm" className="bg-blue-500 hover:bg-blue-600 text-white rounded-full">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>

    </div>
  );
};