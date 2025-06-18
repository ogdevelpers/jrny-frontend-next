"use client";
import useIsMobile from "@/hooks/useIsMobile";
import Contact, { ContactForm, ContactHeading, SocialDivs } from "./Contact";

export default function ContactUs({ contents }: any) {
    const isMobile = useIsMobile(1024);
    if (isMobile) {
        return (
            <div className="contact-us-page-container-mobile">
                <div className="contact-us-page-box-mobile">
                    <div className="contact-form-mobile">
                        <ContactHeading contentData={contents} />
                        <ContactForm />
                    </div>
                    <div className="social-container-mobile">
                        <SocialDivs contentData={contents} />
                    </div>

                </div>
            </div>

        )
    }

    return (
        <>
            <div className="contact-us-page-container">
                <div className="contact-heading">
                    <span className="contactus-span">Contact Us</span>
                    <span className="line"></span>
                    <span className="create-jrny-contact">Create a JRNY</span>
                    <span className="line"></span>
                </div>
                <div className="contact-us-page-box">
                    <Contact contents={contents}/>
                </div>
            </div>

        </>
    )
}