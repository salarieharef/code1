import Image from "next/image";

// Component imports
import VideoDropzone from "@/components/global/dropzone/VideoDropzone";
import { CardContent } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { WrapperOutlineText } from "./WrapperOutlineText";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

// Util imports
import { cn } from "@/utils/cn";
import { useFormContext } from "react-hook-form";
import CustomFileDropzone from "./CustomFileDropzone";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { handleDeleteContent } from "@/utils/functions/course/contentOperations.function";
import { useToast } from "@/components/ui/use-toast";
import { useSWRConfig } from "swr";
import { useParams } from "next/navigation";
import FormattingVideoImg from "@/static/images/global/formatting-video.webp";

export default function UploadFile({
  TextLabelCard,
  description,
  textButton,
  name,
  type,
  pageType,
  wrapperClassName,
  cardClassName,
  fillClassName,
  filedClassName,
  noFillClassName,
  IconUploadVideo,
  styleDescription,
  containerClassName,
  PublicCheckbox = false,
  fileType,
  progress,
  onChange,
  read_only = false,
  read_only_video = false,
  timeRemaining,
  sizeRemaining,
}: any) {
  const form = useFormContext();
  const content_id_pdf = form.watch("content_id_pdf");
  const content_id_video = form.watch("content_id_video");
  const videoUploaded = form.watch(name);

  const params = useParams();
  const courseId = params?.id || params?.classId || params?.fieldId;
  const { toast } = useToast();
  const { mutate } = useSWRConfig();

  return (
    <WrapperOutlineText
      titleBorder={TextLabelCard}
      className={cn("mt-6 px-2 sm:mt-0 sm:px-6", wrapperClassName)}
      type={pageType}
    >
      <CardContent
        className={cn(
          "border-none bg-transparent p-1 shadow-none md:p-4",
          cardClassName
        )}
      >
        <div
          className={cn(
            "flex flex-col items-center justify-center space-y-6 md:px-8",
            filedClassName
          )}
        >
          <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  {type === "video" ? (
                    <>
                      {field.value?.status == "uploaded" ||
                      field.value?.status == "in_format" ||
                      field.value?.status == "wait_for_upload" ? (
                        <div className='relative mx-auto mt-6 flex aspect-video max-w-4xl flex-col items-center justify-center border-none bg-secondary px-2 shadow-none sm:mt-0 sm:px-6'>
                          <Image
                            src={FormattingVideoImg}
                            alt='Formatting video'
                            width={200}
                            height={200}
                          />
                          <p>ویدئو درحال پردازش است، لطفا شکیبا باشید.</p>

                          {!read_only && !read_only_video ? (
                            <Button
                              onClick={() =>
                                handleDeleteContent({
                                  fileType,
                                  toast,
                                  mutate,
                                  onChange,
                                  setVideoUrl: field.onChange,
                                  value: field.value?.file || field.value,
                                  contentId: content_id_video,
                                  courseId,
                                  form,
                                  name,
                                })
                              }
                              className='absolute right-4 top-0 text-muted-foreground hover:text-slate-700'
                              type='button'
                              variant='ghost'
                              size='icon'
                            >
                              <Trash2 size={24} />
                            </Button>
                          ) : null}
                        </div>
                      ) : (
                        <VideoDropzone
                          contentsId={content_id_video}
                          fillClassName={fillClassName}
                          noFillClassName={noFillClassName}
                          name={name}
                          placeholder={textButton}
                          value={field.value?.file || field.value}
                          onChange={(file) => {
                            onChange(file);
                            field.onChange(null);
                          }}
                          IconUploadVideo={IconUploadVideo}
                          fileType={fileType}
                          progress={progress}
                          containerClassName={containerClassName}
                          read_only_video={read_only_video}
                          timeRemaining={timeRemaining}
                          sizeRemaining={sizeRemaining}
                        />
                      )}
                    </>
                  ) : (
                    <CustomFileDropzone
                      name={name}
                      placeholder='آپلود رزومه'
                      containerClassName='md:w-80 mt-6 p-0 text-primary'
                      accept={{ "application/pdf": [".pdf"], "image/*": [] }}
                      showIcon={true}
                      showPreview={true}
                      showDeleteButton={true}
                      buttonStyleDelete='absolute top-0 left-0'
                      StyleWrapperImage='max-w-80 mt-6'
                      instructionsClassName='text-primary'
                      read_only={read_only}
                    />
                  )}
                </FormControl>
                <FormMessage className='text-xs text-red-500' />
              </FormItem>
            )}
          />
          {/*//!/TODO FIX This after merge reusable checkbox in advertise  */}
          {type === "video" && videoUploaded && PublicCheckbox && !read_only ? (
            <FormField
              control={form.control}
              name={"is_introduction_video_public"}
              render={({ field }) => (
                <FormItem>
                  <div className='flex items-center gap-x-1'>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id={"is_introduction_video_public"}
                      />
                    </FormControl>
                    <Label
                      htmlFor={"is_introduction_video_public"}
                      className='text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                    >
                      مایل به نمایش ویدیو معرفی به عموم هستم.
                    </Label>
                  </div>
                  <FormMessage className='text-xs' />
                </FormItem>
              )}
            />
          ) : !read_only ? (
            <p className={cn("text-sm text-slate-400", styleDescription)}>
              {description}
            </p>
          ) : null}
        </div>
      </CardContent>
    </WrapperOutlineText>
  );
}
