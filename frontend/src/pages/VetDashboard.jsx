import { useEffect, useState } from 'react'
import API_BASE_URL from "../config";
function VetDashboard({ language }) {
  const [reports, setReports] = useState([])
  const [selectedReport, setSelectedReport] = useState(null)

  const translations = {
    en: {
      title: 'Veterinary Control Center',
      description:
        'Monitor, prioritize, and manage livestock health cases.',

      totalCases: 'Total Cases',
      highRisk: 'High Risk',
      mediumRisk: 'Medium Risk',
      pending: 'Pending',

      caseQueue: 'Priority Case Queue',
      selectCase: 'Select a case to view details.',

      caseDetails: 'Case Details',
      caseNumber: 'Case',
      animal: 'Animal',
      age: 'Age',
      years: 'years',
      symptoms: 'Symptoms',
      location: 'Location',
      gps: 'GPS Coordinates',

      riskAssessment: 'Risk Assessment',
      riskLevel: 'Risk Level',
      urgent:
        'Urgent veterinary attention is recommended for this case.',
      monitor:
        'Continue monitoring and provide routine veterinary care.',

      caseManagement: 'Case Management',
      caseStatus: 'Case Status',

      vaccination: 'Vaccination',
      treatment: 'Treatment History',
      enterTreatment: 'Enter treatment or follow-up notes',

      assignedVet: 'Assigned Veterinarian',
      notAssigned: 'Not Assigned',
      veterinarian1: 'Veterinarian 1',
      veterinarian2: 'Veterinarian 2',
      veterinarian3: 'Veterinarian 3',

      pendingStatus: 'Pending',
      newStatus: 'New',
      underReview: 'Under Review',
      visitScheduled: 'Visit Scheduled',
      inTreatment: 'In Treatment',
      escalated: 'Escalated',
      resolved: 'Resolved',
      escalateCase: 'Escalate Case',
      escalationRequired: 'High-risk case requires priority veterinary action.',
      caseLifecycle: 'Case Lifecycle',

      noReports: 'No cases available.',
      locationCaptured: 'GPS location captured',
      noLocation: 'Location not available',

      mortality: 'MORTALITY REPORT',
      mortalityDetails: 'Mortality Details',
      animalsDied: 'Animals Died',
      deathDate: 'Date of Death',
      deathTime: 'Time of Death',
      suspectedCause: 'Suspected Cause',
      additionalNotes: 'Additional Notes',
      symptomsBeforeDeath: 'Symptoms Before Death',
    },

    hi: {
      title: 'पशु चिकित्सा नियंत्रण केंद्र',
      description:
        'पशु स्वास्थ्य मामलों की निगरानी, प्राथमिकता और प्रबंधन करें।',

      totalCases: 'कुल मामले',
      highRisk: 'उच्च जोखिम',
      mediumRisk: 'मध्यम जोखिम',
      pending: 'लंबित',

      caseQueue: 'प्राथमिकता मामले',
      selectCase: 'विवरण देखने के लिए मामला चुनें।',

      caseDetails: 'मामले का विवरण',
      caseNumber: 'मामला',
      animal: 'पशु',
      age: 'उम्र',
      years: 'वर्ष',
      symptoms: 'लक्षण',
      location: 'स्थान',
      gps: 'जीपीएस निर्देशांक',

      riskAssessment: 'जोखिम मूल्यांकन',
      riskLevel: 'जोखिम स्तर',
      urgent:
        'इस मामले में तत्काल पशु चिकित्सा सहायता की सलाह दी जाती है।',
      monitor:
        'पशु की निगरानी जारी रखें और नियमित पशु चिकित्सा देखभाल दें।',

      caseManagement: 'मामला प्रबंधन',
      caseStatus: 'मामले की स्थिति',

      vaccination: 'टीकाकरण',
      treatment: 'उपचार का इतिहास',
      enterTreatment: 'उपचार या फॉलो-अप जानकारी दर्ज करें',

      assignedVet: 'नियुक्त पशु चिकित्सक',
      notAssigned: 'नियुक्त नहीं',
      veterinarian1: 'पशु चिकित्सक 1',
      veterinarian2: 'पशु चिकित्सक 2',
      veterinarian3: 'पशु चिकित्सक 3',

      pendingStatus: 'लंबित',
      newStatus: 'नया',
      underReview: 'समीक्षा के अधीन',
      visitScheduled: 'भ्रमण निर्धारित',
      inTreatment: 'उपचार जारी',
      escalated: 'एस्केलेटेड',
      resolved: 'समाधान किया गया',
      escalateCase: 'मामला एस्केलेट करें',
      escalationRequired: 'उच्च जोखिम वाले मामले में प्राथमिकता से पशु चिकित्सा कार्रवाई आवश्यक है।',
      caseLifecycle: 'मामले का चरण',

      noReports: 'कोई मामला उपलब्ध नहीं है।',
      locationCaptured: 'जीपीएस स्थान प्राप्त हुआ',
      noLocation: 'स्थान उपलब्ध नहीं है',

      mortality: 'मृत्यु रिपोर्ट',
      mortalityDetails: 'मृत्यु का विवरण',
      animalsDied: 'मृत पशुओं की संख्या',
      deathDate: 'मृत्यु की तारीख',
      deathTime: 'मृत्यु का समय',
      suspectedCause: 'संदिग्ध कारण',
      additionalNotes: 'अतिरिक्त जानकारी',
      symptomsBeforeDeath: 'मृत्यु से पहले के लक्षण',
    },

    mr: {
      title: 'पशुवैद्यकीय नियंत्रण केंद्र',
      description:
        'पशु आरोग्य प्रकरणांचे निरीक्षण, प्राधान्यक्रम आणि व्यवस्थापन करा.',

      totalCases: 'एकूण प्रकरणे',
      highRisk: 'उच्च धोका',
      mediumRisk: 'मध्यम धोका',
      pending: 'प्रलंबित',

      caseQueue: 'प्राधान्य प्रकरणे',
      selectCase: 'तपशील पाहण्यासाठी प्रकरण निवडा.',

      caseDetails: 'प्रकरणाचा तपशील',
      caseNumber: 'प्रकरण',
      animal: 'प्राणी',
      age: 'वय',
      years: 'वर्षे',
      symptoms: 'लक्षणे',
      location: 'ठिकाण',
      gps: 'जीपीएस निर्देशांक',

      riskAssessment: 'धोका मूल्यांकन',
      riskLevel: 'धोका पातळी',
      urgent:
        'या प्रकरणासाठी तातडीच्या पशुवैद्यकीय तपासणीची शिफारस केली जाते.',
      monitor:
        'प्राण्याचे निरीक्षण सुरू ठेवा आणि नियमित पशुवैद्यकीय काळजी द्या.',

      caseManagement: 'प्रकरण व्यवस्थापन',
      caseStatus: 'प्रकरणाची स्थिती',

      vaccination: 'लसीकरण',
      treatment: 'उपचाराचा इतिहास',
      enterTreatment: 'उपचार किंवा पुढील तपासणीची नोंद करा',

      assignedVet: 'नियुक्त पशुवैद्य',
      notAssigned: 'नियुक्त केलेले नाही',
      veterinarian1: 'पशुवैद्य 1',
      veterinarian2: 'पशुवैद्य 2',
      veterinarian3: 'पशुवैद्य 3',

      pendingStatus: 'प्रलंबित',
      newStatus: 'नवीन',
      underReview: 'तपासणी सुरू',
      visitScheduled: 'भेट निश्चित',
      inTreatment: 'उपचार सुरू',
      escalated: 'तातडीने वाढवलेले',
      resolved: 'निराकरण झाले',
      escalateCase: 'प्रकरण तातडीने पाठवा',
      escalationRequired: 'उच्च-धोका प्रकरणासाठी प्राधान्याने पशुवैद्यकीय कारवाई आवश्यक आहे.',
      caseLifecycle: 'प्रकरणाचा टप्पा',

      noReports: 'कोणतेही प्रकरण उपलब्ध नाही.',
      locationCaptured: 'जीपीएस स्थान मिळाले',
      noLocation: 'स्थान उपलब्ध नाही',

      mortality: 'मृत्यू अहवाल',
      mortalityDetails: 'मृत्यूचा तपशील',
      animalsDied: 'मृत प्राण्यांची संख्या',
      deathDate: 'मृत्यूची तारीख',
      deathTime: 'मृत्यूची वेळ',
      suspectedCause: 'संशयित कारण',
      additionalNotes: 'अतिरिक्त माहिती',
      symptomsBeforeDeath: 'मृत्यूपूर्वीची लक्षणे',
    },
  }

  const t = translations[language] || translations.en

  useEffect(() => {
    fetch(`${API_BASE_URL}/reports`)
      .then((response) => response.json())
      .then((data) => {
        setReports(data)

        if (data.length > 0) {
          const sorted = [...data].sort((a, b) => {
            const order = {
              High: 1,
              Medium: 2,
              Low: 3,
            }

            return (
              (order[a.priority] || 4) -
              (order[b.priority] || 4)
            )
          })

          setSelectedReport(sorted[0])
        }
      })
      .catch((error) => {
        console.error('Failed to fetch vet reports:', error)
      })
  }, [])

  const sortedReports = [...reports].sort((a, b) => {
    const order = {
      High: 1,
      Medium: 2,
      Low: 3,
    }

    return (
      (order[a.priority] || 4) -
      (order[b.priority] || 4)
    )
  })

  const totalCases = reports.length

  const highRiskCases = reports.filter(
    (report) => report.priority === 'High'
  ).length

  const mediumRiskCases = reports.filter(
    (report) => report.priority === 'Medium'
  ).length

  const pendingCases = reports.filter(
    (report) =>
      !['Resolved'].includes(report.status)
  ).length

  const updateStatus = (reportId, newStatus) => {
    fetch(
      `${API_BASE_URL}/report/${reportId}/status`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data)

        setReports((currentReports) =>
          currentReports.map((item) =>
            item.id === reportId
              ? {
                  ...item,
                  status: newStatus,
                }
              : item
          )
        )

        setSelectedReport((current) =>
          current && current.id === reportId
            ? {
                ...current,
                status: newStatus,
              }
            : current
        )
      })
      .catch((error) => {
        console.error('Failed to update status:', error)
      })
  }

  const escalateCase = (reportId) => {
    fetch(
      `${API_BASE_URL}/report/${reportId}/escalate`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then(async (response) => {
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.detail || 'Failed to escalate case')
        }

        return data
      })
      .then((data) => {
        console.log(data)

        setReports((currentReports) =>
          currentReports.map((item) =>
            item.id === reportId
              ? {
                  ...item,
                  status: 'Escalated',
                }
              : item
          )
        )

        setSelectedReport((current) =>
          current && current.id === reportId
            ? {
                ...current,
                status: 'Escalated',
              }
            : current
        )
      })
      .catch((error) => {
        console.error('Failed to escalate case:', error)
        alert(error.message)
      })
  }

  const getLifecycleStep = (status) => {
    const steps = {
      New: 1,
      Pending: 1,
      'Under Review': 2,
      'Visit Scheduled': 3,
      'In Treatment': 4,
      Escalated: 2,
      Resolved: 5,
    }

    return steps[status] || 1
  }

  const lifecycleSteps = [
    'New',
    'Under Review',
    'Visit Scheduled',
    'In Treatment',
    'Resolved',
  ]

  const getLifecycleLabel = (step) => {
    const labels = {
      New: t.newStatus,
      'Under Review': t.underReview,
      'Visit Scheduled': t.visitScheduled,
      'In Treatment': t.inTreatment,
      Resolved: t.resolved,
    }

    return labels[step] || step
  }

  const assignVet = (reportId, vet) => {
    fetch(
      `${API_BASE_URL}/report/${reportId}/vet`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assigned_vet: vet,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data)

        setReports((currentReports) =>
          currentReports.map((item) =>
            item.id === reportId
              ? {
                  ...item,
                  assigned_vet: vet,
                }
              : item
          )
        )

        setSelectedReport((current) =>
          current && current.id === reportId
            ? {
                ...current,
                assigned_vet: vet,
              }
            : current
        )
      })
      .catch((error) => {
        console.error('Failed to assign veterinarian:', error)
      })
  }

  const updateTreatment = (reportId, treatment) => {
    fetch(
      `${API_BASE_URL}/report/${reportId}/treatment`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          treatment_history: treatment,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data)

        setReports((currentReports) =>
          currentReports.map((item) =>
            item.id === reportId
              ? {
                  ...item,
                  treatment_history: treatment,
                }
              : item
          )
        )

        setSelectedReport((current) =>
          current && current.id === reportId
            ? {
                ...current,
                treatment_history: treatment,
              }
            : current
        )
      })
      .catch((error) => {
        console.error('Failed to update treatment:', error)
      })
  }

  const getRiskClasses = (priority) => {
    if (priority === 'High') {
      return {
        border: 'border-red-400',
        bg: 'bg-red-50',
        text: 'text-red-700',
        badge: 'bg-red-100 text-red-700',
      }
    }

    if (priority === 'Medium') {
      return {
        border: 'border-orange-400',
        bg: 'bg-orange-50',
        text: 'text-orange-700',
        badge: 'bg-orange-100 text-orange-700',
      }
    }

    return {
      border: 'border-green-400',
      bg: 'bg-green-50',
      text: 'text-green-700',
      badge: 'bg-green-100 text-green-700',
    }
  }

  const getStatusClasses = (status) => {
    if (status === 'Resolved') {
      return 'bg-green-100 text-green-700'
    }

    if (status === 'Escalated') {
      return 'bg-red-100 text-red-700'
    }

    if (status === 'In Treatment') {
      return 'bg-emerald-100 text-emerald-700'
    }

    if (status === 'Visit Scheduled') {
      return 'bg-blue-100 text-blue-700'
    }

    if (status === 'Under Review') {
      return 'bg-purple-100 text-purple-700'
    }

    return 'bg-yellow-100 text-yellow-700'
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 mb-6 shadow-lg">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>
              <div className="flex items-center gap-3">
                <div className="bg-emerald-500 rounded-xl p-3 text-2xl">
                  🩺
                </div>

                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">
                    {t.title}
                  </h1>

                  <p className="text-slate-300 mt-1">
                    {t.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl px-4 py-3">
              <p className="text-xs text-slate-400">
                PASHUMITRA
              </p>
              <p className="font-semibold">
                Veterinary Operations
              </p>
            </div>

          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

          <div className="bg-white rounded-xl p-5 border-l-4 border-slate-700 shadow-sm">
            <p className="text-sm text-slate-500">
              {t.totalCases}
            </p>

            <p className="text-3xl font-bold text-slate-800 mt-2">
              {totalCases}
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 border-l-4 border-red-500 shadow-sm">
            <p className="text-sm text-slate-500">
              {t.highRisk}
            </p>

            <p className="text-3xl font-bold text-red-600 mt-2">
              {highRiskCases}
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 border-l-4 border-orange-400 shadow-sm">
            <p className="text-sm text-slate-500">
              {t.mediumRisk}
            </p>

            <p className="text-3xl font-bold text-orange-600 mt-2">
              {mediumRiskCases}
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 border-l-4 border-yellow-400 shadow-sm">
            <p className="text-sm text-slate-500">
              {t.pending}
            </p>

            <p className="text-3xl font-bold text-yellow-600 mt-2">
              {pendingCases}
            </p>
          </div>

        </div>

        {/* Main Control Center */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* LEFT: Priority Queue */}
          <div className="lg:col-span-4 bg-slate-900 rounded-2xl shadow-lg overflow-hidden">

            <div className="p-5 border-b border-slate-700">
              <div className="flex justify-between items-center">

                <div>
                  <h2 className="text-lg font-bold text-white">
                    {t.caseQueue}
                  </h2>

                  <p className="text-sm text-slate-400 mt-1">
                    {sortedReports.length} cases
                  </p>
                </div>

                <span className="bg-emerald-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                  LIVE
                </span>

              </div>
            </div>

            <div className="max-h-[650px] overflow-y-auto p-3">

              {sortedReports.length === 0 && (
                <p className="text-slate-400 p-4">
                  {t.noReports}
                </p>
              )}

              {sortedReports.map((report) => {
                const risk = getRiskClasses(report.priority)

                const isSelected =
                  selectedReport &&
                  selectedReport.id === report.id

                return (
                  <button
                    key={report.id}
                    onClick={() => setSelectedReport(report)}
                    className={`w-full text-left rounded-xl p-4 mb-3 border transition ${
                      isSelected
                        ? 'bg-slate-700 border-emerald-400'
                        : 'bg-slate-800 border-slate-700 hover:border-slate-500'
                    }`}
                  >

                    <div className="flex justify-between items-start gap-3">

                      <div>
                        <div className="flex items-center gap-2">

                          <span className="text-xl">
                            {report.animal_type?.toLowerCase() === 'cow'
                              ? '🐄'
                              : report.animal_type?.toLowerCase() === 'buffalo'
                              ? '🐃'
                              : report.animal_type?.toLowerCase() === 'goat'
                              ? '🐐'
                              : report.animal_type?.toLowerCase() === 'sheep'
                              ? '🐑'
                              : '🐾'}
                          </span>

                          <span className="font-bold text-white">
                            {report.animal_type}
                          </span>

                        </div>

                        <p className="text-xs text-slate-400 mt-2">
                          {t.caseNumber} #{String(report.id).padStart(4, '0')}
                        </p>

                      </div>

                      <span
                        className={`text-xs px-2 py-1 rounded-full font-bold ${risk.badge}`}
                      >
                        {report.priority}
                      </span>

                    </div>

                    <div className="mt-3 flex justify-between items-center">

                      <span className="text-sm text-slate-300">
                        {t.age}: {report.animal_age} {t.years}
                      </span>

                      <span
                        className={`text-xs px-2 py-1 rounded-full ${getStatusClasses(
                          report.status
                        )}`}
                      >
                        {report.status}
                      </span>

                    </div>

                  </button>
                )
              })}

            </div>
          </div>

          {/* RIGHT: Case Details */}
          <div className="lg:col-span-8">

            {!selectedReport ? (
              <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
                <p className="text-slate-500">
                  {t.selectCase}
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

                {/* Case Header */}
                <div className="bg-slate-800 text-white p-6">

                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

                    <div>

                      <div className="flex items-center gap-3">

                        <span className="text-4xl">
                          {selectedReport.animal_type?.toLowerCase() === 'cow'
                            ? '🐄'
                            : selectedReport.animal_type?.toLowerCase() === 'buffalo'
                            ? '🐃'
                            : selectedReport.animal_type?.toLowerCase() === 'goat'
                            ? '🐐'
                            : selectedReport.animal_type?.toLowerCase() === 'sheep'
                            ? '🐑'
                            : '🐾'}
                        </span>

                        <div>
                          <h2 className="text-2xl font-bold">
                            {selectedReport.animal_type}
                          </h2>

                          <p className="text-slate-400">
                            {t.caseNumber} #
                            {String(selectedReport.id).padStart(4, '0')}
                          </p>
                        </div>

                      </div>

                    </div>

                    <div className="flex gap-2 flex-wrap">

                      {selectedReport.report_type === 'mortality' && (
                        <span className="px-3 py-2 rounded-full text-sm font-bold bg-red-600 text-white">
                          🚨 {t.mortality}
                        </span>
                      )}

                      <span
                        className={`px-3 py-2 rounded-full text-sm font-bold ${
                          getRiskClasses(selectedReport.priority).badge
                        }`}
                      >
                        {selectedReport.priority} Risk
                      </span>

                      <span
                        className={`px-3 py-2 rounded-full text-sm font-semibold ${getStatusClasses(
                          selectedReport.status
                        )}`}
                      >
                        {selectedReport.status}
                      </span>

                    </div>

                  </div>

                </div>

                <div className="p-6">

                  {/* Risk Assessment */}
                  <div
                    className={`rounded-xl border p-5 mb-6 ${
                      getRiskClasses(selectedReport.priority).border
                    } ${
                      getRiskClasses(selectedReport.priority).bg
                    }`}
                  >

                    <div className="flex items-start gap-3">

                      <div className="text-2xl">
                        {selectedReport.priority === 'High'
                          ? '🚨'
                          : selectedReport.priority === 'Medium'
                          ? '⚠️'
                          : '🛡️'}
                      </div>

                      <div>

                        <p
                          className={`font-bold ${
                            getRiskClasses(selectedReport.priority).text
                          }`}
                        >
                          {t.riskAssessment}: {selectedReport.priority}
                        </p>

                      
                        <p className="text-sm text-slate-600 mt-1">
  {selectedReport.priority === 'High'
    ? t.urgent
    : t.monitor}
</p>

{selectedReport.reasons?.length > 0 && (
  <div className="mt-4">
    <p className="text-sm font-semibold text-slate-700 mb-2">
      Why this risk level?
    </p>

    <ul className="space-y-1">
      {selectedReport.reasons.map((reason, index) => (
        <li
          key={index}
          className="text-sm text-slate-600 flex items-start gap-2"
        >
          <span className="text-emerald-600">•</span>
          <span>{reason}</span>
        </li>
      ))}
    </ul>
  </div>
)}

                        {selectedReport.priority === 'High' &&
                          selectedReport.status !== 'Resolved' && (
                            <p className="text-sm font-semibold text-red-700 mt-2">
                              {t.escalationRequired}
                            </p>
                          )}

                      </div>

                    </div>

                  </div>

                  {/* Case Lifecycle */}
                  <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-5">
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <div>
                        <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold">
                          {t.caseLifecycle}
                        </p>
                        <p className="text-sm text-slate-600 mt-1">
                          {selectedReport.status}
                        </p>
                      </div>

                      {selectedReport.priority === 'High' &&
                        selectedReport.status !== 'Resolved' &&
                        selectedReport.status !== 'Escalated' && (
                          <button
                            type="button"
                            onClick={() => escalateCase(selectedReport.id)}
                            className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition"
                          >
                            🚨 {t.escalateCase}
                          </button>
                        )}
                    </div>

                    <div className="grid grid-cols-5 gap-2">
                      {lifecycleSteps.map((step, index) => {
                        const currentStep = getLifecycleStep(
                          selectedReport.status
                        )
                        const stepNumber = index + 1
                        const completed = currentStep >= stepNumber

                        return (
                          <div key={step} className="text-center">
                            <div
                              className={`h-2 rounded-full ${
                                completed
                                  ? 'bg-emerald-500'
                                  : 'bg-slate-200'
                              }`}
                            />

                            <p
                              className={`text-[11px] sm:text-xs mt-2 font-medium ${
                                completed
                                  ? 'text-slate-800'
                                  : 'text-slate-400'
                              }`}
                            >
                              {getLifecycleLabel(step)}
                            </p>
                          </div>
                        )
                      })}
                    </div>

                    {selectedReport.status === 'Escalated' && (
                      <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {t.escalationRequired}
                      </div>
                    )}
                  </div>

                  {/* Mortality Details */}
                  {selectedReport.report_type === 'mortality' && (
                    <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-5">
                      <div className="flex items-center gap-3 mb-5">
                        <div className="bg-red-600 text-white rounded-lg p-2 text-lg">
                          🚨
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-wide text-red-600 font-semibold">
                            {t.mortality}
                          </p>
                          <h3 className="text-xl font-bold text-slate-800 mt-1">
                            {t.mortalityDetails}
                          </h3>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white rounded-xl p-4 border border-red-100">
                          <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold">
                            {t.animalsDied}
                          </p>
                          <p className="text-2xl font-bold text-red-700 mt-2">
                            {selectedReport.death_count ?? '—'}
                          </p>
                        </div>

                        <div className="bg-white rounded-xl p-4 border border-red-100">
                          <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold">
                            {t.suspectedCause}
                          </p>
                          <p className="text-lg font-semibold text-slate-800 mt-2">
                            {selectedReport.suspected_cause || '—'}
                          </p>
                        </div>

                        <div className="bg-white rounded-xl p-4 border border-red-100">
                          <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold">
                            {t.deathDate}
                          </p>
                          <p className="text-lg font-semibold text-slate-800 mt-2">
                            {selectedReport.death_date || '—'}
                          </p>
                        </div>

                        <div className="bg-white rounded-xl p-4 border border-red-100">
                          <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold">
                            {t.deathTime}
                          </p>
                          <p className="text-lg font-semibold text-slate-800 mt-2">
                            {selectedReport.death_time || '—'}
                          </p>
                        </div>

                        <div className="bg-white rounded-xl p-4 border border-red-100 md:col-span-2">
                          <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold">
                            {t.symptomsBeforeDeath}
                          </p>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {(selectedReport.symptoms || '')
                              .split(',')
                              .filter(Boolean)
                              .map((symptom, index) => (
                                <span
                                  key={index}
                                  className="bg-slate-50 border border-slate-200 px-3 py-1 rounded-full text-sm text-slate-700"
                                >
                                  {symptom.replaceAll('_', ' ')}
                                </span>
                              ))}
                            {!(selectedReport.symptoms || '')
                              .split(',')
                              .filter(Boolean).length && (
                              <span className="text-sm text-slate-500">—</span>
                            )}
                          </div>
                        </div>

                        <div className="bg-white rounded-xl p-4 border border-red-100 md:col-span-2">
                          <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold">
                            {t.additionalNotes}
                          </p>
                          <p className="text-sm text-slate-700 mt-2 whitespace-pre-wrap">
                            {selectedReport.additional_notes || '—'}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Information Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

                    {/* Animal */}
                    <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">

                      <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold">
                        {t.animal}
                      </p>

                      <p className="text-lg font-bold text-slate-800 mt-2">
                        {selectedReport.animal_type}
                      </p>

                      <p className="text-sm text-slate-600 mt-1">
                        {t.age}: {selectedReport.animal_age ?? '—'} {selectedReport.animal_age != null ? t.years : ''}
                      </p>

                    </div>

                    {/* Symptoms */}
                    <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">

                      <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold">
                        {t.symptoms}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-3">

                        {(selectedReport.symptoms || '')
                          .split(',')
                          .filter(Boolean)
                          .map((symptom, index) => (
                            <span
                              key={index}
                              className="bg-white border border-slate-200 px-3 py-1 rounded-full text-sm text-slate-700"
                            >
                              {symptom.replaceAll('_', ' ')}
                            </span>
                          ))}

                        {!(selectedReport.symptoms || '')
                          .split(',')
                          .filter(Boolean).length && (
                          <span className="text-sm text-slate-500">—</span>
                        )}

                      </div>

                    </div>

                    {/* Location */}
                    <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">

                      <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold">
                        {t.location}
                      </p>

                      <p className="text-lg font-semibold text-slate-800 mt-2">
                        {selectedReport.location || t.noLocation}
                      </p>

                      {selectedReport.latitude != null &&
                        selectedReport.longitude != null && (
                          <p className="text-sm text-slate-500 mt-2">
                            {t.gps}: {selectedReport.latitude},{' '}
                            {selectedReport.longitude}
                          </p>
                        )}

                    </div>

                    {/* Vaccination */}
                    <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">

                      <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold">
                        {t.vaccination}
                      </p>

                      <p className="text-lg font-semibold text-slate-800 mt-2">
                        {selectedReport.vaccination_status || '—'}
                      </p>

                    </div>

                  </div>

                  {/* Case Management */}
                  <div className="border-t border-slate-200 pt-6">

                    <div className="flex items-center gap-3 mb-5">
                      <div className="bg-slate-900 text-white rounded-lg p-2">
                        ⚙️
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-slate-800">
                          {t.caseManagement}
                        </h3>

                        <p className="text-sm text-slate-500">
                          Update and manage this case.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                      {/* Status */}
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          {t.caseStatus}
                        </label>

                        <select
                          value={selectedReport.status}
                          onChange={(e) =>
                            updateStatus(
                              selectedReport.id,
                              e.target.value
                            )
                          }
                          className="w-full border border-slate-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                          <option value="New">
                            {t.newStatus}
                          </option>

                          <option value="Pending">
                            {t.pendingStatus}
                          </option>

                          <option value="Under Review">
                            {t.underReview}
                          </option>

                          <option value="Visit Scheduled">
                            {t.visitScheduled}
                          </option>

                          <option value="In Treatment">
                            {t.inTreatment}
                          </option>

                          <option value="Escalated">
                            {t.escalated}
                          </option>

                          <option value="Resolved">
                            {t.resolved}
                          </option>
                        </select>
                      </div>

                      {/* Veterinarian */}
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          {t.assignedVet}
                        </label>

                        <select
                          value={selectedReport.assigned_vet}
                          onChange={(e) =>
                            assignVet(
                              selectedReport.id,
                              e.target.value
                            )
                          }
                          className="w-full border border-slate-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                          <option value="Not Assigned">
                            {t.notAssigned}
                          </option>

                          <option value="Veterinarian 1">
                            {t.veterinarian1}
                          </option>

                          <option value="Veterinarian 2">
                            {t.veterinarian2}
                          </option>

                          <option value="Veterinarian 3">
                            {t.veterinarian3}
                          </option>
                        </select>
                      </div>

                    </div>

                    {/* Treatment */}
                    <div className="mt-5">

                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        {t.treatment}
                      </label>

                      <textarea
                        defaultValue={
                          selectedReport.treatment_history
                        }
                        placeholder={t.enterTreatment}
                        onBlur={(e) =>
                          updateTreatment(
                            selectedReport.id,
                            e.target.value
                          )
                        }
                        rows="4"
                        className="w-full border border-slate-300 rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />

                      <p className="text-xs text-slate-500 mt-2">
                        Changes are saved when you leave the field.
                      </p>

                    </div>

                  </div>

                </div>

              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  )
}

export default VetDashboard