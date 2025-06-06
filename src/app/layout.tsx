import './globals.css'; ;
import ChatUs from '../components/ChatUs/ChatUs';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';  
import Header from '@/components/Header/Header';

export const metadata = {
  title: 'JRNY',
  description: 'JRNY Experimental',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* <SmoothWrapper> */}
          <div className="pinMe" id="smooth-wrapper">
          <Header/>
 

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
