export const runtime = 'edge';
import PortfolioList from '@/components/Portfolio/PortfolioList';
import '../../../css/portfolio-item.css';
import { PortfolioItemContent } from "@/components/PortfolioItemContent/PortfolioItemContent";
import Footer from "@/components/shared/footer/Footer";
import { fetchFromStrapi } from "@/lib/strapi";
import getPortfolioSidebarTabs from '@/utils/portfolioSidebarTabs.util';
import { extractPortfolioContent, extractPortfolioDetailData } from '@/utils/process.util';
export default async function PortfolioDetailPage({ params }: { params: Promise<{ slug: string }> }) {

    const { slug } = await params;
    const populate = [
	'brand_logos',
    'portfolios',
    'portfolios.thumbnail',
    'portfolios.categories'
	];

    let portfolioDetailData = null,
        portfolioData = null,
        contentData = null,
        sidebarTabs: string[] = [];

    let contactUsData = null;

    const populatePortfolios = [
        'thumbnail',
        'categories',
    ];

    const populateCommon = `populate=*`;
    const urlParams = new URLSearchParams();
	populate.forEach((value, index) => {
		urlParams.append(`populate[${index}]`, value);
	});

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
            contentRes,
            portfolioDetailRes,
            contactUsResp,
        ] = await Promise.all([
            fetchFromStrapi(`portfolio-page?${urlParams.toString()}`),
            fetchFromStrapi(`portfolios?${urlParamsPortfolios.toString()}&filters[key][$eq]=${slug}`),
            fetchFromStrapi(`contact?${urlParamsContactUs.toString()}`),
        ]);
        contentData = contentRes.data;
        portfolioDetailData = portfolioDetailRes.data;
        contactUsData = contactUsResp.data;

    } catch (error) {
        console.error('Error fetching data:', error);
    }

    const extractListData = extractPortfolioContent(contentData);
    sidebarTabs = getPortfolioSidebarTabs(extractListData?.portfolios);
    portfolioData = extractListData?.portfolios;
    

    // This is left untouched
    const extractedData = extractPortfolioDetailData(portfolioDetailData[0]);
    return (
        <>
            <div className="portfolio-item-container">
                <div className="portfolio-item-hero-container">
                    <PortfolioItemContent portfolioDetailData={extractedData} />
                </div>

                <div className="portfolio-item-middle-list">
                    <span className="might-like">Project <span className="jrny-span"> you might Like!  </span></span>
                    <PortfolioList portfolio={portfolioData} sidebarTabs={sidebarTabs} />
                </div>
                <div className="portfolio-item-footer">
                    <Footer content={contactUsData} />
                </div>
            </div>
        </>
    );
}