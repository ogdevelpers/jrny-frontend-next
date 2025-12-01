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
        <Script id="gtm-init" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MXMLQB9B');`}
        </Script>
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
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MXMLQB9B"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
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
