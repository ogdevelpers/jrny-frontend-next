"use client";
import React, { useState } from 'react';
import './faq-accordion.css';

interface FAQItem {
  id?: number;
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  title?: string;
}

const FAQAccordion: React.FC<FAQAccordionProps> = ({ items, title }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="faq-accordion-container">
      {title && <h2 className="faq-accordion-title">{title}</h2>}
      <div className="faq-accordion-list">
        {items.map((item, index) => (
          <div 
            key={item.id || index} 
            className="faq-accordion-item"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <button
              className={`faq-accordion-header ${openIndex === index ? 'open' : ''}`}
              onClick={() => toggleItem(index)}
              aria-expanded={openIndex === index}
              aria-controls={`faq-content-${index}`}
            >
              <h3 className="faq-accordion-question">{item.question}</h3>
              <span className="faq-accordion-icon">
                {openIndex === index ? '−' : '+'}
              </span>
            </button>
            <div
              id={`faq-content-${index}`}
              className={`faq-accordion-content ${openIndex === index ? 'open' : ''}`}
              aria-hidden={openIndex !== index}
            >
              <div 
                className="faq-accordion-answer"
                dangerouslySetInnerHTML={{ __html: item.answer }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQAccordion;

