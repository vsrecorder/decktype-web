import { DeckType } from "@/types/deck";

const API_BASE_URL = "https://vsrecorder.mobi/api/v1/decktypes";

export async function fetchDeckByCode(environmentId: string, deckcode: string): Promise<DeckType[]> {
  try {
    const url = `${API_BASE_URL}/${deckcode}/${environmentId}`
    const response = await fetch(url);
    
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