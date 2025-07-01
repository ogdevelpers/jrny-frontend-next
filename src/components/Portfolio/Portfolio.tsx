'use client';
import "../../css/portfolio.css";
import Footer from "../../components/shared/footer/Footer";
import PartnerSlider from "../../components/PartnerSlider/PartnerSlider";
import { extractContentByKey } from "../../utils/common.util";
import { useState } from "react";
import Link from "next/link";
import PortfolioList from "./PortfolioList";
import getPortfolioSidebarTabs from "@/utils/portfolioSidebarTabs.util";

const renderTitle = (title:string ) =>{
  const key = title?.split(/<([^>]+)>/);

  return (
    <span>
      {key?.[0]} <span className='jrny-span'>{key?.[1]}</span>
    </span>
  )
}

export const PortfolioContent = ({ content, contactUs }: any) => {
  const portfolioTabArray = getPortfolioSidebarTabs(content?.portfolios);

  const ourPortfolioTitle = (title: string) => {
    const titleData = title?.split(/<([^>]+)>/);

    return (
        <span className="our-projects-span">
                {titleData?.[0]} <span className="jrny-span-text">{titleData?.[1]}</span>
          </span>
    )
  }

  return (
    <>
      <div className="portfolio-landing-container">

        <div className="portfolio-top-section">
          <div className="portfolio-our-projects">
            <div className="our-projects-heading">
             {ourPortfolioTitle(content?.pageTitle)}
            </div>
            <p className="our-projects-p">
              {content?.pageDescription}
            </p>
          </div>
          <div className="portfolio-partner-show">
            <PartnerSlider brandLogos={content?.brandLogos} />
          </div>
        </div>
        <div className="portfolio-list-container">
        <PortfolioList portfolio={content?.portfolios} sidebarTabs={portfolioTabArray}/>
        </div>
      </div>

      <Footer content={contactUs} />
    </>
  )
}


interface PortfolioTileProps {
  videoLink: string,
  thumbnail?: string,
  tileTitle: string,
  id: string
}

const PortfolioTile = ({ videoLink, thumbnail, tileTitle, id }: PortfolioTileProps) => {
  if (!thumbnail) {
  }

  const tileTitleParsed = renderTitle(tileTitle);

  return (
    <div className="portfolio-tile-box hover-box hover-magnetic hover-lift-1 hover-neon">
      <div className="tile-thumbnail">
        <Link href={`/portfolio/${id}`} className='portfolio-link'>
          {/* <img src={thumbnail ?? '/landing-video-card.png'} alt="" /> */}
          <img src={'/landing-video-card.png'} alt="" />
        </Link>
      </div>
      <div className="tile-title">
        {tileTitleParsed}
      </div>
    </div>
  )
}


export const PortfolioMiddleList = ({ portfolio, counts }: any) => {


  const [visibleCount, setVisibleCount] = useState(counts); // Show 6 tiles initially


  return (
    <div className="portfolio-middle-list">
      <div className="portfolio-tile-container">
        {portfolio?.slice(0, visibleCount)?.map((element: any) => (
          <div key={element.id} className="portfolio-tile">
            <PortfolioTile
              tileTitle={element.Project_Name}
              videoLink={element.Project_Video_Url}
              thumbnail={element.portfolioImage}
              id={element.key}
            />
          </div>
        ))}
      </div>
    </div>
  );
};