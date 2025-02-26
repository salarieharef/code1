import Script from "next/script";

import "@/styles/index.css";

// Component imports
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import MobileNavBar from "@/components/layout/MobileNavBar";
import ProgressBar from "@/components/layout/ProgressBar";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Context imports
import SessionProvider from "@/context/SessionProvider";
import GlobalContextProvider from "@/context/global";

// Lib imports
import Fonts from "@/constant/global/fonts";
import MetaData from "@/constant/global/metadata";
import { cn } from "@/utils/cn";
import { CartProvider } from "@/context/CartProvider";
import WelcomeModal from "@/components/global/welcome/welcome-modal";

export const metadata = MetaData.defaultMetadata;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' dir='rtl'>
      <body
        className={cn(
          Fonts.IranSans.className,
          "bg-slate-50 dark:bg-slate-950"
        )}
      >
        <Providers>
          <PageLayout>{children}</PageLayout>
          <Toaster />
          <ProgressBar
            height='2px'
            color='#60a5fa'
            options={{ showSpinner: false }}
            shallowRouting
          />
        </Providers>
      </body>
    </html>
  );
}

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider basePath='/api/auth'>
      <CartProvider>
        <TooltipProvider delayDuration={800} skipDelayDuration={500}>
          <GlobalContextProvider>{children}</GlobalContextProvider>
        </TooltipProvider>
      </CartProvider>
    </SessionProvider>
  );
}

function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <WelcomeModal />
      <div className='min-h-screen'>{children}</div>
      <Footer />
      <MobileNavBar />
    </>
  );
}
