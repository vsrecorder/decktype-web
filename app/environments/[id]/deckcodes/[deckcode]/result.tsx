"use client";

import { useCallback } from "react";
import { useState, useEffect } from "react";
import { fetchDeckByCode } from "@/lib/api";
import { DeckType } from "@/types/deck";
import { DeckViewer } from "@/components/deck-viewer";
import { DeckSkeleton } from "@/components/deck-skeleton";
import { motion } from "framer-motion";

interface DeckProps {
  environmentId: string;
  environmentTitle: string;
  deckcode: string;
}

export function Result ({ environmentId, environmentTitle, deckcode }: DeckProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [decktype, setDeckType] = useState<DeckType[] | null>(null);
  const [currentDeckCode, setCurrentDeckCode] = useState<string>("");


  const handleSearch = useCallback(async (deckcode: string) => {
    setIsLoading(true);
    setError(null);
    setCurrentDeckCode(deckcode);

    try {
      const data = await fetchDeckByCode(environmentId, deckcode);
      if (data && data.length > 0) {
        setDeckType(data);
      } else {
        setError("デッキタイプが見つかりませんでした");
        setDeckType(null);
      }
    } catch (err) {
      setError("Failed to fetch deck. Please try again.");
      setDeckType(null);
    } finally {
      setIsLoading(false);
    }
  }, [environmentId]);

  useEffect(() => {
    if (deckcode) {
      handleSearch(deckcode);
    }
  }, [deckcode, handleSearch]);

  return (
    <main className="max-h-screen bg-gradient-to-b from-background">
      <div className="container mx-auto px-4 pt-8 max-w-6xl">
        <div className="pb-3 text-center">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            <a href={"/"} >ポケカ デッキタイプ診断</a>
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            『{environmentTitle}』環境
          </p>
        </div>

        <div className="pt-5 pb-8 text-center">
          <p className="text-md text-muted-foreground max-w-2xl mx-auto">
            デッキコード：<a className="underline" href={"https://www.pokemon-card.com/deck/result.html/deckID/"+deckcode}>{deckcode}</a>
          </p>
        </div>

        {error && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-destructive mb-8 p-4 bg-destructive/10 rounded-lg max-w-lg mx-auto"
        >
          {error}
        </motion.div>
        )}

        {isLoading ? (
          <DeckSkeleton />
        ) : decktype ? (
          <>
          <DeckViewer decktype={decktype} deckcode={currentDeckCode} />
          </>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-muted-foreground mt-12"
          >
            <p className="text-lg">デッキタイプを診断します</p>
          </motion.div>
        )}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-muted-foreground"
      >
        <div className="pt-9">
          <a href={"/"}>
            <p className="underline text-lg text-muted-foreground mx-auto">
              デッキタイプ診断をしてみる
            </p>
          </a>
          <footer className="pt-9 pb-5 text-center text-muted-foreground">
            <p>© {new Date().getFullYear()} provided by <a className={"underline"} href={"https://vsrecorder.mobi"}>バトレコ</a></p>
          </footer>
        </div>
      </motion.div>

    </main>
  );
};