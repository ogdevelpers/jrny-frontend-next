'use client'
import Contact, { ContactForm, ContactHeading, SocialDivs } from '../../components/Contact/Contact';
import useIsMobile from '../../hooks/useIsMobile';
import '../../css/contactus.css';
import '../../components/Contact/contact.css'

export default function ContactUs() {

  const isMobile = useIsMobile(1024);

  if (isMobile) {
    return (
      <div className="contact-us-page-container-mobile">
        <div className="contact-us-page-box-mobile">
          <div className="contact-form-mobile">
            <ContactHeading />
            <ContactForm />
          </div>
          <div className="social-container-mobile">
            <SocialDivs /> 
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
          <Contact />
        </div>
      </div>

    </>
  )
}
