"use client";

import Carasoul from "@/components/Carasoul/Carasoul";
import ExpandingVideo from "@/components/ExpandingVideo/ExpandingVideo";
import LineSvgMobile from "@/components/LineSvg/LineSvgMobile";
import PartnerSlider from "@/components/PartnerSlider/PartnerSlider";
import Footer from "@/components/shared/footer/Footer";
import useIsMobile from "@/hooks/useIsMobile";
import { getRoute } from "@/utils/common.util";
import { PortfolioMiddleList } from "../Portfolio/Portfolio";
import LineSvg from "../LineSvg/LineSvg";
import "../../css/landingpage.css";
import Link from "next/link";
import Button from "../Button/Button";
import ReelPreview from "../shared/reelpreview/ReelPreview";

interface LandingPageContentProps {
  content: any;
  footer: any;
}

export default function LandingPageContent({
  content,
  footer,
}: LandingPageContentProps) {
  const portfolioTrimmed = Array.isArray(content?.Portfolio)
    ? content?.Portfolio?.slice(0, 6)
    : [];

  const isMobile = useIsMobile(1010);

  const heading = content?.Hero?.Title?.split(",");
  const heading2 = heading?.[1];

  const aboutUsTitle = (title: string) => {
    const aboutUsTitle = title?.split(/<([^>]+)>/);

    return (
      <span className="about-us-landing-title">
        {aboutUsTitle?.[0]}
        <span className="jrny-span">{aboutUsTitle?.[1]}</span>
        {aboutUsTitle?.[2]}
      </span>
    );
  };

  const serviceTitle = (title: string) => {
    const serviceTitle = title?.split(/<([^>]+)>/);

    return (
      <h1 className="services-landing-title services-text-content">
        {serviceTitle?.[0]}
        <span className="jrny-span">{serviceTitle?.[1]}</span>
      </h1>
    );
  };

  const portfolioTitle = (title: string) => {
    const portfolioTitle = title?.split(/<([^>]+)>/);

    return (
      <h1 className="landing-portfolio-title">
        {portfolioTitle?.[0]}
        <span className="jrny-span">{portfolioTitle?.[1]}</span>
      </h1>
    );
  };

  const testimonialTitle = (title: string) => {
    const testimonialTitle = title?.split(/<([^>]+)>/);

    return (
      <>
        <span className="testimonial-span">{testimonialTitle?.[0]}</span>{" "}
        <span className="jrny-span">{testimonialTitle?.[1]}</span>{" "}
        <span className="testimonial-span"> {testimonialTitle?.[2]}</span>
      </>
    );
  };

  return (
    <>
      <div className="landing-container">
        <div className="hero-container">
          <div className="landing-text-container">
            <h1 className="landing-title">
              <span className="landing-title-main">{heading?.[0]}</span>
              {/* <br /> */}
              <span className="landing-page-matter-text">
                {heading2?.split("")?.map((char: any, i: any) => (
                  <span key={i} className="landing-char-span">
                    {char}
                  </span>
                ))}
              </span>
            </h1>
          </div>

          {!isMobile ? (
            <section className="landing-expanding-video">
              <ExpandingVideo heroData={content?.Hero} />
            </section>
          ) : (
            <section className="landing-video-mobile">
              <video
                className="landing-video-mobile-tag"
                autoPlay
                loop
                muted
                playsInline
              >
                <source
                  src={content?.Hero?.ShowReelVideoLink}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </section>
          )}

          <div style={{ marginTop: "30px" }}>
            <ReelPreview
              bolo={content?.Hero?.CTAText}
              url={content?.Hero?.ShowReelVideoLink}
            />
          </div>
        </div>

        <div className="landing-svg-container">
          {isMobile ? (
            <section className="svg-content-mobile">
              <div className="content-svg-mobile">
                {/* <LineSvgMobile /> */}
              </div>
            </section>
          ) : (
            <section className="svg-content">
              <div className="content-svg">
                <LineSvg />
              </div>
            </section>
          )}

          <div className="about-us-landing">
            <div className="about-us-section">
              {/* Left Title Block */}
              <div className="about-us-landing-text">
                {aboutUsTitle(content?.About?.title)}
              </div>

              {/* Right Paragraph + Button Block */}
              <div
                className="showreel-container"
                style={{
                  flexDirection: "column",
                  alignItems: "flex-start",
                  paddingTop: "50px",
                  gap: "1.5rem",
                }}
              >
                <div
                  style={{ fontSize: "20px" }}
                  className="about-us-landing-paragraph abt-landing"
                >
                  {content?.About?.description}
                </div>

                <Link
                  href={`/${content?.About?.CTA_Link}`}
                  className="about-landing-button"
                >
                  <Button classList="button-white-theme">
                    <div className="button-content-animated">
                      {content?.About?.CTA_Text}
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
                {serviceTitle(content?.Service?.title)}
                <div className="services-landing-paragraph">
                  {content?.Service?.description}
                </div>
              </div>

              <div className="cards-section">
                <div className="cards-section-grid-container">
                  {content?.Service?.services?.map(
                    (service: any, index: number) => (
                      <div
                        className="profile-card hover-box hover-magnetic hover-lift-1 hover-neon"
                        key={index}
                      >
                        <img
                          src={service.thumbnail}
                          alt={`Service ${index + 1}`}
                        />
                        <div className="profile-caption">
                          <div className="heading">{service.Title}</div>
                          {/* <div className="description">
                          {service?.ShortDescriptionPoints?.map((desc: any, i: number) => (
                            <div
                              className={`description-${i + 1}`}
                              key={i}
                            >
                              {desc}
                            </div>
                          ))}
                        </div> */}
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </section>

            <div className="testimonial-top">{content?.Partner?.title}</div>

            <div className="partners-slideshow">
              <span className="partnered">{content?.Partner?.subTitle}</span>
              <PartnerSlider brandLogos={content?.Partner?.brands} />

              <div className="landing-line">
                <img src="landing_line.png" alt="" />
              </div>
            </div>
          </div>

          <div className="journeys-div">
            <section className="landing-portfolio">
              <div className="landing-portfolio-title-box">
                {portfolioTitle(content?.Portfolio?.title)}
                <p className="landing-portfolio-paragraph">
                  {content?.Portfolio?.description}
                </p>
              </div>

              <div className="portfolio-tiles-landing">
                <PortfolioMiddleList
                  portfolio={content?.Portfolio?.portfolios}
                  counts={6}
                />
                <div className="see-more-container">
                  <Link href={`/${content?.Portfolio?.CTA_Link}`}>
                    <Button classList="see-more">
                      {content?.Portfolio?.CTA_Text}
                    </Button>
                  </Link>
                </div>
              </div>
            </section>

            <div className="testimonial-bottom">
              {testimonialTitle(content?.Testimonial?.title)}
            </div>

            <div className="carousol-container">
              <div className="carousol-logo">
                <img src="/jrny-testimonial-logo.png" />
                <span className="testimonial-logo-trusted">
                  {content?.Testimonial?.subTitle}
                </span>
              </div>
              <div className="carousol">
                <div className="profile-section"></div>
                <div className="carousol-card-section"></div>
                <Carasoul testimonial={content?.Testimonial?.testimonials} />
              </div>
            </div>
          </div>
        </div>

        <div className="penultimate-container">
          <RightChoice content={content?.Why_Jrny} />
        </div>
        <div className="landing-footer">
          <Footer content={footer} />
        </div>
      </div>
    </>
  );
}

export const RightChoice = ({ content }: any) => {
  const rightChoiceTitle = (text: string) => {
    const title = text?.split(/<([^>]+)>/);

    return (
      <h1 className="right-choice-h1">
        {title?.[0]}
        <span className="jrny-span">{title?.[1]}</span>
        {title?.[2]}
      </h1>
    );
  };

  return (
    <>
      <div className="right-choice-container">
        {rightChoiceTitle(content?.title)}
        <p className="right-choice-p">{content?.description}</p>

        <div className="features">
          {content?.jrnies?.map((item: any) => (
            <div className="feature-container addPlus" key={item.id}>
              <span className="feature-title">{item.title}</span>
              <div className="feature-caption">{item.description}</div>
            </div>
          ))}
        </div>
        <div className="testimonial-caption"></div>
      </div>
    </>
  );
};
