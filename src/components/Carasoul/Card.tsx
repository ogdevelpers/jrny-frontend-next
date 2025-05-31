 

interface CardProps {
    profileName: string;
    profileDesignation: string;
    compliment: string;
    active?: boolean; 
  }

  
  const Card = ({
    profileName,
    profileDesignation,
    compliment, 
  }: CardProps) => { 
   
 
  
    return (
      <div className="profile-card-container">
        <div
          className={`compliment  `} 
        >
          <span className="compliment-span">{compliment}</span>
          <span className="line line-right" />
          <span className="line line-left" />
        </div>
        <div className="profile-container">
          <div className="profile-infor">
            <span className="profile-name">{profileName}</span>
            <span className="designation">{profileDesignation}</span>
          </div>
        </div>
      </div>
    );
  };
  

export default Card;