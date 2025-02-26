import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCroppedImg } from "@/utils/cropped-utils";
import { useEffect, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import { useFormContext } from "react-hook-form";
import Modal from "./Modal";

interface ImageCropProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  imageURL: File | null;
  setCroppedImage: (image: Blob) => void;
  size: string;
  setSize: (size: string) => void;
  sizeOptions: Array<{ value: string; label: string }>;
  aspectRatio: number;
  className?: string;
}

interface CroppedArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const ImageCrop = ({
  isOpen,
  setIsOpen,
  imageURL,
  setCroppedImage,
  size,
  setSize,
  sizeOptions,
  aspectRatio,
  className,
}: ImageCropProps) => {
  const form = useFormContext();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] =
    useState<CroppedArea | null>(null);
  const [objectUrl, setObjectUrl] = useState<string>("");

  const onCropComplete = async (
    croppedArea: CroppedArea,
    croppedAreaPixels: CroppedArea
  ) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  useEffect(() => {
    if (imageURL) {
      const url = URL.createObjectURL(imageURL);
      setObjectUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [imageURL]);

  const handleCropImage = async () => {
    if (!croppedAreaPixels || !objectUrl) {
      console.warn("Missing required cropping data");
      return;
    }

    try {
      const croppedImage = await getCroppedImg(objectUrl, croppedAreaPixels);

      if (!croppedImage) {
        throw new Error("Failed to crop image");
      }

      setCroppedImage(croppedImage);
      if (form) {
        form.setValue("file", croppedImage);
      }
      setIsOpen(false);
    } catch (error) {
      console.error("Error cropping image:", error);
      // You might want to add proper error handling here
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      handleCrop={handleCropImage}
      className={className}
    >
      <div className='absolute left-1.5 top-1 my-1 flex items-center justify-start'>
        <Select dir='rtl' value={size} onValueChange={setSize}>
          <SelectTrigger className='h-7 w-max gap-1 rounded-md border-0 bg-primary px-2.5 text-primary-foreground focus:ring-0 focus:ring-offset-0'>
            <SelectValue className='py-0.5' placeholder='انتخاب سایز'>
              {sizeOptions?.find((option) => option.value === size)?.label}
            </SelectValue>
          </SelectTrigger>
          <SelectContent position='popper'>
            {sizeOptions?.map((sizeOption, i) => (
              <SelectItem value={sizeOption.value} key={i}>
                {sizeOption.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className='relative h-[300px] w-full md:h-[450px]'>
        <div className='absolute inset-0'>
          <Cropper
            image={objectUrl}
            crop={crop}
            zoom={zoom}
            aspect={aspectRatio}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
      </div>
    </Modal>
  );
};
