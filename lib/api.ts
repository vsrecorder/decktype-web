import { DeckType } from "@/types/deck";

const API_BASE_URL = "https://vsrecorder.mobi/api/v1/decktypes";

export async function fetchDeckByCode(deckcode: string): Promise<DeckType[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/${deckcode}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch deck:", error);
    throw error;
  }
}