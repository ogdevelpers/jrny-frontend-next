'use client';

import "../../css/portfolio.css";   
import { useState } from "react";  
import { PortfolioMiddleList } from "./Portfolio";

const PortfolioList = ({ portfolio, sidebarTabs }: { portfolio: any, sidebarTabs: string[] }) => { 
   const [selectedTab, setSelectedTab] = useState(0);

  const portfolioFiltered = selectedTab === 0 ? portfolio : 
  portfolio.filter((item:any) => {
    if (item?.categories) { 
      return item.categories.some((category: any) => category.name === sidebarTabs[selectedTab]);
    }
    return false;
  });

  return (
    <>

      <>
        <div className="portfolio-list-sidebar-container">
          <ul className='portfolio-list-sidebar'>
            {sidebarTabs.map((tab: string, index: number) =>
              <li
                key={index} 
                className={`portfolio-list-sidebar-element `}
              >                    
              <button className={`sidebar-list-tab ${selectedTab === index ? 'sidebar-list-tab-active' : ''}`}                 
              onClick={
                  () => {
                    setSelectedTab(index);
                  }
                }>
                  {" "}
                  {tab}
                </button> 
              </li>
            )
            }
          </ul>
        </div>
      </>
      <PortfolioMiddleList portfolio={portfolioFiltered} />

    </>
  )
}




export default PortfolioList;