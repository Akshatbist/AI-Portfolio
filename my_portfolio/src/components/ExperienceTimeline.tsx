import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "./Reveal";

const TIMELINE_DATA = [
  {
    year: "July 2026 – Present",
    title: "Solution Advisor",
    company: "ADT (San Jose, CA)",
    description: "Consults with homeowners and businesses on security, automation, and connected technology. Runs discovery, designs solutions, manages the sales lifecycle, and partners with installation teams on successful deployments.",
  },
  {
    year: "May 2026 – Present",
    title: "Lead Software & AI/ML Engineer",
    company: "Launchline",
    description: "Founded an AI SaaS platform for contractor workflows with production web and iOS apps. Ships RAG, agentic tools, OCR, and real-time voice AI using OpenAI and Twilio Media Streams.",
  },
  {
    year: "Jan 2026 – May 2026",
    title: "Machine Learning Engineer",
    company: "CALSys Lab (Pomona, CA)",
    description: "Built cybersecurity ML pipelines on 50,000+ records for NSF-funded DarkMiner research. Evaluated 12+ model configurations and cut preprocessing time by about 40%.",
  },
  {
    year: "Aug 2023 – Dec 2024",
    title: "ML Engineering Lead",
    company: "Research Team in AI Applications and Implementations (Pomona, CA)",
    description: "Led a 20+ engineer team across LLMs, RAG, computer vision, and reinforcement learning. Mentored 10+ engineers and presented architecture decisions to technical and non-technical stakeholders.",
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
            <Reveal delay={0.05}>
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
