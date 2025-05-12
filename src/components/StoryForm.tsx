
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

interface StoryFormProps {
  onSubmit: (data: StoryFormData) => void;
}

export interface StoryFormData {
  type: "start" | "theme";
  storyStart?: string;
  theme?: string;
  imageStyle: string;
  title: string;
}

const StoryForm = ({ onSubmit }: StoryFormProps) => {
  const [formData, setFormData] = useState<StoryFormData>({
    type: "start",
    storyStart: "",
    theme: "",
    imageStyle: "fantasy",
    title: "",
  });
  const [activeTab, setActiveTab] = useState<string>("start");
  const { toast } = useToast();

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setFormData((prev) => ({
      ...prev,
      type: value as "start" | "theme",
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStyleChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      imageStyle: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim()) {
      toast({
        title: "Title required",
        description: "Please give your story a title",
        variant: "destructive",
      });
      return;
    }
    
    if (formData.type === "start" && !formData.storyStart?.trim()) {
      toast({
        title: "Story start required",
        description: "Please write the beginning of your story",
        variant: "destructive",
      });
      return;
    }
    
    if (formData.type === "theme" && !formData.theme?.trim()) {
      toast({
        title: "Theme required",
        description: "Please describe a theme for your story",
        variant: "destructive",
      });
      return;
    }

    onSubmit(formData);
  };

  return (
    <Card className="bg-white p-6 shadow-lg book-shadow border-story-accent">
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div>
            <Label htmlFor="title">Story Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter a title for your story"
              className="mt-1"
            />
          </div>

          <Tabs
            value={activeTab}
            onValueChange={handleTabChange}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="start">Start with text</TabsTrigger>
              <TabsTrigger value="theme">Suggest a theme</TabsTrigger>
            </TabsList>
            <TabsContent value="start" className="mt-4">
              <div className="space-y-2">
                <Label htmlFor="storyStart">Beginning of your story</Label>
                <Textarea
                  id="storyStart"
                  name="storyStart"
                  value={formData.storyStart}
                  onChange={handleInputChange}
                  placeholder="Once upon a time in a land far away..."
                  className="min-h-[150px]"
                />
              </div>
            </TabsContent>
            <TabsContent value="theme" className="mt-4">
              <div className="space-y-2">
                <Label htmlFor="theme">Story Theme</Label>
                <Textarea
                  id="theme"
                  name="theme"
                  value={formData.theme}
                  onChange={handleInputChange}
                  placeholder="A cyberpunk adventure in a dystopian future..."
                  className="min-h-[150px]"
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="space-y-3">
            <Label>Image Style</Label>
            <RadioGroup
              value={formData.imageStyle}
              onValueChange={handleStyleChange}
              className="grid grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="fantasy" id="fantasy" />
                <Label htmlFor="fantasy">Fantasy</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="realistic" id="realistic" />
                <Label htmlFor="realistic">Realistic</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cartoon" id="cartoon" />
                <Label htmlFor="cartoon">Cartoon</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="abstract" id="abstract" />
                <Label htmlFor="abstract">Abstract</Label>
              </div>
            </RadioGroup>
          </div>

          <Button type="submit" className="w-full bg-story-primary hover:bg-story-dark">
            Create My Story
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default StoryForm;
