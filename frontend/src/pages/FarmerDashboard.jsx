import { useEffect, useState } from 'react'
import API_BASE_URL from "../config";

const VETERINARY_TEAM_PHONE = '+916261349321'

function FarmerDashboard({ language }) {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)

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
        setLoading(true)

        const response = await fetch(
          '`${API_BASE_URL}/reports`'
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

    const interval = setInterval(
      fetchReports,
      10000
    )

    return () => clearInterval(interval)
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
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-6xl mx-auto">

          <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center shadow-sm">

            <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto"></div>

            <p className="text-slate-600 mt-4 font-medium">
              {t.loading}
            </p>

          </div>

        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">

        {/* =====================================================
            PAGE HEADER
        ===================================================== */}

        <div className="mb-7">

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">

            <div>

              <div className="flex items-center gap-3">

                <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center text-2xl">
                  🐄
                </div>

                <div>

                  <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                    {t.title}
                  </h1>

                  <p className="text-sm text-slate-500 mt-1">
                    {t.description}
                  </p>

                </div>

              </div>

            </div>

            <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-200 px-3 py-2 rounded-lg">

              <span className="w-2 h-2 bg-green-500 rounded-full"></span>

              {t.liveData}

            </div>

          </div>

        </div>

        {/* =====================================================
            SUMMARY CARDS
        ===================================================== */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">
                  {t.totalCases}
                </p>

                <p className="text-3xl font-bold text-slate-800 mt-2">
                  {totalCases}
                </p>

              </div>

              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-xl">
                📋
              </div>

            </div>

          </div>

          <div className="bg-white border border-red-100 rounded-xl p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">
                  {t.highRisk}
                </p>

                <p className="text-3xl font-bold text-red-600 mt-2">
                  {highRiskCases}
                </p>

              </div>

              <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-xl">
                🚨
              </div>

            </div>

          </div>

          <div className="bg-white border border-yellow-100 rounded-xl p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">
                  {t.pending}
                </p>

                <p className="text-3xl font-bold text-yellow-600 mt-2">
                  {pendingCases}
                </p>

              </div>

              <div className="w-10 h-10 rounded-lg bg-yellow-50 flex items-center justify-center text-xl">
                ⏳
              </div>

            </div>

          </div>

          <div className="bg-white border border-green-100 rounded-xl p-5 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">
                  {t.resolved}
                </p>

                <p className="text-3xl font-bold text-green-600 mt-2">
                  {resolvedCases}
                </p>

              </div>

              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-xl">
                ✓
              </div>

            </div>

          </div>

        </div>

        {/* =====================================================
            LOCAL WEATHER
        ===================================================== */}

        <div className="bg-white rounded-2xl border border-sky-200 shadow-sm p-5 md:p-6 mb-8">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

            <div>

              <div className="flex items-start gap-3">

                <div className="w-12 h-12 rounded-xl bg-sky-100 border border-sky-200 flex items-center justify-center text-2xl shrink-0">
                  {weather
                    ? getWeatherIcon(weather.weather)
                    : '🌦️'}
                </div>

                <div>

                  <h2 className="text-xl font-bold text-slate-800">
                    {t.weatherTitle}
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    {weather?.location
                      ? `${weather.location} • ${t.weatherSubtitle}`
                      : t.weatherSubtitle}
                  </p>

                </div>

              </div>

            </div>

            {weatherLoading ? (

              <div className="flex items-center gap-2 text-sm text-slate-500">

                <div className="w-5 h-5 border-2 border-sky-200 border-t-sky-600 rounded-full animate-spin"></div>

                {t.weatherLoading}

              </div>

            ) : weather ? (

              <div className="text-right">

                <div className="text-4xl font-bold text-slate-800">
                  {Math.round(weather.temperature)}°C
                </div>

                <p className="text-sm text-slate-500 capitalize mt-1">
                  {weather.description}
                </p>

              </div>

            ) : null}

          </div>

          {weather && !weatherLoading && (

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">

              <div className="bg-sky-50 border border-sky-100 rounded-xl p-4">

                <p className="text-xs text-slate-500 font-semibold">
                  {t.feelsLike}
                </p>

                <p className="text-lg font-bold text-slate-800 mt-1">
                  {Math.round(weather.feels_like)}°C
                </p>

              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">

                <p className="text-xs text-slate-500 font-semibold">
                  {t.humidity}
                </p>

                <p className="text-lg font-bold text-slate-800 mt-1">
                  {weather.humidity}%
                </p>

              </div>

              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">

                <p className="text-xs text-slate-500 font-semibold">
                  {t.wind}
                </p>

                <p className="text-lg font-bold text-slate-800 mt-1">
                  {weather.wind_speed} m/s
                </p>

              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">

                <p className="text-xs text-slate-500 font-semibold">
                  {t.clouds}
                </p>

                <p className="text-lg font-bold text-slate-800 mt-1">
                  {weather.cloudiness}%
                </p>

              </div>

            </div>

          )}

          {weatherError && (

            <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3 text-sm text-yellow-800">
              {weatherError}
            </div>

          )}

          <div className="mt-4 text-xs text-slate-400">
            ℹ️ {t.environmentalNote}
          </div>

        </div>

        {/* =====================================================
            VETERINARY SUPPORT
        ===================================================== */}

        <div className="bg-white rounded-2xl border-2 border-green-200 shadow-sm p-5 md:p-6 mb-8">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

            <div>

              <div className="flex items-start gap-3">

                <div className="w-11 h-11 rounded-xl bg-green-100 border-2 border-green-200 flex items-center justify-center text-xl shrink-0">
                  👨‍⚕️
                </div>

                <div>

                  <h2 className="text-xl font-bold text-slate-800">
                    {t.veterinarySupport}
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    {t.veterinarySupportText}
                  </p>

                </div>

              </div>

            </div>

            <div className="flex flex-col sm:flex-row gap-3">

              <a
                href={`tel:${VETERINARY_TEAM_PHONE}`}
                className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-3 rounded-xl border-2 border-green-700 transition"
              >
                📞 {t.callTeam}
              </a>

              <button
                type="button"
                onClick={() =>
                  alert(t.callbackReceived)
                }
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-green-50 text-green-700 font-semibold px-5 py-3 rounded-xl border-2 border-green-300 transition"
              >
                🔔 {t.requestCallback}
              </button>

              <button
                type="button"
                onClick={() =>
                  alert(t.emergencyText)
                }
                className="inline-flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-700 font-semibold px-5 py-3 rounded-xl border-2 border-red-300 transition"
              >
                🚨 {t.emergencyHelp}
              </button>

            </div>

          </div>

        </div>

        {/* =====================================================
            RECENT CASES HEADER
        ===================================================== */}

        <div className="flex items-center justify-between mb-4">

          <div>

            <h2 className="text-xl font-bold text-slate-800">
              {t.recentCases}
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              {totalCases} {t.totalCases.toLowerCase()}
            </p>

          </div>

        </div>

        {/* =====================================================
            NO REPORTS
        ===================================================== */}

        {reports.length === 0 ? (

          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm">

            <div className="text-5xl mb-4">
              📋
            </div>

            <h3 className="text-lg font-semibold text-slate-700">
              {t.noReports}
            </h3>

          </div>

        ) : (

          <div className="space-y-5">

            {reports.map((report) => {

              const riskStyle =
                getRiskStyle(
                  report.priority
                )

              const symptoms =
                getSymptoms(
                  report.symptoms
                )

              const progressStep =
                getProgressStep(report)

              const hasGPS =
                report.latitude !== null &&
                report.latitude !== undefined &&
                report.longitude !== null &&
                report.longitude !== undefined

              return (

                <div
                  key={report.id}
                  className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden"
                >

                  {/* CASE HEADER */}

                  <div className="p-5 md:p-6">

                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                      <div className="flex items-center gap-4">

                        <div className="w-14 h-14 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center text-3xl">
                          {getAnimalIcon(
                            report.animal_type
                          )}
                        </div>

                        <div>

                          <div className="flex flex-wrap items-center gap-2">

                            <h3 className="text-xl font-bold text-slate-800">
                              {getAnimalName(
                                report.animal_type
                              )}
                            </h3>

                            <span className="text-xs text-slate-400">
                              Case #{report.id}
                            </span>

                          </div>

                          <p className="text-sm text-slate-500 mt-1">
                            {t.age}:{' '}
                            <span className="font-medium text-slate-700">
                              {report.animal_age}{' '}
                              {t.years}
                            </span>
                          </p>

                        </div>

                      </div>

                      <div className="flex flex-wrap gap-2">

                        <span
                          className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-bold ${riskStyle.badge}`}
                        >

                          <span
                            className={`w-2 h-2 rounded-full ${riskStyle.dot}`}
                          ></span>

                          {getRiskLabel(
                            report.priority
                          )}

                        </span>

                        <span
                          className={`px-3 py-2 rounded-lg border text-xs font-bold ${getStatusStyle(
                            report.status
                          )}`}
                        >
                          {getStatusLabel(
                            report.status
                          )}
                        </span>

                      </div>

                    </div>

                    {/* RISK SUMMARY */}

                    {report.priority && (

                      <div
                        className={`mt-5 border rounded-xl p-4 ${riskStyle.border} ${riskStyle.background}`}
                      >

                        <div className="flex items-start gap-3">

                          <div className="text-xl">
                            {report.priority === 'High'
                              ? '🚨'
                              : report.priority ===
                                'Medium'
                              ? '⚠️'
                              : '✓'}
                          </div>

                          <div>

                            <p className="font-semibold text-slate-800">
                              {t.riskLevel}:{' '}
                              {getRiskLabel(
                                report.priority
                              )}
                            </p>

                            <p className="text-sm text-slate-600 mt-1">
                              {getRiskMessage(
                                report.priority
                              )}
                            </p>

                          </div>

                        </div>

                      </div>

                    )}

                    {/* INFORMATION BOXES */}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">

                      {/* Symptoms */}

                      <div className="border border-slate-200 rounded-xl p-4">

                        <p className="text-xs uppercase tracking-wide font-semibold text-slate-400 mb-3">
                          {t.symptoms}
                        </p>

                        <div className="flex flex-wrap gap-2">

                          {symptoms.length > 0 ? (

                            symptoms.map(
                              (symptom) => (

                                <span
                                  key={symptom}
                                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700"
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

                      {/* Location */}

                      <div className="border border-slate-200 rounded-xl p-4">

                        <p className="text-xs uppercase tracking-wide font-semibold text-slate-400 mb-3">
                          {t.location}
                        </p>

                        <p className="text-sm font-medium text-slate-700">
                          📍{' '}
                          {report.location ||
                            t.notAvailable}
                        </p>

                        <p className="text-xs text-slate-500 mt-2">
                          {t.gps}:{' '}
                          {hasGPS
                            ? `${report.latitude}, ${report.longitude}`
                            : t.notAvailable}
                        </p>

                      </div>

                    </div>

                    {/* CARE INFORMATION */}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">

                      {/* Vaccination */}

                      <div className="border border-slate-200 rounded-xl p-4">

                        <div className="flex items-center gap-2 mb-2">

                          <span className="text-lg">
                            💉
                          </span>

                          <p className="text-xs uppercase tracking-wide font-semibold text-slate-400">
                            {t.vaccination}
                          </p>

                        </div>

                        <p className="text-sm font-semibold text-slate-700">

                          {report.vaccination_status ||
                            t.notAvailable}

                        </p>

                      </div>

                      {/* Treatment */}

                      <div className="border border-slate-200 rounded-xl p-4">

                        <div className="flex items-center gap-2 mb-2">

                          <span className="text-lg">
                            💊
                          </span>

                          <p className="text-xs uppercase tracking-wide font-semibold text-slate-400">
                            {t.treatment}
                          </p>

                        </div>

                        <p className="text-sm font-semibold text-slate-700">

                          {report.treatment_history &&
                          report.treatment_history !==
                            'No treatment recorded'
                            ? report.treatment_history
                            : t.noTreatment}

                        </p>

                      </div>

                      {/* Veterinarian */}

                      <div className="border border-slate-200 rounded-xl p-4">

                        <div className="flex items-center gap-2 mb-2">

                          <span className="text-lg">
                            👨‍⚕️
                          </span>

                          <p className="text-xs uppercase tracking-wide font-semibold text-slate-400">
                            {t.veterinarian}
                          </p>

                        </div>

                        <p className="text-sm font-semibold text-slate-700">

                          {report.assigned_vet &&
                          report.assigned_vet !==
                            'Not Assigned'
                            ? report.assigned_vet
                            : t.notAssigned}

                        </p>

                      </div>

                    </div>

                  </div>

                  {/* CASE JOURNEY */}

                  <div className="border-t border-slate-200 bg-slate-50 px-5 md:px-6 py-5">

                    <p className="text-sm font-semibold text-slate-700 mb-4">
                      {t.status}
                    </p>

                    <div className="grid grid-cols-4 gap-2">

                      {/* Step 1 */}

                      <div className="text-center">

                        <div
                          className={`mx-auto w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${
                            progressStep >= 1
                              ? 'bg-green-600 text-white'
                              : 'bg-slate-200 text-slate-400'
                          }`}
                        >
                          ✓
                        </div>

                        <p className="text-xs text-slate-600 mt-2">
                          {t.submitted}
                        </p>

                      </div>

                      {/* Step 2 */}

                      <div className="text-center">

                        <div
                          className={`mx-auto w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${
                            progressStep >= 2
                              ? 'bg-green-600 text-white'
                              : 'bg-slate-200 text-slate-400'
                          }`}
                        >
                          {progressStep >= 2
                            ? '✓'
                            : '2'}
                        </div>

                        <p className="text-xs text-slate-600 mt-2">
                          {t.riskAssessed}
                        </p>

                      </div>

                      {/* Step 3 */}

                      <div className="text-center">

                        <div
                          className={`mx-auto w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${
                            progressStep >= 3
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-200 text-slate-400'
                          }`}
                        >
                          {progressStep >= 3
                            ? '✓'
                            : '3'}
                        </div>

                        <p className="text-xs text-slate-600 mt-2">
                          {t.vetReview}
                        </p>

                      </div>

                      {/* Step 4 */}

                      <div className="text-center">

                        <div
                          className={`mx-auto w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${
                            progressStep >= 4
                              ? 'bg-green-600 text-white'
                              : 'bg-slate-200 text-slate-400'
                          }`}
                        >
                          {progressStep >= 4
                            ? '✓'
                            : '4'}
                        </div>

                        <p className="text-xs text-slate-600 mt-2">
                          {t.treatmentStarted}
                        </p>

                      </div>

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

export default FarmerDashboard