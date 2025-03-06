# Oishi-chan 🍣

Oishi-chan is a fun, food-focused chatbot built with Next.js and powered by Google's Gemini AI. She’s your kawaii virtual chef who only answers food-related questions in a playful, Japanese weeb/waifu style, occasionally calling you "Oni-chan" for extra charm! This project features a responsive chat interface with typing effects, skeleton loaders, and a delightful user experience.


<p align="center">
  <img src="[https://your-image-url.com](https://github.com/user-attachments/assets/103f075d-577f-44c2-82cb-bd82df526531)" width="500">
</p>


## Features

- **Food-Only Chatbot**: Oishi-chan exclusively responds to food-related queries with a flirty, fun tone.
- **Responsive Design**: Works seamlessly across mobile, tablet, and desktop screens.
- **Typing Effect**: Simulates real-time typing for an engaging conversation feel.
- **Skeleton Loaders**: Displays loading states while fetching responses.
- **Error Handling**: Graceful error messages when things go wrong in Oishi-chan's kitchen.
- **Markdown Support**: Responses are rendered with markdown for rich text formatting.

## Preview
[![Video Thumbnail](https://drive.google.com/thumbnail?id=d/1r239PDBQPk_Idi_ln3-BSSz1qwhr69lC)](https://drive.google.com/file/d/1r239PDBQPk_Idi_ln3-BSSz1qwhr69lC/preview)


## Tech Stack

- **Next.js**: React framework for building the application.
- **Google Generative AI**: Powers Oishi-chan’s responses using the `gemini-1.5-flash` model.
- **Tailwind CSS**: For responsive and utility-first styling.
- **React Markdown**: Renders AI responses with markdown support.
- **Lucide React**: Provides icons like the stop square button.

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- A Google Generative AI API key (get one from [Google AI Studio](https://aistudio.google.com/))

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/oishi-chan.git
   cd oishi-chan
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set Up Environment Variables**:
   Create a `.env.local` file in the root directory and add your Google API key:
   ```ini
   NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY=your-api-key-here
   ```

4. **Run the Development Server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open the app in your browser**:
   ```
   http://localhost:3000/oishichan
   ```

## Usage

1. Type a food-related question (e.g., "How do I make sushi, Oni-chan?") in the input box and press "Send" or hit Enter.
2. Oishi-chan will respond with a typing animation. Click the square button to stop the typing if needed.
3. Non-food questions will be playfully rejected with a waifu-style denial.
4. The chat is fully responsive—try resizing your window or testing on different devices!

## Project Structure

```
 oishi-chan/
 ├── app/
 │   └── oishichan/
 │       └── page.jsx        # Main component with chat logic and UI
 ├── components/             # UI components (e.g., Skeleton)
 ├── public/                 # Static assets
 ├── .env.local              # Environment variables (not tracked)
 ├── next.config.js          # Next.js configuration
 ├── package.json            # Dependencies and scripts
 └── README.md               # This file
```

## Configuration

Update `next.config.js` if you need to modify environment variables or add more Next.js configurations:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY,
  },
};

module.exports = nextConfig;
```

## Troubleshooting

- **API Key Error**: Ensure your `NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY` is set correctly in `.env.local` and restart the server.
- **No Response**: Check your internet connection and verify the API key has proper permissions.
- **Styling Issues**: Clear your browser cache or ensure Tailwind CSS is properly configured.

## Contributing

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/amazing-feature
   ```
5. Open a pull request.

## Acknowledgments

- Inspired by anime waifu culture and culinary adventures!
- Thanks to xAI for sparking the idea of fun AI assistants.
- Built with love by **Ayush Shukla** on March 06, 2025.

Happy cooking with Oishi-chan, Oni-chan~! 💖
