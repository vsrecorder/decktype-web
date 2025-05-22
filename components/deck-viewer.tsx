"use client";

import { useState } from "react";
import { DeckType } from "@/types/deck";
import { DeckCards } from "@/components/deck-cards";
import { Card } from "@/types/deck";
import { motion } from "framer-motion";
import Image from "next/image";

interface DeckViewerProps {
  decktype: DeckType;
  deckcode: string;
}

export function DeckViewer({ decktype, deckcode }: DeckViewerProps) {
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
          <h2 className="text-3xl font-bold tracking-tight">『 {decktype.title} 』</h2>
          {/*
          <p className="text-muted-foreground mt-2">デッキ</p>
          */}
          {/*
          <p className="text-muted-foreground mt-2">{deck.main_cards.length} cards</p>
          */}
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

      <DeckCards cards={decktype.main_cards} />

    </motion.div>
  );
}