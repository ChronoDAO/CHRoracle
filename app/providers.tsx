"use client";
import React, { useEffect } from "react";
import { init } from "@socialgouv/matomo-next";

const MATOMO_URL = process.env.NEXT_PUBLIC_MATOMO_URL || "";
const MATOMO_SITE_ID = process.env.NEXT_PUBLIC_MATOMO_SITE_ID || "";

type MyProps = {
  children?: React.ReactNode;
};

function MyAppProvider({ children }: MyProps) {
  useEffect(() => {
    if (MATOMO_URL && MATOMO_SITE_ID) {
      init({ url: MATOMO_URL, siteId: MATOMO_SITE_ID });
    }
  }, []);

  return <>{children}</>;
}

export default MyAppProvider;
