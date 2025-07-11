import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Eye, 
  Heart, 
  ArrowRight,
  Search,
  Filter,
  Grid,
  List,
  TrendingUp,
  Star,
  BookOpen,
  Users,
  MessageCircle,
  Share2,
  Bookmark,
  Play,
  Coffee,
  Lightbulb,
  Target,
  Zap,
  ChevronRight
} from 'lucide-react';
import { 
  blogCategories, 
  getPostsByCategory, 
  getRecentPosts,
  BlogPost,
  BlogCategory as BlogCategoryType 
} from '../data/blogData';

const BlogCategory = () => {
  const { category } = useParams<{ category: string }>();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('recent');
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [isVisible, setIsVisible] = useState({});
  const observerRef = useRef<IntersectionObserver | null>(null);

  const categoryData: BlogCategoryType | undefined = blogCategories.find(cat => cat.id === category);
  const categoryPosts = getPostsByCategory(category || '');
  const recentPosts = getRecentPosts(4);

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

  // Filter and sort posts
  useEffect(() => {
    let filtered = categoryPosts;
    
    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Sort posts
    switch (sortBy) {
      case 'recent':
        filtered = filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
        break;
      case 'popular':
        filtered = filtered.sort((a, b) => b.views - a.views);
        break;
      case 'liked':
        filtered = filtered.sort((a, b) => b.likes - a.likes);
        break;
      default:
        break;
    }
    
    setFilteredPosts(filtered);
  }, [categoryPosts, searchTerm, sortBy]);

  if (!categoryData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Categoría no encontrada</h1>
          <Link to="/blog" className="text-primary hover:text-primary-dark">
            Volver al blog
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  const PostCard = ({ post, index }: { post: BlogPost; index: number }) => (
    <article
      className={`group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-3 border border-gray-100 hover:border-primary/20 animate-slide-in-bottom`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <Link to={`/blog/${post.slug}`} className="block h-full">
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
          
          {/* Floating Badges */}
          <div className="absolute top-6 left-6 flex flex-wrap gap-2">
            {post.isFeatured && (
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center shadow-lg backdrop-blur-sm">
                <Star className="w-4 h-4 mr-1 fill-current" />
                DESTACADO
              </span>
            )}
            {post.isSponsored && (
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm">
                PATROCINADO
              </span>
            )}
          </div>

          {/* Read time */}
          <div className="absolute bottom-6 right-6 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm flex items-center shadow-lg">
            <Clock className="w-4 h-4 mr-1" />
            {post.readTime} min
          </div>

          {/* Hover Play Button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full border border-white/30">
              <Play className="w-8 h-8 text-white fill-current" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Meta info */}
          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {formatDate(post.publishedAt)}
              </div>
              <div className="flex items-center">
                <Eye className="w-4 h-4 mr-1" />
                {formatNumber(post.views)}
              </div>
              <div className="flex items-center">
                <Heart className="w-4 h-4 mr-1" />
                {formatNumber(post.likes)}
              </div>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors duration-300 leading-tight line-clamp-2">
            {post.title}
          </h2>

          {/* Excerpt */}
          <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.slice(0, 3).map((tag, tagIndex) => (
              <span 
                key={tagIndex}
                className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium hover:bg-primary hover:text-white transition-colors duration-200 cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Author & CTA */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100"
              />
              <div>
                <p className="font-semibold text-gray-900">{post.author.name}</p>
                <p className="text-gray-500 text-sm line-clamp-1">{post.author.bio}</p>
              </div>
            </div>
            
            <div className="flex items-center text-primary group-hover:translate-x-2 transition-transform duration-300">
              <span className="font-semibold mr-2">Leer más</span>
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </div>
      </Link>
    </article>
  );

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
              <span className="text-3xl mr-3">{categoryData.icon}</span>
              Categoría Especializada
            </div>

            <h1 
              className={`text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight transition-all duration-1000 delay-400 ${isVisible['hero-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              data-animate
              id="hero-title"
            >
              {categoryData.name}
            </h1>

            <p 
              className={`text-xl lg:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 delay-600 ${isVisible['hero-desc'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              data-animate
              id="hero-desc"
            >
              {categoryData.description}
            </p>

            {/* Stats */}
            <div 
              className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto transition-all duration-1000 delay-800 ${isVisible['hero-stats'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              data-animate
              id="hero-stats"
            >
              {[
                { number: categoryData.postCount.toString(), label: "Artículos publicados", icon: BookOpen },
                { number: "25k+", label: "Lectores mensuales", icon: Users },
                { number: "4.9", label: "Rating promedio", icon: Star }
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

      {/* Filters Section */}
      <section className="py-8 bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-16 lg:top-20 z-30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Enhanced Search */}
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <input
                type="text"
                placeholder={`Buscar en ${categoryData.name}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-16 pr-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-primary focus:ring-0 transition-all duration-300 bg-white shadow-sm hover:shadow-md"
              />
            </div>

            {/* Sort & View Controls */}
            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-6 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-0 transition-colors duration-200 bg-white font-medium"
              >
                <option value="recent">Más recientes</option>
                <option value="popular">Más populares</option>
                <option value="liked">Más gustados</option>
              </select>

              <div className="flex items-center space-x-2 bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-lg transition-all duration-200 ${viewMode === 'grid' ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-lg transition-all duration-200 ${viewMode === 'list' ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>

              {/* Results Count */}
              <div className="text-gray-600 font-medium">
                <span className="text-2xl font-bold text-primary">{filteredPosts.length}</span> artículos
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            
            {/* Main Posts */}
            <div className="lg:col-span-3">
              {filteredPosts.length > 0 ? (
                <div className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                  {filteredPosts.map((post, index) => (
                    <PostCard key={post.id} post={post} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="w-40 h-40 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-8 relative overflow-hidden">
                    <Search className="w-20 h-20 text-gray-400" />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 animate-pulse"></div>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">
                    No se encontraron artículos
                  </h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">
                    {searchTerm 
                      ? `No encontramos artículos que coincidan con "${searchTerm}" en esta categoría`
                      : 'No hay artículos en esta categoría aún'
                    }
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => setSearchTerm('')}
                      className="bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white px-10 py-4 rounded-2xl text-lg font-bold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl"
                    >
                      Limpiar búsqueda
                    </button>
                    <Link
                      to="/blog"
                      className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-10 py-4 rounded-2xl text-lg font-bold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                    >
                      Ver todas las categorías
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-8">
                
                {/* Category Info */}
                <div className={`bg-gradient-to-br ${categoryData.color} rounded-3xl p-8 text-white relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                  <div className="relative z-10">
                    <div className="text-5xl mb-6">{categoryData.icon}</div>
                    <h3 className="text-2xl font-bold mb-4">{categoryData.name}</h3>
                    <p className="text-white/90 mb-6 leading-relaxed">{categoryData.description}</p>
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                      <div className="text-3xl font-bold mb-2">{categoryData.postCount}</div>
                      <div className="text-white/80">Artículos publicados</div>
                    </div>
                  </div>
                </div>

                {/* Other Categories */}
                <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    Otras categorías
                  </h3>
                  <div className="space-y-4">
                    {blogCategories
                      .filter(cat => cat.id !== category)
                      .slice(0, 4)
                      .map((cat) => (
                        <Link
                          key={cat.id}
                          to={`/blog/categoria/${cat.id}`}
                          className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-gray-50 transition-all duration-300 group border border-gray-100 hover:border-primary/20 hover:shadow-md"
                        >
                          <div className={`w-12 h-12 bg-gradient-to-br ${cat.color} rounded-2xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300`}>
                            {cat.icon}
                          </div>
                          <div className="flex-1">
                            <div className="font-bold text-gray-900 group-hover:text-primary transition-colors duration-200">
                              {cat.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {cat.postCount} artículos
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
                        </Link>
                      ))}
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <Link
                      to="/blog"
                      className="text-primary hover:text-primary-dark font-bold flex items-center group"
                    >
                      Ver todas las categorías
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>
                  </div>
                </div>

                {/* Recent Posts */}
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-200 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <Clock className="w-6 h-6 mr-3 text-primary" />
                    Artículos Recientes
                  </h3>
                  <div className="space-y-6">
                    {recentPosts.map((post) => (
                      <Link
                        key={post.id}
                        to={`/blog/${post.slug}`}
                        className="block group"
                      >
                        <div className="flex space-x-4">
                          <img
                            src={post.featuredImage}
                            alt={post.title}
                            className="w-20 h-20 rounded-2xl object-cover group-hover:scale-105 transition-transform duration-300 shadow-sm"
                          />
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900 group-hover:text-primary transition-colors duration-300 line-clamp-2 mb-2">
                              {post.title}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {formatDate(post.publishedAt)}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Newsletter Signup */}
                <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-2xl"></div>
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-3 flex items-center">
                      <MessageCircle className="w-6 h-6 mr-3" />
                      Newsletter Especializado
                    </h3>
                    <p className="text-white/80 mb-6 leading-relaxed">
                      Recibe contenido exclusivo sobre {categoryData.name.toLowerCase()}
                    </p>
                    <div className="space-y-4">
                      <input
                        type="email"
                        placeholder="Tu email"
                        className="w-full px-6 py-4 rounded-2xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-primary focus:outline-none font-medium"
                      />
                      <button className="w-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg">
                        Suscribirme
                      </button>
                    </div>
                    <p className="text-xs text-white/60 mt-4 text-center">
                      Contenido especializado y sin spam.
                    </p>
                  </div>
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
              ¿Te gustó este contenido?
            </h2>
            <p className="text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Aplica todo lo que has aprendido y comienza tu journey de importación
            </p>
            
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <Link
                to="/casillero-virtual"
                className="bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white px-16 py-6 rounded-2xl text-xl font-bold transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 shadow-2xl hover:shadow-3xl flex items-center justify-center group"
              >
                <Target className="mr-4 h-7 w-7" />
                Comenzar ahora
                <ArrowRight className="ml-4 h-7 w-7 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
              
              <Link
                to="/blog"
                className="border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-gray-900 px-12 py-6 rounded-2xl text-xl font-bold transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 flex items-center justify-center group"
              >
                <Coffee className="mr-4 h-7 w-7" />
                Explorar más contenido
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { icon: "✅", text: "Guías paso a paso" },
                { icon: "✅", text: "Casos reales" },
                { icon: "✅", text: "Soporte especializado" }
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

export default BlogCategory;