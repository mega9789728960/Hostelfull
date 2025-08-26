import React, { useState } from "react";

/**
 * Props:
 * - onOpenLogin: (type: "student" | "admin" | undefined) => void
 * - onOpenRegister: () => void
 * - onToggleTheme: () => void
 * - isLight?: boolean   // optional, controls which icon to show
 */
function Professionalnavigation({ isLight, onToggleTheme, onOpenLogin, onOpenRegister }) {

  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobileMenu = () => setMobileOpen((v) => !v);
  

  return (
    <>
      <nav className="glass-effect sticky top-0 z-50 ">
  
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18">
            {/* Left: Logo + Title */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg float-animation">
                  <span className="text-2xl">🏛️</span>
                </div>
              </div>
              <div className="text-white">
                <h1 className="text-xl font-bold control1">Chozha Boys Hostel</h1>
                <p className="text-xs text-slate-300 control2">
                  Government College of Engineering, Thanjavur
                </p>
              </div>
            </div>

            {/* Center: Desktop links */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-slate-300 hover:text-white transition-colors font-medium"
              >
                Features
              </a>
              <a
                href="#about"
                className="text-slate-300 hover:text-white transition-colors font-medium"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-slate-300 hover:text-white transition-colors font-medium"
              >
                Support
              </a>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center space-x-4">
              {/* Theme toggle */}
             <button onClick={onToggleTheme} className="glass-effect p-2.5 rounded-lg text-white hover:bg-white hover:bg-opacity-10 transition-all duration-300">
  {isLight ? (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {/* Moon for dark */}
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  ) : (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {/* Sun for light */}
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  )}
</button>


              {/* Desktop Dropdown */}
              <div className="dropdown hidden md:block">
                <button className="btn-primary text-white px-6 py-2.5 rounded-lg font-semibold text-sm flex items-center space-x-2">
                  <span>Access Portal</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div className="dropdown-content">
                  <button
                    onClick={() => onOpenLogin?.("student")}
                    className="flex items-center space-x-2 w-full text-left"
                  >
                    <span>🎓</span>
                    <span>Student Login</span>
                  </button>
                  <button
                    onClick={() => onOpenLogin?.("admin")}
                    className="flex items-center space-x-2 w-full text-left"
                  >
                    <span>👨‍💼</span>
                    <span>Admin Login</span>
                  </button>
                  <button
                    onClick={onOpenRegister}
                    className="flex items-center space-x-2 border-t border-white border-opacity-10 w-full text-left"
                  >
                    <span>📝</span>
                    <span>Student Register</span>
                  </button>
                </div>
              </div>

              {/* Mobile: Portal quick button */}
              
            </div>
          </div>
        </div>

        {/* Mobile menu (controlled) */}
        <div
          className={`${
            mobileOpen ? "" : "hidden"
          } md:hidden absolute top-full left-0 right-0 glass-effect border-t border-slate-600`}
        >
          <div className="px-4 py-4 space-y-3">
            <a
              href="#features"
              onClick={() => setMobileOpen(false)}
              className="block text-slate-300 hover:text-white transition-colors font-medium py-2"
            >
              Features
            </a>
            <a
              href="#about"
              onClick={() => setMobileOpen(false)}
              className="block text-slate-300 hover:text-white transition-colors font-medium py-2"
            >
              About
            </a>
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="block text-slate-300 hover:text-white transition-colors font-medium py-2"
            >
              Support
            </a>
            <div className="pt-3 border-t border-slate-600 space-y-2">
              <button
                onClick={() => {
                  onOpenLogin?.("student");
                  setMobileOpen(false);
                }}
                className="w-full btn-primary text-white px-4 py-2.5 rounded-lg font-semibold text-sm"
              >
                🎓 Student Login
              </button>
              <button
                onClick={() => {
                  onOpenLogin?.("admin");
                  setMobileOpen(false);
                }}
                className="w-full btn-secondary text-white px-4 py-2.5 rounded-lg font-semibold text-sm"
              >
                👨‍💼 Admin Login
              </button>
              <button
                onClick={() => {
                  onOpenRegister?.();
                  setMobileOpen(false);
                }}
                className="w-full glass-effect text-white px-4 py-2.5 rounded-lg font-semibold text-sm border border-white border-opacity-20"
              >
                📝 Student Register
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Professionalnavigation;
