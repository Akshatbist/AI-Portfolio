import "./App.css";
import React, { useEffect, useRef, useState } from "react";
import icons from "./icons.tsx";
import resumeBotLogo from "./bot_logo.png";
import acneDetector from "./acneDetector.png";
import ChatbotUI from "./ChatbotUI.tsx";
import profilepic from "./profile_pic.jpg";
import quantHub from "./QuantHub.png";
import { useForm, ValidationError } from "@formspree/react";

const formKey = import.meta.env.VITE_FORM_URL;

//TODO: LAST CHANGE make everything look like its been scaled to 80%.

function ContactForm() {
  const [state, handleSubmit] = useForm(formKey);
  const formRef = useRef(null);
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
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Your email"
            required
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} />

          <input id="phone" type="tel" name="phone" placeholder="Your number" />
          <ValidationError prefix="Phone" field="phone" errors={state.errors} />

          <input id="subject" name="subject" placeholder="Subject" required />
          <ValidationError
            prefix="Subject"
            field="subject"
            errors={state.errors}
          />

          <textarea
            id="message"
            name="message"
            placeholder="Your message"
            required
          />
          <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
          />

          <button type="submit" disabled={state.submitting}>
            {state.submitting ? "Sending..." : "Send"}
          </button>
        </>
      )}
    </form>
  );
}

const Section = ({ id, children, className = "" }) => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          ref.current.classList.add("fade-in");
        } else {
          ref.current.classList.remove("fade-in");
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <section id={id} ref={ref} className={`section hidden ${className}`}>
      {children}
    </section>
  );
};

const App = () => {
  useEffect(() => {
    document.querySelectorAll(".star").forEach((el) => {
      const top = Math.random();
      const left = Math.random();
      const speed = 8 + Math.random() * 12;
      const delay = -Math.random() * speed;
      const driftX = (Math.random() - 0.5) * 300;
      const driftY = (Math.random() - 0.5) * 300;

      el.setAttribute(
        "style",
        `
          --rand-top: ${top};
          --rand-left: ${left};
          --rand-speed: ${speed}s;
          --rand-delay: ${delay}s;
          --drift-x: ${driftX}px;
          --drift-y: ${driftY}px;
        `
      );
    });
  }, []);

  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive((prev) => !prev);
  };

  return (
    <>
      <div className="app">
        <div className="stars-overlay">
          {Array.from({ length: 150 }).map((_, i) => (
            <div key={i} className="star" />
          ))}
        </div>
        <header className="sticky-header">
          <div className="logo-gradient_h2">Akshat Bist</div>

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
            <a href="#home" onClick={() => setMenuActive(false)}>
              Home
            </a>
            <a href="#about" onClick={() => setMenuActive(false)}>
              About
            </a>
            <a href="#projects" onClick={() => setMenuActive(false)}>
              Projects
            </a>
            <a href="#contact" onClick={() => setMenuActive(false)}>
              Contact
            </a>
            <div className="line"></div>
          </nav>
        </header>
        <ChatbotUI />
        <Section id="home" className="hero-section">
          <div className="hero">
            <h1 className="hero-title">Akshat Bist</h1>
            <p className="hero-subtitle">AI/ML & Software Engineer</p>
            <div className="social-buttons">
              <a
                href="https://github.com/Akshatbist"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="button-style">
                  <img
                    src={icons.githubIcon}
                    alt="GitHub Icon"
                    className="icon"
                  />
                </button>
              </a>
              <a
                href="https://www.linkedin.com/in/akshat-bist-ba151224a/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="button-style">
                  <img
                    src={icons.linkedinIcon}
                    alt="LinkedIn Icon"
                    className="icon"
                  />
                </button>
              </a>
              <a href="mailto:abist@cpp.edu">
                <button className="button-style">
                  <img
                    src={icons.emailIcon}
                    alt="Email Icon"
                    className="icon"
                  />
                </button>
              </a>
            </div>
          </div>
        </Section>
        <Section id="about" className="about_me_section">
          <div className="about_me_container">
            <h2 className="about_me_title">About Me</h2>
            <div className="about_me_image_wrapper">
              <img
                src={profilepic}
                alt="Akshat Bist"
                className="about_me_image"
              />
            </div>
            <div className="about_me_text">
              <div className="about_me_bio_box">
                <p>
                  I’m a developer at Cal Poly Pomona, graduating in May 2026,
                  passionate about the intersection of
                  <strong> Business </strong> and
                  <strong> Computer Science</strong> — where innovation meets
                  real-world impact. I build purposeful software that solves
                  problems, streamlines workflows, and delivers meaningful
                  value. With a strong blend of technical expertise and business
                  acumen, I craft solutions that are not just functional, but
                  transformative.
                </p>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="tech-section-wrapper">
              <div className="tech-stack-grid">
                {/* Languages */}
                <div className="tech-card">
                  <h3>💻 Languages</h3>
                  <div className="tech-icons">
                    {[
                      { icon: icons.pythonIcon, name: "Python" },
                      { icon: icons.javaIcon, name: "Java" },
                      { icon: icons.azuresqlIcon, name: "SQL" },
                      { icon: icons.html5Icon, name: "HTML" },
                      { icon: icons.css3Icon, name: "CSS" },
                      { icon: icons.javascriptIcon, name: "JavaScript" },
                    ].map((item, i) => (
                      <div className="tooltip" key={i}>
                        <img src={item.icon} alt={`${item.name} Icon`} />
                        <span className="tooltiptext">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Frameworks */}
                <div className="tech-card">
                  <h3>⚙️ Frameworks</h3>
                  <div className="tech-icons">
                    {[
                      { icon: icons.reactIcon, name: "React" },
                      { icon: icons.fastapiIcon, name: "FastAPI" },

                      { icon: icons.tensorflowIcon, name: "TensorFlow" },
                      { icon: icons.pytorchIcon, name: "PyTorch" },
                    ].map((item, i) => (
                      <div className="tooltip" key={i}>
                        <img src={item.icon} alt={`${item.name} Icon`} />
                        <span className="tooltiptext">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tools */}
                <div className="tech-card tools-card">
                  <h3>🛠️ Tools</h3>
                  <div className="tech-icons">
                    {[
                      { icon: icons.mongodbIcon, name: "MongoDB" },
                      { icon: icons.supabaseIcon, name: "Supabase" },
                      { icon: icons.azureIcon, name: "Azure" },
                      { icon: icons.awsicon, name: "AWS" },
                      { icon: icons.vitelogo, name: "Vite" },
                      { icon: icons.huggingfaceicon, name: "Hugging Face" },
                    ].map((item, i) => (
                      <div className="tooltip" key={i}>
                        <img src={item.icon} alt={`${item.name} Icon`} />
                        <span className="tooltiptext">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>{" "}
        <Section id="projects" className="project_section">
          <div className="project_container">
            <h2 className="section-title">Projects</h2>
            <div className="project-cards">
              <div className="project-card">
                <a
                  href="https://quant-hub-gold.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="project-card-inner">
                    <img
                      src={quantHub}
                      alt="QuantHub"
                      className="project-thumbnail"
                    />
                    <div className="project-overlay">
                      <h3>QuantHub</h3>
                      <p>SupaBase, React, Vercel, Systems Design</p>
                    </div>
                  </div>
                </a>
              </div>
              <div className="project-card">
                <a
                  href="https://github.com/Akshatbist/JobApplicationAutofillBot"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="project-card-inner">
                    <img
                      src={resumeBotLogo}
                      alt="Resume Bot"
                      className="project-thumbnail"
                    />
                    <div className="project-overlay">
                      <h3>Resume Bot</h3>
                      <p>AI Integration, FastAPI, OpenAI API, Selenium</p>
                    </div>
                  </div>
                </a>
              </div>
              <div className="project-card">
                <a
                  href="https://github.com/Akshatbist/Acne_Detector"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="project-card-inner">
                    <img
                      src={acneDetector}
                      alt="Acne Detector"
                      className="project-thumbnail"
                    />
                    <div className="project-overlay">
                      <h3>Acne Detector</h3>
                      <p>YOLOv8, React, FastAPI, Model Optimization</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </Section>
        <Section id="contact" className="contact_section">
          <div className="contact-container">
            <h2 className="contact-title">Contact</h2>
            <div className="contact-info">
              <p>
                <strong>Email:</strong> akshatbist04@gmail.com
              </p>
              <p>
                <strong>Phone:</strong> +1 (510)-513-1854
              </p>
              <p>
                <strong>Location:</strong> California
              </p>
            </div>
            <ContactForm />
          </div>
        </Section>
      </div>
    </>
  );
};

export default App;
