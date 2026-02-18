import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageSquare, Mail, Linkedin, Instagram, Globe, Copy, CheckCheck, ExternalLink } from 'lucide-react';

const contactDetails = [
  {
    icon: Phone,
    text: "+91 85954 67431",
    link: "tel:+918595467431",
    label: "Call Us",
    color: "#22d3ee",
    copyable: "+91 85954 67431",
  },
  {
    icon: MessageSquare,
    text: "WhatsApp Us",
    link: "https://wa.me/918595467431",
    label: "Chat on WhatsApp",
    color: "#34d399",
    badge: "Usually replies in minutes",
  },
  {
    icon: Mail,
    text: "cs@arogyalens.com",
    link: "mailto:cs@arogyalens.com",
    label: "Email Us",
    color: "#a78bfa",
    copyable: "cs@arogyalens.com",
  },
  {
    icon: Globe,
    text: "www.arogyalens.com",
    link: "https://www.arogyalens.com",
    label: "Visit Website",
    color: "#f59e0b",
  },
];

const socialLinks = [
  { icon: Instagram, name: "Instagram", link: "https://link.arogyalens.com", color: "#f43f5e" },
  { icon: Linkedin,  name: "LinkedIn",  link: "https://link.arogyalens.com", color: "#22d3ee" },
];

// ── Copy button ───────────────────────────────────────────────────────────────
const CopyBtn = ({ text, color }) => {
  const [copied, setCopied] = useState(false);

  const handle = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <motion.button
      onClick={(e) => { e.preventDefault(); handle(); }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.88 }}
      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
      className="ml-1.5 p-1.5 rounded-lg flex-shrink-0"
      style={{
        background: copied ? color + '20' : 'rgba(255,255,255,0.05)',
        border: `1px solid ${copied ? color + '40' : 'rgba(255,255,255,0.1)'}`,
      }}
      title="Copy"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={copied ? 'check' : 'copy'}
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 20 }}
          transition={{ type: 'spring', stiffness: 280, damping: 18 }}
        >
          {copied
            ? <CheckCheck className="w-3.5 h-3.5" style={{ color }} />
            : <Copy className="w-3.5 h-3.5 text-gray-500" />
          }
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
};

// ── Contact card ──────────────────────────────────────────────────────────────
const ContactCard = ({ item, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.15 + index * 0.1, type: 'spring', stiffness: 120, damping: 18 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="relative flex items-center gap-4 p-5 rounded-2xl overflow-hidden group"
    >
      {/* Bg layers */}
      <div className="absolute inset-0 rounded-2xl bg-dark-primary" />
      <motion.div
        className="absolute inset-0 rounded-2xl"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{ background: `linear-gradient(135deg, ${item.color}0d, transparent)` }}
      />

      {/* Border glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={hovered
          ? { boxShadow: `0 0 0 1.5px ${item.color}55, 0 10px 35px ${item.color}12` }
          : { boxShadow: '0 0 0 1px rgba(255,255,255,0.07)' }
        }
        transition={{ duration: 0.28, ease: 'easeOut' }}
      />

      {/* Left accent bar */}
      <motion.div
        className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full"
        style={{ background: item.color }}
        animate={{ opacity: hovered ? 1 : 0, scaleY: hovered ? 1 : 0 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
      />

      {/* Shimmer */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
        <motion.div
          className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.025] to-transparent"
          animate={hovered ? { x: ['-100%', '200%'] } : { x: '-100%' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        />
      </div>

      {/* Icon */}
      <motion.div
        animate={hovered ? { scale: 1.12, rotate: -8, y: -2 } : { scale: 1, rotate: 0, y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        className="relative flex-shrink-0 p-3 rounded-xl z-10"
        style={{ background: item.color + '18', border: `1px solid ${item.color}30` }}
      >
        <motion.div
          className="absolute inset-0 rounded-xl blur-md"
          style={{ background: item.color + '25' }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        <item.icon className="w-5 h-5 relative z-10 transition-colors duration-200" style={{ color: hovered ? item.color : '#94a3b8' }} />
      </motion.div>

      {/* Text */}
      <div className="relative z-10 flex-1 min-w-0">
        <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-0.5">{item.label}</p>
        <div className="flex items-center gap-1 flex-wrap">
          <motion.span
            className="text-base font-semibold transition-colors duration-200 truncate"
            style={{ color: hovered ? item.color : '#e2e8f0' }}
          >
            {item.text}
          </motion.span>
          {item.copyable && <CopyBtn text={item.copyable} color={item.color} />}
          {!item.copyable && (
            <motion.div
              animate={hovered ? { x: 3, opacity: 1 } : { x: 0, opacity: 0.4 }}
              transition={{ duration: 0.2 }}
            >
              <ExternalLink className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            </motion.div>
          )}
        </div>
        {item.badge && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 1 : 0.5 }}
            transition={{ duration: 0.2 }}
            className="text-xs font-medium mt-0.5 block"
            style={{ color: item.color + 'aa' }}
          >
            {item.badge}
          </motion.span>
        )}
      </div>
    </motion.a>
  );
};

// ── Social button ─────────────────────────────────────────────────────────────
const SocialBtn = ({ social, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={social.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={social.name}
      initial={{ opacity: 0, scale: 0.7 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.5 + index * 0.1, type: 'spring', stiffness: 200 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.12, y: -4 }}
      whileTap={{ scale: 0.9 }}
      className="relative flex items-center gap-3 px-5 py-3 rounded-2xl overflow-hidden"
      style={{
        background: hovered ? social.color + '18' : 'rgba(255,255,255,0.04)',
        border: `1px solid ${hovered ? social.color + '50' : 'rgba(255,255,255,0.08)'}`,
      }}
    >
      {/* Icon glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl blur-md"
        style={{ background: social.color + '18' }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        animate={hovered ? { rotate: -10, scale: 1.15 } : { rotate: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        className="relative z-10"
      >
        <social.icon className="h-5 w-5 transition-colors duration-200" style={{ color: hovered ? social.color : '#64748b' }} />
      </motion.div>
      <motion.span
        className="relative z-10 text-sm font-semibold transition-colors duration-200"
        style={{ color: hovered ? social.color : '#94a3b8' }}
      >
        {social.name}
      </motion.span>
    </motion.a>
  );
};

// ── Main ──────────────────────────────────────────────────────────────────────
const Contact = () => {
  return (
    <section id="contact" className="section-padding bg-dark-primary relative overflow-hidden">

      {/* Background */}
      {[
        { color: '#22d3ee', x: '5%',  y: '10%', size: 350, delay: 0 },
        { color: '#a78bfa', x: '70%', y: '20%', size: 300, delay: 3 },
        { color: '#34d399', x: '40%', y: '70%', size: 250, delay: 6 },
      ].map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none blur-3xl opacity-[0.07]"
          style={{ background: orb.color, width: orb.size, height: orb.size, left: orb.x, top: orb.y }}
          animate={{ scale: [1, 1.2, 1], x: [0, 20, 0], y: [0, -15, 0] }}
          transition={{ duration: 10 + orb.delay, repeat: Infinity, ease: 'easeInOut', delay: orb.delay }}
        />
      ))}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

      {/* Scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/15 to-transparent pointer-events-none"
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'linear' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-14 space-y-5"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 150 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-semibold"
          >
            <motion.span
              animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.4, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-cyan-400 inline-block"
            />
            We'd Love to Hear from You
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-gradient">
            Get In Touch
          </h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mx-auto h-px w-28 bg-gradient-to-r from-transparent via-cyan-400 to-transparent origin-center"
          />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            For clinics, partnerships, or any inquiries — we're right here.
          </motion.p>
        </motion.div>

        {/* ── Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, type: 'spring', stiffness: 90, damping: 18 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Outer breathing glow */}
          <motion.div
            className="absolute -inset-1 rounded-3xl blur-xl pointer-events-none"
            style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.1), rgba(167,139,250,0.07))' }}
            animate={{ opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="relative bg-dark-secondary rounded-3xl overflow-hidden">

            {/* Pulsing border */}
            <motion.div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              animate={{
                boxShadow: [
                  '0 0 0 1px rgba(34,211,238,0.2)',
                  '0 0 0 1.5px rgba(34,211,238,0.45)',
                  '0 0 0 1px rgba(34,211,238,0.2)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Top gradient bar */}
            <div className="h-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500" />

            {/* Shimmer sweep */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
              <motion.div
                className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.025] to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 4, repeat: Infinity, repeatDelay: 10, ease: 'easeInOut' }}
              />
            </div>

            <div className="relative z-10 p-8 md:p-12">

              {/* ── Contact grid ── */}
              <div className="grid md:grid-cols-2 gap-4 mb-10">
                {contactDetails.map((item, index) => (
                  <ContactCard key={index} item={item} index={index} />
                ))}
              </div>

              {/* ── Divider ── */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8 origin-center"
              />

              {/* ── Social row ── */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.45 }}
                  className="text-sm font-semibold text-gray-400 uppercase tracking-widest"
                >
                  Follow us
                </motion.p>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <SocialBtn key={index} social={social} index={index} />
                  ))}
                </div>
              </div>

              {/* ── Availability note ── */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.65 }}
                className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-500"
              >
                {['📞 Mon–Sat, 9am–7pm IST', '💬 WhatsApp replies in minutes', '📧 Email response within 48hrs'].map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;