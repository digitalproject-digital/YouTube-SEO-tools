import { GoogleGenAI } from "@google/genai";

// Initialize the client
// NOTE: We assume process.env.API_KEY is available. 
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateContent = async (
  systemPrompt: string,
  userInputs: Record<string, string>
): Promise<string> => {
  try {
    // Construct the user message from inputs
    let inputString = "User Inputs:\n";
    for (const [key, value] of Object.entries(userInputs)) {
      inputString += `- ${key}: ${value}\n`;
    }

    const modelId = 'gemini-2.5-flash';

    const response = await ai.models.generateContent({
      model: modelId,
      contents: [
        {
          role: 'user',
          parts: [{ text: systemPrompt + "\n\n" + inputString }]
        }
      ],
      config: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      }
    });

    return response.text || "No response generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating content. Please check your API Key or try again later.";
  }
};