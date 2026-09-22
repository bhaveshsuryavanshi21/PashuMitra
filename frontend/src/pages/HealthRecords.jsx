import { useEffect, useState } from 'react'

function HealthRecords({ language }) {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)

  const translations = {
    en: {
      title: 'Health & Vaccination Records',
      description:
        'Track animal health, vaccination, treatment, and veterinary care.',

      totalRecords: 'Total Records',
      vaccinated: 'Vaccinated',
      pending: 'Pending',

      record: 'Health Record',
      caseId: 'Case',
      reported: 'Reported',

      animal: 'Animal',
      age: 'Age',
      years: 'years',
      symptoms: 'Symptoms',
      location: 'Location',
      gps: 'GPS Location',

      caseStatus: 'Case Status',
      priority: 'Risk Level',
      vaccination: 'Vaccination',
      treatment: 'Treatment History',
      veterinarian: 'Veterinarian',

      notAvailable: 'Not Available',
      notAssigned: 'Not Assigned',
      noTreatment: 'No treatment recorded',

      vaccinatedStatus: 'Vaccinated',
      notVaccinated: 'Not Vaccinated',
      pendingStatus: 'Pending',

      low: 'LOW RISK',
      medium: 'MEDIUM RISK',
      high: 'HIGH RISK',

      fever: 'Fever',
      salivation: 'Excessive Salivation',
      difficultyWalking: 'Difficulty Walking',
      coughing: 'Coughing',

      cow: 'Cow',
      buffalo: 'Buffalo',
      goat: 'Goat',
      sheep: 'Sheep',

      locationCaptured: 'GPS location captured',
      viewMap: 'View on Map',

      noRecords: 'No health records found.',
      loading: 'Loading health records...',
    },

    hi: {
      title: 'स्वास्थ्य और टीकाकरण रिकॉर्ड',
      description:
        'पशुओं के स्वास्थ्य, टीकाकरण, उपचार और पशु चिकित्सा देखभाल को ट्रैक करें।',

      totalRecords: 'कुल रिकॉर्ड',
      vaccinated: 'टीकाकरण हुआ',
      pending: 'लंबित',

      record: 'स्वास्थ्य रिकॉर्ड',
      caseId: 'मामला',
      reported: 'रिपोर्ट',

      animal: 'पशु',
      age: 'उम्र',
      years: 'वर्ष',
      symptoms: 'लक्षण',
      location: 'स्थान',
      gps: 'जीपीएस स्थान',

      caseStatus: 'मामले की स्थिति',
      priority: 'जोखिम स्तर',
      vaccination: 'टीकाकरण',
      treatment: 'उपचार का इतिहास',
      veterinarian: 'पशु चिकित्सक',

      notAvailable: 'उपलब्ध नहीं',
      notAssigned: 'नियुक्त नहीं',
      noTreatment: 'कोई उपचार दर्ज नहीं है',

      vaccinatedStatus: 'टीका लगाया गया',
      notVaccinated: 'टीका नहीं लगाया गया',
      pendingStatus: 'लंबित',

      low: 'कम जोखिम',
      medium: 'मध्यम जोखिम',
      high: 'उच्च जोखिम',

      fever: 'बुखार',
      salivation: 'अधिक लार आना',
      difficultyWalking: 'चलने में कठिनाई',
      coughing: 'खांसी',

      cow: 'गाय',
      buffalo: 'भैंस',
      goat: 'बकरी',
      sheep: 'भेड़',

      locationCaptured: 'जीपीएस स्थान प्राप्त हो गया',
      viewMap: 'मानचित्र पर देखें',

      noRecords: 'कोई स्वास्थ्य रिकॉर्ड नहीं मिला।',
      loading: 'स्वास्थ्य रिकॉर्ड लोड हो रहे हैं...',
    },

    mr: {
      title: 'आरोग्य आणि लसीकरण नोंदी',
      description:
        'प्राण्यांचे आरोग्य, लसीकरण, उपचार आणि पशुवैद्यकीय काळजीचा मागोवा घ्या.',

      totalRecords: 'एकूण नोंदी',
      vaccinated: 'लसीकरण झाले',
      pending: 'प्रलंबित',

      record: 'आरोग्य नोंद',
      caseId: 'प्रकरण',
      reported: 'अहवाल',

      animal: 'प्राणी',
      age: 'वय',
      years: 'वर्षे',
      symptoms: 'लक्षणे',
      location: 'ठिकाण',
      gps: 'जीपीएस ठिकाण',

      caseStatus: 'प्रकरणाची स्थिती',
      priority: 'जोखीम पातळी',
      vaccination: 'लसीकरण',
      treatment: 'उपचाराची नोंद',
      veterinarian: 'पशुवैद्यक',

      notAvailable: 'उपलब्ध नाही',
      notAssigned: 'नियुक्त केलेले नाही',
      noTreatment: 'उपचाराची नोंद नाही',

      vaccinatedStatus: 'लसीकरण झाले',
      notVaccinated: 'लसीकरण झाले नाही',
      pendingStatus: 'प्रलंबित',

      low: 'कमी जोखीम',
      medium: 'मध्यम जोखीम',
      high: 'जास्त जोखीम',

      fever: 'ताप',
      salivation: 'जास्त लाळ येणे',
      difficultyWalking: 'चालण्यास त्रास',
      coughing: 'खोकला',

      cow: 'गाय',
      buffalo: 'म्हैस',
      goat: 'शेळी',
      sheep: 'मेंढी',

      locationCaptured: 'जीपीएस ठिकाण मिळाले',
      viewMap: 'नकाशावर पहा',

      noRecords: 'आरोग्याच्या नोंदी आढळल्या नाहीत.',
      loading: 'आरोग्याच्या नोंदी लोड होत आहेत...',
    },
  }

  const t = translations[language] || translations.en

  // ==========================================
  // FETCH RECORDS
  // ==========================================

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        setLoading(true)

        const response = await fetch(
          'http://127.0.0.1:8000/reports'
        )

        if (!response.ok) {
          throw new Error(
            'Failed to fetch health records'
          )
        }

        const data = await response.json()

        setReports(data)

        console.log(
          'Health records received:',
          data
        )
      } catch (error) {
        console.error(
          'Failed to fetch health records:',
          error
        )
      } finally {
        setLoading(false)
      }
    }

    fetchRecords()

    const interval = setInterval(
      fetchRecords,
      10000
    )

    return () => clearInterval(interval)
  }, [])

  // ==========================================
  // ANIMAL
  // ==========================================

  const getAnimalName = (animal) => {
    const value = animal?.toLowerCase()

    if (value === 'cow') return t.cow
    if (value === 'buffalo') return t.buffalo
    if (value === 'goat') return t.goat
    if (value === 'sheep') return t.sheep

    return animal || t.animal
  }

  const getAnimalIcon = (animal) => {
    const value = animal?.toLowerCase()

    if (value === 'cow') return '🐄'
    if (value === 'buffalo') return '🐃'
    if (value === 'goat') return '🐐'
    if (value === 'sheep') return '🐑'

    return '🐾'
  }

  // ==========================================
  // SYMPTOMS
  // ==========================================

  const getSymptoms = (symptoms) => {
    if (!symptoms) return []

    return symptoms
      .split(',')
      .map((symptom) => symptom.trim())
      .filter((symptom) => symptom !== '')
  }

  const getSymptomName = (symptom) => {
    const value = symptom
      .trim()
      .toLowerCase()

    if (value === 'fever') {
      return `🌡️ ${t.fever}`
    }

    if (value === 'salivation') {
      return `💧 ${t.salivation}`
    }

    if (value === 'difficulty_walking') {
      return `🚶 ${t.difficultyWalking}`
    }

    if (value === 'coughing') {
      return `🫁 ${t.coughing}`
    }

    return symptom
  }

  // ==========================================
  // RISK
  // ==========================================

  const getRiskLabel = (priority) => {
    if (priority === 'High') return t.high
    if (priority === 'Medium') return t.medium
    if (priority === 'Low') return t.low

    return t.notAvailable
  }

  const getRiskStyle = (priority) => {
    if (priority === 'High') {
      return {
        badge:
          'bg-red-50 text-red-700 border-red-300',
        border:
          'border-l-red-500',
        header:
          'bg-red-50 border-red-200',
        icon: '🚨',
      }
    }

    if (priority === 'Medium') {
      return {
        badge:
          'bg-orange-50 text-orange-700 border-orange-300',
        border:
          'border-l-orange-500',
        header:
          'bg-orange-50 border-orange-200',
        icon: '⚠️',
      }
    }

    return {
      badge:
        'bg-green-50 text-green-700 border-green-300',
      border:
        'border-l-green-500',
      header:
        'bg-green-50 border-green-200',
      icon: '🛡️',
    }
  }

  // ==========================================
  // STATUS
  // ==========================================

  const getStatusLabel = (status) => {
    if (status === 'Pending') {
      return t.pendingStatus
    }

    return status || t.notAvailable
  }

  const getStatusStyle = (status) => {
    if (status === 'Resolved') {
      return 'bg-green-50 text-green-700 border-green-300'
    }

    if (status === 'In Review') {
      return 'bg-blue-50 text-blue-700 border-blue-300'
    }

    return 'bg-yellow-50 text-yellow-700 border-yellow-300'
  }

  // ==========================================
  // DATE
  // ==========================================

  const formatDateTime = (dateValue) => {
    if (!dateValue) {
      return t.notAvailable
    }

    const date = new Date(dateValue)

    if (Number.isNaN(date.getTime())) {
      return dateValue
    }

    return date.toLocaleString(
      language === 'hi'
        ? 'hi-IN'
        : language === 'mr'
        ? 'mr-IN'
        : 'en-IN',
      {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }
    )
  }

  // ==========================================
  // MAP
  // ==========================================

  const openMap = (
    latitude,
    longitude
  ) => {
    if (
      latitude === null ||
      latitude === undefined ||
      longitude === null ||
      longitude === undefined
    ) {
      return
    }

    const mapUrl =
      `https://www.openstreetmap.org/?mlat=${latitude}` +
      `&mlon=${longitude}#map=15/${latitude}/${longitude}`

    window.open(mapUrl, '_blank')
  }

  // ==========================================
  // VACCINATION UPDATE
  // ==========================================

  const updateVaccination = (
    reportId,
    value
  ) => {
    fetch(
      `http://127.0.0.1:8000/report/${reportId}/vaccination`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vaccination_status: value,
        }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            'Failed to update vaccination'
          )
        }

        return response.json()
      })
      .then((data) => {
        console.log(data)

        setReports((currentReports) =>
          currentReports.map((item) =>
            item.id === reportId
              ? {
                  ...item,
                  vaccination_status:
                    value,
                }
              : item
          )
        )
      })
      .catch((error) => {
        console.error(
          'Failed to update vaccination:',
          error
        )
      })
  }

  // ==========================================
  // SUMMARY
  // ==========================================

  const totalRecords = reports.length

  const vaccinatedRecords =
    reports.filter(
      (report) =>
        report.vaccination_status ===
        'Vaccinated'
    ).length

  const pendingRecords =
    reports.filter(
      (report) =>
        report.status === 'Pending'
    ).length

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8">

      <div className="max-w-6xl mx-auto">

        {/* ==================================
            HEADER
        ================================== */}

        <div className="mb-8">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-xl bg-green-100 border-2 border-green-300 flex items-center justify-center text-2xl">
              🏥
            </div>

            <div>

              <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
                {t.title}
              </h1>

              <p className="text-slate-500 mt-1">
                {t.description}
              </p>

            </div>

          </div>

        </div>

        {/* ==================================
            SUMMARY CARDS
        ================================== */}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">

          {/* TOTAL */}

          <div className="bg-white rounded-2xl border-2 border-slate-300 shadow-sm p-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-semibold text-slate-500">
                  {t.totalRecords}
                </p>

                <p className="text-3xl font-bold text-slate-800 mt-2">
                  {totalRecords}
                </p>

              </div>

              <div className="w-12 h-12 rounded-xl bg-slate-100 border-2 border-slate-200 flex items-center justify-center text-2xl">
                📋
              </div>

            </div>

          </div>

          {/* VACCINATED */}

          <div className="bg-white rounded-2xl border-2 border-green-300 shadow-sm p-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-semibold text-slate-500">
                  {t.vaccinated}
                </p>

                <p className="text-3xl font-bold text-green-600 mt-2">
                  {vaccinatedRecords}
                </p>

              </div>

              <div className="w-12 h-12 rounded-xl bg-green-50 border-2 border-green-200 flex items-center justify-center text-2xl">
                💉
              </div>

            </div>

          </div>

          {/* PENDING */}

          <div className="bg-white rounded-2xl border-2 border-yellow-300 shadow-sm p-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-semibold text-slate-500">
                  {t.pending}
                </p>

                <p className="text-3xl font-bold text-yellow-600 mt-2">
                  {pendingRecords}
                </p>

              </div>

              <div className="w-12 h-12 rounded-xl bg-yellow-50 border-2 border-yellow-200 flex items-center justify-center text-2xl">
                ⏳
              </div>

            </div>

          </div>

        </div>

        {/* ==================================
            LOADING
        ================================== */}

        {loading && (

          <div className="bg-white rounded-2xl border-2 border-slate-300 p-12 text-center shadow-sm">

            <div className="text-4xl mb-4">
              ⏳
            </div>

            <p className="text-slate-500 font-medium">
              {t.loading}
            </p>

          </div>

        )}

        {/* ==================================
            EMPTY
        ================================== */}

        {!loading &&
          reports.length === 0 && (

            <div className="bg-white rounded-2xl border-2 border-slate-300 p-12 text-center shadow-sm">

              <div className="text-5xl mb-4">
                📋
              </div>

              <p className="text-slate-500">
                {t.noRecords}
              </p>

            </div>

          )}

        {/* ==================================
            RECORDS
        ================================== */}

        {!loading &&
          reports.length > 0 && (

            <div className="space-y-8">

              {reports.map((report) => {

                const riskStyle =
                  getRiskStyle(
                    report.priority
                  )

                const symptoms =
                  getSymptoms(
                    report.symptoms
                  )

                const hasGPS =
                  report.latitude !==
                    null &&
                  report.latitude !==
                    undefined &&
                  report.longitude !==
                    null &&
                  report.longitude !==
                    undefined

                const caseNumber =
                  String(
                    report.id
                  ).padStart(4, '0')

                const vetAssigned =
                  report.assigned_vet &&
                  report.assigned_vet !==
                    'Not Assigned'

                const hasTreatment =
                  report.treatment_history &&
                  report.treatment_history !==
                    'No treatment recorded'

                return (

                  <div
                    key={report.id}
                    className={`
                      bg-white
                      rounded-3xl
                      border-2
                      border-slate-300
                      border-l-8
                      ${riskStyle.border}
                      shadow-md
                      overflow-hidden
                    `}
                  >

                    {/* ==================================
                        CASE HEADER
                    ================================== */}

                    <div className="p-5 md:p-6 border-b-2 border-slate-300 bg-white">

                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                        {/* ANIMAL */}

                        <div className="flex items-center gap-4">

                          <div className="w-16 h-16 rounded-2xl bg-green-50 border-2 border-green-200 flex items-center justify-center text-4xl">
                            {getAnimalIcon(
                              report.animal_type
                            )}
                          </div>

                          <div>

                            <div className="flex flex-wrap items-center gap-2">

                              <h2 className="text-2xl font-bold text-slate-800">
                                {getAnimalName(
                                  report.animal_type
                                )}
                              </h2>

                              <span className="bg-slate-100 border border-slate-300 text-slate-600 text-xs font-bold px-3 py-1 rounded-full">
                                {t.caseId} #PM-
                                {caseNumber}
                              </span>

                            </div>

                            <p className="text-slate-500 mt-1">
                              {t.age}:{' '}
                              {report.animal_age}{' '}
                              {t.years}
                            </p>

                            <p className="text-xs text-slate-400 mt-1">
                              🕐 {t.reported}:{' '}
                              {formatDateTime(
                                report.created_at
                              )}
                            </p>

                          </div>

                        </div>

                        {/* BADGES */}

                        <div className="flex flex-wrap gap-3">

                          <span
                            className={`
                              inline-flex
                              items-center
                              gap-2
                              px-4
                              py-2
                              rounded-full
                              border-2
                              text-xs
                              font-bold
                              ${riskStyle.badge}
                            `}
                          >
                            {riskStyle.icon}{' '}
                            {getRiskLabel(
                              report.priority
                            )}
                          </span>

                          <span
                            className={`
                              inline-flex
                              items-center
                              gap-2
                              px-4
                              py-2
                              rounded-full
                              border-2
                              text-xs
                              font-bold
                              ${getStatusStyle(
                                report.status
                              )}
                            `}
                          >
                            {report.status ===
                            'Pending'
                              ? '⏳'
                              : report.status ===
                                'In Review'
                              ? '🔍'
                              : '✓'}{' '}
                            {getStatusLabel(
                              report.status
                            )}
                          </span>

                        </div>

                      </div>

                    </div>

                    {/* ==================================
                        DETAILS
                    ================================== */}

                    <div className="p-5 md:p-6">

                      {/* SYMPTOMS + LOCATION */}

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

                        {/* SYMPTOMS */}

                        <div className="rounded-2xl bg-slate-50 border-2 border-slate-300 p-5">

                          <div className="flex items-center gap-3 mb-4">

                            <div className="w-10 h-10 rounded-xl bg-white border-2 border-slate-200 flex items-center justify-center">
                              🩺
                            </div>

                            <div>

                              <h3 className="font-bold text-slate-700">
                                {t.symptoms}
                              </h3>

                              <p className="text-xs text-slate-400 mt-0.5">
                                {symptoms.length}{' '}
                                reported
                              </p>

                            </div>

                          </div>

                          <div className="flex flex-wrap gap-2">

                            {symptoms.length >
                            0 ? (

                              symptoms.map(
                                (symptom) => (

                                  <span
                                    key={
                                      symptom
                                    }
                                    className="bg-white border-2 border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 shadow-sm"
                                  >
                                    {getSymptomName(
                                      symptom
                                    )}
                                  </span>

                                )
                              )

                            ) : (

                              <span className="text-sm text-slate-400">
                                {t.notAvailable}
                              </span>

                            )}

                          </div>

                        </div>

                        {/* LOCATION */}

                        <div className="rounded-2xl bg-slate-50 border-2 border-slate-300 p-5">

                          <div className="flex items-center gap-3 mb-4">

                            <div className="w-10 h-10 rounded-xl bg-white border-2 border-slate-200 flex items-center justify-center">
                              📍
                            </div>

                            <h3 className="font-bold text-slate-700">
                              {t.location}
                            </h3>

                          </div>

                          <p className="font-semibold text-slate-800">
                            {report.location ||
                              t.notAvailable}
                          </p>

                          {hasGPS ? (

                            <>

                              <p className="text-sm text-slate-500 mt-2">
                                {t.gps}:{' '}
                                {report.latitude},{' '}
                                {report.longitude}
                              </p>

                              <div className="flex flex-wrap items-center gap-3 mt-4">

                                <span className="text-sm text-green-600 font-semibold">
                                  ✓{' '}
                                  {t.locationCaptured}
                                </span>

                                <button
                                  type="button"
                                  onClick={() =>
                                    openMap(
                                      report.latitude,
                                      report.longitude
                                    )
                                  }
                                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg border-2 border-blue-700 transition"
                                >
                                  🗺️{' '}
                                  {t.viewMap}
                                </button>

                              </div>

                            </>

                          ) : (

                            <p className="text-sm text-slate-400 mt-2">
                              {t.notAvailable}
                            </p>

                          )}

                        </div>

                      </div>

                      {/* ==================================
                          HEALTH INFORMATION
                      ================================== */}

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">

                        {/* VACCINATION */}

                        <div className="rounded-2xl border-2 border-blue-200 bg-blue-50/40 p-5">

                          <div className="flex items-center gap-3 mb-4">

                            <div className="w-11 h-11 rounded-xl bg-white border-2 border-blue-200 flex items-center justify-center text-xl">
                              💉
                            </div>

                            <div>

                              <p className="text-xs font-semibold text-slate-500">
                                {t.vaccination}
                              </p>

                              <p className="font-bold text-slate-800 mt-1">
                                {report.vaccination_status ||
                                  t.notAvailable}
                              </p>

                            </div>

                          </div>

                          <select
                            value={
                              report.vaccination_status ||
                              'Not Available'
                            }
                            onChange={(e) =>
                              updateVaccination(
                                report.id,
                                e.target.value
                              )
                            }
                            className="w-full border-2 border-blue-200 rounded-xl px-3 py-2.5 bg-white text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-blue-400"
                          >

                            <option value="Not Available">
                              {t.notAvailable}
                            </option>

                            <option value="Vaccinated">
                              {t.vaccinatedStatus}
                            </option>

                            <option value="Not Vaccinated">
                              {t.notVaccinated}
                            </option>

                            <option value="Pending">
                              {t.pendingStatus}
                            </option>

                          </select>

                        </div>

                        {/* TREATMENT */}

                        <div className="rounded-2xl border-2 border-purple-200 bg-purple-50/40 p-5">

                          <div className="flex items-center gap-3 mb-4">

                            <div className="w-11 h-11 rounded-xl bg-white border-2 border-purple-200 flex items-center justify-center text-xl">
                              💊
                            </div>

                            <div>

                              <p className="text-xs font-semibold text-slate-500">
                                {t.treatment}
                              </p>

                              <p className="font-bold text-slate-800 mt-1">
                                {hasTreatment
                                  ? 'Recorded'
                                  : t.noTreatment}
                              </p>

                            </div>

                          </div>

                          <p className="text-sm text-slate-600 leading-relaxed">
                            {hasTreatment
                              ? report.treatment_history
                              : t.noTreatment}
                          </p>

                        </div>

                        {/* VETERINARIAN */}

                        <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50/40 p-5">

                          <div className="flex items-center gap-3 mb-4">

                            <div className="w-11 h-11 rounded-xl bg-white border-2 border-emerald-200 flex items-center justify-center text-xl">
                              👨‍⚕️
                            </div>

                            <div>

                              <p className="text-xs font-semibold text-slate-500">
                                {t.veterinarian}
                              </p>

                              <p className="font-bold text-slate-800 mt-1">
                                {vetAssigned
                                  ? report.assigned_vet
                                  : t.notAssigned}
                              </p>

                            </div>

                          </div>

                          <p className="text-sm text-slate-600">

                            {vetAssigned
                              ? '✓ Case assigned for veterinary care'
                              : '⏳ Awaiting veterinary assignment'}

                          </p>

                        </div>

                      </div>

                      {/* ==================================
                          CASE STATUS
                      ================================== */}

                      <div className="mt-5 rounded-2xl border-2 border-slate-300 bg-white p-5">

                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                          <div>

                            <p className="text-xs uppercase tracking-wide font-bold text-slate-400">
                              {t.caseStatus}
                            </p>

                            <p className="text-lg font-bold text-slate-800 mt-1">
                              {getStatusLabel(
                                report.status
                              )}
                            </p>

                          </div>

                          <div>

                            <p className="text-xs uppercase tracking-wide font-bold text-slate-400">
                              {t.priority}
                            </p>

                            <span
                              className={`
                                inline-flex
                                items-center
                                gap-2
                                mt-2
                                px-4
                                py-2
                                rounded-full
                                border-2
                                text-xs
                                font-bold
                                ${riskStyle.badge}
                              `}
                            >
                              {riskStyle.icon}{' '}
                              {getRiskLabel(
                                report.priority
                              )}
                            </span>

                          </div>

                        </div>

                      </div>

                    </div>

                    {/* ==================================
                        FOOTER
                    ================================== */}

                    <div className="border-t-2 border-slate-300 bg-slate-100 px-5 md:px-6 py-4">

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

                        <div className="flex items-center gap-2">

                          <span className="w-3 h-3 rounded-full bg-green-500 border-2 border-green-700"></span>

                          <span className="text-sm text-slate-600 font-semibold">
                            {t.record}
                          </span>

                        </div>

                        <span className="text-xs text-slate-500 font-bold">
                          {t.caseId} #PM-
                          {caseNumber}
                        </span>

                      </div>

                    </div>

                  </div>
                )
              })}

            </div>

          )}

      </div>

    </div>
  )
}

export default HealthRecords