import '../../../css/portfolio-item.css';
import { PortfolioMiddleList } from "@/components/Portfolio/Portfolio";
import { PortfolioItemContent } from "@/components/PortfolioItemContent/PortfolioItemContent";
import Footer from "@/components/shared/footer/Footer";
import { fetchFromStrapi } from "@/lib/strapi";

export default async function PortfolioDetailPage({ params }: {params: Promise<{ slug: string }> }) {

    const { slug } = await params;

        let portfolioDetailData = null,
        portfolioData = null;
    
        try {
            const [
                portfolioRes,
                portfolioDetailRes
            ] = await Promise.all([
                fetchFromStrapi('portfolios'),
                fetchFromStrapi(`portfolios?filters[key][$eq]=${slug}`),
            ]);
            portfolioData = portfolioRes.data;
            portfolioDetailData = portfolioDetailRes.data;
    
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
        <PortfolioMiddleList portfolio={portfolioData}/>
        </div>
        <div className="portfolio-item-footer">
      <Footer/>
        </div>
    </div>   
    </>
  );
}