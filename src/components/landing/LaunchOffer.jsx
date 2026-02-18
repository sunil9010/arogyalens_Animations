import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Gift, CheckCircle, Sparkles, Timer, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const offerBenefits = [
  {
    text: "Free website for hospitals and clinics subscribing to ArogyaLens",
    emoji: "🏥",
    color: "#22d3ee",
  },
  {
    text: "₹999 personal portfolio website for verified individual doctors",
    emoji: "👨‍⚕️",
    color: "#a78bfa",
  },
  {
    text: "We take care of design, content, and setup — you focus on your practice.",
    emoji: "✨",
    color: "#34d399",
  },
];

// ── Benefit row ───────────────────────────────────────────────────────────────
const BenefitRow = ({ item, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 + index * 0.13, type: 'spring', stiffness: 120, damping: 18 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex items-start gap-4 p-3 rounded-2xl cursor-default transition-colors duration-300"
      style={{ background: hovered ? item.color + '0e' : 'transparent' }}
    >
      {/* Left accent bar */}
      <motion.div
        className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full"
        style={{ background: item.color }}
        animate={{ opacity: hovered ? 1 : 0, scaleY: hovered ? 1 : 0 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
      />

      {/* Check icon */}
      <motion.div
        animate={hovered ? { scale: 1.2, rotate: 10 } : { scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 280, damping: 18 }}
        className="flex-shrink-0 mt-0.5"
      >
        <CheckCircle className="h-6 w-6 transition-colors duration-200" style={{ color: hovered ? item.color : '#94a3b8' }} />
      </motion.div>

      {/* Emoji */}
      <motion.span
        animate={hovered ? { scale: 1.25, y: -2 } : { scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 260 }}
        className="text-xl flex-shrink-0 leading-none mt-0.5"
      >
        {item.emoji}
      </motion.span>

      {/* Text */}
      <motion.p
        className="text-base md:text-lg leading-relaxed transition-colors duration-200"
        style={{ color: hovered ? '#f1f5f9' : '#94a3b8' }}
      >
        {item.text}
      </motion.p>
    </motion.div>
  );
};

// ── Floating sparkle particle ─────────────────────────────────────────────────
const Sparkle = ({ x, y, delay, size }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ left: x, top: y }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], y: [0, -20, -40] }}
    transition={{ duration: 2.5, delay, repeat: Infinity, repeatDelay: Math.random() * 4 + 2 }}
  >
    <Star className="text-cyan-400/60" style={{ width: size, height: size }} fill="currentColor" />
  </motion.div>
);

// ── Main ──────────────────────────────────────────────────────────────────────
const LaunchOffer = () => {
  const [ctaHovered, setCtaHovered] = useState(false);

  const sparkles = [
    { x: '8%',  y: '15%', delay: 0,   size: 10 },
    { x: '92%', y: '20%', delay: 0.7, size: 8  },
    { x: '15%', y: '80%', delay: 1.4, size: 6  },
    { x: '85%', y: '75%', delay: 0.4, size: 10 },
    { x: '50%', y: '8%',  delay: 1.1, size: 7  },
    { x: '75%', y: '50%', delay: 1.8, size: 6  },
  ];

  return (
    <section id="launch-offer" className="section-padding bg-dark-secondary relative overflow-hidden">
      {/* Section-level background blobs */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none blur-3xl opacity-10"
        style={{ background: 'radial-gradient(ellipse, #22d3ee, transparent)' }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative bg-dark-primary rounded-3xl overflow-hidden"
        >
          {/* Animated glowing border */}
          <motion.div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            animate={{
              boxShadow: [
                '0 0 0 1px rgba(34,211,238,0.3), 0 0 40px rgba(34,211,238,0.05)',
                '0 0 0 1.5px rgba(34,211,238,0.6), 0 0 60px rgba(34,211,238,0.12)',
                '0 0 0 1px rgba(34,211,238,0.3), 0 0 40px rgba(34,211,238,0.05)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Shimmer sweep across the whole card */}
          <motion.div
            className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent pointer-events-none"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 4, repeat: Infinity, repeatDelay: 8, ease: 'easeInOut' }}
          />

          {/* Corner sparkles */}
          {sparkles.map((s, i) => <Sparkle key={i} {...s} />)}

          {/* Big ghost Gift icon */}
          <motion.div
            className="absolute -top-10 -right-10 text-accent-cyan/[0.06] pointer-events-none"
            animate={{ rotate: [0, 8, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Gift size={220} strokeWidth={0.8} />
          </motion.div>

          {/* Gradient mesh inside card */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-violet-500/5 pointer-events-none" />

          {/* ── Content ── */}
          <div className="relative z-10 p-8 md:p-12">

            {/* Top badges row */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="flex flex-wrap items-center gap-3 mb-6"
            >
              {/* Pulsing live badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-semibold">
                <motion.span
                  animate={{ scale: [1, 1.6, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-cyan-400 inline-block"
                />
                Limited Time
              </div>

              {/* Timer badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-sm font-semibold">
                <Timer className="w-3.5 h-3.5" />
                Offer Ending Soon
              </div>

              {/* Sparkles badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-sm font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                Exclusive Benefits
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.18, duration: 0.65 }}
              className="text-3xl md:text-4xl font-extrabold text-gradient mb-4"
            >
              Limited-Time Launch Offer
            </motion.h2>

            {/* Animated divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="h-px w-20 bg-gradient-to-r from-cyan-400 to-blue-400 mb-5 origin-left"
            />

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="text-lg text-text-secondary mb-8 max-w-2xl"
            >
              Register and verify your profile on ArogyaLens to unlock these exclusive benefits:
            </motion.p>

            {/* Benefits list */}
            <div className="space-y-1 mb-10">
              {offerBenefits.map((benefit, index) => (
                <BenefitRow key={index} item={benefit} index={index} />
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <Link to="/launch-offer">
                <motion.div
                  className="relative group"
                  onMouseEnter={() => setCtaHovered(true)}
                  onMouseLeave={() => setCtaHovered(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {/* Glow halo */}
                  <motion.div
                    className="absolute -inset-1.5 rounded-xl blur-lg bg-gradient-to-r from-cyan-400 to-blue-500"
                    animate={{ opacity: ctaHovered ? 0.35 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <Button
                    size="lg"
                    className="relative bg-accent-cyan text-dark-primary font-bold hover:bg-accent-cyan/90 transition-all duration-300 text-lg px-8 py-6"
                  >
                    See Full Offer Details
                    <motion.span
                      animate={{ x: ctaHovered ? 5 : 0 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <ArrowRight className="ml-3 h-6 w-6" />
                    </motion.span>
                  </Button>
                </motion.div>
              </Link>

              {/* Social proof nudge */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="text-sm text-gray-500 flex items-center gap-1.5"
              >
                <span className="text-base">🔥</span>
                <span>Join <span className="text-cyan-400 font-semibold">500+</span> hospitals already using ArogyaLens</span>
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LaunchOffer;