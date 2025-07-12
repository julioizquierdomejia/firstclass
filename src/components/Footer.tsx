import React from 'react';
import { Package, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-primary px-3 py-1.5 rounded-lg mr-3">
                <div className="text-white font-bold text-lg tracking-wide">
                  FirstClass
                </div>
                <div className="text-white text-xs font-light tracking-widest -mt-1">
                  c o u r i e r
                </div>
              </div>
            </div>
            <p className="text-gray-400 mb-6">
              Tu courier de primera clase para envíos seguros entre EE.UU. y América Latina.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-light transition-colors duration-200">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-light transition-colors duration-200">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-light transition-colors duration-200">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Servicios</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Casillero Virtual</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Envío Express</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Consolidación</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Servicios Empresariales</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Seguro de Envío</a></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Ayuda</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Centro de Ayuda</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Rastrea tu Envío</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Calculadora de Envío</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Preguntas Frecuentes</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Contacto</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <div>
                  <p className="text-gray-400">info@firstclass-courier.com</p>
                  <p className="text-gray-400">soporte@firstclass-courier.com</p>
                </div>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <div>
                  <p className="text-gray-400">Perú: +57 1 234 5678</p>
                </div>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <p className="text-gray-400">Miami, FL 33101<br />Estados Unidos</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 FirstClass Courier. Todos los derechos reservados.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Términos y Condiciones
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Política de Privacidad
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Política de Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;