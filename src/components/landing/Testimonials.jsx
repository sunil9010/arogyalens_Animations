import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

const testimonials = [
  {
    quote: "As a dental clinic that had never used any software before, ArogyaLens was a game changer. Within days, my staff adapted to the system and our operations became smoother. From patient records to billing, it's all just a few clicks now. Their onboarding support was incredible.",
    author: "Dr. Sehgal",
    practice: "Dr. Sehgal's Dentistry, Delhi",
    initials: "DS",
    color: "#22d3ee",
    specialty: "Dental Clinic",
  },
  {
    quote: "We were skeptical about adopting a digital system, but ArogyaLens proved to be intuitive and reliable. Our administrative burden has reduced significantly. It's modern, secure, and perfect for hospitals like ours that want a clean start into tech without complexity.",
    author: "Dr. Shikha",
    practice: "Revive Hospital, Delhi",
    initials: "SK",
    color: "#a78bfa",
    specialty: "Multi-Specialty Hospital",
  },
  {
    quote: "We didn't have any digital workflow before, and were worried about learning curves. But ArogyaLens felt built for us — everything from scheduling to records and reports just works. Our team now has more time for patients instead of paperwork.",
    author: "Dr. Vipin",
    practice: "Rescue Hospital, Delhi",
    initials: "VP",
    color: "#34d399",
    specialty: "Emergency Hospital",
  },
];

// ── Slide variants ────────────────────────────────────────────────────────────
const variants = {
  enter: (dir) => ({ x: dir > 0 ? 340 : -340, opacity: 0, scale: 0.96 }),
  center: { x: 0, opacity: 1, scale: 1, zIndex: 1 },
  exit:  (dir) => ({ x: dir < 0 ? 340 : -340, opacity: 0, scale: 0.96, zIndex: 0 }),
};

// ── Star row ──────────────────────────────────────────────────────────────────
const Stars = ({ color, delay }) => (
  <div className="flex gap-1 justify-center mb-5">
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0, rotate: -30 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: delay + i * 0.07, type: 'spring', stiffness: 200 }}
      >
        <Star className="w-4 h-4 fill-current" style={{ color }} />
      </motion.div>
    ))}
  </div>
);

// ── Nav button ────────────────────────────────────────────────────────────────
const NavBtn = ({ onClick, children, color }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.93 }}
      transition={{ type: 'spring', stiffness: 280, damping: 18 }}
      className="relative p-2.5 rounded-full transition-colors duration-200 z-10"
      style={{
        background: hovered ? color + '20' : 'rgba(255,255,255,0.05)',
        border: `1px solid ${hovered ? color + '50' : 'rgba(255,255,255,0.1)'}`,
      }}
    >
      <motion.div style={{ color: hovered ? color : '#94a3b8' }} transition={{ duration: 0.2 }}>
        {children}
      </motion.div>
    </motion.button>
  );
};

// ── Dot indicator ─────────────────────────────────────────────────────────────
const Dot = ({ active, color, onClick }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.3 }}
    whileTap={{ scale: 0.85 }}
    transition={{ type: 'spring', stiffness: 300, damping: 18 }}
    className="rounded-full transition-all duration-300"
    style={{
      width: active ? 24 : 8,
      height: 8,
      background: active ? color : 'rgba(255,255,255,0.2)',
    }}
  />
);

// ── Avatar ────────────────────────────────────────────────────────────────────
const Avatar = ({ initials, color, isNew }) => (
  <motion.div
    key={isNew ? 'new' : 'old'}
    initial={{ scale: 0, rotate: -20 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{ type: 'spring', stiffness: 200, damping: 16, delay: 0.15 }}
    className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-extrabold shadow-lg flex-shrink-0"
    style={{ background: color + '25', border: `2px solid ${color}50`, color }}
  >
    {initials}
  </motion.div>
);

// ── Main ──────────────────────────────────────────────────────────────────────
const Testimonials = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);
  const current = testimonials[page];

  const paginate = useCallback((dir) => {
    setPage(([p]) => [(p + dir + testimonials.length) % testimonials.length, dir]);
  }, []);

  // Auto-advance every 5s
  useEffect(() => {
    if (isPaused) return;
    const t = setTimeout(() => paginate(1), 5000);
    return () => clearTimeout(t);
  }, [page, isPaused, paginate]);

  return (
    <section id="testimonials" className="section-padding bg-dark-secondary relative overflow-hidden">

      {/* ── Background ── */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none blur-3xl opacity-[0.07]"
        style={{ background: `radial-gradient(ellipse, ${current.color}, transparent)` }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

      {/* Scan line */}
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
          className="text-center mb-14 space-y-5"
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
            Real Stories from Real Doctors
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-gradient">
            Trusted by India's<br />
            <span className="text-text-primary">Leading Doctors</span>
          </h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mx-auto h-px w-28 bg-gradient-to-r from-transparent via-cyan-400 to-transparent origin-center"
          />
        </motion.div>

        {/* ── Testimonial card ── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, type: 'spring', stiffness: 90, damping: 18 }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative max-w-4xl mx-auto"
        >
          {/* Outer breathing glow — color-synced to current testimonial */}
          <motion.div
            className="absolute -inset-1 rounded-3xl blur-xl pointer-events-none"
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ background: `linear-gradient(135deg, ${current.color}18, transparent 60%)` }}
          />

          <div className="relative bg-dark-primary rounded-3xl overflow-hidden">

            {/* Animated border pulse */}
            <motion.div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              animate={{
                boxShadow: [
                  `0 0 0 1px ${current.color}25`,
                  `0 0 0 1.5px ${current.color}50`,
                  `0 0 0 1px ${current.color}25`,
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Top color bar */}
            <motion.div
              className="h-0.5 w-full"
              style={{ background: `linear-gradient(90deg, transparent, ${current.color}, transparent)` }}
              key={page}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />

            {/* Shimmer */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
              <motion.div
                className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.025] to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 4, repeat: Infinity, repeatDelay: 8, ease: 'easeInOut' }}
              />
            </div>

            {/* Ghost Quote icon */}
            <motion.div
              className="absolute top-6 right-8 pointer-events-none"
              animate={{ rotate: [0, 5, 0], scale: [1, 1.04, 1] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Quote
                size={90}
                strokeWidth={0.8}
                style={{ color: current.color, opacity: 0.06 }}
              />
            </motion.div>

            {/* Slide content */}
            <div className="relative min-h-[300px] md:min-h-[260px] flex items-center justify-center overflow-hidden px-4">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={page}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: 'spring', stiffness: 260, damping: 28 },
                    opacity: { duration: 0.25 },
                    scale: { duration: 0.3 },
                  }}
                  className="w-full px-8 md:px-14 py-10 text-center"
                >
                  {/* Stars */}
                  <Stars color={current.color} delay={0.1} />

                  {/* Quote icon */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                    className="flex justify-center mb-4"
                  >
                    <div
                      className="p-2 rounded-full"
                      style={{ background: current.color + '18', border: `1px solid ${current.color}30` }}
                    >
                      <Quote className="h-5 w-5" style={{ color: current.color }} />
                    </div>
                  </motion.div>

                  {/* Quote text */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.18, duration: 0.45 }}
                    className="text-base md:text-lg italic text-gray-300 leading-relaxed mb-7 max-w-2xl mx-auto"
                  >
                    "{current.quote}"
                  </motion.p>

                  {/* Author row */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.28, duration: 0.4 }}
                    className="flex items-center justify-center gap-3"
                  >
                    <Avatar initials={current.initials} color={current.color} isNew />
                    <div className="text-left">
                      <p className="font-bold text-white text-sm">{current.author}</p>
                      <p className="text-xs text-gray-500">{current.practice}</p>
                      <p
                        className="text-xs font-semibold mt-0.5"
                        style={{ color: current.color + 'cc' }}
                      >
                        {current.specialty}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Nav + dots row */}
            <div className="relative z-10 flex items-center justify-center gap-5 pb-7">
              <NavBtn onClick={() => paginate(-1)} color={current.color}>
                <ChevronLeft className="h-5 w-5" />
              </NavBtn>

              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <Dot
                    key={i}
                    active={i === page}
                    color={testimonials[i].color}
                    onClick={() => setPage([i, i > page ? 1 : -1])}
                  />
                ))}
              </div>

              <NavBtn onClick={() => paginate(1)} color={current.color}>
                <ChevronRight className="h-5 w-5" />
              </NavBtn>
            </div>

            {/* Auto-play progress bar */}
            {!isPaused && (
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 rounded-full"
                style={{ background: current.color }}
                key={page}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 5, ease: 'linear' }}
              />
            )}
          </div>
        </motion.div>

        {/* ── Bottom trust strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-gray-500"
        >
          {['🏥 500+ Hospitals', '⭐ 4.8 App Rating', '👨‍⚕️ 10K+ Doctors', '🇮🇳 Across India'].map(item => (
            <span key={item}>{item}</span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;