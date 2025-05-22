export interface Card {
  name: string;
  image_url: string;
}

export interface DeckType {
  title: string;
  main_cards: Card[];
}

export interface ApiResponse {
  data: DeckType[];
  error?: string;
}