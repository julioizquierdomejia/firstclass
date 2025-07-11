import React from 'react';
import { Smartphone, Download } from 'lucide-react';

const MobileApp = () => {
  return (
    <section className="py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Lleva FirstClass contigo
            </h2>
            <p className="text-xl text-white opacity-90 mb-8">
              Descarga nuestra app móvil y gestiona tus envíos desde cualquier lugar. 
              Rastrea paquetes, recibe notificaciones y más.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a
                href="#"
                className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg flex items-center justify-center transition-colors duration-200"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Descargar en Google Play"
                  className="h-12"
                />
              </a>
              <a
                href="#"
                className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg flex items-center justify-center transition-colors duration-200"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                  alt="Descargar en App Store"
                  className="h-12"
                />
              </a>
            </div>

            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <Download className="h-6 w-6 text-white mr-2" />
                <span className="text-white">+100K descargas</span>
              </div>
              <div className="flex items-center">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-primary-light text-lg">★</span>
                  ))}
                </div>
                <span className="text-white ml-2">4.8/5</span>
              </div>
            </div>
          </div>

          {/* Phone Mockup */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="bg-black p-4 rounded-3xl shadow-2xl">
                <div className="bg-white rounded-2xl p-8 h-96 w-56 flex items-center justify-center">
                  <Smartphone className="h-32 w-32 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileApp;