import { StrictMode } from "react";
import { useState } from "react";
import Professionalnavigation from "./Professionalnavigation.jsx";
import Professionalnotificationbar from "./Professionalnotificationbar.jsx";
import Features from "./Features.jsx";
import Stats from "./Stats.jsx"
import Herosection from "./Herosection.jsx";
import Footer from "./Footer.jsx"
import LoginModel from "./LoginModel.jsx"

import { useEffect } from "react";
import RegisterModal from "./RegisterModal.jsx"; // ✅ Must be imported

function App() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginType, setLoginType] = useState("student");
  const [isLight, setIsLight] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false); // ✅ for Register modal

  useEffect(() => {
    const body = document.body;
    if (isLight) {
      body.classList.add("light-mode");
    } else {
      body.classList.remove("light-mode");
    }
  }, [isLight]);

  function data1(){

      fetch("/api/login",{
        method:"POST" ,
        headers:{"Content-Type":'application/json'},
        body:  JSON.stringify({"username":"mega","password":"123"})

      }).then((data)=>data.json()).then(data=>{localStorage.setItem("token",data.token);})


  }
  data1();

  function data2(){
    const data3 = localStorage.getItem("token");
    fetch("/api/profile",{
      method:"GET",headers:{'authorization':`bearer ${data3}`}
    });
  }
  data2();

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
        onOpenRegister={() => setRegisterOpen(true)} // ✅ replaces alert
      />

   <Herosection isLight={isLight} onOpenLogin={(type) => {
  setLoginType(type);
  setLoginOpen(true);
}} />


      <Features isLight={isLight} />
      <Stats isLight={isLight}  />
      <Footer  isLight={isLight}/>

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


