'use client';

import ShareOn from "../ShareOn/ShareOn";
import '../../css/portfolio-item.css';
import "../../css/portfolio.css";

import { useState } from "react";
import Tags from "../Tags/Tags";

const PortfolioItemImage = ({itemImageSrc}:{itemImageSrc:string})=>{
    return (
        <div className="portfolio-item-image-box">
            <img src={`${itemImageSrc ? itemImageSrc : "/cards.png"}`} className='portfolio-item-images'/>
        </div>
    )
}

const VideoPlayer = ({videoUrl}: {videoUrl: string}) => {
    // Function to extract YouTube video ID from various YouTube URL formats
    const getYouTubeVideoId = (url: string): string | null => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const videoId = getYouTubeVideoId(videoUrl);
    
    if (!videoId) {
        return (
            <div className="video-error">
                <p>Invalid YouTube URL</p>
            </div>
        );
    }

    const embedUrl = `https://www.youtube.com/embed/${videoId}`;

    return (
        <div className="video-wrapper">
            <iframe
                src={embedUrl}
                title="Portfolio Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="video-iframe"
            />
        </div>
    );
};

export const PortfolioItemContent = ({portfolioDetailData}: any) =>{  
    const [showMore, setShowMore] = useState(false);

    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    // Demo array for images - replace with actual portfolio images array
    const portfolioImages = [0,1,2,3,4,5,6,7,8,9,10];
    
    // Show only first 6 images initially, or all if showMore is true
    const visibleImages = showMore ? portfolioImages : portfolioImages.slice(0, 6);
    const hasMoreImages = portfolioImages.length > 6;

    console.log("portfolioDetailData", portfolioDetailData);
    
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
                <div className="portfolio-item-tag-container">
                    {
                    [0,1,2].map((item:number ) => {
                        return (
                            <Tags key={item} tagTitle='Visual Marketing'/>
                        )
                    })
                    }
                </div>
            </div>
            
            {portfolioDetailData?.[0]?.portfolioVideo && (
                <div className="project-video-container">
                    <VideoPlayer videoUrl={portfolioDetailData[0].portfolioVideo} />
                </div>
            )}

            <div className="project-second-box">
                <div className="project-second-header">
                    More about the <span className='jrny-span'>Project</span>
                </div>
                <div className="project-second-description">
                    {portfolioDetailData?.[0]?.portfolioMoreAboutDescription}
                </div>
            </div>

            <div className={'portfolio-item-images-container'}>
                {visibleImages.map((item, index) => {
                    return (
                        <PortfolioItemImage 
                            key={index} 
                            itemImageSrc={portfolioDetailData?.[0]?.portfolioImage}
                        />
                    )
                })}
            </div>

            {hasMoreImages && (
                <div className="show-more-container">
                    <button 
                        onClick={toggleShowMore}
                        className="portfolio-item-show-more-button"
                    >
                        {showMore ? 'Show Less' : `Show More (${portfolioImages.length - 6} more)`}
                    </button>
                </div>
            )}
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