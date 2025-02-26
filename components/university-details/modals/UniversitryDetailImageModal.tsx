import Image from "next/image";
import { useState } from "react";

// Component imports
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { UniversityDetailImageModalCarousel } from "./UniversityDetailImageModalCarousel";

// Icon imports
import { Play, X } from "lucide-react";
import NoImageIcon from "@/static/icons/no-image.svg?url";
// import UserNoImageIcon from "@/static/icons/user-no-image.svg?url";

// Util imports
import filter from "lodash-es/filter";
import Masonry from "react-masonry-css";

interface UniversitryDetailImageModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  imageSrc?: string;
  startIndex?: number;
  data?: any;
  onStartIndexChange?: any;
}

export function UniversitryDetailImageModal({
  isOpen,
  onClose,
  startIndex,
  onStartIndexChange,
  data,
}: UniversitryDetailImageModalProps) {
  const breakpointColumnsObj = {
    default: 2, // number of columns in desktop mode
    1100: 2,
    700: 2,
    500: 1,
  };

  const [selectedFormat, setSelectedFormat] = useState("all");

  const images = filter(data?.contents, { format: "image" });
  const videos = filter(data?.contents, { format: "video" });
  const allFormats =
    selectedFormat == "videos"
      ? videos
      : selectedFormat == "images"
        ? images
        : data?.contents;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className='university-detail-image-dialog-content top-0 max-h-screen max-w-[640px] translate-y-0 overflow-y-scroll border-0 p-5 md:top-[50%] md:max-w-[720px] md:translate-y-[-50%] lg:max-w-[960px] xl:max-w-[1024px]'
      >
        {/* desktop header */}
        <DialogHeader className='hidden md:block'>
          <DialogTitle className='flex items-center justify-between gap-2'>
            <h3 className='text-lg font-medium text-blue-900'>{data?.name}</h3>
            <DialogClose>
              <X />
            </DialogClose>
          </DialogTitle>
          <Separator />
        </DialogHeader>
        {/* desktop header */}

        {/* mobile header */}
        <DialogHeader className='block bg-transparent px-2 py-1 md:hidden'>
          <DialogTitle className='flex items-center justify-between gap-2'>
            <DialogClose>
              <X className='text-white' />
            </DialogClose>
          </DialogTitle>
        </DialogHeader>
        {/* mobile header */}

        {/* desktop view */}
        <Tabs
          value={selectedFormat}
          onValueChange={setSelectedFormat}
          className='hidden md:block'
          dir='rtl'
        >
          <TabsList className='m-0 gap-2 bg-transparent p-0'>
            <TabsTrigger
              value='all'
              className='rounded-full border border-blue-400 text-blue-400 data-[state=active]:border-none data-[state=active]:bg-blue-500 data-[state=active]:text-white'
            >
              همه
            </TabsTrigger>
            <TabsTrigger
              value='images'
              className='rounded-full border border-blue-400 text-blue-400 data-[state=active]:border-none data-[state=active]:bg-blue-500 data-[state=active]:text-white'
            >
              تصاویر واحد
            </TabsTrigger>
            <TabsTrigger
              value='videos'
              className='rounded-full border border-blue-400 text-blue-400 data-[state=active]:border-none data-[state=active]:bg-blue-500 data-[state=active]:text-white'
            >
              تیزر های واحد
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value={selectedFormat}
            className='grid grid-cols-12 gap-4'
          >
            <div className='col-span-4'>
              <div className='my-3 overflow-y-auto overflow-x-hidden md:max-h-[35vh] lg:max-h-[40vh]'>
                <Masonry
                  breakpointCols={breakpointColumnsObj}
                  className='my-masonry-grid'
                  columnClassName='my-masonry-grid_column'
                >
                  {allFormats?.map((content: any, index: number) => (
                    <div
                      className='relative my-1 cursor-pointer overflow-hidden rounded-lg'
                      onClick={() =>
                        onStartIndexChange ? onStartIndexChange(index) : null
                      }
                      key={index}
                    >
                      <Image
                        src={
                          content?.format == "video"
                            ? NoImageIcon
                            : content?.file || NoImageIcon
                        }
                        alt={`test image ${index}`}
                        className='w-full object-cover'
                        width={500}
                        height={500}
                        priority
                      />
                      {content?.format == "video" ? (
                        <div className='absolute left-0 top-0 flex h-full w-full items-center justify-center bg-slate-900/10 text-white'>
                          <Play className='fill-current' />
                        </div>
                      ) : null}
                    </div>
                  ))}
                </Masonry>
              </div>
            </div>
            <div className='col-span-8'>
              {/* <div className="flex flex-row gap-1">
              <div className="flex rounded-md ml-2">
                <AvatarComponent
                  src={UserNoImageIcon}
                  fallback={"test"}
                />
              </div>
              <div className="flex flex-col justify-center items-start">
                <div className="text-sm lg:text-md font-medium">
                  {" "}
                  تست تستیان
                </div>
                <div className="text-xs font-medium text-slate-400">
                  {" "}
                  ۵ ساعت قبل
                </div>
              </div>
            </div> */}
              <div className='flex w-full flex-row'>
                <UniversityDetailImageModalCarousel
                  contents={allFormats}
                  className={`mb-2 mt-4 h-full w-full px-4 ${false ? "overflow-x-scroll" : ""}`}
                  startIndex={startIndex}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
        {/* desktop view */}

        {/* mobile view */}
        <div className='flex w-full flex-row md:hidden'>
          <UniversityDetailImageModalCarousel
            contents={allFormats}
            className={`h-full w-full ${false ? "overflow-x-scroll" : ""}`}
            startIndex={startIndex}
          />
        </div>
        {/* mobile view */}
      </DialogContent>
    </Dialog>
  );
}
