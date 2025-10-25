'use client'

import Contact from "../../Contact/Contact";
import ScrollTopButton from "../../ScrollToTop/ScrollToTopButton";
import FooterLine from "./FooterLine";
import './footer.css'

export default function Footer({content}: any) {
  return (
<div className="footer-contact">
  <FooterLine/>
  <Contact contents={content}/>
  <ScrollTopButton />
</div>  )
}
