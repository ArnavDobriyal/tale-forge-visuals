import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, ArrowLeft, BookOpen, Sparkles, Wand2 } from "lucide-react";
import { StoryFormData } from "./StoryForm";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

interface StoryDisplayProps {
  storyData: StoryFormData;
  onNewStory: () => void;
}

interface StorySegment {
  text: string;
  imageUrl: string;
}

const StoryDisplay = ({ storyData, onNewStory }: StoryDisplayProps) => {
  const [storySegments, setStorySegments] = useState<StorySegment[]>([]);
  const [currentSegment, setCurrentSegment] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingPhase, setLoadingPhase] = useState("Brewing the story magic...");
  const [pageTransition, setPageTransition] = useState(false);
  const [direction, setDirection] = useState("next");

  const loadingMessages = [
    "Brewing the story magic...",
    "Summoning the characters...",
    "Painting the world...",
    "Adding plot twists...",
    "Crafting the finale...",
    "Almost ready to begin your adventure..."
  ];

  // In a real app, this would call an API to generate story content
  useEffect(() => {
    const generateStory = async () => {
      setLoading(true);
      setLoadingProgress(0);
      setLoadingPhase(loadingMessages[0]);
      
      // Simulate loading progress with random messages
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          const newProgress = Math.min(prev + Math.random() * 15, 95);
          const messageIndex = Math.floor((newProgress / 100) * loadingMessages.length);
          setLoadingPhase(loadingMessages[Math.min(messageIndex, loadingMessages.length - 1)]);
          return newProgress;
        });
      }, 800);

      try {
        // Call the Python server
        const response = await fetch('http://localhost:5000/generate-story', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(storyData),
        });
        
        const data = await response.json();
        clearInterval(interval);
        setLoadingProgress(100);
        setTimeout(() => {
          setStorySegments(data.segments);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching story:", error);
        clearInterval(interval);
        
        // Fallback to mock data if server is not running
        const mockSegments: StorySegment[] = [
          {
            text: `Once upon a time in a ${storyData.imageStyle} world, an adventure began based on the theme: ${storyData.theme || storyData.storyStart}\n\nThe journey was just beginning, and nobody knew what adventures awaited beyond the horizon.`,
            imageUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
          },
          {
            text: "As they ventured deeper into the mysterious lands, strange creatures and unexpected allies appeared. The landscape shifted from familiar terrain to breathtaking views.",
            imageUrl: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d",
          },
          {
            text: "Finally, after overcoming numerous obstacles and facing their deepest fears, they discovered the truth that had been hidden all along.",
            imageUrl: "https://images.unsplash.com/photo-1493962853295-0fd70327578a",
          },
        ];
        
        setLoadingProgress(100);
        setTimeout(() => {
          setStorySegments(mockSegments);
          setLoading(false);
        }, 500);
      }
    };

    generateStory();
  }, [storyData]);

  const handlePageTransition = (nextIndex: number, dir: "next" | "prev") => {
    setPageTransition(true);
    setDirection(dir);
    
    setTimeout(() => {
      setCurrentSegment(nextIndex);
      setPageTransition(false);
    }, 300);
  };

  const handleNext = () => {
    if (currentSegment < storySegments.length - 1) {
      handlePageTransition(currentSegment + 1, "next");
    }
  };

  const handlePrevious = () => {
    if (currentSegment > 0) {
      handlePageTransition(currentSegment - 1, "prev");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-serif text-center text-story-dark font-bold mb-6">
            {storyData.title}
          </h2>
          <div className="relative w-32 h-32 mx-auto mb-6">
            <div className="absolute inset-0 flex items-center justify-center">
              <BookOpen className="w-12 h-12 text-story-primary animate-pulse" />
            </div>
            <div className="absolute inset-0 animate-spin duration-5000" style={{ animationDuration: '5s' }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4">
                <Sparkles className="w-6 h-6 text-story-secondary" />
              </div>
              <div className="absolute top-1/2 right-0 -translate-y-1/2 w-4 h-4">
                <Wand2 className="w-6 h-6 text-story-accent" />
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4">
                <Sparkles className="w-6 h-6 text-story-secondary" />
              </div>
              <div className="absolute top-1/2 left-0 -translate-y-1/2 w-4 h-4">
                <Wand2 className="w-6 h-6 text-story-accent" />
              </div>
            </div>
          </div>
          
          <div className="text-story-primary text-xl mb-4">{loadingPhase}</div>
          
          <div className="max-w-md mx-auto">
            <Progress value={loadingProgress} className="h-2 bg-story-accent/30" />
            <div className="text-right text-sm text-story-secondary mt-1">{Math.round(loadingProgress)}%</div>
          </div>

          <div className="mt-8">
            <Card className="p-6 md:p-8 bg-story-light paper-texture book-shadow border-story-accent max-w-md mx-auto">
              <div className="space-y-4">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-serif text-center text-story-dark font-bold">
        {storyData.title}
      </h2>
      
      <div className="relative">
        <Card className={`p-6 md:p-8 bg-story-light paper-texture book-shadow border-story-accent 
          transition-all duration-300 transform 
          ${pageTransition ? 
            (direction === "next" ? "translate-x-[3%] opacity-0 scale-95" : "translate-x-[-3%] opacity-0 scale-95") : 
            "translate-x-0 opacity-100 scale-100"}`}>
          
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2 md:order-1 order-2">
              <div className="story-page-container perspective-1000 w-full">
                <div className="story-text text-lg normal-case relative z-10 bg-[#fffdf9] p-6 rounded-lg shadow-md border-r-4 border-amber-800/20">
                  {storySegments[currentSegment]?.text.split("\n").map((paragraph, idx) => (
                    <p key={idx} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                  
                  <div className="absolute bottom-2 right-2 text-amber-800/40 text-xs font-serif italic">
                    Page {currentSegment + 1}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2 md:order-2 order-1 perspective-1000">
              <div className="image-container relative transition-all duration-300">
                <img
                  src={storySegments[currentSegment]?.imageUrl}
                  alt="Story illustration"
                  className="rounded-md shadow-md w-full h-64 md:h-80 object-cover transform hover:scale-105 transition-all duration-300"
                />
                <div className="absolute inset-0 border-4 border-white/30 rounded-md pointer-events-none"></div>
                
                <p className="text-center mt-2 text-sm text-story-secondary italic">
                  Generated {storyData.imageStyle} style image
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-between items-center">
            <div>
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentSegment === 0}
                className="flex items-center hover:bg-story-accent/20 transition-all"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              {storySegments.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-2 rounded-full transition-all ${
                    idx === currentSegment ? "w-6 bg-story-primary" : "w-2 bg-story-accent"
                  }`}
                ></div>
              ))}
            </div>
            
            <div>
              <Button
                variant="outline"
                onClick={handleNext}
                disabled={currentSegment === storySegments.length - 1}
                className="flex items-center hover:bg-story-accent/20 transition-all"
              >
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
        
        {/* Page edge shadow decoration */}
        <div className="absolute inset-y-0 right-0 w-2 bg-gradient-to-l from-amber-900/10 to-transparent"></div>
        <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-t from-amber-900/10 to-transparent"></div>
      </div>
      
      <div className="flex justify-center mt-10">
        <Button
          onClick={onNewStory}
          className="bg-story-primary hover:bg-story-dark transition-all px-6 py-2"
        >
          Create New Story
        </Button>
      </div>
    </div>
  );
};

export default StoryDisplay;
