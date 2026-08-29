import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import About from "./About";


export default function Home() {
    
  

  return (
    <>
    {/* #4D76BA */}

    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#191b20" }}>
    <Navbar />

    <div style={{marginTop:"9vh" }}>

    <HeroSection />
    </div>

    <About />

    



   
        </div>
    
    </>
  )
}

