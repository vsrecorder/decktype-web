"use client";

import { useState } from "react";
import Image from "next/image";
import { Card } from "@/types/deck";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DeckCardsProps {
  cards: Card[];
}

export function DeckCards({ cards }: DeckCardsProps) {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  if (!cards.length) {
    return <div className="text-center py-8">No cards found</div>;
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="relative">
      {selectedCard && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedCard(null)}
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedCard.image_url}
              alt={selectedCard.name}
              width={400}
              height={560}
              className="w-full h-auto rounded-3xl shadow-2xl"
              priority
              onClick={() => setSelectedCard(null)}
            />
          </motion.div>
        </div>
      )}
      
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
      >
        <>
          {cards.map((card, index) => (
            <motion.div
              key={`${card.name}-${index}`}
              variants={item}
              className="group"
              whileHover={{ y: -5 }}
              onClick={() => setSelectedCard(card)}
            >
              <div className={cn(
                "relative overflow-hidden rounded-xl shadow-md cursor-pointer",
                "transition-all duration-300",
                "hover:shadow-xl"
              )}>
                <div className="relative aspect-[9/12.5] bg-muted rounded-xl overflow-hidden">
                  <Image
                    src={card.image_url}
                    alt={card.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88P/BfwAJeAPlgYlVpAAAAABJRU5ErkJggg=="
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="font-medium text-sm truncate">{card.name}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </>
      </motion.div>
    </div>
  );
}