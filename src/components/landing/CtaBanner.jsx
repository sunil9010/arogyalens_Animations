import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Sparkles, Zap, Clock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

// ── Floating particle ─────────────────────────────────────────────────────────
const Particle = ({ x, y, color, delay, size }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{ left: x, top: y, width: size, height: size, background: color, opacity: 0 }}
    animate={{ y: [0, -32, 0], opacity: [0, 0.55, 0], scale: [0.8, 1.3, 0.8] }}
    transition={{ duration: 3.5 + Math.random() * 2, delay, repeat: Infinity, ease: 'easeInOut' }}
  />
);

// ── Trust pill ────────────────────────────────────────────────────────────────
const TrustPill = ({ icon: Icon, text, color, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.5 + index * 0.1, type: 'spring', stiffness: 140, damping: 18 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -3, scale: 1.05 }}
      className="flex items-center gap-2 px-4 py-2 rounded-xl cursor-default transition-all duration-200"
      style={{
        background: hovered ? color + '18' : 'rgba(255,255,255,0.04)',
        border: `1px solid ${hovered ? color + '45' : 'rgba(255,255,255,0.08)'}`,
      }}
    >
      <motion.div
        animate={hovered ? { rotate: -10, scale: 1.2 } : { rotate: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 280, damping: 18 }}
      >
        <Icon className="w-4 h-4 transition-colors duration-200" style={{ color: hovered ? color : '#64748b' }} />
      </motion.div>
      <span className="text-sm font-medium transition-colors duration-200" style={{ color: hovered ? '#f1f5f9' : '#94a3b8' }}>
        {text}
      </span>
    </motion.div>
  );
};

const trustPills = [
  { icon: Zap,     text: 'No Training Required', color: '#f59e0b' },
  { icon: Clock,   text: 'Live in Under 1 Hour',  color: '#22d3ee' },
  { icon: Shield,  text: 'Secure & Compliant',    color: '#34d399' },
];

// ── Main ──────────────────────────────────────────────────────────────────────
const CtaBanner = () => {
  const [isDesktop, setIsDesktop]    = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ctaHovered, setCtaHovered]  = useState(false);

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

  const handleRedirect = () => {
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    if (!isDesktop) {
      if (/android/i.test(ua)) window.open('https://play.google.com/store/apps/details?id=com.digitalhealthcare.oralens', '_blank');
      else if (/iPad|iPhone|iPod/.test(ua)) window.open('https://apps.apple.com/in/app/arogyalens/id6503949015', '_blank');
      else alert('App download is only supported on Android or iOS devices.');
    } else {
      setIsModalOpen(true);
    }
  };

  const particles = [
    { x: '5%',  y: '20%', color: '#22d3ee', delay: 0,   size: 5 },
    { x: '93%', y: '15%', color: '#a78bfa', delay: 0.9, size: 4 },
    { x: '10%', y: '75%', color: '#34d399', delay: 1.7, size: 5 },
    { x: '88%', y: '70%', color: '#22d3ee', delay: 0.5, size: 4 },
    { x: '50%', y: '5%',  color: '#a78bfa', delay: 1.2, size: 6 },
    { x: '72%', y: '88%', color: '#f59e0b', delay: 2.1, size: 4 },
    { x: '28%', y: '90%', color: '#34d399', delay: 0.3, size: 3 },
  ];

  return (
    <section className="section-padding bg-dark-secondary relative overflow-hidden">

      {/* Section-level ambient glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(34,211,238,0.05) 0%, transparent 70%)' }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, type: 'spring', stiffness: 90, damping: 18 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Outer breathing glow */}
          <motion.div
            className="absolute -inset-1.5 rounded-3xl blur-2xl pointer-events-none"
            style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.18), rgba(59,130,246,0.12), rgba(167,139,250,0.15))' }}
            animate={{ opacity: [0.5, 0.9, 0.5], rotate: [0, 1, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="relative bg-dark-primary rounded-3xl overflow-hidden modern-gradient">

            {/* Pulsing border */}
            <motion.div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              animate={{
                boxShadow: [
                  '0 0 0 1px rgba(34,211,238,0.2)',
                  '0 0 0 2px rgba(34,211,238,0.5)',
                  '0 0 0 1px rgba(34,211,238,0.2)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Top rainbow bar */}
            <div className="h-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500" />

            {/* Slow shimmer sweep */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
              <motion.div
                className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 4, repeat: Infinity, repeatDelay: 8, ease: 'easeInOut' }}
              />
            </div>

            {/* Floating particles */}
            {particles.map((p, i) => <Particle key={i} {...p} />)}

            {/* Inner mesh gradient */}
            <div className="absolute inset-0 pointer-events-none" style={{
              background: 'radial-gradient(ellipse 60% 70% at 20% 30%, rgba(34,211,238,0.06) 0%, transparent 60%), radial-gradient(ellipse 50% 60% at 80% 70%, rgba(167,139,250,0.06) 0%, transparent 60%)',
            }} />

            {/* Content */}
            <div className="relative z-10 py-16 px-6 md:px-12 text-center">

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: -10 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 150 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-semibold mb-7"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Join 500+ Hospitals Already Onboard
              </motion.div>

              {/* Headline */}
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.18, duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-4xl md:text-5xl font-extrabold text-gradient mb-5"
              >
                Start Running Your Hospital<br />
                <span className="text-text-primary">Like It's 2025</span>
              </motion.h2>

              {/* Animated divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="mx-auto h-px w-24 bg-gradient-to-r from-transparent via-cyan-400 to-transparent origin-center mb-6"
              />

              {/* Subtext */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35, duration: 0.6 }}
                className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto"
              >
                No training, no demos, no friction.{' '}
                <span className="text-cyan-400 font-semibold">Just install and start.</span>
              </motion.p>

              {/* Trust pills */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap justify-center gap-3 mb-10"
              >
                {trustPills.map((pill, i) => (
                  <TrustPill key={i} {...pill} index={i} />
                ))}
              </motion.div>

              {/* CTA button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45, duration: 0.55 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <motion.div
                  className="relative group"
                  onMouseEnter={() => setCtaHovered(true)}
                  onMouseLeave={() => setCtaHovered(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                >
                  {/* Glow halo */}
                  <motion.div
                    className="absolute -inset-2 rounded-xl blur-xl bg-gradient-to-r from-cyan-400 to-blue-500"
                    animate={{ opacity: ctaHovered ? 0.35 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  />
                  <Button
                    onClick={handleRedirect}
                    size="lg"
                    className="relative w-full sm:w-auto bg-dark-primary text-accent-cyan border-2 border-accent-cyan hover:bg-accent-cyan hover:text-dark-primary font-bold transition-all duration-300 text-lg px-10 py-6"
                  >
                    <motion.span
                      animate={ctaHovered ? { rotate: [-10, 10, 0], y: [-2, 2, 0] } : { rotate: 0, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Download className="mr-3 h-6 w-6" />
                    </motion.span>
                    Get the App
                  </Button>
                </motion.div>
              </motion.div>

              {/* Micro trust line */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.65 }}
                className="mt-5 text-sm text-gray-500"
              >
                Free to start · Available on Android & iOS · No credit card needed
              </motion.p>
            </div>
          </div>
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

export default CtaBanner;