'use client';
import "../../css/portfolio.css";
import Footer from "../../components/shared/footer/Footer";
import PartnerSlider from "../../components/PartnerSlider/PartnerSlider";
import { extractContentByKey } from "../../utils/common.util";
import { useState } from "react";
import Link from "next/link";

export const PortfolioContent = ({ content, brandLogos, portfolio }: any) => {
  const ourText = extractContentByKey(content, 'our-portfolio'),
    portfolioText = extractContentByKey(content, 'portfolio');
    
  const portfolioTabSet = new Set<string>();
  portfolioTabSet.add("All Categories");

  portfolio.forEach((item: any) => {
    item?.categories?.forEach((category: any) => {
      if (category?.name) {
        portfolioTabSet.add(category.name);
      }
    });
  });

  const portfolioTabArray = Array.from(portfolioTabSet);

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

        <PortfolioList portfolio={portfolio} sidebarTabs={portfolioTabArray}/>


      </div>

      <Footer />
    </>
  )
}


const PortfolioList = ({ portfolio, sidebarTabs }: { portfolio: any, sidebarTabs: string[] }) => { 
  const [selectedTab, setSelectedTab] = useState(0);


  const portfolioFiltered = selectedTab === 0 ? portfolio: 
  portfolio.filter((item:any) => {
    if (item?.categories) { 
      return item.categories.some((category: any) => category.name === sidebarTabs[selectedTab]);
    }
    return false;
  });

  return (
    <>

      <>
        <div className="portfolio-list-sidebar-elements">
          <ul className='portfolio-list-sidebar'>
            {sidebarTabs.map((tab: string, index: number) =>
              <li
                key={index} 
                className={`portfolio-list-sidebar-element ${selectedTab === index ? 'portfolio-sidebar-element-active' : ''
                  }`}
              >                    
              <button className="sidebar-list-tab"                 
              onClick={
                  () => {
                    console.log("Selected Tab: ", tab);
                    setSelectedTab(index);
                  }
                }>
                  {" "}
                  {tab}
                </button> 
              </li>
            )
            }
          </ul>
        </div>
      </>
      <PortfolioMiddleList portfolio={portfolioFiltered} />

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