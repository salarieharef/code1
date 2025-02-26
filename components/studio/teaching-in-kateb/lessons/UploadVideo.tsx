import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import UploadFile from "../upload-file";
import { find } from "lodash-es";
import { uploadVideo } from "@/utils/functions/lesson/lesssonOperations.function";

import UploadVideoIcon from "@/static/icons/upload-video.svg?url";

const UploadVideoComponent = ({
  selectedLesson,
  name = `upload_video.${selectedLesson?.id}`,
  onUploadSuccess,
}: any) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const form = useFormContext();

  const handleUpload = async () => {
    const file = form.watch(name);
    if (!file) return;

    await uploadVideo({
      file,
      lessonId: selectedLesson?.id,
      onUploadProgress: (percentage) => setUploadProgress(percentage),
      resetFields: () => {
        form.resetField("name");
        form.resetField("description");
        form.resetField("image");
        form.resetField("file");
        setUploadProgress(0);
      },
      setLoading,
      onError: () => {
        setUploadProgress(0);
      },
    });
    onUploadSuccess();
  };

  useEffect(() => {
    form.setValue(
      name,
      find(selectedLesson?.contents, { type: "video_topic" })?.file
    );
  }, [selectedLesson]);

  return (
    <div>
      <UploadFile
        textButton={
          <p className='md:text-md my-1 text-sm font-medium leading-6 text-slate-800'>
            <span className='text-blue-500'>کلیک کنید</span> یا فایل های ویدیویی
            را برای آپلود بکشید و رها کنید.
          </p>
        }
        name={name}
        form={form}
        type='video'
        placeholder='کلیک کنید یا فایل های ویدیویی را برای آپلود بکشید و رها کنید.'
        wrapperClassName='mt-0 p-0 px-0 sm:mt-0 sm:px-0 border-none shadow-none space-y-0'
        filedClassName='md:p-0 p-0 space-y-0'
        cardClassName='md:p-0 p-0'
        noFillClassName='w-full md:w-full h-full aspect-video space-y-0 flex justify-center items-center'
        IconUploadVideo={
          <Image
            src={UploadVideoIcon}
            alt='icon'
            width={100}
            height={100}
            className='h-12 w-12'
          />
        }
        styleDescription='text-right text-sm text-slate-400 w-full leading-6'
      />
      <div className='mt-2 flex justify-center'>
        <Button
          className='w-max px-6'
          type='submit'
          disabled={loading}
          name='Verify'
          size='sm'
          onClick={handleUpload}
        >
          {loading ? <Loader2 className='ml-2 h-4 w-4 animate-spin' /> : null}
          آپلود ویدئو
        </Button>
      </div>
      {uploadProgress > 0 && (
        <div className='flex w-full flex-col items-center justify-center'>
          <div className='mt-4 flex w-full items-center justify-center gap-4'>
            <span>{uploadProgress}%</span>
            <Progress value={uploadProgress} className='w-1/2' />
          </div>
          <span>
            درحال آپلود ویدئو شما هستیم. لطفا تا اتمام آپلود از صفحه خارج نشوید.
          </span>
        </div>
      )}
    </div>
  );
};

export default UploadVideoComponent;
