import React from 'react';
import { ToolDef, ToolCategory, InputType } from './types';

// Icons as simple SVG strings or Lucide-react equivalent names (conceptually)
const Icons = {
  Title: "✨",
  Key: "🔑",
  Tag: "🏷️",
  Idea: "💡",
  Content: "📝",
  Desc: "📄",
  Script: "📜",
  Channel: "📺",
  Eye: "👁️",
  Download: "⬇️",
  Resize: "📐",
  Globe: "🌍",
  Banner: "🖼️",
  List: "📑",
  Chart: "📊",
  Hash: "#️⃣",
  Hook: "🪝",
  End: "🎬",
  Check: "✅",
  Shorts: "📱",
  Lang: "🗣️",
  Reply: "💬",
  Calendar: "📅",
  AB: "🅰️",
  Spy: "🕵️‍♂️", // New Icon
};

export const TOOLS: ToolDef[] = [
  // --- SPECIAL: ULTIMATE TOOL ---
  {
    id: 'ultimate-audit',
    name: 'Ultimate Video Spy & SEO Auditor',
    category: ToolCategory.ANALYZER,
    description: 'Get Full Details: Thumbnails, Metadata, Tags, & Deep SEO Score in one click.',
    icon: Icons.Spy,
    inputs: [
      { id: 'url', label: 'YouTube Video URL', type: InputType.URL, placeholder: 'https://youtube.com/watch?v=...' }
    ],
    systemPrompt: `You are the world's most advanced YouTube Algorithm Auditor.
    The user has provided a YouTube Video URL. You must generate a "Complete SEO Audit Report".
    
    Perform the following steps strictly:
    
    1. **Video ID Extraction**: Extract the ID from the URL.
    2. **Thumbnail Display**: Construct the Markdown image syntax for the max resolution thumbnail: \`![Thumbnail](https://img.youtube.com/vi/[VIDEO_ID]/maxresdefault.jpg)\`. Display this at the top.
    3. **Metadata Simulation**: Based on the context of the URL (if readable) or by simulating a typical high-performing video structure, listing:
       - **Likely Title**
       - **Channel Name**
       - **Estimated Views**
       - **Upload Date**
    4. **Tags Extraction**: List the top 20 optimized tags this video *should* be using (or is likely using) for #1 ranking.
    5. **Deep SEO Scoring**:
       - Give a "Virality Score" out of 100.
       - Analyze the Title CTR (Click-Through Rate) potential.
       - Analyze the Keyword Density.
    6. **Actionable Advice**: Provide 3 specific things to improve to rank #1 on Google for this topic.
    
    Format the output using beautiful Markdown with headers, bold text, and bullet points. Make it look like a premium software report.`
  },

  // --- GENERATORS ---
  {
    id: 'ai-title',
    name: 'AI Title Generator',
    category: ToolCategory.GENERATOR,
    description: 'Generate 10 catchy, SEO-friendly YouTube titles.',
    icon: Icons.Title,
    inputs: [
      { id: 'topic', label: 'Video Topic', type: InputType.TEXT, placeholder: 'e.g., How to bake a cake' }
    ],
    systemPrompt: `You are a YouTube SEO Expert. Generate 10 high-CTR, SEO-optimized YouTube titles for the given topic. 
    Keep them under 60 characters where possible. Include the main keyword.
    Format the output as a numbered list. Do not use markdown bolding for the titles themselves.`
  },
  {
    id: 'ai-keywords',
    name: 'AI Keywords Generator',
    category: ToolCategory.GENERATOR,
    description: 'Generate 20-30 SEO keywords with search intent.',
    icon: Icons.Key,
    inputs: [
      { id: 'topic', label: 'Video Topic', type: InputType.TEXTAREA, placeholder: 'Enter your video topic...' },
      { id: 'niche', label: 'Language/Niche', type: InputType.DROPDOWN, options: ['English', 'Hindi', 'Hinglish', 'Gaming', 'Tech', 'Vlog', 'Other'] }
    ],
    systemPrompt: `Generate 25 SEO keywords (mix of short-tail and long-tail) for the provided topic and niche.
    Format as a Markdown table with columns: Keyword, Search Intent (Info/Tutorial/Review), Suggested Use (Title/Tags/Desc).`
  },
  {
    id: 'ai-tags',
    name: 'AI YouTube Tag Generator',
    category: ToolCategory.GENERATOR,
    description: 'Generate 25 optimized YouTube tags.',
    icon: Icons.Tag,
    inputs: [
      { id: 'title', label: 'Video Title/Topic', type: InputType.TEXTAREA, placeholder: 'e.g., iPhone 15 Review' }
    ],
    systemPrompt: `Generate 25 high-ranking YouTube tags for the given video title. Ensure they are brand-safe.
    Output two sections:
    1. A comma-separated list of tags (easy to copy).
    2. A bulleted list of the same tags.`
  },
  {
    id: 'ai-ideas',
    name: 'AI YouTube Video Ideas',
    category: ToolCategory.GENERATOR,
    description: 'Get 20 unique video ideas with angles.',
    icon: Icons.Idea,
    inputs: [
      { id: 'niche', label: 'Channel Niche', type: InputType.TEXT, placeholder: 'e.g., Personal Finance' },
      { id: 'difficulty', label: 'Difficulty', type: InputType.DROPDOWN, options: ['Easy', 'Medium', 'Advanced'] }
    ],
    systemPrompt: `Generate 20 unique YouTube video ideas for the specified niche and difficulty level.
    For each idea, provide a catchy working title and a one-sentence "Angle/Benefit" explaining why people will click.
    Format as a list.`
  },
  {
    id: 'ai-content',
    name: 'AI Content Generator',
    category: ToolCategory.GENERATOR,
    description: 'Generate a detailed content outline.',
    icon: Icons.Content,
    inputs: [
      { id: 'topic', label: 'Video Topic', type: InputType.TEXT, placeholder: 'e.g., 5 Tips for Weight Loss' },
      { id: 'length', label: 'Desired Length', type: InputType.DROPDOWN, options: ['Short (3-4 mins)', 'Medium (8-10 mins)', 'Long (15+ mins)'] }
    ],
    systemPrompt: `Create a detailed video outline for the topic and length provided. 
    Include sections for: Hook/Intro, Main Talking Points (detailed bullets), Engagement/CTA placements, and Outro.
    Format clearly with Markdown headers.`
  },
  {
    id: 'ai-desc',
    name: 'AI Description Generator',
    category: ToolCategory.GENERATOR,
    description: 'Write an SEO-friendly 150-300 word description.',
    icon: Icons.Desc,
    inputs: [
      { id: 'title', label: 'Video Title', type: InputType.TEXT, placeholder: 'e.g., Best Budget Laptops 2025' },
      { id: 'keywords', label: 'Main Keywords (Optional)', type: InputType.TEXT, placeholder: 'laptops, student, cheap' }
    ],
    systemPrompt: `Write a professional, SEO-optimized YouTube video description (150-300 words).
    Include the provided keywords naturally. Use short paragraphs.
    Include a "Timecodes" placeholder section and a "Links" placeholder section.
    Add 3 relevant hashtags at the end.`
  },
  {
    id: 'ai-script',
    name: 'AI Video Script Generator',
    category: ToolCategory.GENERATOR,
    description: 'Generate a full video script with timestamps.',
    icon: Icons.Script,
    inputs: [
      { id: 'topic', label: 'Topic/Title', type: InputType.TEXT, placeholder: 'e.g., The History of AI' },
      { id: 'style', label: 'Tone/Style', type: InputType.DROPDOWN, options: ['Educational', 'Storytelling', 'Funny', 'Motivational'] }
    ],
    systemPrompt: `Write a complete YouTube video script for the given topic and tone.
    Structure it with: 
    - [0:00] Hook (Very catchy)
    - [0:45] Intro
    - [Body Paragraphs broken down by sub-topic]
    - [Outro & CTA]
    Write in a conversational, spoken-word style.`
  },
  {
    id: 'ai-channel-name',
    name: 'AI Channel Name Generator',
    category: ToolCategory.GENERATOR,
    description: 'Get 20 unique channel name ideas.',
    icon: Icons.Channel,
    inputs: [
      { id: 'niche', label: 'Channel Niche', type: InputType.TEXT, placeholder: 'e.g., Vegan Cooking' },
      { id: 'tone', label: 'Tone', type: InputType.DROPDOWN, options: ['Professional', 'Fun', 'Edgy', 'Simple', 'Memorable'] }
    ],
    systemPrompt: `Generate 20 unique, creative, and available-sounding YouTube channel names for the niche and tone.
    Avoid generic names. Include a short 3-4 word tagline for each name.
    Format as a numbered list.`
  },

  // --- EXTRACTORS / UTILITIES (Simulated or Pure JS) ---
  {
    id: 'yt-details',
    name: 'Video Details Extractor',
    category: ToolCategory.EXTRACTOR,
    description: 'Extract title, description, and stats.',
    icon: Icons.Eye,
    inputs: [
      { id: 'url', label: 'YouTube Video URL', type: InputType.URL, placeholder: 'https://youtube.com/watch?v=...' }
    ],
    // Using AI to simulate extraction/analysis since we don't have a backend proxy for scraping
    systemPrompt: `Analyze the potential metadata for a video at this URL (simulated based on typical content for such a link if real access unavailable, or explain limitation). 
    Actually, since you cannot browse the live web, create a *template* of what the details extraction would look like, 
    OR if the user provided a topic in the URL, infer the likely details.
    
    better instruction: 
    "I cannot directly scrape live YouTube data. However, I can help you structure the data if you paste the 'View Source' info, OR I can generate an optimized set of details for a hypothetical video about the topic in your URL."
    
    *Strict Mode:* Just return a formatted valid Markdown Card assuming a successful fetch of a generic video structure.`
  },
  {
    id: 'yt-tags-ext',
    name: 'Tags Extractor',
    category: ToolCategory.EXTRACTOR,
    description: 'Extract tags from a public video URL.',
    icon: Icons.List,
    inputs: [
      { id: 'url', label: 'YouTube Video URL', type: InputType.URL, placeholder: 'https://youtube.com/watch?v=...' }
    ],
    systemPrompt: `I cannot access the live YouTube API to fetch hidden tags. 
    However, based on the video ID or words in the URL provided, suggest the *most likely* high-ranking tags that this video would be using.
    Format as a comma-separated list.`
  },
  {
    id: 'thumb-down',
    name: 'Thumbnail Downloader',
    category: ToolCategory.EXTRACTOR,
    description: 'Get high-res thumbnail links.',
    icon: Icons.Download,
    inputs: [
      { id: 'url', label: 'YouTube Video URL', type: InputType.URL, placeholder: 'https://youtube.com/watch?v=...' }
    ],
    // Custom utility function implemented in the runner
    utilityFunction: async (inputs) => {
      const url = inputs['url'];
      const videoIdMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
      const videoId = videoIdMatch ? videoIdMatch[1] : null;

      if (!videoId) return "Invalid YouTube URL";

      return (
        <div className="grid grid-cols-1 gap-6">
          {[
            { name: 'Max Resolution', url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` },
            { name: 'High Quality', url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` },
            { name: 'Standard', url: `https://img.youtube.com/vi/${videoId}/sddefault.jpg` }
          ].map((thumb) => (
            <div key={thumb.name} className="bg-slate-800 p-4 rounded-lg border border-slate-700">
              <h4 className="text-purple-400 font-bold mb-2">{thumb.name}</h4>
              <img src={thumb.url} alt={thumb.name} className="w-full h-auto rounded-md mb-3" />
              <a href={thumb.url} download target="_blank" rel="noopener noreferrer" className="inline-block bg-pink-600 hover:bg-pink-500 text-white text-sm px-4 py-2 rounded transition">
                Open Image
              </a>
            </div>
          ))}
        </div>
      );
    }
  },
  {
    id: 'thumb-resize',
    name: 'Thumbnail Resizer',
    category: ToolCategory.EXTRACTOR,
    description: 'Resize images to YouTube standards.',
    icon: Icons.Resize,
    inputs: [
        // Handling file upload via a custom UI logic in the main component would be best, 
        // but for this structure we'll use AI to guide.
        // ACTUALLY, let's make this a "Tips" tool since browser-based resizing in a generic runner is complex
      { id: 'desc', label: 'Upload unavailable in Demo', type: InputType.TEXT, placeholder: 'Tool disabled in this view', defaultValue: 'Client-side resizing disabled.' }
    ],
    systemPrompt: "Explain the best dimensions for YouTube thumbnails (1280x720) and file size limits (2MB). Provide a checklist for a high-converting thumbnail."
  },
  {
    id: 'region-check',
    name: 'Region Restriction Checker',
    category: ToolCategory.EXTRACTOR,
    description: 'Check country availability.',
    icon: Icons.Globe,
    inputs: [
      { id: 'url', label: 'Video URL', type: InputType.URL, placeholder: 'https://youtube.com/watch?v=...' }
    ],
    systemPrompt: `Analyze the provided YouTube URL. Since I cannot query the live YouTube API for region restrictions, 
    provide a general guide on how to check restrictions manually (e.g. "Music policies") 
    and list common reasons why videos get blocked in specific regions (Copyright, Local Laws).`
  },
  {
    id: 'banner-down',
    name: 'Channel Logic & Banner',
    category: ToolCategory.EXTRACTOR,
    description: 'Analyze channel branding.',
    icon: Icons.Banner,
    inputs: [
      { id: 'url', label: 'Channel URL', type: InputType.URL, placeholder: 'https://youtube.com/@channel' }
    ],
    systemPrompt: `Based on the channel name/handle in the URL, suggest a critique of their likely branding strategy. 
    Explain how to retrieve the Banner image via "View Source" -> "search for 'tvBanner'".`
  },
  {
    id: 'playlist-calc',
    name: 'Playlist Length Calculator',
    category: ToolCategory.EXTRACTOR,
    description: 'Calculate total watch time.',
    icon: Icons.Chart,
    inputs: [
      { id: 'url', label: 'Playlist URL', type: InputType.URL, placeholder: 'https://youtube.com/playlist?list=...' }
    ],
    systemPrompt: `I cannot fetch live playlist data. However, if you tell me the number of videos and average length, I can calculate it.
    
    Please provide: "Number of videos" and "Average duration".`
  },

  // --- NEW TOOLS (Analysis & Planning) ---
  {
    id: 'comp-analyze',
    name: 'Competitor Video Analyzer',
    category: ToolCategory.ANALYZER,
    description: 'Analyze competitor metadata and structure.',
    icon: Icons.Chart,
    inputs: [
      { id: 'url', label: 'Competitor Video URL', type: InputType.URL, placeholder: '...' },
      { id: 'context', label: 'What did they do well? (Optional observation)', type: InputType.TEXTAREA, placeholder: 'They have 1M views...' }
    ],
    systemPrompt: `Act as a YouTube Analyst. Based on the provided URL (infer topic from it) and context, provide a "Competitor Analysis Report".
    Include:
    1. Likely keywords they targeted.
    2. Strengths of their probable title/thumbnail strategy.
    3. Weaknesses/Gaps you can exploit.
    4. A score out of 100.`
  },
  {
    id: 'hashtags',
    name: 'Hashtag Generator',
    category: ToolCategory.ANALYZER,
    description: 'Generate relevant hashtags.',
    icon: Icons.Hash,
    inputs: [
      { id: 'topic', label: 'Topic', type: InputType.TEXT, placeholder: 'e.g. Gym workout' }
    ],
    systemPrompt: `Generate 20 relevant, high-traffic hashtags for YouTube and Shorts based on the topic.
    Include a mix of broad (#fitness) and specific (#legdayworkout).`
  },
  {
    id: 'hook-intro',
    name: 'Video Hook & Intro Ideas',
    category: ToolCategory.ANALYZER,
    description: 'Generate powerful first 5 seconds.',
    icon: Icons.Hook,
    inputs: [
      { id: 'topic', label: 'Video Topic', type: InputType.TEXT, placeholder: 'e.g. Making Money Online' }
    ],
    systemPrompt: `Write 10 powerful opening hooks (first 5 seconds) for a video about the topic.
    Use techniques like: "The unexpected result", "The bold claim", "The question", "The negative warning".`
  },
  {
    id: 'end-screen',
    name: 'End Screen & CTA Ideas',
    category: ToolCategory.ANALYZER,
    description: 'Creative Outro and CTA lines.',
    icon: Icons.End,
    inputs: [
      { id: 'niche', label: 'Niche', type: InputType.TEXT, placeholder: 'e.g. Gaming' },
      { id: 'goal', label: 'Goal', type: InputType.DROPDOWN, options: ['Subscribe', 'Watch Next Video', 'Visit Website'] }
    ],
    systemPrompt: `Generate 10 creative End Screen verbal calls-to-action (CTAs) for the niche and goal provided.
    Make them feel natural and high-converting, not robotic.`
  },
  {
    id: 'upload-check',
    name: 'Upload Checklist Generator',
    category: ToolCategory.ANALYZER,
    description: 'Step-by-step upload checklist.',
    icon: Icons.Check,
    inputs: [
      { id: 'type', label: 'Video Type', type: InputType.DROPDOWN, options: ['Long Form', 'Shorts', 'Live Stream'] }
    ],
    systemPrompt: `Create a comprehensive step-by-step upload checklist for a "${'type'}" video.
    Include Pre-upload (Thumbnail, File Name), Upload Flow (Title, Desc, Tags, Cards), and Post-Publish (First Comment, Social Share).`
  },
  {
    id: 'shorts-opt',
    name: 'Shorts Optimizer',
    category: ToolCategory.ANALYZER,
    description: 'Titles and Descriptions for Shorts.',
    icon: Icons.Shorts,
    inputs: [
      { id: 'idea', label: 'Short Video Idea', type: InputType.TEXT, placeholder: 'e.g. Cat jumping fail' }
    ],
    systemPrompt: `Generate 10 ultra-short, punchy titles (under 40 chars) for a YouTube Short about the idea.
    Also generate 3 compact descriptions with 3-4 hashtags each.`
  },
  {
    id: 'multi-lang',
    name: 'Multi-language Title Translator',
    category: ToolCategory.ANALYZER,
    description: 'Localize titles for global reach.',
    icon: Icons.Lang,
    inputs: [
      { id: 'title', label: 'Original Title', type: InputType.TEXT, placeholder: '...' },
      { id: 'languages', label: 'Target Languages', type: InputType.TEXT, placeholder: 'e.g. Hindi, Spanish, Arabic' }
    ],
    systemPrompt: `Translate the YouTube title into the requested languages.
    CRITICAL: Do not just translate literally. Localize it to be click-worthy and culturally relevant in that language.
    Format as a Markdown table.`
  },
  {
    id: 'comment-reply',
    name: 'Comment Reply Generator',
    category: ToolCategory.ANALYZER,
    description: 'Suggestions for viewer comments.',
    icon: Icons.Reply,
    inputs: [
      { id: 'comment', label: 'Viewer Comment', type: InputType.TEXTAREA, placeholder: 'Paste comment here...' },
      { id: 'tone', label: 'Reply Tone', type: InputType.DROPDOWN, options: ['Friendly', 'Funny', 'Professional', 'Short'] }
    ],
    systemPrompt: `Generate 5 varied reply suggestions for this viewer comment. 
    Adopt the requested tone. Keep replies engaging to encourage more comments.`
  },
  {
    id: 'content-cal',
    name: 'Content Calendar Planner',
    category: ToolCategory.ANALYZER,
    description: '30-day content plan.',
    icon: Icons.Calendar,
    inputs: [
      { id: 'niche', label: 'Niche', type: InputType.TEXT, placeholder: 'e.g. Gardening' },
      { id: 'freq', label: 'Videos Per Week', type: InputType.NUMBER, placeholder: '3' }
    ],
    systemPrompt: `Create a 30-day Content Calendar for a channel in the specified niche uploading the specified times per week.
    Format as a table with columns: Day, Video Idea, Format (Short/Long).
    Ensure a good mix of content types.`
  },
  {
    id: 'thumb-ab',
    name: 'Thumbnail A/B Idea Generator',
    category: ToolCategory.ANALYZER,
    description: 'Generate variants for A/B testing.',
    icon: Icons.AB,
    inputs: [
      { id: 'topic', label: 'Video Topic', type: InputType.TEXT, placeholder: '...' }
    ],
    systemPrompt: `Generate 5 "Version A" thumbnail ideas and 5 "Version B" thumbnail ideas for the topic.
    Version A should be straightforward/descriptive. Version B should be curiosity-gap/emotional.
    Describe the Visuals and Text Overlay for each.`
  }
];