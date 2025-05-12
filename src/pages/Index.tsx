
import { useState } from "react";
import Header from "@/components/Header";
import StoryForm, { StoryFormData } from "@/components/StoryForm";
import StoryDisplay from "@/components/StoryDisplay";
import { BookOpen, Sparkles } from "lucide-react";

const Index = () => {
  const [activeStory, setActiveStory] = useState<StoryFormData | null>(null);

  const handleStorySubmit = (data: StoryFormData) => {
    setActiveStory(data);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNewStory = () => {
    setActiveStory(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-story-accent/30">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {!activeStory ? (
          <>
            <section className="mb-12 text-center">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-story-dark mb-4">
                Create Your Immersive Story
              </h1>
              <p className="text-lg text-story-secondary max-w-2xl mx-auto">
                Use the power of AI to generate captivating stories with beautiful images. 
                Start with your own text or let us create a story based on your theme.
              </p>
            </section>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-md border border-story-accent/50 flex flex-col items-center">
                <div className="w-16 h-16 bg-story-primary/10 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="h-8 w-8 text-story-primary" />
                </div>
                <h2 className="text-xl font-bold mb-2">Begin Your Story</h2>
                <p className="text-center text-gray-600 mb-4">
                  Start with the opening paragraph of your story and our AI will continue 
                  the narrative while generating matching images.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-story-accent/50 flex flex-col items-center">
                <div className="w-16 h-16 bg-story-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Sparkles className="h-8 w-8 text-story-primary" />
                </div>
                <h2 className="text-xl font-bold mb-2">Suggest a Theme</h2>
                <p className="text-center text-gray-600 mb-4">
                  Provide a theme or idea, and let our AI craft a complete story with 
                  accompanying visuals that bring your concept to life.
                </p>
              </div>
            </div>
            
            <section className="max-w-2xl mx-auto mt-12">
              <h2 className="text-2xl font-serif font-bold text-story-dark mb-6 text-center">
                Let's Begin Your Tale
              </h2>
              <StoryForm onSubmit={handleStorySubmit} />
            </section>
          </>
        ) : (
          <StoryDisplay storyData={activeStory} onNewStory={handleNewStory} />
        )}
      </main>
      
      <footer className="bg-story-primary text-white p-4 mt-12">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            Imagined Tales - AI-powered storytelling with image generation
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
