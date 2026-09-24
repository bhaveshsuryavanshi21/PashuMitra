import { useEffect, useState } from 'react'
import API_BASE_URL from '../config'

import {
  MapContainer,
  TileLayer,
  Popup,
  Circle,
  CircleMarker,
} from 'react-leaflet'

import 'leaflet/dist/leaflet.css'

function OutbreakMap({ language }) {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [riskFilter, setRiskFilter] = useState('All')

  const [weather, setWeather] = useState(null)
  const [weatherLoading, setWeatherLoading] = useState(false)
  const [weatherError, setWeatherError] = useState('')

  const translations = {
    en: {
      title: 'Livestock Disease Surveillance',
      description:
        'Monitor livestock health cases and identify areas showing increased disease risk.',
      liveMonitoring: 'LIVE MONITORING',
      totalCases: 'Total Cases',
      highRisk: 'High Risk',
      mediumRisk: 'Medium Risk',
      lowRisk: 'Low Risk',
      hotspots: 'Hotspots',
      mapTitle: 'Disease Surveillance Map',
      mapDescription:
        'GPS-enabled reports are displayed geographically to identify emerging risk areas.',
      all: 'All',
      high: 'High Risk',
      medium: 'Medium Risk',
      low: 'Low Risk',
      riskLegend: 'Risk Level',
      caseDetails: 'Case Details',
      animal: 'Animal',
      location: 'Location',
      symptoms: 'Symptoms',
      priority: 'Risk Level',
      status: 'Status',
      hotspot: 'Possible Outbreak Hotspot',
      reportsInArea: 'Reports in this area',
      highRiskReports: 'High-risk reports',
      hotspotRadius: 'Detection radius',
      summary: 'Surveillance Overview',
      totalReported: 'Total reported cases',
      casesWithLocation: 'GPS-enabled cases',
      detectedHotspots: 'Detected hotspots',
      monitoringNote:
        'Hotspots are identified when multiple reports occur within the same geographic area.',
      loading: 'Loading surveillance data...',
      noReports: 'No reports available.',
      noFilteredReports: 'No cases match the selected risk level.',
      viewLocation: 'View Location',
      pending: 'Pending',
      inReview: 'In Review',
      resolved: 'Resolved',
      highRiskMeaning: 'Immediate veterinary review recommended.',
      mediumRiskMeaning: 'Veterinary monitoring recommended.',
      lowRiskMeaning: 'Continue monitoring and routine care.',
      weatherTitle: 'Environmental Conditions',
      weatherSubtitle: 'Current weather near the surveillance area.',
      temperature: 'Temperature',
      feelsLike: 'Feels Like',
      humidity: 'Humidity',
      wind: 'Wind',
      clouds: 'Clouds',
      weatherUnavailable: 'Weather information is currently unavailable.',
      weatherLoading: 'Loading weather...',
      environmentalNote:
        'Weather is environmental context only and is not a disease diagnosis.',
    },

    hi: {
      title: 'पशु रोग निगरानी प्रणाली',
      description:
        'पशु स्वास्थ्य मामलों की निगरानी करें और बढ़े हुए रोग जोखिम वाले क्षेत्रों की पहचान करें।',
      liveMonitoring: 'लाइव निगरानी',
      totalCases: 'कुल मामले',
      highRisk: 'उच्च जोखिम',
      mediumRisk: 'मध्यम जोखिम',
      lowRisk: 'कम जोखिम',
      hotspots: 'हॉटस्पॉट',
      mapTitle: 'रोग निगरानी मानचित्र',
      mapDescription:
        'जीपीएस वाले मामलों को मानचित्र पर दिखाया गया है ताकि जोखिम वाले क्षेत्रों की पहचान की जा सके।',
      all: 'सभी',
      high: 'उच्च जोखिम',
      medium: 'मध्यम जोखिम',
      low: 'कम जोखिम',
      riskLegend: 'जोखिम स्तर',
      caseDetails: 'मामले का विवरण',
      animal: 'पशु',
      location: 'स्थान',
      symptoms: 'लक्षण',
      priority: 'जोखिम स्तर',
      status: 'स्थिति',
      hotspot: 'संभावित रोग प्रकोप क्षेत्र',
      reportsInArea: 'इस क्षेत्र में रिपोर्ट',
      highRiskReports: 'उच्च जोखिम वाली रिपोर्ट',
      hotspotRadius: 'पहचान की त्रिज्या',
      summary: 'निगरानी सारांश',
      totalReported: 'कुल रिपोर्ट किए गए मामले',
      casesWithLocation: 'जीपीएस वाले मामले',
      detectedHotspots: 'पहचाने गए हॉटस्पॉट',
      monitoringNote:
        'जब एक ही भौगोलिक क्षेत्र में कई रिपोर्ट दर्ज होती हैं, तो उस क्षेत्र को हॉटस्पॉट माना जाता है।',
      loading: 'निगरानी डेटा लोड हो रहा है...',
      noReports: 'कोई रिपोर्ट उपलब्ध नहीं है।',
      noFilteredReports: 'चयनित जोखिम स्तर के कोई मामले नहीं हैं।',
      viewLocation: 'स्थान देखें',
      pending: 'लंबित',
      inReview: 'समीक्षा में',
      resolved: 'समाधान हुआ',
      highRiskMeaning: 'तुरंत पशु चिकित्सक द्वारा समीक्षा की सलाह दी जाती है।',
      mediumRiskMeaning: 'पशु चिकित्सकीय निगरानी की सलाह दी जाती है।',
      lowRiskMeaning: 'निगरानी और नियमित देखभाल जारी रखें।',
      weatherTitle: 'पर्यावरणीय स्थिति',
      weatherSubtitle: 'निगरानी क्षेत्र के पास वर्तमान मौसम।',
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
      title: 'पशुधन रोग निरीक्षण प्रणाली',
      description:
        'पशुधन आरोग्य प्रकरणांचे निरीक्षण करा आणि वाढलेला रोग जोखीम असलेले भाग ओळखा.',
      liveMonitoring: 'लाइव्ह निरीक्षण',
      totalCases: 'एकूण प्रकरणे',
      highRisk: 'जास्त जोखीम',
      mediumRisk: 'मध्यम जोखीम',
      lowRisk: 'कमी जोखीम',
      hotspots: 'हॉटस्पॉट',
      mapTitle: 'रोग निरीक्षण नकाशा',
      mapDescription:
        'जीपीएस असलेली प्रकरणे नकाशावर दाखवली जातात, ज्यामुळे जोखीम असलेले भाग ओळखता येतात.',
      all: 'सर्व',
      high: 'जास्त जोखीम',
      medium: 'मध्यम जोखीम',
      low: 'कमी जोखीम',
      riskLegend: 'जोखीम पातळी',
      caseDetails: 'प्रकरणाचा तपशील',
      animal: 'प्राणी',
      location: 'ठिकाण',
      symptoms: 'लक्षणे',
      priority: 'जोखीम पातळी',
      status: 'स्थिती',
      hotspot: 'संभाव्य रोग उद्रेक क्षेत्र',
      reportsInArea: 'या भागातील अहवाल',
      highRiskReports: 'जास्त जोखमीचे अहवाल',
      hotspotRadius: 'ओळख त्रिज्या',
      summary: 'निरीक्षण सारांश',
      totalReported: 'एकूण नोंदवलेली प्रकरणे',
      casesWithLocation: 'जीपीएस असलेली प्रकरणे',
      detectedHotspots: 'ओळखलेले हॉटस्पॉट',
      monitoringNote:
        'एकाच भौगोलिक भागात अनेक अहवाल आढळल्यास त्या भागाला हॉटस्पॉट म्हणून ओळखले जाते.',
      loading: 'निरीक्षण डेटा लोड होत आहे...',
      noReports: 'कोणतेही अहवाल उपलब्ध नाहीत.',
      noFilteredReports: 'निवडलेल्या जोखीम पातळीची कोणतीही प्रकरणे नाहीत.',
      viewLocation: 'ठिकाण पहा',
      pending: 'प्रलंबित',
      inReview: 'पुनरावलोकनात',
      resolved: 'निराकरण झाले',
      highRiskMeaning: 'तात्काळ पशुवैद्यकीय तपासणीची शिफारस केली जाते.',
      mediumRiskMeaning: 'पशुवैद्यकीय निरीक्षणाची शिफारस केली जाते.',
      lowRiskMeaning: 'निरीक्षण आणि नियमित काळजी सुरू ठेवा.',
      weatherTitle: 'पर्यावरणीय स्थिती',
      weatherSubtitle: 'निरीक्षण क्षेत्राजवळील सध्याचे हवामान.',
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

  // Fetch reports
  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true)

        const response = await fetch(`${API_BASE_URL}/reports`)

        if (!response.ok) {
          throw new Error('Failed to fetch reports')
        }

        const data = await response.json()
        setReports(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error('Failed to fetch map reports:', error)
        setReports([])
      } finally {
        setLoading(false)
      }
    }

    fetchReports()
  }, [])

  // GPS reports
  const gpsReports = reports.filter(
    (report) =>
      report.latitude != null &&
      report.longitude != null &&
      !Number.isNaN(Number(report.latitude)) &&
      !Number.isNaN(Number(report.longitude))
  )

  // Fetch weather using the first/latest GPS report
  useEffect(() => {
    if (gpsReports.length === 0) {
      setWeather(null)
      setWeatherError('')
      return
    }

    const latestGPSReport = gpsReports[0]
    const latitude = Number(latestGPSReport.latitude)
    const longitude = Number(latestGPSReport.longitude)

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
      } catch (error) {
        console.error('Failed to fetch surveillance weather:', error)
        setWeather(null)
        setWeatherError(t.weatherUnavailable)
      } finally {
        setWeatherLoading(false)
      }
    }

    fetchWeather()
  }, [gpsReports.length, t.weatherUnavailable])

  // Risk counts
  const highRiskCount = reports.filter(
    (report) => report.priority === 'High'
  ).length

  const mediumRiskCount = reports.filter(
    (report) => report.priority === 'Medium'
  ).length

  const lowRiskCount = reports.filter(
    (report) => report.priority === 'Low'
  ).length

  // Hotspot detection
  const HOTSPOT_RADIUS_KM = 5
  const MIN_REPORTS_FOR_HOTSPOT = 3

  const calculateDistanceKm = (lat1, lon1, lat2, lon2) => {
    const earthRadiusKm = 6371

    const toRadians = (value) => (value * Math.PI) / 180

    const dLat = toRadians(lat2 - lat1)
    const dLon = toRadians(lon2 - lon1)

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) ** 2

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    return earthRadiusKm * c
  }

  const hotspotCandidates = gpsReports.map((report) => ({
    ...report,
    latitude: Number(report.latitude),
    longitude: Number(report.longitude),
  }))

  const visitedReports = new Set()
  const hotspotAreas = []

  hotspotCandidates.forEach((startingReport, startingIndex) => {
    if (visitedReports.has(startingIndex)) {
      return
    }

    const cluster = []
    const queue = [startingIndex]

    visitedReports.add(startingIndex)

    while (queue.length > 0) {
      const currentIndex = queue.shift()
      const currentReport = hotspotCandidates[currentIndex]

      cluster.push(currentReport)

      hotspotCandidates.forEach((candidateReport, candidateIndex) => {
        if (visitedReports.has(candidateIndex)) {
          return
        }

        const distance = calculateDistanceKm(
          currentReport.latitude,
          currentReport.longitude,
          candidateReport.latitude,
          candidateReport.longitude
        )

        if (distance <= HOTSPOT_RADIUS_KM) {
          visitedReports.add(candidateIndex)
          queue.push(candidateIndex)
        }
      })
    }

    if (cluster.length >= MIN_REPORTS_FOR_HOTSPOT) {
      const averageLatitude =
        cluster.reduce((sum, report) => sum + report.latitude, 0) /
        cluster.length

      const averageLongitude =
        cluster.reduce((sum, report) => sum + report.longitude, 0) /
        cluster.length

      const clusterHighRiskCount = cluster.filter(
        (report) => report.priority === 'High'
      ).length

      hotspotAreas.push({
        latitude: averageLatitude,
        longitude: averageLongitude,
        count: cluster.length,
        highRiskCount: clusterHighRiskCount,
      })
    }
  })

  // Filtered reports
  const filteredReports =
    riskFilter === 'All'
      ? gpsReports
      : gpsReports.filter((report) => report.priority === riskFilter)

  // Status translation
  const getStatusLabel = (status) => {
    if (status === 'Pending') return t.pending
    if (status === 'In Review') return t.inReview
    if (status === 'Resolved') return t.resolved
    return status || t.pending
  }

  // Risk helpers
  const getRiskColor = (priority) => {
    if (priority === 'High') return '#ef4444'
    if (priority === 'Medium') return '#f97316'
    return '#22c55e'
  }

  const getRiskBg = (priority) => {
    if (priority === 'High') {
      return 'bg-red-50 border-red-200 text-red-700'
    }

    if (priority === 'Medium') {
      return 'bg-orange-50 border-orange-200 text-orange-700'
    }

    return 'bg-green-50 border-green-200 text-green-700'
  }

  const getRiskMeaning = (priority) => {
    if (priority === 'High') return t.highRiskMeaning
    if (priority === 'Medium') return t.mediumRiskMeaning
    return t.lowRiskMeaning
  }

  const getWeatherIcon = (condition) => {
    const value = condition?.toLowerCase() || ''

    if (value.includes('thunder')) return '⛈️'
    if (value.includes('rain')) return '🌧️'
    if (value.includes('cloud')) return '☁️'
    if (value.includes('snow')) return '❄️'
    if (value.includes('clear')) return '☀️'
    if (
      value.includes('mist') ||
      value.includes('fog') ||
      value.includes('haze')
    ) {
      return '🌫️'
    }

    return '🌤️'
  }

  const openMapLocation = (latitude, longitude) => {
    window.open(
      `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=15/${latitude}/${longitude}`,
      '_blank'
    )
  }

  const filterButtonClass = (filter) => {
    if (riskFilter !== filter) {
      return 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
    }

    if (filter === 'High') {
      return 'bg-red-600 text-white border-red-600'
    }

    if (filter === 'Medium') {
      return 'bg-orange-500 text-white border-orange-500'
    }

    if (filter === 'Low') {
      return 'bg-green-600 text-white border-green-600'
    }

    return 'bg-slate-800 text-white border-slate-800'
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-7">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-green-50 border border-green-100 flex items-center justify-center text-2xl">
                🗺️
              </div>

              <div>
                <div className="text-xs font-bold tracking-[0.18em] text-green-700 uppercase">
                  PASHUMITRA • SURVEILLANCE
                </div>

                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mt-1">
                  {t.title}
                </h1>
              </div>
            </div>

            <p className="text-sm text-slate-500 max-w-3xl">
              {t.description}
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white border border-green-100 rounded-full px-4 py-2 shadow-sm">
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-bold text-green-700">
              {t.liveMonitoring}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <p className="text-sm text-slate-500">{t.totalCases}</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">
              {reports.length}
            </p>
          </div>

          <div className="bg-white border border-red-100 rounded-2xl p-5 shadow-sm">
            <p className="text-sm text-slate-500">{t.highRisk}</p>
            <p className="text-3xl font-bold text-red-600 mt-2">
              {highRiskCount}
            </p>
          </div>

          <div className="bg-white border border-orange-100 rounded-2xl p-5 shadow-sm">
            <p className="text-sm text-slate-500">{t.mediumRisk}</p>
            <p className="text-3xl font-bold text-orange-500 mt-2">
              {mediumRiskCount}
            </p>
          </div>

          <div className="bg-white border border-purple-100 rounded-2xl p-5 shadow-sm">
            <p className="text-sm text-slate-500">{t.hotspots}</p>
            <p className="text-3xl font-bold text-purple-600 mt-2">
              {hotspotAreas.length}
            </p>
          </div>
        </div>

        {/* Weather */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 mb-6 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-2xl">
                {weather ? getWeatherIcon(weather.weather) : '🌦️'}
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {t.weatherTitle}
                </h2>

                <p className="text-xs text-slate-500 mt-1">
                  {weather?.location
                    ? `${weather.location} • ${t.weatherSubtitle}`
                    : t.weatherSubtitle}
                </p>
              </div>
            </div>

            {weatherLoading ? (
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <div className="w-5 h-5 border-2 border-sky-200 border-t-sky-500 rounded-full animate-spin" />
                {t.weatherLoading}
              </div>
            ) : weather ? (
              <div className="text-right">
                <div className="text-3xl font-bold text-slate-900">
                  {Math.round(weather.temperature)}°C
                </div>
                <p className="text-xs text-slate-500 capitalize mt-1">
                  {weather.description}
                </p>
              </div>
            ) : null}
          </div>

          {weather && !weatherLoading && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <p className="text-xs text-slate-500">{t.feelsLike}</p>
                <p className="text-lg font-bold text-slate-900 mt-1">
                  {Math.round(weather.feels_like)}°C
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <p className="text-xs text-slate-500">{t.humidity}</p>
                <p className="text-lg font-bold text-slate-900 mt-1">
                  {weather.humidity}%
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <p className="text-xs text-slate-500">{t.wind}</p>
                <p className="text-lg font-bold text-slate-900 mt-1">
                  {weather.wind_speed} m/s
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <p className="text-xs text-slate-500">{t.clouds}</p>
                <p className="text-lg font-bold text-slate-900 mt-1">
                  {weather.cloudiness}%
                </p>
              </div>
            </div>
          )}

          {weatherError && (
            <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3 text-sm text-yellow-700">
              {weatherError}
            </div>
          )}

          <div className="mt-4 text-xs text-slate-400">
            ℹ️ {t.environmentalNote}
          </div>
        </div>

        {/* Map panel */}
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
          <div className="p-5 md:p-6 border-b border-slate-200">
            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold text-slate-900">
                    {t.mapTitle}
                  </h2>

                  <span className="bg-green-50 text-green-700 border border-green-100 text-xs font-bold px-3 py-1 rounded-full">
                    {gpsReports.length} GPS
                  </span>
                </div>

                <p className="text-sm text-slate-500 mt-1">
                  {t.mapDescription}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setRiskFilter('All')}
                  className={`px-4 py-2 rounded-lg border text-xs font-bold transition ${filterButtonClass(
                    'All'
                  )}`}
                >
                  {t.all}
                </button>

                <button
                  type="button"
                  onClick={() => setRiskFilter('High')}
                  className={`px-4 py-2 rounded-lg border text-xs font-bold transition ${filterButtonClass(
                    'High'
                  )}`}
                >
                  🔴 {t.high}
                </button>

                <button
                  type="button"
                  onClick={() => setRiskFilter('Medium')}
                  className={`px-4 py-2 rounded-lg border text-xs font-bold transition ${filterButtonClass(
                    'Medium'
                  )}`}
                >
                  🟠 {t.medium}
                </button>

                <button
                  type="button"
                  onClick={() => setRiskFilter('Low')}
                  className={`px-4 py-2 rounded-lg border text-xs font-bold transition ${filterButtonClass(
                    'Low'
                  )}`}
                >
                  🟢 {t.low}
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-5 mt-5 pt-4 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-500">
                {t.riskLegend}
              </span>

              <div className="flex items-center gap-2 text-xs text-slate-600">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                {t.highRisk}
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-600">
                <span className="w-3 h-3 rounded-full bg-orange-500" />
                {t.mediumRisk}
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-600">
                <span className="w-3 h-3 rounded-full bg-green-500" />
                {t.lowRisk}
              </div>

              <div className="text-xs text-slate-400 ml-auto">
                Showing: {filteredReports.length}
              </div>
            </div>
          </div>

          <div className="p-3 md:p-4 bg-slate-50">
            <div className="rounded-2xl overflow-hidden border border-slate-200">
              {loading ? (
                <div className="h-[540px] flex items-center justify-center bg-white">
                  <div className="text-center">
                    <div className="text-5xl mb-4">🛰️</div>
                    <p className="text-slate-500">{t.loading}</p>
                  </div>
                </div>
              ) : gpsReports.length === 0 ? (
                <div className="h-[540px] flex items-center justify-center bg-white">
                  <div className="text-center">
                    <div className="text-5xl mb-4">📍</div>
                    <p className="font-semibold text-slate-700">
                      {t.noReports}
                    </p>
                    <p className="text-sm text-slate-400 mt-1">
                      No GPS-enabled cases are available.
                    </p>
                  </div>
                </div>
              ) : filteredReports.length === 0 ? (
                <div className="h-[540px] flex items-center justify-center bg-white">
                  <div className="text-center">
                    <div className="text-5xl mb-4">🔎</div>
                    <p className="font-semibold text-slate-700">
                      {t.noFilteredReports}
                    </p>
                  </div>
                </div>
              ) : (
                <MapContainer
                  center={[23.2514, 77.5003]}
                  zoom={7}
                  style={{ height: '540px', width: '100%' }}
                >
                  <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

                  {filteredReports.map((report, index) => (
                    <CircleMarker
                      key={report.id ?? `${report.latitude}-${report.longitude}-${index}`}
                      center={[
                        Number(report.latitude),
                        Number(report.longitude),
                      ]}
                      radius={9}
                      pathOptions={{
                        color: getRiskColor(report.priority),
                        fillColor: getRiskColor(report.priority),
                        fillOpacity: 0.9,
                        weight: 3,
                      }}
                    >
                      <Popup>
                        <div className="min-w-[230px]">
                          <div className="flex items-center justify-between gap-3 mb-3">
                            <strong className="text-base">
                              🐄 {report.animal_type || report.animalType || 'Animal'}
                            </strong>

                            <span
                              className={`text-xs font-bold px-2 py-1 rounded-full border ${getRiskBg(
                                report.priority
                              )}`}
                            >
                              {report.priority || 'Low'}
                            </span>
                          </div>

                          <div className="space-y-2 text-sm">
                            <p>
                              <strong>{t.location}:</strong>{' '}
                              {report.location || '—'}
                            </p>

                            <p>
                              <strong>{t.symptoms}:</strong>{' '}
                              {Array.isArray(report.symptoms)
                                ? report.symptoms.join(', ')
                                : report.symptoms || '—'}
                            </p>

                            <p>
                              <strong>{t.priority}:</strong>{' '}
                              {report.priority || 'Low'}
                            </p>

                            <p>
                              <strong>{t.status}:</strong>{' '}
                              {getStatusLabel(report.status)}
                            </p>
                          </div>

                          <div
                            className={`mt-3 rounded-lg border p-2 text-xs ${getRiskBg(
                              report.priority
                            )}`}
                          >
                            {getRiskMeaning(report.priority)}
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              openMapLocation(
                                report.latitude,
                                report.longitude
                              )
                            }
                            className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white text-xs font-semibold py-2 rounded-lg"
                          >
                            🗺️ {t.viewLocation}
                          </button>
                        </div>
                      </Popup>
                    </CircleMarker>
                  ))}

                  {hotspotAreas.map((area, index) => (
                    <Circle
                      key={`hotspot-${index}`}
                      center={[area.latitude, area.longitude]}
                      radius={3000}
                      pathOptions={{
                        color: '#a855f7',
                        fillColor: '#a855f7',
                        fillOpacity: 0.16,
                        weight: 3,
                        dashArray: '8 6',
                      }}
                    >
                      <Popup>
                        <div className="text-center min-w-[200px]">
                          <div className="text-3xl mb-2">🚨</div>

                          <strong className="text-base">
                            {t.hotspot}
                          </strong>

                          <p className="mt-2 text-sm">
                            {t.reportsInArea}:{' '}
                            <strong>{area.count}</strong>
                          </p>

                          <p className="mt-1 text-sm">
                            {t.highRiskReports}:{' '}
                            <strong>{area.highRiskCount}</strong>
                          </p>

                          <p className="mt-1 text-sm text-slate-500">
                            {t.hotspotRadius}: {HOTSPOT_RADIUS_KM} km
                          </p>
                        </div>
                      </Popup>
                    </Circle>
                  ))}
                </MapContainer>
              )}
            </div>
          </div>

          <div className="px-5 md:px-6 py-4 border-t border-slate-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center">
                  📍
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {t.hotspot}
                  </p>

                  <p className="text-xs text-slate-500 mt-1 max-w-xl">
                    {t.monitoringNote}
                  </p>
                </div>
              </div>

              <div className="text-sm font-semibold text-slate-500">
                {gpsReports.length} {t.casesWithLocation}
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center">
              📊
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                {t.summary}
              </h2>

              <p className="text-sm text-slate-500">{t.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <p className="text-sm text-slate-500">{t.totalReported}</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">
                {reports.length}
              </p>
            </div>

            <div className="bg-white border border-blue-100 rounded-2xl p-5 shadow-sm">
              <p className="text-sm text-slate-500">
                {t.casesWithLocation}
              </p>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                {gpsReports.length}
              </p>
            </div>

            <div className="bg-white border border-purple-100 rounded-2xl p-5 shadow-sm">
              <p className="text-sm text-slate-500">
                {t.detectedHotspots}
              </p>
              <p className="text-3xl font-bold text-purple-600 mt-2">
                {hotspotAreas.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OutbreakMap
