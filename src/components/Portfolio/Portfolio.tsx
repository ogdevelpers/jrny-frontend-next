'use client';
import "../../css/portfolio.css";
import Footer from "../../components/shared/footer/Footer";
import PartnerSlider from "../../components/PartnerSlider/PartnerSlider";
import { extractContentByKey } from "../../utils/common.util";
import { useState } from "react";
import Link from "next/link";

export const PortfolioContent = ({content, brandLogos, portfolio}: any) => {
  const ourText = extractContentByKey(content, 'our-portfolio'),
    portfolioText = extractContentByKey(content, 'portfolio');

  return (
    <>
      <div className="portfolio-landing-container">

        <div className="portfolio-top-section">
          <div className="portfolio-our-projects">
            <div className="our-projects-heading">
              <span className="our-projects-span">
                {ourText?.contentTitle} <span className="jrny-span-text">{portfolioText?.contentTitle}</span>
              </span>
            </div>
            <p className="our-projects-p">
              {ourText?.text}
            </p>
          </div>
          <div className="portfolio-partner-show">
            <PartnerSlider brandLogos={brandLogos} />
          </div>
        </div>
        <PortfolioMiddleList portfolio={portfolio}/>
      </div>

      <Footer />
    </>
  )
}

interface PortfolioTileProps {
  videoLink: string,
  thumbnail?: string,
  tileTitle: string,
  id: string
}

const PortfolioTile = ({videoLink, thumbnail, tileTitle, id }: PortfolioTileProps) => {
  if (!thumbnail) {
  }

  console.log('key', id);

  return (
    <div className="portfolio-tile-box moveUp">
      <div className="tile-thumbnail">
        <Link href={`/portfolio/${id}`} className='portfolio-link'>
          {/* <img src={thumbnail ?? '/landing-video-card.png'} alt="" /> */}
          <img src={'/landing-video-card.png'} alt="" />
        </Link>
      </div>
      <div className="tile-title">
        {tileTitle}
      </div>
    </div>
  )
}


export const PortfolioMiddleList = ({ portfolio }: any) => {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [visibleCount, setVisibleCount] = useState(6); // Show 6 tiles initially
 

  return (
    <div className="portfolio-middle-list">
      <div className="portfolio-tile-container">
        {portfolio?.slice(0, visibleCount)?.map((element: any) => (
          <div key={element.id} className="portfolio-tile">
            <PortfolioTile
              tileTitle={element.portfolioTitle}
              videoLink={element.portfolioVideo}
              thumbnail={element.portfolioImage}
              id={element.key}
            />
          </div>
        ))}
      </div>
    </div>
  );
};