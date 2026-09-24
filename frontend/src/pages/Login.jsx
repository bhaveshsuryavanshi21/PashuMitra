import { useState } from 'react'

function Login({ onLogin }) {
  const [role, setRole] = useState('farmer')
  const [language, setLanguage] = useState('en')
  const [showPassword, setShowPassword] = useState(false)

  const translations = {
    en: {
      subtitle: 'Livestock Health Surveillance & Early Warning',
      welcome: 'Welcome back',
      choose: 'Sign in to access PashuMitra',
      email: 'Email or username',
      emailPlaceholder: 'Enter your email or username',
      password: 'Password',
      passwordPlaceholder: 'Enter your password',
      forgot: 'Forgot password?',
      signIn: 'Sign In',
      continueWithGoogle: 'Continue with Google',
      or: 'OR',
      continueAs: 'Continue as',
      farmer: 'Farmer',
      veterinarian: 'Veterinarian',
      farmerDesc: 'Report and track animal health',
      vetDesc: 'Review and manage livestock cases',
      exploreDemo: '🚀 Explore Demo',
      demoDesc: 'No login required. Explore the working prototype instantly.',
      tagline: 'Early detection. Better care. Healthier livestock.',
      risk: 'AI Risk Triage',
      hotspots: 'Disease Hotspots',
      alerts: 'Early Warnings',
      footer: 'PashuMitra • Livestock Health & Disease Surveillance',
      demoNote: 'Demo access',
    },

    hi: {
      subtitle: 'पशुधन स्वास्थ्य निगरानी और प्रारंभिक चेतावनी',
      welcome: 'वापसी पर स्वागत है',
      choose: 'PashuMitra तक पहुँचने के लिए साइन इन करें',
      email: 'ईमेल या यूज़रनेम',
      emailPlaceholder: 'ईमेल या यूज़रनेम दर्ज करें',
      password: 'पासवर्ड',
      passwordPlaceholder: 'पासवर्ड दर्ज करें',
      forgot: 'पासवर्ड भूल गए?',
      signIn: 'साइन इन',
      continueWithGoogle: 'Google से जारी रखें',
      or: 'या',
      continueAs: 'जारी रखें',
      farmer: 'किसान',
      veterinarian: 'पशु चिकित्सक',
      farmerDesc: 'पशु स्वास्थ्य की रिपोर्ट और निगरानी करें',
      vetDesc: 'मामलों की समीक्षा और प्रबंधन करें',
      exploreDemo: '🚀 डेमो देखें',
      demoDesc: 'लॉगिन की आवश्यकता नहीं। तुरंत कार्यशील प्रोटोटाइप देखें।',
      tagline: 'जल्दी पहचान। बेहतर देखभाल। स्वस्थ पशुधन।',
      risk: 'AI जोखिम मूल्यांकन',
      hotspots: 'रोग हॉटस्पॉट',
      alerts: 'प्रारंभिक चेतावनी',
      footer: 'PashuMitra • पशुधन स्वास्थ्य और रोग निगरानी',
      demoNote: 'डेमो एक्सेस',
    },

    mr: {
      subtitle: 'पशुधन आरोग्य निगराणी आणि पूर्वसूचना',
      welcome: 'पुन्हा स्वागत आहे',
      choose: 'PashuMitra मध्ये प्रवेश करण्यासाठी साइन इन करा',
      email: 'ईमेल किंवा यूजरनेम',
      emailPlaceholder: 'ईमेल किंवा यूजरनेम टाका',
      password: 'पासवर्ड',
      passwordPlaceholder: 'पासवर्ड टाका',
      forgot: 'पासवर्ड विसरलात?',
      signIn: 'साइन इन',
      continueWithGoogle: 'Google सह पुढे जा',
      or: 'किंवा',
      continueAs: 'पुढे सुरू ठेवा',
      farmer: 'शेतकरी',
      veterinarian: 'पशुवैद्यक',
      farmerDesc: 'प्राण्यांच्या आरोग्याची नोंद आणि निगराणी करा',
      vetDesc: 'प्रकरणांचे पुनरावलोकन आणि व्यवस्थापन करा',
      exploreDemo: '🚀 डेमो पहा',
      demoDesc: 'लॉगिनची गरज नाही. कार्यरत प्रोटोटाइप लगेच पहा.',
      tagline: 'लवकर ओळख. उत्तम काळजी. निरोगी पशुधन.',
      risk: 'AI जोखीम मूल्यांकन',
      hotspots: 'रोग हॉटस्पॉट',
      alerts: 'पूर्वसूचना',
      footer: 'PashuMitra • पशुधन आरोग्य आणि रोग निगराणी',
      demoNote: 'डेमो प्रवेश',
    },
  }

  const t = translations[language] || translations.en

  const handleLogin = (e) => {
    e.preventDefault()
    onLogin(role, language)
  }

  const handleDemo = () => {
    onLogin('farmer', language)
  }

  const handleGoogle = () => {
    // UI placeholder for Google authentication.
    // Real Google OAuth will be connected later.
    onLogin(role, language)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-6xl">

        <div className="grid lg:grid-cols-[1.05fr_0.95fr] bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">

          {/* Brand side */}
          <div className="hidden lg:flex bg-green-700 text-white p-10 xl:p-14 flex-col justify-between min-h-[720px]">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center text-2xl">
                  🐄
                </div>

                <div>
                  <div className="text-2xl font-bold">PashuMitra</div>
                  <div className="text-xs text-green-100 mt-1">
                    Smart Livestock Health Platform
                  </div>
                </div>
              </div>

              <div className="mt-20 max-w-lg">
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-green-100">
                  {t.subtitle}
                </div>

                <h1 className="text-5xl font-bold leading-tight mt-4">
                  Early detection.
                  <br />
                  Better care.
                </h1>

                <p className="text-green-50/90 leading-7 mt-6 max-w-md">
                  Monitor animal health, assess risk, identify disease
                  hotspots and connect cases with veterinary support.
                </p>

                <div className="mt-8 inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-2 text-sm">
                  <span>✓</span>
                  {t.tagline}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-2xl bg-white/10 border border-white/10 p-4">
                <div className="text-xl mb-2">🧠</div>
                <p className="text-xs font-semibold">{t.risk}</p>
              </div>

              <div className="rounded-2xl bg-white/10 border border-white/10 p-4">
                <div className="text-xl mb-2">🗺️</div>
                <p className="text-xs font-semibold">{t.hotspots}</p>
              </div>

              <div className="rounded-2xl bg-white/10 border border-white/10 p-4">
                <div className="text-xl mb-2">🚨</div>
                <p className="text-xs font-semibold">{t.alerts}</p>
              </div>
            </div>
          </div>

          {/* Login side */}
          <div className="p-6 sm:p-8 lg:p-10 xl:p-12">

            <div className="flex items-center justify-between mb-8">
              <div className="lg:hidden flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center text-2xl">
                  🐄
                </div>

                <div>
                  <h1 className="text-xl font-bold text-slate-900">
                    PashuMitra
                  </h1>
                  <p className="text-xs text-slate-500">
                    Smart Livestock Health
                  </p>
                </div>
              </div>

              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="ml-auto bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-xl px-3 py-2.5 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                aria-label="Select language"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="mr">मराठी</option>
              </select>
            </div>

            <div className="mb-7">
              <div className="text-xs font-bold tracking-[0.18em] text-green-700 uppercase">
                PASHUMITRA
              </div>

              <h2 className="text-3xl font-bold text-slate-900 mt-2">
                {t.welcome}
              </h2>

              <p className="text-sm text-slate-500 mt-2">
                {t.choose}
              </p>
            </div>

            <form onSubmit={handleLogin}>

              {/* Email */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  {t.email}
                </label>

                <input
                  type="text"
                  placeholder={t.emailPlaceholder}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-800 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />
              </div>

              {/* Password */}
              <div className="mb-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  {t.password}
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder={t.passwordPlaceholder}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3.5 pr-12 text-sm text-slate-800 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-sm"
                    aria-label="Show or hide password"
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              <div className="text-right mb-5">
                <button
                  type="button"
                  className="text-xs font-semibold text-green-700 hover:text-green-800"
                >
                  {t.forgot}
                </button>
              </div>

              {/* Role */}
              <div className="mb-5">
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  {t.continueAs}
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole('farmer')}
                    className={`text-left rounded-xl border p-3.5 transition ${
                      role === 'farmer'
                        ? 'border-green-600 bg-green-50 ring-1 ring-green-200'
                        : 'border-slate-200 hover:border-green-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">👨‍🌾</span>
                      {role === 'farmer' && (
                        <span className="w-5 h-5 rounded-full bg-green-600 text-white text-[10px] flex items-center justify-center">
                          ✓
                        </span>
                      )}
                    </div>

                    <p className="font-bold text-sm text-slate-900 mt-2">
                      {t.farmer}
                    </p>

                    <p className="text-[11px] text-slate-500 mt-1 leading-4">
                      {t.farmerDesc}
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole('vet')}
                    className={`text-left rounded-xl border p-3.5 transition ${
                      role === 'vet'
                        ? 'border-green-600 bg-green-50 ring-1 ring-green-200'
                        : 'border-slate-200 hover:border-green-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">👨‍⚕️</span>
                      {role === 'vet' && (
                        <span className="w-5 h-5 rounded-full bg-green-600 text-white text-[10px] flex items-center justify-center">
                          ✓
                        </span>
                      )}
                    </div>

                    <p className="font-bold text-sm text-slate-900 mt-2">
                      {t.veterinarian}
                    </p>

                    <p className="text-[11px] text-slate-500 mt-1 leading-4">
                      {t.vetDesc}
                    </p>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3.5 rounded-xl transition shadow-sm"
              >
                {t.signIn}
              </button>
            </form>

            {/* Google */}
            <div className="flex items-center gap-3 my-5">
              <div className="h-px bg-slate-200 flex-1" />
              <span className="text-[11px] font-semibold text-slate-400 uppercase">
                {t.or}
              </span>
              <div className="h-px bg-slate-200 flex-1" />
            </div>

            <button
              type="button"
              onClick={handleGoogle}
              className="w-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold py-3.5 rounded-xl transition flex items-center justify-center gap-3"
            >
              <span className="text-lg font-bold">G</span>
              {t.continueWithGoogle}
            </button>

            {/* Demo */}
            <div className="mt-5 rounded-2xl border border-green-100 bg-green-50/60 p-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-white border border-green-100 flex items-center justify-center">
                  🚀
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-800">
                    {t.demoNote}
                  </p>

                  <p className="text-xs text-slate-500 mt-1 leading-5">
                    {t.demoDesc}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleDemo}
                className="w-full mt-3 bg-white border border-green-600 text-green-700 font-semibold py-3 rounded-xl hover:bg-green-50 transition"
              >
                {t.exploreDemo}
              </button>
            </div>

            <p className="text-[11px] text-slate-400 text-center mt-7">
              {t.footer}
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-4">
          {t.tagline}
        </p>
      </div>
    </div>
  )
}

export default Login
