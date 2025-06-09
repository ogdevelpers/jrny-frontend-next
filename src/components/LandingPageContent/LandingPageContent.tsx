'use client';

import Carasoul from "@/components/Carasoul/Carasoul";
import ExpandingVideo from "@/components/ExpandingVideo/ExpandingVideo";
import LineSvgMobile from "@/components/LineSvg/LineSvgMobile";
import PartnerSlider from "@/components/PartnerSlider/PartnerSlider";
import Footer from "@/components/shared/footer/Footer";
import ShowReel from "@/components/ShowReel/ShowReel";
import useIsMobile from "@/hooks/useIsMobile";
import { extractContentByKey, getRoute } from "@/utils/common.util";
import { PortfolioMiddleList } from "../Portfolio/Portfolio";
import LineSvg from "../LineSvg/LineSvg";
import '../../css/landingpage.css';
import Link from "next/link";
import Button from "../Button/Button"; 
import { routes, showReelVideoUrl } from "@/lib/constants";

interface LandingPageContentProps {
  content: any;
  portfolio: any;
  brandLogos: any;
  testimonial: any;
}

export default function LandingPageContent({
  content,
  portfolio,
  brandLogos,
  testimonial
}: LandingPageContentProps) {

  const portfolioTrimmed = Array.isArray(portfolio) ? portfolio.slice(0, 6) : [];

  const isMobile = useIsMobile(1010);

  const aboutTitle = extractContentByKey(content, 'about-us'),
    usText = extractContentByKey(content, 'us'),
    provideText = extractContentByKey(content, 'provide'),
    jrnyText = extractContentByKey(content, 'jrny'),
    serviceText = extractContentByKey(content, 'services-we-provide'),
    ourText = extractContentByKey(content, 'our-portfolio'),
    portfolioText = extractContentByKey(content, 'portfolio');
 

  return (
    <>
      <div className="landing-container">
        <div className="hero-container">
          <div className="landing-text-container">
            <h1 className="landing-title">

              <span className="landing-title-main">
                Making Moments
              </span>
              <br />
              <span className="landing-page-matter-text">
                {
                  "MATTER".split("").map((char, i) => (
                    <span key={i} className="landing-char-span">{char}</span>
                  ))
                }
              </span>
            </h1>
          </div>

          {
            !isMobile ?
              (<section className="landing-expanding-video">
                <ExpandingVideo />
              </section>) :
              (
                <section className="landing-video-mobile">
                  <video
                    className="landing-video-mobile-tag"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source src={showReelVideoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </section>
              )

          }

          <div style={{ marginTop: "30px" }}>
              <Link href={`${getRoute('About Us')}`} className="landing-watch-btn">
            <Button classList='landing-showreel-button button-white-theme'>

              <div className="button-content-animated">
                Showreel
                <img src="/arrow-right.png" alt="arrow" />
              </div>
            </Button>
              </Link> 
          </div>

        </div>


        <div className="landing-svg-container">
          {isMobile ? (
            <section className="svg-content-mobile">
              <div className="content-svg-mobile">
                <LineSvgMobile />
              </div>
            </section>
          ) : (
            <section className="svg-content">
              <div className="content-svg">
                < LineSvg />
              </div>
            </section>
          )}

          <div className="about-us-landing">
            <div className="about-us-section">
              {/* Left Title Block */}
              <div className="about-us-landing-text">
                <span className="about-us-landing-title">
                  Where <span className="jrny-span">Experiences</span> Speak Louder Than Words.
                </span>
              </div>

              {/* Right Paragraph + Button Block */}
              <div className="showreel-container" style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-end', gap: '1.5rem' }}>
                <div className="about-us-landing-paragraph">
                  As your creative partners, we dive deep into your brand story to craft experiences that truly resonate with your audience.
                  From concept to execution, every touchpoint is curated to captivate the senses, ignite curiosity, and leave a memorable impact.
                </div>

                <Link href={`${getRoute('About Us')}`} className='about-landing-button'>
                <Button classList="button-white-theme">
                  <div className="button-content-animated">
                    About Us
                    <img src="/arrow-right.png" alt="arrow" />
                  </div>
                </Button>
                  </Link>
              </div>
            </div>
          </div>

          <div className="card-container">
            <section className="card-para-div">
              <div className="services-landing-container  ">
                <h1 className="services-landing-title services-text-content">
                  {serviceText?.contentTitle} <span className="jrny-span">{provideText?.contentTitle}</span>
                </h1>
                <div className="services-landing-paragraph">
                  {serviceText?.text}
                </div>
              </div>

              <div className="cards-section">
                <div className="cards-section-grid-container">

                  <div className="profile-card ">
                    <img src="services.jpg" alt="" />
                    <div className="profile-caption">
                      <div className="heading">Category 1</div>
                      <div className="description">
                        <div className="description-1">Content Creation </div>
                        <div className="description-2">Experience Design</div>
                      </div>
                    </div>
                  </div>
                  <div className="profile-card">
                    <img src="services.jpg" alt="" />
                    <div className="profile-caption">
                      <div className="heading">Category 2</div>
                      <div className="description">
                        <div className="description-1">Content Creation </div>
                        <div className="description-2">Experience Design</div>
                      </div>
                    </div>
                  </div>
                  <div className="profile-card">
                    <img src="services.jpg" alt="" />
                    <div className="profile-caption">
                      <div className="heading">Category 3</div>
                      <div className="description">
                        <div className="description-1">Content Creation </div>
                        <div className="description-2">Experience Design</div>
                      </div>
                    </div>
                  </div>
                  <div className="profile-card">
                    <img src="services.jpg" alt="" />
                    <div className="profile-caption">
                      <div className="heading">Category 4</div>
                      <div className="description">
                        <div className="description-1">Content Creation </div>
                        <div className="description-2">Experience Design</div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            <div className="testimonial-top">
              We have worked closely with over 20 companies, helping them design
              and deliver meaningful experiences.
            </div>

            <div className="partners-slideshow">
              <span className="partnered">Partnered with:</span>
              <PartnerSlider brandLogos={brandLogos} />

              <div className="landing-line">
                <img src="landing_line.png" alt="" />
              </div>
            </div>
          </div>

          <div className="journeys-div">
            <section className="landing-portfolio">
              <div className="landing-portfolio-title-box">
                <h1 className="landing-portfolio-title">
                  {ourText?.contentTitle} <span className="jrny-span">{portfolioText?.contentTitle}</span>
                </h1>
                <p className="landing-portfolio-paragraph">
                  {ourText?.text}
                </p>
              </div>

              <div className="portfolio-tiles-landing">
                <PortfolioMiddleList portfolio={portfolioTrimmed} />
                <div className="see-more-container">

                  <Link href="/portfolio">
                  <Button classList="see-more">See More</Button>
                  </Link>
                </div>
              </div>
            </section>

            <div className="testimonial-bottom">
              <span className="testimonial-span">We created </span>
              <span className="jrny-span">JRNY</span>{" "}
              <span className="testimonial-span">
                {" "}
                to enhance journeys, ensuring people cherish the moments that
                matter.
              </span>
            </div>

            <div className="carousol-container">
              <div className="carousol-logo">
                <img src="/jrny-testimonial-logo.png" />
                <span className="testimonial-logo-trusted">Trusted by:</span>
              </div>
              <div className="carousol">
                <div className="profile-section"></div>
                <div className="carousol-card-section"></div>
                <Carasoul testimonial={testimonial} />
              </div>
            </div>
          </div>
        </div>

        <div className="penultimate-container">
          <RightChoice content={content} />
        </div>
        <div className="landing-footer">

          <Footer />
        </div>
      </div>
    </>
  );
}

export const RightChoice = ({ content }: any) => {
  return (
    <>
      <div className="right-choice-container">
        <h1 className="right-choice-h1">
          Why <span className="jrny-span">JRNY</span> is the Right Choice
        </h1>
        <p className="right-choice-p">
          Begin creating journeys that leave a lasting impression, ensuring
          every moment is unforgettable.
        </p>

        <div className="features">
          <div className="feature-container addPlus ">
            <span className="feature-title">{extractContentByKey(content, 'innovation')?.contentTitle}</span>
            <div className="feature-caption">
              {extractContentByKey(content, 'innovation')?.text}
            </div>
          </div>
          <div className="feature-container addPlus ">
            <span className="feature-title">{extractContentByKey(content, 'customization')?.contentTitle}</span>
            <div className="feature-caption">
              {extractContentByKey(content, 'customization')?.text}
            </div>
          </div>
          <div className="feature-container addPlus ">
            <span className="feature-title">{extractContentByKey(content, 'excellence')?.contentTitle}</span>
            <div className="feature-caption">
              {extractContentByKey(content, 'excellence')?.text}
            </div>
          </div>
          <div className="feature-container addPlus ">
            <span className="feature-title">{extractContentByKey(content, 'global-reach')?.contentTitle}</span>
            <div className="feature-caption">
              {extractContentByKey(content, 'global-reach')?.text}
            </div>
          </div>
        </div>
        <div className="testimonial-caption"></div>
      </div>
    </>
  );
};
