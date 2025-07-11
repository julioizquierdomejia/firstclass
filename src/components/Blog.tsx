import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';

const Blog = () => {
  const articles = [
    {
      title: "Guía completa para importar desde Estados Unidos",
      excerpt: "Todo lo que necesitas saber sobre impuestos, aranceles y regulaciones aduaneras.",
      image: "https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      date: "15 Mar 2024",
      readTime: "5 min"
    },
    {
      title: "Black Friday: Consejos para aprovechar ofertas",
      excerpt: "Estrategias para maximizar tus compras durante las temporadas de descuentos.",
      image: "https://images.pexels.com/photos/5632371/pexels-photo-5632371.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      date: "10 Mar 2024",
      readTime: "3 min"
    },
    {
      title: "Nuevas rutas de envío a Ecuador",
      excerpt: "Ampliamos nuestra cobertura con nuevas ciudades y tiempos de entrega mejorados.",
      image: "https://images.pexels.com/photos/4246148/pexels-photo-4246148.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      date: "5 Mar 2024",
      readTime: "4 min"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Blog y noticias
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Mantente informado sobre las últimas tendencias en comercio internacional
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <article
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-sm text-gray-600">
                  {article.readTime}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <Calendar className="h-4 w-4 mr-1" />
                  {article.date}
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                  {article.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                
                <a
                  href="#"
                  className="inline-flex items-center text-primary hover:text-primary-dark font-medium transition-colors duration-200"
                >
                  Leer más
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-flex items-center bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Ver todos los artículos
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Blog;