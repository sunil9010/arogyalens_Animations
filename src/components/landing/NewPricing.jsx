import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Download, X, CheckCircle, Zap, Users, Shield } from 'lucide-react';

// ── Animated count-up ─────────────────────────────────────────────────────────
const CountUp = ({ target, prefix = '', suffix = '', duration = 1.6 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
};

// ── Floating particle ─────────────────────────────────────────────────────────
const Particle = ({ x, y, color, delay, size }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{ left: x, top: y, width: size, height: size, background: color, opacity: 0 }}
    animate={{ y: [0, -28, 0], opacity: [0, 0.55, 0], scale: [0.8, 1.2, 0.8] }}
    transition={{ duration: 3.5 + Math.random() * 2, delay, repeat: Infinity, ease: 'easeInOut' }}
  />
);

// ── Included feature pill ─────────────────────────────────────────────────────
const IncludedFeature = ({ icon: Icon, text, color, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.35 + index * 0.1, type: 'spring', stiffness: 130, damping: 18 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -3, scale: 1.04 }}
      className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl cursor-default transition-colors duration-200"
      style={{
        background: hovered ? color + '18' : 'rgba(255,255,255,0.04)',
        border: `1px solid ${hovered ? color + '40' : 'rgba(255,255,255,0.08)'}`,
      }}
    >
      <motion.div
        animate={hovered ? { scale: 1.2, rotate: -8 } : { scale: 1, rotate: 0 }}
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

const includedFeatures = [
  { icon: CheckCircle, text: 'All Features Included', color: '#22d3ee' },
  { icon: Users,       text: 'Unlimited Staff',       color: '#a78bfa' },
  { icon: Zap,         text: 'Full App Access',        color: '#34d399' },
  { icon: Shield,      text: 'Enterprise Security',    color: '#f59e0b' },
];

// ── Main ──────────────────────────────────────────────────────────────────────
const NewPricing = () => {
  const [isDesktop, setIsDesktop]   = useState(true);
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
    { x: '8%',  y: '20%', color: '#22d3ee', delay: 0,   size: 5 },
    { x: '90%', y: '15%', color: '#a78bfa', delay: 0.8, size: 4 },
    { x: '15%', y: '75%', color: '#34d399', delay: 1.6, size: 6 },
    { x: '85%', y: '70%', color: '#22d3ee', delay: 0.4, size: 4 },
    { x: '50%', y: '5%',  color: '#a78bfa', delay: 1.2, size: 5 },
    { x: '70%', y: '85%', color: '#34d399', delay: 2.0, size: 4 },
  ];

  return (
    <section id="pricing" className="section-padding bg-dark-primary relative overflow-hidden">

      {/* ── Background ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(34,211,238,0.05) 0%, transparent 70%)' }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

      {/* Slow scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/15 to-transparent pointer-events-none"
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'linear' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16 space-y-5"
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
            No Hidden Fees · Ever
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-gradient">
            Transparent Pricing,<br />
            <span className="text-text-primary">No Surprises</span>
          </h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mx-auto h-px w-28 bg-gradient-to-r from-transparent via-cyan-400 to-transparent origin-center"
          />
        </motion.div>

        {/* ── Pricing card ── */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, type: 'spring', stiffness: 90, damping: 18 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Outer glow */}
          <motion.div
            className="absolute -inset-1 rounded-3xl blur-xl pointer-events-none"
            style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.12), rgba(59,130,246,0.08), rgba(167,139,250,0.1))' }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Card */}
          <div className="relative bg-dark-secondary rounded-3xl overflow-hidden">

            {/* Animated border */}
            <motion.div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              animate={{
                boxShadow: [
                  '0 0 0 1px rgba(34,211,238,0.25)',
                  '0 0 0 1.5px rgba(34,211,238,0.5)',
                  '0 0 0 1px rgba(34,211,238,0.25)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Top gradient bar */}
            <div className="h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500" />

            {/* Shimmer sweep */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
              <motion.div
                className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.025] to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 4, repeat: Infinity, repeatDelay: 9, ease: 'easeInOut' }}
              />
            </div>

            {/* Floating particles inside card */}
            {particles.map((p, i) => <Particle key={i} {...p} />)}

            <div className="relative z-10 p-8 md:p-12">

              {/* ── Price row ── */}
              <div className="grid md:grid-cols-2 gap-8 items-center text-center">

                {/* Free tier */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 120, damping: 18 }}
                  className="relative border-b md:border-b-0 md:border-r border-white/8 pb-8 md:pb-0 md:pr-8"
                >
                  <p className="text-sm text-gray-500 mb-3 uppercase tracking-widest font-semibold">
                    First 10 Patients
                  </p>

                  {/* FREE with glow */}
                  <div className="relative inline-block">
                    <motion.div
                      className="absolute inset-0 blur-2xl rounded-full pointer-events-none"
                      style={{ background: 'rgba(34,211,238,0.25)' }}
                      animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.h3
                      className="relative text-6xl md:text-7xl font-extrabold text-accent-cyan"
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      FREE
                    </motion.h3>
                  </div>

                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="mx-auto mt-4 h-px w-16 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent origin-center"
                  />

                  <p className="text-gray-400 mt-3 text-sm">No credit card required</p>
                </motion.div>

                {/* Paid tier */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, type: 'spring', stiffness: 120, damping: 18 }}
                >
                  <p className="text-sm text-gray-500 mb-3 uppercase tracking-widest font-semibold">
                    After That
                  </p>

                  <div className="relative inline-flex items-baseline gap-2">
                    <motion.div
                      className="absolute inset-0 blur-2xl rounded-full pointer-events-none"
                      style={{ background: 'rgba(59,130,246,0.2)' }}
                      animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                    />
                    <span className="relative text-6xl md:text-7xl font-extrabold text-accent-blue">
                      ₹<CountUp target={5} />
                    </span>
                    <span className="relative text-base text-gray-400 leading-tight text-left">
                      / patient<br />/ year
                    </span>
                  </div>

                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="mx-auto mt-4 h-px w-16 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent origin-center"
                  />

                  <p className="text-gray-400 mt-3 text-sm">As per your clinic/hospital size</p>
                </motion.div>
              </div>

              {/* ── Divider ── */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="my-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent origin-center"
              />

              {/* ── Included features ── */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-center text-base text-gray-400 mb-5 font-medium"
              >
                Everything is included — no upsells, no surprises:
              </motion.p>

              <div className="flex flex-wrap justify-center gap-3 mb-10">
                {includedFeatures.map((f, i) => (
                  <IncludedFeature key={i} {...f} index={i} />
                ))}
              </div>

              {/* ── CTA ── */}
              <div className="text-center">
                <motion.div
                  className="relative inline-block"
                  onMouseEnter={() => setCtaHovered(true)}
                  onMouseLeave={() => setCtaHovered(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                >
                  {/* Halo glow */}
                  <motion.div
                    className="absolute -inset-2 rounded-xl blur-lg bg-gradient-to-r from-cyan-400 to-blue-500"
                    animate={{ opacity: ctaHovered ? 0.3 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  />
                  <Button
                    size="lg"
                    onClick={handleRedirect}
                    className="relative bg-accent-blue text-dark-primary font-bold hover:bg-accent-blue/90 transition-all duration-300 text-lg px-10 py-6 tracking-wide"
                  >
                    DOWNLOAD OUR APP NOW!
                    <motion.span
                      animate={{ y: ctaHovered ? -2 : 0, rotate: ctaHovered ? -12 : 0 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                    >
                      <Download className="ml-3 h-6 w-6" />
                    </motion.span>
                  </Button>
                </motion.div>

                {/* Trust line */}
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="mt-5 text-sm text-gray-500 flex flex-wrap justify-center gap-x-5 gap-y-1"
                >
                  <span>✅ Free to start</span>
                  <span>🔒 Secure & private</span>
                  <span>⚡ Setup in under 1 hour</span>
                  <span>🇮🇳 Made for India</span>
                </motion.p>
              </div>
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
                  alt="Download QR"
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

export default NewPricing;