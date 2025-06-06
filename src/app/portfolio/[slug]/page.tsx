export const runtime = 'edge';
import PortfolioList from '@/components/Portfolio/PortfolioList';
import '../../../css/portfolio-item.css';
import { PortfolioItemContent } from "@/components/PortfolioItemContent/PortfolioItemContent";
import Footer from "@/components/shared/footer/Footer";
import { fetchFromStrapi } from "@/lib/strapi"; 
import getPortfolioSidebarTabs from '@/utils/portfolioSidebarTabs.util';
export default async function PortfolioDetailPage({ params }: {params: Promise<{ slug: string }> }) {

    const { slug } = await params;

        let portfolioDetailData = null,
        portfolioData = null,
        sidebarTabs: string[] = [];
    
        try {
            const [
                portfolioRes,
                portfolioDetailRes
            ] = await Promise.all([
                fetchFromStrapi('portfolios?populate=categories'),
                fetchFromStrapi(`portfolios?filters[key][$eq]=${slug}`),
            ]);
            portfolioData = portfolioRes.data;
            portfolioDetailData = portfolioDetailRes.data;
            sidebarTabs = getPortfolioSidebarTabs(portfolioData);
    
        } catch (error) {
            console.error('Error fetching data:', error);
        }
  
  return (
    <>
      <div className="portfolio-item-container">
        <div className="portfolio-item-hero-container">
            <PortfolioItemContent portfolioDetailData={portfolioDetailData}/>
        </div>

        <div className="portfolio-item-middle-list">
            <span className="might-like">Project <span className="jrny-span"> you might Like!  </span></span>
        <PortfolioList portfolio={portfolioData} sidebarTabs={sidebarTabs}/>
        </div>
        <div className="portfolio-item-footer">
      <Footer/>
        </div>
    </div>   
    </>
  );
}