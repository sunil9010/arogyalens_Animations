import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { Download, Heart, Shield, Zap, Activity, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

// ─── Floating Particle ────────────────────────────────────────────────────────
const Particle = ({ delay, x, y, size, color }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, background: color, opacity: 0 }}
    animate={{ y: [0, -30, 0], opacity: [0, 0.6, 0], scale: [0.8, 1.2, 0.8] }}
    transition={{ duration: 4 + Math.random() * 3, delay, repeat: Infinity, ease: 'easeInOut' }}
  />
);

// ─── Animated Pulse Ring ──────────────────────────────────────────────────────
const PulseRing = ({ delay = 0 }) => (
  <motion.div
    className="absolute rounded-full border border-cyan-400/30"
    style={{ width: 300, height: 300, top: '50%', left: '50%', x: '-50%', y: '-50%' }}
    animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
    transition={{ duration: 2.5, delay, repeat: Infinity, ease: 'easeOut' }}
  />
);

// ─── Floating Stat Badge ──────────────────────────────────────────────────────
const StatBadge = ({ icon: Icon, label, value, x, y, delay, color }) => (
  <motion.div
    className="absolute hidden lg:flex items-center gap-2 bg-gray-900/90 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-3 shadow-xl"
    style={{ left: x, top: y }}
    initial={{ opacity: 0, scale: 0.5, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 0.6, delay, type: 'spring', stiffness: 120 }}
    whileHover={{ scale: 1.08, y: -4 }}
  >
    <div className="p-1.5 rounded-lg" style={{ background: color + '20' }}>
      <Icon className="w-4 h-4" style={{ color }} />
    </div>
    <div>
      <p className="text-xs text-gray-400 leading-none">{label}</p>
      <p className="text-sm font-bold text-white leading-tight">{value}</p>
    </div>
  </motion.div>
);

// ─── Typewriter Effect ────────────────────────────────────────────────────────
const words = ['Hospital App', 'EMR Solution', 'Billing Suite', 'Doctor Tool'];
const Typewriter = () => {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = words[index];
    if (!deleting && displayed === target) {
      const t = setTimeout(() => setDeleting(true), 1800);
      return () => clearTimeout(t);
    }
    if (deleting && displayed === '') {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }
    const speed = deleting ? 50 : 90;
    const t = setTimeout(() => {
      setDisplayed(deleting ? displayed.slice(0, -1) : target.slice(0, displayed.length + 1));
    }, speed);
    return () => clearTimeout(t);
  }, [displayed, deleting, index]);

  return (
    <span className="text-gradient relative">
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        className="inline-block w-0.5 h-[0.85em] bg-cyan-400 ml-1 align-middle"
      />
    </span>
  );
};

// ─── Main Hero ────────────────────────────────────────────────────────────────
const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const heroRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [6, -6]);
  const rotateY = useTransform(mouseX, [-300, 300], [-6, 6]);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isModalOpen) return;
    const handleScroll = () => setIsModalOpen(false);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isModalOpen]);

  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

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

  // Particles config
  const particles = Array.from({ length: 20 }, (_, i) => ({
    delay: i * 0.4,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 3 + Math.random() * 5,
    color: i % 2 === 0 ? '#22d3ee' : '#3b82f6',
  }));

  return (
    <section
      id="home"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative pt-30 pb-20 lg:pt-48 lg:pb-28 overflow-hidden bg-dark-primary"
    >
      {/* ── Background layers ── */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />

      {/* Animated mesh gradient */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 20% 40%, rgba(34,211,238,0.07) 0%, transparent 70%), radial-gradient(ellipse 50% 60% at 80% 60%, rgba(59,130,246,0.07) 0%, transparent 70%)',
          backgroundSize: '200% 200%',
        }}
      />

      {/* Floating particles */}
      {particles.map((p, i) => <Particle key={i} {...p} />)}

      {/* Top gradient bar */}
      <div className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-br from-accent-blue/10 via-transparent to-accent-cyan/10" />

      {/* Horizontal scan line animation */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent pointer-events-none"
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: Copy ── */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-8 text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-semibold"
            >
              <motion.span
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-cyan-400 inline-block"
              />
              Trusted by 500+ Hospitals Across India
            </motion.div>

            {/* Headline */}
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-text-primary">
              India's Most Doctor-Friendly{' '}
              <br className="hidden md:block" />
              <Typewriter />
            </h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl md:text-2xl text-text-secondary leading-relaxed"
            >
              Appointments, EMR, billing, WhatsApp alerts &amp; SOS tools —{' '}
              <span className="text-cyan-400 font-semibold">all in one app</span>, built by doctors.
            </motion.p>

            {/* Feature chips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-wrap gap-2 justify-center lg:justify-start"
            >
              {['📋 EMR', '💳 Billing', '📱 WhatsApp Alerts', '🆘 SOS Tool', '📅 Appointments'].map((chip, i) => (
                <motion.span
                  key={chip}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300 cursor-default"
                >
                  {chip}
                </motion.span>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="relative group">
                {/* Glow behind button */}
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl opacity-0 group-hover:opacity-40 blur-lg transition-all duration-500" />
                <Button
                  onClick={handleClick}
                  size="lg"
                  className="relative w-full sm:w-auto bg-dark-secondary text-accent-cyan border-2 border-accent-cyan hover:bg-accent-cyan hover:text-dark-primary font-bold transition-all duration-300 text-lg px-8 py-6"
                >
                  <motion.span
                    animate={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 3 }}
                  >
                    <Download className="mr-3 h-6 w-6" />
                  </motion.span>
                  Get the App
                </Button>
              </motion.div>
            </motion.div>

            {/* Trust row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="flex items-center gap-6 justify-center lg:justify-start"
            >
              {[
                { icon: '⭐', label: '4.8 Rating' },
                { icon: '🏥', label: '500+ Hospitals' },
                { icon: '👨‍⚕️', label: '10K+ Doctors' },
              ].map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-sm text-gray-400">
                  <span>{icon}</span>
                  <span>{label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: Image ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative flex items-center justify-center"
          >
            {/* Pulse rings behind image */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <PulseRing delay={0} />
              <PulseRing delay={1.2} />
              <PulseRing delay={2.4} />
            </div>

            {/* Glow blob */}
            <motion.div
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -inset-8 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-3xl blur-3xl"
            />

            {/* 3D tilt on image */}
            <motion.div
              style={{ rotateX, rotateY, transformPerspective: 1000 }}
              className="relative w-full"
            >
              {/* Corner decorators */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-4 -right-4 w-16 h-16 border-2 border-cyan-400/30 rounded-full pointer-events-none"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="absolute -bottom-4 -left-4 w-10 h-10 border border-blue-400/30 rounded-full pointer-events-none"
              />

              {/* Shine overlay */}
              <div className="absolute -inset-2 bg-gradient-to-r from-accent-blue to-accent-cyan rounded-3xl opacity-50 blur-2xl" />

              <motion.img
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="relative w-full h-auto rounded-2xl shadow-2xl border border-border-color"
                alt="Doctor using modern healthcare management app interface"
                src="/images/hero.png"
              />

              {/* Animated highlight sweep */}
              <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
                initial={false}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 5, ease: 'easeInOut' }}
                />
              </motion.div>
            </motion.div>

            {/* Floating stat badges */}
            <StatBadge icon={Activity} label="Active Users" value="10K+ Daily" x="-10%" y="15%" delay={1.2} color="#22d3ee" />
            <StatBadge icon={Heart} label="Patient Satisfaction" value="98.5%" x="80%" y="70%" delay={1.5} color="#f43f5e" />
            <StatBadge icon={Shield} label="Data Security" value="HIPAA Compliant" x="-12%" y="70%" delay={1.8} color="#a78bfa" />
            <StatBadge icon={Zap} label="Faster Billing" value="3× Speed" x="78%" y="15%" delay={2.0} color="#fbbf24" />
          </motion.div>
        </div>
      </div>

      {/* ── Modal ── */}
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
                transition={{ delay: 0.15 }}
                className="text-xl text-cyan-600 font-semibold mb-3"
              >
                Scan to Download
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25 }}
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
                transition={{ delay: 0.35 }}
                className="flex justify-center gap-4 mt-4"
              >
                <motion.a
                  whileHover={{ scale: 1.05, y: -2 }}
                  href="https://play.google.com/store/apps/details?id=com.digitalhealthcare.oralens"
                  target="_blank" rel="noopener noreferrer"
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" className="h-10" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05, y: -2 }}
                  href="https://apps.apple.com/in/app/arogyalens/id6503949015"
                  target="_blank" rel="noopener noreferrer"
                >
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

export default Hero;