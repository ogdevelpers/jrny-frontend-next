import "./globals.css";
import ChatUs from "../components/ChatUs/ChatUs";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import Header from "@/components/Header/Header";
import { fetchFromStrapi } from "@/lib/strapi";
import CMSContextProvider from "@/components/Context/CMSContextProvider";
import Script from "next/script";

export const metadata = {
  title: "JRNY",
  description: "JRNY Experimental",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let headerData = null;
  let socialData = null;
  const populateCommon = `populate=*`;
  try {
    const [headerRespData, socialRespData] = await Promise.all([
      fetchFromStrapi(`header?${populateCommon}`),
      fetchFromStrapi(`socials?${populateCommon}`),
    ]);
    headerData = headerRespData.data;
    socialData = socialRespData.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JSZ3Q3FG1E"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JSZ3Q3FG1E');
          `}
        </Script>
      </head>
      <body>
        {/* <SmoothWrapper> */}
        <div className="pinMe" id="smooth-wrapper">
          <Header header={headerData} />

          <div className="container" id="smooth-content">
            <CMSContextProvider>{children}</CMSContextProvider>
            <ScrollToTop />
          </div>
          <ChatUs social={socialData} />
        </div>
        {/* </SmoothWrapper> */}
      </body>
    </html>
  );
}
