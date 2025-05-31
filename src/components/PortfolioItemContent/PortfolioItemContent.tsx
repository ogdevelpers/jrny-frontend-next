'use client';

import ShareOn from "../ShareOn/ShareOn";
import '../../css/portfolio-item.css';
import "../../css/portfolio.css";

export const PortfolioItemContent = ({portfolioDetailData}: any) =>{ 
    console.log('portfolioDetailData', portfolioDetailData);
    return (
        <div className="project-box">
            <div className="project-header">
            <PortfolioItemHeader portfolioDetailData={portfolioDetailData}/>
                <div className="project-name">
                    Project <span className='jrny-span'>Name</span>
                </div>
                <div className="project-description">
                {portfolioDetailData?.[0]?.portfolioDescription?.[0]?.children?.[0]?.text}
                </div>

            </div>
            {  
                <div className="project-video-container">
                {/* <video src=""></video> */}
                <img style={{width: "100%"}} src='/video.png' />
            </div>}

            <div className="project-second-box">
                <div className="project-second-header">
                    More about the <span className='jrny-span'>Project</span>
                </div>
                <div className="project-second-description">
                {portfolioDetailData?.[0]?.portfolioMoreAboutDescription}
                </div>
            </div>

            {/* <div>
                
                <img src="/cards.png" />
                <img src="/cards.png" />
                <img src="/cards.png" />
                
               
                <img src="/cards.png" />
                <img src="/cards.png" />
                <img src="/cards.png" />
                
            </div> */}

        </div>
    )
}

const PortfolioItemHeader = ({portfolioDetailData}: any) =>{
    return (
        <div className="portfolio-item-header-container">
            <div className="item-date-company">
                <span className="item-date">
                    {portfolioDetailData?.[0]?.portfolioYear}
                </span>
                <span className="item-company">
                    JRNY
                </span>
            </div>
            <div className="share-on">
                <ShareOn/>
            </div>
        </div>
    )
}