"use client";

import { useState } from "react";
import { DeckType } from "@/types/deck";
import { DeckCards } from "@/components/deck-cards";
import { Card } from "@/types/deck";
import { motion } from "framer-motion";
import Image from "next/image";

interface DeckViewerProps {
  decktype: DeckType[];
  deckcode: string;
}

export function DeckViewer({ decktype, deckcode }: DeckViewerProps) {
  let cards: Card[] = [];

  if (decktype.length >= 2) {
    cards.push(decktype[0].main_cards[0]);
    cards.push(decktype[1].main_cards[0]);
  } else {
    cards = decktype[0].main_cards;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full space-y-6"
    >
      <div className="text-center">
        <div className="pb-1">
          <p className="text-md text-muted-foreground max-w-2xl mx-auto">
            デッキタイプの診断結果は
          </p>
        </div>

        <div className="pb-1">
          {decktype.length >= 2 ? (
            <>
            <h2 className="text-xl md:text-3xl lg:text-3xl font-bold tracking-tight">『 {decktype[0].title} / {decktype[1].title} 』</h2>
            </>
          ):(
            <>
            <h2 className="text-3xl font-bold tracking-tight">『 {decktype[0].title} 』</h2>
            </>
          )}
        </div>

        <div className="pb-0">
          <p className="text-md text-muted-foreground max-w-2xl mx-auto">
            です！
          </p>
        </div>
      </div>

      {/*
      <div className="flex justify-center px-4">
        <div className="relative w-full max-w-3xl aspect-[16/9] overflow-hidden">
          <Image
            src={`https://www.pokemon-card.com/deck/deckView.php/deckID/${deckcode}.png`}
            alt={`${deckcode}`}
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
      */}

      <DeckCards cards={cards} />

    </motion.div>
  );
}