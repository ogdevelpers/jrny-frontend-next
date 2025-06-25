export const runtime = 'edge';
import { PortfolioContent } from '@/components/Portfolio/Portfolio';
import { fetchFromStrapi } from '@/lib/strapi';
import { extractPortfolioContent } from '@/utils/process.util';

export default async function Portfolio({ searchParams }: {searchParams: Promise<{ location: string }> }) {
    let contentData = null;
    let contactUsData = null;

   const { location } = await searchParams;

    const populate = [
	'brand_logos',
    'portfolios',
    'portfolios.thumbnail',
    'portfolios.categories'
	];

    const contactUsPopulate = [
        'Form',
        'Form.locations',
        'Form.services',
    ]

    const urlParamsContactUs = new URLSearchParams();
    contactUsPopulate.forEach((value, index) => {
        urlParamsContactUs.append(`populate[${index}]`, value);
    })

  const populateCommon = `populate=*`;

  const urlParams = new URLSearchParams();
	populate.forEach((value, index) => {
		urlParams.append(`populate[${index}]`, value);
	});

    try {
        const [
            contentRes,
            contactUsResp,
        ] = await Promise.all([
            fetchFromStrapi(`portfolio-page?${urlParams.toString()}`),
            fetchFromStrapi(`contact?${urlParamsContactUs.toString()}`),
        ]);

        contentData = contentRes.data;
        contactUsData = contactUsResp.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }

    const extractedData = extractPortfolioContent(contentData);

    let filteredPortfolios = extractedData?.portfolios;

    if (location) {
        filteredPortfolios = filteredPortfolios.filter((item: any) =>
            item?.Location?.toLowerCase() === location
        )
    }

    return (
        <>
            <div className="portfolio-container">
                <PortfolioContent content={{ ...extractedData, portfolios: filteredPortfolios }} contactUs={contactUsData}  />
            </div>
        </>
    );
}