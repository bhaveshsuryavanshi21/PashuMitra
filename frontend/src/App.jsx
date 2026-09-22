import { useState } from 'react'
import ReportAnimal from './pages/ReportAnimal'
import FarmerDashboard from './pages/FarmerDashboard'
import VetDashboard from './pages/VetDashboard'
import HealthRecords from './pages/HealthRecords'
import OutbreakMap from './pages/OutbreakMap'
import Alerts from './pages/Alerts'
import Login from './pages/Login'

function App() {
  const [page, setPage] = useState('login')
  const [role, setRole] = useState(null)
  const [language, setLanguage] = useState('en')

  const translations = {
    en: {
      report: 'Report Animal',
      farmerDashboard: 'Farmer Dashboard',
      healthRecords: 'Health Records',
      outbreakMap: 'Outbreak Map',
      alerts: 'Alerts',
      vetDashboard: 'Vet Dashboard',
      logout: 'Logout',
    },

    hi: {
      report: 'पशु की रिपोर्ट करें',
      farmerDashboard: 'किसान डैशबोर्ड',
      healthRecords: 'स्वास्थ्य रिकॉर्ड',
      outbreakMap: 'रोग प्रकोप मानचित्र',
      alerts: 'अलर्ट',
      vetDashboard: 'पशु चिकित्सक डैशबोर्ड',
      logout: 'लॉगआउट',
    },

    mr: {
      report: 'प्राण्याची नोंद करा',
      farmerDashboard: 'शेतकरी डॅशबोर्ड',
      healthRecords: 'आरोग्य नोंदी',
      outbreakMap: 'रोग प्रादुर्भाव नकाशा',
      alerts: 'सूचना',
      vetDashboard: 'पशुवैद्यकीय डॅशबोर्ड',
      logout: 'बाहेर पडा',
    },
  }

  const t =
    translations[language] ||
    translations.en

  // ==========================================
  // ACTIVE NAVIGATION BUTTON STYLE
  // ==========================================

  const getNavClass = (navPage) => {
    const isActive = page === navPage

    return `
      px-3 py-2 rounded-lg
      font-semibold text-sm
      transition-all duration-200
      ${
        isActive
          ? 'bg-white text-green-700 shadow-md'
          : 'text-white hover:bg-green-600 hover:text-white'
      }
    `
  }

  // ==========================================
  // LOGIN PAGE
  // ==========================================

  if (page === 'login') {
    return (
      <Login
        onLogin={(
          selectedRole,
          selectedLanguage
        ) => {
          setRole(selectedRole)
          setLanguage(selectedLanguage)

          if (
            selectedRole === 'farmer'
          ) {
            setPage('farmer')
          } else {
            setPage('vet')
          }
        }}
      />
    )
  }

  // ==========================================
  // MAIN APPLICATION
  // ==========================================

  return (
    <div className="min-h-screen">

      {/* ========================================
          NAVIGATION BAR
      ======================================== */}

      <nav className="bg-green-700 text-white px-4 py-3">

        <div className="flex flex-wrap items-center gap-2">

          {/* LANGUAGE */}

          <select
            value={language}
            onChange={(e) =>
              setLanguage(e.target.value)
            }
            className="
              bg-white
              text-slate-800
              px-3
              py-2
              rounded-lg
              border-2
              border-white
              font-medium
              outline-none
              cursor-pointer
              mr-1
            "
          >
            <option value="en">
              English
            </option>

            <option value="hi">
              हिंदी
            </option>

            <option value="mr">
              मराठी
            </option>
          </select>

          {/* ==================================
              FARMER NAVIGATION
          ================================== */}

          {role === 'farmer' && (
            <>
              <button
                type="button"
                onClick={() =>
                  setPage('report')
                }
                className={getNavClass(
                  'report'
                )}
              >
                {t.report}
              </button>

              <button
                type="button"
                onClick={() =>
                  setPage('farmer')
                }
                className={getNavClass(
                  'farmer'
                )}
              >
                {t.farmerDashboard}
              </button>

              <button
                type="button"
                onClick={() =>
                  setPage('health')
                }
                className={getNavClass(
                  'health'
                )}
              >
                {t.healthRecords}
              </button>

              <button
                type="button"
                onClick={() =>
                  setPage('map')
                }
                className={getNavClass(
                  'map'
                )}
              >
                {t.outbreakMap}
              </button>

              <button
                type="button"
                onClick={() =>
                  setPage('alerts')
                }
                className={getNavClass(
                  'alerts'
                )}
              >
                {t.alerts}
              </button>
            </>
          )}

          {/* ==================================
              VET NAVIGATION
          ================================== */}

          {role === 'vet' && (
            <>
              <button
                type="button"
                onClick={() =>
                  setPage('vet')
                }
                className={getNavClass(
                  'vet'
                )}
              >
                {t.vetDashboard}
              </button>

              <button
                type="button"
                onClick={() =>
                  setPage('map')
                }
                className={getNavClass(
                  'map'
                )}
              >
                {t.outbreakMap}
              </button>

              <button
                type="button"
                onClick={() =>
                  setPage('alerts')
                }
                className={getNavClass(
                  'alerts'
                )}
              >
                {t.alerts}
              </button>
            </>
          )}

          {/* ==================================
              LOGOUT
          ================================== */}

          <button
            type="button"
            onClick={() => {
              setRole(null)
              setPage('login')
            }}
            className="
              ml-auto
              px-4
              py-2
              rounded-lg
              font-semibold
              text-sm
              text-white
              border-2
              border-transparent
              hover:bg-green-600
              transition
            "
          >
            {t.logout}
          </button>

        </div>

      </nav>

      {/* ========================================
          PAGE CONTENT
      ======================================== */}

      {page === 'report' && (
        <ReportAnimal
          language={language}
        />
      )}

      {page === 'farmer' && (
        <FarmerDashboard
          language={language}
        />
      )}

      {page === 'vet' && (
        <VetDashboard
          language={language}
        />
      )}

      {page === 'health' && (
        <HealthRecords
          language={language}
        />
      )}

      {page === 'alerts' && (
        <Alerts
          language={language}
        />
      )}

      {page === 'map' && (
        <OutbreakMap
          language={language}
        />
      )}

    </div>
  )
}

export default App