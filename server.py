
from flask import Flask, jsonify, request
from flask_cors import CORS
import time
import random

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Sample image URLs (in a real app, these would come from an AI service)
mock_images = [
    "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    "https://images.unsplash.com/photo-1466721591366-2d5fba72006d", 
    "https://images.unsplash.com/photo-1493962853295-0fd70327578a"
]

@app.route('/generate-story', methods=['POST'])
def generate_story():
    # Get data from request
    data = request.json
    
    # Simulate processing time
    time.sleep(3)
    
    # Generate content based on form type
    story_text = ""
    if data.get('type') == "start" and data.get('storyStart'):
        story_text = data.get('storyStart')
    else:
        story_text = f"Once upon a time in a {data.get('imageStyle')} world, an adventure began based on the theme: {data.get('theme')}"
    
    # Create story segments
    segments = [
        {
            "text": f"{story_text}\n\nThe journey was just beginning, and nobody knew what adventures awaited beyond the horizon. The air was filled with anticipation as our protagonist took their first steps into the unknown.",
            "imageUrl": mock_images[0],
        },
        {
            "text": "As they ventured deeper into the mysterious lands, strange creatures and unexpected allies appeared. The landscape shifted from familiar terrain to breathtaking views that seemed to defy reality itself.",
            "imageUrl": mock_images[1],
        },
        {
            "text": "Finally, after overcoming numerous obstacles and facing their deepest fears, they discovered the truth that had been hidden all along. The world would never be the same, and neither would they.",
            "imageUrl": mock_images[2],
        },
    ]
    
    return jsonify({
        "title": data.get('title'),
        "segments": segments
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
