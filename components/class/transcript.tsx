"use client";
const srtParser2 = require("srt-parser-2");
import { createRef, useContext, useEffect, useRef, useState } from "react";

// Component imports
import { Button } from "@/components/ui/button";
import TranscriptLine from "./transcript-line";

// Icon imports
import { video_context } from "@/context/video";
import { convertDecimalSecondsToHMS } from "@/utils/time-formatter";
import { X } from "lucide-react";
import { ScrollableArea } from "../ui/scrollable-area";
import { Separator } from "../ui/separator";
const srtParser = new srtParser2.default();

type SubLine = {
  id: string;
  startTime: string;
  startSeconds: number;
  endTime: string;
  endSeconds: number;
  text: string;
  ref: any;
};
export default function Transcript({ onSubSelected }: any) {
  const { currentTime, subtitle }: any = useContext(video_context);
  const { showTranscript, setShowTranscript }: any = useContext(video_context);
  const [subs, setSubs] = useState<SubLine[] | null>(null);
  const [currentSub, setCurrentSub] = useState<SubLine | null>(null);
  const [srtFile, setSrtFile] = useState("");

  // const { data: srtFile } = useSWR(subtitle, fetcher);

  const fetchingTranscript = async () => {
    try {
      const response = await fetch(subtitle.replace(".vtt", ".srt"));
      const transcriptions = await response.text();
      setSrtFile(transcriptions);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (subtitle) {
      fetchingTranscript();
    }
  }, [subtitle]);

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const subsParsed = srtParser.fromSrt(srtFile.toString());
    const subsWithRef = subsParsed.map((sub: any) => {
      sub.ref = createRef<HTMLDivElement>();
      return sub;
    });
    setSubs(subsWithRef);
  }, [srtFile]);
  subs && subs?.[5] && !currentSub && setCurrentSub(subs[5]);

  const changeSub = (sub: any) => {
    setCurrentSub(sub);
    onSubSelected?.(sub);
  };
  useEffect(() => {
    if (containerRef?.current && currentSub?.ref?.current) {
      const top = Math.max(
        currentSub?.ref?.current?.offsetTop -
          containerRef?.current?.offsetTop -
          68,
        0
      );
      scrollAreaRef?.current?.scrollTo(0, top);
    }
  }, [subs, scrollAreaRef, containerRef, currentSub, currentSub?.ref]);

  useEffect(() => {
    subs?.forEach((sub: any) => {
      if (sub.startSeconds <= currentTime && sub.endSeconds > currentTime) {
        setCurrentSub(sub);
        return;
      }
    });
  }, [currentTime, subs]);

  return (
    <div
      className={`${
        showTranscript ? "visible py-2" : "invisible h-0"
      } w-full overflow-hidden rounded-xl border-slate-400 bg-white px-4 transition-all duration-300 sm:border`}
    >
      {/* <div className="flex grow rounded-2xl border border-muted-foreground overflow-hidden items-center mb-4">
        <Input
          type="text"
          className="border-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />

        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-transparent mx-2"
          name="Search"
        >
          <Search className="text-slate-600 stroke-1.5" />
        </Button>
      </div> */}

      <Button
        size='icon'
        className='h-auto w-auto md:p-1'
        variant='outline'
        onClick={() => setShowTranscript(false)}
      >
        <X />
      </Button>

      <Separator />

      <ScrollableArea
        ref={scrollAreaRef}
        className='aspect-square w-full'
        dir='rtl'
      >
        <div ref={containerRef}>
          {subs &&
            subs.map((sub: any) => (
              <TranscriptLine
                ref={sub.ref}
                key={sub.id}
                id={sub.id}
                time={convertDecimalSecondsToHMS(sub.startSeconds)}
                isCurrent={currentSub == sub}
                line={sub.text}
                onClick={() => changeSub(sub)}
              />
            ))}
        </div>
      </ScrollableArea>
    </div>
  );
}
