import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building,
  Stethoscope,
  UserCheck,
  CheckCircle,
  ArrowRight,
  X,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// ── Data ──────────────────────────────────────────────────────────────────────
const clinicFeatures = [
  "EMR, OPD/IPD, and billing workflow automation",
  "Facial recognition staff logins",
  "Inventory and pharmacy tracking",
  "HR Dashboard with role-based access",
  "Burnout and violence alert system",
  "Cloud-hosted on AWS with enterprise-grade security",
];

const doctorFeatures = [
  "Smart queue and clinical note management",
  "Burnout and wellness self-assessments",
  "Automated work-hour tracking",
  "₹999 personal profile website option",
];

const adminFeatures = [
  "Appointment scheduling and patient onboarding",
  "Digital invoices and payment management",
  "Attendance and feedback tools",
];

const cardData = [
  {
    icon: Building,
    title: "For Clinics & Hospitals",
    features: clinicFeatures,
    color: "#22d3ee",
    glow: "rgba(34,211,238,0.12)",
    gradient: "from-cyan-500/10 via-transparent to-transparent",
    tag: "Most Popular",
    emoji: "🏥",
  },
  {
    icon: Stethoscope,
    title: "For Doctors",
    features: doctorFeatures,
    color: "#a78bfa",
    glow: "rgba(167,139,250,0.12)",
    gradient: "from-violet-500/10 via-transparent to-transparent",
    tag: "Doctor First",
    emoji: "👨‍⚕️",
  },
  {
    icon: UserCheck,
    title: "For Reception & Admin",
    features: adminFeatures,
    color: "#34d399",
    glow: "rgba(52,211,153,0.12)",
    gradient: "from-emerald-500/10 via-transparent to-transparent",
    tag: "Saves Hours Daily",
    emoji: "🗂️",
  },
];

// ── Feature list item ─────────────────────────────────────────────────────────
const FeatureItem = ({ text, color, index }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.li
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.15 + index * 0.07, duration: 0.4 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-start gap-3 group cursor-default"
    >
      <motion.div
        animate={hovered ? { scale: 1.25, rotate: 10 } : { scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="mt-0.5 flex-shrink-0"
      >
        <CheckCircle className="h-5 w-5 transition-colors duration-200" style={{ color: hovered ? color : '#94a3b8' }} />
      </motion.div>
      <motion.span
        className="text-base leading-relaxed transition-colors duration-200"
        style={{ color: hovered ? '#f1f5f9' : '#94a3b8' }}
      >
        {text}
      </motion.span>
    </motion.li>
  );
};

// ── Feature card ──────────────────────────────────────────────────────────────
const FeatureCard = ({ card, index }) => {
  const [hovered, setHovered] = useState(false);
  const IconComponent = card.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.93 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, delay: index * 0.15, type: 'spring', stiffness: 100 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col h-full rounded-2xl overflow-hidden cursor-default"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-dark-secondary" />
      <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient}`} />

      {/* Animated border glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={hovered
          ? { boxShadow: `0 0 0 1.5px ${card.color}60, 0 16px 60px ${card.glow}` }
          : { boxShadow: '0 0 0 1px rgba(255,255,255,0.07)' }
        }
        transition={{ duration: 0.35 }}
      />

      {/* Top accent bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: `linear-gradient(90deg, transparent, ${card.color}, transparent)` }}
        animate={{ opacity: hovered ? 1 : 0.3 }}
        transition={{ duration: 0.3 }}
      />

      {/* Shimmer on hover */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
        <motion.div
          className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/4 to-transparent"
          animate={hovered ? { x: ['−100%', '200%'] } : { x: '-100%' }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 p-8 flex flex-col h-full">

        {/* Tag badge */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + index * 0.15 }}
          className="inline-flex items-center self-start gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold mb-5"
          style={{ background: card.color + '18', color: card.color, border: `1px solid ${card.color}30` }}
        >
          <span>{card.emoji}</span> {card.tag}
        </motion.div>

        {/* Icon + title */}
        <div className="flex items-center gap-4 mb-7">
          <motion.div
            animate={hovered ? { scale: 1.1, rotate: -6 } : { scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 260 }}
            className="relative p-3 rounded-xl flex-shrink-0"
            style={{ background: card.color + '18', border: `1px solid ${card.color}30` }}
          >
            {/* Icon glow */}
            <motion.div
              className="absolute inset-0 rounded-xl blur-md"
              style={{ background: card.glow }}
              animate={{ opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
            <IconComponent className="h-8 w-8 relative z-10" style={{ color: card.color }} />
          </motion.div>
          <motion.h3
            className="text-xl font-bold transition-colors duration-200"
            style={{ color: hovered ? card.color : '#f1f5f9' }}
          >
            {card.title}
          </motion.h3>
        </div>

        {/* Divider */}
        <motion.div
          className="h-px mb-6 origin-left"
          style={{ background: `linear-gradient(90deg, ${card.color}40, transparent)` }}
          animate={{ scaleX: hovered ? 1 : 0.4, opacity: hovered ? 1 : 0.4 }}
          transition={{ duration: 0.4 }}
        />

        {/* Feature list */}
        <ul className="space-y-3 flex-grow">
          {card.features.map((feature, i) => (
            <FeatureItem key={i} text={feature} color={card.color} index={i} />
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

// ── Floating decorative orbs ──────────────────────────────────────────────────
const Orb = ({ color, x, y, size, delay }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none blur-3xl"
    style={{ background: color, width: size, height: size, left: x, top: y, opacity: 0.08 }}
    animate={{ scale: [1, 1.2, 1], x: [0, 25, 0], y: [0, -20, 0] }}
    transition={{ duration: 10 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
  />
);

// ── Main section ──────────────────────────────────────────────────────────────
const FullFeatureList = () => {
  const [isDesktop, setIsDesktop] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isModalOpen) return;
    const onScroll = () => setIsModalOpen(false);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [isModalOpen]);

  const handleDownloadClick = () => {
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    if (!isDesktop) {
      if (/android/i.test(ua)) window.open('https://play.google.com/store/apps/details?id=com.digitalhealthcare.oralens', '_blank');
      else if (/iPad|iPhone|iPod/.test(ua)) window.open('https://apps.apple.com/in/app/arogyalens/id6503949015', '_blank');
      else alert('App download is only supported on Android or iOS devices.');
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <section id="full-features" className="section-padding bg-dark-primary relative overflow-hidden">

      {/* Background orbs */}
      <Orb color="#22d3ee" x="0%" y="10%" size={400} delay={0} />
      <Orb color="#a78bfa" x="60%" y="5%" size={350} delay={3} />
      <Orb color="#34d399" x="80%" y="70%" size={300} delay={6} />
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

      {/* Horizontal scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent pointer-events-none"
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 space-y-5"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-semibold"
          >
            <Sparkles className="w-4 h-4" />
            One App. Every Role.
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-gradient">
            Everything You Need in
            <br />
            <span className="text-text-primary">One Powerful App</span>
          </h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mx-auto h-px w-32 bg-gradient-to-r from-transparent via-cyan-400 to-transparent origin-center"
          />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-400 max-w-xl mx-auto"
          >
            Tailored workflows for every person in your hospital — from the front desk to the operation theatre.
          </motion.p>
        </motion.div>

        {/* ── Cards grid ── */}
        <div className="grid lg:grid-cols-3 gap-7">
          {cardData.map((card, index) => (
            <FeatureCard key={index} card={card} index={index} />
          ))}
        </div>

        {/* ── Bottom connector line into CTA ── */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mx-auto mt-12 mb-8 w-px h-12 bg-gradient-to-b from-cyan-400/50 to-transparent origin-top"
        />

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center"
        >
          <motion.div className="relative inline-block group">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500" />
            <Button
              size="lg"
              onClick={handleDownloadClick}
              className="relative bg-accent-blue text-dark-primary font-bold hover:bg-accent-blue/90 transition-all duration-300 hover:scale-105 text-lg px-10 py-6"
            >
              Start Managing Smarter
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowRight className="ml-3 h-6 w-6" />
              </motion.span>
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-sm text-gray-500"
          >
            Free to download · No credit card required · Setup in under 1 hour
          </motion.p>
        </motion.div>
      </div>

      {/* ── QR Modal ── */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 30 }}
              transition={{ type: 'spring', stiffness: 220, damping: 20 }}
              className="relative bg-white p-6 rounded-2xl shadow-2xl text-center max-w-sm w-full"
            >
              <motion.button
                whileHover={{ rotate: 90, scale: 1.1 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsModalOpen(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </motion.button>

              <motion.h2
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-cyan-600 font-semibold mb-3"
              >
                Scan to Download
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-4 rounded-lg border border-gray-200"
              >
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https%3A%2F%2Fappurl.io%2F5hTnayms-O"
                  alt="Download ArogyaLens App QR"
                  className="mx-auto mb-4"
                />
              </motion.div>

              <p className="text-gray-700 mt-4 text-sm">Point your mobile camera at the QR code to download the app.</p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex justify-center gap-4 mt-4"
              >
                <motion.a whileHover={{ scale: 1.05, y: -2 }} href="https://play.google.com/store/apps/details?id=com.digitalhealthcare.oralens" target="_blank" rel="noopener noreferrer">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-10" />
                </motion.a>
                <motion.a whileHover={{ scale: 1.05, y: -2 }} href="https://apps.apple.com/in/app/arogyalens/id6503949015" target="_blank" rel="noopener noreferrer">
                  <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" className="h-10" />
                </motion.a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FullFeatureList;