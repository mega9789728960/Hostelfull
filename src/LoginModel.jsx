import React, { useEffect, useMemo, useState } from "react";

/**
 * LoginModal
 * Props:
 * - isOpen: boolean            // controls visibility
 * - type: "student" | "admin"  // which portal to show
 * - onClose: () => void        // called when modal is closed
 * - onSuccess?: (payload) => void // called after "successful" login (demo)
 */
export default function LoginModal({ isOpen, type = "student", onClose, onSuccess ,isLight}) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [remember, setRemember] = useState(false);

  // Lock page scroll while modal is open (nice UX)
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  // Derived UI text/icon based on type
  const ui = useMemo(() => {
    const isAdmin = type === "admin";
    return {
      title: isAdmin ? "Admin Dashboard" : "Student Portal",
      icon: isAdmin ? "👨‍💼" : "🎓",
      idLabel: isAdmin ? "Admin ID" : "Student ID",
      successTitle: isAdmin ? "Admin Dashboard Access Granted" : "Student Portal Access Granted",
      successFeatures: isAdmin
        ? [
            "Student Management System",
            "Attendance Analytics",
            "Billing & Payment Processing",
            "Complaint Resolution Center",
            "Comprehensive Reports",
            "System Administration",
          ]
        : [
            "Digital Attendance Marking",
            "Mess Bill Management",
            "Complaint Submission",
            "Visitor History",
            "Real-time Notifications",
            "Profile Management",
          ],
    };
  }, [type]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId || !password) return;

    setSubmitting(true);

    // Demo async "auth"
    setTimeout(() => {
      const payload = {
        type,
        userId,
        remember,
        timestamp: new Date().toISOString(),
      };

      // Optional callback to parent
      onSuccess?.(payload);

      // Demo alert (you can remove this in production)
      alert(
        `✅ Authentication Successful!\n\n🎯 ${ui.successTitle}\n\n📊 Available Features:\n• ${ui.successFeatures.join(
          "\n• "
        )}\n\n🚀 Redirecting...`
      );

      // reset + close
      setSubmitting(false);
      setUserId("");
      setPassword("");
      setRemember(false);
      onClose?.();
    }, 1200);
  };

  if (!isOpen) return null;

  // Close when clicking backdrop
  const onBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  return (

    <div className={isLight?"light-mode":""}>
      <div
      className="fixed inset-0 bg-black bg-opacity-60 login-modal z-50 flex items-center justify-center p-4 "
      role="dialog"
      aria-modal="true"
      onClick={onBackdropClick}
    >
      <div className="relative glass-card rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all professional-shadow">
        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
              <span className="text-xl sm:text-2xl" aria-hidden>
                {ui.icon}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">{ui.title}</h2>
            <p className="text-slate-400 text-sm sm:text-base">Secure access to your dashboard</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2 sm:mb-3">
                  {ui.idLabel}
                </label>
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 glass-effect rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent border-0 text-sm sm:text-base"
                  placeholder="Enter your ID"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2 sm:mb-3">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 glass-effect rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent border-0 text-sm sm:text-base"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                <label className="flex items-center text-slate-300 select-none">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="rounded border-slate-600 bg-slate-700 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm">Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors text-center sm:text-right"
                  onClick={() => alert("Password reset flow coming soon.")}
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full btn-primary text-white py-2.5 sm:py-3 rounded-lg font-semibold hover-lift text-sm sm:text-base disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {submitting ? "Authenticating..." : "Access Dashboard"}
              </button>
            </div>
          </form>

          {/* Footer help */}
          <div className="mt-4 sm:mt-6 text-center space-y-2">
            <p className="text-xs sm:text-sm text-slate-400">
              New student?{" "}
              <button
                onClick={() => alert("Open Register Modal from parent")}
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors underline"
              >
                Register here
              </button>
            </p>
            <p className="text-xs sm:text-sm text-slate-400">
              Need assistance?{" "}
              <a href="#" onClick={(e) => e.preventDefault()} className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                Contact Support
              </a>
            </p>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" role="img" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
    </div>
    
  );
}
