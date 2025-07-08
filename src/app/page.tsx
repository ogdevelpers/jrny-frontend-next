export const runtime = 'edge';
import LandingPageContent from "@/components/LandingPageContent/LandingPageContent";
import { fetchFromStrapi } from "@/lib/strapi";
import LoaderWrapper from "./LoaderComponent";
import { extractContent } from "@/utils/process.util";

export default async function LandingPage() { 
  let homeData = null;

  let contactUsData = null;

   const contactUsPopulate = [
        'Form',
        'Form.locations',
        'Form.services',
    ]

    const urlParamsContactUs = new URLSearchParams();
    contactUsPopulate.forEach((value, index) => {
        urlParamsContactUs.append(`populate[${index}]`, value);
    })


  const populate = [
		'Hero',
    'Hero.Background_Image_Left',
    'Hero.Background_Image_Right',
    'Hero.ShowReelVideoLink',
    'Service.services',
    'Form.services',
    'Form.locations',
    'Partner.brands',
    'Portfolio.portfolios',
    'Why_Jrny.jrnies',
    'Testimonial.testimonials',
    'About'
	];

  const populateCommon = `populate=*`;

  const urlParams = new URLSearchParams();
	populate.forEach((value, index) => {
		urlParams.append(`populate[${index}]`, value);
	});

  try {
    const [homeRespData,
      contactUsResp,
    ] = await Promise.all([
      fetchFromStrapi(`home?${urlParams.toString()}`),
      fetchFromStrapi(`contact?${urlParamsContactUs.toString()}`),
    ]);

    homeData = homeRespData.data;
    contactUsData = contactUsResp.data;

  } catch (error) {
    console.error('Error fetching data:', error);
  }
  const extractedData = extractContent(homeData);

  return (
    <LoaderWrapper>
      <LandingPageContent 
        content={extractedData}
        footer={contactUsData}
      /> 
    </LoaderWrapper>
  )
}