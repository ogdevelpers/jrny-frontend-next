import './globals.css';
import { Logo } from '@/components/shared/navbar/Logo';
import { NavBar } from '@/components/shared/navbar/Navbar';
import ChatUs from '../components/ChatUs/ChatUs';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop'; 
import MobileNavBar from '@/components/shared/navbar/MobileNavbar';

export const metadata = {
  title: 'Your App',
  description: 'Your app description',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* <SmoothWrapper> */}
          <div className="pinMe" id="smooth-wrapper">
            <header className="header">
              <div className="logo-div">
                <Logo />
              </div>
              <div className="navbar-div">
                <NavBar /> 
              </div>
              <div className="mobile-navbar-div">
                <MobileNavBar />
              </div>
            </header>
 

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
