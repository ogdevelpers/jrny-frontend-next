'use client';
import React from 'react';
import useIsMobile from '@/hooks/useIsMobile';
import Link from 'next/link';
import Footer from '@/components/shared/footer/Footer';
import './OtherSolutions.css';

interface OtherSolutionsProps {
  content?: any;
  contactUs?: any;
}

interface SolutionItem {
  id: number;
  title: string;
  description: string;
  slug?: string;
}

const OtherSolutions: React.FC<OtherSolutionsProps> = ({ content, contactUs }) => {
  const isMobile = useIsMobile(1000);

  // Default solutions data - can be overridden by content prop
  const defaultSolutions: SolutionItem[] = [
    {
      id: 1,
      title: "Anamorphic 3D Content Agency",
      description: "Experience Stunning Anamorphic 3D Content. Transform Screens into Spectacles with Zero Design Studio, a leading Anamorphic Content 3D Agency. At Zero Design Studio, we specialize in creating mind-bending anamorphic 3D content that transforms ordinary screens into extraordinary visual experiences.",
      slug: "/portfolio"
    },
    {
      id: 2,
      title: "Anamorphic Billboard Advertising",
      description: "Anamorphic Billboard Advertising That Turns Mere Spaces into Brand Stories. Make Your Brand a City Landmark With Zero Design Studio's Anamorphic Billboard Advertising solutions. Our innovative approach transforms static billboards into dynamic, eye-catching displays that capture attention and drive engagement.",
      slug: "/portfolio"
    },
    {
      id: 3,
      title: "Anamorphic Video Production",
      description: "Turn Ordinary Screens into Extraordinary Experiences with Anamorphic Video Production. Zero Design Studio's Anamorphic Video Production keeps your audience captivated with stunning visual effects that break the boundaries of traditional video content.",
      slug: "/portfolio"
    }
  ];

  const solutions = content;

  const truncateDescription = (description: string, maxLength: number = 200) => {
    if (!description) return '';
    
    // Remove HTML tags for length calculation
    const textContent = description.replace(/<[^>]*>/g, '');
    
    if (textContent.length <= maxLength) {
      return description;
    }
    
    // Find the last complete word within the limit
    const truncated = textContent.substring(0, maxLength);
    const lastSpaceIndex = truncated.lastIndexOf(' ');
    const finalText = lastSpaceIndex > 0 ? truncated.substring(0, lastSpaceIndex) : truncated;
    
    return finalText + '...';
  };

  const renderTitle = (title: string) => {
    const key = title?.split(/<([^>]+)>/);
    return (
      <div className="solutions-header">
        {key?.[0]} <span className='jrny-span'>{key?.[1]}</span>
      </div>
    );
  };

  return (
    <>
      <div className="solutions-container">
        <div className="solutions-content">
          {/* Header Section */}
          <div className="solutions-header-section">
            <div className="solutions-header-top">
              <div className="solutions-subtitle">
                {content?.subtitle || "Explore our comprehensive solutions portfolio"}
              </div>
              {/* <div className="solutions-studio-info">
                <div className="studio-name">2023-ZERO DESIGN STUDIO</div>
                <div className="share-section">
                  <span>Share</span>
                  <div className="share-icon">
                    <img src="/favicon/facebook.svg" alt="Share on Facebook" />
                  </div>
                </div>
              </div> */}
            </div>
            
            <div className="solutions-main-title">
              {content?.title ? renderTitle(content.title) : "Solutions"}
            </div>
          </div>

          {/* Solutions Cards Section */}
          <div className="solutions-cards-section">
            <div className="solutions-grid">
              {solutions.map((solution: SolutionItem) => (
                <div key={solution.id} className="solution-card">
                    <div className="solution-content">
                      <h3 className="solution-title">{solution.title}</h3>
                      <p className="solution-description" dangerouslySetInnerHTML={{ __html: truncateDescription(solution?.description || '') }}></p>
                      {solution.slug && (
                        <Link href={`/solutions/${solution.slug}`} className="solution-link">
                          Learn more &gt;
                        </Link>
                      )}
                    </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {contactUs && (
        // <div className="solutions-footer">
          <Footer content={contactUs} />
        // </div>
      )}

      </div>
    </>
  );
};

export default OtherSolutions;
