export const runtime = 'edge';
import { PortfolioContent } from '@/components/Portfolio/Portfolio';
import { fetchFromStrapi } from '@/lib/strapi';

export default async function Portfolio() {
    let contentData = null;
    let portfolioData = null;
    let brandLogoData = null;

    try {
        const [
            contentRes,
            portfolioRes,
            brandLogoRes,
        ] = await Promise.all([
            fetchFromStrapi('contents'),
            fetchFromStrapi('portfolios?populate=categories'),
            fetchFromStrapi('brand-logos')
        ]);

        contentData = contentRes.data;
        portfolioData = portfolioRes.data;
        brandLogoData = brandLogoRes.data;
 

    } catch (error) {
        console.error('Error fetching data:', error);
    }

    return (
        <>
            <div className="portfolio-container">
                < PortfolioContent content={contentData} brandLogos={brandLogoData} portfolio={portfolioData} />
            </div>
        </>
    );
}