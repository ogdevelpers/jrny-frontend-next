import LandingPageContent from "@/components/LandingPageContent/LandingPageContent";
import { fetchFromStrapi } from "@/lib/strapi";

export default async function LandingPage() { 
  let contentData = null; 
  let portfolioData = null; 
  let brandLogos = null; 
  let testimonialData = null;

  try {
    const [contentRes,
      portfolioRes,
      brandLogoRes,
      testimonialRes
    ] = await Promise.all([
      fetchFromStrapi('contents'),
      fetchFromStrapi('portfolios'),
      fetchFromStrapi('brand-logos'),
      fetchFromStrapi('testimonials'),
    ]);

    contentData = contentRes.data;
    portfolioData = portfolioRes.data;
    brandLogos = brandLogoRes.data;
    testimonialData = testimonialRes.data;

  } catch (error) {
    console.error('Error fetching data:', error);
    
  }

  return (
    <>
    <LandingPageContent content={contentData} portfolio={portfolioData} 
      brandLogos={brandLogos} testimonial={testimonialData}
    /> 
    </>
  )
}