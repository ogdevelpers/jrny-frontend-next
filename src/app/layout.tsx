import "./globals.css";
import ChatUs from "../components/ChatUs/ChatUs";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import Header from "@/components/Header/Header";
import { fetchFromStrapi } from "@/lib/strapi";
import CMSContextProvider from "@/components/Context/CMSContextProvider";

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
