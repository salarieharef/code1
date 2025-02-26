import localFont from "next/font/local";

const IranSans = localFont({
  src: [
    {
      path: "../../static/fonts/IranSans/IranSans-Thin.woff2",
      weight: "200",
      style: "thin",
    },
    {
      path: "../../static/fonts/IranSans/IranSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../static/fonts/IranSans/IranSans-DemiBold.woff2",
      weight: "500",
      style: "medium",
    },
    {
      path: "../../static/fonts/IranSans/IranSans-Bold.woff2",
      weight: "600",
      style: "bold",
    },
    {
      path: "../../static/fonts/IranSans/IranSans-ExtraBold.woff2",
      weight: "700",
      style: "extrabold",
    },
    {
      path: "../../static/fonts/IranSans/IranSans-Black.woff2",
      weight: "800",
      style: "black",
    },
  ],
});

const Fonts = { IranSans };
export default Fonts;
