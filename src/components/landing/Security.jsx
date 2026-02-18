import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Shield, Lock, Cloud, ShieldCheck, Fingerprint, Server } from 'lucide-react';

const securityFeatures = [
  {
    icon: Cloud,
    title: "Hosted on AWS Cloud",
    desc: "Leveraging Amazon's secure, scalable, and reliable infrastructure.",
    color: "#22d3ee",
    stat: "99.99% Uptime",
  },
  {
    icon: Lock,
    title: "End-to-End Encryption",
    desc: "All data is protected with 256-bit encryption, both in transit and at rest.",
    color: "#a78bfa",
    stat: "256-bit AES",
  },
  {
    icon: Shield,
    title: "Role-Based Access Only",
    desc: "Ensure only authorized personnel can access sensitive patient information.",
    color: "#34d399",
    stat: "Zero Breaches",
  },
];

const trustBadges = [
  { icon: ShieldCheck, label: "HIPAA Ready", color: "#22d3ee" },
  { icon: Fingerprint, label: "Biometric Auth", color: "#a78bfa" },
  { icon: Server, label: "AWS Backed", color: "#34d399" },
];

// ── Security feature row ──────────────────────────────────────────────────────
const SecurityItem = ({ item, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, type: 'spring', stiffness: 110 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex items-start gap-5 p-4 rounded-2xl cursor-default transition-colors duration-300"
      style={{ background: hovered ? item.color + '0d' : 'transparent' }}
    >
      {/* Left accent line */}
      <motion.div
        className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full"
        style={{ background: item.color }}
        animate={{ opacity: hovered ? 1 : 0, scaleY: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
      />

      {/* Icon box */}
      <motion.div
        animate={hovered ? { scale: 1.12, rotate: -8 } : { scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 260 }}
        className="relative flex-shrink-0 p-3.5 rounded-xl bg-dark-primary border border-border-color"
        style={{ borderColor: hovered ? item.color + '50' : undefined }}
      >
        {/* Icon glow */}
        <motion.div
          className="absolute inset-0 rounded-xl blur-md"
          style={{ background: item.color + '25' }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        <item.icon className="h-7 w-7 relative z-10 transition-colors duration-200" style={{ color: hovered ? item.color : '#94a3b8' }} />
      </motion.div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-1 flex-wrap">
          <motion.h3
            className="font-bold text-lg transition-colors duration-200"
            style={{ color: hovered ? item.color : '#f1f5f9' }}
          >
            {item.title}
          </motion.h3>
          {/* Stat pill */}
          <motion.span
            className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{ background: item.color + '18', color: item.color, border: `1px solid ${item.color}30` }}
            animate={{ opacity: hovered ? 1 : 0.5, scale: hovered ? 1.05 : 1 }}
            transition={{ duration: 0.2 }}
          >
            {item.stat}
          </motion.span>
        </div>
        <motion.p
          className="text-base leading-relaxed text-gray-400"
          animate={{ opacity: hovered ? 1 : 0.7 }}
          transition={{ duration: 0.2 }}
        >
          {item.desc}
        </motion.p>
      </div>
    </motion.div>
  );
};

// ── Main section ──────────────────────────────────────────────────────────────
const Security = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-200, 200], [6, -6]);
  const rotateY = useTransform(mouseX, [-200, 200], [-6, 6]);

  return (
    <section id="security" className="section-padding bg-dark-secondary relative overflow-hidden">

      {/* ── Background ── */}
      <motion.div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none blur-3xl opacity-8"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.08), transparent)' }}
        animate={{ scale: [1, 1.2, 1], x: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none blur-3xl opacity-8"
        style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.08), transparent)' }}
        animate={{ scale: [1, 1.15, 1], y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

      {/* Animated circuit-line SVG background */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="circuit" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M10 40 H30 M50 40 H70 M40 10 V30 M40 50 V70" stroke="#22d3ee" strokeWidth="1" fill="none" />
            <circle cx="40" cy="40" r="3" fill="#22d3ee" />
            <circle cx="10" cy="40" r="2" fill="#22d3ee" />
            <circle cx="70" cy="40" r="2" fill="#22d3ee" />
            <circle cx="40" cy="10" r="2" fill="#22d3ee" />
            <circle cx="40" cy="70" r="2" fill="#22d3ee" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit)" />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: Copy ── */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
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
              Enterprise-Grade Protection
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.7 }}
              className="text-4xl md:text-5xl font-extrabold text-gradient mb-4"
            >
              Rock-Solid <br />Data Privacy
            </motion.h2>

            {/* Animated divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="h-px w-24 bg-gradient-to-r from-cyan-400 to-blue-500 mb-10 origin-left"
            />

            {/* Security features */}
            <div className="space-y-2">
              {securityFeatures.map((item, index) => (
                <SecurityItem key={index} item={item} index={index} />
              ))}
            </div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-3 mt-8"
            >
              {trustBadges.map(({ icon: Icon, label, color }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 + i * 0.1, type: 'spring' }}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl border bg-dark-primary/60"
                  style={{ borderColor: color + '30', background: color + '0d' }}
                >
                  <Icon className="w-4 h-4" style={{ color }} />
                  <span className="text-sm font-semibold" style={{ color }}>{label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: Image ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
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
              style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.15), rgba(167,139,250,0.12))' }}
              animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.04, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* 3D tilt wrapper */}
            <motion.div style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }} className="relative">

              {/* Decorative rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-6 -right-6 w-20 h-20 rounded-full border border-cyan-400/20 pointer-events-none"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
                className="absolute -bottom-4 -left-4 w-12 h-12 rounded-full border border-violet-400/20 pointer-events-none"
              />

              {/* Lock icon orbiting */}
              <motion.div
                className="absolute pointer-events-none z-20"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                style={{ width: '110%', height: '110%', top: '-5%', left: '-5%' }}
              >
                <motion.div
                  className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                >
                  <div className="p-2 rounded-full bg-dark-secondary border border-cyan-400/30 shadow-lg">
                    <Lock className="w-4 h-4 text-cyan-400" />
                  </div>
                </motion.div>
              </motion.div>

              {/* Main image */}
              <div className="absolute -inset-2 bg-gradient-to-r from-accent-blue to-accent-cyan rounded-3xl opacity-20 blur-2xl" />
              <motion.img
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="relative w-full h-auto rounded-2xl shadow-2xl border border-border-color"
                alt="Abstract digital art representing data security and privacy"
                src="images/security.png"
              />

              {/* Shimmer sweep */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                <motion.div
                  className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 5, ease: 'easeInOut' }}
                />
              </div>

              {/* Floating badge — top left */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, type: 'spring' }}
                className="absolute -left-6 top-8 hidden lg:flex items-center gap-2 bg-gray-900/90 backdrop-blur-md border border-white/10 rounded-2xl px-3 py-2 shadow-xl"
              >
                <span className="text-lg">🔒</span>
                <div>
                  <p className="text-xs text-gray-400">Encryption</p>
                  <p className="text-sm font-bold text-white">256-bit AES</p>
                </div>
              </motion.div>

              {/* Floating badge — bottom right */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.0, type: 'spring' }}
                className="absolute -right-6 bottom-10 hidden lg:flex items-center gap-2 bg-gray-900/90 backdrop-blur-md border border-white/10 rounded-2xl px-3 py-2 shadow-xl"
              >
                {/* Live pulsing dot */}
                <motion.span
                  animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-2.5 h-2.5 rounded-full bg-emerald-400 flex-shrink-0"
                />
                <div>
                  <p className="text-xs text-gray-400">System Status</p>
                  <p className="text-sm font-bold text-emerald-400">All Systems Secure</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Security;