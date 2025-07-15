export const runtime = 'edge';
import PortfolioList from '@/components/Portfolio/PortfolioList';
import '../../../css/portfolio-item.css';
import { PortfolioItemContent } from "@/components/PortfolioItemContent/PortfolioItemContent";
import Footer from "@/components/shared/footer/Footer";
import { fetchFromStrapi } from "@/lib/strapi"; 
import getPortfolioSidebarTabs from '@/utils/portfolioSidebarTabs.util';
import { extractPortfolioDetailData } from '@/utils/process.util';
export default async function PortfolioDetailPage({ params }: {params: Promise<{ slug: string }> }) {

    const { slug } = await params;

        let portfolioDetailData = null,
        portfolioData = null,
        sidebarTabs: string[] = [];

        let contactUsData = null;

        const populatePortfolios = [
            'thumbnail',
            'categories',
            ];

        const populateCommon = `populate=*`;

        const contactUsPopulate = [
        'Form',
        'Form.locations',
        'Form.services',
    ]

    const urlParamsContactUs = new URLSearchParams();
    contactUsPopulate.forEach((value, index) => {
        urlParamsContactUs.append(`populate[${index}]`, value);
    })

    const urlParamsPortfolios = new URLSearchParams();
    populatePortfolios.forEach((value, index) => {
        urlParamsPortfolios.append(`populate[${index}]`, value);
    })
    
        try {
            const [
                portfolioRes,
                portfolioDetailRes,
                contactUsResp,
            ] = await Promise.all([
                fetchFromStrapi('portfolios?populate=categories'),
                fetchFromStrapi(`portfolios?${urlParamsPortfolios.toString()}&filters[key][$eq]=${slug}`),
                fetchFromStrapi(`contact?${urlParamsContactUs.toString()}`),
            ]);
            portfolioData = portfolioRes.data;
            portfolioDetailData = portfolioDetailRes.data;
            sidebarTabs = getPortfolioSidebarTabs(portfolioData);
            contactUsData = contactUsResp.data;

    
        } catch (error) {
            console.error('Error fetching data:', error);
        }

        const extractedData = extractPortfolioDetailData(portfolioDetailData[0]);
  
  return (
    <>
      <div className="portfolio-item-container">
        <div className="portfolio-item-hero-container">
            <PortfolioItemContent portfolioDetailData={extractedData}/>
        </div>

        <div className="portfolio-item-middle-list">
            <span className="might-like">Project <span className="jrny-span"> you might Like!  </span></span>
        <PortfolioList portfolio={portfolioData} sidebarTabs={sidebarTabs}/>
        </div>
        <div className="portfolio-item-footer">
      <Footer content={contactUsData} />
        </div>
    </div>   
    </>
  );
}