import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Github, Linkedin, MessageCircle, Send, Loader2, Phone } from "lucide-react";
import { toast } from "sonner";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "rackoto786@gmail.com",
    href: "mailto:rackoto786@gmail.com",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/rackoto786",
    href: "https://github.com/rackoto786",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Narindra Rackoto",
    href: "https://www.linkedin.com/in/narindra-rackoto-98222a3a6/",
  },
  {
    icon: Phone,
    label: "Téléphone",
    value: "+261 38 17 070 46",
    href: "tel:+261381707046",
  },
  {
    icon: Phone,
    label: "Téléphone 2",
    value: "+261 32 96 761 12",
    href: "tel:+261329676112",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+261 38 17 070 46",
    href: "https://wa.me/261381707046",
  },
];

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Veuillez remplir tous les champs.");
      return;
    }

    // Utilisation de FormSubmit avec l'ID unique pour plus de sécurité
    const FORM_ENDPOINT = "https://formsubmit.co/ajax/628a504b66adfb4dc112da17bd311ba7";

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: "Nouveau message de votre portfolio",
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Votre message a été envoyé avec succès !");
        console.log("FormSubmit Success:", result);
        setFormData({ name: "", email: "", message: "" });
      } else {
        console.error("FormSubmit Error:", result);
        toast.error("Erreur lors de l'envoi : " + (result.message || "Veuillez réessayer."));
      }
    } catch (error) {
      console.error("Form error:", error);
      toast.error("Une erreur de connexion est survenue.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding relative">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-heading text-sm tracking-[0.3em] uppercase text-primary mb-2">Contactez-moi</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold gradient-text">Contact</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-heading text-xl font-semibold text-foreground mb-4">Narindra Rackoto</h3>
            <p className="font-body text-muted-foreground mb-8">
              Développeur Web & IA basé à Madagascar. N'hésitez pas à me contacter pour discuter de vos projets ou pour toute collaboration.
            </p>
            <div className="flex flex-col gap-3">
              {contactInfo.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass rounded-lg p-4 flex items-center gap-4 text-muted-foreground hover:text-primary transition-all duration-300 hover:neon-glow group"
                >
                  <item.icon className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform text-primary" />
                  <div className="flex flex-col min-w-0">
                    <span className="font-heading text-xs text-muted-foreground uppercase tracking-widest">{item.label}</span>
                    <span className="font-body text-sm text-foreground truncate">{item.value}</span>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="glass rounded-xl p-8 space-y-6">
              <div>
                <label htmlFor="name" className="font-heading text-sm text-foreground mb-2 block">Nom</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-secondary/50 border border-glass-border rounded-lg px-4 py-3 font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <label htmlFor="email" className="font-heading text-sm text-foreground mb-2 block">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-secondary/50 border border-glass-border rounded-lg px-4 py-3 font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  placeholder="votre@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="font-heading text-sm text-foreground mb-2 block">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full bg-secondary/50 border border-glass-border rounded-lg px-4 py-3 font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                  placeholder="Votre message..."
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 rounded-lg font-heading text-sm tracking-wider uppercase bg-primary text-primary-foreground neon-glow hover:scale-[1.02] transition-transform duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                {isSubmitting ? "Envoi en cours..." : "Envoyer"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
