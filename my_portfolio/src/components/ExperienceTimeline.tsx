import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "./Reveal";

const TIMELINE_DATA = [
  {
    year: "Oct 2024 - Present",
    title: "Researcher & Developer",
    company: "CalSys Lab",
    description: "Creating a binary classifier for dark web data (target submission: ACM DTRAP Spring 2026). Built a custom web scraper using Selenium and BeautifulSoup to crawl and parse dark web pages.",
  },
  {
    year: "Aug 2025 – Dec 2025",
    title: "Software Engineer",
    company: "Sloka AI (Pomona, CA)",
    description: "Designed RESTful APIs and built Python microservices handling 100s of daily requests. Implemented health checks, monitoring, and CI/CD pipelines to ensure service reliability in a fast-paced environment.",
  },
  {
    year: "Aug 2023 – Dec 2024",
    title: "Research Lead – Software Systems",
    company: "Research Team in AI Applications (Pomona, CA)",
    description: "Led a 20+ engineer team building AI systems and processing pipelines for huge experimental datasets. Established testing standards, coordinated parallel projects, and mentored junior developers.",
  },
  {
    year: "Sep 2023 – Dec 2023",
    title: "Machine Learning Engineer",
    company: "Machine Learning HTGR Project (Pomona, CA)",
    description: "Built data preprocessing pipelines and trained LSTM models for time-series vehicle movement predictions. Systematically validated model accuracy across various experimental setups.",
  }
];

export const ExperienceTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="timeline-container" ref={containerRef}>
      <div className="timeline-line-background">
        <motion.div 
          className="timeline-line-progress" 
          style={{ height: lineHeight }} 
        />
      </div>
      
      <div className="timeline-items">
        {TIMELINE_DATA.map((item, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-dot" />
            <Reveal delay={0.2}>
              <div className="timeline-content minimal-card">
                <span className="timeline-year">{item.year}</span>
                <h3 className="timeline-title">{item.title}</h3>
                <h4 className="timeline-company">{item.company}</h4>
                <p className="timeline-description">{item.description}</p>
              </div>
            </Reveal>
          </div>
        ))}
      </div>
    </div>
  );
};
