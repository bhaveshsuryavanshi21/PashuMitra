import { useState } from 'react'
import ReportAnimal from './pages/ReportAnimal_OLD'
import FarmerDashboard from './pages/FarmerDashboard_OLD'
import VetDashboard from './pages/VetDashboard'
import HealthRecords from './pages/HealthRecords'
import OutbreakMap from './pages/OutbreakMap_old'
import Alerts from './pages/Alerts'
import Login from './pages/Login'

function App() {
  const [page, setPage] = useState('login')
  const [role, setRole] = useState(null)
  const [language, setLanguage] = useState('en')

  const translations = {
    en: {
      report: 'Report Animal',
      farmerDashboard: 'Dashboard',
      healthRecords: 'Health Records',
      outbreakMap: 'Outbreak Map',
      alerts: 'Alerts',
      vetDashboard: 'Vet Dashboard',
      logout: 'Logout',
    },

    hi: {
      report: 'पशु की रिपोर्ट करें',
      farmerDashboard: 'डैशबोर्ड',
      healthRecords: 'स्वास्थ्य रिकॉर्ड',
      outbreakMap: 'रोग प्रकोप मानचित्र',
      alerts: 'अलर्ट',
      vetDashboard: 'पशु चिकित्सक डैशबोर्ड',
      logout: 'लॉगआउट',
    },

    mr: {
      report: 'प्राण्याची नोंद करा',
      farmerDashboard: 'डॅशबोर्ड',
      healthRecords: 'आरोग्य नोंदी',
      outbreakMap: 'रोग प्रादुर्भाव नकाशा',
      alerts: 'सूचना',
      vetDashboard: 'पशुवैद्यकीय डॅशबोर्ड',
      logout: 'बाहेर पडा',
    },
  }

  const t = translations[language] || translations.en

  const navItems =
    role === 'farmer'
      ? [
          {
            id: 'farmer',
            label: t.farmerDashboard,
            icon: '⌂',
          },
          {
            id: 'report',
            label: t.report,
            icon: '＋',
          },
          {
            id: 'health',
            label: t.healthRecords,
            icon: '▣',
          },
          {
            id: 'map',
            label: t.outbreakMap,
            icon: '⌖',
          },
          {
            id: 'alerts',
            label: t.alerts,
            icon: '◉',
          },
        ]
      : [
          {
            id: 'vet',
            label: t.vetDashboard,
            icon: '⌂',
          },
          {
            id: 'map',
            label: t.outbreakMap,
            icon: '⌖',
          },
          {
            id: 'alerts',
            label: t.alerts,
            icon: '◉',
          },
        ]

  const handleLogout = () => {
    setRole(null)
    setPage('login')
  }

  // LOGIN
  if (page === 'login') {
    return (
      <Login
        onLogin={(selectedRole, selectedLanguage) => {
          setRole(selectedRole)
          setLanguage(selectedLanguage)

          if (selectedRole === 'farmer') {
            setPage('farmer')
          } else {
            setPage('vet')
          }
        }}
      />
    )
  }

  return (
    <div className="min-h-screen bg-[#f6f8f5] text-slate-800">

      {/* ================================
          SIDEBAR
      ================================= */}

      <aside className="
        fixed
        left-0
        top-0
        z-50
        hidden
        h-screen
        w-64
        flex-col
        border-r
        border-slate-200
        bg-white
        lg:flex
      ">

        {/* LOGO */}

        <div className="
          flex
          h-24
          items-center
          gap-3
          border-b
          border-slate-100
          px-7
        ">

          <div className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            bg-green-50
            text-2xl
          ">
            🐄
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight text-green-800">
              PashuMitra
            </h1>

            <p className="text-xs text-slate-400">
              Animal Health Platform
            </p>
          </div>

        </div>

        {/* NAVIGATION */}

        <div className="flex-1 px-4 py-7">

          <p className="
            mb-3
            px-3
            text-[11px]
            font-bold
            uppercase
            tracking-wider
            text-slate-400
          ">
            Main Menu
          </p>

          <div className="space-y-1">

            {navItems.map((item) => {
              const active = page === item.id

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setPage(item.id)}
                  className={`
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-xl
                    px-4
                    py-3
                    text-sm
                    font-medium
                    transition-all
                    ${
                      active
                        ? 'bg-green-50 text-green-700 shadow-sm'
                        : 'text-slate-500 hover:bg-slate-50 hover:text-green-700'
                    }
                  `}
                >

                  <span className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-lg
                    bg-slate-50
                    text-base
                  ">
                    {item.icon}
                  </span>

                  {item.label}

                </button>
              )
            })}

          </div>

        </div>

        {/* SIDEBAR BOTTOM */}

        <div className="border-t border-slate-100 p-4">

          <button
            type="button"
            onClick={handleLogout}
            className="
              flex
              w-full
              items-center
              gap-3
              rounded-xl
              px-4
              py-3
              text-sm
              font-medium
              text-slate-500
              transition
              hover:bg-red-50
              hover:text-red-600
            "
          >
            <span className="text-lg">
              ↪
            </span>

            {t.logout}
          </button>

        </div>

      </aside>


      {/* ================================
          MOBILE / TOP HEADER
      ================================= */}

      <header className="
        sticky
        top-0
        z-40
        flex
        h-16
        items-center
        justify-between
        border-b
        border-slate-200
        bg-white/95
        px-4
        backdrop-blur
        lg:hidden
      ">

        <div className="flex items-center gap-2">

          <div className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-lg
            bg-green-50
            text-lg
          ">
            🐄
          </div>

          <span className="font-bold text-green-800">
            PashuMitra
          </span>

        </div>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="
            rounded-lg
            border
            border-slate-200
            bg-white
            px-2
            py-1.5
            text-sm
            outline-none
          "
        >
          <option value="en">EN</option>
          <option value="hi">हिंदी</option>
          <option value="mr">मराठी</option>
        </select>

      </header>


      {/* ================================
          MAIN CONTENT
      ================================= */}

      <main className="min-h-screen lg:ml-64">

        {/* TOP BAR */}

        <div className="
          hidden
          h-20
          items-center
          justify-between
          border-b
          border-slate-200
          bg-white
          px-8
          lg:flex
        ">

          <div>

            <p className="text-xs font-medium text-slate-400">
              PashuMitra
            </p>

            <h2 className="text-lg font-semibold text-slate-800">
              {role === 'farmer'
                ? 'Farmer Portal'
                : 'Veterinary Portal'}
            </h2>

          </div>


          <div className="flex items-center gap-4">

            {/* LANGUAGE */}

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="
                rounded-xl
                border
                border-slate-200
                bg-white
                px-3
                py-2
                text-sm
                text-slate-600
                outline-none
                transition
                focus:border-green-500
              "
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
              <option value="mr">मराठी</option>
            </select>


            {/* USER */}

            <div className="
              flex
              items-center
              gap-3
              rounded-xl
              bg-slate-50
              px-3
              py-2
            ">

              <div className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                bg-green-100
                font-semibold
                text-green-700
              ">
                {role === 'farmer' ? 'F' : 'V'}
              </div>

              <div className="hidden xl:block">

                <p className="text-sm font-semibold text-slate-700">
                  {role === 'farmer'
                    ? 'Farmer'
                    : 'Veterinarian'}
                </p>

                <p className="text-xs text-slate-400">
                  {role === 'farmer'
                    ? 'Farmer Account'
                    : 'Veterinary Account'}
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* PAGE AREA */}

        <div className="p-4 sm:p-6 lg:p-8">

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

      </main>

    </div>
  )
}

export default App