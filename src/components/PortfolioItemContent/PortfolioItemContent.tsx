'use client';

import ShareOn from "../ShareOn/ShareOn";
import '../../css/portfolio-item.css';
import "../../css/portfolio.css";

import { useState } from "react";
import Tags from "../Tags/Tags";
import { parseHtmlContent } from "@/utils/htmlParser.util";

const PortfolioItemImage = ({ itemImageSrc }: { itemImageSrc: string }) => {
    return (
        <div className="portfolio-item-image-box">
            <img src={`${itemImageSrc ? itemImageSrc : "/cards.png"}`} className='portfolio-item-images' />
        </div>
    )
}

const VideoPlayer = ({ videoUrl }: { videoUrl: string }) => {
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

const renderTitle = (title: string) => {
    const key = title.split(/<([^>]+)>/);

    return (
        <div className="project-name">
            {key[0]} <span className='jrny-span'>{key[1]}</span>
        </div>
    )
}

const renderSubTitle = (title: string) => {
    const key = title.split(/<([^>]+)>/);
    return (
        <div className="project-second-header">
            {key[0]} <span className='jrny-span'>{key[1]}</span>
        </div>
    )
}

export const PortfolioItemContent = ({ portfolioDetailData }: any) => {
    const [showMore, setShowMore] = useState(false);

    const toggleShowMore = () => {
        setShowMore(!showMore);
    };


    const { description,images,video,html } = parseHtmlContent(portfolioDetailData?.descriptionGlobal || '');

    // Demo array for images - replace with actual portfolio images array
    const portfolioImages = portfolioDetailData?.Project_Images;

    // Show only first 6 images initially, or all if showMore is true
    const visibleImages = showMore ? images : images.slice(0, 6);
    const hasMoreImages = images.length > 6;
 


    return (
        <div className="project-box">
            <div className="project-header">
                <PortfolioItemHeader portfolioDetailData={portfolioDetailData} />
                {renderTitle(portfolioDetailData?.Project_Name)}
                <div className="project-description">
                    {description}
                </div>
                <div className="portfolio-item-tag-container">
                    {
                        portfolioDetailData?.categories?.map((data: any, item: number) => {
                            return (
                                <Tags key={item} tagTitle={data.Name} />
                            )
                        })
                    }
                </div>
            </div>

            {portfolioDetailData?.Project_Video_Url && (
                <div className="project-video-container">
                    <VideoPlayer videoUrl={portfolioDetailData?.Project_Video_Url} />
                </div>
            )}
 

            <div className={'portfolio-item-images-container'}>
                {visibleImages?.map((item: any, index: number) => {
                    return (
                        <PortfolioItemImage
                            key={index}
                            itemImageSrc={item.thumbnail}
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

const PortfolioItemHeader = ({ portfolioDetailData }: any) => {
    return (
        <div className="portfolio-item-header-container">
            <div className="item-date-company">
                <span className="item-date">
                    {portfolioDetailData?.Project_Year}
                </span>
                <span className="item-company">
                    {portfolioDetailData?.Project_Heading}
                </span>
            </div>
            <div className="share-on">
                <ShareOn />
            </div>
        </div>
    )
}