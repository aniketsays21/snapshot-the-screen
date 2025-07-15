import { Badge } from "@/components/ui/badge";
import { StoryPreview } from "@/components/StoryPreview";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import jamesClearImg from "@/assets/james-clear.jpg";
import breneBrownImg from "@/assets/brene-brown.jpg";
import timFerrissImg from "@/assets/tim-ferriss.jpg";

interface PowerShortsSectionProps {
  onStorySelect: (book: any) => void;
  onClose?: () => void;
}

export const PowerShortsSection = ({ onStorySelect, onClose }: PowerShortsSectionProps) => {
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

  return (
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
            onClick={() => onStorySelect(book)}
          />
        ))}
      </div>
    </div>
  );
};