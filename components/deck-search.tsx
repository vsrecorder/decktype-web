"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface DeckSearchProps {
  onSearch: (deckcode: string) => void;
  isLoading: boolean;
}

export function DeckSearch({ onSearch, isLoading }: DeckSearchProps) {
  const [deckcode, setDeckCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (deckcode.trim()) {
      onSearch(deckcode.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg">
      <div className="flex items-center space-x-2">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="デッキコードを入力してください"
            value={deckcode}
            onChange={(e) => setDeckCode(e.target.value)}
            className="pr-10 h-12 backdrop-blur-sm bg-background/90 transition-all duration-300 border-2 focus-visible:ring-offset-2"
            disabled={isLoading}
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
        <Button 
          type="submit" 
          disabled={!deckcode.trim() || isLoading}
          className="h-12 px-9 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
        >
          {isLoading ? "診断中" : "診断"}
        </Button>
      </div>
    </form>
  );
}