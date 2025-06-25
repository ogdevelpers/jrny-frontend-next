'use client';
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
    contactUs: any;
}

export const AboutUsContent = ({ content, contactUs }: AboutUsContentProps) => {
    const isMobile = useIsMobile(1000);

    const AboutUsMottoArray = content?.about_us_texts;

    const renderTitle = (title: string) => {
        const key = title.split(/<([^>]+)>/);

        return (
            <div className="about-landing-header">
                       {key[0]} <span className='jrny-span'>{key[1]}</span>
                    </div>
        )
    }
    
    const renderOurTeamTitle = (title: string) => {
        const key = title.split(/<([^>]+)>/);

        return (
            <p className="about-main-description">
                <span className="jrny-span">{key[1]}</span>{key[2]}
            </p>
        )
    }

    return (
        <>
            <div className="about-landing-container">
                {
                    !isMobile &&
                    <div className="about-show-reel">
                        <ShowReel reelData={content}/>
                    </div>}
                <div className="about-landing-content">
                    {renderTitle(content?.Page_Title)}
                    {
                        !isMobile && (

                            <div className="about-landing-buttons">
                                    <Link href={`/${content?.CTA_Link}`}>
                                <Button classList="button-white-theme">
                                    <div className="button-content-animated">
                                       {content?.CTA_Text}
                                        <img src="/arrow-right.png" alt="arrow" />
                                    </div>
                                </Button>
                                    </Link>
                            </div>
                        )
                    }
                    <div className="about-landing-description">
                        {content?.Page_Description}
                    </div>
                </div>
            </div>

            <div className="about-tag-container">
                <TagSlider tag={content?.tags} />
            </div>

            {isMobile && (
                <div className="about-landing-buttons-mobile">
                    <Link href={`/${content?.CTA_Link}`}>
                    <Button classList={"button-white-theme"}>
                        {content?.CTA_Text}
                    </Button>
                    </Link>

                    {/* <Link href={`${getRoute('Portfolio')}`}>
                    <Button classList={"about-portfolio-btn-mobile"}>
                         Portfolio 
                    </Button>
                    </Link> */}
                </div>
            )}



            <div className="about-main-container">
                <div className="about-motto">
                    {
                        AboutUsMottoArray.map((Motto: any, index: number) =>
                            // <div className="about-motto-box  hover-box hover-neon-variant" key={index}>
                                <div className="about-motto-box" key={index}>
                                <div className="motto-title">{Motto.title}</div>
                                <div className="motto-description">{Motto.Description}</div>
                            </div>
                        )
                    }
                </div>

                <div className="about-main-tag">
                    {renderOurTeamTitle(content?.Page_Sub_Description)}
                </div>

                <div className="about-people-tile-container">
                    {content?.teams?.map((person: any, index: number) => (
                        <PersonTile key={index} person={person} />
                    ))}
                </div>
            </div>
            <div className="about-footer">
                <Footer content={contactUs}/>
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