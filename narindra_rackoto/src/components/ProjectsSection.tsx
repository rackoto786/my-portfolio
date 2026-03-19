import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Globe, Truck, BarChart3, GraduationCap, Sparkles, X, ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
  {
    icon: Globe,
    title: "Site Web Cryptomonnaie",
    desc: "Plateforme web complète pour le suivi et l'échange de cryptomonnaies avec tableaux de bord temps réel.",
    tags: ["React", "TypeScript", "API"],
    images: [
      { url: "/projects/crypto-home-final.png", title: "Accueil CryptoVue" },
      { url: "/projects/crypto-market-final.png", title: "Marché en Temps Réel" },
      { url: "/projects/crypto-news-final.png", title: "Actualités & Guides" },
      { url: "/projects/crypto-contact-final.png", title: "Centre de Support" },
    ]
  },
  {
    icon: Truck,
    title: "Gestion de Parc Roulant",
    desc: "Application web de gestion et suivi des véhicules d'un parc automobile avec maintenance et rapports.",
    tags: ["Python", "Flask", "PostgreSQL", "React", "TypeScript"],
    images: [
      { url: "/projects/fleet-dash-final.png", title: "Tableau de Bord Flotte" },
      { url: "/projects/fleet-cars-final.png", title: "Gestion des Véhicules" },
      { url: "/projects/fleet-drivers-final.png", title: "Suivi des Chauffeurs" },
      { url: "/projects/fleet-plan-final.png", title: "Planning et Réservations" },
      { url: "/projects/fleet-miss-final.png", title: "Suivi des Missions" },
      { url: "/projects/fleet-fuel-final.png", title: "Gestion Carburant" },
      { url: "/projects/fleet-conf-final.png", title: "Conformité et Échéances" },
      { url: "/projects/fleet-maint-final.png", title: "Maintenance et Réparations" },
      { url: "/projects/fleet-users-final.png", title: "Liste des Utilisateurs" },
      { url: "/projects/fleet-settings-final.png", title: "Paramètres Système" },
    ]
  },
  {
    icon: BarChart3,
    title: "Gestion Logistique",
    desc: "Solution logistique intégrée pour la gestion des stocks, livraisons et chaînes d'approvisionnement.",
    tags: ["Odoo", "Python", "ERP"],
    images: [
      { url: "/projects/log-menu-final.png", title: "Menu Principal Logistique" },
      { url: "/projects/log-dash-final.png", title: "Tableau de Bord de Stock" },
      { url: "/projects/log-articles-final.png", title: "Gestion des Articles" },
      { url: "/projects/log-demandes-final.png", title: "Suivi des Demandes" },
      { url: "/projects/log-sorties-final.png", title: "Gestion des Sorties" },
      { url: "/projects/log-loc-final.png", title: "Emplacements et Capacité" },
      { url: "/projects/log-inv-final.png", title: "Gestion de l'Inventaire" },
      { url: "/projects/log-users-final.png", title: "Administration des Utilisateurs" },
    ]
  },
  {
    icon: GraduationCap,
    title: "Pointage Universitaire Intelligent",
    desc: "Système intelligent de gestion de pointage des étudiants avec reconnaissance et analyses avancées.",
    tags: ["IA", "Python", "React"],
    images: [
      { url: "/projects/edu-dashboard-final.png", title: "Tableau de Bord Académique" },
      { url: "/projects/edu-attendance-final.png", title: "Gestion des Présences" },
      { url: "/projects/edu-deliberation-final.png", title: "Délibération Intelligente" },
    ]
  },
  {
    icon: Sparkles,
    title: "CyberShield",
    desc: "Solution avancée de cybersécurité avec détection de menaces en temps réel et analyse de vulnérabilités.",
    tags: ["Cybersecurity", "AI", "Python"],
    images: [
      { url: "/projects/cyber-monitor-final.png", title: "CyberShield Monitor" },
      { url: "/projects/cyber-threat-final.png", title: "Threat Detection" },
      { url: "/projects/cyber-vuln-final.png", title: "Vulnerability Scanner" },
    ]
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeProject, setActiveProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e) => {
    e.stopPropagation();
    if (activeProject && activeProject.images) {
      setCurrentImageIndex((prev) => (prev + 1) % activeProject.images.length);
    }
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (activeProject && activeProject.images) {
      setCurrentImageIndex((prev) => (prev - 1 + activeProject.images.length) % activeProject.images.length);
    }
  };

  const openCarousel = (project) => {
    if (project.images) {
      setActiveProject(project);
      setCurrentImageIndex(0);
    }
  };

  return (
    <section id="projects" className="section-padding relative">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-heading text-sm tracking-[0.3em] uppercase text-primary mb-2">Portfolio</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold gradient-text">Projets Phares</h2>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <div
              key={project.title}
              onClick={() => openCarousel(project)}
              className="block outline-none"
            >
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`glass rounded-xl p-6 group hover:neon-glow transition-all duration-500 hover:-translate-y-2 cursor-pointer relative overflow-hidden h-full ${project.images ? 'cursor-zoom-in' : ''}`}
              >
                {/* Top glow */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <project.icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground mb-4 leading-relaxed tracking-wide">{project.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-heading bg-primary/10 text-primary border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {project.images && (
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink className="w-4 h-4 text-primary" />
                  </div>
                )}
              </motion.div>
            </div>
          ))}
        </div>

        {/* Carousel Modal */}
        <AnimatePresence>
          {activeProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-8 backdrop-blur-sm"
              onClick={() => setActiveProject(null)}
            >
              <button 
                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-[110]"
                onClick={() => setActiveProject(null)}
              >
                <X className="w-8 h-8" />
              </button>

              <div className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center gap-6" onClick={(e) => e.stopPropagation()}>
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 group bg-slate-900 flex items-center justify-center">
                  <motion.img
                    key={currentImageIndex}
                    src={activeProject.images[currentImageIndex].url}
                    alt={activeProject.images[currentImageIndex].title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full object-contain"
                  />

                  {/* Navigation Buttons */}
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white/70 hover:text-white hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100 border border-white/5 backdrop-blur-sm shadow-xl"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white/70 hover:text-white hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100 border border-white/5 backdrop-blur-sm shadow-xl"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  {/* Progress Indicators */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-[110]">
                    {activeProject.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(i); }}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          currentImageIndex === i ? "bg-primary w-8" : "bg-white/30"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <h4 className="text-xl font-heading font-bold text-white mb-1">
                    {activeProject.images[currentImageIndex].title}
                  </h4>
                  <p className="text-white/50 text-sm">
                    {currentImageIndex + 1} sur {activeProject.images.length}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProjectsSection;
