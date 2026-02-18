import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, X, ExternalLink } from 'lucide-react';

const navLinks = [
  { name: 'HOME', id: 'home' },
  { name: 'FEATURES', id: 'features' },
  { name: 'WHY US', id: 'why-us' },
  { name: 'SECURITY', id: 'security' },
  { name: 'PRICING', id: 'pricing' },
  { name: 'CONTACT', id: 'contact' },
  { name: 'BLOGS', href: '/blog' },
  { name: 'AROGYALENS LOGIN', href: 'https://dashboard.arogyalens.com/', isExternal: true },
];

// ── Animated underline indicator ─────────────────────────────────────────────
const NavLink = ({ link, scrollToSection, activeId }) => {
  const isActive = link.id && activeId === link.id;
  const isLogin = link.isExternal;

  const baseClass =
    'relative text-xs sm:text-sm tracking-wide font-medium whitespace-nowrap transition-colors duration-200 group';

  const content = (
    <>
      <span className={`${isLogin ? 'text-cyan-400' : isActive ? 'text-cyan-400' : 'text-text-primary group-hover:text-cyan-400'} transition-colors duration-200`}>
        {link.name}
      </span>
      {/* Animated underline */}
      {!isLogin && (
        <motion.span
          className="absolute -bottom-1 left-0 h-px bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"
          initial={false}
          animate={{ width: isActive ? '100%' : '0%' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        />
      )}
      {/* Login button glow pill */}
      {isLogin && (
        <motion.span
          className="absolute inset-0 rounded-md border border-cyan-500/40 bg-cyan-500/10"
          whileHover={{ boxShadow: '0 0 16px rgba(34,211,238,0.3)' }}
        />
      )}
    </>
  );

  if (link.href) {
    return (
      <a href={link.href} className={`${baseClass} ${isLogin ? 'px-3 py-1.5' : ''}`} target={isLogin ? '_blank' : undefined} rel={isLogin ? 'noopener noreferrer' : undefined}>
        <span className="relative z-10 flex items-center gap-1">
          {link.name}
          {isLogin && <ExternalLink className="w-3 h-3 text-cyan-400" />}
        </span>
        {!isLogin && (
          <motion.span
            className="absolute -bottom-1 left-0 h-px bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"
            initial={{ width: '0%' }}
            whileHover={{ width: '100%' }}
            transition={{ duration: 0.25 }}
          />
        )}
        {isLogin && (
          <span className="absolute inset-0 rounded-md border border-cyan-500/40 bg-cyan-500/10" />
        )}
      </a>
    );
  }

  return (
    <button onClick={() => scrollToSection(link.id)} className={baseClass}>
      {content}
      {/* Hover underline when not active */}
      {!isActive && (
        <motion.span
          className="absolute -bottom-1 left-0 h-px bg-cyan-400/50 rounded-full"
          initial={{ width: '0%' }}
          whileHover={{ width: '100%' }}
          transition={{ duration: 0.25 }}
        />
      )}
    </button>
  );
};

// ── Header ────────────────────────────────────────────────────────────────────
const Header = ({ isMenuOpen, setIsMenuOpen, scrollToSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState('home');
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 80], [0.8, 0.97]);

  // Scroll progress bar
  const scaleX = useTransform(scrollY, [0, 3000], [0, 1]);

  useEffect(() => {
    const unsub = scrollY.onChange((v) => setScrolled(v > 20));
    return () => unsub();
  }, [scrollY]);

  // Active section detection
  useEffect(() => {
    const sections = navLinks.filter(l => l.id).map(l => l.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActiveId(e.target.id); });
      },
      { threshold: 0.4 }
    );
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ── Scroll progress bar ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 z-[60] origin-left"
        style={{ scaleX }}
      />

      <motion.header
        style={{ opacity: headerOpacity }}
        className={`fixed top-0 w-full z-50 transition-shadow duration-300 ${
          scrolled ? 'shadow-[0_4px_40px_rgba(0,0,0,0.4)]' : ''
        }`}
      >
        {/* Blur/glass backdrop */}
        <div className="absolute inset-0 bg-dark-primary/80 backdrop-blur-lg border-b border-border-color" />

        {/* Animated glow line at bottom of header */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(34,211,238,0.4), transparent)',
          }}
          animate={{ backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-between items-center h-20">

            {/* ── Logo ── */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center"
            >
              <a href="/" className="block group">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  src="/images/Logos  (500 x 200 px).svg"
                  alt="arogyalens_logo"
                  className="h-10 w-auto sm:h-12 drop-shadow-[0_0_8px_rgba(34,211,238,0.3)] group-hover:drop-shadow-[0_0_14px_rgba(34,211,238,0.5)] transition-all duration-300"
                />
              </a>
            </motion.div>

            {/* ── Desktop Nav ── */}
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, staggerChildren: 0.05 }}
              className="hidden md:flex flex-wrap gap-x-5 items-center"
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                >
                  <NavLink link={link} scrollToSection={scrollToSection} activeId={activeId} />
                </motion.div>
              ))}
            </motion.nav>

            {/* ── Mobile Hamburger ── */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-text-primary relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.span
                    key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6 text-cyan-400" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* ── Mobile Menu ── */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                key="mobile-menu"
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="md:hidden overflow-hidden"
              >
                {/* Separator */}
                <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent mb-2" />

                <div className="flex flex-col pb-6 pt-2 gap-1">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.25 }}
                    >
                      {link.href ? (
                        <a
                          href={link.href}
                          target={link.isExternal ? '_blank' : undefined}
                          rel={link.isExternal ? 'noopener noreferrer' : undefined}
                          className={`flex items-center gap-2 px-3 py-2.5 rounded-lg font-medium transition-all duration-200
                            ${link.isExternal
                              ? 'text-cyan-400 border border-cyan-500/30 bg-cyan-500/10'
                              : 'text-text-primary hover:text-cyan-400 hover:bg-white/5'
                            }`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {link.name}
                          {link.isExternal && <ExternalLink className="w-3.5 h-3.5" />}
                        </a>
                      ) : (
                        <button
                          onClick={() => { scrollToSection(link.id); setIsMenuOpen(false); }}
                          className={`w-full text-left px-3 py-2.5 rounded-lg font-medium transition-all duration-200
                            ${activeId === link.id
                              ? 'text-cyan-400 bg-cyan-500/10 border-l-2 border-cyan-400'
                              : 'text-text-primary hover:text-cyan-400 hover:bg-white/5'
                            }`}
                        >
                          {link.name}
                        </button>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
    </>
  );
};

export default Header;