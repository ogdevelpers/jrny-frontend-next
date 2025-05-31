import Contact from "../../Contact/Contact";
import ScrollTopButton from "../../ScrollToTop/ScrollToTopButton";
import FooterLine from "./FooterLine";
import './footer.css'

export default function Footer() {
  return (
<div className="footer-contact">
  <FooterLine/>
  <Contact />
  <ScrollTopButton />
</div>  )
}
