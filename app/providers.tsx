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
