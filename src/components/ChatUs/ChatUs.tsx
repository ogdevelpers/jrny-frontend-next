import './chatus.css';

const ChatUs = () => {
  return (
    <div className="chat-with-us-container">
      <div className="chat-hover-wrapper">
        <button className="chat-with-us-btn">
          <span className="chat-span">Connect With Us</span>
        </button>
        <div className="chat-with-links-section">
          <ChatUsSocialLink sns='Facebook'/>
          <ChatUsSocialLink sns='Instagram'/>
          <ChatUsSocialLink sns='Youtube'/>
          <ChatUsSocialLink sns='LinkedIn'/>
          <ChatUsSocialLink sns='Whatsapp'/> 
        </div>
      </div>
    </div>
  );
};



const ChatUsSocialLink = ({sns}:{sns:string})=>{
    const snsSmall = sns.toLowerCase();
    return(
        <div className="chat-with-link">
        <img src={`/favicon/${snsSmall}.svg`} height='20px' width='20px' /><span>{sns}</span>
        </div>
    )
}
export default ChatUs;
