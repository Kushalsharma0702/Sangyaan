import { useState, useEffect, useCallback } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Shield, Phone, Globe, ChevronDown, Menu, X,
  Languages
} from 'lucide-react'

const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/verify', label: 'Verify / Check Workspace' },
  { path: '/history', label: 'History' },
  { path: '/learn', label: 'Learn (Micro-Lessons)' },
  { path: '/report', label: 'Report Fraud' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const toggleMobile = useCallback(() => setMobileOpen(p => !p), [])

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 100,
          background: scrolled
            ? 'rgba(255,255,255,0.95)'
            : 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${scrolled ? 'rgba(196,197,215,0.5)' : 'rgba(196,197,215,0.3)'}`,
          boxShadow: scrolled ? 'var(--shadow-header)' : 'none',
          transition: 'box-shadow 0.3s, border-color 0.3s',
        }}
      >
        <div
          style={{
            height: 72,
            maxWidth: 1440,
            margin: '0 auto',
            padding: '0 var(--margin)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-md)',
          }}
        >
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
            <div style={{
              width: 36, height: 36, borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, #1f4fd8, #0f1f54)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Shield size={20} color="#fff" strokeWidth={2.5} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="text-headline-sm" style={{ color: 'var(--color-primary)', letterSpacing: '-0.02em', lineHeight: 1 }}>
                Sangyan Shield
              </span>
              <span className="text-label-sm" style={{ color: 'var(--color-on-surface-variant)', marginTop: 2 }}>
                संज्ञान शील्ड • Verify Before You Pay
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-lg)' }} className="desktop-nav">
            {NAV_LINKS.map(link => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className="text-label-lg"
                style={({ isActive }) => ({
                  padding: 'var(--space-sm) 0',
                  color: isActive ? 'var(--color-primary)' : 'var(--color-on-surface-variant)',
                  fontWeight: isActive ? 700 : 600,
                  borderBottom: isActive ? '2px solid var(--color-primary)' : '2px solid transparent',
                  transition: 'color 0.2s, border-color 0.2s',
                  whiteSpace: 'nowrap',
                })}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
            <button
              className="text-label-md"
              style={{
                display: 'flex', alignItems: 'center', gap: 4,
                padding: '6px 12px', borderRadius: 'var(--radius-full)',
                background: 'var(--color-surface-container-low)',
                color: 'var(--color-on-surface-variant)',
                transition: 'background 0.2s',
              }}
            >
              <Languages size={16} />
              <span>हिंदी / EN</span>
            </button>

            <a
              href="tel:1930"
              className="text-label-md helpline-btn"
              style={{
                display: 'flex', alignItems: 'center', gap: 4,
                padding: '6px 12px', borderRadius: 'var(--radius-full)',
                background: 'var(--color-error-container)',
                color: 'var(--color-on-error-container)',
                fontWeight: 600, transition: 'opacity 0.2s',
              }}
            >
              <Phone size={14} style={{ color: 'var(--color-error)' }} />
              <span>1930</span>
            </a>

            <div className="profile-section" style={{ display: 'flex', alignItems: 'center', gap: 4, paddingLeft: 4 }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--color-primary-fixed), var(--color-secondary-fixed))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--color-primary)', fontWeight: 700, fontSize: 13,
              }}>
                RK
              </div>
              <span className="text-label-md profile-name" style={{ color: 'var(--color-on-surface)', fontWeight: 500 }}>
                Rajesh K.
              </span>
              <ChevronDown size={16} style={{ color: 'var(--color-on-surface-variant)' }} />
            </div>

            {/* Mobile menu toggle */}
            <button
              className="mobile-menu-btn"
              onClick={toggleMobile}
              style={{
                display: 'none', width: 40, height: 40,
                alignItems: 'center', justifyContent: 'center',
                borderRadius: 'var(--radius-md)',
                background: 'var(--color-surface-container-low)',
              }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="mobile-nav-overlay"
            style={{
              position: 'fixed', top: 72, left: 0, right: 0, bottom: 0,
              zIndex: 99, background: 'rgba(255,255,255,0.98)',
              backdropFilter: 'blur(12px)', padding: 'var(--margin)',
              display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)',
            }}
          >
            {NAV_LINKS.map(link => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className="text-headline-sm"
                style={({ isActive }) => ({
                  padding: 'var(--space-md) var(--space-lg)',
                  borderRadius: 'var(--radius-lg)',
                  color: isActive ? 'var(--color-primary)' : 'var(--color-on-surface)',
                  background: isActive ? 'var(--color-primary-fixed)' : 'transparent',
                  fontWeight: isActive ? 700 : 500,
                  transition: 'all 0.2s',
                })}
              >
                {link.label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .desktop-nav { display: flex !important; }
        .mobile-menu-btn { display: none !important; }
        .profile-name { display: inline !important; }
        @media (max-width: 1199px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .profile-name { display: none !important; }
        }
        @media (max-width: 640px) {
          .helpline-btn span { display: none; }
          .profile-section { display: none !important; }
        }
      `}</style>
    </>
  )
}
