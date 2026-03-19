import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skills = [
  { name: "Python", level: 85 },
  { name: "Flask", level: 75 },
  { name: "Odoo 19", level: 70 },
  { name: "React.js", level: 80 },
  { name: "TypeScript", level: 78 },
  { name: "Flutter", level: 65 },
  { name: "PostgreSQL", level: 75 },
  { name: "Git", level: 85 },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      {/* Animated background glow */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary blur-[150px] pointer-events-none"
      />

      <div className="max-w-4xl mx-auto" ref={ref}>
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
            Technologies
          </motion.p>
          <h2 className="font-display text-3xl md:text-4xl font-bold gradient-text">Compétences</h2>
        </motion.div>

        <div className="grid gap-6">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.09 }}
              whileHover={{ x: 6 }}
              className="group"
            >
              <div className="flex justify-between mb-2">
                <motion.span
                  className="font-heading text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  {skill.name}
                </motion.span>
                <motion.span
                  className="font-display text-xs text-primary"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.09 }}
                >
                  {skill.level}%
                </motion.span>
              </div>

              {/* Progress bar track */}
              <div className="h-2.5 rounded-full bg-secondary overflow-hidden relative">
                {/* Animated shimmer on track */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                  transition={{ duration: 1.2, delay: 0.3 + i * 0.09, ease: [0.25, 1, 0.5, 1] }}
                  className="h-full rounded-full bg-primary relative overflow-hidden"
                  style={{ boxShadow: "0 0 12px hsl(217 90% 55% / 0.5)" }}
                >
                  {/* Shimmer sweep */}
                  <motion.div
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 + i * 0.1, ease: "linear" }}
                    className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12"
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
