export const runtime = 'edge';
import Footer from "@/components/shared/footer/Footer";
import { fetchFromStrapi } from "@/lib/strapi";
import '../../../css/solutions-item.css';

export default async function SolutionsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    let solutionDetailData = null;
    let contactUsData = null;

    const contactUsPopulate = [
        'Form',
        'Form.locations',
        'Form.services',
    ];

    const urlParamsContactUs = new URLSearchParams();
    contactUsPopulate.forEach((value, index) => {
        urlParamsContactUs.append(`populate[${index}]`, value);
    });

    try {
        const [
            solutionDetailRes,
            contactUsResp,
        ] = await Promise.all([
            fetchFromStrapi(`solutions?filters[slug][$eq]=${slug}&populate=*`),
            fetchFromStrapi(`contact?${urlParamsContactUs.toString()}`),
        ]);
        solutionDetailData = solutionDetailRes.data;
        contactUsData = contactUsResp.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }

    const solutionData = solutionDetailData?.[0];

    return (
        <>
            <div className="solutions-item-container">
                <div className="solutions-content-box">
                    <section className="solutions-item-header">
                        <div className="solutions-content-title">
                            <h1 className="solution-title">{solutionData?.title || ''}</h1>
                            <div className="solution-caption">
                                {solutionData?.shortDescription || ''}
                            </div>
                        </div>
                        <img src="/landing_line.png" alt="" />
                    </section>
                    <div className="rich-content" dangerouslySetInnerHTML={{ __html: solutionData?.description || '' }}>
                    </div>
                </div>
                <div className="solutions-item-footer">
                    <Footer content={contactUsData} />
                </div>
            </div>
        </>
    );
}
