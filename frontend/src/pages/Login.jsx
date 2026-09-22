import { useState } from 'react'

function Login({ onLogin }) {
  const [role, setRole] = useState('farmer')
  const [language, setLanguage] = useState('en')

  const translations = {
    en: {
      subtitle: 'Livestock Health Surveillance & Early Warning',
      welcome: 'Welcome to PashuMitra',
      choose: 'Choose how you want to explore the platform',
      selectLanguage: 'Select Language',
      continueAs: 'Continue as',
      farmer: 'Farmer',
      veterinarian: 'Veterinarian',
      farmerDesc: 'Report and track animal health',
      vetDesc: 'Review and manage livestock cases',
      continue: 'Continue',
      exploreDemo: '🚀 Explore Demo',
      demoDesc: 'Experience the complete PashuMitra workflow',
      tagline: 'Early detection. Better care. Healthier livestock.',
      risk: 'AI Risk Triage',
      hotspots: 'Disease Hotspots',
      alerts: 'Early Warnings',
      footer: 'PashuMitra • Livestock Health & Disease Surveillance',
    },

    hi: {
      subtitle: 'पशुधन स्वास्थ्य निगरानी और प्रारंभिक चेतावनी',
      welcome: 'पशुमित्र में आपका स्वागत है',
      choose: 'प्लेटफ़ॉर्म को देखने के लिए विकल्प चुनें',
      selectLanguage: 'भाषा चुनें',
      continueAs: 'जारी रखें',
      farmer: 'किसान',
      veterinarian: 'पशु चिकित्सक',
      farmerDesc: 'पशु स्वास्थ्य की रिपोर्ट और निगरानी करें',
      vetDesc: 'मामलों की समीक्षा और प्रबंधन करें',
      continue: 'जारी रखें',
      exploreDemo: '🚀 डेमो देखें',
      demoDesc: 'PashuMitra का पूरा कार्यप्रवाह देखें',
      tagline: 'जल्दी पहचान। बेहतर देखभाल। स्वस्थ पशुधन।',
      risk: 'AI जोखिम मूल्यांकन',
      hotspots: 'रोग हॉटस्पॉट',
      alerts: 'प्रारंभिक चेतावनी',
      footer: 'PashuMitra • पशुधन स्वास्थ्य और रोग निगरानी',
    },

    mr: {
      subtitle: 'पशुधन आरोग्य निगराणी आणि पूर्वसूचना',
      welcome: 'पशुमित्रमध्ये आपले स्वागत आहे',
      choose: 'प्लॅटफॉर्म पाहण्यासाठी पर्याय निवडा',
      selectLanguage: 'भाषा निवडा',
      continueAs: 'पुढे सुरू ठेवा',
      farmer: 'शेतकरी',
      veterinarian: 'पशुवैद्यक',
      farmerDesc: 'प्राण्यांच्या आरोग्याची नोंद आणि निगराणी करा',
      vetDesc: 'प्रकरणांचे पुनरावलोकन आणि व्यवस्थापन करा',
      continue: 'पुढे जा',
      exploreDemo: '🚀 डेमो पहा',
      demoDesc: 'PashuMitra चा संपूर्ण कार्यप्रवाह पहा',
      tagline: 'लवकर ओळख. उत्तम काळजी. निरोगी पशुधन.',
      risk: 'AI जोखीम मूल्यांकन',
      hotspots: 'रोग हॉटस्पॉट',
      alerts: 'पूर्वसूचना',
      footer: 'PashuMitra • पशुधन आरोग्य आणि रोग निगराणी',
    },
  }

  const t = translations[language] || translations.en

  const handleLogin = (e) => {
    e.preventDefault()
    onLogin(role, language)
  }

  const handleDemo = () => {
    // Demo opens the farmer experience directly.
    onLogin('farmer', language)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-6">

      <div className="w-full max-w-lg">

        {/* Brand */}
        <div className="text-center mb-6">

          <div className="mx-auto mb-4 w-20 h-20 rounded-full bg-green-100 flex items-center justify-center shadow-sm">
            <span className="text-5xl">🐄</span>
          </div>

          <h1 className="text-4xl font-extrabold text-green-700">
            PashuMitra
          </h1>

          <p className="text-gray-600 mt-2 text-sm">
            {t.subtitle}
          </p>

          <p className="text-sm text-green-700 font-medium mt-3">
            {t.tagline}
          </p>

        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">

          <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
            {t.welcome}
          </h2>

          <p className="text-gray-500 text-center text-sm mb-7">
            {t.choose}
          </p>

          <form onSubmit={handleLogin}>

            {/* Language */}
            <div className="mb-6">

              <label className="block text-gray-700 font-semibold mb-2">
                {t.selectLanguage}
              </label>

              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="mr">मराठी</option>
              </select>

            </div>

            {/* Role */}
            <div className="mb-6">

              <label className="block text-gray-700 font-semibold mb-3">
                {t.continueAs}
              </label>

              <div className="grid grid-cols-2 gap-3">

                {/* Farmer */}
                <button
                  type="button"
                  onClick={() => setRole('farmer')}
                  className={`text-left rounded-xl border-2 p-4 transition ${
                    role === 'farmer'
                      ? 'border-green-600 bg-green-50 shadow-sm'
                      : 'border-gray-200 bg-white hover:border-green-300'
                  }`}
                >
                  <div className="text-3xl mb-2">
                    👨‍🌾
                  </div>

                  <div className="font-bold text-gray-800">
                    {t.farmer}
                  </div>

                  <div className="text-xs text-gray-500 mt-1 leading-4">
                    {t.farmerDesc}
                  </div>
                </button>

                {/* Veterinarian */}
                <button
                  type="button"
                  onClick={() => setRole('vet')}
                  className={`text-left rounded-xl border-2 p-4 transition ${
                    role === 'vet'
                      ? 'border-green-600 bg-green-50 shadow-sm'
                      : 'border-gray-200 bg-white hover:border-green-300'
                  }`}
                >
                  <div className="text-3xl mb-2">
                    👨‍⚕️
                  </div>

                  <div className="font-bold text-gray-800">
                    {t.veterinarian}
                  </div>

                  <div className="text-xs text-gray-500 mt-1 leading-4">
                    {t.vetDesc}
                  </div>
                </button>

              </div>

            </div>

            {/* Continue */}
            <button
              type="submit"
              className="w-full bg-green-700 text-white font-semibold py-3.5 rounded-xl hover:bg-green-800 active:scale-[0.99] transition shadow-md"
            >
              {t.continue}
            </button>

          </form>

          {/* Demo Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="h-px bg-gray-200 flex-1"></div>
            <span className="text-xs text-gray-400">OR</span>
            <div className="h-px bg-gray-200 flex-1"></div>
          </div>

          {/* Explore Demo */}
          <button
            onClick={handleDemo}
            className="w-full border-2 border-green-600 text-green-700 font-semibold py-3 rounded-xl hover:bg-green-50 transition"
          >
            {t.exploreDemo}
          </button>

          <p className="text-xs text-gray-500 text-center mt-2">
            {t.demoDesc}
          </p>

        </div>

        {/* Feature Strip */}
        <div className="grid grid-cols-3 gap-2 mt-5">

          <div className="bg-white/80 rounded-xl p-3 text-center shadow-sm border border-gray-100">
            <div className="text-xl mb-1">🧠</div>
            <p className="text-xs font-semibold text-gray-700">
              {t.risk}
            </p>
          </div>

          <div className="bg-white/80 rounded-xl p-3 text-center shadow-sm border border-gray-100">
            <div className="text-xl mb-1">🗺️</div>
            <p className="text-xs font-semibold text-gray-700">
              {t.hotspots}
            </p>
          </div>

          <div className="bg-white/80 rounded-xl p-3 text-center shadow-sm border border-gray-100">
            <div className="text-xl mb-1">🚨</div>
            <p className="text-xs font-semibold text-gray-700">
              {t.alerts}
            </p>
          </div>

        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-5">
          {t.footer}
        </p>

      </div>

    </div>
  )
}

export default Login