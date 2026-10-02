import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  BookOpen, Shield, ShieldCheck, AlertTriangle, Phone, Link2,
  MessageSquare, Eye, Clock, ArrowRight, CheckCircle, Award,
  GraduationCap, PlayCircle, ChevronDown, ChevronUp, Zap
} from 'lucide-react'
import PageTransition from '../components/PageTransition'

const LESSONS = [
  {
    category: 'UPI Safety',
    icon: Shield,
    color: 'var(--color-primary)',
    modules: [
      { title: 'How to Spot Fake UPI Payment Requests', duration: '3 min', difficulty: 'Beginner', completed: true },
      { title: 'Understanding UPI Collect vs Pay Requests', duration: '4 min', difficulty: 'Beginner', completed: true },
      { title: 'QR Code Scams: What to Watch For', duration: '5 min', difficulty: 'Intermediate', completed: false },
    ]
  },
  {
    category: 'Investment Scams',
    icon: AlertTriangle,
    color: 'var(--color-error)',
    modules: [
      { title: 'Guaranteed Returns: The Biggest Red Flag', duration: '4 min', difficulty: 'Beginner', completed: false },
      { title: 'How to Verify SEBI Registration Numbers', duration: '6 min', difficulty: 'Intermediate', completed: false },
      { title: 'Telegram & WhatsApp Trading Group Red Flags', duration: '5 min', difficulty: 'Beginner', completed: false },
    ]
  },
  {
    category: 'Digital Identity',
    icon: Eye,
    color: 'var(--color-secondary)',
    modules: [
      { title: 'Protecting Your Aadhaar & PAN Details', duration: '4 min', difficulty: 'Beginner', completed: true },
      { title: 'SIM Swap Fraud: Prevention & Recovery', duration: '7 min', difficulty: 'Advanced', completed: false },
      { title: 'Social Engineering: Voice Call Tactics', duration: '5 min', difficulty: 'Intermediate', completed: false },
    ]
  },
  {
    category: 'Phishing & Malware',
    icon: Link2,
    color: 'var(--color-tertiary)',
    modules: [
      { title: 'Identifying Fake Government Websites', duration: '3 min', difficulty: 'Beginner', completed: false },
      { title: 'APK Sideloading Dangers on Android', duration: '5 min', difficulty: 'Intermediate', completed: false },
      { title: 'Banking Trojan Defense for Indian Users', duration: '8 min', difficulty: 'Advanced', completed: false },
    ]
  },
]

const DIFFICULTY_COLORS = {
  Beginner: { bg: 'var(--color-tertiary-fixed)', color: 'var(--color-on-tertiary-fixed)' },
  Intermediate: { bg: 'var(--color-secondary-fixed)', color: 'var(--color-on-secondary-fixed)' },
  Advanced: { bg: 'var(--color-error-container)', color: 'var(--color-on-error-container)' },
}

export default function LearnPage() {
  const [expandedCategory, setExpandedCategory] = useState(0)

  const totalModules = LESSONS.reduce((sum, cat) => sum + cat.modules.length, 0)
  const completedModules = LESSONS.reduce((sum, cat) => sum + cat.modules.filter(m => m.completed).length, 0)
  const progressPercent = Math.round((completedModules / totalModules) * 100)

  return (
    <PageTransition>
      <div className="container-max" style={{ padding: 'var(--space-xl) var(--margin)' }}>
        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-on-primary-fixed) 100%)',
            borderRadius: 'var(--radius-xl)', padding: 'var(--space-xl)', marginBottom: 'var(--space-lg)',
            color: 'var(--color-on-primary)', position: 'relative', overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(183,196,255,0.1)', filter: 'blur(40px)' }} />
          <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-lg)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', marginBottom: 8 }}>
                <GraduationCap size={20} style={{ color: 'var(--color-tertiary-fixed)' }} />
                <span className="text-label-sm" style={{ textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>Sangyan Micro-Lessons</span>
              </div>
              <h1 className="text-headline-lg" style={{ fontWeight: 700 }}>Learn to Protect Yourself</h1>
              <p className="text-body-md" style={{ color: 'var(--color-primary-fixed)', marginTop: 4, maxWidth: 520 }}>
                Bite-sized, bilingual lessons on identifying scams, protecting your digital identity, and staying safe in India's digital payment ecosystem.
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: 100, height: 100, borderRadius: '50%', border: '4px solid rgba(255,255,255,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
                background: 'rgba(255,255,255,0.08)',
              }}>
                <span style={{ fontSize: 28, fontWeight: 800 }}>{progressPercent}%</span>
                <span className="text-label-sm">Complete</span>
              </div>
              <p className="text-label-sm" style={{ marginTop: 8, color: 'var(--color-primary-fixed)' }}>
                {completedModules}/{totalModules} modules done
              </p>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}>
          {[
            { icon: BookOpen, label: `${totalModules} Modules`, desc: 'Bite-sized 3-8 min lessons', color: 'var(--color-primary)' },
            { icon: Award, label: 'Certificates', desc: 'Earn completion badges', color: 'var(--color-secondary)' },
            { icon: Zap, label: 'Hindi + English', desc: 'Fully bilingual content', color: 'var(--color-tertiary)' },
            { icon: PlayCircle, label: 'Interactive', desc: 'Quizzes & simulations', color: 'var(--color-error)' },
          ].map(stat => (
            <div key={stat.label} style={{
              padding: 'var(--space-md)', borderRadius: 'var(--radius-lg)',
              background: 'var(--color-surface-container-lowest)', boxShadow: 'var(--shadow-card)',
              display: 'flex', alignItems: 'center', gap: 'var(--space-sm)',
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 'var(--radius-md)',
                background: `${stat.color}12`, display: 'flex', alignItems: 'center',
                justifyContent: 'center', color: stat.color,
              }}>
                <stat.icon size={20} />
              </div>
              <div>
                <span className="text-label-lg" style={{ fontWeight: 700, color: 'var(--color-on-surface)' }}>{stat.label}</span>
                <span className="text-body-sm" style={{ display: 'block', color: 'var(--color-on-surface-variant)' }}>{stat.desc}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Lesson Categories */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          {LESSONS.map((category, catIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: catIndex * 0.1, duration: 0.3 }}
              style={{
                background: 'var(--color-surface-container-lowest)',
                borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-card)', overflow: 'hidden',
              }}
            >
              {/* Category Header */}
              <button
                onClick={() => setExpandedCategory(expandedCategory === catIndex ? -1 : catIndex)}
                style={{
                  width: '100%', padding: 'var(--space-lg)', display: 'flex',
                  alignItems: 'center', justifyContent: 'space-between',
                  background: expandedCategory === catIndex ? 'var(--color-surface-container-low)' : 'transparent',
                  transition: 'background 0.2s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 'var(--radius-lg)',
                    background: `${category.color}15`, display: 'flex', alignItems: 'center',
                    justifyContent: 'center', color: category.color,
                  }}>
                    <category.icon size={22} />
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <h3 className="text-headline-sm" style={{ color: 'var(--color-on-surface)', fontWeight: 700 }}>{category.category}</h3>
                    <span className="text-label-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
                      {category.modules.filter(m => m.completed).length}/{category.modules.length} completed
                    </span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                  {/* Mini progress bar */}
                  <div style={{ width: 60, height: 6, borderRadius: 'var(--radius-full)', background: 'var(--color-surface-container-high)', overflow: 'hidden' }}>
                    <div style={{
                      width: `${(category.modules.filter(m => m.completed).length / category.modules.length) * 100}%`,
                      height: '100%', borderRadius: 'var(--radius-full)', background: category.color,
                      transition: 'width 0.3s',
                    }} />
                  </div>
                  {expandedCategory === catIndex ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </button>

              {/* Modules */}
              {expandedCategory === catIndex && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.25 }}
                  style={{ padding: '0 var(--space-lg) var(--space-lg)' }}
                >
                  {category.modules.map((mod, modIndex) => {
                    const diffColors = DIFFICULTY_COLORS[mod.difficulty]
                    return (
                      <div
                        key={modIndex}
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          padding: 'var(--space-md)', borderRadius: 'var(--radius-lg)',
                          background: mod.completed ? 'rgba(127,252,151,0.06)' : 'transparent',
                          marginBottom: modIndex < category.modules.length - 1 ? 'var(--space-xs)' : 0,
                          transition: 'background 0.2s', cursor: 'pointer',
                          gap: 'var(--space-sm)',
                        }}
                        onMouseEnter={e => { if (!mod.completed) e.currentTarget.style.background = 'var(--color-surface-container-low)' }}
                        onMouseLeave={e => { if (!mod.completed) e.currentTarget.style.background = 'transparent' }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', flex: 1, minWidth: 0 }}>
                          <div style={{
                            width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            background: mod.completed ? 'var(--color-tertiary-fixed)' : 'var(--color-surface-container)',
                            color: mod.completed ? 'var(--color-tertiary)' : 'var(--color-outline)',
                          }}>
                            {mod.completed ? <CheckCircle size={16} /> : <PlayCircle size={16} />}
                          </div>
                          <div style={{ minWidth: 0 }}>
                            <span className="text-label-lg" style={{
                              fontWeight: 600, color: 'var(--color-on-surface)',
                              textDecoration: mod.completed ? 'line-through' : 'none',
                              opacity: mod.completed ? 0.7 : 1,
                            }}>{mod.title}</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
                              <span className="text-label-sm" style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--color-outline)' }}>
                                <Clock size={11} /> {mod.duration}
                              </span>
                              <span className="text-label-sm" style={{
                                padding: '1px 6px', borderRadius: 'var(--radius-full)',
                                background: diffColors.bg, color: diffColors.color, fontWeight: 600,
                              }}>
                                {mod.difficulty}
                              </span>
                            </div>
                          </div>
                        </div>
                        <button style={{
                          padding: '6px 16px', borderRadius: 'var(--radius-default)',
                          background: mod.completed ? 'var(--color-surface-container)' : category.color,
                          color: mod.completed ? 'var(--color-on-surface-variant)' : 'white',
                          fontWeight: 600, fontSize: 12, flexShrink: 0, display: 'flex',
                          alignItems: 'center', gap: 4,
                        }}>
                          {mod.completed ? 'Review' : 'Start'}
                          <ArrowRight size={12} />
                        </button>
                      </div>
                    )
                  })}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  )
}
