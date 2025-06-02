import { AboutUsContent } from "@/components/AboutUsContent/AboutsUsContent";
import { fetchFromStrapi } from "@/lib/strapi";

export default async function AboutUs() {

  let contentData= null;
  let tagData = null;
  let teamData = null;

  try {
    const [contentRes, tagRes, teamRes] =await Promise.all([
          fetchFromStrapi('contents'),
          fetchFromStrapi('tags'),
          fetchFromStrapi('teams')
        ]);
    contentData = contentRes.data;
    tagData = tagRes.data;
    teamData = teamRes.data;
  } catch (error){
    console.error('Error fetching data:', error);
  }
 
  return (
    <div className="about-us-container">
      <AboutUsContent content={contentData} tag={tagData} team={teamData} />
    </div>
  )
}
