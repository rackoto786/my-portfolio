import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Brain, Server, Lightbulb } from "lucide-react";

const highlights = [
  { icon: Code2, label: "Développement Web Moderne", desc: "React, TypeScript, Flutter" },
  { icon: Brain, label: "Intelligence Artificielle", desc: "Python, Machine Learning" },
  { icon: Server, label: "Applications de Gestion", desc: "Odoo, Flask, PostgreSQL" },
  { icon: Lightbulb, label: "Solutions Innovantes", desc: "Évolutives & intelligentes" },
];

const stats = [
  { value: "5+", label: "Projets réalisés" },
  { value: "1+", label: "Années d'expérience" },
  { value: "3+", label: "Technologies maîtrisées" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Animated floating background glows */}
      <motion.div
        animate={{ y: [0, -20, 0], opacity: [0.06, 0.12, 0.06] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary blur-[100px] pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, 20, 0], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-primary blur-[120px] pointer-events-none"
      />

      <div className="max-w-6xl mx-auto" ref={ref}>
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
            Qui suis-je
          </motion.p>
          <h2 className="font-display text-3xl md:text-4xl font-bold gradient-text">À propos</h2>
        </motion.div>

        {/* Main content — photo + bio */}
        <div className="grid md:grid-cols-3 gap-12 items-center mb-16">

          {/* ── Profile photo ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, type: "spring", stiffness: 120 }}
            className="flex justify-center"
          >
            <div className="relative w-52 h-52 md:w-64 md:h-64">
              {/* Spinning outer ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-primary/40"
              />
              {/* Static glowing ring */}
              <div className="absolute inset-2 rounded-full ring-2 ring-primary/60 shadow-[0_0_30px_hsl(217_90%_55%/0.4)]" />
              {/* Photo */}
              <img
                src="/profile.png"
                alt="Narindra Rackoto"
                className="absolute inset-3 w-[calc(100%-1.5rem)] h-[calc(100%-1.5rem)] object-cover rounded-full"
              />
              {/* Blue overlay glow */}
              <motion.div
                animate={{ opacity: [0.15, 0.3, 0.15] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-3 rounded-full bg-primary/10 pointer-events-none"
              />
            </div>
          </motion.div>

          {/* ── Bio text ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="md:col-span-2 relative"
          >
            {/* Animated left accent bar */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-full origin-top"
            />
            <div className="pl-6 space-y-4">
              <div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-1">Narindra Rackoto</h3>
                <p className="font-heading text-sm text-primary tracking-widest uppercase">Web Developer · AI Engineer</p>
              </div>
              <p className="font-body text-lg text-muted-foreground leading-relaxed">
                Développeur polyvalent et passionné, je combine expertise en développement web et intelligence artificielle pour créer des solutions numériques qui repoussent les limites du possible.
              </p>
              <p className="font-body text-lg text-muted-foreground leading-relaxed">
                Mon objectif : concevoir des applications modernes, intelligentes et évolutives qui apportent une réelle valeur ajoutée.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Highlight cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {highlights.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              whileHover={{ scale: 1.04, y: -4 }}
              className="glass rounded-xl p-5 hover:neon-glow transition-all duration-300 group cursor-default"
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
              >
                <item.icon className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform duration-300" />
              </motion.div>
              <h3 className="font-heading text-sm font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{item.label}</h3>
              <p className="font-body text-xs text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="grid grid-cols-3 gap-6"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="glass rounded-xl p-6 text-center hover:neon-glow transition-all duration-300"
            >
              <p className="font-display text-3xl font-bold text-primary mb-1">{stat.value}</p>
              <p className="font-heading text-xs text-muted-foreground uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
