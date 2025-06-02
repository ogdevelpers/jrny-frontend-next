'use client';

import Carasoul from "@/components/Carasoul/Carasoul";
import ExpandingVideo from "@/components/ExpandingVideo/ExpandingVideo";
import LineSvgMobile from "@/components/LineSvg/LineSvgMobile";
import PartnerSlider from "@/components/PartnerSlider/PartnerSlider";
import Footer from "@/components/shared/footer/Footer";
import ShowReel from "@/components/ShowReel/ShowReel";
import useIsMobile from "@/hooks/useIsMobile";
import { extractContentByKey } from "@/utils/common.util";
import { PortfolioMiddleList } from "../Portfolio/Portfolio";
import LineSvg from "../LineSvg/LineSvg";
import '../../css/landingpage.css';
import Link from "next/link";
import Button from "../Button/Button";

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
                    <source src="https://cdn-front.freepik.com/revamp/temp/hero/1905-AnonymousHome1920x1080.webm" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </section>
              )

          }

          < Button classList='landing-showreel-button button-white-theme'>
            Watch ShowReel
          </Button>

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
            <div className="about-us-section  ">
              <div className="about-us-landing-text">
                <h1 className="about-us-landing-title">
                  {aboutTitle?.contentTitle} <span className="jrny-span">{usText?.contentTitle}</span>
                </h1>
                <p className="about-us-landing-paragraph">
                  {aboutTitle?.text}
                </p>
              </div>
              <div className="showreel-container">
                <ShowReel />
              </div>
            </div>
          </div>

          <div className="card-container">
            <section className="card-para-div">
              <div className="services-landing-container  ">
                <h1 className="services-landing-title">
                  {serviceText?.contentTitle} <span className="jrny-span">{provideText?.contentTitle}</span>
                </h1>
                <p className="services-landing-paragraph">
                  {serviceText?.text}
                </p>
              </div>

              <div className="cards-section">
                <div className="cards-section-grid-container">

                  <div className="profile-card ">
                    <img src="/jrny_example_profile_card.jpg" alt="" />
                    <div className="profile-caption">
                      <div className="heading">John Doe</div>
                      <div className="description">
                        Event Specialist & Designer
                      </div>
                    </div>
                  </div>
                  <div className="profile-card generic">
                    <img src="jrny_example_profile_card.jpg" alt="" />
                    <div className="profile-caption">
                      <div className="heading">John Doe</div>
                      <div className="description">
                        Event Specialist & Designer
                      </div>
                    </div>
                  </div>
                  <div className="profile-card generic">
                    <img src="jrny_example_profile_card.jpg" alt="" />
                    <div className="profile-caption">
                      <div className="heading">John Doe</div>
                      <div className="description">
                        Event Specialist & Designer
                      </div>
                    </div>
                  </div>
                  <div className="profile-card generic">
                    <img src="jrny_example_profile_card.jpg" alt="" />
                    <div className="profile-caption">
                      <div className="heading">John Doe</div>
                      <div className="description">
                        Event Specialist & Designer
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
                <PortfolioMiddleList portfolio={portfolio} />
                <div className="see-more-container">

                  <Link href="/portfolio"><button className="see-more">See More</button></Link>
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
          <div className="feature-container addPlus">
            <span className="feature-title">{extractContentByKey(content, 'innovation')?.contentTitle}</span>
            <div className="feature-caption">
              {extractContentByKey(content, 'innovation')?.text}
            </div>
          </div>
          <div className="feature-container addPlus">
            <span className="feature-title">{extractContentByKey(content, 'customization')?.contentTitle}</span>
            <div className="feature-caption">
              {extractContentByKey(content, 'customization')?.text}
            </div>
          </div>
          <div className="feature-container addPlus">
            <span className="feature-title">{extractContentByKey(content, 'excellence')?.contentTitle}</span>
            <div className="feature-caption">
              {extractContentByKey(content, 'excellence')?.text}
            </div>
          </div>
          <div className="feature-container addPlus">
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
