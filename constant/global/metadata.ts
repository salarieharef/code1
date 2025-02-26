import type { Metadata } from "next";

const defaultMetadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || ""),
  title: {
    default: "کاتب",
    template: "%s | کاتب",
  },
  description: "سایت کاتب",
};

const MetaData = { defaultMetadata };

export default MetaData;
