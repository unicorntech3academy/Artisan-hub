
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => {
  const apiKey = (process as any).env.API_KEY || (process as any).env.VITE_GEMINI_API_KEY || '';
  if (!apiKey) {
    console.warn('Gemini API key is missing. AI features will be disabled.');
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const enhanceJobDescription = async (basicDesc: string, category: string) => {
  const ai = getAI();
  if (!ai) return basicDesc;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp', // Updated to a more standard model name if flash-preview is not available
      contents: `Enhance this service request for a ${category} in Ekiti State. Make it professional and detailed for artisans to bid accurately. Input: "${basicDesc}"`,
    });
    return response.text || basicDesc;
  } catch (err) {
    console.error('Gemini error:', err);
    return basicDesc;
  }
};

export const suggestArtisans = async (jobTitle: string, jobDescription: string, artisans: any[]) => {
  const ai = getAI();
  if (!ai) return [];

  const artisanContext = artisans.map(a => ({
    id: a.userId,
    name: a.fullName,
    skills: a.skills,
    rating: a.rating,
    bio: a.bio
  }));

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: `Based on the job: "${jobTitle} - ${jobDescription}", identify the top 3 best matching artisans from this list: ${JSON.stringify(artisanContext)}. Return as JSON array of IDs only.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });

    return JSON.parse(response.text || '[]');
  } catch (e) {
    console.error('Gemini error:', e);
    return [];
  }
};

export const summarizeArtisanReview = async (reviews: string[]) => {
  if (reviews.length === 0) return "No reviews yet.";
  
  const ai = getAI();
  if (!ai) return "Highly recommended artisan.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: `Summarize the following reviews for an artisan into a 1-sentence highlight: ${reviews.join('; ')}`,
    });
    return response.text || "Highly recommended artisan.";
  } catch (err) {
    console.error('Gemini error:', err);
    return "Highly recommended artisan.";
  }
};
