"use client";

import { Controls, useMediaRemote, useMediaStore } from "@vidstack/react";
import { Pause, Play } from "lucide-react";

export default function PlayButtonPlayer() {
  const remote = useMediaRemote();

  const { paused } = useMediaStore();

  return (
    <Controls.Root className='vds-controls'>
      <div className='vds-controls-spacer' />
      <Controls.Group className='vds-controls-group'>
        <div
          className='flex items-center justify-center'
          onClick={() => (paused ? remote?.play() : remote?.pause())}
        >
          <div
            className={`flex items-center justify-center rounded-full bg-slate-900/90 ${paused ? "px-3" : ""} p-2 text-white`}
          >
            {paused ? (
              <Play className='-mr-2 h-10 w-10 fill-current stroke-none' />
            ) : (
              <Pause className='h-10 w-10 fill-current stroke-none' />
            )}
          </div>
        </div>
      </Controls.Group>
      <div className='vds-controls-spacer' />
    </Controls.Root>
  );
}
