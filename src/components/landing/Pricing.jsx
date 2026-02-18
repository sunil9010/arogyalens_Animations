import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Sparkles, Zap, Building2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "Up to 10 patients",
    features: ["Basic EMR", "Appointment Scheduling", "Basic Reporting", "Email Support"],
    popular: false,
    icon: Zap,
    color: "#22d3ee",
    glow: "rgba(34,211,238,0.12)",
    gradient: "from-cyan-500/8 to-transparent",
    cta: "Get Started",
    tag: "Perfect to begin",
  },
  {
    name: "Professional",
    price: "₹99",
    period: "per month",
    features: ["Unlimited Patients", "Advanced Analytics", "Burnout Monitoring", "Incident Logging", "Priority Support"],
    popular: true,
    icon: Star,
    color: "#a78bfa",
    glow: "rgba(167,139,250,0.15)",
    gradient: "from-violet-500/10 to-blue-500/8",
    cta: "Get Started",
    tag: "Most Popular",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "Contact us",
    features: ["Multi-location Support", "Custom Integrations", "Facial Recognition", "Dedicated Support", "Training & Onboarding"],
    popular: false,
    icon: Building2,
    color: "#34d399",
    glow: "rgba(52,211,153,0.12)",
    gradient: "from-emerald-500/8 to-transparent",
    cta: "Contact Sales",
    tag: "For large teams",
  },
];

// ── Feature list item ─────────────────────────────────────────────────────────
const FeatureItem = ({ text, color, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.li
      initial={{ opacity: 0, x: -14 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 + index * 0.07, type: 'spring', stiffness: 130, damping: 18 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-3 cursor-default"
    >
      <motion.div
        animate={hovered ? { scale: 1.25, rotate: 8 } : { scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 280, damping: 18 }}
      >
        <CheckCircle
          className="h-5 w-5 flex-shrink-0 transition-colors duration-200"
          style={{ color: hovered ? color : '#64748b' }}
        />
      </motion.div>
      <motion.span
        className="text-base transition-colors duration-200"
        style={{ color: hovered ? '#f1f5f9' : '#94a3b8' }}
      >
        {text}
      </motion.span>
    </motion.li>
  );
};

// ── Pricing card ──────────────────────────────────────────────────────────────
const PricingCard = ({ plan, index, handleFeatureClick }) => {
  const [hovered, setHovered] = useState(false);
  const IconComponent = plan.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.13, type: 'spring', stiffness: 100, damping: 16 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col h-full cursor-default"
      style={{ zIndex: plan.popular ? 10 : 1 }}
    >
      {/* Popular — scale up slightly */}
      <motion.div
        animate={plan.popular ? { scale: hovered ? 1.03 : 1.02 } : { scale: hovered ? 1.02 : 1 }}
        transition={{ type: 'spring', stiffness: 180, damping: 20 }}
        className="relative flex flex-col h-full"
      >
        {/* Animated border glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={hovered
            ? { boxShadow: `0 0 0 1.5px ${plan.color}70, 0 20px 60px ${plan.glow}` }
            : plan.popular
              ? { boxShadow: `0 0 0 2px ${plan.color}50, 0 12px 40px ${plan.glow}` }
              : { boxShadow: '0 0 0 1px rgba(255,255,255,0.07)' }
          }
          transition={{ duration: 0.35, ease: 'easeOut' }}
        />

        {/* Card bg */}
        <div className={`absolute inset-0 rounded-2xl bg-dark-secondary bg-gradient-to-br ${plan.gradient}`} />

        {/* Top accent bar */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
          style={{ background: `linear-gradient(90deg, transparent, ${plan.color}, transparent)` }}
          animate={{ opacity: hovered || plan.popular ? 1 : 0.3 }}
          transition={{ duration: 0.3 }}
        />

        {/* Shimmer sweep */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
          <motion.div
            className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent"
            animate={hovered ? { x: ['−100%', '200%'] } : { x: '-100%' }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          />
        </div>

        {/* Popular badge */}
        <AnimatePresence>
          {plan.popular && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="absolute -top-4 left-1/2 -translate-x-1/2 z-20"
            >
              <div
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-bold shadow-lg"
                style={{ background: plan.color, color: '#0f172a' }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Most Popular
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content */}
        <div className="relative z-10 p-7 flex flex-col h-full">

          {/* Header */}
          <div className="text-center mb-7">

            {/* Icon */}
            <motion.div
              animate={hovered ? { scale: 1.12, rotate: -6, y: -3 } : { scale: 1, rotate: 0, y: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              className="inline-flex p-3 rounded-xl mb-4"
              style={{ background: plan.color + '18', border: `1px solid ${plan.color}30` }}
            >
              <IconComponent className="h-6 w-6" style={{ color: plan.color }} />
            </motion.div>

            {/* Tag */}
            <div
              className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-3"
              style={{ background: plan.color + '14', color: plan.color, border: `1px solid ${plan.color}25` }}
            >
              {plan.tag}
            </div>

            {/* Plan name */}
            <motion.h3
              className="text-xl font-bold mb-4 transition-colors duration-200"
              style={{ color: hovered ? plan.color : '#f1f5f9' }}
            >
              {plan.name}
            </motion.h3>

            {/* Price */}
            <div className="mb-1.5">
              <motion.span
                className="text-4xl font-extrabold"
                style={{ color: plan.color }}
                animate={hovered ? { scale: 1.06 } : { scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                {plan.price}
              </motion.span>
              {plan.price !== "Free" && plan.price !== "Custom" && (
                <span className="text-gray-400 text-sm ml-1">/{plan.period}</span>
              )}
            </div>

            <p className="text-gray-500 text-sm">{plan.period}</p>
          </div>

          {/* Divider */}
          <motion.div
            className="h-px mb-6 origin-center"
            style={{ background: `linear-gradient(90deg, transparent, ${plan.color}40, transparent)` }}
            animate={{ scaleX: hovered ? 1 : 0.5, opacity: hovered ? 1 : 0.4 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />

          {/* Features */}
          <ul className="space-y-3 flex-grow mb-7">
            {plan.features.map((feature, i) => (
              <FeatureItem key={i} text={feature} color={plan.color} index={i} />
            ))}
          </ul>

          {/* CTA button */}
          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            className="relative group"
          >
            {/* Button glow */}
            <motion.div
              className="absolute -inset-1 rounded-xl blur-lg"
              style={{ background: `linear-gradient(135deg, ${plan.color}, ${plan.color}80)` }}
              animate={{ opacity: hovered ? 0.25 : 0 }}
              transition={{ duration: 0.3 }}
            />
            <Button
              onClick={handleFeatureClick}
              className="relative w-full font-bold text-base py-5 transition-all duration-300"
              style={
                plan.popular
                  ? { background: plan.color, color: '#0f172a' }
                  : { background: 'transparent', color: plan.color, border: `1.5px solid ${plan.color}50` }
              }
            >
              {plan.cta}
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ── Orb ───────────────────────────────────────────────────────────────────────
const Orb = ({ color, x, y, size, delay }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none blur-3xl"
    style={{ background: color, width: size, height: size, left: x, top: y, opacity: 0.07 }}
    animate={{ scale: [1, 1.2, 1], x: [0, 20, 0], y: [0, -15, 0] }}
    transition={{ duration: 10 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
  />
);

// ── Section ───────────────────────────────────────────────────────────────────
const Pricing = ({ handleFeatureClick }) => {
  return (
    <section id="pricing" className="section-padding bg-dark-primary relative overflow-hidden">

      {/* Background */}
      <Orb color="#22d3ee" x="0%" y="5%"  size={400} delay={0} />
      <Orb color="#a78bfa" x="55%" y="0%" size={350} delay={3} />
      <Orb color="#34d399" x="80%" y="65%" size={300} delay={6} />
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

      {/* Slow scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/15 to-transparent pointer-events-none"
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-20 space-y-5"
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
            No Hidden Fees
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-gradient">
            Simple, Transparent Pricing
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
            Choose the plan that fits your healthcare facility's needs.
            Start free and scale as you grow.
          </motion.p>
        </motion.div>

        {/* ── Cards ── */}
        <div className="grid md:grid-cols-3 gap-7 items-stretch">
          {plans.map((plan, index) => (
            <PricingCard
              key={index}
              plan={plan}
              index={index}
              handleFeatureClick={handleFeatureClick}
            />
          ))}
        </div>

        {/* ── Bottom trust strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-14 text-center space-y-3"
        >
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-gray-500">
            {['✅ No credit card required', '🔒 Cancel anytime', '⚡ Setup in under 1 hour', '🇮🇳 Built for Indian healthcare'].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;