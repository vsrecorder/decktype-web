"use client";

import { useState } from "react";
import { fetchDeckByCode } from "@/lib/api";
import { DeckType } from "@/types/deck";
import { DeckSearch } from "@/components/deck-search";
import { DeckViewer } from "@/components/deck-viewer";
import { DeckSkeleton } from "@/components/deck-skeleton";
import { motion } from "framer-motion";

import Image from "next/image";

import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

import { RiTwitterXLine } from "react-icons/ri";


interface TopPageProps {
  environmentId: string;
  environmentTitle: string;
}

export default function TopPage({ environmentId, environmentTitle }: TopPageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [decktype, setDeckType] = useState<DeckType[] | null>(null);
  const [currentDeckCode, setCurrentDeckCode] = useState<string>("");
  const [href, setHref] = useState<string>("");

  const handleSearch = async (deckcode: string) => {
    setIsLoading(true);
    setError(null);
    setCurrentDeckCode(deckcode);
    
    const formData = new FormData()
    formData.append('deckID', deckcode)

    const ret = await fetch(`https://www.pokemon-card.com/deck/deckIDCheck.php`, {
        method: 'post',
        headers: {},
        body: formData,
    })
    .then((res) => res.json())
    .then((ret) => {
      return ret
    })

    if (ret.result != 1) {
      setError("存在しないデッキコードです");
      setDeckType(null);
      setIsLoading(false);
    } else {
      try {
        const data = await fetchDeckByCode(deckcode);
        if (data && data.length > 0) {
          setDeckType(data);

          let encoded = encodeURIComponent('デッキタイプの診断結果は\n\n');
          if (data.length >= 2) {
            encoded = encoded + encodeURIComponent('『 ' + data[0].title + ' / ' + data[1].title + ' 』' + '\n\n' + 'でした！' + '\n\n');
          } else {
            encoded = encoded + encodeURIComponent('『 ' + data[0].title + ' 』' + '\n\n' + 'でした！' + '\n\n');
          }

          encoded = encoded + encodeURIComponent('環境：' + '『' + environmentTitle + '』'+ '\n');
          encoded = encoded + encodeURIComponent('デッキコード：' + deckcode);

          const url = `https://decktype.vsrecorder.mobi/environments/`+ environmentId +`/deckcodes/${deckcode}`;
          const hashtag = encodeURIComponent("ポケカデッキタイプ診断")

          setHref(`https://twitter.com/intent/tweet?text=` + encoded + `&url=` + url + `&via=` + "vsrecorder_mobi" + `&hashtags=` + hashtag)

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
    }
  };

  return (
    <main className="max-h-screen bg-gradient-to-b from-background">
      <div className="container mx-auto px-4 pt-8 max-w-6xl">
        <div className="pb-5 text-center">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              <a href={"/"} >
                ポケカ デッキタイプ診断
              </a>
          </h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-muted-foreground"
          >
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              『{environmentTitle}』環境
            </p>
          </motion.div>
        </div>

        <div className="flex justify-center mb-5">
          <DeckSearch onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {error && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-destructive mb-8 p-4 bg-destructive/10 rounded-lg max-w-lg mx-auto"
          >
            {error}
          </motion.div>

          {error == "デッキタイプが見つかりませんでした" ? (
            <div className="flex justify-center px-4">
              <div className="relative w-full max-w-3xl aspect-[16/9] overflow-hidden">
                <Image
                  src={`https://www.pokemon-card.com/deck/deckView.php/deckID/${currentDeckCode}.png`}
                  alt={`${currentDeckCode}`}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          ):(<></>)}
        </>
        )}

        {isLoading ? (
          <DeckSkeleton />
        ) : decktype ? (
          <>
          <div className="pb-9">
            <DeckViewer decktype={decktype} deckcode={currentDeckCode} />
          </div>

          <div className="items-center justify-center flex flex-col">
          <Link
            href={href}
          > 
            <Button color="secondary" radius="md" size="md">
              <RiTwitterXLine />
              <p className="pl-2">診断結果をポストする</p>
            </Button>
          </Link>
          </div>
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

      <footer className="pt-9 pb-5 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} provided by <a className={"underline"} href={"https://vsrecorder.mobi"}>バトレコ</a></p>
      </footer>
    </main>
  );
};