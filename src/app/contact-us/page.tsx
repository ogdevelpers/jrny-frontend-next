export const runtime = 'edge';
import '../../css/contactus.css';
import '../../components/Contact/contact.css'
import { fetchFromStrapi } from '@/lib/strapi';
import ContactUs from '@/components/Contact/Contact-Us';

export default async function Contact() {
  let contactUsData = null;

  const contactUsPopulate = [
    'Form',
    'Form.locations',
    'Form.services',
    'socials'
  ]

  const urlParamsContactUs = new URLSearchParams();
  contactUsPopulate.forEach((value, index) => {
    urlParamsContactUs.append(`populate[${index}]`, value);
  })

   try {
      const [
        contactUsResp,
      ] = await Promise.all([
        fetchFromStrapi(`contact?${urlParamsContactUs.toString()}`),
      ]);
      contactUsData = contactUsResp.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    console.log('contactUsData', contactUsData);

    return (
      <>
      <ContactUs contents={contactUsData}/>
      </>
  )
}
