import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Plus, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Chapter {
  id: string;
  title: string;
  content: string;
  category: string;
}

interface Book {
  id: string;
  title: string;
  author: string;
  authorImage: string;
  chapters: Chapter[];
  color: string;
}

interface PowerStoryProps {
  book: Book;
  onClose: () => void;
  onAddToPlan: (data: { book: string; author: string; chapter?: string }) => void;
}

export const PowerStory = ({ book, onClose, onAddToPlan }: PowerStoryProps) => {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [progress, setProgress] = useState(0);

  const nextChapter = () => {
    if (currentChapter < book.chapters.length - 1) {
      setCurrentChapter(currentChapter + 1);
      setProgress(((currentChapter + 2) / book.chapters.length) * 100);
    } else {
      onClose();
    }
  };

  const prevChapter = () => {
    if (currentChapter > 0) {
      setCurrentChapter(currentChapter - 1);
      setProgress((currentChapter / book.chapters.length) * 100);
    }
  };

  const chapter = book.chapters[currentChapter];

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="w-full max-w-md h-full relative overflow-hidden">
        {/* Progress bars */}
        <div className="absolute top-4 left-4 right-4 flex gap-1 z-10">
          {book.chapters.map((_, index) => (
            <div
              key={index}
              className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden"
            >
              <div
                className={`h-full bg-white transition-all duration-300 ${
                  index < currentChapter
                    ? "w-full"
                    : index === currentChapter
                    ? `w-[${progress}%]`
                    : "w-0"
                }`}
              />
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="absolute top-12 left-4 right-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <img
              src={book.authorImage}
              alt={book.author}
              className="w-8 h-8 rounded-full object-cover border-2 border-white"
            />
            <div>
              <h3 className="text-white font-medium text-sm">{book.title}</h3>
              <p className="text-white/80 text-xs">{book.author}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-white/20"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Story content */}
        <div
          className={`w-full h-full bg-gradient-to-br ${book.color} flex flex-col justify-center p-6 pt-24 pb-32`}
        >
          <div className="text-center text-white">
            <Badge className="bg-white/20 text-white border-white/20 mb-4">
              {chapter.category}
            </Badge>
            <h2 className="text-xl font-semibold mb-6 leading-tight">
              {chapter.title}
            </h2>
            <p className="text-base leading-relaxed opacity-90">
              {chapter.content}
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="absolute bottom-6 left-4 right-4 flex gap-3">
          <Button
            variant="secondary"
            size="sm"
            className="flex-1 bg-white/20 text-white border-white/20 hover:bg-white/30"
            onClick={() => onAddToPlan({ 
              book: book.title, 
              author: book.author, 
              chapter: chapter.title 
            })}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add to Plan
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="flex-1 bg-white/20 text-white border-white/20 hover:bg-white/30"
          >
            <Bookmark className="w-4 h-4 mr-2" />
            Save to Shelf
          </Button>
        </div>

        {/* Navigation areas */}
        <div
          className="absolute top-0 left-0 w-1/3 h-full z-20 cursor-pointer"
          onClick={prevChapter}
        />
        <div
          className="absolute top-0 right-0 w-1/3 h-full z-20 cursor-pointer"
          onClick={nextChapter}
        />

        {/* Navigation indicators */}
        {currentChapter > 0 && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60">
            <ChevronLeft className="w-6 h-6" />
          </div>
        )}
        {currentChapter < book.chapters.length - 1 && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60">
            <ChevronRight className="w-6 h-6" />
          </div>
        )}

        {/* Chapter indicator */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
          <div className="text-white/80 text-xs text-center">
            {currentChapter + 1} of {book.chapters.length}
          </div>
        </div>
      </div>
    </div>
  );
};