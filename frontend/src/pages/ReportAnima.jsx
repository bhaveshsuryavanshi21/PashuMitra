import { useEffect, useState } from 'react'

import API_BASE_URL from "../config";



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

    const response = await fetch(`${API_BASE_URL}/report`,

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



    if (remainingReports.length> 0) {

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
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-8">

        {/* Page header */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
              <span
                className={`h-2 w-2 rounded-full ${
                  isOnline ? 'bg-green-500' : 'bg-orange-500'
                }`}
              ></span>
              {isOnline ? t.online : t.offline}
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
              {t.title}
            </h1>

            <p className="mt-1 max-w-2xl text-sm text-slate-500 md:text-base">
              {t.description}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500 shadow-sm">
            <span className="font-semibold text-slate-700">
              PashuMitra
            </span>
            <span className="mx-2 text-slate-300">•</span>
            AI-assisted triage
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">

          {/* Main report form */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-100 px-5 py-5 md:px-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-green-600">
                    Report
                  </p>

                  <h2 className="mt-1 text-lg font-bold text-slate-900">
                    Animal health details
                  </h2>
                </div>

                <div className="hidden items-center gap-1 sm:flex">
                  <span className="h-1.5 w-8 rounded-full bg-green-600"></span>
                  <span className="h-1.5 w-8 rounded-full bg-slate-200"></span>
                  <span className="h-1.5 w-8 rounded-full bg-slate-200"></span>
                </div>
              </div>
            </div>

            <div className="space-y-7 p-5 md:p-7">

              {/* Animal type */}
              <section>
                <div className="mb-3">
                  <p className="text-sm font-semibold text-slate-900">
                    {t.animalType}
                  </p>
                  <p className="text-xs text-slate-500">
                    Select the animal you want to report.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    { value: 'cow', icon: '🐄', label: t.cow },
                    { value: 'buffalo', icon: '🐃', label: t.buffalo },
                    { value: 'goat', icon: '🐐', label: t.goat },
                    { value: 'sheep', icon: '🐑', label: t.sheep },
                  ].map((animal) => {
                    const selected = animalType === animal.value

                    return (
                      <button
                        key={animal.value}
                        type="button"
                        onClick={() => setAnimalType(animal.value)}
                        className={`rounded-xl border p-4 text-left transition ${
                          selected
                            ? 'border-green-600 bg-green-50 ring-1 ring-green-600'
                            : 'border-slate-200 bg-white hover:border-green-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className="text-2xl">
                          {animal.icon}
                        </div>

                        <div className="mt-2 text-sm font-semibold text-slate-800">
                          {animal.label}
                        </div>

                        {selected && (
                          <div className="mt-1 text-xs font-semibold text-green-700">
                            Selected ✓
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>
              </section>

              {/* Animal age */}
              <section>
                <label className="mb-2 block text-sm font-semibold text-slate-900">
                  {t.animalAge}
                </label>

                <input
                  type="number"
                  min="0"
                  value={animalAge}
                  onChange={(e) => setAnimalAge(e.target.value)}
                  placeholder={t.agePlaceholder}
                  className="w-full max-w-sm rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-50"
                />
              </section>

              {/* Symptoms */}
              <section>
                <div className="mb-3">
                  <p className="text-sm font-semibold text-slate-900">
                    {t.symptoms}
                  </p>

                  <p className="text-xs text-slate-500">
                    Select all symptoms you have observed.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {symptomCards.map((symptom) => {
                    const selected = symptoms.includes(symptom.value)

                    return (
                      <button
                        key={symptom.value}
                        type="button"
                        onClick={() => toggleSymptom(symptom.value)}
                        className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${
                          selected
                            ? 'border-green-600 bg-green-50'
                            : 'border-slate-200 bg-white hover:border-green-300 hover:bg-slate-50'
                        }`}
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xl">
                          {symptom.icon}
                        </span>

                        <span className="flex-1 text-sm font-medium text-slate-800">
                          {symptom.label}
                        </span>

                        <span
                          className={`flex h-5 w-5 items-center justify-center rounded-full border text-xs ${
                            selected
                              ? 'border-green-600 bg-green-600 text-white'
                              : 'border-slate-300 text-transparent'
                          }`}
                        >
                          ✓
                        </span>
                      </button>
                    )
                  })}
                </div>
              </section>

              {/* Location */}
              <section>
                <div className="mb-3">
                  <p className="text-sm font-semibold text-slate-900">
                    {t.location}
                  </p>

                  <p className="text-xs text-slate-500">
                    Enter a village/location or capture your current GPS position.
                  </p>
                </div>

                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder={t.locationPlaceholder}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-50"
                />

                <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button
                    type="button"
                    onClick={getMyLocation}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-green-300 hover:bg-green-50"
                  >
                    {t.getLocation}
                  </button>

                  {locationStatus && (
                    <span className="text-sm font-semibold text-green-600">
                      {locationStatus}
                    </span>
                  )}
                </div>
              </section>

              {/* Voice input */}
              <section className="rounded-2xl border border-green-100 bg-green-50/60 p-4 md:p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      Voice input
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Describe the animal issue using your voice.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleVoiceInput}
                    className="rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700"
                  >
                    {t.speak}
                  </button>
                </div>

                {voiceText && (
                  <div className="mt-4 rounded-xl border border-green-100 bg-white p-3 text-sm text-slate-700">
                    <span className="font-semibold text-slate-900">
                      {t.youSaid}
                    </span>{' '}
                    {voiceText}
                  </div>
                )}
              </section>

              {/* Submit */}
              <section className="border-t border-slate-100 pt-6">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`w-full rounded-xl px-5 py-3.5 text-sm font-bold text-white shadow-sm transition ${
                    isSubmitting
                      ? 'cursor-not-allowed bg-slate-400'
                      : 'bg-slate-900 hover:bg-slate-800'
                  }`}
                >
                  {isSubmitting ? t.submitting : t.submit}
                </button>

                {message && (
                  <div
                    className={`mt-3 rounded-xl px-4 py-3 text-center text-sm font-semibold ${
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
              </section>
            </div>
          </div>

          {/* Right side information */}
          <aside className="space-y-4">

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-green-600">
                PashuMitra
              </p>

              <h3 className="mt-2 text-lg font-bold text-slate-900">
                Quick health triage
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Submit the observed symptoms and available location details.
                The system will return an AI-assisted priority assessment for
                veterinary review.
              </p>

              <div className="mt-5 space-y-3">
                {[
                  ['01', 'Animal details'],
                  ['02', 'Observed symptoms'],
                  ['03', 'Location & voice'],
                  ['04', 'Risk assessment'],
                ].map(([number, label]) => (
                  <div key={number} className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-50 text-xs font-bold text-green-700">
                      {number}
                    </span>

                    <span className="text-sm font-medium text-slate-700">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Risk assessment */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900">
                  {t.riskAssessment}
                </h3>

                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500">
                  AI-assisted
                </span>
              </div>

              {!risk ? (
                <div className="mt-5 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-500">
                  Your risk assessment will appear here after the report is submitted.
                </div>
              ) : (
                <div
                  className={`mt-5 rounded-xl border p-4 ${riskStyles.border} ${riskStyles.background}`}
                >
                  <p className="text-2xl font-bold text-slate-900">
                    {getRiskTitle()}
                  </p>

                  {riskScore !== null && (
                    <div className="mt-5">
                      <div className="mb-2 flex justify-between text-xs font-semibold text-slate-600">
                        <span>{t.riskScore}</span>
                        <span>{riskScore}/100</span>
                      </div>

                      <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${riskStyles.bar}`}
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

                  {riskReasons.length > 0 && (
                    <div className="mt-5">
                      <h4 className="text-sm font-bold text-slate-900">
                        {t.whyRisk}
                      </h4>

                      <ul className="mt-3 space-y-2">
                        {riskReasons.map((reason, index) => (
                          <li
                            key={index}
                            className="flex gap-2 text-sm text-slate-600"
                          >
                            <span className="font-bold text-green-600">
                              ✓
                            </span>

                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="mt-5 border-t border-slate-200 pt-4">
                    <h4 className="text-sm font-bold text-slate-900">
                      {t.recommendation}
                    </h4>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {getRiskMessage()}
                    </p>
                  </div>

                  <p className="mt-4 border-t border-slate-200 pt-3 text-xs leading-5 text-slate-400">
                    {t.triageNote}
                  </p>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  )

}

export default ReportAnimal
