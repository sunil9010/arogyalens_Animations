import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { TrendingUp, DollarSign, Clock, Heart, MessageSquare } from 'lucide-react';

// ── Animated number count-up ──────────────────────────────────────────────────
const CountUp = ({ target, prefix = '', suffix = '', duration = 1.8, isFloat = false }) => {
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
      else setCount(isFloat ? parseFloat(start.toFixed(1)) : Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, target, duration, isFloat]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
};

// ── Data ──────────────────────────────────────────────────────────────────────
const metrics = [
  {
    icon: TrendingUp,
    stat: '30%',
    statVal: 30,
    statSuffix: '%',
    label: 'Fewer No-Shows',
    text: 'Smart alerts and appointment reminders keep your schedule full and patients on track.',
    color: '#22d3ee',
    glow: 'rgba(34,211,238,0.12)',
  },
  {
    icon: DollarSign,
    stat: '20%',
    statVal: 20,
    statSuffix: '%',
    label: 'Revenue Increase',
    text: 'Accurate billing and reduced missed follow-ups mean more income with less effort.',
    color: '#34d399',
    glow: 'rgba(52,211,153,0.12)',
  },
  {
    icon: Clock,
    stat: '50+',
    statVal: 50,
    statSuffix: '+',
    label: 'Hours Saved / Month',
    text: 'Automated scheduling, reports, and WhatsApp patient logs eliminate repetitive manual work.',
    color: '#a78bfa',
    glow: 'rgba(167,139,250,0.12)',
  },
  {
    icon: Heart,
    stat: '98%',
    statVal: 98,
    statSuffix: '%',
    label: 'Staff Satisfaction',
    text: 'Wellness tracking and optimised rosters keep your team happy, healthy, and retained.',
    color: '#f43f5e',
    glow: 'rgba(244,63,94,0.12)',
  },
];

const statStrip = [
  { val: 500, suffix: '+', label: 'Hospitals Onboarded', color: '#22d3ee' },
  { val: 10,  suffix: 'K+', label: 'Active Doctors',     color: '#a78bfa' },
  { val: 98,  suffix: '%',  label: 'Satisfaction Rate',  color: '#34d399' },
];

// ── Metric card ───────────────────────────────────────────────────────────────
const MetricCard = ({ metric, index }) => {
  const [hovered, setHovered] = useState(false);
  const fromLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: fromLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, type: 'spring', stiffness: 100, damping: 18 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex items-start gap-5 p-6 rounded-2xl cursor-default overflow-hidden"
    >
      {/* Card bg */}
      <div className="absolute inset-0 bg-dark-primary rounded-2xl" />
      <div
        className="absolute inset-0 rounded-2xl transition-opacity duration-300"
        style={{ background: `linear-gradient(135deg, ${metric.color}08, transparent)`, opacity: hovered ? 1 : 0 }}
      />

      {/* Animated border */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={hovered
          ? { boxShadow: `0 0 0 1.5px ${metric.color}55, 0 12px 40px ${metric.glow}` }
          : { boxShadow: '0 0 0 1px rgba(255,255,255,0.06)' }
        }
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />

      {/* Left accent bar */}
      <motion.div
        className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full"
        style={{ background: metric.color }}
        animate={{ opacity: hovered ? 1 : 0, scaleY: hovered ? 1 : 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      />

      {/* Shimmer */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
        <motion.div
          className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.025] to-transparent"
          animate={hovered ? { x: ['-100%', '200%'] } : { x: '-100%' }}
          transition={{ duration: 0.65, ease: 'easeInOut' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-start gap-5 w-full">
        {/* Icon + stat stacked */}
        <div className="flex-shrink-0 flex flex-col items-center gap-2">
          <motion.div
            animate={hovered ? { scale: 1.12, rotate: -8, y: -3 } : { scale: 1, rotate: 0, y: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            className="p-3.5 rounded-xl relative"
            style={{ background: metric.color + '18', border: `1px solid ${metric.color}30` }}
          >
            {/* Icon glow */}
            <motion.div
              className="absolute inset-0 rounded-xl blur-md"
              style={{ background: metric.glow }}
              animate={{ opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
            <metric.icon className="h-7 w-7 relative z-10 transition-colors duration-200" style={{ color: hovered ? metric.color : '#94a3b8' }} />
          </motion.div>

          {/* Animated stat number */}
          <motion.span
            className="text-lg font-extrabold tabular-nums"
            style={{ color: metric.color }}
            animate={hovered ? { scale: 1.1 } : { scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <CountUp target={metric.statVal} suffix={metric.statSuffix} />
          </motion.span>
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0 pt-1">
          <motion.p
            className="text-sm font-semibold mb-1 transition-colors duration-200"
            style={{ color: hovered ? metric.color : '#cbd5e1' }}
          >
            {metric.label}
          </motion.p>
          <motion.p
            className="text-base leading-relaxed transition-colors duration-200"
            style={{ color: hovered ? '#e2e8f0' : '#64748b' }}
          >
            {metric.text}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

// ── Main ──────────────────────────────────────────────────────────────────────
const RoiMetrics = () => {
  const [ctaHovered, setCtaHovered] = useState(false);

  return (
    <section id="roi" className="section-padding bg-dark-secondary relative overflow-hidden">

      {/* ── Background ── */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full pointer-events-none blur-3xl opacity-[0.07]"
        style={{ background: 'radial-gradient(ellipse, #22d3ee, transparent)' }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none blur-3xl opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, #a78bfa, transparent)' }}
        animate={{ scale: [1, 1.15, 1], x: [0, -20, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

      {/* Scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/15 to-transparent pointer-events-none"
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Header ── */}
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
            Real Results, Real Impact
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-gradient">
            Grow Your Clinic<br />
            <span className="text-text-primary">with Smart Tech</span>
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
            className="text-lg text-gray-400 max-w-xl mx-auto"
          >
            See how ArogyaLens transforms your practice with measurable, data-backed outcomes.
          </motion.p>
        </motion.div>

        {/* ── Stat strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="grid grid-cols-3 gap-4 mb-14"
        >
          {statStrip.map(({ val, suffix, label, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.1, type: 'spring', stiffness: 140 }}
              whileHover={{ y: -4, scale: 1.04 }}
              className="text-center py-5 px-3 rounded-2xl bg-dark-primary/60 border border-white/5 backdrop-blur-sm"
            >
              <p className="text-2xl md:text-3xl font-extrabold" style={{ color }}>
                <CountUp target={val} suffix={suffix} />
              </p>
              <p className="text-xs text-gray-500 mt-1 font-medium">{label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Metric cards ── */}
        <div className="grid md:grid-cols-2 gap-5 mb-16">
          {metrics.map((metric, index) => (
            <MetricCard key={index} metric={metric} index={index} />
          ))}
        </div>

        {/* ── Connector line ── */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mx-auto mb-8 w-px h-10 bg-gradient-to-b from-cyan-400/40 to-transparent origin-top"
        />

        {/* ── CTA ── */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="relative inline-block"
            onMouseEnter={() => setCtaHovered(true)}
            onMouseLeave={() => setCtaHovered(false)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Glow halo */}
            <motion.div
              className="absolute -inset-2 rounded-xl blur-lg bg-gradient-to-r from-cyan-400 to-emerald-400"
              animate={{ opacity: ctaHovered ? 0.28 : 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
            <a href="https://wa.me/918595467431" target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="relative bg-accent-cyan text-dark-primary font-bold hover:bg-accent-cyan/90 transition-all duration-300 text-lg px-8 py-6"
              >
                <motion.span
                  animate={ctaHovered ? { rotate: [0, -10, 10, 0] } : { rotate: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <MessageSquare className="mr-3 h-6 w-6" />
                </motion.span>
                Talk to Our Team
              </Button>
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-sm text-gray-500"
          >
            💬 Usually responds within a few hours · Available Mon–Sat
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default RoiMetrics;