import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle, Download, Stethoscope, HeartPulse, ShieldCheck, ScanFace, X } from 'lucide-react';

const whyPoints = [
  {
    icon: Stethoscope,
    title: 'Built by doctors, not just coders',
    description: 'Every feature is designed from real clinical workflows — not assumptions.',
    color: '#22d3ee',
  },
  {
    icon: HeartPulse,
    title: 'Protects your staff from burnout',
    description: 'AI monitors fatigue patterns and alerts before burnout hits.',
    color: '#f43f5e',
  },
  {
    icon: ShieldCheck,
    title: 'SOS/violence response built-in',
    description: 'One-tap panic button notifies the whole team in under 2 seconds.',
    color: '#a78bfa',
  },
  {
    icon: ScanFace,
    title: 'Easy facial-recognition attendance',
    description: "No cards, no PINs — just walk in and you're marked present.",
    color: '#34d399',
  },
];

// ── Animated counter ──────────────────────────────────────────────────────────
const Counter = ({ target, suffix = '', duration = 1.8 }) => {
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

  return <span ref={ref}>{count}{suffix}</span>;
};

// ── Why point row ─────────────────────────────────────────────────────────────
const WhyPoint = ({ point, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.li
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, type: 'spring', stiffness: 120 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex items-start gap-4 p-4 rounded-2xl cursor-default transition-colors duration-300"
      style={{ background: hovered ? point.color + '0d' : 'transparent' }}
    >
      {/* Left border accent */}
      <motion.div
        className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full"
        style={{ background: point.color }}
        animate={{ opacity: hovered ? 1 : 0, scaleY: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
      />

      {/* Icon */}
      <motion.div
        animate={hovered ? { scale: 1.15, rotate: -8 } : { scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 260 }}
        className="flex-shrink-0 p-2.5 rounded-xl mt-0.5"
        style={{ background: point.color + '18', border: `1px solid ${point.color}30` }}
      >
        <point.icon className="h-6 w-6" style={{ color: point.color }} />
      </motion.div>

      {/* Text */}
      <div>
        <motion.p
          className="text-lg font-semibold transition-colors duration-200"
          style={{ color: hovered ? point.color : '#f1f5f9' }}
        >
          {point.title}
        </motion.p>
        <motion.p
          className="text-sm text-gray-400 mt-0.5 leading-relaxed"
          animate={{ opacity: hovered ? 1 : 0.6 }}
          transition={{ duration: 0.2 }}
        >
          {point.description}
        </motion.p>
      </div>

      {/* Check badge */}
      <motion.div
        className="ml-auto flex-shrink-0"
        animate={hovered ? { scale: 1.2, rotate: 10 } : { scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <CheckCircle className="h-5 w-5" style={{ color: point.color, opacity: hovered ? 1 : 0.4 }} />
      </motion.div>
    </motion.li>
  );
};

// ── Main component ────────────────────────────────────────────────────────────
const WhyUs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-200, 200], [5, -5]);
  const rotateY = useTransform(mouseX, [-200, 200], [-5, 5]);

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

  const handleClick = () => {
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    if (!isDesktop) {
      if (/android/i.test(ua)) window.location.href = 'https://play.google.com/store/apps/details?id=com.digitalhealthcare.oralens';
      else if (/iPad|iPhone|iPod/.test(ua)) window.location.href = 'https://apps.apple.com/in/app/arogyalens/id6503949015';
      else alert('App download is only supported on Android or iOS devices.');
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <section id="why-us" className="section-padding bg-dark-primary relative overflow-hidden">

      {/* ── Background ambience ── */}
      <motion.div
        className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full pointer-events-none blur-3xl opacity-10"
        style={{ background: 'radial-gradient(circle, #22d3ee, transparent)' }}
        animate={{ scale: [1, 1.15, 1], x: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full pointer-events-none blur-3xl opacity-10"
        style={{ background: 'radial-gradient(circle, #a78bfa, transparent)' }}
        animate={{ scale: [1, 1.2, 1], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: Image ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, x: -40 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative order-2 lg:order-1"
            style={{ perspective: 900 }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              mouseX.set(e.clientX - rect.left - rect.width / 2);
              mouseY.set(e.clientY - rect.top - rect.height / 2);
            }}
            onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
          >
            {/* Breathing glow */}
            <motion.div
              className="absolute -inset-4 rounded-3xl blur-3xl pointer-events-none"
              style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.15), rgba(59,130,246,0.15))' }}
              animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.04, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* 3D tilt wrapper */}
            <motion.div style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }} className="relative">

              {/* Decorative spinning rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-5 -right-5 w-20 h-20 rounded-full border border-cyan-400/20 pointer-events-none"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                className="absolute -bottom-5 -left-5 w-14 h-14 rounded-full border border-violet-400/20 pointer-events-none"
              />

              {/* Main image */}
              <div className="absolute -inset-2 bg-gradient-to-r from-accent-blue to-accent-cyan rounded-3xl opacity-20 blur-2xl" />
              <motion.img
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="relative w-full h-auto rounded-2xl shadow-2xl border border-border-color"
                alt="A collage showing doctors using the ArogyaLens app on various devices"
                src="images/unsplash.png"
              />

              {/* Shimmer sweep */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                <motion.div
                  className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 6, ease: 'easeInOut' }}
                />
              </div>

              {/* Floating badge — top left */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, type: 'spring' }}
                className="absolute -left-6 top-8 hidden lg:flex items-center gap-2 bg-gray-900/90 backdrop-blur-md border border-white/10 rounded-2xl px-3 py-2 shadow-xl"
              >
                <span className="text-lg">👨‍⚕️</span>
                <div>
                  <p className="text-xs text-gray-400">Built by</p>
                  <p className="text-sm font-bold text-white">Real Doctors</p>
                </div>
              </motion.div>

              {/* Floating badge — bottom right */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9, type: 'spring' }}
                className="absolute -right-6 bottom-10 hidden lg:flex items-center gap-2 bg-gray-900/90 backdrop-blur-md border border-white/10 rounded-2xl px-3 py-2 shadow-xl"
              >
                <span className="text-lg">🚀</span>
                <div>
                  <p className="text-xs text-gray-400">Setup in</p>
                  <p className="text-sm font-bold text-white">Under 1 Hour</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Mini stats row below image */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              {[
                { value: 500, suffix: '+', label: 'Hospitals' },
                { value: 10, suffix: 'K+', label: 'Doctors' },
                { value: 98, suffix: '%', label: 'Satisfaction' },
              ].map(({ value, suffix, label }) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ y: -3, scale: 1.04 }}
                  className="text-center py-3 rounded-xl bg-dark-secondary/80 border border-white/5"
                >
                  <p className="text-xl font-extrabold text-cyan-400">
                    <Counter target={value} suffix={suffix} />
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Copy ── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="order-1 lg:order-2"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-semibold mb-6"
            >
              <motion.span
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-cyan-400 inline-block"
              />
              The ArogyaLens Difference
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.7 }}
              className="text-4xl md:text-5xl font-extrabold text-gradient mb-4"
            >
              Why Arogya Lens?
            </motion.h2>

            {/* Animated divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="h-px w-24 bg-gradient-to-r from-cyan-400 to-blue-500 mb-10 origin-left"
            />

            {/* Why points */}
            <ul className="space-y-2 mb-10">
              {whyPoints.map((point, index) => (
                <WhyPoint key={index} point={point} index={index} />
              ))}
            </ul>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="relative group inline-block"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl opacity-0 group-hover:opacity-30 blur-lg transition-all duration-500" />
              <Button
                onClick={handleClick}
                size="lg"
                className="relative bg-accent-blue text-dark-primary font-bold hover:bg-accent-blue/90 transition-all duration-300 transform hover:scale-105 text-lg px-8 py-6"
              >
                Download Now
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Download className="ml-3 h-6 w-6" />
                </motion.span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
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
                  <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" className="h-10" />
                </motion.a>
                <motion.a whileHover={{ scale: 1.05, y: -2 }} href="https://apps.apple.com/in/app/arogyalens/id6503949015" target="_blank" rel="noopener noreferrer">
                  <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="Download on the App Store" className="h-10" />
                </motion.a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default WhyUs;