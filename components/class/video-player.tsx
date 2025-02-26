"use client";
import { ForwardedRef, forwardRef, useContext, useState } from "react";

// Media player
import {
  MediaPlayer,
  MediaProvider,
  Poster,
  Track,
  isHLSProvider,
  type MediaPlayerInstance,
  type MediaProviderAdapter,
} from "@vidstack/react";
import {
  DefaultVideoLayout,
  defaultLayoutIcons,
} from "@vidstack/react/player/layouts/default";

import "@vidstack/react/player/styles/default/layouts/video.css";
import "@vidstack/react/player/styles/default/theme.css";

// Component imports
import { Button } from "@/components/ui/button";

// Icon imports
import { ListOrdered } from "lucide-react";

// Context imports
import { video_context } from "@/context/video";
import { useSession } from "next-auth/react";
import PlayButtonPlayer from "./play-button-player";

const VideoPlayer = forwardRef(
  (
    {
      transcript,
      subtitle,
      onTimeUpdate,
      className,
      src,
      poster,
      title,
      autoplay,
      clipStartTime,
      clipEndTime,
      currentTime,
      duration,
      muted,
      onPlay = () => {},
      disableSeeking,
      maxSeekTime,
      onEnd = () => {},
      onError = () => {},
      onDurationChange = () => {},
      onControlsChange,
      showCenterPlayButton = true,
    }: any,
    ref: ForwardedRef<MediaPlayerInstance> | any
  ) => {
    const { data: session }: any = useSession();
    const { showTranscript, setShowTranscript }: any =
      useContext(video_context);

    const [videoDuration, setVideoDuration] = useState(0);

    if (!src) {
      onError();
    }

    function onProviderChange(provider: MediaProviderAdapter | null) {
      if (isHLSProvider(provider)) {
        provider.library = "/static/lib/hls/hls.min.js";
      }
      if (isHLSProvider(provider) && session?.token?.access_token) {
        provider.config = {
          xhrSetup: (xhr: any, url: any) => {
            xhr.setRequestHeader(
              "Authorization",
              `Bearer ${session?.token?.access_token}`
            );
          },
        };
      }
    }

    return (
      <MediaPlayer
        onProviderChange={onProviderChange}
        ref={ref}
        title={title}
        src={src || ""}
        onTimeUpdate={onTimeUpdate}
        className={`${className} rounded-xl border-0`}
        playsInline
        aspectRatio='16/9'
        streamType='on-demand'
        dir='ltr'
        autoPlay={autoplay}
        currentTime={currentTime}
        duration={duration}
        clipStartTime={clipStartTime || 0}
        clipEndTime={clipEndTime || 0}
        onEnd={onEnd}
        onPlay={(e) => onPlay(e)}
        muted={muted}
        // onHlsError={(e) => console.log(e)}
        onError={onError}
        onDurationChange={(e: any) => {
          onDurationChange(e);
          setVideoDuration(e);
        }}
        onControlsChange={onControlsChange}
        onMediaSeekRequest={(seekTo, nativeEvents) => {
          if (disableSeeking || (+maxSeekTime && seekTo > +maxSeekTime)) {
            nativeEvents.preventDefault();
          }
        }}
      >
        <MediaProvider>
          {poster ? (
            <Poster src={poster} alt={title} className='vds-poster' />
          ) : null}

          {transcript ? (
            <Track
              src={transcript}
              kind='subtitles'
              label='Persian'
              lang='fa-IR'
              type='srt'
            />
          ) : null}
        </MediaProvider>

        {showCenterPlayButton ? <PlayButtonPlayer /> : null}

        <DefaultVideoLayout
          icons={defaultLayoutIcons}
          disableTimeSlider={disableSeeking}
        />

        {subtitle && (
          <Button
            className='absolute left-0 top-0 z-10 m-1 rounded-md text-white opacity-0 hover:bg-accent/30 hover:text-white media-controls:opacity-100'
            size='icon'
            variant='ghost'
            onClick={() => setShowTranscript(!showTranscript)}
          >
            <ListOrdered />
          </Button>
        )}
      </MediaPlayer>
    );
  }
);
VideoPlayer.displayName = "VideoPlayer";
export default VideoPlayer;
