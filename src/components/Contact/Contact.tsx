'use client';
import { useState } from "react";
import useIsMobile from "../../hooks/useIsMobile";
import Button from "../Button/Button";
import Input from "../FormInput/FormInput";
import "./contact.css";
import axios from 'axios';

export default function Contact() {
  const isMobile = useIsMobile(); 
  if (isMobile) {
    return (
      <div className="contact-us-container">
        <div className="social-container-mobile">
        <SocialDivs /> 
        </div>
        <div className="contact-mobile-line">
          <img src="/landing_line.png" alt="" />
        </div>
        <div className="contact-form-mobile-container">
          <ContactHeading />
          <ContactForm />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="contact-us-container">
        <div className="contact-us-row">
        < ContactHeading /> 
        </div>
        <div className="contactUsLine">
          <img src="/contact_line.png" />{" "}
        </div>
        <div className="contact-us-box">
          <ContactForm />
          <div className="socials-container">
            <SocialDivs />
          </div>
        </div>
      </div>
    </>
  );
}

export const ContactHeading = ()=>{
  return (
    <div className="contact-us-heading">
    Let’s shape your <span className="jrny-span">JRNY</span> into
    something unforgettable.
  </div>
  )
}

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e: any) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('Please fill in all fields');
      return;
    }

    setStatus('Sending...');

    try {
      await axios.post('http://localhost:1337/api/send-email', formData);
      setStatus('Message sent!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('Failed to send message');
    }
  };

  return (
    <div className="contact-form">
      <div className="your-info">
        <div className="footer-input-div">
          <Input
            placeholder="Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            classList="footer-input"
          />
        </div>
        <div className="footer-input-div">
          <Input
            placeholder="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            classList="footer-input"
          />
        </div>
      </div>
      <div className="footer-input-div footer-textarea">
        <textarea
          placeholder="Message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="footer-input form-textarea"
        />
      </div>

{status && <p style={{color: 'red'}}>{status}</p>}

      <div className="contact-button-container">

  
      <Button classList="button-white-theme" onClick={handleSubmit}>
        <div className="send-mail-container">
          <span className="send-mail-text">Send Mail</span>
          <img src="/arrow-right.png" alt="arrow" />
        </div>
      </Button>
          </div>
    </div>
  );
};

export const SocialIcons = () =>{
  return (
    <div className="social-icons">
    <img src="/favicon/whatsapp.svg" alt="whatsapp" />
    <img src="/favicon/linkedin.svg" alt="linkedin" />
    <img src="/favicon/instagram.svg" alt="instagram" />
    <img src="/favicon/facebook.svg" alt="facebook" />
  </div>
  )
}

export const SocialDivs = ()=>{
  const isMobile = useIsMobile();
  return (
    <div className={  `${isMobile?"social-divs-mobile":"social-divs"}`  }>
    <div className="social-div-container">
      <div className="social-heading">Email</div>
      <div className="social-example">info@zerodesignstudios.com</div>
    </div>
    <div className="social-div-container">
      <div className="social-heading">Phone</div>
      <div className="social-example">9977098856</div>
      <div className="social-example">8837636101</div>
    </div>
    <div className="social-div-container">
      <div className="social-heading">Location</div>
      <div className="social-example">
        <span>Mumbai</span>
        <span>Delhi</span>Indore<span></span>
      </div>
    </div>
    <div className="social-div-container">
      <div className="social-heading">Services</div>
      <div className="social-example">Content Creation</div>
      <div className="social-example">Experience Design</div>
      <div className="social-example">Experimental Marketing</div>
      <div className="social-example">Multimedia Production</div>
    </div>
  </div>
  )
}