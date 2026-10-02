import { Link } from 'react-router-dom'
import { Shield, ExternalLink, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{ width: '100%', background: 'var(--color-surface-container-lowest)', borderTop: '1px solid rgba(196,197,215,0.4)', marginTop: 'var(--space-xl)' }}>
      {/* Advisory Banner */}
      <div style={{
        background: 'rgba(255,218,214,0.3)', borderBottom: '1px solid rgba(255,218,214,0.6)',
        padding: 'var(--space-sm) var(--margin)',
      }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-xs)', textAlign: 'center' }}>
          <Shield size={18} style={{ color: 'var(--color-error)', flexShrink: 0 }} />
          <p className="text-label-md" style={{ color: 'var(--color-on-surface)' }}>
            <strong>Official Advisory:</strong> Sangyan Shield does NOT give investment advice or predict returns. We independently verify identity, credentials, and scam patterns before you transfer money.
          </p>
        </div>
      </div>

      {/* Main Footer */}
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: 'var(--space-xl) var(--margin)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-xl)', paddingBottom: 'var(--space-lg)' }}>
          {/* Brand */}
          <div style={{ gridColumn: 'span 1', display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
              <div style={{
                width: 32, height: 32, borderRadius: 'var(--radius-md)',
                background: 'linear-gradient(135deg, #1f4fd8, #0f1f54)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Shield size={16} color="#fff" />
              </div>
              <span className="text-headline-sm" style={{ color: 'var(--color-primary)' }}>Sangyan Shield</span>
            </Link>
            <p className="text-body-sm" style={{ color: 'var(--color-on-surface-variant)', maxWidth: 380 }}>
              National Civic Fintech AI Verification Shield for India. Real-time protection against UPI scams, fake investment apps, social engineering threats, and fraudulent sender handles.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', paddingTop: 'var(--space-xs)' }}>
              <Shield size={14} style={{ color: 'var(--color-tertiary)' }} />
              <span className="text-label-sm" style={{ color: 'var(--color-tertiary)', fontWeight: 600 }}>
                100% Confidential • Built for Bharat • Zero Data Selling
              </span>
            </div>
          </div>

          {/* Institutional Portals */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
            <span className="text-label-lg" style={{ color: 'var(--color-on-surface)', marginBottom: 'var(--space-xs)' }}>Institutional Portals</span>
            {[
              { label: 'National Cyber Crime (cybercrime.gov.in)', href: 'https://cybercrime.gov.in' },
              { label: 'National Cyber Helpline: Dial 1930', href: 'tel:1930' },
              { label: 'SEBI SCORES Portal', href: 'https://scores.sebi.gov.in' },
              { label: 'RBI Kehta Hai Advisory', href: 'https://rbikehtahai.rbi.org.in' },
            ].map(link => (
              <a
                key={link.href}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener"
                className="text-body-sm"
                style={{
                  color: 'var(--color-on-surface-variant)',
                  transition: 'color 0.2s',
                  display: 'flex', alignItems: 'center', gap: 4,
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--color-primary)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--color-on-surface-variant)'}
              >
                {link.label}
                {link.href.startsWith('http') && <ExternalLink size={11} />}
              </a>
            ))}
          </div>

          {/* Legal */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
            <span className="text-label-lg" style={{ color: 'var(--color-on-surface)', marginBottom: 'var(--space-xs)' }}>Legal & Standards</span>
            {[
              { label: 'Citizen Data Privacy Policy', to: '/' },
              { label: 'Terms of Verification', to: '/' },
              { label: 'Public API & Telemetry', to: '/' },
              { label: 'Grievance Officer Contact', to: '/' },
            ].map(link => (
              <Link
                key={link.label}
                to={link.to}
                className="text-body-sm"
                style={{ color: 'var(--color-on-surface-variant)', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--color-primary)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--color-on-surface-variant)'}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div style={{
          borderTop: '1px solid rgba(196,197,215,0.3)', paddingTop: 'var(--space-md)',
          display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-sm)',
        }}>
          <p className="text-label-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
            © 2025 Sangyan Shield (संज्ञान शील्ड). An open cyber resilience initiative for Digital India.
          </p>
          <span className="text-label-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
            Designed for UPI & Digital Payment Users Across Bharat
          </span>
        </div>
      </div>
    </footer>
  )
}
