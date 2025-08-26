import React, { useState } from "react";

export default function RegisterModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    otp: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Student Register</h2>
          <button onClick={onClose} className="text-red-500 text-lg font-bold">×</button>
        </div>

        {step === 1 && (
          <>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full border rounded p-2 mb-3"
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full border rounded p-2 mb-3"
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full border rounded p-2 mb-3"
              onChange={handleChange}
            />
            <button onClick={() => setStep(2)} className="btn-primary w-full">
              Continue
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              className="w-full border rounded p-2 mb-3"
              onChange={handleChange}
            />
            <div className="flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="btn-primary px-4 py-2 rounded"
              >
                Submit
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <div className="text-center">
            <h3 className="text-green-600 font-bold mb-2">Registration Successful 🎉</h3>
            <pre className="text-sm bg-gray-100 p-2 rounded text-left">
              {JSON.stringify(form, null, 2)}
            </pre>
            <button onClick={onClose} className="btn-primary mt-4 w-full">
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
