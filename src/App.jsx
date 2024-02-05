import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Chatbot from "./Components/Chatbot";
import Marketplace from "./Components/Marketplace";
import Footer from "./Components/Footer";
import About from "./Components/About";
import Totalizer from "./Components/Totalizer";
import Bhk1 from "./Components/Bhk1";
import Bhk2 from "./Components/Bhk2";
import Bhk3 from "./Components/Bhk3";
import Features from "./Components/Features";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<>
            <Hero />
            <About />
            <Features />
          </>
          } />
          <Route path="/totalizer" element={<Totalizer />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/1bhk" element={<Bhk1 />} />
          <Route path="/2bhk" element={<Bhk2 />} />
          <Route path="/3bhk" element={<Bhk3 />} />
          <Route path="/chatbot" element={<Chatbot />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  )
}

export default App


const showAccordion = () => {
  if (window.location.pathname === "/") {
    return <Accordion />
  }
}

