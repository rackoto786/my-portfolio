import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    period: "2025 – Présent",
    title: "Web Development Projects & AI Developer",
    desc: "Développement de projets web avancés et solutions d'intelligence artificielle.",
  },
  {
    period: "2024 – 2025",
    title: "Cybersecurity Training",
    desc: "Formation en cybersécurité, tests de pénétration et sécurité des applications.",
  },
  {
    period: "2023 – 2024",
    title: "Full-Stack Developer",
    desc: "Développement d'applications web complètes avec technologies front-end et back-end.",
  },
  {
    period: "2022 – 2023",
    title: "Website Developer",
    desc: "Création de sites web professionnels et responsifs pour divers clients.",
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="section-padding relative overflow-hidden">
      {/* Floating background glow */}
      <motion.div
        animate={{ x: [0, 20, 0], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 right-0 w-96 h-96 rounded-full bg-primary blur-[130px] pointer-events-none"
      />

      <div className="max-w-4xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={inView ? { opacity: 1, letterSpacing: "0.3em" } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-heading text-sm tracking-[0.3em] uppercase text-primary mb-2"
          >
            Parcours
          </motion.p>
          <h2 className="font-display text-3xl md:text-4xl font-bold gradient-text">Expériences</h2>
        </motion.div>

        <div className="relative">
          {/* Animated timeline line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-primary/40 origin-top"
          />

          {experiences.map((exp, i) => (
            <motion.div
              key={exp.period}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.18, ease: "easeOut" }}
              className={`relative flex items-center mb-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
            >
              {/* Pulsing dot */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10">
                <motion.div
                  animate={{ scale: [1, 1.6, 1], opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                  className="w-5 h-5 rounded-full bg-primary/30 absolute -inset-1"
                />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.18, type: "spring", stiffness: 300 }}
                  className="w-3 h-3 rounded-full bg-primary neon-glow relative"
                />
              </div>

              {/* Experience card */}
              <div className={`ml-12 md:ml-0 md:w-[45%] ${i % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="glass rounded-xl p-6 hover:neon-glow transition-all duration-300 group"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="font-display text-xs text-primary tracking-wider">{exp.period}</span>
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground mt-1 mb-2 group-hover:text-primary transition-colors duration-300">
                    {exp.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground">{exp.desc}</p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
