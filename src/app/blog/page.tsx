export const runtime = 'edge';
import { BlogHero } from "@/components/Blogs/Blogs";
import Footer from "@/components/shared/footer/Footer";
import { fetchFromStrapi } from "@/lib/strapi";
import "../../css/blog.css";

export default async function Blogs() {
  let blogsData = null;
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

  const populateCommon = `populate=*`;

  try {
    const [blogsRes,
      contactUsResp,
    ] = await Promise.all([
      fetchFromStrapi('blogs?populate=*'),
      fetchFromStrapi(`contact?${urlParamsContactUs.toString()}`),
    ]);
    blogsData = blogsRes.data;
    contactUsData = contactUsResp.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  const transformBlogs = (data: any) => {
    return data.map((item: any) => ({
      title: item.title,
      shortDescription: item.shortDescription,
      description: item.description,
      thumbnailUrl: item.thumbnail?.[0]?.formats?.thumbnail?.url
        ? `${item.thumbnail[0].formats?.thumbnail?.url}`
        : null,
      bgImageUrl: item.bgImage?.url
        ? `${item.bgImage.url}`
        : null,
      categories: item.categoriesses?.map((cat: any) => cat.name) || [],
      slug: item.slug
    }));
  };

  const data = transformBlogs(blogsData);

  return (
    <>
      <div className="blog-container">
        <BlogHero blogsData={data} />
        <Footer content={contactUsData}/>
      </div>
    </>
  );
}