import { useEffect, useState } from 'react'

function ReportAnimal({ language }) {
  const translations = {
    en: {
      title: 'Report Animal Health Issue',
      description:
        'Report symptoms and location to get an AI-assisted risk assessment.',
      animalType: 'Animal Type',
      animalAge: 'Animal Age',
      symptoms: 'Symptoms',
      location: 'Location',
      speak: '🎤 Speak',
      getLocation: '📍 Use My Current Location',
      submit: 'Submit Report',

      selectAnimal: 'Select animal',
      cow: 'Cow',
      buffalo: 'Buffalo',
      goat: 'Goat',
      sheep: 'Sheep',

      agePlaceholder: 'Enter age in years',
      locationPlaceholder: 'Enter village or location',

      fever: 'Fever',
      salivation: 'Excessive Salivation',
      difficultyWalking: 'Difficulty Walking',
      coughing: 'Coughing',

      youSaid: 'You said:',
      voiceNotSupported:
        'Voice input is not supported in this browser',
      locationError: 'Unable to get your location',

      online: 'Online',
      offline: 'Offline — Reports will sync automatically',
      locationCaptured: '✓ Location captured',
      gettingLocation: 'Getting location...',

      submitting: 'Submitting report...',
      submitted: '✓ Report submitted successfully',
      offlineSaved:
        '📴 Report saved offline. It will sync when internet returns.',
      syncSuccess: '✓ Offline report synced successfully.',

      riskAssessment: 'AI-Assisted Risk Assessment',
      lowRisk: 'LOW RISK',
      mediumRisk: 'MEDIUM RISK',
      highRisk: 'HIGH RISK',

      lowMessage:
        'The reported symptoms currently indicate a lower risk level. Continue monitoring the animal.',
      mediumMessage:
        'Veterinary review is recommended. Monitor the animal closely.',
      highMessage:
        'Prompt veterinary review is recommended for this case.',

      riskScore: 'Risk Score',
      whyRisk: 'Why this risk?',
      recommendation: 'Recommended Action',
      triageNote:
        'This is a risk assessment, not a definitive disease diagnosis.',
    },

    hi: {
      title: 'पशु की स्वास्थ्य समस्या की रिपोर्ट करें',
      description:
        'लक्षण और स्थान दर्ज करें ताकि AI-सहायता प्राप्त जोखिम आकलन किया जा सके।',
      animalType: 'पशु का प्रकार',
      animalAge: 'पशु की उम्र',
      symptoms: 'लक्षण',
      location: 'स्थान',
      speak: '🎤 बोलें',
      getLocation: '📍 मेरा वर्तमान स्थान लें',
      submit: 'रिपोर्ट भेजें',

      selectAnimal: 'पशु चुनें',
      cow: 'गाय',
      buffalo: 'भैंस',
      goat: 'बकरी',
      sheep: 'भेड़',

      agePlaceholder: 'उम्र वर्षों में दर्ज करें',
      locationPlaceholder: 'गांव या स्थान दर्ज करें',

      fever: 'बुखार',
      salivation: 'अधिक लार आना',
      difficultyWalking: 'चलने में कठिनाई',
      coughing: 'खांसी',

      youSaid: 'आपने कहा:',
      voiceNotSupported:
        'इस ब्राउज़र में वॉइस इनपुट उपलब्ध नहीं है',
      locationError: 'स्थान प्राप्त नहीं किया जा सका',

      online: 'ऑनलाइन',
      offline: 'ऑफलाइन — रिपोर्ट अपने आप सिंक होगी',
      locationCaptured: '✓ स्थान प्राप्त हो गया',
      gettingLocation: 'स्थान प्राप्त किया जा रहा है...',

      submitting: 'रिपोर्ट भेजी जा रही है...',
      submitted: '✓ रिपोर्ट सफलतापूर्वक भेजी गई',
      offlineSaved:
        '📴 रिपोर्ट ऑफलाइन सेव हो गई। इंटरनेट आने पर यह सिंक होगी।',
      syncSuccess: '✓ ऑफलाइन रिपोर्ट सफलतापूर्वक सिंक हो गई।',

      riskAssessment: 'AI-सहायता प्राप्त जोखिम आकलन',
      lowRisk: 'कम जोखिम',
      mediumRisk: 'मध्यम जोखिम',
      highRisk: 'उच्च जोखिम',

      lowMessage:
        'दर्ज किए गए लक्षण वर्तमान में कम जोखिम का संकेत देते हैं। पशु की निगरानी जारी रखें।',
      mediumMessage:
        'पशु चिकित्सक से जांच कराने की सलाह दी जाती है। पशु की निगरानी करें।',
      highMessage:
        'इस मामले में जल्द से जल्द पशु चिकित्सक से जांच कराने की सलाह दी जाती है।',

      riskScore: 'जोखिम स्कोर',
      whyRisk: 'यह जोखिम क्यों?',
      recommendation: 'अनुशंसित कार्रवाई',
      triageNote:
        'यह जोखिम आकलन है, निश्चित बीमारी का निदान नहीं।',
    },

    mr: {
      title: 'प्राण्याच्या आरोग्य समस्येची नोंद करा',
      description:
        'लक्षणे आणि ठिकाण नोंदवा आणि AI-सहाय्यित जोखीम मूल्यांकन मिळवा.',
      animalType: 'प्राण्याचा प्रकार',
      animalAge: 'प्राण्याचे वय',
      symptoms: 'लक्षणे',
      location: 'ठिकाण',
      speak: '🎤 बोला',
      getLocation: '📍 माझे वर्तमान ठिकाण वापरा',
      submit: 'अहवाल पाठवा',

      selectAnimal: 'प्राणी निवडा',
      cow: 'गाय',
      buffalo: 'म्हैस',
      goat: 'शेळी',
      sheep: 'मेंढी',

      agePlaceholder: 'वय वर्षांमध्ये नोंदवा',
      locationPlaceholder: 'गाव किंवा ठिकाण नोंदवा',

      fever: 'ताप',
      salivation: 'जास्त लाळ येणे',
      difficultyWalking: 'चालण्यास त्रास',
      coughing: 'खोकला',

      youSaid: 'तुम्ही म्हणालात:',
      voiceNotSupported:
        'या ब्राउझरमध्ये व्हॉइस इनपुट उपलब्ध नाही',
      locationError: 'तुमचे ठिकाण मिळवता आले नाही',

      online: 'ऑनलाइन',
      offline: 'ऑफलाइन — अहवाल आपोआप सिंक होतील',
      locationCaptured: '✓ ठिकाण मिळाले',
      gettingLocation: 'ठिकाण मिळवत आहे...',

      submitting: 'अहवाल पाठवत आहे...',
      submitted: '✓ अहवाल यशस्वीपणे पाठवला',
      offlineSaved:
        '📴 अहवाल ऑफलाइन सेव्ह झाला. इंटरनेट आल्यावर तो सिंक होईल.',
      syncSuccess: '✓ ऑफलाइन अहवाल यशस्वीपणे सिंक झाला.',

      riskAssessment: 'AI-सहाय्यित जोखीम मूल्यांकन',
      lowRisk: 'कमी जोखीम',
      mediumRisk: 'मध्यम जोखीम',
      highRisk: 'जास्त जोखीम',

      lowMessage:
        'नोंदवलेली लक्षणे सध्या कमी जोखीम दर्शवतात. प्राण्याचे निरीक्षण सुरू ठेवा.',
      mediumMessage:
        'पशुवैद्यकाकडून तपासणी करण्याची शिफारस केली जाते. प्राण्याचे बारकाईने निरीक्षण करा.',
      highMessage:
        'या प्रकरणासाठी लवकरात लवकर पशुवैद्यकाकडून तपासणी करण्याची शिफारस केली जाते.',

      riskScore: 'जोखीम स्कोअर',
      whyRisk: 'हा धोका का?',
      recommendation: 'शिफारस केलेली कृती',
      triageNote:
        'हे जोखीम मूल्यांकन आहे, निश्चित रोगाचे निदान नाही.',
    },
  }

  const t = translations[language] || translations.en

  const [animalType, setAnimalType] = useState('')
  const [animalAge, setAnimalAge] = useState('')
  const [symptoms, setSymptoms] = useState([])
  const [location, setLocation] = useState('')
  const [message, setMessage] = useState('')
  const [voiceText, setVoiceText] = useState('')

  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)

  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [locationStatus, setLocationStatus] = useState('')

  // Risk information
  const [risk, setRisk] = useState('')
  const [riskScore, setRiskScore] = useState(null)
  const [riskReasons, setRiskReasons] = useState([])

  // =========================
  // ONLINE / OFFLINE STATUS
  // =========================

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      syncOfflineReports()
    }

    const handleOffline = () => {
      setIsOnline(false)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    syncOfflineReports()

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // =========================
  // SAVE REPORT OFFLINE
  // =========================

  const saveOfflineReport = (report) => {
    const existingReports =
      JSON.parse(localStorage.getItem('offlineReports')) || []

    existingReports.push(report)

    localStorage.setItem(
      'offlineReports',
      JSON.stringify(existingReports)
    )

    setMessage(t.offlineSaved)
  }

  // =========================
  // SEND REPORT
  // =========================

  const sendReport = async (report) => {
    const response = await fetch(
      'http://127.0.0.1:8000/report',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(report),
      }
    )

    if (!response.ok) {
      throw new Error('Failed to send report')
    }

    return await response.json()
  }

  // =========================
  // SYNC OFFLINE REPORTS
  // =========================

  const syncOfflineReports = async () => {
    if (!navigator.onLine) {
      return
    }

    const offlineReports =
      JSON.parse(localStorage.getItem('offlineReports')) || []

    if (offlineReports.length === 0) {
      return
    }

    const remainingReports = []

    for (const report of offlineReports) {
      try {
        await sendReport(report)
      } catch (error) {
        console.error('Sync failed:', error)
        remainingReports.push(report)
      }
    }

    if (remainingReports.length > 0) {
      localStorage.setItem(
        'offlineReports',
        JSON.stringify(remainingReports)
      )
    } else {
      localStorage.removeItem('offlineReports')
      setMessage(t.syncSuccess)
    }
  }

  // =========================
  // GET LOCATION
  // =========================

  const getMyLocation = () => {
    if (!navigator.geolocation) {
      alert(t.locationError)
      return
    }

    setLocationStatus(t.gettingLocation)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)

        setLocationStatus(t.locationCaptured)

        console.log(
          'Latitude:',
          position.coords.latitude
        )

        console.log(
          'Longitude:',
          position.coords.longitude
        )
      },
      (error) => {
        console.error('Location error:', error)
        setLocationStatus('')
        alert(t.locationError)
      }
    )
  }

  // =========================
  // SUBMIT REPORT
  // =========================

  const handleSubmit = async () => {
    if (!animalType || !animalAge || symptoms.length === 0) {
      setMessage(
        language === 'hi'
          ? 'कृपया पशु, उम्र और कम से कम एक लक्षण चुनें।'
          : language === 'mr'
          ? 'कृपया प्राणी, वय आणि किमान एक लक्षण निवडा.'
          : 'Please select animal, age, and at least one symptom.'
      )
      return
    }

    const report = {
      animalType,
      animalAge,
      symptoms,
      location,
      latitude,
      longitude,
    }

    // Clear previous result
    setRisk('')
    setRiskScore(null)
    setRiskReasons([])
    setMessage('')

    // Offline
    if (!navigator.onLine) {
      saveOfflineReport(report)
      return
    }

    try {
      setIsSubmitting(true)
      setMessage(t.submitting)

      const data = await sendReport(report)

      console.log('Data received:', data)

      // =========================
      // RISK RESULT
      // =========================

      if (data.priority) {
        setRisk(data.priority)
      }

      if (data.risk_score !== undefined) {
        setRiskScore(data.risk_score)
      }

      if (Array.isArray(data.reasons)) {
        setRiskReasons(data.reasons)
      }

      setMessage(t.submitted)

    } catch (error) {
      console.error('Request failed:', error)

      // Save locally if backend/network fails
      saveOfflineReport(report)

    } finally {
      setIsSubmitting(false)
    }
  }

  // =========================
  // VOICE INPUT
  // =========================

  const handleVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      alert(t.voiceNotSupported)
      return
    }

    const recognition = new SpeechRecognition()

    if (language === 'hi') {
      recognition.lang = 'hi-IN'
    } else if (language === 'mr') {
      recognition.lang = 'mr-IN'
    } else {
      recognition.lang = 'en-IN'
    }

    recognition.start()

    recognition.onresult = (event) => {
      const text =
        event.results[0][0].transcript

      setVoiceText(text)

      console.log('Voice text:', text)
    }
  }

  // =========================
  // RISK INFORMATION
  // =========================

  const getRiskTitle = () => {
    if (risk === 'High') {
      return `🔴 ${t.highRisk}`
    }

    if (risk === 'Medium') {
      return `🟠 ${t.mediumRisk}`
    }

    if (risk === 'Low') {
      return `🟢 ${t.lowRisk}`
    }

    return ''
  }

  const getRiskMessage = () => {
    if (risk === 'High') {
      return t.highMessage
    }

    if (risk === 'Medium') {
      return t.mediumMessage
    }

    if (risk === 'Low') {
      return t.lowMessage
    }

    return ''
  }

  // =========================
  // RISK COLOR
  // =========================

  const getRiskStyles = () => {
    if (risk === 'High') {
      return {
        border: 'border-red-300',
        background: 'bg-red-50',
        bar: 'bg-red-500',
      }
    }

    if (risk === 'Medium') {
      return {
        border: 'border-orange-300',
        background: 'bg-orange-50',
        bar: 'bg-orange-500',
      }
    }

    return {
      border: 'border-green-300',
      background: 'bg-green-50',
      bar: 'bg-green-500',
    }
  }

  // =========================
  // SYMPTOM CARD
  // =========================

  const toggleSymptom = (symptom) => {
    if (symptoms.includes(symptom)) {
      setSymptoms(
        symptoms.filter(
          (item) => item !== symptom
        )
      )
    } else {
      setSymptoms([
        ...symptoms,
        symptom,
      ])
    }
  }

  const symptomCards = [
    {
      value: 'fever',
      icon: '🌡️',
      label: t.fever,
    },
    {
      value: 'salivation',
      icon: '💧',
      label: t.salivation,
    },
    {
      value: 'difficulty_walking',
      icon: '🚶',
      label: t.difficultyWalking,
    },
    {
      value: 'coughing',
      icon: '🫁',
      label: t.coughing,
    },
  ]

  const riskStyles = getRiskStyles()

  return (
    <div className="min-h-screen bg-green-50 p-4 md:p-8">

      <div className="max-w-3xl mx-auto">

        {/* =========================
            ONLINE STATUS
        ========================= */}

        <div
          className={`mb-4 rounded-xl px-4 py-3 text-sm font-semibold ${
            isOnline
              ? 'bg-green-100 text-green-700'
              : 'bg-orange-100 text-orange-700'
          }`}
        >
          {isOnline
            ? `🟢 ${t.online}`
            : `🟠 ${t.offline}`}
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">

          {/* =========================
              HEADER
          ========================= */}

          <div className="mb-8">

            <h1 className="text-3xl md:text-4xl font-bold text-green-700">
              🐄 {t.title}
            </h1>

            <p className="text-gray-600 mt-2">
              {t.description}
            </p>

          </div>

          {/* =========================
              ANIMAL TYPE
          ========================= */}

          <div className="mb-6">

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t.animalType}
            </label>

            <select
              value={animalType}
              onChange={(e) =>
                setAnimalType(e.target.value)
              }
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            >

              <option value="">
                {t.selectAnimal}
              </option>

              <option value="cow">
                🐄 {t.cow}
              </option>

              <option value="buffalo">
                🐃 {t.buffalo}
              </option>

              <option value="goat">
                🐐 {t.goat}
              </option>

              <option value="sheep">
                🐑 {t.sheep}
              </option>

            </select>

          </div>

          {/* =========================
              ANIMAL AGE
          ========================= */}

          <div className="mb-6">

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t.animalAge}
            </label>

            <input
              type="number"
              min="0"
              value={animalAge}
              onChange={(e) =>
                setAnimalAge(e.target.value)
              }
              placeholder={t.agePlaceholder}
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

          </div>

          {/* =========================
              SYMPTOMS
          ========================= */}

          <div className="mb-6">

            <label className="block text-sm font-semibold text-gray-700 mb-3">
              {t.symptoms}
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

              {symptomCards.map((symptom) => {

                const selected =
                  symptoms.includes(
                    symptom.value
                  )

                return (
                  <button
                    key={symptom.value}
                    type="button"
                    onClick={() =>
                      toggleSymptom(
                        symptom.value
                      )
                    }
                    className={`text-left p-4 rounded-xl border-2 transition ${
                      selected
                        ? 'border-green-600 bg-green-50'
                        : 'border-gray-200 bg-white hover:border-green-400'
                    }`}
                  >

                    <div className="flex items-center gap-3">

                      <span className="text-2xl">
                        {symptom.icon}
                      </span>

                      <span className="font-medium text-gray-800">
                        {symptom.label}
                      </span>

                      <span className="ml-auto">
                        {selected ? '✓' : ''}
                      </span>

                    </div>

                  </button>
                )
              })}

            </div>

          </div>

          {/* =========================
              LOCATION
          ========================= */}

          <div className="mb-6">

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t.location}
            </label>

            <input
              type="text"
              value={location}
              onChange={(e) =>
                setLocation(e.target.value)
              }
              placeholder={
                t.locationPlaceholder
              }
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <button
              type="button"
              onClick={getMyLocation}
              className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 mt-3 font-medium"
            >
              {t.getLocation}
            </button>

            {locationStatus && (
              <p className="text-green-600 font-semibold text-sm mt-2">
                {locationStatus}
              </p>
            )}

          </div>

          {/* =========================
              VOICE
          ========================= */}

          <button
            type="button"
            onClick={handleVoiceInput}
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 mb-3 font-medium"
          >
            {t.speak}
          </button>

          {voiceText && (
            <div className="bg-gray-50 rounded-xl p-3 mb-4 text-gray-700">
              <span className="font-semibold">
                {t.youSaid}
              </span>{' '}
              {voiceText}
            </div>
          )}

          {/* =========================
              SUBMIT
          ========================= */}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-full text-white py-3 rounded-xl font-semibold transition ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {isSubmitting
              ? t.submitting
              : t.submit}
          </button>

          {/* =========================
              MESSAGE
          ========================= */}

          {message && (
            <div
              className={`mt-4 text-center font-semibold p-3 rounded-xl ${
                message.includes('offline') ||
                message.includes('ऑफलाइन') ||
                message.includes('ऑफलाइन')
                  ? 'bg-orange-50 text-orange-700'
                  : 'bg-green-50 text-green-700'
              }`}
            >
              {message}
            </div>
          )}

          {/* =========================
              RISK ASSESSMENT
          ========================= */}

          {risk && (
            <div
              className={`mt-6 rounded-2xl p-5 border-2 ${riskStyles.border} ${riskStyles.background}`}
            >

              {/* Heading */}
              <h2 className="text-xl font-bold text-gray-800">
                {t.riskAssessment}
              </h2>

              {/* Risk Level */}
              <p className="text-3xl font-bold mt-3">
                {getRiskTitle()}
              </p>

              {/* Risk Score */}
              {riskScore !== null && (
                <div className="mt-5">

                  <div className="flex justify-between text-sm font-semibold text-gray-700 mb-2">
                    <span>
                      {t.riskScore}
                    </span>

                    <span>
                      {riskScore}/100
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">

                    <div
                      className={`h-3 rounded-full transition-all duration-500 ${riskStyles.bar}`}
                      style={{
                        width: `${Math.min(
                          Math.max(riskScore, 0),
                          100
                        )}%`,
                      }}
                    ></div>

                  </div>

                </div>
              )}

              {/* Reasons */}
              {riskReasons.length > 0 && (
                <div className="mt-5">

                  <h3 className="font-bold text-gray-800 mb-3">
                    {t.whyRisk}
                  </h3>

                  <ul className="space-y-2">

                    {riskReasons.map(
                      (reason, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-gray-700"
                        >

                          <span className="text-green-600 font-bold">
                            ✓
                          </span>

                          <span>
                            {reason}
                          </span>

                        </li>
                      )
                    )}

                  </ul>

                </div>
              )}

              {/* Recommendation */}
              <div className="mt-5 pt-4 border-t border-gray-200">

                <h3 className="font-bold text-gray-800">
                  {t.recommendation}
                </h3>

                <p className="text-gray-700 mt-2">
                  {getRiskMessage()}
                </p>

              </div>

              {/* Disclaimer */}
              <p className="text-xs text-gray-500 mt-4 pt-3 border-t">
                {t.triageNote}
              </p>

            </div>
          )}

        </div>

      </div>

    </div>
  )
}

export default ReportAnimal