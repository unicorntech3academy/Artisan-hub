
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const enhanceJobDescription = async (basicDesc: string, category: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Enhance this service request for a ${category} in Ekiti State. Make it professional and detailed for artisans to bid accurately. Input: "${basicDesc}"`,
    config: {
      temperature: 0.7,
      maxOutputTokens: 250,
    }
  });
  return response.text || basicDesc;
};

export const suggestArtisans = async (jobTitle: string, jobDescription: string, artisans: any[]) => {
  const artisanContext = artisans.map(a => ({
    id: a.userId,
    name: a.fullName,
    skills: a.skills,
    rating: a.rating,
    bio: a.bio
  }));

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Based on the job: "${jobTitle} - ${jobDescription}", identify the top 3 best matching artisans from this list: ${JSON.stringify(artisanContext)}. Return as JSON array of IDs only.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: { type: Type.STRING }
      }
    }
  });

  try {
    return JSON.parse(response.text || '[]');
  } catch (e) {
    return [];
  }
};

export const summarizeArtisanReview = async (reviews: string[]) => {
  if (reviews.length === 0) return "No reviews yet.";
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Summarize the following reviews for an artisan into a 1-sentence highlight: ${reviews.join('; ')}`,
  });
  return response.text || "Highly recommended artisan.";
};
