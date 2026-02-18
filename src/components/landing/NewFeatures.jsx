import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { FileText, CreditCard, Pill, Users, Brain, AlertTriangle } from 'lucide-react';

const newFeatures = [
  {
    icon: FileText,
    title: "EMR & Appointments",
    description: "Digital records, smart scheduling & patient history at your fingertips.",
    color: "#22d3ee",
    glow: "rgba(34,211,238,0.15)",
    gradient: "from-cyan-500/20 to-blue-500/10",
  },
  {
    icon: CreditCard,
    title: "Smart Billing",
    description: "Auto-generate invoices, track payments & reduce billing errors by 3×.",
    color: "#3b82f6",
    glow: "rgba(59,130,246,0.15)",
    gradient: "from-blue-500/20 to-indigo-500/10",
  },
  {
    icon: Pill,
    title: "Pharmacy",
    description: "Integrated drug inventory, e-prescriptions & stock alerts.",
    color: "#a78bfa",
    glow: "rgba(167,139,250,0.15)",
    gradient: "from-violet-500/20 to-purple-500/10",
  },
  {
    icon: Users,
    title: "Staff Attendance",
    description: "One-tap clock-in/out, shift scheduling & attendance reports.",
    color: "#34d399",
    glow: "rgba(52,211,153,0.15)",
    gradient: "from-emerald-500/20 to-teal-500/10",
  },
  {
    icon: Brain,
    title: "Burnout Alerts",
    description: "AI-driven fatigue detection that protects your medical team.",
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.15)",
    gradient: "from-amber-500/20 to-orange-500/10",
  },
  {
    icon: AlertTriangle,
    title: "Panic Button",
    description: "One-press SOS that instantly alerts the entire hospital network.",
    color: "#f43f5e",
    glow: "rgba(244,63,94,0.15)",
    gradient: "from-rose-500/20 to-red-500/10",
  },
];

// ── 3D tilt card ──────────────────────────────────────────────────────────────
const FeatureCard = ({ feature, index }) => {
  const [hovered, setHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-60, 60], [8, -8]);
  const rotateY = useTransform(mouseX, [-60, 60], [-8, 8]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ type: 'spring', bounce: 0.35, duration: 0.7, delay: index * 0.1 }}
      style={{ perspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="cursor-default"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative group h-52 rounded-2xl overflow-hidden"
      >
        {/* Background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} bg-dark-primary rounded-2xl`} />
        <div className="absolute inset-0 bg-dark-primary/80 rounded-2xl" />

        {/* Animated border glow on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          animate={hovered
            ? { boxShadow: `0 0 0 1.5px ${feature.color}60, 0 8px 40px ${feature.glow}` }
            : { boxShadow: '0 0 0 1px rgba(255,255,255,0.07)' }
          }
          transition={{ duration: 0.3 }}
        />

        {/* Sweep shimmer on hover */}
        <motion.div
          className="absolute inset-0 -skew-x-12 pointer-events-none rounded-2xl"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)' }}
          animate={hovered ? { x: ['−100%', '200%'] } : { x: '-100%' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        />

        {/* Corner accent dot */}
        <motion.div
          className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full"
          style={{ background: feature.color }}
          animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center gap-3">
          {/* Icon with glow ring */}
          <motion.div
            className="relative"
            animate={hovered ? { y: -4 } : { y: 0 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {/* Glow behind icon */}
            <motion.div
              className="absolute inset-0 rounded-full blur-xl"
              style={{ background: feature.glow }}
              animate={hovered ? { scale: 1.8, opacity: 1 } : { scale: 1, opacity: 0 }}
              transition={{ duration: 0.4 }}
            />
            {/* Icon container */}
            <motion.div
              className="relative p-3 rounded-xl"
              style={{
                background: hovered ? feature.color + '20' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${hovered ? feature.color + '50' : 'rgba(255,255,255,0.1)'}`,
              }}
              animate={hovered ? { rotate: [0, -8, 8, 0] } : { rotate: 0 }}
              transition={{ duration: 0.5 }}
            >
              <feature.icon
                className="h-8 w-8 transition-colors duration-300"
                style={{ color: hovered ? feature.color : '#94a3b8' }}
              />
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h3
            className="text-base font-bold transition-colors duration-300"
            style={{ color: hovered ? feature.color : '#f1f5f9' }}
          >
            {feature.title}
          </motion.h3>

          {/* Description — slides up on hover */}
          <motion.p
            className="text-xs text-gray-400 leading-relaxed"
            initial={{ opacity: 0, y: 8 }}
            animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.25 }}
          >
            {feature.description}
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ── Decorative background blobs ───────────────────────────────────────────────
const Blob = ({ color, x, y, size, delay }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none blur-3xl opacity-10"
    style={{ background: color, width: size, height: size, left: x, top: y }}
    animate={{ scale: [1, 1.2, 1], x: [0, 20, 0], y: [0, -15, 0] }}
    transition={{ duration: 8, repeat: Infinity, delay, ease: 'easeInOut' }}
  />
);

// ── Section ───────────────────────────────────────────────────────────────────
const NewFeatures = () => {
  return (
    <section id="features" className="section-padding bg-dark-secondary relative overflow-hidden">
      {/* Background blobs */}
      <Blob color="#22d3ee" x="5%" y="10%" size={300} delay={0} />
      <Blob color="#3b82f6" x="70%" y="60%" size={250} delay={2} />
      <Blob color="#a78bfa" x="40%" y="80%" size={200} delay={4} />

      {/* Grid texture */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 space-y-4"
        >
          {/* Label badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-semibold mb-4"
          >
            <motion.span
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-cyan-400 inline-block"
            />
            Packed with Power
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-gradient">
            Everything You Need.
            <br />
            <span className="text-text-primary">Nothing You Don't.</span>
          </h2>

          {/* Animated divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
            className="mx-auto mt-4 h-px w-32 bg-gradient-to-r from-transparent via-cyan-400 to-transparent origin-center"
          />
        </motion.div>

        {/* ── Feature cards grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {newFeatures.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>

        {/* ── Bottom stat strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-16 grid grid-cols-3 md:grid-cols-3 gap-4"
        >
          {[
            { value: '6+', label: 'Core Modules', color: '#22d3ee' },
            { value: '1 App', label: 'Everything Unified', color: '#a78bfa' },
            { value: '0', label: 'Extra Tools Needed', color: '#34d399' },
          ].map(({ value, label, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + i * 0.1, type: 'spring', stiffness: 150 }}
              whileHover={{ y: -4, scale: 1.03 }}
              className="text-center py-5 px-4 rounded-2xl bg-dark-primary/60 border border-white/5 backdrop-blur-sm"
            >
              <motion.p
                className="text-2xl md:text-3xl font-extrabold"
                style={{ color }}
              >
                {value}
              </motion.p>
              <p className="text-sm text-gray-400 mt-1">{label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default NewFeatures;