import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Shield, ShieldCheck, ShieldX, ShieldAlert, Search, Filter,
  Calendar, ArrowRight, CheckCircle, AlertTriangle, Ban,
  CircleAlert, Download, Clock, ChevronDown
} from 'lucide-react'
import PageTransition from '../components/PageTransition'

const HISTORY_DATA = [
  { id: 1, type: 'UPI Handle', target: 'paytm-refund-support@ybl', risk: 98, status: 'Flagged', date: '2 Oct 2025, 3:42 PM', riskLevel: 'critical' },
  { id: 2, type: 'Telegram Channel', target: 'XYZ Global FX Trading', risk: 94, status: 'Flagged Scam', date: '2 Oct 2025, 3:18 PM', riskLevel: 'high' },
  { id: 3, type: 'Phishing Link', target: 'sebi-online-kyc-verify.in', risk: 98, status: 'Domain Blacklisted', date: '2 Oct 2025, 2:30 PM', riskLevel: 'critical' },
  { id: 4, type: 'AMFI Distributor', target: 'ABC Mutual Fund Agency (ARN-88321)', risk: 10, status: 'Identity Confirmed', date: '2 Oct 2025, 1:15 PM', riskLevel: 'safe' },
  { id: 5, type: 'WhatsApp Forward', target: 'Crypto Mining Pool - Guaranteed 200% ROI', risk: 91, status: 'Ponzi Pattern', date: '1 Oct 2025, 11:00 PM', riskLevel: 'high' },
  { id: 6, type: 'SMS Sender', target: 'VK-SBIINB Official Alert', risk: 5, status: 'Legitimate Bank', date: '1 Oct 2025, 9:22 PM', riskLevel: 'safe' },
  { id: 7, type: 'APK Download', target: 'bharat-pro-trader-v3.2.apk', risk: 99, status: 'Malware Detected', date: '1 Oct 2025, 6:45 PM', riskLevel: 'critical' },
  { id: 8, type: 'SEBI Registration', target: 'INA000012345 - Forex Advisor', risk: 87, status: 'Barred Entity', date: '1 Oct 2025, 4:30 PM', riskLevel: 'high' },
]

const FILTERS = ['All', 'Critical', 'High Risk', 'Safe']

const getRiskBadge = (level) => {
  const config = {
    critical: { bg: 'var(--color-error)', color: 'var(--color-on-error)', icon: CircleAlert },
    high: { bg: 'var(--color-error-container)', color: 'var(--color-on-error-container)', icon: AlertTriangle },
    safe: { bg: 'var(--color-tertiary-fixed)', color: 'var(--color-on-tertiary-fixed)', icon: CheckCircle },
  }
  return config[level] || config.high
}

export default function HistoryPage() {
  const [filter, setFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = HISTORY_DATA.filter(item => {
    if (filter === 'Critical') return item.riskLevel === 'critical'
    if (filter === 'High Risk') return item.riskLevel === 'high'
    if (filter === 'Safe') return item.riskLevel === 'safe'
    return true
  }).filter(item =>
    searchQuery === '' || item.target.toLowerCase().includes(searchQuery.toLowerCase()) || item.type.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <PageTransition>
      <div className="container-max" style={{ padding: 'var(--space-xl) var(--margin)' }}>
        {/* Header */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', marginBottom: 4 }}>
              <Clock size={16} style={{ color: 'var(--color-primary)' }} />
              <span className="text-label-sm" style={{ textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-primary)', fontWeight: 700 }}>
                Verification Audit Trail
              </span>
            </div>
            <h1 className="text-headline-lg" style={{ color: 'var(--color-on-surface)' }}>Verification History</h1>
            <p className="text-body-md" style={{ color: 'var(--color-on-surface-variant)', marginTop: 4 }}>
              Complete record of all scam checks, identity verifications, and threat assessments performed.
            </p>
          </div>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 'var(--space-xs)',
            padding: '10px 20px', borderRadius: 'var(--radius-lg)',
            background: 'var(--color-surface-container)', color: 'var(--color-on-surface)',
            fontWeight: 600, fontSize: 13,
          }}>
            <Download size={16} />
            <span>Export CSV</span>
          </button>
        </div>

        {/* Summary Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}>
          {[
            { label: 'Total Scans', value: '1,429,812', icon: Shield, color: 'var(--color-primary)' },
            { label: 'Threats Blocked', value: '320,184', icon: ShieldX, color: 'var(--color-error)' },
            { label: 'Verified Safe', value: '1,109,628', icon: ShieldCheck, color: 'var(--color-tertiary)' },
            { label: 'Avg Risk Score', value: '67.3', icon: ShieldAlert, color: 'var(--color-secondary)' },
          ].map(card => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                padding: 'var(--space-lg)', borderRadius: 'var(--radius-xl)',
                background: 'var(--color-surface-container-lowest)', boxShadow: 'var(--shadow-card)',
                display: 'flex', alignItems: 'center', gap: 'var(--space-md)',
              }}
            >
              <div style={{
                width: 48, height: 48, borderRadius: 'var(--radius-lg)',
                background: `${card.color}15`, display: 'flex', alignItems: 'center',
                justifyContent: 'center', color: card.color,
              }}>
                <card.icon size={22} />
              </div>
              <div>
                <span className="text-label-sm" style={{ color: 'var(--color-on-surface-variant)' }}>{card.label}</span>
                <span className="text-headline-md" style={{ display: 'block', fontWeight: 700, color: 'var(--color-on-surface)', fontVariantNumeric: 'tabular-nums' }}>{card.value}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filters & Search */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-sm)', marginBottom: 'var(--space-md)' }}>
          <div style={{ display: 'flex', gap: 'var(--space-xs)' }}>
            {FILTERS.map(f => (
              <button key={f} onClick={() => setFilter(f)} className="text-label-md" style={{
                padding: '6px 16px', borderRadius: 'var(--radius-full)',
                background: filter === f ? 'var(--color-primary)' : 'var(--color-surface-container)',
                color: filter === f ? 'var(--color-on-primary)' : 'var(--color-on-surface-variant)',
                fontWeight: filter === f ? 700 : 500, transition: 'all 0.2s',
              }}>
                {f}
              </button>
            ))}
          </div>
          <div style={{ position: 'relative', minWidth: 260 }}>
            <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-outline)' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search verifications..."
              className="text-body-sm"
              style={{
                width: '100%', paddingLeft: 36, padding: '8px 12px 8px 36px',
                borderRadius: 'var(--radius-full)', background: 'var(--color-surface-container-low)',
                color: 'var(--color-on-surface)',
              }}
            />
          </div>
        </div>

        {/* Table */}
        <div style={{
          background: 'var(--color-surface-container-lowest)', borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-card)', overflow: 'hidden',
        }}>
          {/* Header Row */}
          <div style={{
            display: 'grid', gridTemplateColumns: '140px 1fr 100px 140px 160px',
            gap: 'var(--space-md)', padding: 'var(--space-md) var(--space-lg)',
            borderBottom: '1px solid var(--color-surface-container)',
            background: 'var(--color-surface-container-low)',
          }} className="text-label-sm table-header">
            <span style={{ fontWeight: 700, color: 'var(--color-on-surface-variant)', textTransform: 'uppercase' }}>Type</span>
            <span style={{ fontWeight: 700, color: 'var(--color-on-surface-variant)', textTransform: 'uppercase' }}>Target</span>
            <span style={{ fontWeight: 700, color: 'var(--color-on-surface-variant)', textTransform: 'uppercase' }}>Risk</span>
            <span style={{ fontWeight: 700, color: 'var(--color-on-surface-variant)', textTransform: 'uppercase' }}>Status</span>
            <span style={{ fontWeight: 700, color: 'var(--color-on-surface-variant)', textTransform: 'uppercase' }}>Date</span>
          </div>

          {/* Rows */}
          {filtered.map((item, i) => {
            const badge = getRiskBadge(item.riskLevel)
            const BadgeIcon = badge.icon
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                style={{
                  display: 'grid', gridTemplateColumns: '140px 1fr 100px 140px 160px',
                  gap: 'var(--space-md)', padding: 'var(--space-md) var(--space-lg)',
                  borderBottom: '1px solid var(--color-surface-container-low)',
                  alignItems: 'center', transition: 'background 0.15s', cursor: 'pointer',
                }}
                className="table-row"
                onMouseEnter={e => e.currentTarget.style.background = 'var(--color-surface-container-low)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <span className="text-label-md" style={{ color: 'var(--color-on-surface-variant)' }}>{item.type}</span>
                <span className="text-body-sm" style={{ fontWeight: 600, color: 'var(--color-on-surface)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {item.target}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <div style={{
                    width: 32, height: 6, borderRadius: 'var(--radius-full)',
                    background: 'var(--color-surface-container-high)', overflow: 'hidden',
                  }}>
                    <div style={{
                      width: `${item.risk}%`, height: '100%', borderRadius: 'var(--radius-full)',
                      background: item.riskLevel === 'safe' ? 'var(--color-tertiary)' : item.risk > 90 ? 'var(--color-error)' : 'var(--risk-caution-text)',
                    }} />
                  </div>
                  <span className="text-data-mono" style={{ fontWeight: 600, color: item.riskLevel === 'safe' ? 'var(--color-tertiary)' : 'var(--color-error)' }}>
                    {item.risk}
                  </span>
                </div>
                <span className="text-label-sm" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  padding: '3px 8px', borderRadius: 'var(--radius-full)',
                  background: badge.bg, color: badge.color, fontWeight: 700,
                  fontSize: 11, whiteSpace: 'nowrap',
                }}>
                  <BadgeIcon size={11} /> {item.status}
                </span>
                <span className="text-label-sm" style={{ color: 'var(--color-outline)' }}>{item.date}</span>
              </motion.div>
            )
          })}

          {filtered.length === 0 && (
            <div style={{ padding: 'var(--space-xl)', textAlign: 'center', color: 'var(--color-on-surface-variant)' }}>
              <Search size={32} style={{ opacity: 0.3, margin: '0 auto 8px' }} />
              <p className="text-body-md">No results found for your search criteria.</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .table-header, .table-row {
            grid-template-columns: 1fr 1fr !important;
          }
          .table-header span:nth-child(n+3), .table-row > *:nth-child(n+4) {
            display: none;
          }
        }
      `}</style>
    </PageTransition>
  )
}
