import React, { FC } from "react";
import MatomoTracker from "./../components/Matomo/MatomoTracker";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <>
      <MatomoTracker />
      {/* <SomeProvider> */}
      {children}
      {/* </SomeProvider> */}
    </>
  );
};

export default Providers;

"use client";

import { SessionProvider } from "next-auth/react";

type Props = {
  children?: React.ReactNode;
};

export const NextAuthProvider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};