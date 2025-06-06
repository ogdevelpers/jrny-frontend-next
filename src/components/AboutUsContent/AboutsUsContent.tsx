'use client';
import { useState } from 'react';
import Button from '@/components/Button/Button';
import ShowReel from '@/components/ShowReel/ShowReel';
import Footer from '@/components/shared/footer/Footer';
import useIsMobile from '@/hooks/useIsMobile';
import TagSlider from '@/components/TagSlider/TagSlider';
import { extractContentByKey, getRoute } from '@/utils/common.util';
import Link from 'next/link';
import '../../css/about.css';


interface AboutUsContentProps {
    content: any;
    tag: any;
    team: any;
}

export const AboutUsContent = ({ content, tag, team }: AboutUsContentProps) => {
    const isMobile = useIsMobile(1000); 

    const AboutUsMottoArray = [
        {
            title: extractContentByKey(content, 'mission')?.contentTitle,
            description: extractContentByKey(content, 'mission')?.text
        },
        {
            title: extractContentByKey(content, 'vision')?.contentTitle,
            description: extractContentByKey(content, 'vision')?.text
        },
        {
            title: extractContentByKey(content, 'impact')?.contentTitle,
            description: extractContentByKey(content, 'impact')?.text
        }
    ]

    const aboutText = extractContentByKey(content, 'about-us'),
        usText = extractContentByKey(content, 'us');



    return (
        <>
            <div className="about-landing-container">
                {
                    !isMobile &&
                    <div className="about-show-reel">
                        <ShowReel />
                    </div>}
                <div className="about-landing-content">
                    <div className="about-landing-header">
                        {aboutText?.contentTitle} <span className='jrny-span'>{usText?.contentTitle}</span>
                    </div>
                    {
                        !isMobile && (

                            <div className="about-landing-buttons">
                                    <Link href={`${getRoute('Contact Us')}`}>
                                <Button classList="button-white-theme">
                                    <div className="button-content-animated">
                                        Contact Us
                                        <img src="/arrow-right.png" alt="arrow" />
                                    </div>
                                </Button>
                                    </Link>
                            </div>
                        )
                    }
                    <div className="about-landing-description">
                        {aboutText?.text}
                    </div>
                </div>
            </div>

            <div className="about-tag-container">
                <TagSlider tag={tag} />
            </div>

            {isMobile && (
                <div className="about-landing-buttons-mobile">
                    <Link href={`${getRoute('Contact Us')}`}>
                    <Button classList={"button-white-theme"}>
                        Contact Us 
                    </Button>
                    </Link>

                    <Link href={`${getRoute('Portfolio')}`}>
                    <Button classList={"about-portfolio-btn-mobile"}>
                         Portfolio 
                    </Button>
                    </Link>
                </div>
            )}



            <div className="about-main-container">
                <div className="about-motto">
                    {
                        AboutUsMottoArray.map((Motto, index: number) =>
                            // <div className="about-motto-box  hover-box hover-neon-variant" key={index}>
                                <div className="about-motto-box" key={index}>
                                <div className="motto-title">{Motto.title}</div>
                                <div className="motto-description">{Motto.description}</div>
                            </div>
                        )
                    }
                </div>

                <div className="about-main-tag">
                    <p className="about-main-description">
                        <span className="jrny-span">{extractContentByKey(content, 'our-team')?.contentTitle} </span>{extractContentByKey(content, 'our-team-description')?.contentTitle}
                    </p>
                </div>

                <div className="about-people-tile-container">
                    {team?.map((person: any, index: number) => (
                        <PersonTile key={index} person={person} />
                    ))}
                </div>
            </div>
            <div className="about-footer">
                <Footer />
            </div>

        </>
    )
}

const PersonTile = ({ person }: { person: any }) => {

    return (
        <>
            <div className="person-tile">
                <div className="person-image-div">

                <img
                    src={person.userImage}
                    alt={person.name}
                    className="person-image"
                    />
                </div>
                <div className="person-info">
                    <div className="person-credentails">
                        <div className="person-name">{person.name}</div>
                        <div className="person-designation">{person.jobTitle}</div>
                    </div>
                    <div className="social-links-favicon">
                        <a href={person?.personSocials?.linkedIn}><img src="/favicon/linkedin.svg" alt="" /></a>
                        {/* <a href={person.personSocials.instagram}><img src="/favicon/instagram.svg" alt="" /></a>
                <a href={person.personSocials.facebook}><img src="/favicon/facebook.svg" alt="" /></a> */}
                    </div>
                </div>
            </div>
        </>
    )
}