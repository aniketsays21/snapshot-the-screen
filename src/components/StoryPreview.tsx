import { Book } from "lucide-react";

interface StoryPreviewProps {
  book: {
    id: string;
    title: string;
    author: string;
    authorImage: string;
    color: string;
    chapters: Array<{
      id: string;
      title: string;
      content: string;
      category: string;
    }>;
  };
  onClick: () => void;
}

export const StoryPreview = ({ book, onClick }: StoryPreviewProps) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center cursor-pointer"
    >
      <div className="relative">
        <div
          className={`w-16 h-16 rounded-full bg-gradient-to-br ${book.color} p-0.5`}
        >
          <div className="w-full h-full rounded-full overflow-hidden bg-white p-1">
            <img
              src={book.authorImage}
              alt={book.author}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>
        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
          <Book className="w-3 h-3 text-primary-foreground" />
        </div>
      </div>
      <h3 className="text-xs font-medium text-foreground mt-2 text-center max-w-[70px] truncate">
        {book.title}
      </h3>
    </div>
  );
};