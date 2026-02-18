import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Shield, Phone, ExternalLink, Copy, CheckCheck } from "lucide-react";
import Footer from "./Footer";
import Header from "./Header";

// ── Copy-to-clipboard button ──────────────────────────────────────────────────
const CopyBtn = ({ text, color }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <motion.button
      onClick={handleCopy}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 280, damping: 18 }}
      className="ml-2 p-1.5 rounded-lg transition-colors duration-200"
      style={{
        background: copied ? color + "20" : "rgba(255,255,255,0.05)",
        border: `1px solid ${copied ? color + "40" : "rgba(255,255,255,0.1)"}`,
      }}
      title="Copy to clipboard"
    >
      <AnimatedIcon copied={copied} color={color} />
    </motion.button>
  );
};

const AnimatedIcon = ({ copied, color }) => (
  <motion.div
    key={copied ? "check" : "copy"}
    initial={{ scale: 0, rotate: -20 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{ type: "spring", stiffness: 300, damping: 18 }}
  >
    {copied
      ? <CheckCheck className="w-4 h-4" style={{ color }} />
      : <Copy className="w-4 h-4 text-gray-400" />
    }
  </motion.div>
);

// ── Contact detail card ───────────────────────────────────────────────────────
const ContactCard = ({ icon: Icon, label, value, href, color, index, copyable }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 + index * 0.12, type: "spring", stiffness: 120, damping: 18 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex items-start gap-4 p-5 rounded-2xl cursor-default overflow-hidden"
    >
      {/* Card bg */}
      <div className="absolute inset-0 rounded-2xl bg-dark-secondary/60" />
      <motion.div
        className="absolute inset-0 rounded-2xl transition-opacity duration-300"
        animate={{ opacity: hovered ? 1 : 0 }}
        style={{ background: `linear-gradient(135deg, ${color}0d, transparent)` }}
      />

      {/* Border glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={hovered
          ? { boxShadow: `0 0 0 1.5px ${color}55, 0 8px 30px ${color}12` }
          : { boxShadow: "0 0 0 1px rgba(255,255,255,0.07)" }
        }
        transition={{ duration: 0.3, ease: "easeOut" }}
      />

      {/* Left accent bar */}
      <motion.div
        className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full"
        style={{ background: color }}
        animate={{ opacity: hovered ? 1 : 0, scaleY: hovered ? 1 : 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      />

      {/* Shimmer */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
        <motion.div
          className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.025] to-transparent"
          animate={hovered ? { x: ["-100%", "200%"] } : { x: "-100%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      </div>

      {/* Icon */}
      <motion.div
        animate={hovered ? { scale: 1.12, rotate: -8, y: -2 } : { scale: 1, rotate: 0, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="relative flex-shrink-0 p-3 rounded-xl"
        style={{ background: color + "18", border: `1px solid ${color}30` }}
      >
        <motion.div
          className="absolute inset-0 rounded-xl blur-md"
          style={{ background: color + "25" }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        <Icon className="w-5 h-5 relative z-10 transition-colors duration-200" style={{ color: hovered ? color : "#94a3b8" }} />
      </motion.div>

      {/* Text */}
      <div className="relative z-10 flex-1 min-w-0">
        <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-1">{label}</p>
        <div className="flex items-center gap-1 flex-wrap">
          {href ? (
            <a
              href={href}
              className="text-base font-medium transition-colors duration-200 hover:underline flex items-center gap-1.5"
              style={{ color: hovered ? color : "#e2e8f0" }}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {value}
              {href.startsWith("http") && <ExternalLink className="w-3.5 h-3.5 opacity-60" />}
            </a>
          ) : (
            <p className="text-base font-medium transition-colors duration-200" style={{ color: hovered ? "#e2e8f0" : "#94a3b8" }}>
              {value}
            </p>
          )}
          {copyable && <CopyBtn text={value} color={color} />}
        </div>
      </div>
    </motion.div>
  );
};

// ── Floating orb ──────────────────────────────────────────────────────────────
const Orb = ({ color, x, y, size, delay }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none blur-3xl"
    style={{ background: color, width: size, height: size, left: x, top: y, opacity: 0.07 }}
    animate={{ scale: [1, 1.2, 1], x: [0, 20, 0], y: [0, -15, 0] }}
    transition={{ duration: 10 + delay, repeat: Infinity, ease: "easeInOut", delay }}
  />
);

// ── Main ──────────────────────────────────────────────────────────────────────
const ContactUs = () => {
  return (
    <div className="min-h-screen flex flex-col bg-dark-primary">

      <Header />

      <main className="flex-grow relative overflow-hidden">

        {/* Background */}
        <Orb color="#22d3ee" x="5%"   y="10%" size={400} delay={0} />
        <Orb color="#a78bfa" x="70%"  y="30%" size={350} delay={3} />
        <Orb color="#34d399" x="40%"  y="70%" size={280} delay={6} />
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

        {/* Scan line */}
        <motion.div
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/15 to-transparent pointer-events-none"
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        />

        <div className="max-w-3xl mx-auto px-6 py-24 relative z-10">

          {/* ── Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75, type: "spring", stiffness: 90, damping: 18 }}
            className="relative rounded-3xl overflow-hidden"
          >
            {/* Outer glow */}
            <motion.div
              className="absolute -inset-1 rounded-3xl blur-xl pointer-events-none"
              style={{ background: "linear-gradient(135deg, rgba(34,211,238,0.1), rgba(167,139,250,0.08))" }}
              animate={{ opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative bg-dark-secondary rounded-3xl overflow-hidden">

              {/* Pulsing border */}
              <motion.div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                animate={{
                  boxShadow: [
                    "0 0 0 1px rgba(34,211,238,0.2)",
                    "0 0 0 1.5px rgba(34,211,238,0.45)",
                    "0 0 0 1px rgba(34,211,238,0.2)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Top gradient bar */}
              <div className="h-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500" />

              {/* Shimmer sweep */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                <motion.div
                  className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.025] to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 4, repeat: Infinity, repeatDelay: 10, ease: "easeInOut" }}
                />
              </div>

              <div className="relative z-10 p-8 md:p-12">

                {/* ── Header ── */}
                <motion.div
                  initial={{ opacity: 0, y: -16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                  className="mb-10"
                >
                  {/* Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.15, type: "spring", stiffness: 150 }}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-semibold mb-5"
                  >
                    <motion.span
                      animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 1.4, repeat: Infinity }}
                      className="w-2 h-2 rounded-full bg-cyan-400 inline-block"
                    />
                    Grievance Officer
                  </motion.div>

                  <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
                    Contact Us
                  </h1>

                  {/* Animated divider */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.3, duration: 0.7 }}
                    className="h-px w-20 bg-gradient-to-r from-cyan-400 to-blue-500 origin-left mb-6"
                  />

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25, duration: 0.6 }}
                    className="text-gray-400 leading-relaxed mb-3"
                  >
                    If you have any questions, concerns, or complaints regarding the application, any orders, Privacy Policy, or your personal data, or if you wish to exercise your rights, you can contact our designated Grievance Officer.
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.32, duration: 0.6 }}
                    className="text-gray-500 text-sm leading-relaxed"
                  >
                    As per the <span className="text-cyan-400/80 font-medium">Information Technology Act, 2000</span> and rules made thereunder, the contact details of the Grievance Officer are provided below:
                  </motion.p>
                </motion.div>

                {/* Separator */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.35, duration: 0.7 }}
                  className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8 origin-center"
                />

                {/* ── Contact cards ── */}
                <div className="space-y-3">
                  <ContactCard
                    icon={Mail}
                    label="Email"
                    value="support@arogyalens.com"
                    href="mailto:support@arogyalens.com"
                    color="#22d3ee"
                    index={0}
                    copyable
                  />
                  <ContactCard
                    icon={MapPin}
                    label="Address"
                    value="WZ-1601-C, Rani Bagh, Delhi – 110034, India"
                    color="#a78bfa"
                    index={1}
                    copyable
                  />
                  <ContactCard
                    icon={Shield}
                    label="Legal Reference"
                    value="Information Technology Act, 2000"
                    color="#34d399"
                    index={2}
                  />
                </div>

                {/* ── Response promise strip ── */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75, duration: 0.55 }}
                  className="mt-8 flex flex-wrap gap-3"
                >
                  {[
                    { icon: "⚡", text: "Responds within 48 hours", color: "#f59e0b" },
                    { icon: "🔒", text: "Your data stays private",   color: "#22d3ee" },
                    { icon: "🇮🇳", text: "IT Act 2000 Compliant",    color: "#34d399" },
                  ].map(({ icon, text, color }, i) => (
                    <motion.div
                      key={text}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + i * 0.1, type: "spring", stiffness: 150 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium cursor-default"
                      style={{ background: color + "0d", border: `1px solid ${color}25`, color: color + "cc" }}
                    >
                      <span>{icon}</span> {text}
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactUs;