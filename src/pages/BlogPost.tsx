import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Eye, 
  Heart, 
  Share2, 
  Bookmark,
  ArrowRight,
  MessageCircle,
  ThumbsUp,
  Twitter,
  Facebook,
  Linkedin,
  Copy,
  Check,
  Star,
  Award,
  TrendingUp,
  BookOpen,
  User,
  Mail,
  Globe,
  Play,
  Coffee,
  Lightbulb,
  Target,
  Zap,
  ChevronRight
} from 'lucide-react';
import { 
  getPostBySlug, 
  getRelatedPosts, 
  blogCategories,
  BlogPost as BlogPostType 
} from '../data/blogData';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([]);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [views, setViews] = useState(0);
  const [copied, setCopied] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const observerRef = useRef<IntersectionObserver | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (slug) {
      const foundPost = getPostBySlug(slug);
      if (foundPost) {
        setPost(foundPost);
        setLikes(foundPost.likes);
        setViews(foundPost.views + 1); // Increment view count
        setRelatedPosts(getRelatedPosts(foundPost));
      }
    }
  }, [slug]);

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
  }, [post]);

  // Reading progress
  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const element = contentRef.current;
        const totalHeight = element.scrollHeight - element.clientHeight;
        const windowScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        
        if (totalHeight > 0) {
          const progress = Math.min((windowScrollTop / totalHeight) * 100, 100);
          setReadingProgress(progress);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Artículo no encontrado</h1>
          <Link to="/blog" className="text-primary hover:text-primary-dark">
            Volver al blog
          </Link>
        </div>
      </div>
    );
  }

  const categoryData = blogCategories.find(cat => cat.id === post.category);

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

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = async (platform: string) => {
    const url = window.location.href;
    const title = post.title;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        try {
          await navigator.clipboard.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (err) {
          console.error('Failed to copy: ', err);
        }
        break;
    }
  };

  // Convert markdown-like content to HTML (simplified)
  const formatContent = (content: string) => {
    return content
      .replace(/^# (.*$)/gim, '<h1 class="text-4xl font-bold text-gray-900 mb-6 mt-8">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-3xl font-bold text-gray-900 mb-4 mt-8">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-2xl font-bold text-gray-900 mb-3 mt-6">$1</h3>')
      .replace(/^\*\*(.*)\*\*/gim, '<strong class="font-bold text-gray-900">$1</strong>')
      .replace(/^\* (.*$)/gim, '<li class="mb-2">$1</li>')
      .replace(/^- (.*$)/gim, '<li class="mb-2 ml-4">• $1</li>')
      .replace(/\n\n/g, '</p><p class="text-lg text-gray-700 leading-relaxed mb-6">')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:text-primary-dark underline font-medium">$1</a>');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden" ref={contentRef}>
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-yellow-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumbs */}
          <div className="mb-8">
            <Breadcrumbs className="text-white/80" />
          </div>

          <div className="text-center">
            {/* Category Badge */}
            <div 
              className={`inline-flex items-center bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full text-white font-medium mb-8 border border-white/20 transition-all duration-1000 ${isVisible['category-badge'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              data-animate
              id="category-badge"
            >
              <span className="text-2xl mr-3">{categoryData?.icon}</span>
              {categoryData?.name}
            </div>

            {/* Title */}
            <h1 
              className={`text-4xl lg:text-6xl font-bold text-white mb-8 leading-tight transition-all duration-1000 delay-400 ${isVisible['title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              data-animate
              id="title"
            >
              {post.title}
            </h1>

            {/* Excerpt */}
            <p 
              className={`text-xl lg:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 delay-600 ${isVisible['excerpt'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              data-animate
              id="excerpt"
            >
              {post.excerpt}
            </p>

            {/* Meta Info */}
            <div 
              className={`flex flex-wrap items-center justify-center gap-8 text-white/80 mb-12 transition-all duration-1000 delay-800 ${isVisible['meta'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              data-animate
              id="meta"
            >
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                <Calendar className="w-5 h-5 mr-2" />
                {formatDate(post.publishedAt)}
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                <Clock className="w-5 h-5 mr-2" />
                {post.readTime} min de lectura
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                <Eye className="w-5 h-5 mr-2" />
                {formatNumber(views)} vistas
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                <Heart className="w-5 h-5 mr-2" />
                {formatNumber(likes)} likes
              </div>
            </div>

            {/* Author */}
            <div 
              className={`flex items-center justify-center space-x-6 transition-all duration-1000 delay-1000 ${isVisible['author'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              data-animate
              id="author"
            >
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-white/20 shadow-xl"
              />
              <div className="text-left">
                <p className="font-bold text-white text-xl">{post.author.name}</p>
                <p className="text-white/80 text-lg">{post.author.bio}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-1000 ${isVisible['featured-image'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            data-animate
            id="featured-image"
          >
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-80 lg:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            
            {/* Floating Play Button */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-500">
              <div className="bg-white/20 backdrop-blur-sm p-6 rounded-full border border-white/30">
                <Play className="w-12 h-12 text-white fill-current" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            
            {/* Article Content */}
            <div className="lg:col-span-3">
              <article 
                className={`prose prose-lg max-w-none transition-all duration-1000 ${isVisible['content'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                data-animate
                id="content"
              >
                <div 
                  className="text-lg text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ 
                    __html: `<p class="text-lg text-gray-700 leading-relaxed mb-6">${formatContent(post.content)}</p>` 
                  }}
                />
              </article>

              {/* Tags */}
              <div 
                className={`mt-16 pt-8 border-t border-gray-200 transition-all duration-1000 delay-200 ${isVisible['tags'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                data-animate
                id="tags"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Etiquetas</h3>
                <div className="flex flex-wrap gap-3">
                  {post.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-gradient-to-r from-primary/10 to-secondary/10 text-primary px-6 py-3 rounded-full font-semibold hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-white transition-all duration-300 cursor-pointer border border-primary/20 hover:border-transparent transform hover:scale-105"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Share Section */}
              <div 
                className={`mt-12 pt-8 border-t border-gray-200 transition-all duration-1000 delay-400 ${isVisible['share'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                data-animate
                id="share"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Compartir artículo</h3>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => handleShare('twitter')}
                    className="flex items-center space-x-3 bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white px-6 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold"
                  >
                    <Twitter className="w-5 h-5" />
                    <span>Twitter</span>
                  </button>
                  <button
                    onClick={() => handleShare('facebook')}
                    className="flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold"
                  >
                    <Facebook className="w-5 h-5" />
                    <span>Facebook</span>
                  </button>
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="flex items-center space-x-3 bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white px-6 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold"
                  >
                    <Linkedin className="w-5 h-5" />
                    <span>LinkedIn</span>
                  </button>
                  <button
                    onClick={() => handleShare('copy')}
                    className="flex items-center space-x-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-6 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold"
                  >
                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    <span>{copied ? 'Copiado!' : 'Copiar enlace'}</span>
                  </button>
                </div>
              </div>

              {/* Author Bio */}
              <div 
                className={`mt-16 pt-8 border-t border-gray-200 transition-all duration-1000 delay-600 ${isVisible['author-bio'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                data-animate
                id="author-bio"
              >
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-10 border border-gray-200 shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-8">Sobre el autor</h3>
                  <div className="flex items-start space-x-8">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-24 h-24 rounded-full object-cover shadow-lg"
                    />
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">{post.author.name}</h4>
                      <p className="text-gray-600 mb-6 leading-relaxed text-lg">{post.author.bio}</p>
                      <div className="flex space-x-4">
                        <button className="flex items-center space-x-2 text-primary hover:text-primary-dark transition-colors duration-200 font-semibold">
                          <Mail className="w-5 h-5" />
                          <span>Contactar</span>
                        </button>
                        <button className="flex items-center space-x-2 text-primary hover:text-primary-dark transition-colors duration-200 font-semibold">
                          <Globe className="w-5 h-5" />
                          <span>Ver perfil</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-8">
                
                {/* Action Buttons */}
                <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-lg">
                  <div className="space-y-4">
                    <button
                      onClick={handleLike}
                      className={`w-full flex items-center justify-center space-x-3 px-6 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 ${
                        isLiked 
                          ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg' 
                          : 'bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-500 border border-gray-200 hover:border-red-200'
                      }`}
                    >
                      <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
                      <span>{isLiked ? 'Te gusta' : 'Me gusta'}</span>
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-bold">
                        {formatNumber(likes)}
                      </span>
                    </button>
                    
                    <button
                      onClick={handleBookmark}
                      className={`w-full flex items-center justify-center space-x-3 px-6 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 ${
                        isBookmarked 
                          ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg' 
                          : 'bg-gray-100 text-gray-700 hover:bg-primary/10 hover:text-primary border border-gray-200 hover:border-primary/20'
                      }`}
                    >
                      <Bookmark className={`w-6 h-6 ${isBookmarked ? 'fill-current' : ''}`} />
                      <span>{isBookmarked ? 'Guardado' : 'Guardar'}</span>
                    </button>
                    
                    <button
                      onClick={() => handleShare('copy')}
                      className="w-full flex items-center justify-center space-x-3 px-6 py-4 rounded-2xl font-bold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 border border-gray-200"
                    >
                      <Share2 className="w-6 h-6" />
                      <span>Compartir</span>
                    </button>
                  </div>
                </div>

                {/* Table of Contents */}
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-200 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <BookOpen className="w-6 h-6 mr-3 text-primary" />
                    Contenido
                  </h3>
                  <nav className="space-y-3">
                    {post.content.match(/^#{1,3} (.+)$/gm)?.slice(0, 6).map((heading, index) => {
                      const level = heading.match(/^#+/)?.[0].length || 1;
                      const text = heading.replace(/^#+\s/, '');
                      return (
                        <a
                          key={index}
                          href={`#${text.toLowerCase().replace(/\s+/g, '-')}`}
                          className={`block text-sm hover:text-primary transition-colors duration-200 font-medium p-3 rounded-xl hover:bg-primary/5 ${
                            level === 1 ? 'font-bold text-base' : level === 2 ? 'ml-4' : 'ml-8'
                          }`}
                        >
                          {text}
                        </a>
                      );
                    })}
                  </nav>
                </div>

                {/* Stats */}
                <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl p-8 border border-primary/20">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Estadísticas</h3>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                          <Eye className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-semibold text-gray-600">Vistas</span>
                      </div>
                      <span className="text-2xl font-bold text-gray-900">{formatNumber(views)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center">
                          <Heart className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-semibold text-gray-600">Likes</span>
                      </div>
                      <span className="text-2xl font-bold text-gray-900">{formatNumber(likes)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                          <Share2 className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-semibold text-gray-600">Compartidos</span>
                      </div>
                      <span className="text-2xl font-bold text-gray-900">{Math.floor(views * 0.1)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-2xl flex items-center justify-center">
                          <Clock className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-semibold text-gray-600">Tiempo de lectura</span>
                      </div>
                      <span className="text-2xl font-bold text-gray-900">{post.readTime} min</span>
                    </div>
                  </div>
                </div>

                {/* Newsletter Signup */}
                <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-2xl"></div>
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-3 flex items-center">
                      <MessageCircle className="w-6 h-6 mr-3" />
                      ¿Te gustó este artículo?
                    </h3>
                    <p className="text-white/80 mb-6 leading-relaxed">
                      Recibe contenido similar directo en tu email
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
                      Sin spam. Solo contenido de calidad.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div 
              className={`text-center mb-16 transition-all duration-1000 ${isVisible['related-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              data-animate
              id="related-title"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Artículos relacionados
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Continúa aprendiendo con estos artículos que también te pueden interesar
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost, index) => (
                <article
                  key={relatedPost.id}
                  className={`group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-3 border border-gray-100 hover:border-primary/20 animate-slide-in-bottom`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <Link to={`/blog/${relatedPost.slug}`} className="block h-full">
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={relatedPost.featuredImage}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      {/* Read time */}
                      <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-2 rounded-full text-sm flex items-center shadow-lg">
                        <Clock className="w-3 h-3 mr-1" />
                        {relatedPost.readTime} min
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
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(relatedPost.publishedAt)}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Eye className="w-4 h-4" />
                          <span>{formatNumber(relatedPost.views)}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                        {relatedPost.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-gray-600 mb-6 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>

                      {/* Read more */}
                      <div className="flex items-center text-primary group-hover:translate-x-2 transition-transform duration-300">
                        <span className="font-semibold mr-2">Leer más</span>
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

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
              ¿Listo para aplicar lo aprendido?
            </h2>
            <p className="text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Comienza tu journey de importación con FirstClass Courier
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
                Leer más artículos
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

export default BlogPost;