"use client";
import { useState, useCallback } from "react";
import useIsMobile from "../../hooks/useIsMobile";
import Button from "../Button/Button";
import Input from "../FormInput/FormInput";
import Textarea from "../TextArea/TextArea";
import axios from "axios";
import "./contact.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCMSclientContext } from "../Context/CMSclientContextProvider";

// Type definitions
interface ContentData {
  Form?: {
    title?: string;
    Email?: string;
    PhoneNumber?: string;
    locations?: Array<{ Name: string }>;
    services?: Array<{ Title: string }>;
  };
}

interface ContactProps {
  contents: ContentData;
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface ContactHeadingProps {
  contentData: ContentData;
}

interface SocialDivsProps {
  contentData: ContentData;
}

export default function Contact({ contents }: ContactProps) {
  const isMobile = useIsMobile(1000);

  if (isMobile) {
    return (
      <div className="contact-us-container">
        <div className="social-container-mobile">
          <SocialDivs contentData={contents} />
        </div>
        <div className="contact-mobile-line">
          <img src="/landing_line.png" alt="Decorative line" />
        </div>
        <div className="contact-form-mobile-container">
          <ContactHeading contentData={contents} />
          <ContactForm />
        </div>
      </div>
    );
  }

  return (
    <div className="contact-us-container">
      <div className="contact-us-row">
        <ContactHeading contentData={contents} />
      </div>
      <div className="contactUsLine">
        <img src="/contact_line.png" alt="Contact section divider" />
      </div>
      <div className="contact-us-box">
        <ContactForm />
        <div className="socials-container">
          <SocialDivs contentData={contents} />
        </div>
      </div>
    </div>
  );
}

export const ContactHeading = ({ contentData }: ContactHeadingProps) => {
  const title = contentData?.Form?.title;

  if (!title) {
    return <div className="contact-us-heading">Contact Us</div>;
  }

  // Safely parse HTML-like tags
  const titleParts = title?.split(/<([^>]+)>/);

  return (
    <div className="contact-us-heading">
      {titleParts?.[0]}
      {titleParts?.[1] && <span className="jrny-span">{titleParts?.[1]}</span>}
      {titleParts?.[2]}
    </div>
  );
};

export const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

      // Clear status when user starts typing
      if (status) {
        setStatus("");
      }
    },
    [status],
  );

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setStatus("Please enter your name");
      return false;
    }
    if (!formData.email.trim()) {
      setStatus("Please enter your email");
      return false;
    }
    if (!formData.message.trim()) {
      setStatus("Please enter your message");
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm() || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setStatus("Sending...");

    try {
      await axios.post(`api/sendEmail`, formData);
      setStatus("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
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
      <div className="footer-input-div">
        <Textarea
          placeholder="Message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          classList="footer-input form-textarea"
        />
      </div>

      {status && (
        <p
          style={{
            color: status.includes("success") ? "green" : "red",
            margin: "10px 0",
            fontSize: "14px",
          }}
        >
          {status}
        </p>
      )}

      <div className="contact-button-container">
        <Button
          classList="button-white-theme"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          <div className="button-content-animated">
            <span className="send-mail-text">
              {isSubmitting ? "Sending..." : "Send"}
            </span>
            <img src="/arrow-right.png" alt="Send arrow" />
          </div>
        </Button>
      </div>
    </div>
  );
};

export const SocialIcons = () => {
  return (
    <div className="social-icons">
      <img src="/favicon/whatsapp.svg" alt="WhatsApp" />
      <img src="/favicon/linkedin.svg" alt="LinkedIn" />
      <img src="/favicon/instagram.svg" alt="Instagram" />
      <img src="/favicon/facebook.svg" alt="Facebook" />
    </div>
  );
};

export const SocialDivs = ({ contentData }: SocialDivsProps) => {
  const isMobile = useIsMobile();
  const phoneNumbers = contentData?.Form?.PhoneNumber?.split(",") || [];
  const router = useRouter();
  const { content: solution } = useCMSclientContext();

  const handleClick = (location: string) => {
    router.push(`/portfolio?location=${location?.toLocaleLowerCase()}`);
  };

  return (
    <div className={isMobile ? "social-divs-mobile" : "social-divs"}>
      <div className="social-div-container">
        <div className="social-heading">Email</div>
        <div className="social-example">
          {contentData?.Form?.Email || "Not available"}
        </div>
      </div>

      <div className="social-div-container">
        <div className="social-heading">Phone</div>
        {phoneNumbers?.length > 0 ? (
          phoneNumbers?.map((phone: string, i: number) => (
            <div key={i} className="social-example">
              {phone.trim()}
            </div>
          ))
        ) : (
          <div className="social-example">Not available</div>
        )}
      </div>

      <div className="social-div-container">
        <Link href="/solutions">
          <div className="social-heading">Other Solutions</div>
        </Link>
        <div className="social-example">
          {solution &&
            solution.map((item: any, index: number) => (
              <span
                key={index}
                onClick={() => router.push(`solutions/${item.slug}`)}
                style={{ cursor: "pointer" }}
              >
                {item.title}
              </span>
            ))}
        </div>
      </div>

      <div className="social-div-container">
        <div className="social-heading">Location</div>
        <div className="social-example">
          {contentData?.Form?.locations?.length
            ? contentData.Form.locations.map((location, i: number) => (
                <span key={i} onClick={() => handleClick(location.Name)}>
                  {location.Name}
                  {i < (contentData?.Form?.locations?.length ?? 0) - 1 && ", "}
                </span>
              ))
            : "Not available"}
        </div>
      </div>

      <div className="social-div-container">
        <div className="social-heading">Services</div>
        {contentData?.Form?.services?.length ? (
          contentData.Form.services.map((service, i: number) => (
            <div key={i} className="social-example">
              {service?.Title}
            </div>
          ))
        ) : (
          <div className="social-example">Not available</div>
        )}
      </div>
    </div>
  );
};
