import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  User, 
  MessageCircle, 
  Building, 
  Globe,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  CheckCircle,
  ArrowRight,
  Headphones,
  Calendar,
  Star,
  Award,
  Users,
  Shield,
  Zap,
  Coffee,
  Target,
  Package
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    serviceType: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState({});
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Intersection Observer for animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(el => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
        serviceType: 'general'
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      primary: "info@firstclass-courier.com",
      secondary: "soporte@firstclass-courier.com",
      description: "Respuesta en menos de 2 horas",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Phone,
      title: "Teléfono",
      primary: "+1 (305) 555-0123",
      secondary: "+57 1 234 5678",
      description: "Lunes a Viernes 8AM - 8PM EST",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: MapPin,
      title: "Oficina Principal",
      primary: "1200 Brickell Avenue",
      secondary: "Miami, FL 33131, USA",
      description: "Visitas con cita previa",
      color: "from-purple-500 to-violet-500"
    },
    {
      icon: Headphones,
      title: "Chat en Vivo",
      primary: "Disponible 24/7",
      secondary: "Respuesta inmediata",
      description: "Para consultas urgentes",
      color: "from-orange-500 to-red-500"
    }
  ];

  const businessHours = [
    { day: "Lunes - Viernes", hours: "8:00 AM - 8:00 PM", timezone: "EST" },
    { day: "Sábados", hours: "9:00 AM - 5:00 PM", timezone: "EST" },
    { day: "Domingos", hours: "10:00 AM - 4:00 PM", timezone: "EST" },
    { day: "Días Festivos", hours: "Horario Reducido", timezone: "EST" }
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, url: "#", color: "hover:text-blue-600", followers: "25k" },
    { name: "Instagram", icon: Instagram, url: "#", color: "hover:text-pink-600", followers: "18k" },
    { name: "Twitter", icon: Twitter, url: "#", color: "hover:text-blue-400", followers: "12k" },
    { name: "LinkedIn", icon: Linkedin, url: "#", color: "hover:text-blue-700", followers: "30k" },
    { name: "YouTube", icon: Youtube, url: "#", color: "hover:text-red-600", followers: "8k" }
  ];

  const serviceTypes = [
    { value: "general", label: "Consulta General" },
    { value: "casillero", label: "Casillero Virtual" },
    { value: "envios", label: "Envíos Internacionales" },
    { value: "empresarial", label: "Servicios Empresariales" },
    { value: "soporte", label: "Soporte Técnico" },
    { value: "reclamos", label: "Reclamos y PQR" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-yellow-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumbs */}
          <div className="mb-8">
            <Breadcrumbs className="text-white/80" />
          </div>

          <div className="text-center">
            <div 
              className={`inline-flex items-center bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full text-white font-medium mb-8 border border-white/20 transition-all duration-1000 ${isVisible['hero-badge'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              data-animate
              id="hero-badge"
            >
              <MessageCircle className="mr-3 h-6 w-6" />
              Centro de Contacto
              <Coffee className="ml-3 h-6 w-6" />
            </div>

            <h1 
              className={`text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight transition-all duration-1000 delay-200 ${isVisible['hero-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              data-animate
              id="hero-title"
            >
              <span className="block">Estamos aquí</span>
              <span className="block text-6xl lg:text-8xl bg-gradient-to-r from-primary via-secondary to-yellow-400 bg-clip-text text-transparent">
                para Ayudarte
              </span>
            </h1>

            <p 
              className={`text-xl lg:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${isVisible['hero-desc'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              data-animate
              id="hero-desc"
            >
              Nuestro equipo de expertos está disponible para resolver todas tus dudas sobre envíos internacionales, 
              casilleros virtuales y servicios de courier.
            </p>

            {/* Hero Stats */}
            <div 
              className={`grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto transition-all duration-1000 delay-600 ${isVisible['hero-stats'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              data-animate
              id="hero-stats"
            >
              {[
                { number: "24/7", label: "Soporte disponible", icon: Headphones },
                { number: "<2h", label: "Tiempo de respuesta", icon: Zap },
                { number: "4.9", label: "Rating de satisfacción", icon: Star },
                { number: "50k+", label: "Clientes atendidos", icon: Users }
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center group">
                    <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/20 transition-all duration-500 transform hover:scale-105 border border-white/20">
                      <Icon className="w-10 h-10 text-white mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                      <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                      <div className="text-white/80 font-medium">{stat.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`text-center mb-16 transition-all duration-1000 ${isVisible['contact-info-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            data-animate
            id="contact-info-title"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Múltiples formas de contactarnos
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Elige el canal que más te convenga. Estamos disponibles cuando nos necesites.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div
                  key={index}
                  className={`group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 hover:border-primary/20 overflow-hidden animate-slide-in-bottom`}
                  data-animate
                  id={`contact-info-${index}`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${info.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  <div className="relative z-10">
                    <div className={`w-16 h-16 bg-gradient-to-br ${info.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors duration-300">
                      {info.title}
                    </h3>
                    
                    <div className="space-y-2 mb-4">
                      <p className="font-semibold text-gray-800">{info.primary}</p>
                      <p className="text-gray-600">{info.secondary}</p>
                    </div>
                    
                    <p className="text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-lg">
                      {info.description}
                    </p>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content: Form + Map */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Form */}
            <div 
              className={`transition-all duration-1000 ${isVisible['contact-form'] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
              data-animate
              id="contact-form"
            >
              <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-200">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Envíanos un mensaje
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Completa el formulario y te responderemos en menos de 2 horas durante horario laboral.
                  </p>
                </div>

                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      ¡Mensaje enviado exitosamente!
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Hemos recibido tu mensaje y te responderemos pronto.
                    </p>
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <p className="text-green-800 font-medium">
                        📧 Recibirás una confirmación por email en los próximos minutos
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Service Type */}
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-3">
                        Tipo de consulta
                      </label>
                      <select
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleInputChange}
                        className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-primary focus:ring-0 transition-colors duration-200 bg-white font-medium"
                        required
                      >
                        {serviceTypes.map(type => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Name and Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-3">
                          Nombre completo *
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full pl-12 pr-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-primary focus:ring-0 transition-colors duration-200 font-medium"
                            placeholder="Tu nombre completo"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-3">
                          Email *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full pl-12 pr-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-primary focus:ring-0 transition-colors duration-200 font-medium"
                            placeholder="tu@email.com"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Phone and Company */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-3">
                          Teléfono
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full pl-12 pr-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-primary focus:ring-0 transition-colors duration-200 font-medium"
                            placeholder="+57 300 123 4567"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-3">
                          Empresa (opcional)
                        </label>
                        <div className="relative">
                          <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            className="w-full pl-12 pr-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-primary focus:ring-0 transition-colors duration-200 font-medium"
                            placeholder="Nombre de tu empresa"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-3">
                        Asunto *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-primary focus:ring-0 transition-colors duration-200 font-medium"
                        placeholder="Resumen de tu consulta"
                        required
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-3">
                        Mensaje *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={6}
                        className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-primary focus:ring-0 transition-colors duration-200 resize-none font-medium"
                        placeholder="Describe tu consulta con el mayor detalle posible..."
                        required
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white py-5 rounded-2xl text-lg font-bold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                          Enviando mensaje...
                        </>
                      ) : (
                        <>
                          <Send className="mr-3 h-6 w-6" />
                          Enviar mensaje
                          <ArrowRight className="ml-3 h-6 w-6" />
                        </>
                      )}
                    </button>

                    <p className="text-sm text-gray-500 text-center">
                      Al enviar este formulario, aceptas nuestros términos de privacidad y el tratamiento de tus datos.
                    </p>
                  </form>
                )}
              </div>
            </div>

            {/* Map and Business Hours */}
            <div 
              className={`space-y-8 transition-all duration-1000 delay-300 ${isVisible['map-section'] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
              data-animate
              id="map-section"
            >
              {/* Google Maps */}
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <MapPin className="w-7 h-7 mr-3 text-primary" />
                  Nuestra ubicación
                </h3>
                
                <div className="mb-6">
                  <p className="text-gray-600 mb-2">
                    <strong>Dirección:</strong> 1200 Brickell Avenue, Suite 1950
                  </p>
                  <p className="text-gray-600 mb-4">
                    Miami, FL 33131, Estados Unidos
                  </p>
                  <p className="text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-lg">
                    📍 Ubicados en el corazón del distrito financiero de Miami
                  </p>
                </div>

                {/* Google Maps Embed */}
                <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3592.8267!2d-80.1917902!3d25.7616798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b484f7b7b7b7%3A0x1234567890abcdef!2s1200%20Brickell%20Ave%2C%20Miami%2C%20FL%2033131%2C%20USA!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-2xl"
                  ></iframe>
                  
                  {/* Map Overlay */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
                    <p className="text-sm font-bold text-gray-900">FirstClass Courier</p>
                    <p className="text-xs text-gray-600">Oficina Principal</p>
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 bg-primary hover:bg-primary-dark text-white py-3 px-6 rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Ver en Google Maps
                  </button>
                  <button className="flex-1 border-2 border-primary text-primary hover:bg-primary hover:text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Agendar visita
                  </button>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Clock className="w-7 h-7 mr-3 text-primary" />
                  Horarios de atención
                </h3>
                
                <div className="space-y-4">
                  {businessHours.map((schedule, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors duration-200">
                      <div>
                        <p className="font-semibold text-gray-900">{schedule.day}</p>
                        <p className="text-sm text-gray-500">{schedule.timezone}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">{schedule.hours}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl border border-primary/20">
                  <p className="text-sm text-gray-700 font-medium">
                    💡 <strong>Tip:</strong> Para atención inmediata, usa nuestro chat en vivo disponible 24/7
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media & Additional Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Social Media */}
            <div 
              className={`transition-all duration-1000 ${isVisible['social-media'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              data-animate
              id="social-media"
            >
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-10 border border-gray-200 shadow-lg">
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  Síguenos en redes sociales
                </h3>
                <p className="text-gray-600 mb-8 text-lg">
                  Mantente al día con las últimas noticias, consejos y promociones especiales.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.url}
                        className="flex items-center justify-between p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 hover:border-primary/20 group"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                            <Icon className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 group-hover:text-primary transition-colors duration-300">
                              {social.name}
                            </p>
                            <p className="text-sm text-gray-500">{social.followers} seguidores</p>
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                      </a>
                    );
                  })}
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-primary to-secondary rounded-2xl text-white">
                  <h4 className="text-xl font-bold mb-3">🎉 Únete a nuestra comunidad</h4>
                  <p className="text-white/90 mb-4">
                    Más de 100k personas ya forman parte de nuestra familia FirstClass
                  </p>
                  <button className="bg-white text-primary hover:bg-gray-100 px-6 py-3 rounded-xl font-bold transition-colors duration-200">
                    Seguir ahora
                  </button>
                </div>
              </div>
            </div>

            {/* FAQ Quick Access */}
            <div 
              className={`transition-all duration-1000 delay-300 ${isVisible['faq-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              data-animate
              id="faq-section"
            >
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-10 border border-gray-200 shadow-lg">
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  Preguntas frecuentes
                </h3>
                <p className="text-gray-600 mb-8 text-lg">
                  Encuentra respuestas rápidas a las consultas más comunes.
                </p>
                
                <div className="space-y-4">
                  {[
                    {
                      question: "¿Cuánto tiempo tarda un envío?",
                      answer: "Entre 3-7 días hábiles desde Miami a Colombia",
                      icon: Clock
                    },
                    {
                      question: "¿Cuál es el límite de peso?",
                      answer: "Hasta 50kg (110 libras) por envío",
                      icon: Package
                    },
                    {
                      question: "¿Incluye seguro?",
                      answer: "Sí, todos los envíos incluyen seguro básico",
                      icon: Shield
                    },
                    {
                      question: "¿Cómo rastrea mi paquete?",
                      answer: "Con nuestro sistema de tracking en tiempo real",
                      icon: Globe
                    }
                  ].map((faq, index) => {
                    const Icon = faq.icon;
                    return (
                      <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 mb-2">{faq.question}</h4>
                            <p className="text-gray-600">{faq.answer}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8">
                  <Link
                    to="/faq"
                    className="w-full bg-primary hover:bg-primary-dark text-white py-4 px-6 rounded-2xl font-bold transition-colors duration-200 flex items-center justify-center group"
                  >
                    Ver todas las preguntas
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div 
            className={`transition-all duration-1000 ${isVisible['cta-final'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            data-animate
            id="cta-final"
          >
            <h2 className="text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              ¿Listo para comenzar?
            </h2>
            <p className="text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Abre tu casillero virtual gratis y comienza a disfrutar de las mejores compras desde Estados Unidos
            </p>
            
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <Link
                to="/casillero-virtual"
                className="bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white px-16 py-6 rounded-2xl text-xl font-bold transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 shadow-2xl hover:shadow-3xl flex items-center justify-center group"
              >
                <Target className="mr-4 h-7 w-7" />
                Abrir casillero gratis
                <ArrowRight className="ml-4 h-7 w-7 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { icon: "✅", text: "Sin costos de apertura" },
                { icon: "✅", text: "Soporte especializado 24/7" },
                { icon: "✅", text: "Respuesta garantizada en 2 horas" }
              ].map((benefit, index) => (
                <div key={index} className="flex items-center justify-center space-x-3 text-white/90 text-lg">
                  <span className="text-2xl">{benefit.icon}</span>
                  <span className="font-medium">{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;