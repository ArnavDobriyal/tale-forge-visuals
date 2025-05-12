
import { BookOpen } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-story-primary text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-6 w-6" />
          <h1 className="text-xl font-bold">Imagined Tales</h1>
        </div>
        <div className="text-sm">Your AI Storyteller</div>
      </div>
    </header>
  );
};

export default Header;
