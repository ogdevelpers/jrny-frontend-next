export const runtime = 'edge';
import { AboutUsContent } from "@/components/AboutUsContent/AboutsUsContent";
import { fetchFromStrapi } from "@/lib/strapi";

export default async function AboutUs() {

  let contentData= null;
  let contactUsData = null;

  const populate = [
		'tags',
    'about_us_texts',
    'ShowReelPlayButton',
    'teams',
	];

  const contactUsPopulate = [
        'Form',
        'Form.locations',
        'Form.services',
    ]

  const populateCommon = `populate=*`;

   const urlParams = new URLSearchParams();
	populate.forEach((value, index) => {
		urlParams.append(`populate[${index}]`, value);
	});

  const urlParamsContactUs = new URLSearchParams();
    contactUsPopulate.forEach((value, index) => {
        urlParamsContactUs.append(`populate[${index}]`, value);
    })

  try {
    const [contentRes, contactUsResp] =await Promise.all([
          fetchFromStrapi(`about-us-page?${urlParams.toString()}`),
          fetchFromStrapi(`contact?${urlParamsContactUs.toString()}`),
        ]);
    contentData = contentRes.data;
    contactUsData = contactUsResp.data;
  } catch (error){
    console.error('Error fetching data:', error);
  }
 
  return (
    <div className="about-us-container">
      <AboutUsContent content={contentData} contactUs={contactUsData} />
    </div>
  )
}
