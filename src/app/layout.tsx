export const runtime = 'edge';
import './globals.css'; ;
import ChatUs from '../components/ChatUs/ChatUs';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';  
import Header from '@/components/Header/Header';
import { fetchFromStrapi } from '@/lib/strapi';

export const metadata = {
  title: 'JRNY',
  description: 'JRNY Experimental',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let headerData = null;
  const populateCommon = `populate=*`;
  try {
      const [headerRespData
      ] = await Promise.all([
        fetchFromStrapi(`header?${populateCommon}`),
      ]);
      headerData = headerRespData.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  return (
    <html lang="en">
      <body>
        {/* <SmoothWrapper> */}
          <div className="pinMe" id="smooth-wrapper">
          <Header header={headerData}/>
 

            <div className="container" id="smooth-content">
              {children}
              <ScrollToTop />
            </div>
            <ChatUs />
          </div>
        {/* </SmoothWrapper> */}
      </body>
    </html>
  );
}
