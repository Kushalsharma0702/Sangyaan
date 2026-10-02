import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Shield, ShieldX, Lock, Wallet, Check, Clock,
  RefreshCw, Phone, Cpu, Database, Network
} from 'lucide-react'
import PageTransition from '../components/PageTransition'
import { useLanguage } from '../context/LanguageContext'

const FORENSIC_STEPS = [
  {
    id: 1,
    titles: {
      en: { label: 'Extracting text from image', detail: 'OCR complete: 247 words identified' },
      hi: { label: 'छवि से टेक्स्ट निष्कर्षण', detail: 'ओसीआर संपन्न: 247 शब्द विश्लेषित' },
      mr: { label: 'प्रतिमेतून मजकूर काढणे', detail: 'ओसीआर पूर्ण: २४७ शब्द तपासले' },
      bn: { label: 'ছবি থেকে টেক্সট নিষ্কাশন', detail: 'ওসিআর সম্পূর্ণ: ২৪৭ শব্দ শনাক্ত' },
      te: { label: 'చిత్రం నుండి వచనాన్ని సంగ్రహించడం', detail: 'ఓసీఆర్ పూర్తి: 247 పదాలు గుర్తించబడ్డాయి' },
      ta: { label: 'படத்திலிருந்து உரையைப் பிரித்தெடுத்தல்', detail: 'ஓசிஆர் முடிந்தது: 247 வார்த்தைகள்' },
      gu: { label: 'છબીમાંથી લખાણ મેળવવું', detail: 'ઓસીઆર પૂર્ણ: 247 શબ્દો ઓળખાયા' },
      kn: { label: 'ಚಿತ್ರದಿಂದ ಪಠ್ಯವನ್ನು ಹೊರತೆಗೆಯಲಾಗುತ್ತಿದೆ', detail: 'ಒಸಿಆರ್ ಪೂರ್ಣ: 247 ಪದಗಳು ಪತ್ತೆಯಾಗಿವೆ' },
    }
  },
  {
    id: 2,
    titles: {
      en: { label: 'Identifying key entities', detail: "Found: Claimed SEBI Advisor, UPI ID 'abc@upi', Telegram handle" },
      hi: { label: 'संस्थाओं व पहचानकर्ताओं की पहचान', detail: "पाया गया: कथित सेबी सलाहकार, यूपीआई आईडी 'abc@upi', टेलीग्राम चैनल" },
      mr: { label: 'महत्त्वाचे घटक ओळखणे', detail: "आढळले: कथित सेबी सल्लागार, यूपीआई आयडी 'abc@upi', टेलिग्राम हँडल" },
      bn: { label: 'মূল সত্ত্বা চিহ্নিতকরণ', detail: "পাওয়া গেছে: দাবিকৃত সেবি উপদেষ্টা, ইউপিআই আইডি 'abc@upi', টেলিগ্রাম হ্যান্ডেল" },
      te: { label: 'కీలక గుర్తింపులను కనుగొనడం', detail: "లభించినవి: సెబీ సలహాదారు క్లెయిమ్, యూపీఐ ఐడీ 'abc@upi', టెలిగ్రామ్" },
      ta: { label: 'முக்கிய கூறுகளைக் கண்டறிதல்', detail: "செபி ஆலோசகர் கோரிக்கை, யுபிஐ ஐடி 'abc@upi', டெலிகிராம் கண்டறியப்பட்டது" },
      gu: { label: 'મહત્વપૂર્ણ ઓળખકર્તા ચકાસવા', detail: "મળ્યું: કથિત સેબી સલાહકાર, યુપીઆઈ આઈડી 'abc@upi', ટેલિગ્રામ" },
      kn: { label: 'ಪ್ರಮುಖ ಗುರುತುಗಳನ್ನು ಪತ್ತೆಹಚ್ಚಲಾಗುತ್ತಿದೆ', detail: "ಕಂಡುಬಂದಿದೆ: ಸೆಬಿ ಸಲಹೆಗಾರ ಕ್ಲೈಮ್, ಯುಪಿಐ ಐಡಿ 'abc@upi', ಟೆಲಿಗ್ರಾಂ" },
    }
  },
  {
    id: 3,
    titles: {
      en: { label: 'Checking SEBI registration', detail: 'Querying official SEBI intermediary database...' },
      hi: { label: 'सेबी मध्यस्थ पंजीकरण सत्यापन', detail: 'आधिकारिक सेबी डेटाबेस में लाइव क्वेरी जारी...' },
      mr: { label: 'सेबी नोंदणी तपासत आहे', detail: 'अधिकृत सेबी डेटाबेसमध्ये थेट पडताळणी सुरू...' },
      bn: { label: 'সেবি নিবন্ধন পরীক্ষা করা হচ্ছে', detail: 'অফিসিয়াল সেবি ডাটাবেসে তথ্য অনুসন্ধান চলছে...' },
      te: { label: 'సెబీ రిజిస్ట్రేషన్ తనిఖీ చేస్తోంది', detail: 'అధికారిక సెబీ డేటాబేస్‌లో ప్రత్యక్ష శోధన...' },
      ta: { label: 'செபி பதிவைச் சரிபார்க்கிறது', detail: 'அதிகாரப்பூர்வ செபி தரவுத்தளத்தில் நேரடி தேடல்...' },
      gu: { label: 'સેબી નોંધણી તપાસી રહ્યું છે', detail: 'સત્તાવાર સેબી ડેટાબેઝમાં લાઈવ ચકાસણી...' },
      kn: { label: 'ಸೆಬಿ ನೋಂದಣಿಯನ್ನು ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ', detail: 'ಅಧಿಕೃತ ಸೆಬಿ ಡೇಟಾಬೇಸ್‌ನಲ್ಲಿ ನೇರ ಪರಿಶೀಲನೆ...' },
    }
  },
  {
    id: 4,
    titles: {
      en: { label: 'Analyzing domain information', detail: 'Checking WHOIS age, registrar, and phishing reports' },
      hi: { label: 'डोमेन व सर्वर सुरक्षा विश्लेषण', detail: 'WHOIS आयु, रजिस्ट्रार और फ़िशिंग डेटाबेस की जांच' },
      mr: { label: 'डोमेन माहितीचे विश्लेषण', detail: 'WHOIS वय, नोंदणीकर्ता व फिशिंग तक्रारींची तपासणी' },
      bn: { label: 'ডোমেন তথ্য বিশ্লেষণ করা হচ্ছে', detail: 'WHOIS বয়স, রেজিস্ট্রার এবং ফিশিং রিপোর্ট পরীক্ষা' },
      te: { label: 'డొమైన్ సమాచారాన్ని విశ్లేషిస్తోంది', detail: 'WHOIS వయస్సు, రిజిస్ట్రార్ మరియు ఫిషింగ్ నివేదికల తనిఖీ' },
      ta: { label: 'டொமைன் தகவலை ஆய்வு செய்கிறது', detail: 'WHOIS வயது, பதிவாளர் மற்றும் ஃபிஷிங் அறிக்கைகள்' },
      gu: { label: 'ડોમેન માહિતીનું વિશ્લેષણ', detail: 'WHOIS આયુષ્ય, રજિસ્ટ્રાર અને ફિશિંગ રિપોર્ટ્સની ચકાસણી' },
      kn: { label: 'ಡೊಮೇನ್ ಮಾಹಿತಿಯನ್ನು ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ', detail: 'WHOIS ವಯಸ್ಸು, ರಿಜಿಸ್ಟ್ರಾರ್ ಮತ್ತು ಫಿಶಿಂಗ್ ವರದಿಗಳ ಪರಿಶೀಲನೆ' },
    }
  },
  {
    id: 5,
    titles: {
      en: { label: 'Detecting scam indicators', detail: 'Matching NLP against known 14,000+ Ponzi scripts' },
      hi: { label: 'घोटाला पैटर्न व एनएलपी जांच', detail: '14,000+ ज्ञात पोंजी और साइबर फ्रॉड स्क्रिप्ट से मिलान' },
      mr: { label: 'घोटाळ्याचे संकेत शोधत आहे', detail: '१४,०००+ ज्ञात पोंझी व आर्थिक फसवणूक नमुन्यांशी जुळवणी' },
      bn: { label: 'প্রতারণার লক্ষণ শনাক্তকরণ', detail: '১৪,০০০+ পরিচিত পনজি স্ক্রিপ্টের সাথে এনএলপি মিলানো হচ্ছে' },
      te: { label: 'మోసపూరిత సంకేతాలను గుర్తించడం', detail: '14,000+ తెలిసిన పోంజీ స్క్రిప్ట్‌లతో ఎన్‌ఎల్‌పీ పోలిక' },
      ta: { label: 'மோசடி அறிகுறிகளைக் கண்டறிதல்', detail: '14,000+ பொன்சி ஸ்கிரிப்ட்களுடன் என்எல்பீ ஒப்பீடு' },
      gu: { label: 'કૌભાંડના સંકેતો શોધવા', detail: '14,000+ જાણીતા પોન્ઝી સ્ક્રિપ્ટ્સ સામે એનએલપી સરખામણી' },
      kn: { label: 'ವಂಚನೆಯ ಲಕ್ಷಣಗಳನ್ನು ಪತ್ತೆಹಚ್ಚಲಾಗುತ್ತಿದೆ', detail: '14,000+ ಪರಿಚಿತ ಪೊಂಜಿ ಸ್ಕ್ರಿಪ್ಟ್‌ಗಳೊಂದಿಗೆ ಎನ್‌ಎಲ್‌ಪಿ ಹೋಲಿಕೆ' },
    }
  },
  {
    id: 6,
    titles: {
      en: { label: 'Generating risk assessment & safe advisory', detail: 'Synthesizing civic mitigation playbook & telemetry flags' },
      hi: { label: 'जोखिम आकलन व सुरक्षा सलाह तैयार करना', detail: 'नागरिक सुरक्षा प्लेबुक और टेलीमेट्री अलर्ट का संकलन' },
      mr: { label: 'जोखीम मूल्यांकन व सुरक्षा सल्ला तयार करणे', detail: 'नागरिक सुरक्षा मार्गदर्शन व इशारा अहवाल संकलन' },
      bn: { label: 'ঝুঁকি মূল্যায়ন ও সুরক্ষা পরামর্শ তৈরি', detail: 'নাগরিক সুরক্ষা গাইডলাইন ও সতর্কতা প্রতিবেদন তৈরি' },
      te: { label: 'రిస్క్ అసెస్‌మెంట్ & సేఫ్టీ అడ్వైజరీ', detail: 'పౌర భద్రతా ప్లేబుక్ మరియు టెలిమెట్రీ హెచ్చరికల సంకలనం' },
      ta: { label: 'ஆபத்து மதிப்பீடு & பாதுகாப்பு ஆலோசனைகள்', detail: 'குடிமக்கள் பாதுகாப்பு வழிகாட்டுதல் தயாரிப்பு' },
      gu: { label: 'જોખમ મૂલ્યાંકન અને સલાહ તૈયાર કરવી', detail: 'નાગરિક સુરક્ષા માર્ગદર્શિકા અને ચેતવણી અહેવાલ' },
      kn: { label: 'ಅಪಾಯದ ಮೌಲ್ಯಮಾಪನ ಮತ್ತು ಸುರಕ್ಷತಾ ಸಲಹೆ', detail: 'ನಾಗರಿಕ ಸುರಕ್ಷತಾ ಮಾರ್ಗದರ್ಶಿ ಮತ್ತು ಎಚ್ಚರಿಕೆಯ ವರದಿ' },
    }
  },
]

export default function AnalysisProgress() {
  const { t, currentLang } = useLanguage()
  const lang = currentLang || 'en'
  const navigate = useNavigate()

  const [progress, setProgress] = useState(35)
  const [complete, setComplete] = useState(false)
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
    }, 380)
    return () => clearInterval(intervalRef.current)
  }, [])

  useEffect(() => {
    if (progress >= 100 && !complete) setComplete(true)
  }, [progress, complete])

  const circumference = 276.46
  const dashoffset = circumference - (circumference * Math.min(progress, 100) / 100)

  const statusText = {
    done: { en: 'Verified', hi: 'सत्यापित', mr: 'पडताळणी पूर्ण', bn: 'যাচাইকৃত', te: 'ధృవీకరించబడింది', ta: 'சரிபார்க்கப்பட்டது', gu: 'ચકાસાયેલ', kn: 'ಪರಿಶೀಲಿಸಲಾಗಿದೆ' },
    active: { en: 'In Progress', hi: 'प्रगति पर', mr: 'सुरू आहे', bn: 'চলমান', te: 'కొనసాగుతోంది', ta: 'செயலில் உள்ளது', gu: 'ચાલુ છે', kn: 'ಪ್ರಗತಿಯಲ್ಲಿದೆ' },
    pending: { en: 'Queued', hi: 'कतार में', mr: 'प्रतीक्षेत', bn: 'অপেক্ষমাণ', te: 'వేచి ఉంది', ta: 'வரிசையில்', gu: 'કતારમાં', kn: 'ಸಾಲಿನಲ್ಲಿದೆ' }
  }

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
              <span className="text-label-sm" style={{ textTransform: 'uppercase', letterSpacing: '0.08em', color: complete ? 'var(--color-error)' : 'var(--color-on-primary-fixed)', fontWeight: 700 }}>
                {complete ? (t.analysis?.threatDetected || 'High Risk Entity Detected') : (t.analysis?.title || 'Forensic Scan Active')}
              </span>
            </div>

            <h1 className="text-headline-md" style={{ color: 'var(--color-on-surface)', margin: '4px 0' }}>
              {complete ? (t.analysis?.threatScore || '⚠️ High Risk Entity Detected (94/100)') : (t.analysis?.subtitle || 'Running Deep Forensic Check...')}
            </h1>
            <p className="text-body-sm" style={{ color: 'var(--color-on-surface-variant)', marginTop: 4 }}>
              {complete
                ? (t.verifyBar?.dangerDesc || 'Extreme risk identified. Do NOT transfer funds or click suspicious links.')
                : 'Multi-vector synthetic and institutional compliance telemetry'}
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
              <span className="text-label-sm" style={{ textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-on-surface-variant)' }}>
                Target Under Inspection
              </span>
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
            {FORENSIC_STEPS.map((s, i) => {
              const threshold = ((i + 1) / FORENSIC_STEPS.length) * 100
              let currentStatus = 'pending'
              if (progress >= threshold) currentStatus = 'done'
              else if (progress >= threshold - (100 / FORENSIC_STEPS.length)) currentStatus = 'active'

              const stepContent = s.titles[lang] || s.titles.en
              const stepStatusLabel = statusText[currentStatus][lang] || statusText[currentStatus].en

              return (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.3 }}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: 'var(--space-sm)',
                    padding: 'var(--space-sm)', borderRadius: 'var(--radius-default)',
                    background: currentStatus === 'active' ? 'rgba(220,225,255,0.3)' : 'var(--color-surface-container-lowest)',
                    opacity: currentStatus === 'pending' ? 0.6 : 1,
                    transition: 'all 0.3s',
                  }}
                >
                  <div style={{
                    width: 24, height: 24, borderRadius: '50%', flexShrink: 0, marginTop: 2,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: currentStatus === 'done' ? 'var(--color-tertiary-fixed)' : currentStatus === 'active' ? 'var(--color-primary-container)' : 'var(--color-surface-container-high)',
                    color: currentStatus === 'done' ? 'var(--color-on-tertiary-fixed)' : currentStatus === 'active' ? 'var(--color-on-primary)' : 'var(--color-outline)',
                  }}>
                    {currentStatus === 'done' && <Check size={14} />}
                    {currentStatus === 'active' && <RefreshCw size={14} style={{ animation: 'rotate-slow 1s linear infinite' }} />}
                    {currentStatus === 'pending' && <Clock size={14} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span className="text-label-md" style={{
                        color: currentStatus === 'active' ? 'var(--color-primary)' : 'var(--color-on-surface)',
                        fontWeight: currentStatus === 'active' ? 700 : 500,
                      }}>{stepContent.label}</span>
                      <span className="text-label-sm" style={{
                        fontWeight: 600,
                        color: currentStatus === 'done' ? 'var(--color-tertiary)' : currentStatus === 'active' ? 'var(--color-primary)' : 'var(--color-outline)',
                      }}>
                        {stepStatusLabel}
                      </span>
                    </div>
                    <p className="text-body-sm" style={{ color: 'var(--color-on-surface-variant)', marginTop: 2 }}>{stepContent.detail}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Progress Bar */}
          <div style={{ marginTop: 'var(--space-lg)', paddingTop: 'var(--space-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-xs)' }}>
              <span className="text-label-md" style={{ fontWeight: 600, color: 'var(--color-on-surface)' }}>
                {t.verifyWorkspace?.analyzing || 'Verification Progress'}
              </span>
              <span className="text-data-mono" style={{ fontWeight: 700, color: complete ? 'var(--color-error)' : 'var(--color-primary)' }}>
                {Math.min(progress, 100)}% {complete ? (t.learn?.complete || 'Complete') : ''}
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
                {complete ? (t.analysis?.proceedAction || 'Review security advisory above') : (t.verifyWorkspace?.analyzingSub || 'This may take a few seconds')}
              </span>
              <span className="text-label-sm" style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--color-tertiary)' }}>
                <Lock size={12} /> {t.verifyBar?.privacy || 'Encrypted zero-retention'}
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
                  gap: 'var(--space-xs)', boxShadow: '0 2px 8px rgba(186,26,26,0.3)', border: 'none', cursor: 'pointer'
                }}>
                  <ShieldX size={18} />
                  <span>{t.analysis?.reportFirAction || 'Report This Entity'}</span>
                </button>
                <button onClick={() => navigate('/verify')} style={{
                  padding: '12px 24px', borderRadius: 'var(--radius-lg)',
                  background: 'var(--color-surface-container)', color: 'var(--color-on-surface)',
                  fontWeight: 600, fontSize: 15, border: 'none', cursor: 'pointer'
                }}>
                  {t.analysis?.newScanAction || 'New Scan'}
                </button>
              </>
            ) : (
              <>
                <button onClick={() => navigate('/verify')} style={{
                  padding: '10px 20px', borderRadius: 'var(--radius-lg)',
                  background: 'var(--color-surface-container)', color: 'var(--color-on-surface-variant)',
                  fontWeight: 600, display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', border: 'none', cursor: 'pointer'
                }}>
                  {t.report?.backBtn || 'Cancel Scan'}
                </button>
                <a href="tel:1930" style={{
                  display: 'flex', alignItems: 'center', gap: 'var(--space-xs)',
                  color: 'var(--color-error)', fontWeight: 600, fontSize: 13, textDecoration: 'none'
                }}>
                  <Phone size={16} />
                  <span>{t.report?.call1930 || 'Need urgent assistance? Call 1930'}</span>
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
