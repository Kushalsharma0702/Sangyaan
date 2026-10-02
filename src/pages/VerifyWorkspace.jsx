import { useState, useRef, useCallback, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Shield, ShieldCheck, Lock, ScanSearch, Link2, MessageSquare, Mic,
  Upload, CloudUpload, CheckCircle, ArrowRight, Search, QrCode,
  Landmark, Phone, AlertTriangle, X, Image, FileWarning,
  Clipboard, Square, CircleStop, TrendingUp
} from 'lucide-react'
import PageTransition from '../components/PageTransition'

const TABS = [
  { id: 'screenshot', label: 'Screenshot', icon: ScanSearch },
  { id: 'link', label: 'Link / Domain', icon: Link2 },
  { id: 'message', label: 'Message', icon: MessageSquare },
  { id: 'voice', label: 'Voice / Audio', icon: Mic },
]

const SAMPLE_SCREENSHOTS = [
  { id: 'telegram', label: 'Telegram VIP Tip Group', desc: '"Daily 500% profit guaranteed in Nifty 50"', tag: 'High Risk', file: 'sample_telegram_vip_calls_nifty.png (Telegram Group)' },
  { id: 'sebi', label: 'Fake SEBI Advisor', desc: 'WhatsApp chat with forged certificate PDF', tag: 'Forged Doc', file: 'whatsapp_forged_sebi_certificate_ina99.pdf (WhatsApp)' },
  { id: 'apk', label: 'Suspicious Trading APK', desc: 'Sideload installer prompting SMS permissions', tag: 'Malicious APK', file: 'sideload_installer_bharat_pro_trader.apk.jpg (Android)' },
]

const LINK_SAMPLES = [
  { domain: 'xyztrading-india.com', type: 'Phishing', safe: false },
  { domain: 'sebi-india-verify.com', type: 'Impersonation', safe: false },
  { domain: 'groww.in', type: 'SEBI Regulated', safe: true },
  { domain: 'fake-broker.in/login', type: 'Credential Harvester', safe: false },
]

export default function VerifyWorkspace() {
  const [searchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'screenshot')
  const [selectedFile, setSelectedFile] = useState(null)
  const [linkValue, setLinkValue] = useState('')
  const [messageValue, setMessageValue] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [recordTime, setRecordTime] = useState(0)
  const [analyzing, setAnalyzing] = useState(false)
  const navigate = useNavigate()
  const timerRef = useRef(null)
  const fileInputRef = useRef(null)

  useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab && TABS.some(t => t.id === tab)) setActiveTab(tab)
  }, [searchParams])

  const handleFileSelect = useCallback((e) => {
    const file = e.target.files?.[0]
    if (file) setSelectedFile({ name: file.name, size: (file.size / 1024 / 1024).toFixed(1) + ' MB' })
  }, [])

  const selectSample = useCallback((sample) => {
    setSelectedFile({ name: sample.file, size: '1.4 MB' })
  }, [])

  const clearFile = useCallback(() => setSelectedFile(null), [])

  const startAnalysis = useCallback(() => {
    setAnalyzing(true)
    setTimeout(() => { setAnalyzing(false); navigate('/analysis') }, 1200)
  }, [navigate])

  const toggleRecording = useCallback(() => {
    if (!isRecording) {
      setIsRecording(true)
      setRecordTime(0)
      timerRef.current = setInterval(() => setRecordTime(t => t + 1), 1000)
    } else {
      setIsRecording(false)
      clearInterval(timerRef.current)
    }
  }, [isRecording])

  useEffect(() => () => clearInterval(timerRef.current), [])

  const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

  return (
    <PageTransition>
      <div className="container-max" style={{ padding: 'var(--space-lg) var(--margin)' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-sm)', marginBottom: 'var(--space-md)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', color: 'var(--color-on-surface-variant)' }} className="text-label-md">
            <span>Home</span>
            <ArrowRight size={14} />
            <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Civic Verification Workspace</span>
            <span className="text-label-sm" style={{ padding: '2px 8px', borderRadius: 'var(--radius-full)', background: 'var(--color-surface-container-high)', color: 'var(--color-primary)', marginLeft: 4 }}>
              AI Shield Engine v4.2
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 'var(--radius-full)', background: 'var(--color-surface-container-lowest)', boxShadow: 'var(--shadow-card)' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-tertiary)', animation: 'pulse-ring 2s infinite' }} />
              <span className="text-label-sm" style={{ color: 'var(--color-on-surface)' }}>SEBI & NPCI Threat Registry: Connected</span>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--gutter)', alignItems: 'start' }} className="workspace-grid">
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }} className="workspace-main">
            <div style={{
              background: 'var(--color-surface-container-lowest)', borderRadius: 'var(--radius-xl)',
              boxShadow: 'var(--shadow-card)', padding: 'var(--space-xl)', position: 'relative', overflow: 'hidden',
            }}>
              {/* Ambient glow */}
              <div style={{ position: 'absolute', right: -80, top: -80, width: 300, height: 300, borderRadius: '50%', background: 'rgba(0,55,177,0.04)', filter: 'blur(60px)', pointerEvents: 'none' }} />

              {/* Header */}
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 'var(--space-sm)', marginBottom: 'var(--space-lg)', position: 'relative', zIndex: 10 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', marginBottom: 4 }}>
                    <span style={{ display: 'inline-flex', padding: 6, borderRadius: 'var(--radius-default)', background: 'var(--color-primary)', color: 'var(--color-on-primary)' }}>
                      <Shield size={18} />
                    </span>
                    <span className="text-label-sm" style={{ textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-primary)', fontWeight: 700 }}>
                      Bharat Anti-Scam Shield
                    </span>
                  </div>
                  <h1 className="text-headline-lg" style={{ color: 'var(--color-on-surface)' }}>Verify Before You Pay</h1>
                  <p className="text-body-md" style={{ color: 'var(--color-on-surface-variant)', marginTop: 4 }}>
                    Paste, upload, or speak the details of any investment advice, telegram tip, or payment request.
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', background: 'var(--color-surface-container-low)', padding: '6px 12px', borderRadius: 'var(--radius-lg)', alignSelf: 'flex-start' }}>
                  <Lock size={16} style={{ color: 'var(--color-secondary)' }} />
                  <span className="text-label-sm" style={{ color: 'var(--color-secondary)', fontWeight: 600 }}>100% RAM Processed</span>
                </div>
              </div>

              {/* Tab Buttons */}
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-xs)',
                padding: 6, background: 'var(--color-surface-container-low)', borderRadius: 'var(--radius-lg)',
                marginBottom: 'var(--space-lg)', position: 'relative', zIndex: 10,
              }} className="tab-bar">
                {TABS.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="text-label-lg"
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-xs)',
                      padding: '10px 12px', borderRadius: 'var(--radius-default)',
                      background: activeTab === tab.id ? 'var(--color-surface-container-lowest)' : 'transparent',
                      color: activeTab === tab.id ? 'var(--color-primary)' : 'var(--color-on-surface-variant)',
                      fontWeight: activeTab === tab.id ? 700 : 600,
                      boxShadow: activeTab === tab.id ? 'var(--shadow-card)' : 'none',
                      transition: 'all 0.2s',
                    }}
                  >
                    <tab.icon size={18} />
                    <span className="tab-label">{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* SCREENSHOT TAB */}
                  {activeTab === 'screenshot' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                      {/* Dropzone */}
                      <div
                        style={{
                          position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center',
                          justifyContent: 'center', padding: 'var(--space-xl)', borderRadius: 'var(--radius-lg)',
                          background: 'var(--color-surface-container-low)', cursor: 'pointer',
                          transition: 'background 0.2s', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.04)',
                        }}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} style={{ display: 'none' }} />
                        <div style={{
                          width: 64, height: 64, borderRadius: '50%', background: 'var(--color-primary-fixed)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)',
                          marginBottom: 'var(--space-sm)', transition: 'transform 0.2s',
                        }}>
                          <CloudUpload size={30} />
                        </div>
                        <p className="text-headline-sm" style={{ color: 'var(--color-on-surface)', textAlign: 'center' }}>
                          Drag and drop your screenshot here, or <span style={{ color: 'var(--color-primary)', textDecoration: 'underline', fontWeight: 700 }}>Browse Files</span>
                        </p>
                        <p className="text-body-sm" style={{ color: 'var(--color-on-surface-variant)', marginTop: 4, textAlign: 'center' }}>
                          (JPG, PNG, WhatsApp chats, Telegram channels, SMS captures up to 10MB)
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-xs)', marginTop: 'var(--space-md)', justifyContent: 'center' }}>
                          {['OCR Text Extraction', 'UPI QR / ID Parsing', 'Forged Seal Detection'].map(feat => (
                            <span key={feat} className="text-label-sm" style={{
                              display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px',
                              borderRadius: 'var(--radius-full)', background: 'var(--color-surface-container-lowest)',
                              boxShadow: 'var(--shadow-card)',
                            }}>
                              <CheckCircle size={12} style={{ color: 'var(--color-tertiary)' }} /> {feat}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Quick Samples */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)', paddingTop: 'var(--space-xs)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span className="text-label-lg" style={{ color: 'var(--color-on-surface)', fontWeight: 600 }}>
                            Or Quick Test with Preloaded Indian Scam Samples:
                          </span>
                          <span className="text-label-sm" style={{ color: 'var(--color-on-surface-variant)' }}>Click any to test engine</span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--space-sm)' }}>
                          {SAMPLE_SCREENSHOTS.map(s => (
                            <div key={s.id} onClick={() => selectSample(s)} style={{
                              display: 'flex', flexDirection: 'column', padding: 'var(--space-sm)',
                              borderRadius: 'var(--radius-lg)', background: 'var(--color-surface-container-low)',
                              cursor: 'pointer', transition: 'all 0.2s', boxShadow: 'var(--shadow-card)',
                            }}
                              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.background = 'var(--color-surface-container)' }}
                              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = 'var(--color-surface-container-low)' }}
                            >
                              <div style={{
                                position: 'relative', height: 100, borderRadius: 'var(--radius-default)', overflow: 'hidden',
                                background: 'var(--color-surface-container-high)', marginBottom: 'var(--space-xs)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                              }}>
                                <FileWarning size={32} style={{ color: 'var(--color-outline)', opacity: 0.5 }} />
                                <span className="text-label-sm" style={{
                                  position: 'absolute', top: 8, left: 8,
                                  background: 'var(--color-error)', color: 'var(--color-on-error)',
                                  padding: '2px 8px', borderRadius: 'var(--radius-sm)',
                                  fontWeight: 700, textTransform: 'uppercase', fontSize: 10, letterSpacing: '0.05em',
                                }}>{s.tag}</span>
                              </div>
                              <span className="text-label-md" style={{ fontWeight: 700, color: 'var(--color-on-surface)' }}>{s.label}</span>
                              <span className="text-body-sm" style={{ color: 'var(--color-on-surface-variant)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.desc}</span>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 8, color: 'var(--color-primary)', fontWeight: 600, fontSize: 13 }}>
                                <span>Load Mock</span>
                                <ArrowRight size={12} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Selected file preview */}
                      <AnimatePresence>
                        {selectedFile && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            style={{
                              padding: 'var(--space-md)', borderRadius: 'var(--radius-lg)',
                              background: 'var(--color-surface-container-low)',
                              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.04)',
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                              <Image size={24} style={{ color: 'var(--color-primary)' }} />
                              <div>
                                <span className="text-label-md" style={{ fontWeight: 700, color: 'var(--color-on-surface)' }}>{selectedFile.name}</span>
                                <span className="text-body-sm" style={{ color: 'var(--color-on-surface-variant)', display: 'block' }}>
                                  {selectedFile.size} • High OCR Density Detected • Ready for Parsing
                                </span>
                              </div>
                            </div>
                            <button onClick={clearFile} style={{ color: 'var(--color-on-surface-variant)', transition: 'color 0.2s' }}>
                              <X size={18} />
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Analyze Button */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-sm)', paddingTop: 'var(--space-xs)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-on-surface-variant)' }} className="text-label-sm">
                          <CheckCircle size={16} style={{ color: 'var(--color-tertiary)' }} />
                          <span>Cross-checked against RBI & NPCI scam intelligence registry</span>
                        </div>
                        <button
                          onClick={startAnalysis}
                          disabled={analyzing}
                          style={{
                            padding: '14px 28px', borderRadius: 'var(--radius-lg)',
                            background: 'var(--color-primary)', color: 'var(--color-on-primary)',
                            fontWeight: 700, fontSize: 15, display: 'flex', alignItems: 'center',
                            gap: 'var(--space-xs)', boxShadow: '0 2px 8px rgba(0,55,177,0.25)',
                            transition: 'all 0.2s', opacity: analyzing ? 0.7 : 1,
                          }}
                        >
                          <ShieldCheck size={18} />
                          <span>{analyzing ? 'Verifying with AI Engine...' : 'Analyze Image & Verify →'}</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* LINK TAB */}
                  {activeTab === 'link' && (
                    <div style={{ padding: 'var(--space-lg)', borderRadius: 'var(--radius-lg)', background: 'var(--color-surface-container-low)', display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                      <label className="text-label-lg" style={{ fontWeight: 700, color: 'var(--color-on-surface)' }}>Inspect Suspicious Web Domain or Payment Gateway</label>
                      <div style={{ display: 'flex', gap: 'var(--space-xs)' }} className="link-input-row">
                        <div style={{ position: 'relative', flex: 1 }}>
                          <Link2 size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-on-surface-variant)' }} />
                          <input
                            type="url"
                            value={linkValue}
                            onChange={e => setLinkValue(e.target.value)}
                            placeholder="Paste URL (e.g. https://sebi-secure-portal.in)"
                            className="text-body-md"
                            style={{
                              width: '100%', paddingLeft: 42, paddingRight: 16, padding: '12px 16px 12px 42px',
                              borderRadius: 'var(--radius-lg)', background: 'var(--color-surface-container-lowest)',
                              color: 'var(--color-on-surface)', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.04)',
                            }}
                          />
                        </div>
                        <button
                          onClick={() => { if (!linkValue) setLinkValue('https://sebi-india-verify.com/portal'); navigate('/analysis') }}
                          style={{
                            padding: '12px 20px', borderRadius: 'var(--radius-lg)',
                            background: 'var(--color-primary)', color: 'var(--color-on-primary)',
                            fontWeight: 600, fontSize: 15, display: 'flex', alignItems: 'center',
                            gap: 'var(--space-xs)', boxShadow: '0 2px 8px rgba(0,55,177,0.25)',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          <Search size={16} />
                          <span>Inspect Domain</span>
                        </button>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 'var(--space-xs)' }}>
                        <span className="text-label-sm" style={{ fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-on-surface-variant)' }}>Quick Samples in Indian Financial Cyber Feeds:</span>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-xs)' }}>
                          {LINK_SAMPLES.map(s => (
                            <button key={s.domain} onClick={() => setLinkValue(s.domain)} className="text-data-mono" style={{
                              display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px',
                              borderRadius: 'var(--radius-full)', background: 'var(--color-surface-container-lowest)',
                              boxShadow: 'var(--shadow-card)', transition: 'background 0.2s',
                            }}>
                              <span style={{ width: 8, height: 8, borderRadius: '50%', background: s.safe ? 'var(--color-tertiary)' : 'var(--color-error)' }} />
                              <span style={{ color: 'var(--color-on-surface)' }}>{s.domain}</span>
                              <span className="text-label-sm" style={{ fontWeight: 600, color: s.safe ? 'var(--color-tertiary)' : 'var(--color-error)' }}>({s.type})</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* MESSAGE TAB */}
                  {activeTab === 'message' && (
                    <div style={{ padding: 'var(--space-lg)', borderRadius: 'var(--radius-lg)', background: 'var(--color-surface-container-low)', display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <label className="text-label-lg" style={{ fontWeight: 700, color: 'var(--color-on-surface)' }}>Paste SMS, WhatsApp Message, or Task Scam Pitch</label>
                        <span className="text-data-mono" style={{ color: 'var(--color-on-surface-variant)' }}>{messageValue.length} / 5000 characters</span>
                      </div>
                      <textarea
                        value={messageValue}
                        onChange={e => setMessageValue(e.target.value)}
                        placeholder='Paste the text pitch, guaranteed profit promises, or payment request message here...'
                        rows={4}
                        className="text-body-md"
                        style={{
                          width: '100%', padding: 'var(--space-md)', borderRadius: 'var(--radius-lg)',
                          background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)',
                          resize: 'vertical', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.04)',
                        }}
                      />
                      <div style={{
                        padding: 'var(--space-md)', borderRadius: 'var(--radius-lg)', background: 'var(--color-surface-container-lowest)',
                        display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-sm)',
                        boxShadow: 'var(--shadow-card)',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-xs)' }}>
                          <MessageSquare size={18} style={{ color: 'var(--color-secondary)', marginTop: 2 }} />
                          <p className="text-body-sm" style={{ color: 'var(--color-on-surface-variant)', fontStyle: 'italic' }}>
                            "SEBI approved premium investment opportunity. Guaranteed 40% return in 30 days. Limited slots. Pay now to abc@upi"
                          </p>
                        </div>
                        <button
                          onClick={() => setMessageValue('SEBI approved premium investment opportunity. Guaranteed 40% return in 30 days. Limited slots. Pay now to abc@upi')}
                          className="text-label-md"
                          style={{
                            display: 'flex', alignItems: 'center', gap: 4, padding: '6px 12px',
                            borderRadius: 'var(--radius-default)', background: 'var(--color-secondary-fixed)',
                            color: 'var(--color-on-secondary-fixed)', fontWeight: 700, flexShrink: 0,
                          }}
                        >
                          <Clipboard size={14} />
                          <span>Use this example</span>
                        </button>
                      </div>
                      <button onClick={() => navigate('/analysis')} style={{
                        alignSelf: 'flex-end', padding: '12px 28px', borderRadius: 'var(--radius-lg)',
                        background: 'var(--color-primary)', color: 'var(--color-on-primary)',
                        fontWeight: 600, fontSize: 15, display: 'flex', alignItems: 'center',
                        gap: 8, boxShadow: '0 2px 8px rgba(0,55,177,0.25)',
                      }}>
                        <Search size={18} />
                        <span>Evaluate Text Intent</span>
                      </button>
                    </div>
                  )}

                  {/* VOICE TAB */}
                  {activeTab === 'voice' && (
                    <div style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                      padding: 'var(--space-xl)', borderRadius: 'var(--radius-lg)', background: 'var(--color-surface-container-low)',
                      textAlign: 'center',
                    }}>
                      {/* Mic Button with Pulse */}
                      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 'var(--space-md) 0' }}>
                        {isRecording && (
                          <>
                            <div style={{ position: 'absolute', width: 120, height: 120, borderRadius: '50%', background: 'rgba(0,55,177,0.08)', animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite' }} />
                            <div style={{ position: 'absolute', width: 96, height: 96, borderRadius: '50%', background: 'rgba(0,55,177,0.15)' }} />
                          </>
                        )}
                        <button
                          onClick={toggleRecording}
                          style={{
                            position: 'relative', zIndex: 10, width: 76, height: 76, borderRadius: '50%',
                            background: isRecording ? 'var(--color-error)' : 'var(--color-primary)',
                            color: 'var(--color-on-primary)', display: 'flex', alignItems: 'center',
                            justifyContent: 'center', boxShadow: '0 4px 20px rgba(0,55,177,0.3)',
                            transition: 'all 0.2s',
                          }}
                        >
                          {isRecording ? <Square size={28} fill="white" /> : <Mic size={32} />}
                        </button>
                      </div>

                      <span className="text-headline-sm" style={{ color: 'var(--color-primary)', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
                        {formatTime(recordTime)}
                      </span>
                      <p className="text-label-lg" style={{ fontWeight: 600, color: 'var(--color-on-surface)', marginTop: 4 }}>
                        Speak in Hindi or English (बोलें या कॉल सुनाएं)
                      </p>
                      <p className="text-body-sm" style={{ color: 'var(--color-on-surface-variant)', maxWidth: 400, marginTop: 4 }}>
                        Describe the call you received or place the phone near speaker to transcribe high-pressure coercion.
                      </p>

                      {/* Waveform */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, height: 48, margin: 'var(--space-md) 0', width: '100%', maxWidth: 300 }}>
                        {[4, 8, 12, 7, 10, 5, 9, 3].map((h, i) => (
                          <span key={i} style={{
                            width: 6, height: h * 4, borderRadius: 'var(--radius-full)',
                            background: `rgba(0,55,177,${0.3 + i * 0.08})`,
                            animation: isRecording ? `bounce-bar 0.6s ${i * 0.1}s ease-in-out infinite` : 'none',
                            transformOrigin: 'bottom',
                          }} />
                        ))}
                      </div>

                      {/* Transcript */}
                      <div style={{
                        width: '100%', maxWidth: 480, padding: 'var(--space-md)', borderRadius: 'var(--radius-lg)',
                        background: 'var(--color-surface-container-lowest)', textAlign: 'left',
                        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.04)',
                      }}>
                        <span className="text-label-sm" style={{ textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, color: 'var(--color-on-surface-variant)' }}>
                          Live Neural ASR Transcript:
                        </span>
                        <p className="text-body-md" style={{ color: 'var(--color-on-surface)', marginTop: 4, fontStyle: 'italic' }}>
                          {isRecording
                            ? '"नमस्ते, मैं एसबीआई मुख्य शाखा मुंबई से बोल रहा हूँ। आपका खाता ब्लॉक हो गया है, तुरंत नीचे दिए गए यूपीआई पर 500 रुपये ट्रांसफर करें..."'
                            : 'Transcribing speech in real-time... (Hindi dialect engine initialized)'
                          }
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Feature cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-md)' }}>
              {[
                { icon: QrCode, title: 'UPI Handle & VPA Sanitizer', desc: 'Verify merchant handles to confirm whether they resolve to a verified business or an untraced individual savings account.', status: 'NPCI Resolver Active', color: 'var(--color-primary)' },
                { icon: Landmark, title: 'SEBI Registration Lookup', desc: 'Enter any claimed SEBI Registration Number to detect cloned identities and barred financial entities instantly.', status: 'SCORES API sync: 4m ago', color: 'var(--color-secondary)' },
              ].map(card => (
                <div key={card.title} style={{
                  padding: 'var(--space-lg)', borderRadius: 'var(--radius-xl)',
                  background: 'var(--color-surface-container-lowest)', boxShadow: 'var(--shadow-card)',
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: card.color, fontWeight: 700, marginBottom: 8 }}>
                      <card.icon size={18} />
                      <span className="text-label-lg">{card.title}</span>
                    </div>
                    <p className="text-body-sm" style={{ color: 'var(--color-on-surface-variant)' }}>{card.desc}</p>
                  </div>
                  <div style={{ marginTop: 'var(--space-md)', paddingTop: 'var(--space-sm)', borderTop: '1px solid var(--color-surface-container-high)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span className="text-label-sm" style={{ color: 'var(--color-on-surface-variant)' }}>{card.status}</span>
                    <button className="text-label-md" style={{ color: card.color, fontWeight: 700 }}>Run Lookup →</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }} className="workspace-sidebar">
            {/* Tips Card */}
            <div style={{ background: 'var(--color-surface-container-lowest)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-lg)', boxShadow: 'var(--shadow-card)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', marginBottom: 'var(--space-md)', paddingBottom: 'var(--space-xs)', borderBottom: '1px solid var(--color-surface-container-high)' }}>
                <span style={{ padding: 8, borderRadius: 'var(--radius-default)', background: 'var(--color-primary-fixed)', color: 'var(--color-primary)' }}>
                  <CheckCircle size={18} />
                </span>
                <div>
                  <h2 className="text-headline-sm" style={{ color: 'var(--color-on-surface)' }}>Tips for a Good Check</h2>
                  <span className="text-label-sm" style={{ color: 'var(--color-on-surface-variant)' }}>Maximizing AI Confidence Score</span>
                </div>
              </div>
              {[
                { num: 1, title: 'Include Sender Phone / UPI ID', desc: 'Ensure the sender\'s full mobile number or VPA is clearly uncropped.' },
                { num: 2, title: 'Capture Full Promises & Returns', desc: 'Highlight "double your money" or "risk-free daily compound interest" statements.' },
                { num: 3, title: 'Never Crop Registration Claims', desc: 'Keep any SEBI seals, RBI logos, or corporate certificates in frame.' },
              ].map(tip => (
                <div key={tip.num} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-sm)', marginBottom: 'var(--space-md)' }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%', background: 'var(--color-surface-container)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    fontWeight: 600, fontSize: 16, color: 'var(--color-primary)',
                  }}>{tip.num}</div>
                  <div>
                    <span className="text-label-lg" style={{ fontWeight: 600, color: 'var(--color-on-surface)' }}>{tip.title}</span>
                    <p className="text-body-sm" style={{ color: 'var(--color-on-surface-variant)', marginTop: 2 }}>{tip.desc}</p>
                  </div>
                </div>
              ))}
              <div style={{ padding: 'var(--space-md)', borderRadius: 'var(--radius-lg)', background: 'var(--color-surface-container-low)', display: 'flex', alignItems: 'flex-start', gap: 'var(--space-xs)', marginTop: 'var(--space-xs)' }}>
                <Lock size={18} style={{ color: 'var(--color-tertiary)', marginTop: 2 }} />
                <p className="text-body-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
                  <strong style={{ color: 'var(--color-on-surface)' }}>Data Sovereignty:</strong> Your uploaded images are processed in volatile memory (RAM) and permanently wiped post-verification.
                </p>
              </div>
            </div>

            {/* Emergency Card */}
            <div style={{
              background: 'var(--color-inverse-surface)', color: 'var(--color-inverse-on-surface)',
              borderRadius: 'var(--radius-xl)', padding: 'var(--space-lg)', boxShadow: 'var(--shadow-elevated)',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', right: -32, bottom: -32, width: 140, height: 140, borderRadius: '50%', background: 'rgba(186,26,26,0.1)', pointerEvents: 'none' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', marginBottom: 'var(--space-sm)' }}>
                <span style={{ padding: 6, borderRadius: 'var(--radius-default)', background: 'var(--color-error)', color: 'var(--color-on-error)' }}>
                  <AlertTriangle size={18} />
                </span>
                <span className="text-label-sm" style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-error-container)' }}>
                  Critical Intervention
                </span>
              </div>
              <h3 className="text-headline-sm" style={{ marginBottom: 'var(--space-xs)' }}>Suspicious of an ongoing transaction right now?</h3>
              <p className="text-body-sm" style={{ color: 'var(--color-surface-variant)', marginBottom: 'var(--space-lg)' }}>
                If you have just authorized an unauthorized transfer or were coerced into sharing an OTP, execute immediate deterrence:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                <a href="tel:1930" style={{
                  width: '100%', padding: '14px', borderRadius: 'var(--radius-lg)',
                  background: 'var(--color-error)', color: 'var(--color-on-error)',
                  fontWeight: 700, fontSize: 15, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', gap: 'var(--space-xs)', boxShadow: '0 2px 8px rgba(186,26,26,0.3)',
                }}>
                  <Phone size={20} />
                  <span>Call 1930 Cyber Helpline</span>
                </a>
                <button style={{
                  width: '100%', padding: '12px', borderRadius: 'var(--radius-lg)',
                  background: 'rgba(224,227,229,0.15)', color: 'var(--color-inverse-on-surface)',
                  fontWeight: 600, fontSize: 13, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', gap: 'var(--space-xs)',
                }}
                  onClick={() => alert('Emergency Bank Freeze Steps:\n\n1. Call your bank\'s 24x7 toll-free card/account hotlist number immediately.\n2. Send SMS \'BLOCK <Account_No>\' (if supported by your bank).\n3. File formal complaint on 1930 within the \'Golden Hour\' to freeze beneficiary nodal accounts.')}
                >
                  <Lock size={16} />
                  <span>Freeze Bank Account Instructions</span>
                </button>
              </div>
              <div style={{ marginTop: 'var(--space-md)', paddingTop: 'var(--space-sm)', borderTop: '1px solid rgba(196,197,215,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} className="text-label-sm">
                <span style={{ color: 'var(--color-surface-variant)' }}>Golden Hour: Within 2 hours</span>
                <span style={{ color: 'var(--color-tertiary-fixed)', fontWeight: 700 }}>Max Recovery Probability</span>
              </div>
            </div>

            {/* Counter Card */}
            <div style={{
              padding: 'var(--space-md)', borderRadius: 'var(--radius-xl)',
              background: 'var(--color-surface-container-low)', boxShadow: 'var(--shadow-card)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 'var(--radius-lg)', background: 'var(--color-surface-container-lowest)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)',
                  boxShadow: 'var(--shadow-card)',
                }}>
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <span className="text-headline-sm" style={{ fontWeight: 700, color: 'var(--color-on-surface)', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>1,429,812</span>
                  <span className="text-label-sm" style={{ color: 'var(--color-on-surface-variant)', display: 'block' }}>Scam attempts prevented across India</span>
                </div>
              </div>
              <TrendingUp size={20} style={{ color: 'var(--color-tertiary)' }} />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .workspace-grid { grid-template-columns: 8fr 4fr; }
        .link-input-row { flex-direction: row; }
        @media (max-width: 1199px) {
          .workspace-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .tab-bar { grid-template-columns: repeat(2, 1fr) !important; }
          .tab-label { display: none; }
          .link-input-row { flex-direction: column; }
        }
      `}</style>
    </PageTransition>
  )
}
