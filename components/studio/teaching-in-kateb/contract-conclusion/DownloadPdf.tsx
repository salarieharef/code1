// SVG imports
import PdfSvg from "@/static/icons/pdf.svg";
import DownloadIcon from "@/static/icons/download.svg";

// Util imports
import { useFormContext } from "react-hook-form";
import { getImageUrlBase } from "@/utils/imageUtils";

const DownloadPdfButton = () => (
  <div className='flex h-full w-full items-center justify-between px-3'>
    <div className='flex w-full items-center justify-between gap-1 space-x-2'>
      <div className='flex w-full items-center justify-start '>
        <PdfSvg className='flex h-8 w-8 text-destructive' />
        <div className='flex flex-col'>
          <span className='text-sm font-medium text-slate-700'>فایل PDF</span>
        </div>
      </div>

      <DownloadIcon className='m-1 w-7 text-primary' />
    </div>
  </div>
);

export default function DownloadPdf({
  name = "temp_contract",
}: {
  name?: string;
}) {
  const form = useFormContext();
  const contract = form.watch(name);

  return (
    <div className='flex flex-col space-y-1'>
      {contract ? (
        <a
          href={getImageUrlBase(contract)}
          className='mx-auto mt-4 flex h-12 w-full items-center rounded-lg border  border-slate-400 text-sm text-blue-400 md:w-80'
          target='_blank'
        >
          <DownloadPdfButton />
        </a>
      ) : (
        <div className='mx-auto mt-4 flex h-12 w-full items-center rounded-lg border  border-slate-400 text-sm text-blue-400 md:w-80'>
          <DownloadPdfButton />
        </div>
      )}
      {/* <p className='py-2 text-center text-sm text-slate-400'>
        فایل قرارداد را دانلود کرده و پس امضاء الکترونیک در کادر زیر مجدداً
        بارگذاری کنید.
      </p> */}
    </div>
  );
}
