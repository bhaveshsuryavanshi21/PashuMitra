import { useEffect, useState } from 'react'

import API_BASE_URL from "../config";



const VETERINARY_TEAM_PHONE = '+916261349321'



function FarmerDashboard({ language }) {

  const [reports, setReports] = useState([])

  const [loading, setLoading] = useState(true)
  const [selectedReport, setSelectedReport] = useState(null)



  // =========================================================

  // WEATHER

  // =========================================================



  const [weather, setWeather] = useState(null)

  const [weatherLoading, setWeatherLoading] = useState(false)

  const [weatherError, setWeatherError] = useState('')



  const translations = {

    en: {

      title: 'Farmer Dashboard',

      description:

        'A simple view of your livestock health and veterinary cases.',



      totalCases: 'Total Cases',

      highRisk: 'High Risk',

      pending: 'Pending',

      resolved: 'Resolved',



      recentCases: 'Recent Animal Cases',

      liveData: 'Live Data',



      age: 'Age',

      years: 'years',

      symptoms: 'Symptoms',

      location: 'Location',

      gps: 'GPS',



      vaccination: 'Vaccination',

      treatment: 'Treatment',

      veterinarian: 'Veterinarian',



      notAssigned: 'Not Assigned',

      noTreatment: 'No treatment recorded',

      notAvailable: 'Not Available',



      status: 'Case Status',

      riskLevel: 'Risk Level',



      submitted: 'Report Submitted',

      riskAssessed: 'Risk Assessed',

      vetReview: 'Veterinary Review',

      treatmentStarted: 'Treatment',



      pendingStatus: 'Pending',

      inReview: 'In Review',

      resolvedStatus: 'Resolved',



      low: 'Low Risk',

      medium: 'Medium Risk',

      high: 'High Risk',



      lowMessage:

        'Continue monitoring the animal and maintain regular care.',

      mediumMessage:

        'Veterinary review is recommended. Monitor the animal closely.',

      highMessage:

        'Prompt veterinary review is recommended for this case.',



      fever: 'Fever',

      salivation: 'Excessive Salivation',

      difficultyWalking: 'Difficulty Walking',

      coughing: 'Coughing',



      cow: 'Cow',

      buffalo: 'Buffalo',

      goat: 'Goat',

      sheep: 'Sheep',



      vaccinated: 'Vaccinated',

      notVaccinated: 'Not Vaccinated',



      noReports: 'No animal health reports found.',

      loading: 'Loading animal cases...',



      veterinarySupport: 'Need Veterinary Help?',

      veterinarySupportText:

        'Get connected with the veterinary support team easily.',

      callTeam: 'Call Veterinary Team',

      requestCallback: 'Request Callback',

      emergencyHelp: 'Emergency Help',

      callbackReceived:

        'Your callback request has been received. The veterinary team will contact you.',

      emergencyText:

        'For an urgent animal health issue, contact the veterinary team immediately.',



      // Weather

      weatherTitle: 'Local Weather',

      weatherSubtitle:

        'Current environmental conditions near your reported location.',

      temperature: 'Temperature',

      feelsLike: 'Feels Like',

      humidity: 'Humidity',

      wind: 'Wind',

      clouds: 'Clouds',

      weatherUnavailable: 'Weather information is currently unavailable.',

      weatherLoading: 'Loading weather...',

      environmentalNote:

        'Weather is shown as environmental context and is not a disease diagnosis.',

    },



    hi: {

      title: 'किसान डैशबोर्ड',

      description:

        'अपने पशुओं के स्वास्थ्य और पशु चिकित्सा मामलों की सरल जानकारी देखें।',



      totalCases: 'कुल मामले',

      highRisk: 'उच्च जोखिम',

      pending: 'लंबित',

      resolved: 'समाधान किए गए',



      recentCases: 'हाल के पशु मामले',

      liveData: 'लाइव डेटा',



      age: 'उम्र',

      years: 'वर्ष',

      symptoms: 'लक्षण',

      location: 'स्थान',

      gps: 'जीपीएस',



      vaccination: 'टीकाकरण',

      treatment: 'उपचार',

      veterinarian: 'पशु चिकित्सक',



      notAssigned: 'नियुक्त नहीं',

      noTreatment: 'कोई उपचार दर्ज नहीं है',

      notAvailable: 'उपलब्ध नहीं',



      status: 'मामले की स्थिति',

      riskLevel: 'जोखिम स्तर',



      submitted: 'रिपोर्ट भेजी गई',

      riskAssessed: 'जोखिम आकलन',

      vetReview: 'पशु चिकित्सक की जांच',

      treatmentStarted: 'उपचार',



      pendingStatus: 'लंबित',

      inReview: 'जांच में',

      resolvedStatus: 'समाधान किया गया',



      low: 'कम जोखिम',

      medium: 'मध्यम जोखिम',

      high: 'उच्च जोखिम',



      lowMessage:

        'पशु की निगरानी जारी रखें और नियमित देखभाल करें।',

      mediumMessage:

        'पशु चिकित्सक से जांच कराने की सलाह दी जाती है।',

      highMessage:

        'इस मामले में जल्द से जल्द पशु चिकित्सक से जांच कराने की सलाह दी जाती है।',



      fever: 'बुखार',

      salivation: 'अधिक लार आना',

      difficultyWalking: 'चलने में कठिनाई',

      coughing: 'खांसी',



      cow: 'गाय',

      buffalo: 'भैंस',

      goat: 'बकरी',

      sheep: 'भेड़',



      vaccinated: 'टीकाकरण हुआ',

      notVaccinated: 'टीकाकरण नहीं हुआ',



      noReports: 'कोई पशु स्वास्थ्य रिपोर्ट नहीं मिली।',

      loading: 'पशु मामलों को लोड किया जा रहा है...',



      veterinarySupport: 'पशु चिकित्सक की मदद चाहिए?',

      veterinarySupportText:

        'पशु चिकित्सा सहायता टीम से आसानी से संपर्क करें।',

      callTeam: 'पशु चिकित्सा टीम को कॉल करें',

      requestCallback: 'कॉल बैक का अनुरोध करें',

      emergencyHelp: 'आपातकालीन सहायता',

      callbackReceived:

        'आपका कॉल बैक अनुरोध प्राप्त हो गया है। पशु चिकित्सा टीम आपसे संपर्क करेगी।',

      emergencyText:

        'पशु की गंभीर स्वास्थ्य समस्या होने पर तुरंत पशु चिकित्सा टीम से संपर्क करें।',



      // Weather

      weatherTitle: 'स्थानीय मौसम',

      weatherSubtitle:

        'आपके रिपोर्ट किए गए स्थान के पास वर्तमान पर्यावरणीय स्थिति।',

      temperature: 'तापमान',

      feelsLike: 'महसूस होने वाला तापमान',

      humidity: 'नमी',

      wind: 'हवा',

      clouds: 'बादल',

      weatherUnavailable: 'मौसम की जानकारी अभी उपलब्ध नहीं है।',

      weatherLoading: 'मौसम लोड हो रहा है...',

      environmentalNote:

        'मौसम केवल पर्यावरणीय जानकारी है और रोग का निदान नहीं है।',

    },



    mr: {

      title: 'शेतकरी डॅशबोर्ड',

      description:

        'तुमच्या प्राण्यांच्या आरोग्याची आणि पशुवैद्यकीय प्रकरणांची सोपी माहिती पहा.',



      totalCases: 'एकूण प्रकरणे',

      highRisk: 'जास्त जोखीम',

      pending: 'प्रलंबित',

      resolved: 'निराकरण झाले',



      recentCases: 'अलीकडील प्राणी प्रकरणे',

      liveData: 'लाइव्ह डेटा',



      age: 'वय',

      years: 'वर्षे',

      symptoms: 'लक्षणे',

      location: 'ठिकाण',

      gps: 'जीपीएस',



      vaccination: 'लसीकरण',

      treatment: 'उपचार',

      veterinarian: 'पशुवैद्यक',



      notAssigned: 'नियुक्त केलेले नाही',

      noTreatment: 'उपचाराची नोंद नाही',

      notAvailable: 'उपलब्ध नाही',



      status: 'प्रकरणाची स्थिती',

      riskLevel: 'जोखीम पातळी',



      submitted: 'अहवाल पाठवला',

      riskAssessed: 'जोखीम मूल्यांकन',

      vetReview: 'पशुवैद्यकीय तपासणी',

      treatmentStarted: 'उपचार',



      pendingStatus: 'प्रलंबित',

      inReview: 'तपासणी सुरू',

      resolvedStatus: 'निराकरण झाले',



      low: 'कमी जोखीम',

      medium: 'मध्यम जोखीम',

      high: 'जास्त जोखीम',



      lowMessage:

        'प्राण्याचे निरीक्षण सुरू ठेवा आणि नियमित काळजी घ्या.',

      mediumMessage:

        'पशुवैद्यकाकडून तपासणी करण्याची शिफारस केली जाते.',

      highMessage:

        'या प्रकरणासाठी लवकरात लवकर पशुवैद्यकाकडून तपासणी करण्याची शिफारस केली जाते.',



      fever: 'ताप',

      salivation: 'जास्त लाळ येणे',

      difficultyWalking: 'चालण्यास त्रास',

      coughing: 'खोकला',



      cow: 'गाय',

      buffalo: 'म्हैस',

      goat: 'शेळी',

      sheep: 'मेंढी',



      vaccinated: 'लसीकरण झाले',

      notVaccinated: 'लसीकरण झाले नाही',



      noReports: 'प्राण्यांच्या आरोग्याचे अहवाल आढळले नाहीत.',

      loading: 'प्राण्यांची प्रकरणे लोड होत आहेत...',



      veterinarySupport: 'पशुवैद्यकीय मदत हवी आहे?',

      veterinarySupportText:

        'पशुवैद्यकीय सहाय्य टीमशी सहज संपर्क साधा.',

      callTeam: 'पशुवैद्यकीय टीमला कॉल करा',

      requestCallback: 'कॉल बॅकची विनंती करा',

      emergencyHelp: 'आपत्कालीन मदत',

      callbackReceived:

        'तुमची कॉल बॅक विनंती प्राप्त झाली आहे. पशुवैद्यकीय टीम तुमच्याशी संपर्क साधेल.',

      emergencyText:

        'प्राण्याची गंभीर आरोग्य समस्या असल्यास त्वरित पशुवैद्यकीय टीमशी संपर्क साधा.',



      // Weather

      weatherTitle: 'स्थानिक हवामान',

      weatherSubtitle:

        'तुमच्या नोंदवलेल्या ठिकाणाजवळील सध्याची पर्यावरणीय स्थिती.',

      temperature: 'तापमान',

      feelsLike: 'जाणवणारे तापमान',

      humidity: 'आर्द्रता',

      wind: 'वारा',

      clouds: 'ढग',

      weatherUnavailable: 'हवामानाची माहिती सध्या उपलब्ध नाही.',

      weatherLoading: 'हवामान लोड होत आहे...',

      environmentalNote:

        'हवामान ही केवळ पर्यावरणीय माहिती आहे; हा रोगाचा निदान नाही.',

    },

  }



  const t = translations[language] || translations.en



  // =========================================================

  // FETCH REPORTS

  // =========================================================



  useEffect(() => {

    const fetchReports = async () => {

      try {

        setLoading(false)



        const response = await fetch(

  `${API_BASE_URL}/reports`

)



        if (!response.ok) {

          throw new Error('Failed to fetch reports')

        }



        const data = await response.json()



        setReports(data)



        console.log('Farmer dashboard reports:', data)

      } catch (error) {

        console.error(

          'Failed to fetch reports:',

          error

        )

      } finally {

        setLoading(false)

      }

    }



    fetchReports()



  }, [])



  // =========================================================

  // FETCH WEATHER USING LATEST GPS REPORT

  // =========================================================



  useEffect(() => {

    if (!reports.length) {

      setWeather(null)

      return

    }



    const reportWithGPS = reports.find(

      (report) =>

        report.latitude !== null &&

        report.latitude !== undefined &&

        report.longitude !== null &&

        report.longitude !== undefined &&

        !isNaN(Number(report.latitude)) &&

        !isNaN(Number(report.longitude))

    )



    if (!reportWithGPS) {

      setWeather(null)

      return

    }



    const latitude = Number(reportWithGPS.latitude)

    const longitude = Number(reportWithGPS.longitude)



    const fetchWeather = async () => {

      try {

        setWeatherLoading(true)

        setWeatherError('')



        const response = await fetch(

          `${API_BASE_URL}/weather?lat=${latitude}&lon=${longitude}`

        )



        if (!response.ok) {

          throw new Error('Failed to fetch weather')

        }



        const data = await response.json()



        setWeather(data)



        console.log(

          'Local weather:',

          data

        )

      } catch (error) {

        console.error(

          'Failed to fetch weather:',

          error

        )



        setWeatherError(

          t.weatherUnavailable

        )

      } finally {

        setWeatherLoading(false)

      }

    }



    fetchWeather()

  }, [reports, t.weatherUnavailable])



  // =========================================================

  // ANIMAL NAME

  // =========================================================



  const getAnimalName = (animal) => {

    const value = animal?.toLowerCase()



    if (value === 'cow') return t.cow

    if (value === 'buffalo') return t.buffalo

    if (value === 'goat') return t.goat

    if (value === 'sheep') return t.sheep



    return animal || 'Animal'

  }



  // =========================================================

  // ANIMAL ICON

  // =========================================================



  const getAnimalIcon = (animal) => {

    const value = animal?.toLowerCase()



    if (value === 'cow') return '🐄'

    if (value === 'buffalo') return '🐃'

    if (value === 'goat') return '🐐'

    if (value === 'sheep') return '🐑'



    return '🐾'

  }



  // =========================================================

  // SYMPTOMS

  // =========================================================



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



  // =========================================================

  // RISK

  // =========================================================



  const getRiskLabel = (priority) => {

    if (priority === 'High') return t.high

    if (priority === 'Medium') return t.medium

    if (priority === 'Low') return t.low



    return t.notAvailable

  }



  const getRiskMessage = (priority) => {

    if (priority === 'High') {

      return t.highMessage

    }



    if (priority === 'Medium') {

      return t.mediumMessage

    }



    if (priority === 'Low') {

      return t.lowMessage

    }



    return ''

  }



  const getRiskStyle = (priority) => {

    if (priority === 'High') {

      return {

        badge:

          'bg-red-50 text-red-700 border-red-200',

        border: 'border-red-300',

        background: 'bg-red-50',

        dot: 'bg-red-500',

      }

    }



    if (priority === 'Medium') {

      return {

        badge:

          'bg-orange-50 text-orange-700 border-orange-200',

        border: 'border-orange-300',

        background: 'bg-orange-50',

        dot: 'bg-orange-500',

      }

    }



    return {

      badge:

        'bg-green-50 text-green-700 border-green-200',

      border: 'border-green-300',

      background: 'bg-green-50',

      dot: 'bg-green-500',

    }

  }



  // =========================================================

  // STATUS

  // =========================================================



  const getStatusLabel = (status) => {

    if (status === 'Pending') {

      return t.pendingStatus

    }



    if (status === 'In Review') {

      return t.inReview

    }



    if (status === 'Resolved') {

      return t.resolvedStatus

    }



    return status || t.notAvailable

  }



  const getStatusStyle = (status) => {

    if (status === 'Resolved') {

      return 'bg-green-50 text-green-700 border-green-200'

    }



    if (status === 'In Review') {

      return 'bg-blue-50 text-blue-700 border-blue-200'

    }



    return 'bg-yellow-50 text-yellow-700 border-yellow-200'

  }



  // =========================================================

  // COUNTS

  // =========================================================



  const totalCases = reports.length



  const highRiskCases = reports.filter(

    (report) =>

      report.priority === 'High'

  ).length



  const pendingCases = reports.filter(

    (report) =>

      report.status === 'Pending'

  ).length



  const resolvedCases = reports.filter(

    (report) =>

      report.status === 'Resolved'

  ).length



  // =========================================================

  // PROGRESS

  // =========================================================



  const getProgressStep = (report) => {

    if (report.status === 'Resolved') {

      return 4

    }



    if (

      report.treatment_history &&

      report.treatment_history !==

        'No treatment recorded'

    ) {

      return 4

    }



    if (

      report.assigned_vet &&

      report.assigned_vet !==

        'Not Assigned'

    ) {

      return 3

    }



    if (report.priority) {

      return 2

    }



    return 1

  }



  // =========================================================

  // WEATHER ICON

  // =========================================================



  const getWeatherIcon = (condition) => {

    const value =

      condition?.toLowerCase() || ''



    if (value.includes('rain')) return '🌧️'

    if (value.includes('thunder')) return '⛈️'

    if (value.includes('cloud')) return '☁️'

    if (value.includes('snow')) return '❄️'

    if (value.includes('clear')) return '☀️'

    if (value.includes('mist')) return '🌫️'

    if (value.includes('fog')) return '🌫️'

    if (value.includes('haze')) return '🌫️'



    return '🌤️'

  }



  // =========================================================


  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f9f8] px-4 py-8 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 h-8 w-64 animate-pulse rounded-lg bg-slate-200" />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="h-32 animate-pulse rounded-2xl border border-slate-200 bg-white" />
            <div className="h-32 animate-pulse rounded-2xl border border-slate-200 bg-white" />
          </div>
          <div className="mt-6 h-96 animate-pulse rounded-2xl border border-slate-200 bg-white" />
        </div>
      </div>
    )
  }

  const getReportDate = (report) => {
    const value = report?.created_at || report?.report_date || report?.date
    if (!value) return '—'

    const parsed = new Date(value)
    if (Number.isNaN(parsed.getTime())) return value

    return parsed.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  }

  const getStatusPill = (status) => {
    const value = (status || '').toLowerCase()

    if (value === 'resolved') {
      return 'bg-emerald-50 text-emerald-700 border-emerald-100'
    }

    if (value === 'new') {
      return 'bg-blue-50 text-blue-700 border-blue-100'
    }

    if (value.includes('review')) {
      return 'bg-amber-50 text-amber-700 border-amber-100'
    }

    if (value.includes('escalated')) {
      return 'bg-rose-50 text-rose-700 border-rose-100'
    }

    return 'bg-slate-50 text-slate-700 border-slate-200'
  }

  const getRiskPill = (priority) => {
    if (priority === 'High') return 'bg-red-50 text-red-700 border-red-100'
    if (priority === 'Medium') return 'bg-amber-50 text-amber-700 border-amber-100'
    return 'bg-emerald-50 text-emerald-700 border-emerald-100'
  }

  const getProgressStepLabel = (report) => {
    const step = getProgressStep(report)
    if (step >= 4) return 'Treatment'
    if (step >= 3) return 'Veterinary Review'
    if (step >= 2) return 'Risk Assessed'
    return 'Report Submitted'
  }

  // =========================================================
  // CASE DETAIL VIEW
  // =========================================================

  if (selectedReport) {
    const report = selectedReport
    const symptoms = getSymptoms(report.symptoms)
    const hasGPS =
      report.latitude !== null &&
      report.latitude !== undefined &&
      report.longitude !== null &&
      report.longitude !== undefined
    const isMortality = report.report_type === 'mortality'
    const riskStyle = getRiskStyle(report.priority)
    const progressStep = getProgressStep(report)

    return (
      <div className="min-h-screen bg-[#f7f9f8] text-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
          {/* Back */}
          <button
            type="button"
            onClick={() => setSelectedReport(null)}
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-green-700"
          >
            <span className="text-lg">←</span>
            Back to Dashboard
          </button>

          {/* Detail header */}
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                  {isMortality ? 'Mortality Report' : getAnimalName(report.animal_type)}
                  <span className="ml-2 text-slate-400">· Case #{report.id}</span>
                </h1>

                {report.priority && (
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${getRiskPill(
                      report.priority
                    )}`}
                  >
                    {getRiskLabel(report.priority)}
                  </span>
                )}

                {report.status && (
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${getStatusPill(
                      report.status
                    )}`}
                  >
                    {getStatusLabel(report.status)}
                  </span>
                )}
              </div>

              <p className="mt-2 text-sm text-slate-500">
                Reported {getReportDate(report)}
                {report.location ? ` · ${report.location}` : ''}
              </p>
            </div>

            <a
              href={`tel:${VETERINARY_TEAM_PHONE}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700"
            >
              <span>☎</span>
              {t.callTeam}
            </a>
          </div>

          {/* Main detail grid */}
          <div className="grid gap-5 lg:grid-cols-[180px_minmax(0,1fr)]">
            {/* Animal */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div
                className={`flex h-28 items-center justify-center rounded-xl ${
                  isMortality ? 'bg-red-50' : 'bg-green-50'
                }`}
              >
                <span className="text-5xl">
                  {isMortality ? '!' : getAnimalIcon(report.animal_type)}
                </span>
              </div>

              <div className="mt-5 space-y-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                    Animal Type
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {isMortality ? 'Mortality' : getAnimalName(report.animal_type)}
                  </p>
                </div>

                {!isMortality && (
                  <>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                        {t.age}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-800">
                        {report.animal_age ?? t.notAvailable}{' '}
                        {report.animal_age !== null && report.animal_age !== undefined
                          ? t.years
                          : ''}
                      </p>
                    </div>

                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                        Status
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-800">
                        {getStatusLabel(report.status)}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </section>

            <div className="grid gap-5 md:grid-cols-2">
              {/* Symptoms */}
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="text-sm font-bold text-slate-900">Symptoms</h2>

                <div className="mt-4 flex flex-wrap gap-2">
                  {symptoms.length > 0 ? (
                    symptoms.map((symptom) => (
                      <span
                        key={symptom}
                        className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700"
                      >
                        {getSymptomName(symptom)}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-slate-400">{t.notAvailable}</span>
                  )}
                </div>
              </section>

              {/* Location */}
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="text-sm font-bold text-slate-900">{t.location}</h2>
                <p className="mt-4 text-sm font-medium text-slate-700">
                  {report.location || t.notAvailable}
                </p>

                {hasGPS && (
                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    {t.gps}: {report.latitude}, {report.longitude}
                  </p>
                )}
              </section>

              {/* Risk */}
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-sm font-bold text-slate-900">Risk Assessment</h2>
                  {report.priority && (
                    <span
                      className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${riskStyle.badge}`}
                    >
                      {getRiskLabel(report.priority)}
                    </span>
                  )}
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {getRiskMessage(report.priority) || t.notAvailable}
                </p>
              </section>

              {/* Vaccination */}
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="text-sm font-bold text-slate-900">{t.vaccination}</h2>
                <p className="mt-4 text-sm font-semibold text-slate-700">
                  {report.vaccination_status || t.notAvailable}
                </p>
              </section>

              {/* Treatment */}
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="text-sm font-bold text-slate-900">{t.treatment}</h2>
                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {report.treatment_history &&
                  report.treatment_history !== 'No treatment recorded'
                    ? report.treatment_history
                    : t.noTreatment}
                </p>
              </section>

              {/* Veterinarian */}
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="text-sm font-bold text-slate-900">{t.veterinarian}</h2>
                <p className="mt-4 text-sm font-semibold text-slate-700">
                  {report.assigned_vet &&
                  report.assigned_vet !== 'Not Assigned'
                    ? report.assigned_vet
                    : t.notAssigned}
                </p>
              </section>

              {/* Mortality */}
              {isMortality && (
                <section className="rounded-2xl border border-red-100 bg-red-50/40 p-5 shadow-sm md:col-span-2">
                  <h2 className="text-sm font-bold text-red-800">Mortality Details</h2>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                      ['Animals died', report.death_count || '—'],
                      ['Date', report.death_date || '—'],
                      ['Time', report.death_time || '—'],
                      ['Suspected cause', report.suspected_cause || t.notAvailable],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-xl border border-red-100 bg-white p-3">
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                          {label}
                        </p>
                        <p className="mt-1 text-sm font-semibold text-slate-800">{value}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Progress */}
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:col-span-2">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-sm font-bold text-slate-900">Case Progress</h2>
                  <span className="text-xs font-medium text-slate-400">
                    {getProgressStepLabel(report)}
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-4 gap-2">
                  {[
                    [1, t.submitted],
                    [2, t.riskAssessed],
                    [3, t.vetReview],
                    [4, t.treatmentStarted],
                  ].map(([step, label]) => (
                    <div key={step} className="relative text-center">
                      <div
                        className={`mx-auto flex h-9 w-9 items-center justify-center rounded-full border-2 text-xs font-bold ${
                          progressStep >= step
                            ? 'border-green-600 bg-green-600 text-white'
                            : 'border-slate-200 bg-white text-slate-400'
                        }`}
                      >
                        {progressStep >= step ? '✓' : step}
                      </div>
                      <p className="mx-auto mt-2 max-w-[110px] text-[10px] font-medium leading-4 text-slate-500 sm:text-xs">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // =========================================================
  // DASHBOARD
  // =========================================================

  return (
    <div className="min-h-screen bg-[#f7f9f8] text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8 lg:py-7">

        {/* Header */}
        <header className="mb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-1 text-sm font-semibold text-green-700">PashuMitra</p>
              <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                {t.title}
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                {t.description}
              </p>
            </div>

            {weather && (
              <div className="flex items-center gap-3 rounded-xl border border-slate-300 bg-white px-4 py-3">
                <span className="text-xl">{getWeatherIcon(weather.weather)}</span>
                <div>
                  <p className="text-xs font-medium text-slate-400">
                    {weather.location || 'Local weather'}
                  </p>
                  <p className="text-lg font-bold text-slate-900">
                    {Math.round(weather.temperature)}°C
                    <span className="ml-2 text-xs font-medium text-slate-500">
                      {weather.description}
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Summary cards */}
        <section className="mb-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-400 bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  {t.totalCases}
                </p>
                <p className="mt-2 text-3xl font-bold tracking-tight text-green-700">
                  {totalCases}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Total animal health reports
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-green-200 bg-green-50 text-xl text-green-700">
                ▤
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-400 bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  {t.highRisk}
                </p>
                <p className="mt-2 text-3xl font-bold tracking-tight text-red-600">
                  {highRiskCases}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Cases need attention
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-xl text-red-600">
                !
              </div>
            </div>
          </div>
        </section>

        {/* Weather context */}
        {weather && !weatherLoading && (
          <section className="mb-5 rounded-2xl border border-slate-300 bg-[#e8f4ff] px-5 py-4">
            <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
              <div className="min-w-[150px]">
                <p className="text-sm font-bold text-slate-800">Weather context</p>
                <p className="mt-1 text-xs text-slate-500">
                  Environmental conditions near the reported location
                </p>
              </div>

              <div className="h-10 w-px bg-slate-300" />

              <div>
                <p className="text-xs text-slate-500">{t.feelsLike}</p>
                <p className="mt-1 text-sm font-bold text-slate-800">
                  {Math.round(weather.feels_like)}°C
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">{t.humidity}</p>
                <p className="mt-1 text-sm font-bold text-slate-800">
                  {weather.humidity}%
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">{t.wind}</p>
                <p className="mt-1 text-sm font-bold text-slate-800">
                  {weather.wind_speed} m/s
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">{t.clouds}</p>
                <p className="mt-1 text-sm font-bold text-slate-800">
                  {weather.cloudiness}%
                </p>
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              {t.environmentalNote}
            </p>
          </section>
        )}

        {weatherError && (
          <div className="mb-5 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            {weatherError}
          </div>
        )}

        {/* Recent reports */}
        <section className="overflow-hidden rounded-2xl border border-slate-400 bg-white">
          <div className="flex flex-col gap-2 border-b border-slate-300 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-950">
                Recent Reports
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Select a case to view its full health record.
              </p>
            </div>

            <span className="text-sm font-semibold text-green-700">
              {totalCases} total cases
            </span>
          </div>

          {reports.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-slate-400">
                ▤
              </div>
              <h3 className="mt-4 font-semibold text-slate-800">
                {t.noReports}
              </h3>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <div className="min-w-[820px]">

                {/* Column headings */}
                <div className="grid grid-cols-[1.45fr_1.45fr_0.75fr_1fr_0.9fr_36px] items-center border-b border-slate-300 bg-slate-50 px-5 py-3 text-xs font-bold uppercase tracking-wide text-slate-500 sm:px-6">
                  <div>Animal</div>
                  <div>Symptoms</div>
                  <div>Risk Level</div>
                  <div>Status</div>
                  <div>Date</div>
                  <div />
                </div>

                {/* Report rows */}
                <div>
                  {reports.slice(0, 8).map((report) => {
                    const isMortality = report.report_type === 'mortality'
                    const symptoms = getSymptoms(report.symptoms)

                    return (
                      <div
                        key={report.id}
                        role="button"
                        tabIndex={0}
                        onClick={() => setSelectedReport(report)}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault()
                            setSelectedReport(report)
                          }
                        }}
                        className="group grid cursor-pointer grid-cols-[1.45fr_1.45fr_0.75fr_1fr_0.9fr_36px] items-center border-b border-slate-200 px-5 py-4 transition hover:bg-slate-50 sm:px-6"
                      >
                        {/* Animal */}
                        <div className="flex min-w-0 items-center gap-3 pr-4">
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${
                              isMortality
                                ? 'border-red-100 bg-red-50'
                                : 'border-green-100 bg-green-50'
                            } text-lg`}
                          >
                            {isMortality ? '!' : getAnimalIcon(report.animal_type)}
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-800">
                              {isMortality
                                ? 'Mortality Report'
                                : getAnimalName(report.animal_type)}
                            </p>
                            <p className="text-xs text-slate-400">
                              Case #{report.id}
                            </p>
                          </div>
                        </div>

                        {/* Symptoms */}
                        <div className="min-w-0 pr-4">
                          <p className="truncate text-sm text-slate-600">
                            {symptoms[0]
                              ? getSymptomName(symptoms[0])
                              : isMortality
                                ? `${report.death_count || 1} animal(s) reported dead`
                                : t.notAvailable}
                          </p>
                        </div>

                        {/* Risk */}
                        <div>
                          {report.priority ? (
                            <span
                              className={`inline-flex rounded-md border px-2.5 py-1 text-xs font-semibold ${getRiskPill(
                                report.priority
                              )}`}
                            >
                              {getRiskLabel(report.priority).replace(' Risk', '')}
                            </span>
                          ) : (
                            <span className="text-xs text-slate-400">—</span>
                          )}
                        </div>

                        {/* Status */}
                        <div>
                          <span
                            className={`inline-flex rounded-md border px-2.5 py-1 text-xs font-semibold ${getStatusPill(
                              report.status
                            )}`}
                          >
                            {getStatusLabel(report.status)}
                          </span>
                        </div>

                        {/* Date */}
                        <div className="text-sm text-slate-500">
                          {getReportDate(report)}
                        </div>

                        {/* Open */}
                        <div className="text-lg text-slate-300 transition group-hover:text-green-600">
                          →
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </section>

        {reports.length > 8 && (
          <p className="mt-3 text-center text-xs text-slate-400">
            Showing the latest 8 reports. Use the Reports/Health Records section for the complete history.
          </p>
        )}
      </div>
    </div>
  )
}

export default FarmerDashboard
