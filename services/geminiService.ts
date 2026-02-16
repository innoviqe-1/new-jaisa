
import { GoogleGenAI, Type } from "@google/genai";
import { Product } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async getRecommendation(userNeed: string, products: Product[]): Promise<string> {
    const productContext = products.map(p => `${p.name} - ₹${p.price} (${p.specs.processor}, ${p.specs.ram})`).join('\n');
    
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are an expert tech consultant for NewJaisa, a refurbished laptop store. 
        The customer says: "${userNeed}"
        
        Available Products:
        ${productContext}
        
        Suggest the best 2 products from our list. Explain WHY briefly. Keep it professional and persuasive. Focus on value for money.`,
        config: {
          temperature: 0.7,
        }
      });
      return response.text || "I couldn't find a specific recommendation, but our Dell Latitude series is generally great for productivity!";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Unable to get AI advice right now. Browse our 'Excellent' condition laptops for the best experience!";
    }
  }
}

export const geminiService = new GeminiService();
