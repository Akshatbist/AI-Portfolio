import "./App.css";
import { useEffect, useRef, useState } from "react";
import icons from "./icons.tsx";
import acneDetector from "./acneDetector.png";
import launchlinePic from "./launchline.png";
import sidekickPic from "./sidekick.png";
import ChatbotUI from "./ChatbotUI";
import Magnetic from "./components/Magnetic";
import { Reveal } from "./components/Reveal";
import { ScrambleText } from "./components/ScrambleText";
import { ExperienceTimeline } from "./components/ExperienceTimeline";
import { ProjectModal } from "./components/ProjectModal";
import type { ProjectData } from "./components/ProjectModal";
import { NotFound } from "./components/NotFound";
import profilepic from "./profile_pic.jpg";
import { useForm, ValidationError } from "@formspree/react";
import resume from "./Akshat_Resume.pdf";
import pokerpic from "./pokerAI.png";

const formKey = import.meta.env.VITE_FORM_URL;

const PROJECTS_DATA: ProjectData[] = [
  {
    title: "Launchline",
    tech: "OpenAI, RAG, Twilio, Vector Search, iOS",
    image: launchlinePic,
    link: "https://launchline.us",
    description: "AI-powered SaaS for contractor workflows, with production web and iOS apps. Customer-facing assistants use OpenAI APIs, RAG, vector search, and plan-execute-repair agents across 10+ tools and 25+ operations. Real-time voice is wired through Twilio Media Streams and the OpenAI Realtime API, with OCR pipelines that turn customer documents into structured business data."
  },
  {
    title: "Sidekick",
    tech: "Next.js, TypeScript, Python, PostgreSQL, Supabase, Twilio, OpenAI",
    image: sidekickPic,
    link: "https://www.sidekickio.com/",
    description: "Full-stack AI sales platform that reads customer conversations, extracts intent, objections, and commitments, then automates next-best follow-ups. Twilio SMS covers scheduled outreach, delivery tracking, and opt-out. Multi-tenant architecture includes auth, role-based access, lead management, conversation history, and consent evidence for auditable messaging."
  },
  {
    title: "AI Poker Bot",
    tech: "Modular Python, Counterfactual Regret Minimization",
    image: pokerpic,
    link: "https://github.com/Akshatbist/AIPokerBot",
    description: "Developed a Poker AI agent capable of playing Heads-Up No-Limit Texas Hold'em. Utilized Counterfactual Regret Minimization algorithms iteratively trained for weeks to approximate Nash Equilibrium strategies."
  },
  {
    title: "Acne Detector",
    tech: "YOLOv8, React, FastAPI, Model Optimization",
    image: acneDetector,
    link: "https://github.com/Akshatbist/Acne_Detector",
    description: "A machine-vision platform leveraging a custom-trained YOLOv8 object detection model to identify and classify acne types from user facial images. Features a React frontend and FastAPI backend."
  }
];

function ContactForm() {
  const [state, handleSubmit] = useForm(formKey);
  const formRef = useRef<HTMLFormElement>(null);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (state.succeeded && formRef.current) {
      formRef.current.reset();
      setShowMessage(true);
      const timer = setTimeout(() => setShowMessage(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [state.succeeded]);

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
      {showMessage && <p className="success-msg">Message Sent!</p>}

      {!showMessage && (
        <>
          <div className="input-group">
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Your email"
              required
            />
            <span className="input-highlight"></span>
            <ValidationError prefix="Email" field="email" errors={state.errors} />
          </div>

          <div className="input-group">
            <input id="phone" type="tel" name="phone" placeholder="Your number" />
            <span className="input-highlight"></span>
            <ValidationError prefix="Phone" field="phone" errors={state.errors} />
          </div>

          <div className="input-group">
            <input id="subject" name="subject" placeholder="Subject" required />
            <span className="input-highlight"></span>
            <ValidationError
              prefix="Subject"
              field="subject"
              errors={state.errors}
            />
          </div>

          <div className="input-group">
            <textarea
              id="message"
              name="message"
              placeholder="Your message"
              required
            />
            <span className="input-highlight"></span>
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />
          </div>

          <button type="submit" disabled={state.submitting}>
            {state.submitting ? "Sending..." : "Send"}
          </button>
        </>
      )}
    </form>
  );
}

interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ id, children, className = "" }) => {
  return (
    <section id={id} className={`section ${className}`}>
      {children}
    </section>
  );
};

const App = () => {
  const path = window.location.pathname;

  if (path !== "/") {
    return <NotFound />;
  }



  const [menuActive, setMenuActive] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 } // Trigger when 30% of the section is visible
    );

    const sections = document.querySelectorAll("section");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const toggleMenu = () => {
    setMenuActive((prev) => !prev);
  };

  const scrollTo = (id: string) => {
    setMenuActive(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="app">
        <div className="noise-overlay"></div>
        <div className="ambient-orb orb-1"></div>
        <div className="ambient-orb orb-2"></div>
        <header className="sticky-header">
          <div className="nav-logo">[ AB ]</div>

          <button
            className="menu-toggle"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            <img
              src={icons.burgericon}
              alt="Menu Icon"
              className="burger-icon"
            />
          </button>

          {/* Responsive Navigation Menu */}
          <nav className={`navbar ${menuActive ? "active" : ""}`}>
            <Magnetic>
              <a
                href="#home"
                onClick={(e) => { e.preventDefault(); scrollTo("home"); }}
                className={activeSection === "home" ? "active-link" : ""}
              >
                Home
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#about"
                onClick={(e) => { e.preventDefault(); scrollTo("about"); }}
                className={activeSection === "about" ? "active-link" : ""}
              >
                About
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#projects"
                onClick={(e) => { e.preventDefault(); scrollTo("projects"); }}
                className={activeSection === "projects" ? "active-link" : ""}
              >
                Projects
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#skills"
                onClick={(e) => { e.preventDefault(); scrollTo("skills"); }}
                className={activeSection === "skills" ? "active-link" : ""}
              >
                Skills
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}
                className={activeSection === "contact" ? "active-link" : ""}
              >
                Contact
              </a>
            </Magnetic>
            <div className="line"></div>
          </nav>
        </header>
        <ChatbotUI />
        <Section id="home" className="hero-section">
          <div className="minimal-hero">
            <h1 className="minimal-title">
              <ScrambleText text="AKSHAT BIST" delay={0.2} />
            </h1>
            <p className="minimal-subtitle">AI Solutions Engineer</p>
            <div className="minimal-socials">
              <Magnetic>
                <a href="https://github.com/Akshatbist" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <img src={icons.githubIcon} alt="" className="minimal-icon" />
                </a>
              </Magnetic>
              <Magnetic>
                <a href="https://www.linkedin.com/in/akshat-bist-ba151224a/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <img src={icons.linkedinIcon} alt="" className="minimal-icon" />
                </a>
              </Magnetic>
              <Magnetic>
                <a href="mailto:abist@cpp.edu" aria-label="Email">
                  <img src={icons.emailIcon} alt="" className="minimal-icon" />
                </a>
              </Magnetic>
              <Magnetic>
                <a href={resume} target="_blank" rel="noopener noreferrer" aria-label="Resume">
                  <img src={icons.resumelogo} alt="" className="minimal-icon" />
                </a>
              </Magnetic>
            </div>
          </div>
        </Section>
        <Section id="about" className="about_me_section">
          <div className="about_me_container">
            <h2 className="about_me_title">About Me</h2>
            <div className="editorial-bio-spread">
              <Reveal>
                <div className="editorial-content">
                  <div className="editorial-image-wrapper">
                    <img
                      src={profilepic}
                      alt="Akshat Bist"
                      className="editorial-image"
                    />
                  </div>
                  <div className="editorial-text">
                    <h3 className="editorial-greeting">AI Solutions Engineer</h3>
                    <p className="editorial-paragraph">
                      I design and ship customer-facing AI systems, from contractor workflow assistants at <strong>Launchline</strong> to conversation intelligence in <strong>Sidekick</strong>. My work spans RAG, real-time voice, agentic tools, and consultative solution design. I focus on turning messy operational problems into production software people can actually use.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            <ExperienceTimeline />

          </div>
        </Section>

        {/* Projects Section */}
        <Section id="projects" className="project_section">
          <div className="project_container">
            <h2 className="section-title">Projects</h2>
            <div className="project-cards">
              {PROJECTS_DATA.map((project, idx) => (
                <Reveal delay={0.05 * (idx + 1)} key={project.title}>
                  <div 
                    className="project-card minimal-card" 
                    onClick={() => setSelectedProject(project)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="minimal-card-inner">
                      <img src={project.image} alt={project.title} className="minimal-thumbnail" />
                      <div className="minimal-overlay">
                        <h3>{project.title}</h3>
                        <p>{project.tech}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Section>

        {/* Skills / Tech Stack Section */}
        <Section id="skills" className="skills_section">
          <div className="skills_container" style={{ paddingTop: "80px" }}>
            <h2 className="section-title" style={{ textAlign: "center", marginBottom: "40px" }}>Core Expertise</h2>
            <div className="tech-section-wrapper">
              <div className="skills-list-container">
                {/* Languages */}
                <Reveal delay={0.05}>
                  <div className="skills-row">
                    <h3 className="skills-category">Languages</h3>
                    <div className="skills-icons-row">
                      {[
                        { icon: icons.pythonIcon, name: "Python" },
                        { icon: icons.javaIcon, name: "Java" },
                        { icon: icons.azuresqlIcon, name: "SQL" },
                        { icon: icons.html5Icon, name: "HTML" },
                        { icon: icons.css3Icon, name: "CSS" },
                        { icon: icons.javascriptIcon, name: "JavaScript" },
                      ].map((item, i) => (
                        <div className="tooltip skill-mono-icon" key={`lang-${i}`}>
                          <img src={item.icon} alt={`${item.name} Icon`} />
                          <span className="tooltiptext">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>

                {/* Frameworks */}
                <Reveal delay={0.1}>
                  <div className="skills-row">
                    <h3 className="skills-category">Frameworks</h3>
                    <div className="skills-icons-row">
                      {[
                        { icon: icons.reactIcon, name: "React" },
                        { icon: icons.fastapiIcon, name: "FastAPI" },
                        { icon: icons.tensorflowIcon, name: "TensorFlow" },
                        { icon: icons.pytorchIcon, name: "PyTorch" },
                      ].map((item, i) => (
                        <div className="tooltip skill-mono-icon" key={`fw-${i}`}>
                          <img src={item.icon} alt={`${item.name} Icon`} />
                          <span className="tooltiptext">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>

                {/* Tools */}
                <Reveal delay={0.15}>
                  <div className="skills-row">
                    <h3 className="skills-category">Tools</h3>
                    <div className="skills-icons-row">
                      {[
                        { icon: icons.mongodbIcon, name: "MongoDB" },
                        { icon: icons.supabaseIcon, name: "Supabase" },
                        { icon: icons.azureIcon, name: "Azure" },
                        { icon: icons.awsicon, name: "AWS" },
                        { icon: icons.vitelogo, name: "Vite" },
                        { icon: icons.huggingfaceicon, name: "Hugging Face" },
                      ].map((item, i) => (
                        <div className="tooltip skill-mono-icon" key={`tool-${i}`}>
                          <img src={item.icon} alt={`${item.name} Icon`} />
                          <span className="tooltiptext">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </Section>
        <Section id="contact" className="contact_section">
          <div className="contact-container">
            <h2 className="contact-title">Contact</h2>
            <div className="contact-info">
              <p>
                <strong>Citizen:</strong> US Citizen
              </p>
              <p>
                <strong>Email:</strong> <a href="mailto:akshatbist04@gmail.com" className="contact-link">akshatbist04@gmail.com</a>
              </p>
              <p>
                <strong>Phone:</strong> <a href="tel:+15105131854" className="contact-link">+1 (510)-513-1854</a>
              </p>
              <p>
                <strong>Location:</strong> California
              </p>
            </div>
            <ContactForm />
          </div>
        </Section>
        
        <footer className="minimal-footer">
          <p>© {new Date().getFullYear()} Akshat Bist. Engineered in California.</p>
        </footer>
      </div>
      <ProjectModal 
        project={selectedProject} 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </>
  );
};

export default App;
