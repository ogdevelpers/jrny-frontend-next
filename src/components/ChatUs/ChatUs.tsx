import './chatus.css';

interface SocialLink{
    id: number;
  documentId: string;
  name: string;
  link: string;
};

type ChatUsProps = {
  social: SocialLink[];
};
 

const ChatUs = ({social}: ChatUsProps) => {

 
  return (
    <div className="chat-with-us-container">
      <div className="chat-hover-wrapper">
        <button className="chat-with-us-btn">
          <span className="chat-span">Connect With Us</span>
        </button>
        <div className="chat-with-links-section"> 
          {
            social.map( ((socialLink: SocialLink, index: number) => {
              return (  <ChatUsSocialLink key={index} socialLink={socialLink}/>);
            })
            )
          }
        </div>
      </div>
    </div>
  );
};



const ChatUsSocialLink = ({ socialLink}:{  socialLink:SocialLink})=>{
    const snsSmall = socialLink.name.toLowerCase();
    return(
        <a href={socialLink.link} target="_blank" rel="noopener noreferrer">
        <div className="chat-with-link">

        <img src={`/favicon/${snsSmall}.svg`} height='20px' width='20px' /><span>{socialLink.name}</span>
        </div>
        </a>
    )
}
export default ChatUs;
