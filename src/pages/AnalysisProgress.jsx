import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Shield, ShieldCheck, ShieldX, Lock, Wallet, Check, Clock,
  RefreshCw, ArrowRight, Phone, Loader2, Cpu, Database, Network
} from 'lucide-react'
import PageTransition from '../components/PageTransition'

const STEPS = [
  { label: 'Extracting text from image', detail: 'OCR complete: 247 words identified', status: 'done' },
  { label: 'Identifying key entities', detail: "Found: Claimed SEBI Advisor, UPI ID 'abc@upi', Telegram handle", status: 'done' },
  { label: 'Checking SEBI registration', detail: 'Querying official SEBI intermediary database...', status: 'active' },
  { label: 'Analyzing domain information', detail: 'Checking WHOIS age, registrar, and phishing reports', status: 'pending' },
  { label: 'Detecting scam indicators', detail: 'Matching NLP against known 14,000+ Ponzi scripts', status: 'pending' },
  { label: 'Generating risk assessment & safe advisory', detail: 'Synthesizing civic mitigation playbook & telemetry flags', status: 'pending' },
]

export default function AnalysisProgress() {
  const [progress, setProgress] = useState(35)
  const [steps, setSteps] = useState(STEPS)
  const [complete, setComplete] = useState(false)
  const navigate = useNavigate()
  const intervalRef = useRef(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(intervalRef.current)
          return 100
        }
        return prev + 3
      })
    }, 400)
    return () => clearInterval(intervalRef.current)
  }, [])

  useEffect(() => {
    const updatedSteps = STEPS.map((step, i) => {
      const threshold = ((i + 1) / STEPS.length) * 100
      if (progress >= threshold) return { ...step, status: 'done' }
      if (progress >= threshold - (100 / STEPS.length)) return { ...step, status: 'active' }
      return { ...step, status: 'pending' }
    })
    setSteps(updatedSteps)
    if (progress >= 100 && !complete) setComplete(true)
  }, [progress, complete])

  const circumference = 276.46
  const dashoffset = circumference - (circumference * Math.min(progress, 100) / 100)

  return (
    <PageTransition>
      <div className="container-max" style={{
        padding: 'var(--space-xl) var(--margin)', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden',
      }}>
        {/* Ambient blobs */}
        <div style={{ position: 'absolute', top: -120, left: -80, width: 380, height: 380, borderRadius: '50%', background: 'rgba(220,225,255,0.25)', filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '50%', right: -120, width: 300, height: 300, borderRadius: '50%', background: 'rgba(220,225,255,0.2)', filter: 'blur(80px)', pointerEvents: 'none' }} />

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{
            width: '100%', maxWidth: 640, background: 'var(--color-surface-container-lowest)',
            borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-hover)',
            padding: 'var(--space-xl)', display: 'flex', flexDirection: 'column',
            position: 'relative', zIndex: 10,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            {/* Circular Progress */}
            <div style={{ position: 'relative', width: 112, height: 112, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-md)' }}>
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'rgba(0,55,177,0.08)', animation: complete ? 'none' : 'pulse-ring 2s ease-in-out infinite' }} />
              <svg viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                <circle cx="50" cy="50" r="44" fill="none" stroke="var(--color-surface-container)" strokeWidth="4" />
                <circle cx="50" cy="50" r="44" fill="none"
                  stroke={complete ? 'var(--color-error)' : 'var(--color-primary)'}
                  strokeWidth="4" strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={dashoffset}
                  style={{ transition: 'stroke-dashoffset 0.5s ease-out, stroke 0.3s' }}
                />
              </svg>
              <div style={{
                position: 'relative', width: 64, height: 64, borderRadius: '50%',
                background: complete ? 'var(--color-error-container)' : 'var(--color-primary-container)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: complete ? 'var(--color-error)' : 'var(--color-on-primary)',
                boxShadow: '0 4px 12px rgba(0,55,177,0.2)',
                transition: 'all 0.3s',
              }}>
                {complete
                  ? <ShieldX size={28} />
                  : <Shield size={28} style={{ animation: 'pulse-ring 2s infinite' }} />
                }
              </div>
            </div>

            {/* Status Badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 'var(--space-xs)',
              padding: '4px 12px', borderRadius: 'var(--radius-full)',
              background: complete ? 'rgba(186,26,26,0.1)' : 'rgba(220,225,255,0.5)',
              marginBottom: 'var(--space-xs)',
            }}>
              <span style={{
                width: 8, height: 8, borderRadius: '50%',
                background: complete ? 'var(--color-error)' : 'var(--color-primary)',
                animation: complete ? 'none' : 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
              }} />
              <span className="text-label-sm" style={{ textTransform: 'uppercase', letterSpacing: '0.08em', color: complete ? 'var(--color-error)' : 'var(--color-on-primary-fixed)' }}>
                {complete ? 'Analysis Complete' : 'Engine Active'}
              </span>
            </div>

            <h1 className="text-headline-md" style={{ color: 'var(--color-on-surface)' }}>
              {complete ? '⚠️ High Risk Entity Detected' : 'Running Deep Forensic Check...'}
            </h1>
            <p className="text-body-sm" style={{ color: 'var(--color-on-surface-variant)', marginTop: 4 }}>
              {complete ? 'Extreme risk identified. DO NOT proceed with this transaction.' : 'Multi-vector synthetic and institutional compliance telemetry'}
            </p>
          </div>

          {/* Target Info */}
          <div style={{
            marginTop: 'var(--space-lg)', borderRadius: 'var(--radius-default)',
            background: 'var(--color-surface-container-low)', padding: 'var(--space-md)',
            display: 'flex', alignItems: 'flex-start', gap: 'var(--space-sm)',
          }}>
            <div style={{ padding: 8, borderRadius: 'var(--radius-sm)', background: 'var(--color-surface-container-highest)', color: 'var(--color-primary)', flexShrink: 0 }}>
              <Cpu size={18} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <span className="text-label-sm" style={{ textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-on-surface-variant)' }}>Target Under Inspection</span>
              <p className="text-body-md" style={{ fontWeight: 600, color: 'var(--color-on-surface)', marginTop: 2 }}>
                WhatsApp Screenshot • 'VIP Wealth Creators Club'
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12, marginTop: 4 }}>
                <span className="text-data-mono" style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--color-secondary)' }}>
                  <Wallet size={12} /> abc@upi
                </span>
                <span style={{ color: 'var(--color-outline-variant)' }}>•</span>
                <span className="text-data-mono" style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--color-error)' }}>
                  ₹25,000 request
                </span>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div style={{ marginTop: 'var(--space-lg)', display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 'var(--space-sm)',
                  padding: 'var(--space-sm)', borderRadius: 'var(--radius-default)',
                  background: step.status === 'active' ? 'rgba(220,225,255,0.3)' : 'var(--color-surface-container-lowest)',
                  opacity: step.status === 'pending' ? 0.6 : 1,
                  transition: 'all 0.3s',
                }}
              >
                <div style={{
                  width: 24, height: 24, borderRadius: '50%', flexShrink: 0, marginTop: 2,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: step.status === 'done' ? 'var(--color-tertiary-fixed)' : step.status === 'active' ? 'var(--color-primary-container)' : 'var(--color-surface-container-high)',
                  color: step.status === 'done' ? 'var(--color-on-tertiary-fixed)' : step.status === 'active' ? 'var(--color-on-primary)' : 'var(--color-outline)',
                }}>
                  {step.status === 'done' && <Check size={14} />}
                  {step.status === 'active' && <RefreshCw size={14} style={{ animation: 'rotate-slow 1s linear infinite' }} />}
                  {step.status === 'pending' && <Clock size={14} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span className="text-label-md" style={{
                      color: step.status === 'active' ? 'var(--color-primary)' : 'var(--color-on-surface)',
                      fontWeight: step.status === 'active' ? 700 : 500,
                    }}>{step.label}</span>
                    <span className="text-label-sm" style={{
                      fontWeight: 600,
                      color: step.status === 'done' ? 'var(--color-tertiary)' : step.status === 'active' ? 'var(--color-primary)' : 'var(--color-outline)',
                    }}>
                      {step.status === 'done' ? 'Verified' : step.status === 'active' ? 'In Progress' : 'Queued'}
                    </span>
                  </div>
                  <p className="text-body-sm" style={{ color: 'var(--color-on-surface-variant)', marginTop: 2 }}>{step.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Progress Bar */}
          <div style={{ marginTop: 'var(--space-lg)', paddingTop: 'var(--space-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-xs)' }}>
              <span className="text-label-md" style={{ fontWeight: 600, color: 'var(--color-on-surface)' }}>Verification Progress</span>
              <span className="text-data-mono" style={{ fontWeight: 700, color: complete ? 'var(--color-error)' : 'var(--color-primary)' }}>
                {Math.min(progress, 100)}% {complete ? 'Complete' : 'Completed'}
              </span>
            </div>
            <div style={{ width: '100%', height: 12, background: 'var(--color-surface-container-high)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
              <motion.div
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                style={{
                  height: '100%', borderRadius: 'var(--radius-full)',
                  background: complete
                    ? 'linear-gradient(90deg, var(--color-error), #dc2626)'
                    : 'linear-gradient(90deg, var(--color-primary), var(--color-primary-container))',
                  transition: 'background 0.3s',
                }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'var(--space-xs)' }}>
              <span className="text-body-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
                {complete ? 'Review the results above' : 'This may take a few seconds'}
              </span>
              <span className="text-label-sm" style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--color-tertiary)' }}>
                <Lock size={12} /> Encrypted end-to-end
              </span>
            </div>
          </div>

          {/* Actions */}
          <div style={{ marginTop: 'var(--space-lg)', paddingTop: 'var(--space-sm)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-md)' }}>
            {complete ? (
              <>
                <button onClick={() => navigate('/report')} style={{
                  padding: '12px 24px', borderRadius: 'var(--radius-lg)',
                  background: 'var(--color-error)', color: 'var(--color-on-error)',
                  fontWeight: 700, fontSize: 15, display: 'flex', alignItems: 'center',
                  gap: 'var(--space-xs)', boxShadow: '0 2px 8px rgba(186,26,26,0.3)',
                }}>
                  <ShieldX size={18} />
                  <span>Report This Entity</span>
                </button>
                <button onClick={() => navigate('/verify')} style={{
                  padding: '12px 24px', borderRadius: 'var(--radius-lg)',
                  background: 'var(--color-surface-container)', color: 'var(--color-on-surface)',
                  fontWeight: 600, fontSize: 15,
                }}>
                  New Scan
                </button>
              </>
            ) : (
              <>
                <button onClick={() => navigate('/verify')} style={{
                  padding: '10px 20px', borderRadius: 'var(--radius-lg)',
                  background: 'var(--color-surface-container)', color: 'var(--color-on-surface-variant)',
                  fontWeight: 600, display: 'flex', alignItems: 'center', gap: 'var(--space-xs)',
                }}>
                  Cancel Scan
                </button>
                <a href="tel:1930" style={{
                  display: 'flex', alignItems: 'center', gap: 'var(--space-xs)',
                  color: 'var(--color-error)', fontWeight: 600, fontSize: 13,
                }}>
                  <Phone size={16} />
                  <span>Need urgent assistance? Call 1930</span>
                </a>
              </>
            )}
          </div>
        </motion.div>

        {/* Info Cards */}
        <div style={{ marginTop: 'var(--space-lg)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-md)', maxWidth: 640, width: '100%' }}>
          {[
            { icon: Cpu, label: 'Authority Registry', value: 'NPCI & SEBI Live Hook' },
            { icon: Database, label: 'Data Handling', value: 'Zero-Retention Pipeline' },
            { icon: Network, label: 'Scam Graph', value: '14,280+ Flagged Scripts' },
          ].map(card => (
            <div key={card.label} style={{
              background: 'var(--color-surface-container-lowest)', padding: 'var(--space-sm)',
              borderRadius: 'var(--radius-default)', display: 'flex', alignItems: 'center',
              gap: 'var(--space-sm)', boxShadow: 'var(--shadow-card)',
            }}>
              <card.icon size={18} style={{ color: 'var(--color-primary)' }} />
              <div>
                <span className="text-label-sm" style={{ color: 'var(--color-on-surface-variant)' }}>{card.label}</span>
                <span className="text-body-sm" style={{ display: 'block', fontWeight: 500, color: 'var(--color-on-surface)' }}>{card.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  )
}
