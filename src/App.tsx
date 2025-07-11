import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import PageTransition from './components/PageTransition';
import Hero from './components/Hero';
import TrackingSection from './components/TrackingSection';
import ServiceSelection from './components/ServiceSelection';
import Benefits from './components/Benefits';
import MobileApp from './components/MobileApp';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';
import Footer from './components/Footer';
import CasilleroVirtual from './pages/CasilleroVirtual';
import TiendasDisponibles from './pages/TiendasDisponibles';
import BlogHome from './pages/BlogHome';
import BlogPost from './pages/BlogPost';
import BlogCategory from './pages/BlogCategory';
import Contact from './pages/Contact';
import EnviosUSAPeru from './pages/EnviosUSAPeru';
import MiCuenta from './pages/MiCuenta';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <PageTransition>
        <div className="min-h-screen bg-white main-content" style={{ margin: 0, padding: 0 }}>
          <Header />
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <TrackingSection />
                <ServiceSelection />
                <Benefits />
                <MobileApp />
                <Testimonials />
                <Blog />
              </>
            } />
            <Route path="/casillero-virtual" element={<CasilleroVirtual />} />
            <Route path="/tiendas-disponibles" element={<TiendasDisponibles />} />
            <Route path="/blog" element={<BlogHome />} />
            <Route path="/blog/categoria/:category" element={<BlogCategory />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/envios-usa-peru" element={<EnviosUSAPeru />} />
            <Route path="/mi-cuenta" element={<MiCuenta />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
          <Footer />
        </div>
      </PageTransition>
    </Router>
  );
}

export default App;