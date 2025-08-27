import { useState, useEffect } from "react";
import Professionalnavigation from "./Professionalnavigation.jsx";
import Professionalnotificationbar from "./Professionalnotificationbar.jsx";
import Features from "./Features.jsx";
import Stats from "./Stats.jsx";
import Herosection from "./Herosection.jsx";
import Footer from "./Footer.jsx";
import LoginModel from "./LoginModel.jsx";
import RegisterModal from "./RegisterModal.jsx";

function App() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginType, setLoginType] = useState("student");
  const [isLight, setIsLight] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  // ✅ Toggle light mode
  useEffect(() => {
    document.body.classList.toggle("light-mode", isLight);
  }, [isLight]);

  // ✅ Call login once (example)
  useEffect(() => {
    async function loginAndGetProfile() {
      try {
        // 1. Login
        const res = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: "mega", password: "123" }),
        });

        if (!res.ok) throw new Error("Login failed");
        const data = await res.json();

        localStorage.setItem("token", data.token);
        console.log("Token saved:", data.token);

        // 2. Get profile
        const profileRes = await fetch("/api/profile", {
          method: "GET",
          headers: { Authorization: `Bearer ${data.token}` }, // ✅ Proper format
        });

        if (!profileRes.ok) throw new Error("Profile fetch failed");
        const profile = await profileRes.json();
        console.log("Profile:", profile);
      } catch (err) {
        console.error("API Error:", err.message);
      }
    }

    loginAndGetProfile();
  }, []); // run once when app loads

  return (
    <>
      <Professionalnotificationbar />

      <Professionalnavigation
        isLight={isLight}
        onToggleTheme={() => setIsLight((v) => !v)}
        onOpenLogin={(type) => {
          setLoginType(type || "student");
          setLoginOpen(true);
        }}
        onOpenRegister={() => setRegisterOpen(true)}
      />

      <Herosection
        isLight={isLight}
        onOpenLogin={(type) => {
          setLoginType(type);
          setLoginOpen(true);
        }}
      />

      <Features isLight={isLight} />
      <Stats isLight={isLight} />
      <Footer isLight={isLight} />

      <LoginModel
        isOpen={loginOpen}
        isLight={isLight}
        type={loginType}
        onClose={() => setLoginOpen(false)}
        onSuccess={(data) => console.log("Logged in", data)}
      />

      <RegisterModal
        isOpen={registerOpen}
        onClose={() => setRegisterOpen(false)}
        onSubmit={(data) => console.log("Registered", data)}
      />
    </>
  );
}

export default App;
