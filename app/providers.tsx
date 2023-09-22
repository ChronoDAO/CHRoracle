"use client";

import React, { FC } from "react";
import MatomoTracker from "./../components/Matomo/MatomoTracker";
import { SessionProvider } from "next-auth/react";

type Props = {
  children?: React.ReactNode;
};

export const NextAuthProvider = ({ children }: Props) => {
  return (<>
    <SessionProvider>
      <MatomoTracker />
      {children}
    </SessionProvider>;
  </>)
};