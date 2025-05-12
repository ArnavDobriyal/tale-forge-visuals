
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { StoryFormData } from "./StoryForm";

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

  // Mock image URLs (in a real app, these would come from an API)
  const mockImages = [
    "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    "https://images.unsplash.com/photo-1466721591366-2d5fba72006d", 
    "https://images.unsplash.com/photo-1493962853295-0fd70327578a"
  ];

  // In a real app, this would call an API to generate story content
  useEffect(() => {
    const generateMockStory = () => {
      setLoading(true);
      
      // Generate content based on form type
      let storyText: string;
      if (storyData.type === "start" && storyData.storyStart) {
        storyText = storyData.storyStart;
      } else {
        storyText = `Once upon a time in a ${storyData.imageStyle} world, an adventure began based on the theme: ${storyData.theme}`;
      }
      
      // Create mock story segments
      const segments: StorySegment[] = [
        {
          text: `${storyText}\n\nThe journey was just beginning, and nobody knew what adventures awaited beyond the horizon. The air was filled with anticipation as our protagonist took their first steps into the unknown.`,
          imageUrl: mockImages[0],
        },
        {
          text: "As they ventured deeper into the mysterious lands, strange creatures and unexpected allies appeared. The landscape shifted from familiar terrain to breathtaking views that seemed to defy reality itself.",
          imageUrl: mockImages[1],
        },
        {
          text: "Finally, after overcoming numerous obstacles and facing their deepest fears, they discovered the truth that had been hidden all along. The world would never be the same, and neither would they.",
          imageUrl: mockImages[2],
        },
      ];
      
      // Simulate API delay
      setTimeout(() => {
        setStorySegments(segments);
        setLoading(false);
      }, 1500);
    };

    generateMockStory();
  }, [storyData]);

  const handleNext = () => {
    if (currentSegment < storySegments.length - 1) {
      setCurrentSegment(currentSegment + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSegment > 0) {
      setCurrentSegment(currentSegment - 1);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <div className="text-story-primary text-xl mb-4">Creating your story...</div>
        <div className="w-12 h-12 border-4 border-story-accent border-t-story-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-serif text-center text-story-dark font-bold">
        {storyData.title}
      </h2>
      
      <div className="animate-page-turn">
        <Card className="p-6 md:p-8 bg-story-light paper-texture book-shadow border-story-accent">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2 order-2 md:order-1">
              <div className="story-text text-lg">
                {storySegments[currentSegment]?.text.split("\n").map((paragraph, idx) => (
                  <p key={idx} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            
            <div className="md:w-1/2 order-1 md:order-2">
              <img
                src={storySegments[currentSegment]?.imageUrl}
                alt="Story illustration"
                className="rounded-md shadow-md w-full h-64 md:h-80 object-cover"
              />
              <p className="text-center mt-2 text-sm text-story-secondary italic">
                Generated {storyData.imageStyle} style image
              </p>
            </div>
          </div>
          
          <div className="mt-8 flex justify-between items-center">
            <div>
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentSegment === 0}
                className="flex items-center"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
            </div>
            
            <div className="text-sm text-story-secondary">
              {currentSegment + 1} of {storySegments.length}
            </div>
            
            <div>
              <Button
                variant="outline"
                onClick={handleNext}
                disabled={currentSegment === storySegments.length - 1}
                className="flex items-center"
              >
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="flex justify-center">
        <Button
          onClick={onNewStory}
          className="bg-story-primary hover:bg-story-dark"
        >
          Create New Story
        </Button>
      </div>
    </div>
  );
};

export default StoryDisplay;
