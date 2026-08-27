import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export interface ProjectData {
  title: string;
  tech: string;
  image: string;
  link?: string;
  description: string;
}

interface ProjectModalProps {
  project: ProjectData | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div 
          className="modal-backdrop" 
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <button className="modal-close" onClick={onClose}>
              &times;
            </button>
            <div className="modal-image-wrapper">
              <img src={project.image} alt={project.title} className="modal-image" />
            </div>
            <div className="modal-body">
              <h2 className="modal-title">{project.title}</h2>
              <p className="modal-tech">{project.tech}</p>
              <div className="modal-desc">
                {project.description.split("\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="modal-link-btn">
                  Visit Site
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
