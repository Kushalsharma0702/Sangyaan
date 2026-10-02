import { useState, Suspense, lazy } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Shield, ShieldCheck, ShieldAlert, ShieldX, Verified,
  ScanSearch, Link2, MessageSquare, Mic, ArrowRight,
  PlayCircle, Wallet, Handshake, Lock, Search,
  ClipboardPaste, Ban, AlertTriangle, CircleAlert,
  CheckCircle, TrendingUp, Phone
} from 'lucide-react'
import PageTransition from '../components/PageTransition'

const Shield3D = lazy(() => import('../components/Shield3D'))

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay, ease: 'easeOut' },
})

const ACTION_CARDS = [
  {
    icon: ScanSearch, label: 'Upload Screenshot', desc: 'Scan WhatsApp chats, Telegram groups, payment receipts & app mockups.',
    tag: 'Instant OCR', color: 'var(--color-primary)', bgColor: 'var(--color-primary-fixed)',
    hoverBg: 'var(--color-primary)', action: 'Scan Document', tab: 'screenshot',
  },
  {
    icon: Link2, label: 'Check a Link', desc: 'Inspect suspicious investment portals, fake APK downloads & malicious URLs.',
    tag: 'Domain & SSL', color: 'var(--color-tertiary)', bgColor: 'var(--color-tertiary-fixed)',
    hoverBg: 'var(--color-tertiary)', action: 'Analyze URL', tab: 'link',
  },
  {
    icon: MessageSquare, label: 'Paste Message', desc: 'Detect Ponzi patterns, fake job offers, and guaranteed return traps.',
    tag: 'NLP Fraud Model', color: 'var(--color-secondary)', bgColor: 'var(--color-secondary-fixed)',
    hoverBg: 'var(--color-secondary)', action: 'Inspect Text', tab: 'message',
  },
  {
    icon: Mic, label: 'Record Voice', desc: 'Analyze recorded calls, extortion audio notes, and fake police threats.',
    tag: 'Bilingual Audio', color: 'var(--color-primary)', bgColor: 'var(--color-surface-container-high)',
    hoverBg: 'var(--color-primary-container)', action: 'Analyze Audio', tab: 'voice',
  },
]

const SAMPLE_QUERIES = [
  { label: 'paytm-refund-support@ybl', value: 'paytm-refund-support@ybl' },
  { label: 'groww_daily_50pct_profit', value: 'https://telegram.me/groww_daily_50pct_profit' },
  { label: 'SEBI Reg INZ000000000', value: 'SEBI Reg INZ000000000' },
]

const ALERTS = [
  {
    type: 'Telegram Channel Tip', title: 'XYZ Global FX Trading',
    riskLevel: 'High Risk 94/100', riskColor: 'var(--color-error)',
    riskBg: 'var(--color-error-container)', riskTextColor: 'var(--color-on-error-container)',
    desc: 'Claimed guaranteed 50% weekly profit on crypto arbitrage. Fraudulent SEBI ID provided:',
    code: 'INZ00982', time: 'Reported 24 mins ago', status: 'Flagged Scam',
    statusIcon: Ban, iconColor: 'var(--color-error)',
  },
  {
    type: 'Phishing Link (SMS)', title: 'sebi-online-kyc-verify.in',
    riskLevel: 'Critical 98/100', riskColor: 'var(--color-on-error)',
    riskBg: 'var(--color-error)', riskTextColor: 'var(--color-on-error)',
    desc: 'Impersonating government regulator to harvest net banking login credentials and OTPs. Server traced to rogue overseas IP block.',
    code: null, time: 'Reported 1 hr ago', status: 'Domain Blacklisted',
    statusIcon: Shield, iconColor: 'var(--color-error)',
  },
  {
    type: 'SEBI / AMFI Registered', title: 'ABC Mutual Fund Agency',
    riskLevel: 'Low Risk 10/100', riskColor: 'var(--color-tertiary)',
    riskBg: 'var(--color-tertiary-fixed)', riskTextColor: 'var(--color-on-tertiary-fixed)',
    desc: 'Verified AMFI Registered distributor code:',
    code: 'ARN-88321', time: 'Scanned 2 hrs ago', status: 'Identity Confirmed',
    statusIcon: ShieldCheck, iconColor: 'var(--color-tertiary)',
  },
]

export default function HomePage() {
  const [query, setQuery] = useState('')
  const [resultVisible, setResultVisible] = useState(false)
  const [resultType, setResultType] = useState('danger')
  const navigate = useNavigate()

  const runCheck = (val) => {
    const v = (val || query).trim().toLowerCase()
    if (!v) return
    setQuery(val || query)
    const isSafe = v.includes('arn') || v.includes('registered') || v.includes('agency')
    setResultType(isSafe ? 'safe' : 'danger')
    setResultVisible(true)
  }

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      if (text) { setQuery(text); runCheck(text) }
    } catch {
      setQuery('suspicious-telegram-fund@paytm')
      runCheck('suspicious-telegram-fund@paytm')
    }
  }

  return (
    <PageTransition>
      {/* ── Hero Section ──────────────────────────────────── */}
      <section style={{
        position: 'relative', width: '100%', overflow: 'hidden',
        background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-on-primary-fixed) 100%)',
        color: 'var(--color-on-primary)', padding: 'var(--space-xl) 0',
      }}>
        {/* Ambient grid bg */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.07, pointerEvents: 'none' }}>
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="currentColor" strokeWidth="1" />
                <circle cx="24" cy="24" r="1.5" fill="currentColor" opacity="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Light blooms */}
        <div style={{ position: 'absolute', top: '20%', left: '5%', width: 380, height: 380, background: 'rgba(183,196,255,0.15)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -40, right: '10%', width: 340, height: 340, background: 'rgba(98,223,125,0.1)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }} />

        <div className="container-max" style={{ position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--gutter)', alignItems: 'center' }} className="hero-grid">
            {/* Left Column */}
            <motion.div {...fadeUp()} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', zIndex: 10 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 'var(--space-xs)',
                padding: '4px 12px', borderRadius: 'var(--radius-full)',
                background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)',
                alignSelf: 'flex-start',
              }}>
                <ShieldCheck size={16} style={{ color: 'var(--color-tertiary-fixed)' }} />
                <span className="text-label-sm" style={{ textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                  AI-POWERED BHARAT CYBER DEFENSE
                </span>
              </div>

              <h1 className="text-display-hero hero-title-responsive" style={{ color: 'var(--color-on-primary)', fontWeight: 800, fontSize: 'clamp(1.5rem, 4.2vw, 2.75rem)', lineHeight: 1.25 }}>
                संदेश, लिंक या निवेश सलाह की जांच करें धोखाधड़ी से पहले!
              </h1>

              <p className="text-body-lg" style={{ color: 'var(--color-primary-fixed)', fontWeight: 500, fontSize: 'clamp(1rem, 2.5vw, 1.15rem)' }}>
                AI-powered verification for safer and smarter India
              </p>
              <p className="text-body-md" style={{ color: 'rgba(183,196,255,0.85)', maxWidth: 560, fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>
                Verify WhatsApp forwards, Telegram trading tips, SEBI numbers, and UPI handles before making any payment. Instant zero-trust telemetry for every citizen.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--space-sm)', paddingTop: 'var(--space-xs)' }}>
                <Link
                  to="/verify"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 'var(--space-xs)',
                    padding: '12px 20px', borderRadius: 'var(--radius-xl)',
                    background: 'var(--color-surface-container-lowest)', color: 'var(--color-primary)',
                    fontWeight: 700, fontSize: 14, boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                    transition: 'all 0.2s', textDecoration: 'none'
                  }}
                >
                  <ShieldCheck size={18} />
                  <span>Start Checking</span>
                  <ArrowRight size={18} />
                </Link>
                <button
                  type="button"
                  onClick={() => navigate('/learn')}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 'var(--space-xs)',
                    padding: '12px 20px', borderRadius: 'var(--radius-xl)',
                    background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)',
                    color: 'var(--color-on-primary)', fontWeight: 600, fontSize: 14,
                    transition: 'background 0.2s', border: '1px solid rgba(255,255,255,0.25)',
                    cursor: 'pointer'
                  }}
                >
                  <PlayCircle size={18} />
                  <span>Explore Lessons</span>
                </button>
              </div>

              {/* Trust metrics */}
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px', paddingTop: 'var(--space-sm)' }} className="text-label-sm">
                {[
                  { icon: Verified, label: '3.2 Lakh+ Scams Flagged' },
                  { icon: Wallet, label: '₹42 Cr Protected' },
                  { icon: Handshake, label: '100% Free for Citizens' },
                ].map((item, i) => (
                  <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(183,196,255,0.9)' }}>
                    {i > 0 && <span style={{ opacity: 0.4, margin: '0 4px' }}>•</span>}
                    <item.icon size={16} style={{ color: 'var(--color-tertiary-fixed)' }} />
                    {item.label}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Right Column - 3D Shield */}
            <motion.div {...fadeUp(0.2)} className="hero-3d-col" style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{
                position: 'relative', width: '100%', maxWidth: 460,
                borderRadius: 'var(--radius-xl)', padding: 12,
                background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(16px)',
                boxShadow: '0 16px 48px rgba(0,0,0,0.15)',
              }}>
                <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: 'rgba(255,255,255,0.03)', aspectRatio: '4/3.5' }}>
                  <Suspense fallback={
                    <div style={{ width: '100%', height: '100%', minHeight: 320, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div className="shimmer" style={{ width: '100%', height: '100%', borderRadius: 'var(--radius-lg)' }} />
                    </div>
                  }>
                    <Shield3D />
                  </Suspense>
                </div>

                {/* Floating badge - top right */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  style={{
                    position: 'absolute', top: 20, right: 20,
                    background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)',
                    color: 'var(--color-on-surface)', padding: '8px 14px',
                    borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-card)',
                    display: 'flex', alignItems: 'center', gap: 8,
                  }}
                >
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-tertiary)', animation: 'pulse-ring 2s infinite' }} />
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span className="text-label-sm" style={{ fontWeight: 700, color: 'var(--color-primary)' }}>SEBI Verification</span>
                    <span className="text-label-sm" style={{ color: 'var(--color-tertiary)', fontWeight: 600 }}>Instant Telemetry</span>
                  </div>
                </motion.div>

                {/* Floating badge - bottom left */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  style={{
                    position: 'absolute', bottom: 20, left: 20,
                    background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)',
                    color: 'var(--color-on-surface)', padding: '8px 14px',
                    borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-card)',
                    display: 'flex', alignItems: 'center', gap: 10,
                  }}
                >
                  <div style={{
                    padding: 6, borderRadius: 'var(--radius-default)',
                    background: 'var(--color-primary-container)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Shield size={16} color="var(--color-on-primary)" />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span className="text-label-sm" style={{ fontWeight: 600, color: 'var(--color-on-surface-variant)' }}>Fake UPI Detection</span>
                    <span className="text-headline-sm" style={{ color: 'var(--color-primary)', fontWeight: 700, lineHeight: 1 }}>99.4% Accuracy</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 4 Action Cards ────────────────────────────────── */}
      <section className="container-max" style={{ marginTop: -32, position: 'relative', zIndex: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-md)' }}>
          {ACTION_CARDS.map((card, i) => (
            <motion.div key={card.label} {...fadeUp(i * 0.1)}>
              <Link
                to={`/verify?tab=${card.tab}`}
                style={{
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                  padding: 'var(--space-lg)', borderRadius: 'var(--radius-xl)',
                  background: 'var(--color-surface-container-lowest)',
                  boxShadow: 'var(--shadow-card)', transition: 'all 0.2s',
                  height: '100%',
                }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow-hover)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'var(--shadow-card)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: 'var(--radius-lg)',
                      background: card.bgColor, display: 'flex', alignItems: 'center',
                      justifyContent: 'center', color: card.color, transition: 'all 0.2s',
                    }}>
                      <card.icon size={24} />
                    </div>
                    <span className="text-label-sm" style={{
                      padding: '4px 10px', borderRadius: 'var(--radius-full)',
                      background: `${card.bgColor}80`, color: card.color, fontWeight: 700,
                    }}>
                      {card.tag}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-headline-sm" style={{ color: 'var(--color-on-surface)', fontWeight: 700, transition: 'color 0.2s' }}>{card.label}</h2>
                    <p className="text-body-sm" style={{ color: 'var(--color-on-surface-variant)', marginTop: 4 }}>{card.desc}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 'var(--space-md)', color: card.color, fontWeight: 600, fontSize: 13 }}>
                  <span>{card.action}</span>
                  <ArrowRight size={14} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Quick Verification Bar ────────────────────────── */}
      <motion.section {...fadeUp()} className="container-max" style={{ marginTop: 'var(--space-xl)' }}>
        <div style={{
          padding: 'var(--space-xl)', borderRadius: 'var(--radius-xl)',
          background: 'var(--color-surface-container-lowest)', boxShadow: 'var(--shadow-card)',
          display: 'flex', flexDirection: 'column', gap: 'var(--space-md)',
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-sm)' }}>
            <div>
              <span className="text-label-sm" style={{ fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary)', letterSpacing: '0.08em' }}>
                Fast Multi-Modal Verification Bar
              </span>
              <h2 className="text-headline-lg" style={{ color: 'var(--color-on-surface)' }}>Verify Suspicious Request Now</h2>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', color: 'var(--color-on-surface-variant)' }} className="text-label-sm">
              <Lock size={16} style={{ color: 'var(--color-tertiary)' }} />
              <span>Zero Server Storage • Instant Hash Verification</span>
            </div>
          </div>

          {/* Input Bar */}
          <div style={{
            display: 'flex', flexDirection: 'row', alignItems: 'stretch', gap: 'var(--space-sm)',
            background: 'var(--color-surface-container-low)', padding: 8, borderRadius: 'var(--radius-lg)',
          }} className="verify-input-bar">
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', paddingLeft: 'var(--space-md)' }}>
              <Search size={20} style={{ color: 'var(--color-outline)', marginRight: 'var(--space-sm)', flexShrink: 0 }} />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && runCheck()}
                placeholder="Paste UPI, Link, Phone, or SMS / यूपीआई, लिंक या संदेश यहाँ चिपकाएँ"
                className="text-body-md"
                style={{
                  width: '100%', background: 'transparent',
                  padding: '12px 0', color: 'var(--color-on-surface)',
                }}
              />
              <button
                onClick={handlePaste}
                className="text-label-sm"
                style={{
                  display: 'flex', alignItems: 'center', gap: 4,
                  padding: '6px 12px', borderRadius: 'var(--radius-default)',
                  background: 'var(--color-surface-container)',
                  color: 'var(--color-on-surface-variant)',
                  transition: 'all 0.2s', flexShrink: 0, marginRight: 'var(--space-xs)',
                }}
              >
                <ClipboardPaste size={14} />
                <span className="paste-label">Paste</span>
              </button>
            </div>
            <button
              onClick={() => runCheck()}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: 'var(--space-xs)', padding: '14px 28px', borderRadius: 'var(--radius-lg)',
                background: 'var(--color-primary)', color: 'var(--color-on-primary)',
                fontWeight: 600, fontSize: 15, boxShadow: '0 2px 8px rgba(0,55,177,0.25)',
                transition: 'background 0.2s', whiteSpace: 'nowrap',
              }}
            >
              <Shield size={18} />
              <span>Verify Integrity</span>
            </button>
          </div>

          {/* Sample chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--space-xs)', paddingTop: 4 }}>
            <span className="text-label-sm" style={{ color: 'var(--color-on-surface-variant)', fontWeight: 500 }}>Try test samples:</span>
            {SAMPLE_QUERIES.map(sq => (
              <button
                key={sq.value}
                onClick={() => { setQuery(sq.value); runCheck(sq.value) }}
                className="text-label-sm"
                style={{
                  padding: '4px 12px', borderRadius: 'var(--radius-full)',
                  background: 'var(--color-surface-container)',
                  color: 'var(--color-on-surface)', transition: 'background 0.2s',
                }}
              >
                {sq.label}
              </button>
            ))}
          </div>

          {/* Result */}
          {resultVisible && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              style={{
                marginTop: 'var(--space-sm)', padding: 'var(--space-md)',
                borderRadius: 'var(--radius-lg)', background: 'var(--color-surface-container-low)',
              }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-md)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: resultType === 'safe' ? 'var(--color-tertiary-fixed)' : 'var(--color-error-container)',
                    color: resultType === 'safe' ? 'var(--color-tertiary)' : 'var(--color-error)',
                  }}>
                    {resultType === 'safe' ? <ShieldCheck size={24} /> : <ShieldX size={24} />}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
                      <span className="text-headline-sm" style={{ fontWeight: 700, color: 'var(--color-on-surface)' }}>
                        {resultType === 'safe' ? 'Verified Entity (Safe)' : 'High Threat Signal Detected'}
                      </span>
                      <span className="text-label-sm" style={{
                        padding: '2px 8px', borderRadius: 'var(--radius-full)', fontWeight: 700,
                        background: resultType === 'safe' ? 'var(--color-tertiary-fixed)' : 'var(--color-error-container)',
                        color: resultType === 'safe' ? 'var(--color-on-tertiary-fixed)' : 'var(--color-on-error-container)',
                      }}>
                        {resultType === 'safe' ? 'Safety Score 96/100' : 'Threat Score 94/100'}
                      </span>
                    </div>
                    <p className="text-body-sm" style={{ color: 'var(--color-on-surface-variant)', marginTop: 2 }}>
                      {resultType === 'safe'
                        ? 'Official AMFI/SEBI license active. Bank account routing verified through National Automated Clearing House.'
                        : 'Unregistered entity requesting instant funds. Associated with 18 previous cyber fraud reports on National Helpline 1930.'
                      }
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                  <Link to="/report" style={{
                    padding: '8px 16px', borderRadius: 'var(--radius-default)',
                    background: 'var(--color-error)', color: 'var(--color-on-error)',
                    fontWeight: 600, fontSize: 13,
                  }}>Report Immediately</Link>
                  <Link to="/verify" style={{
                    padding: '8px 16px', borderRadius: 'var(--radius-default)',
                    background: 'var(--color-surface-container)', color: 'var(--color-on-surface)',
                    fontWeight: 600, fontSize: 13,
                  }}>Full Forensic Audit</Link>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* ── Trust Strip ───────────────────────────────────── */}
      <motion.section {...fadeUp()} className="container-max" style={{ marginTop: 'var(--space-xl)' }}>
        <div style={{
          borderRadius: 'var(--radius-xl)', background: 'rgba(230,232,234,0.6)',
          padding: 'var(--space-lg)', display: 'flex', flexWrap: 'wrap',
          alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-md)',
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px' }}>
            {[
              { icon: CheckCircle, label: 'No investment advice', color: 'var(--color-tertiary)' },
              { icon: Verified, label: '100% confidential', color: 'var(--color-primary)' },
              { icon: Shield, label: 'Built for Bharat', color: 'var(--color-tertiary-container)' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
                {i > 0 && <span style={{ color: 'var(--color-outline-variant)', margin: '0 8px', fontSize: 18 }}>•</span>}
                <item.icon size={18} style={{ color: item.color }} />
                <span className="text-headline-sm" style={{ fontWeight: 700, color: 'var(--color-on-surface)' }}>{item.label}</span>
              </div>
            ))}
          </div>
          <p className="text-body-sm" style={{ color: 'var(--color-on-surface-variant)', maxWidth: 400, textAlign: 'right' }}>
            We only verify if the person or entity requesting money is legitimate and registered.
          </p>
        </div>
      </motion.section>

      {/* ── Live Threat Intel ──────────────────────────────── */}
      <section className="container-max" style={{ marginTop: 'var(--space-xl)', marginBottom: 'var(--space-xl)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 'var(--space-sm)', marginBottom: 'var(--space-lg)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
              <span style={{ position: 'relative', display: 'flex', width: 12, height: 12 }}>
                <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--color-error)', animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite', opacity: 0.75 }} />
                <span style={{ position: 'relative', display: 'inline-flex', borderRadius: '50%', width: 12, height: 12, background: 'var(--color-error)' }} />
              </span>
              <span className="text-label-sm" style={{ fontWeight: 700, color: 'var(--color-error)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Live Threat Intel Feed
              </span>
            </div>
            <h2 className="text-headline-lg" style={{ color: 'var(--color-on-surface)', fontWeight: 700 }}>
              Recent Community Alerts (Real-Time Live Shield)
            </h2>
          </div>
          <Link to="/history" style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--color-primary)', fontWeight: 700, fontSize: 13 }}>
            <span>View Full Verification Database</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-md)' }}>
          {ALERTS.map((alert, i) => (
            <motion.div key={i} {...fadeUp(i * 0.1)} style={{
              padding: 'var(--space-lg)', borderRadius: 'var(--radius-xl)',
              background: 'var(--color-surface-container-lowest)', boxShadow: 'var(--shadow-card)',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              transition: 'box-shadow 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow-hover)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'var(--shadow-card)'}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--space-xs)' }}>
                  <div>
                    <span className="text-label-sm" style={{ color: 'var(--color-on-surface-variant)', fontFamily: 'var(--font-primary)' }}>{alert.type}</span>
                    <h3 className="text-headline-sm" style={{ fontWeight: 700, color: 'var(--color-on-surface)', lineHeight: 1.3, maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {alert.title}
                    </h3>
                  </div>
                  <span className="text-label-sm" style={{
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                    padding: '4px 10px', borderRadius: 'var(--radius-full)',
                    background: alert.riskBg, color: alert.riskTextColor,
                    fontWeight: 700, flexShrink: 0,
                  }}>
                    {alert.riskLevel.includes('Critical') ? <CircleAlert size={14} /> : alert.riskLevel.includes('Low') ? <CheckCircle size={14} /> : <AlertTriangle size={14} />}
                    {alert.riskLevel}
                  </span>
                </div>
                <p className="text-body-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
                  {alert.desc}
                  {alert.code && (
                    <code className="text-data-mono" style={{
                      fontWeight: 600, padding: '2px 6px', borderRadius: 'var(--radius-sm)',
                      marginLeft: 4,
                      color: alert.riskLevel.includes('Low') ? 'var(--color-tertiary)' : 'var(--color-error)',
                      background: alert.riskLevel.includes('Low') ? 'rgba(127,252,151,0.3)' : 'rgba(255,218,214,0.4)',
                    }}>
                      {alert.code}
                    </code>
                  )}
                </p>
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                paddingTop: 'var(--space-md)', marginTop: 'var(--space-md)',
                borderTop: '1px solid var(--color-surface-container)',
              }}>
                <span className="text-label-sm" style={{ color: 'var(--color-outline)' }}>{alert.time}</span>
                <span className="text-label-sm" style={{ display: 'flex', alignItems: 'center', gap: 4, color: alert.iconColor, fontWeight: 600 }}>
                  <alert.statusIcon size={14} />
                  {alert.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <style>{`
        .hero-grid { grid-template-columns: 7fr 5fr; }
        @media (max-width: 991px) {
          .hero-grid { grid-template-columns: 1fr; }
          .hero-3d-col { order: -1; max-width: 320px; margin: 0 auto; }
        }
        .verify-input-bar { flex-direction: row; }
        @media (max-width: 640px) {
          .verify-input-bar { flex-direction: column; gap: 8px; padding: 8px; }
          .verify-input-bar button { width: 100%; justify-content: center; }
          .paste-label { display: none; }
          .hero-3d-col { max-width: 260px; }
        }
      `}</style>
    </PageTransition>
  )
}
