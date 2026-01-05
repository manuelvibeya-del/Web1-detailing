import React from 'react';
import { CheckCircle, Clock, Star, MapPin, ShieldCheck, UserCheck, Play } from 'lucide-react';

const Hero = () => (
  <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-900/40 via-slate-950 to-slate-950 -z-10"></div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center">
      <div className="w-full lg:w-1/2 lg:pr-12 mt-12 lg:mt-0">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
          ¡Deja que tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">auto brille</span> como nunca antes!
        </h1>
        <p className="text-lg text-gray-300 mb-8 leading-relaxed">
          Latino Shine Auto Detailing te ofrece un servicio de detallado completo con atención en español y comodidad. 
          ¡Disfruta de un auto impecable sin moverte de tu casa!
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg shadow-purple-600/30 transition-all transform hover:-translate-y-1">
            ¡Reserva Ahora!
          </button>
          <button className="bg-white hover:bg-gray-100 text-slate-900 px-8 py-4 rounded-lg font-bold text-lg shadow-lg transition-all border border-gray-200">
            Ver Servicios
          </button>
        </div>
      </div>
      <div className="w-full lg:w-1/2">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/10 border border-slate-800">
          <img 
            src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
            alt="Auto detallado profesional" 
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
        </div>
      </div>
    </div>
  </section>
);

const Audience = () => (
  <section className="py-20 bg-slate-950">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 hover:border-purple-500/50 transition-colors">
          <div className="bg-purple-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-6">
            <UserCheck className="text-purple-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">¿A Quién Está Dirigido?</h3>
          <p className="text-gray-400 leading-relaxed">
            Este servicio está dirigido a latinos residentes en Estados Unidos que buscan un cuidado de calidad para su vehículo sin perder tiempo. Si eres profesional ocupado, padre de familia o dueño de un vehículo valioso.
          </p>
        </div>
        <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 hover:border-purple-500/50 transition-colors">
          <div className="bg-purple-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-6">
            <Clock className="text-purple-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">¿Falta de tiempo?</h3>
          <p className="text-gray-400 leading-relaxed">
            Sabemos que tu vida es ocupada. Tienes trabajo, familia y compromisos. No tienes tiempo para llevar tu vehículo a un detallado. Te preocupa que tu auto pierda su valor.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const Services = () => (
  <section id="services" className="py-20 bg-slate-900">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <span className="text-purple-400 font-semibold tracking-wider uppercase text-sm">Nuestros Servicios</span>
        <h2 className="text-3xl md:text-5xl font-bold text-white mt-2">Soluciones Profesionales a Domicilio</h2>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { title: "Detallado Exterior", items: ["Pulido y encerado", "Limpieza de llantas", "Corrección de pintura"], icon: "🚗" },
          { title: "Detallado Interior", items: ["Aspirado profundo", "Limpieza de tapicería", "Desodorización"], icon: "✨" },
          { title: "Tratamientos Especiales", items: ["Cerámico 9H", "Protección UV", "Restauración de faros"], icon: "💎" },
        ].map((service, idx) => (
          <div key={idx} className="bg-slate-950 p-8 rounded-2xl border border-slate-800 hover:translate-y-2 transition-transform duration-300 relative group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-6xl select-none">
              {service.icon}
            </div>
            <div className="bg-purple-600/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-2xl">
              {service.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
            <ul className="space-y-3">
              {service.items.map((item, i) => (
                <li key={i} className="flex items-center text-gray-400">
                  <CheckCircle className="w-4 h-4 text-purple-500 mr-2" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Benefits = () => (
  <section className="py-20 bg-slate-950 overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-16">
      <div className="w-full md:w-1/2">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Beneficios de Elegirnos</h2>
        <div className="space-y-8">
          {[
            { title: "Comodidad Total", desc: "Servicio móvil donde lo necesites.", icon: <MapPin className="w-6 h-6 text-white"/> },
            { title: "Calidad Profesional", desc: "Productos premium y técnicos expertos.", icon: <Star className="w-6 h-6 text-white"/> },
            { title: "Atención en Español", desc: "Comunicación clara y directa.", icon: <UserCheck className="w-6 h-6 text-white"/> },
            { title: "Satisfacción Garantizada", desc: "Si no quedas feliz, lo arreglamos.", icon: <ShieldCheck className="w-6 h-6 text-white"/> }
          ].map((benefit, idx) => (
            <div key={idx} className="flex items-start">
              <div className="bg-purple-600 p-3 rounded-lg mr-4 shrink-0 shadow-lg shadow-purple-600/20">
                {benefit.icon}
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">{benefit.title}</h4>
                <p className="text-gray-400">{benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full md:w-1/2 relative">
         <div className="grid grid-cols-2 gap-4">
             <img src="https://images.unsplash.com/photo-1600588692798-25032a27547d?auto=format&fit=crop&w=500&q=80" className="rounded-2xl shadow-2xl translate-y-8" alt="Interior"/>
             <img src="https://images.unsplash.com/photo-1626071485669-e09219d20c45?auto=format&fit=crop&w=500&q=80" className="rounded-2xl shadow-2xl" alt="Polishing"/>
         </div>
      </div>
    </div>
  </section>
);

const Offer = () => (
  <section id="offer" className="py-24 relative bg-purple-900 overflow-hidden">
     <div className="absolute inset-0 bg-slate-950/80"></div>
     <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
     
     <div className="relative max-w-4xl mx-auto px-4 text-center z-10">
       <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 px-4 py-1 rounded-full text-sm font-semibold mb-6 inline-block">Oferta de Bienvenida</span>
       <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-6">40% DE DESCUENTO</h2>
       <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
         En tu primer servicio completo. No dejes pasar esta oportunidad para darle a tu vehículo el cuidado que se merece.
       </p>
       <button className="bg-white text-purple-900 hover:bg-gray-100 px-10 py-4 rounded-lg font-bold text-xl shadow-xl transition-transform hover:scale-105">
         ¡Reserva Ahora y Ahorra!
       </button>
       <p className="mt-4 text-sm text-gray-400">*Oferta por tiempo limitado</p>
     </div>
  </section>
);

const Testimonials = () => (
  <section id="testimonials" className="py-20 bg-slate-950">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">Lo que dicen nuestros clientes</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { name: "Carlos G.", text: "Excelente servicio. Mi auto quedó impecable y ni tuve que moverme de casa.", img: "https://randomuser.me/api/portraits/men/32.jpg" },
          { name: "Marta R.", text: "Mi camioneta lucía como nueva. Muy profesionales y atentos. ¡Gracias!", img: "https://randomuser.me/api/portraits/women/44.jpg" },
          { name: "Jose L.", text: "La mejor inversión para mi coche. El detallado cerámico es increíble.", img: "https://randomuser.me/api/portraits/men/66.jpg" },
        ].map((t, i) => (
          <div key={i} className="bg-slate-900 p-8 rounded-2xl border border-slate-800 flex flex-col">
            <div className="text-purple-500 text-4xl mb-4">“</div>
            <p className="text-gray-300 flex-grow mb-6 italic">{t.text}</p>
            <div className="flex items-center">
              <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full mr-4 border-2 border-purple-500" />
              <div>
                <h5 className="text-white font-bold">{t.name}</h5>
                <span className="text-xs text-green-400 flex items-center"><CheckCircle className="w-3 h-3 mr-1"/> Cliente Verificado</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-3 gap-12 mb-12">
        <div>
          <div className="flex items-center mb-6">
            <span className="font-bold text-2xl tracking-tighter text-white">Latino<span className="text-purple-500">Shine</span></span>
          </div>
          <p className="text-gray-500 text-sm">
            Servicio de detallado automotriz premium a domicilio. Calidad, confianza y atención en su idioma.
          </p>
        </div>
        <div>
           <h4 className="text-white font-bold mb-6">Enlaces Rápidos</h4>
           <ul className="space-y-2 text-gray-500 text-sm">
             <li><a href="#" className="hover:text-purple-400">Inicio</a></li>
             <li><a href="#" className="hover:text-purple-400">Servicios</a></li>
             <li><a href="#" className="hover:text-purple-400">Testimonios</a></li>
             <li><a href="#" className="hover:text-purple-400">Oferta</a></li>
           </ul>
        </div>
        <div>
           <h4 className="text-white font-bold mb-6">Contacto</h4>
           <ul className="space-y-2 text-gray-500 text-sm">
             <li>(555) 123-4567</li>
             <li>hola@latinoshine.com</li>
             <li>Miami, FL</li>
           </ul>
        </div>
      </div>
      <div className="border-t border-slate-900 pt-8 text-center text-gray-600 text-xs">
        &copy; {new Date().getFullYear()} Latino Shine Auto Detailing. Todos los derechos reservados.
      </div>
    </div>
  </footer>
);

export const LandingPage = () => (
  <div className="w-full">
    <Hero />
    <Audience />
    <Services />
    <Benefits />
    <Offer />
    <Testimonials />
    <Footer />
  </div>
);
