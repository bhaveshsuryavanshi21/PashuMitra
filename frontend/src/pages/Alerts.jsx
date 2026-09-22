import { useEffect, useRef, useState } from 'react'
import API_BASE_URL from "../config";

function Alerts({ language }) {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)

  const previousHighRiskIds = useRef([])

  const translations = {
    en: {
      title: 'Disease Alert Center',
      description:
        'Monitor high-risk livestock cases, outbreak signals, and preventive actions.',
      live: 'LIVE MONITORING',
      systemActive: 'System Active',
      highRiskCases: 'High Risk Cases',
      hotspotAlerts: 'Hotspot Alerts',
      pendingCases: 'Pending Cases',
      totalCases: 'Total Cases',

      emergencyQueue: 'Emergency Response Queue',
      emergencyDescription:
        'High-risk cases requiring veterinary attention.',
      highPriority: 'High Priority Case',
      highRisk: 'HIGH RISK',
      reportedFrom: 'Reported from',
      symptoms: 'Symptoms',
      assignedVet: 'Assigned Veterinarian',
      caseStatus: 'Case Status',
      caseId: 'Case',
      veterinaryRequired: 'Veterinary attention is recommended for this case.',
      locationUnavailable: 'Location not available',
      notAssigned: 'Not Assigned',

      gpsLocation: 'GPS Location',
      viewLocation: 'View on Map',

      hotspotSection: 'Outbreak Surveillance',
      hotspotDescription:
        'Areas where multiple livestock health reports have been detected.',
      hotspot: 'Possible Outbreak Hotspot',
      area: 'Area',
      reportsInArea: 'reports detected',
      latitude: 'Latitude',
      longitude: 'Longitude',
      surveillance: 'Veterinary surveillance recommended.',
      noHotspots: 'No hotspot alerts detected.',

      advisory: 'Preventive Health Advisory',
      advisoryText:
        'Monitor animals for symptoms, maintain vaccination records, and contact a veterinarian if an animal’s condition worsens.',

      loading: 'Loading alert center...',
      noHighRisk: 'No high-risk cases detected.',
      monitoringText:
        'The system automatically checks for new high-risk reports.',
      lastUpdated: 'Monitoring active',

      pending: 'Pending',
      inReview: 'In Review',
      resolved: 'Resolved',

      notificationTitle: 'High Risk Animal Report',
      notificationBody:
        'Veterinary attention is recommended for this case.',
    },

    hi: {
      title: 'रोग अलर्ट केंद्र',
      description:
        'उच्च जोखिम वाले पशु मामलों, प्रकोप संकेतों और बचाव संबंधी कार्यों की निगरानी करें।',
      live: 'लाइव निगरानी',
      systemActive: 'सिस्टम सक्रिय',
      highRiskCases: 'उच्च जोखिम मामले',
      hotspotAlerts: 'हॉटस्पॉट अलर्ट',
      pendingCases: 'लंबित मामले',
      totalCases: 'कुल मामले',

      emergencyQueue: 'आपातकालीन प्रतिक्रिया सूची',
      emergencyDescription:
        'पशु चिकित्सा सहायता की आवश्यकता वाले उच्च जोखिम वाले मामले।',
      highPriority: 'उच्च प्राथमिकता वाला मामला',
      highRisk: 'उच्च जोखिम',
      reportedFrom: 'रिपोर्ट स्थान',
      symptoms: 'लक्षण',
      assignedVet: 'नियुक्त पशु चिकित्सक',
      caseStatus: 'मामले की स्थिति',
      caseId: 'मामला',
      veterinaryRequired:
        'इस मामले के लिए पशु चिकित्सा सहायता की सलाह दी जाती है।',
      locationUnavailable: 'स्थान उपलब्ध नहीं',
      notAssigned: 'नियुक्त नहीं',

      gpsLocation: 'जीपीएस स्थान',
      viewLocation: 'मानचित्र पर देखें',

      hotspotSection: 'रोग प्रकोप निगरानी',
      hotspotDescription:
        'वे क्षेत्र जहां कई पशु स्वास्थ्य रिपोर्ट पाई गई हैं।',
      hotspot: 'संभावित रोग प्रकोप क्षेत्र',
      area: 'क्षेत्र',
      reportsInArea: 'रिपोर्ट मिलीं',
      latitude: 'अक्षांश',
      longitude: 'देशांतर',
      surveillance: 'पशु चिकित्सा निगरानी की सलाह दी जाती है।',
      noHotspots: 'कोई हॉटस्पॉट अलर्ट नहीं मिला।',

      advisory: 'बचाव संबंधी स्वास्थ्य सलाह',
      advisoryText:
        'पशुओं में लक्षणों पर नजर रखें, टीकाकरण रिकॉर्ड बनाए रखें और स्थिति बिगड़ने पर पशु चिकित्सक से संपर्क करें।',

      loading: 'अलर्ट केंद्र लोड हो रहा है...',
      noHighRisk: 'कोई उच्च जोखिम वाला मामला नहीं मिला।',
      monitoringText:
        'सिस्टम नए उच्च जोखिम वाले मामलों की स्वचालित जांच करता है।',
      lastUpdated: 'निगरानी सक्रिय',

      pending: 'लंबित',
      inReview: 'समीक्षा में',
      resolved: 'समाधान हुआ',

      notificationTitle: 'उच्च जोखिम वाली पशु रिपोर्ट',
      notificationBody:
        'इस मामले के लिए पशु चिकित्सा सहायता की सलाह दी जाती है।',
    },

    mr: {
      title: 'रोग अलर्ट केंद्र',
      description:
        'जास्त जोखमीची पशुधन प्रकरणे, रोग उद्रेक संकेत आणि प्रतिबंधात्मक उपायांवर लक्ष ठेवा.',
      live: 'लाइव्ह निरीक्षण',
      systemActive: 'सिस्टम सक्रिय',
      highRiskCases: 'जास्त जोखीम प्रकरणे',
      hotspotAlerts: 'हॉटस्पॉट अलर्ट',
      pendingCases: 'प्रलंबित प्रकरणे',
      totalCases: 'एकूण प्रकरणे',

      emergencyQueue: 'आपत्कालीन प्रतिसाद यादी',
      emergencyDescription:
        'पशुवैद्यकीय मदतीची आवश्यकता असलेली जास्त जोखमीची प्रकरणे.',
      highPriority: 'जास्त प्राधान्याचे प्रकरण',
      highRisk: 'जास्त जोखीम',
      reportedFrom: 'अहवालाचे ठिकाण',
      symptoms: 'लक्षणे',
      assignedVet: 'नियुक्त पशुवैद्यक',
      caseStatus: 'प्रकरणाची स्थिती',
      caseId: 'प्रकरण',
      veterinaryRequired:
        'या प्रकरणासाठी पशुवैद्यकीय मदतीची शिफारस केली जाते.',
      locationUnavailable: 'ठिकाण उपलब्ध नाही',
      notAssigned: 'नियुक्त केलेले नाही',

      gpsLocation: 'जीपीएस स्थान',
      viewLocation: 'नकाशावर पहा',

      hotspotSection: 'रोग उद्रेक निरीक्षण',
      hotspotDescription:
        'ज्या भागात अनेक पशुधन आरोग्य अहवाल आढळले आहेत.',
      hotspot: 'संभाव्य रोग उद्रेक क्षेत्र',
      area: 'क्षेत्र',
      reportsInArea: 'अहवाल आढळले',
      latitude: 'अक्षांश',
      longitude: 'रेखांश',
      surveillance: 'पशुवैद्यकीय निरीक्षणाची शिफारस केली जाते.',
      noHotspots: 'कोणतेही हॉटस्पॉट अलर्ट आढळले नाहीत.',

      advisory: 'प्रतिबंधात्मक आरोग्य सूचना',
      advisoryText:
        'प्राण्यांमधील लक्षणांवर लक्ष ठेवा, लसीकरणाची नोंद ठेवा आणि स्थिती बिघडल्यास पशुवैद्यकाशी संपर्क साधा.',

      loading: 'अलर्ट केंद्र लोड होत आहे...',
      noHighRisk: 'जास्त जोखमीचे कोणतेही प्रकरण आढळले नाही.',
      monitoringText:
        'सिस्टम नवीन जास्त जोखमीच्या अहवालांची स्वयंचलित तपासणी करते.',
      lastUpdated: 'निरीक्षण सक्रिय',

      pending: 'प्रलंबित',
      inReview: 'पुनरावलोकनात',
      resolved: 'निराकरण झाले',

      notificationTitle: 'जास्त जोखमीचा पशु अहवाल',
      notificationBody:
        'या प्रकरणासाठी पशुवैद्यकीय मदतीची शिफारस केली जाते.',
    },
  }

  const t = translations[language] || translations.en

  // ==========================================
  // FETCH REPORTS + NOTIFICATIONS
  // ==========================================

  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission()
    }

    const fetchReports = () => {
      fetch(`${API_BASE_URL}/reports`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch reports')
          }

          return response.json()
        })
        .then((data) => {
          const highRiskReports = data.filter(
            (report) => report.priority === 'High'
          )

          const currentHighRiskIds = highRiskReports.map(
            (report) => report.id
          )

          const newHighRiskReports = highRiskReports.filter(
            (report) =>
              !previousHighRiskIds.current.includes(report.id)
          )

          if (
            'Notification' in window &&
            Notification.permission === 'granted' &&
            previousHighRiskIds.current.length > 0
          ) {
            newHighRiskReports.forEach((report) => {
              new Notification(t.notificationTitle, {
                body: `${report.animal_type} - ${t.notificationBody}`,
              })
            })
          }

          previousHighRiskIds.current = currentHighRiskIds

          setReports(data)
          setLoading(false)
        })
        .catch((error) => {
          console.error('Failed to fetch reports:', error)
          setLoading(false)
        })
    }

    fetchReports()

    // Check every 10 seconds
    const interval = setInterval(fetchReports, 10000)

    return () => clearInterval(interval)
  }, [language])

  // ==========================================
  // COUNTS
  // ==========================================

  const highRiskReports = reports.filter(
    (report) => report.priority === 'High'
  )

  const pendingReports = reports.filter(
    (report) => report.status === 'Pending'
  )

  // ==========================================
  // HOTSPOT DETECTION
  // ==========================================

  const hotspots = {}

  reports.forEach((report) => {
    if (
      report.latitude == null ||
      report.longitude == null
    ) {
      return
    }

    const lat = Number(report.latitude).toFixed(2)
    const lng = Number(report.longitude).toFixed(2)

    const key = `${lat},${lng}`

    if (!hotspots[key]) {
      hotspots[key] = {
        latitude: Number(lat),
        longitude: Number(lng),
        count: 0,
      }
    }

    hotspots[key].count++
  })

  const hotspotAreas = Object.values(hotspots).filter(
    (area) => area.count >= 3
  )

  // ==========================================
  // STATUS
  // ==========================================

  const getStatusLabel = (status) => {
    if (status === 'Pending') return t.pending
    if (status === 'In Review') return t.inReview
    if (status === 'Resolved') return t.resolved

    return status || t.pending
  }

  const getStatusStyle = (status) => {
    if (status === 'Resolved') {
      return 'bg-green-100 text-green-700 border-green-200'
    }

    if (status === 'In Review') {
      return 'bg-blue-100 text-blue-700 border-blue-200'
    }

    return 'bg-yellow-100 text-yellow-700 border-yellow-200'
  }

  // ==========================================
  // SYMPTOMS
  // ==========================================

  const getSymptomName = (symptom) => {
    const value = symptom.trim().toLowerCase()

    if (value === 'fever') {
      if (language === 'hi') return '🌡️ बुखार'
      if (language === 'mr') return '🌡️ ताप'
      return '🌡️ Fever'
    }

    if (value === 'salivation') {
      if (language === 'hi') return '💧 अधिक लार'
      if (language === 'mr') return '💧 जास्त लाळ'
      return '💧 Excessive Salivation'
    }

    if (value === 'difficulty_walking') {
      if (language === 'hi') return '🚶 चलने में कठिनाई'
      if (language === 'mr') return '🚶 चालण्यास त्रास'
      return '🚶 Difficulty Walking'
    }

    if (value === 'coughing') {
      if (language === 'hi') return '🫁 खांसी'
      if (language === 'mr') return '🫁 खोकला'
      return '🫁 Coughing'
    }

    return symptom
  }

  // ==========================================
  // ANIMAL ICON
  // ==========================================

  const getAnimalIcon = (animal) => {
    const value = animal?.toLowerCase()

    if (value === 'sheep') return '🐑'
    if (value === 'goat') return '🐐'
    if (value === 'buffalo') return '🐃'

    return '🐄'
  }

  // ==========================================
  // OPEN MAP
  // ==========================================

  const openLocation = (latitude, longitude) => {
    if (
      latitude == null ||
      longitude == null
    ) {
      return
    }

    window.open(
      `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=15/${latitude}/${longitude}`,
      '_blank'
    )
  }

  // ==========================================
  // DATE
  // ==========================================

  const formatDate = (dateValue) => {
    if (!dateValue) return ''

    const date = new Date(dateValue)

    if (Number.isNaN(date.getTime())) {
      return ''
    }

    const locale =
      language === 'hi'
        ? 'hi-IN'
        : language === 'mr'
        ? 'mr-IN'
        : 'en-IN'

    return date.toLocaleString(locale, {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="min-h-screen bg-slate-50">

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">

        {/* =====================================
            ALERT CENTER HEADER
        ===================================== */}

        <div className="bg-slate-900 rounded-3xl p-6 md:p-8 text-white mb-8 shadow-xl">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

            <div className="flex items-start gap-4">

              <div className="w-14 h-14 rounded-2xl bg-red-500/20 border border-red-400/30 flex items-center justify-center text-3xl">
                🚨
              </div>

              <div>
                <div className="flex items-center gap-3 flex-wrap">

                  <h1 className="text-3xl md:text-4xl font-bold">
                    {t.title}
                  </h1>

                  <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {t.highRiskCases}
                  </span>

                </div>

                <p className="text-slate-300 mt-2 max-w-2xl">
                  {t.description}
                </p>
              </div>

            </div>

            {/* LIVE STATUS */}

            <div className="flex items-center gap-3 bg-slate-800 border border-slate-700 rounded-2xl px-5 py-3">

              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>

                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>

              <div>
                <p className="text-sm font-bold text-green-400">
                  {t.live}
                </p>

                <p className="text-xs text-slate-400">
                  {t.lastUpdated}
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* =====================================
            OVERVIEW STRIP
        ===================================== */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">

          {/* HIGH RISK */}

          <div className="bg-white border-l-4 border-red-500 rounded-2xl shadow-sm p-5">

            <p className="text-sm text-slate-500 font-medium">
              {t.highRiskCases}
            </p>

            <div className="flex items-end justify-between mt-2">

              <p className="text-4xl font-bold text-red-600">
                {highRiskReports.length}
              </p>

              <span className="text-2xl">
                🚨
              </span>

            </div>

          </div>

          {/* HOTSPOTS */}

          <div className="bg-white border-l-4 border-orange-500 rounded-2xl shadow-sm p-5">

            <p className="text-sm text-slate-500 font-medium">
              {t.hotspotAlerts}
            </p>

            <div className="flex items-end justify-between mt-2">

              <p className="text-4xl font-bold text-orange-500">
                {hotspotAreas.length}
              </p>

              <span className="text-2xl">
                📍
              </span>

            </div>

          </div>

          {/* PENDING */}

          <div className="bg-white border-l-4 border-yellow-500 rounded-2xl shadow-sm p-5">

            <p className="text-sm text-slate-500 font-medium">
              {t.pendingCases}
            </p>

            <div className="flex items-end justify-between mt-2">

              <p className="text-4xl font-bold text-yellow-600">
                {pendingReports.length}
              </p>

              <span className="text-2xl">
                ⏳
              </span>

            </div>

          </div>

          {/* TOTAL */}

          <div className="bg-white border-l-4 border-slate-500 rounded-2xl shadow-sm p-5">

            <p className="text-sm text-slate-500 font-medium">
              {t.totalCases}
            </p>

            <div className="flex items-end justify-between mt-2">

              <p className="text-4xl font-bold text-slate-800">
                {reports.length}
              </p>

              <span className="text-2xl">
                📋
              </span>

            </div>

          </div>

        </div>

        {/* =====================================
            EMERGENCY RESPONSE QUEUE
        ===================================== */}

        <section className="mb-12">

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-5">

            <div>

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                  🚨
                </div>

                <h2 className="text-2xl font-bold text-slate-800">
                  {t.emergencyQueue}
                </h2>

              </div>

              <p className="text-slate-500 mt-2 ml-13">
                {t.emergencyDescription}
              </p>

            </div>

            <div className="bg-red-50 text-red-700 border border-red-200 px-4 py-2 rounded-xl text-sm font-bold w-fit">
              {highRiskReports.length} {t.highRiskCases}
            </div>

          </div>

          {loading ? (

            <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center shadow-sm">

              <div className="text-4xl mb-3">
                🚨
              </div>

              <p className="text-slate-500">
                {t.loading}
              </p>

            </div>

          ) : highRiskReports.length === 0 ? (

            <div className="bg-green-50 border border-green-200 rounded-3xl p-10 text-center">

              <div className="text-5xl mb-3">
                ✅
              </div>

              <p className="text-green-700 font-bold text-lg">
                {t.noHighRisk}
              </p>

            </div>

          ) : (

            <div className="space-y-6">

              {highRiskReports.map((report) => {

                const symptoms = report.symptoms
                  ? report.symptoms
                      .split(',')
                      .filter(
                        (item) => item.trim() !== ''
                      )
                  : []

                const caseNumber = String(
                  report.id
                ).padStart(4, '0')

                return (

                  <div
                    key={report.id}
                    className="bg-white rounded-3xl border border-red-200 shadow-lg overflow-hidden"
                  >

                    {/* ALERT TOP BAR */}

                    <div className="bg-red-600 text-white px-5 md:px-7 py-4">

                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

                        <div className="flex items-center gap-3">

                          <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center text-xl">
                            🚨
                          </div>

                          <div>

                            <p className="font-bold">
                              {t.highPriority}
                            </p>

                            <p className="text-red-100 text-xs">
                              {t.caseId} #PM-
                              {caseNumber}
                            </p>

                          </div>

                        </div>

                        <span className="bg-white text-red-600 px-4 py-1.5 rounded-full text-xs font-extrabold">
                          {t.highRisk}
                        </span>

                      </div>

                    </div>

                    {/* MAIN CONTENT */}

                    <div className="p-5 md:p-7">

                      {/* ANIMAL */}

                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-7">

                        <div className="flex items-center gap-4">

                          <div className="w-16 h-16 rounded-2xl bg-green-50 border border-green-100 flex items-center justify-center text-4xl">
                            {getAnimalIcon(
                              report.animal_type
                            )}
                          </div>

                          <div>

                            <h3 className="text-2xl font-bold text-slate-800 capitalize">
                              {report.animal_type}
                            </h3>

                            <p className="text-slate-500">
                              {t.reportedFrom}:{' '}
                              {report.location ||
                                t.locationUnavailable}
                            </p>

                            {report.created_at && (
                              <p className="text-xs text-slate-400 mt-1">
                                {formatDate(
                                  report.created_at
                                )}
                              </p>
                            )}

                          </div>

                        </div>

                        {/* STATUS */}

                        <span
                          className={`px-4 py-2 rounded-xl border text-sm font-bold w-fit ${getStatusStyle(
                            report.status
                          )}`}
                        >
                          {getStatusLabel(
                            report.status
                          )}
                        </span>

                      </div>

                      {/* SYMPTOMS */}

                      <div className="mb-6">

                        <p className="text-sm font-bold text-slate-500 mb-3">
                          🩺 {t.symptoms}
                        </p>

                        <div className="flex flex-wrap gap-2">

                          {symptoms.length > 0 ? (

                            symptoms.map((symptom) => (

                              <span
                                key={symptom}
                                className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-sm text-slate-700 font-medium"
                              >
                                {getSymptomName(
                                  symptom
                                )}
                              </span>

                            ))

                          ) : (

                            <span className="text-sm text-slate-400">
                              {t.locationUnavailable}
                            </span>

                          )}

                        </div>

                      </div>

                      {/* CASE INFORMATION */}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">

                          <p className="text-xs text-slate-500 mb-1">
                            👨‍⚕️ {t.assignedVet}
                          </p>

                          <p className="font-bold text-slate-800">
                            {report.assigned_vet ||
                              t.notAssigned}
                          </p>

                        </div>

                        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">

                          <p className="text-xs text-slate-500 mb-1">
                            📋 {t.caseStatus}
                          </p>

                          <p className="font-bold text-slate-800">
                            {getStatusLabel(
                              report.status
                            )}
                          </p>

                        </div>

                      </div>

                      {/* GPS */}

                      {report.latitude != null &&
                        report.longitude != null && (

                          <div className="mt-4 bg-blue-50 border border-blue-100 rounded-2xl p-4">

                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                              <div>

                                <p className="text-xs font-bold text-blue-600">
                                  📍 {t.gpsLocation}
                                </p>

                                <p className="text-sm text-slate-700 mt-1">
                                  {report.latitude},{' '}
                                  {report.longitude}
                                </p>

                              </div>

                              <button
                                type="button"
                                onClick={() =>
                                  openLocation(
                                    report.latitude,
                                    report.longitude
                                  )
                                }
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition"
                              >
                                🗺️ {t.viewLocation}
                              </button>

                            </div>

                          </div>

                        )}

                    </div>

                    {/* WARNING FOOTER */}

                    <div className="bg-red-50 border-t border-red-100 px-5 md:px-7 py-4">

                      <div className="flex items-center gap-3">

                        <span className="text-xl">
                          ⚠️
                        </span>

                        <p className="text-red-700 font-bold text-sm">
                          {t.veterinaryRequired}
                        </p>

                      </div>

                    </div>

                  </div>

                )
              })}

            </div>

          )}

        </section>

        {/* =====================================
            OUTBREAK SURVEILLANCE
        ===================================== */}

        <section className="mb-12">

          <div className="flex items-center gap-3 mb-2">

            <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
              📍
            </div>

            <h2 className="text-2xl font-bold text-slate-800">
              {t.hotspotSection}
            </h2>

          </div>

          <p className="text-slate-500 mb-5 ml-13">
            {t.hotspotDescription}
          </p>

          {hotspotAreas.length === 0 ? (

            <div className="bg-green-50 border border-green-200 rounded-3xl p-8 text-center">

              <div className="text-4xl mb-2">
                ✅
              </div>

              <p className="text-green-700 font-semibold">
                {t.noHotspots}
              </p>

            </div>

          ) : (

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

              {hotspotAreas.map((area, index) => (

                <div
                  key={index}
                  className="bg-white rounded-3xl border border-orange-200 shadow-md overflow-hidden"
                >

                  <div className="bg-orange-50 border-b border-orange-100 px-5 py-4">

                    <div className="flex items-center justify-between gap-3">

                      <div className="flex items-center gap-3">

                        <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center text-xl">
                          ⚠️
                        </div>

                        <div>

                          <h3 className="font-bold text-orange-700">
                            {t.hotspot}
                          </h3>

                          <p className="text-xs text-orange-500 mt-1">
                            {t.area} #{index + 1}
                          </p>

                        </div>

                      </div>

                      <span className="bg-orange-600 text-white px-3 py-1.5 rounded-full text-xs font-bold">
                        {area.count} {t.reportsInArea}
                      </span>

                    </div>

                  </div>

                  <div className="p-5">

                    <div className="grid grid-cols-2 gap-4">

                      <div className="bg-slate-50 rounded-2xl p-4">

                        <p className="text-xs text-slate-500">
                          {t.latitude}
                        </p>

                        <p className="font-bold text-slate-700 mt-1">
                          {area.latitude}
                        </p>

                      </div>

                      <div className="bg-slate-50 rounded-2xl p-4">

                        <p className="text-xs text-slate-500">
                          {t.longitude}
                        </p>

                        <p className="font-bold text-slate-700 mt-1">
                          {area.longitude}
                        </p>

                      </div>

                    </div>

                    <div className="mt-4 bg-red-50 border border-red-100 rounded-2xl p-4">

                      <p className="text-red-700 text-sm font-bold">
                        🚨 {t.surveillance}
                      </p>

                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        openLocation(
                          area.latitude,
                          area.longitude
                        )
                      }
                      className="w-full mt-4 bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl font-bold transition"
                    >
                      🗺️ {t.viewLocation}
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

        {/* =====================================
            PREVENTIVE ADVISORY
        ===================================== */}

        <section className="bg-white rounded-3xl border border-blue-200 shadow-md overflow-hidden">

          <div className="bg-blue-600 text-white px-5 md:px-7 py-5">

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center text-xl">
                🛡️
              </div>

              <div>

                <h2 className="text-lg font-bold">
                  {t.advisory}
                </h2>

                <p className="text-blue-100 text-xs mt-1">
                  {t.systemActive}
                </p>

              </div>

            </div>

          </div>

          <div className="p-5 md:p-7">

            <div className="flex items-start gap-4">

              <div className="text-2xl">
                ℹ️
              </div>

              <p className="text-slate-600 leading-relaxed">
                {t.advisoryText}
              </p>

            </div>

          </div>

        </section>

      </div>

    </div>
  )
}

export default Alerts