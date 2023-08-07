import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "./Layout";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <div className="container">
        <Component {...pageProps} />
      </div>
    </Layout>
  );
}
export default MyApp;
