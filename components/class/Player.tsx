"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ForwardedRef,
  forwardRef,
  useContext,
  useEffect,
  useState,
} from "react";

// Component  imports
import { Skeleton } from "@/components/ui/skeleton-loading/skeleton";
import UserNoImageIcon from "@/static/icons/user-no-image.svg?url";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useToast } from "../ui/use-toast";
import ActionButton from "./action-button";

import VideoPlayer from "./video-player";

// const VideoPlayer = dynamic(() => import("./video-player"), { ssr: false });

// Fetch imports
import routes from "@/utils/api/routes";
import useSWR, { useSWRConfig } from "swr";

// Icon imports
import FormattingVideoImg from "@/static/images/global/formatting-video.webp";
import {
  Bookmark,
  Edit,
  Heart,
  ListOrdered,
  Loader2,
  UserMinus2,
  UserPlus2,
} from "lucide-react";

// Context imports
import { video_context } from "@/context/video";

// Util imports
import { MediaPlayerInstance } from "@vidstack/react";
import { find, flatten, map } from "lodash-es";

// Auth imports
import { global_context } from "@/context/global";
import { nextFetcher } from "@/utils/api/next-fetcher";
import { useSession } from "next-auth/react";

import Image from "next/image";
import useSWRInfinite from "swr/infinite";
import { Card } from "../ui/card";

const Player = forwardRef(
  (
    { courseDetails, autoplay }: any,
    ref: ForwardedRef<MediaPlayerInstance> | any
  ) => {
    const {
      setShowTranscript,
      showTranscript,
      selectedLesson,
      setSelectedLesson,
      setCurrentTime,
      currentTime,
      subtitle,
      setSubtitle,
      haveSubtitle,
      setHaveSubtitle,
      currentTimeBeforeAdStart,
    }: any = useContext(video_context);

    const { setSignupDialog }: any = useContext(global_context);

    const params = useParams();
    const { toast } = useToast();

    const [videoSrc, setVideoSrc] = useState(null as string | null);
    const [saving, setSaving] = useState(false);
    const [liking, setLiking] = useState(false);
    const [following, setFollowing] = useState(false);

    const [videoSeekLimit, setVideoSeekLimit] = useState(null);

    const [videoCurrentTime, setVideoCurrentTime] = useState(
      null as unknown as string | number
    );

    const { mutate } = useSWRConfig();

    // fetch course lessons
    const {
      data,
      isValidating,
      isLoading: lessonsIsLoading,
      mutate: mutateLessons,
    } = useSWRInfinite(
      (index) =>
        routes.courseRoutes.courseLessons(courseDetails?.id, index + 1),
      (url) =>
        nextFetcher({
          url,
          method: "POST",
          useToken: true,
        }),
      { revalidateOnFocus: false }
    );
    const lessons = flatten(map(data, "data"));

    useEffect(() => {
      setSelectedLesson(find(lessons, { id: Number(selectedLesson?.id) }));
    }, [isValidating]);

    // fetch lessonContents when selectedLesson is available
    // const { data: video, isLoading: videoLoading } = useSWR(
    //   selectedLesson?.id || lessons?.[0]?.id
    //     ? routes.lessonRoutes.contents(
    //         selectedLesson?.id || lessons?.[0]?.id,
    //         "video_topic"
    //       )
    //     : null,
    //   fetcher,
    //   { revalidateOnFocus: false }
    // );

    const { data: video, isLoading: videoLoading } = useSWR(
      selectedLesson?.id || lessons?.[0]?.id
        ? routes.lessonRoutes.contents(
            selectedLesson?.id || lessons?.[0]?.id,
            "video_topic"
          )
        : null,
      (url) =>
        nextFetcher({
          url,
          useToken: true,
        }),
      { revalidateOnFocus: false }
    );

    const viewLesson = async (id: any) => {
      try {
        const res = await nextFetcher({
          url: routes.lessonRoutes.view(id),
          method: "POST",
          useToken: true,
        });
      } catch (e) {
        console.error(e);
      }
    };
    useEffect(() => {
      setVideoSrc(video?.data?.[0]?.file);
      setHaveSubtitle(video?.data?.[0]?.extra?.have_subtitle || false);
      setSubtitle(video?.data?.[0]?.subtitle?.replace(".vtt", ".srt") || null);
    }, [video]);

    const { data: session }: any = useSession();

    const SaveLesson = async () => {
      try {
        setSaving(true);
        const res = await nextFetcher({
          url: routes.lessonRoutes.save(selectedLesson?.id),
          method: "POST",
          useToken: true,
        });
        if (res?.success) {
          mutateLessons();
        }
      } catch (e) {
        console.error(e);
      } finally {
        setSaving(false);
      }
    };

    const UnSaveLesson = async () => {
      try {
        setSaving(true);
        const res = await nextFetcher({
          url: routes.lessonRoutes.unsave(selectedLesson?.id),
          method: "POST",
          useToken: true,
        });
        if (res?.success) {
          mutateLessons();
        }
      } catch (e) {
        console.error(e);
      } finally {
        setSaving(false);
      }
    };

    const LikeLesson = async () => {
      try {
        setLiking(true);
        const res = await nextFetcher({
          url: routes.lessonRoutes.like(selectedLesson?.id),
          method: "POST",
          useToken: true,
        });
        if (res?.success) {
          mutateLessons();
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLiking(false);
      }
    };

    const UnLikeLesson = async () => {
      try {
        setLiking(true);
        const res = await nextFetcher({
          url: routes.lessonRoutes.unlike(selectedLesson?.id),
          method: "POST",
          useToken: true,
        });
        if (res?.success) {
          mutateLessons();
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLiking(false);
      }
    };

    const Follow = async (id: string) => {
      try {
        setFollowing(true);
        const res = await nextFetcher({
          url: routes.userRoutes.follow,
          method: "POST",
          body: { user_id: id },
          useToken: true,
        });
        if (res?.success) {
          await mutate(routes.courseRoutes.detail(params.id));
          toast({
            variant: "success",
            title: res.msg,
          });
        }
      } catch (e) {
        console.error(e);
      } finally {
        setFollowing(false);
      }
    };

    const UnFollow = async (id: string) => {
      try {
        setFollowing(true);
        const res = await nextFetcher({
          url: routes.userRoutes.unFollow,
          method: "POST",
          body: { user_id: id },
          useToken: true,
        });
        if (res?.success) {
          await mutate(routes.courseRoutes.detail(params.id));
        }
      } catch (e) {
        console.error(e);
      } finally {
        setFollowing(false);
      }
    };

    // const debouncedCurrentState = debounce((newState) => {
    //   setCurrentTime(newState);
    // }, 1000);
    useEffect(() => {
      const interval = setInterval(() => {
        if (ref && ref?.current && "currentTime" in ref.current) {
          setCurrentTime(ref?.current?.currentTime);
        }
      }, 100);

      return () => clearInterval(interval);
    }, []);

    return (
      <section className='overflow-hidden' id='player'>
        <div className={`rounded-xl bg-white p-3 transition-all`}>
          {/* Video player */}
          {lessonsIsLoading || videoLoading || !lessons ? (
            <Skeleton className='aspect-video w-full bg-slate-900' />
          ) : videoSrc ? (
            <>
              {session?.token ? (
                <VideoPlayer
                  maxSeekTime={videoSeekLimit}
                  // onPlay={handleVideoPlay}
                  ref={ref}
                  autoplay={autoplay}
                  src={videoSrc}
                  // currentTime={videoCurrentTime}
                  transcript={haveSubtitle ? subtitle : null}
                  // onTimeUpdate={({ currentTime }: any) => debouncedCurrentState(currentTime)}
                  // onTimeUpdate={({ currentTime }: any) => {
                  //   const roundedCurrentTime = Math.floor(currentTime);
                  //   debouncedCurrentState(currentTime);
                  //   setVideoCurrentTime(roundedCurrentTime);
                  // }}
                  className='overflow-hidden rounded-xl'
                  currentTime={currentTimeBeforeAdStart}
                />
              ) : (
                <Card className='flex aspect-video flex-col items-center justify-center bg-slate-950 px-4 text-white sm:px-20'>
                  <div>
                    <div className='mb-2'>
                      <h1 className='text-xs sm:text-xl'>
                        برای مشاهده ویدیو‌ها، ابتدا باید وارد سامانه شوید.
                      </h1>
                      {/* <p>
                        چرا ورود اجباری است:{" "}
                        <Link href='#' className='text-sky-500 hover:underline'>
                          مطالعه بیشتر
                        </Link>
                      </p> */}
                    </div>
                    <Button
                      className='text-xs font-medium sm:px-6 sm:text-lg'
                      size='sm'
                      onClick={() => setSignupDialog(true)}
                    >
                      ورود/ثبت‌نام
                    </Button>
                  </div>
                </Card>
              )}
            </>
          ) : (
            <div className='flex aspect-video w-full flex-col items-center justify-center rounded-lg bg-secondary sm:col-span-full'>
              <Image
                src={FormattingVideoImg}
                alt='Formatting video'
                width={200}
                height={200}
              />
              <p>ویدئو درحال پردازش است، لطفا شکیبا باشید.</p>
            </div>
          )}

          <div className='flex items-end justify-between p-2 md:items-start'>
            {/* Teacher and class info */}
            <div className='flex w-full items-center gap-2'>
              <Link href={`/profile/${courseDetails?.teacher?.id}`}>
                <Avatar className='h-8 w-8 border-b-2 border-amber-500 text-base text-muted-foreground md:h-16 md:w-16'>
                  <AvatarImage
                    src={courseDetails?.teacher?.image || UserNoImageIcon}
                  ></AvatarImage>

                  <AvatarFallback>
                    <Image
                      src={UserNoImageIcon}
                      width={20}
                      height={20}
                      alt=''
                      className='h-full w-full'
                    />
                    <div className='absolute bottom-0 mb-2'>
                      {courseDetails?.teacher?.first_name
                        ? courseDetails?.teacher?.first_name
                            .charAt(0)
                            .toUpperCase()
                        : null}
                      ‌.
                      {courseDetails?.teacher?.last_name
                        ? courseDetails?.teacher?.last_name
                            .charAt(0)
                            .toUpperCase()
                        : null}
                    </div>
                  </AvatarFallback>
                </Avatar>
              </Link>

              <div className='flex w-full flex-col gap-1 text-sm md:text-base'>
                <div className='flex w-full items-center gap-x-2'>
                  {courseDetails ? (
                    <h1 className='text-center text-sm font-extrabold text-blue-600 md:text-start md:text-xl md:font-bold'>
                      {courseDetails?.name}
                    </h1>
                  ) : (
                    <Skeleton className='h-4 w-1/3' />
                  )}

                  <Separator
                    orientation='vertical'
                    className='h-5 bg-muted-foreground'
                  />

                  <p className='text-sm md:text-lg'>{selectedLesson?.name}</p>
                </div>

                <div className='flex items-center gap-x-2'>
                  {courseDetails?.section == "field_introducer" ? (
                    <>
                      {courseDetails?.introducers ? (
                        <p className='text-xs md:text-base'>
                          <span className='font-medium'>معرفی کنندگان:</span>{" "}
                          <span>{courseDetails?.introducers}</span>
                        </p>
                      ) : null}
                    </>
                  ) : (
                    <p className='text-xs md:text-base'>
                      <span className='font-medium'>مدرس:</span>{" "}
                      <span>{courseDetails?.teacher?.name}</span>
                    </p>
                  )}
                  {session?.user &&
                  session?.user?.id !== courseDetails?.teacher?.id ? (
                    <Button
                      className='flex h-6 gap-2 rounded-sm bg-blue-400 text-xs hover:bg-blue-500 md:h-max md:rounded md:py-2 md:text-base'
                      type='button'
                      size='sm'
                      onClick={() =>
                        courseDetails?.teacher?.stats?.is_followed
                          ? UnFollow(courseDetails?.teacher?.id)
                          : Follow(courseDetails?.teacher?.id)
                      }
                    >
                      {courseDetails?.teacher?.stats?.is_followed ? (
                        <>
                          {following ? (
                            <Loader2 className='h-5 w-5 animate-spin' />
                          ) : (
                            <UserMinus2 />
                          )}
                          <span>دنبال شده</span>
                        </>
                      ) : (
                        <>
                          {following ? (
                            <Loader2 className='h-5 w-5 animate-spin' />
                          ) : (
                            <UserPlus2 />
                          )}
                          <span>دنبال کنید</span>
                        </>
                      )}
                    </Button>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Actions buttons */}
            <div className='flex items-center gap-x-2'>
              {session?.user?.id === courseDetails?.teacher?.id ? (
                <ActionButton
                  icon={
                    <Edit className='h-4 w-4 stroke-1.5 text-blue-400 sm:h-auto sm:w-auto' />
                  }
                  link={`/studio/class/${courseDetails?.id}/details`}
                  tooltip='ویرایش'
                />
              ) : null}

              {haveSubtitle ? (
                <ActionButton
                  icon={<ListOrdered className='stroke-1.5 text-blue-400' />}
                  onClick={() => setShowTranscript(!showTranscript)}
                  tooltip='رونوشت'
                />
              ) : null}

              <ActionButton
                icon={
                  liking ? (
                    <Loader2 className='h-5 w-5 animate-spin text-blue-400' />
                  ) : (
                    <Heart
                      className={`stroke-1.5 text-blue-400 ${
                        selectedLesson?.stats?.is_liked ? "fill-current" : ""
                      }`}
                    />
                  )
                }
                onClick={() =>
                  selectedLesson?.stats?.is_liked
                    ? UnLikeLesson()
                    : LikeLesson()
                }
                tooltip='پسندیدن'
                loading={liking}
              />

              <ActionButton
                icon={
                  saving ? (
                    <Loader2 className='h-5 w-5 animate-spin text-blue-400' />
                  ) : (
                    <Bookmark
                      className={`stroke-1.5 text-blue-400 ${
                        selectedLesson?.stats?.is_saved ? "fill-current" : ""
                      }`}
                    />
                  )
                }
                onClick={() =>
                  selectedLesson?.stats?.is_saved
                    ? UnSaveLesson()
                    : SaveLesson()
                }
                tooltip='ذخیره'
                loading={saving}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
);

Player.displayName = "Player";
export default Player;
