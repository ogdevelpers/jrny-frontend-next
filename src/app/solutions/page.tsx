export const runtime = 'edge';
import OtherSolutions from "@/components/OtherSolutions/OtherSolutions";
import { fetchFromStrapi } from "@/lib/strapi";

export default async function SolutionsPage() {

  let contentData = null;
  let contactUsData = null;

//   const populate = [
//     'Solutions',
//   ];

  const contactUsPopulate = [
    'Form',
    'Form.locations',
    'Form.services',
  ];

//   const urlParams = new URLSearchParams();
//   populate.forEach((value, index) => {
//     urlParams.append(`populate[${index}]`, value);
//   });

  const urlParamsContactUs = new URLSearchParams();
  contactUsPopulate.forEach((value, index) => {
    urlParamsContactUs.append(`populate[${index}]`, value);
  });

  try {
    const [contentRes, contactUsResp] = await Promise.all([
      fetchFromStrapi(`solutions?populate=*`),
      fetchFromStrapi(`contact?${urlParamsContactUs.toString()}`),
    ]);
    contentData = contentRes.data;
    contactUsData = contactUsResp.data;
    console.log({contentData});
  } catch (error) {
    console.error('Error fetching data:', error);
  }
 
  return (
    <div className="solutions-page-container">
      <OtherSolutions content={contentData} contactUs={contactUsData} />
    </div>
  )
}
