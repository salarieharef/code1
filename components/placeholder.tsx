"use client";

import Image from "next/image";
import { useState } from "react";

const Placeholder = () => {
  const [loading, setLoading] = useState(false);

  const src =
    "https://hamito.me/api/v1/serve?version=v2&folder=course&pk=92&name=92-image.webp";

  const loadingPlaceholder =
    "https://hamito.me/api/v1/serve?version=v2&folder=course&pk=92&name=92-image.webp&w=100&h=100&blur=50";

  return (
    <Image
      src={loading ? loadingPlaceholder : src}
      alt='testing'
      width={500}
      height={500}
      onError={() => setLoading(true)}
      onLoadStart={() => setLoading(true)}
      onLoadingComplete={() => setLoading(false)}
    />
  );
};

export default Placeholder;
