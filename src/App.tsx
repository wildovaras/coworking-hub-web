import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ChevronRight,
  Menu,
  Search,
  Sparkles,
  Users,
  Calendar,
  Coffee,
  Wifi,
  Phone,
  Headphones,
  ArrowRight,
  Check,
  MapPin
} from 'lucide-react';

// API_BASE vacío en dev (Vite proxy reenvía /api → Render). En prod build, set VITE_API_BASE.
const API_BASE = import.meta.env.VITE_API_BASE || '';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4';

// ============================================================
// PRIMITIVES
// ============================================================
function LogoMark({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 256 256" fill="white" className={className} aria-hidden="true">
      <path d="M 0 128 C 70.692 128 128 185.308 128 256 L 64 256 C 64 220.654 35.346 192 0 192 Z M 256 192 C 220.654 192 192 220.654 192 256 L 128 256 C 128 185.308 185.308 128 256 128 Z M 128 0 C 128 70.692 70.692 128 0 128 L 0 64 C 35.346 64 64 35.346 64 0 Z M 192 0 C 192 35.346 220.654 64 256 64 L 256 128 C 185.308 128 128 70.692 128 0 Z" />
    </svg>
  );
}

function PrimaryButton({
  label,
  onClick,
  full = false,
  loading = false,
  variant = 'light'
}: {
  label: string;
  onClick?: () => void;
  full?: boolean;
  loading?: boolean;
  variant?: 'light' | 'dark';
}) {
  const base = variant === 'light'
    ? 'bg-white text-black hover:bg-white/90'
    : 'bg-black text-white hover:bg-black/90';
  return (
    <button
      disabled={loading}
      onClick={onClick}
      className={`group inline-flex items-center justify-center gap-2 rounded-full font-medium text-sm px-5 py-3 transition-all active:scale-[0.98] disabled:opacity-60 ${base} ${
        full ? 'w-full' : ''
      }`}
    >
      <span>{loading ? 'Procesando…' : label}</span>
      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-[1px]" />
    </button>
  );
}

function SectionEyebrow({ label, tag }: { label: string; tag?: string }) {
  return (
    <div className="inline-flex items-center gap-2 text-xs text-white/60">
      <span className="w-1.5 h-1.5 rounded-full bg-white" />
      <span className="font-medium uppercase tracking-widest">{label}</span>
      {tag && (
        <span className="px-2 py-0.5 rounded-full border border-white/10 text-white/50">{tag}</span>
      )}
    </div>
  );
}

const gradientStyle: React.CSSProperties = {
  backgroundImage:
    'linear-gradient(to right, #091020 0%, #0B2551 12.5%, #A4F4FD 32.5%, #00d2ff 50%, #0B2551 67.5%, #091020 87.5%, #091020 100%)',
  backgroundSize: '200% auto',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
  WebkitTextFillColor: 'transparent',
  filter: 'url(#c3-noise)'
};

// ============================================================
// SECTIONS
// ============================================================

function Navbar() {
  const links = ['Espacios', 'Planes', 'Visitar', 'Comunidad', 'Contacto'];
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="max-w-6xl mx-auto px-6 pt-6 flex items-center justify-between relative z-10"
    >
      <div className="flex items-center gap-3">
        <LogoMark className="w-7 h-7" />
        <span className="text-sm font-semibold tracking-tight">Coworking Hub</span>
      </div>

      <div className="hidden md:flex gap-8">
        {links.map((link, i) => (
          <motion.a
            key={link}
            href={`#${link.toLowerCase()}`}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 + i * 0.05 }}
            className="text-white/70 text-sm font-medium hover:text-white transition-colors"
          >
            {link}
          </motion.a>
        ))}
      </div>

      <div className="hidden md:flex items-center gap-2">
        <a
          href="/admin"
          className="text-xs text-white/50 hover:text-white px-3 py-2 rounded-full transition"
        >
          Acceso staff
        </a>
        <PrimaryButton label="Reservar visita" />
      </div>

      <button className="md:hidden w-10 h-10 rounded-full border border-white/10 bg-white/5 grid place-items-center">
        <Menu className="w-5 h-5" />
      </button>
    </motion.nav>
  );
}

function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-6 pt-16 md:pt-28 pb-20 text-center flex flex-col items-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="inline-flex items-center gap-2 text-xs text-white/60 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] mb-8"
      >
        <MapPin className="w-3.5 h-3.5" />
        Las Condes · Santiago
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="text-4xl md:text-7xl font-semibold tracking-tight leading-[0.9]"
      >
        <span className="block">Tu espacio.</span>
        <span className="block animate-shiny" style={gradientStyle}>
          Reinventado
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
        className="mt-8 text-white/60 max-w-md text-base leading-[1.5]"
      >
        Un coworking premium pensado para profesionales que quieren foco, comunidad y café de
        especialidad. Hot desks, salas privadas, phone booths e internet ultrarrápido.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7, ease: 'easeOut' }}
        className="mt-8 flex flex-col items-center gap-3"
      >
        <PrimaryButton label="Comprar membresía" onClick={() => document.getElementById('planes')?.scrollIntoView({ behavior: 'smooth' })} />
        <span className="text-xs text-white/40">Pase diario desde $18.000 CLP · sin permanencia</span>
      </motion.div>
    </section>
  );
}

function MenuBar() {
  const items = ['Hot desks', 'Salas', 'Phone booths', 'Cafetería', 'Eventos'];
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.9, ease: 'easeOut' }}
      className="relative z-10 w-full h-10 bg-black/40 backdrop-blur-md border-t border-b border-white/10"
    >
      <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between text-xs">
        <div className="flex items-center gap-4">
          <LogoMark className="w-3.5 h-3.5" />
          <span className="font-bold text-white">Coworking Hub</span>
          {items.map((item, i) => (
            <span
              key={item}
              className={`text-white/70 ${i > 1 ? 'hidden sm:inline' : ''} ${
                i > 3 ? 'hidden md:inline' : ''
              }`}
            >
              {item}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2 text-white/60">
          <Wifi className="w-3.5 h-3.5" />
          <span>1 Gbps · disponible 24/7</span>
        </div>
      </div>
    </motion.div>
  );
}

function WorkspaceMockup() {
  // Reemplaza el inbox mockup. Muestra dashboard de ocupación en vivo del coworking.
  const reservas = [
    { hora: '08:00', recurso: 'Hot Desk · Pasillo norte', usuario: 'Camila R.', estado: 'En curso', activa: true },
    { hora: '09:30', recurso: 'Sala de reunión Atacama', usuario: 'Diego S. + 3', estado: 'Confirmada' },
    { hora: '11:00', recurso: 'Phone booth 2', usuario: 'María P.', estado: 'Confirmada' },
    { hora: '14:00', recurso: 'Escritorio dedicado #4', usuario: 'Andrés L.', estado: 'Día completo' },
    { hora: '16:30', recurso: 'Sala de reunión Aconcagua', usuario: 'Equipo Acme · 5', estado: 'Confirmada' },
    { hora: '18:00', recurso: 'Hot Desk · Ventanal', usuario: 'Sofía V.', estado: 'Confirmada' }
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-16 md:py-24 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0e1014]/90 backdrop-blur-2xl"
      >
        <div className="h-9 border-b border-white/10 flex items-center px-4 gap-2 relative">
          <span className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
          <span className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
          <span className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
          <span className="absolute left-1/2 -translate-x-1/2 text-xs text-white/50">
            Coworking Hub — Ocupación de hoy
          </span>
        </div>

        <div className="grid grid-cols-12 h-[520px]">
          {/* Sidebar — KPIs */}
          <aside className="col-span-3 border-r border-white/10 bg-black/30 p-4 flex flex-col gap-3 overflow-y-auto">
            <div className="text-[10px] uppercase tracking-widest text-white/40">Hoy · {new Date().toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'short' })}</div>

            <div className="liquid-glass rounded-lg p-3">
              <div className="text-[10px] uppercase tracking-widest text-white/50">Ocupación</div>
              <div className="text-2xl font-semibold mt-1 tracking-tight">87%</div>
              <div className="text-[10px] text-white/40 mt-1">7 de 8 puestos peak</div>
            </div>

            <div className="liquid-glass rounded-lg p-3">
              <div className="text-[10px] uppercase tracking-widest text-white/50">Reservas</div>
              <div className="text-2xl font-semibold mt-1 tracking-tight">14</div>
              <div className="text-[10px] text-white/40 mt-1">+3 vs ayer</div>
            </div>

            <div className="liquid-glass rounded-lg p-3">
              <div className="text-[10px] uppercase tracking-widest text-white/50">Cafetería</div>
              <div className="text-2xl font-semibold mt-1 tracking-tight">$94k</div>
              <div className="text-[10px] text-white/40 mt-1">CLP del día</div>
            </div>

            <div className="mt-2">
              <div className="text-[10px] uppercase tracking-widest text-white/30 mb-2 px-2">
                Recursos
              </div>
              <div className="flex flex-col gap-0.5">
                {[
                  { name: 'Hot desks', count: '6/8', color: '#00d2ff' },
                  { name: 'Salas', count: '2/2', color: '#A4F4FD' },
                  { name: 'Phone booths', count: '1/2', color: '#f59e0b' },
                  { name: 'Dedicados', count: '4/4', color: '#10b981' }
                ].map((l) => (
                  <div
                    key={l.name}
                    className="flex items-center justify-between gap-2 px-2 py-1 rounded-md text-xs text-white/70 hover:bg-white/5 transition"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ background: l.color }} />
                      {l.name}
                    </span>
                    <span className="text-[10px] text-white/40">{l.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Lista de reservas */}
          <div className="col-span-4 border-r border-white/10 flex flex-col">
            <div className="h-12 border-b border-white/10 px-4 flex items-center gap-2 text-white/50 text-xs">
              <Calendar className="w-3.5 h-3.5" />
              <span>Reservas del día</span>
            </div>
            <div className="flex-1 overflow-y-auto">
              {reservas.map((r, i) => (
                <div
                  key={i}
                  className={`px-4 py-3 border-b border-white/5 cursor-pointer transition ${
                    r.activa ? 'bg-white/[0.04]' : 'hover:bg-white/[0.02]'
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-xs text-white font-semibold tabular-nums">{r.hora}</span>
                    <span className="text-[10px] text-white/40">{r.estado}</span>
                  </div>
                  <div className="text-xs text-white/90 font-medium mt-0.5">{r.recurso}</div>
                  <div className="text-[11px] text-white/40 mt-0.5">{r.usuario}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Detalle — destacado */}
          <div className="col-span-5 flex flex-col">
            <div className="h-12 border-b border-white/10 px-4 flex items-center justify-between gap-2">
              <div className="text-xs text-white/60 font-medium">Sala de reunión · Aconcagua</div>
              <span className="text-[10px] text-white px-2 py-0.5 rounded-full border border-white/10">
                10 personas
              </span>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              <h3 className="text-base font-semibold text-white mb-1">Reunión equipo Acme</h3>
              <div className="text-xs text-white/50 mb-4">16:30 - 18:00 · Confirmada</div>

              <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3 mb-4">
                <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-white/60 mb-1.5">
                  <Sparkles className="w-3 h-3" style={{ color: '#A4F4FD' }} />
                  Pre-set automático
                </div>
                <p className="text-xs text-white/80 leading-relaxed">
                  Aire acondicionado a 22°C, pantalla Samsung QM55C lista, café de bienvenida para 5
                  personas. El recurso se preparará automáticamente 10 min antes.
                </p>
              </div>

              <div className="space-y-3 text-xs text-white/75 leading-[1.6]">
                <div className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-white/60 mt-0.5 shrink-0" />
                  <span>Pantalla 4K + cámara conferencias</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-white/60 mt-0.5 shrink-0" />
                  <span>Wi-Fi dedicado (1 Gbps)</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-white/60 mt-0.5 shrink-0" />
                  <span>Pizarra digital + plumones</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-white/60 mt-0.5 shrink-0" />
                  <span>Aislamiento acústico Steelcase</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-white/10">
                <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">
                  Asistentes confirmados
                </div>
                <div className="flex -space-x-2">
                  {['M', 'D', 'S', 'A', 'V'].map((n, i) => (
                    <div
                      key={i}
                      className="w-7 h-7 rounded-full border-2 border-[#0e1014] grid place-items-center text-[10px] font-bold text-white"
                      style={{
                        background: ['linear-gradient(135deg, #00d2ff, #0B2551)', '#3D81E3', '#1a1818', '#785ba5', '#4a7676'][i]
                      }}
                    >
                      {n}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function FeatureTriage() {
  // Adaptado: capacidad y servicios del coworking
  const recursos = [
    {
      label: 'Hot desks',
      count: 8,
      color: '#ffffff',
      items: ['Mesa colaborativa', 'Acceso ilimitado en horario']
    },
    {
      label: 'Escritorios dedicados',
      count: 4,
      color: '#e5e5e5',
      items: ['Tu silla, tu monitor', 'Lockers personalizados']
    },
    {
      label: 'Salas reunión',
      count: 2,
      color: '#a3a3a3',
      items: ['Pantalla 4K + AV', 'Reserva por horas']
    },
    {
      label: 'Phone booths',
      count: 2,
      color: '#525252',
      items: ['Aislamiento acústico', 'Para llamadas y video']
    }
  ];

  const chips = ['Wi-Fi 1 Gbps', 'Café de especialidad', 'Café tostado local', 'Aire acondicionado', 'Cámaras 24/7', 'Estacionamiento'];

  return (
    <section id="espacios" className="max-w-6xl mx-auto px-6 py-20 md:py-28 relative z-10">
      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <SectionEyebrow label="Espacios" tag="todos los recursos" />
          <h2 className="mt-5 text-3xl md:text-5xl font-semibold tracking-tight leading-[1.02]">
            Diseñado para
            <br />
            cómo trabajas hoy.
          </h2>
          <p className="mt-6 text-white/60 text-base leading-[1.6] max-w-md">
            16 puestos repartidos en hot desks, escritorios dedicados, salas y phone booths.
            Mobiliario Steelcase, equipos AV Samsung 4K y cafetería con barista propio. Todo
            pensado por ingenieros industriales para que tu jornada fluya sin fricción.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <span
                key={chip}
                className="text-xs text-white/70 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03]"
              >
                {chip}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
          className="liquid-glass rounded-2xl p-5"
        >
          <div className="text-xs text-white/50 mb-4 px-1">Capacidad total · 16 puestos peak</div>
          <div className="grid grid-cols-2 gap-3">
            {recursos.map((t) => (
              <div key={t.label} className="liquid-glass rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: t.color }} />
                    <span className="text-xs text-white font-medium">{t.label}</span>
                  </div>
                  <span className="text-[10px] text-white/50 tabular-nums">{t.count}</span>
                </div>
                <ul className="space-y-1">
                  {t.items.map((item, i) => (
                    <li key={i} className="text-[11px] text-white/60 leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FeatureGrid() {
  const features = [
    { icon: Wifi, title: 'Internet 1 Gbps', desc: 'Fibra dedicada redundante. Sin tope de ancho de banda.' },
    { icon: Coffee, title: 'Café de especialidad', desc: 'Granos tostados localmente. Servido por barista propio.' },
    { icon: Phone, title: 'Phone booths', desc: 'Cabinas con aislamiento acústico para tus llamadas y videos.' },
    { icon: Calendar, title: 'Reservas instantáneas', desc: 'Web app y mobile. Confirma tu sala en 10 segundos.' },
    { icon: Headphones, title: 'Soporte 24/7', desc: 'Equipo siempre disponible. Tickets resueltos en menos de 1h.' },
    { icon: Users, title: 'Comunidad activa', desc: '+250 profesionales. Eventos mensuales de networking.' }
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-16 md:py-20 relative z-10">
      <div className="grid md:grid-cols-3 gap-3">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="liquid-glass rounded-xl p-5"
          >
            <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 grid place-items-center mb-4">
              <f.icon className="w-4 h-4 text-white/70" />
            </div>
            <div className="text-sm font-semibold text-white mb-1">{f.title}</div>
            <div className="text-xs text-white/55 leading-relaxed">{f.desc}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function LogoCloud() {
  const logos = ['Cornershop', 'NotCo', 'Falabella', 'Buk', 'Banco Estado', 'CORFO', 'Magnolia', 'Toku'];
  return (
    <section className="max-w-6xl mx-auto px-6 py-16 md:py-20 relative z-10">
      <div className="text-center text-xs uppercase tracking-widest text-white/40">
        Confianza de equipos y emprendedores de la región
      </div>
      <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 items-center justify-items-center">
        {logos.map((name, i) => (
          <motion.span
            key={name}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="text-sm font-semibold tracking-tight text-white/50 hover:text-white transition"
          >
            {name}
          </motion.span>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    {
      quote:
        'Pasé de pagar oficina propia a tener un escritorio dedicado en Coworking Hub. Mismo costo, infraestructura mejor y conozco gente todos los días.',
      name: 'Camila Rojas',
      role: 'Fundadora',
      company: 'STARTUP CHILE'
    },
    {
      quote:
        'Reservar la sala de reunión toma 10 segundos desde el celular. La infraestructura AV es la mejor que he usado en Las Condes.',
      name: 'Diego Soto',
      role: 'Consultor senior',
      company: 'CONSULT.CL'
    },
    {
      quote:
        'El café es excelente, el internet vuela, y el equipo se acuerda de mi nombre. Vengo cada día sin que me obliguen.',
      name: 'María Pérez',
      role: 'Diseñadora UX',
      company: 'FREELANCE · LAS CONDES'
    }
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-20 md:py-28 border-t border-white/10 relative z-10">
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((t, i) => (
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="liquid-glass rounded-2xl p-6"
          >
            <blockquote className="text-sm text-white/80 leading-[1.6]">"{t.quote}"</blockquote>
            <figcaption className="mt-6 pt-5 border-t border-white/10">
              <div className="text-sm font-semibold">{t.name}</div>
              <div className="text-xs text-white/50">{t.role}</div>
              <div className="text-xs text-white font-semibold tracking-wide mt-1">{t.company}</div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}

function Pricing() {
  const [yearly, setYearly] = useState(false);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const plans = [
    {
      id: 'pase-diario',
      tier: 'Pase diario',
      priceMonthly: '$18.000/día',
      priceYearly: '$18.000/día',
      desc: 'Para visitas puntuales o quien quiere probar el espacio antes de comprometerse.',
      features: [
        'Hot desk según disponibilidad',
        'Wi-Fi 1 Gbps',
        'Café incluido',
        'Acceso 09:00 a 18:00',
        'Sin permanencia'
      ]
    },
    {
      id: 'membresia-mensual',
      tier: 'Mensual',
      priceMonthly: '$240.000/m',
      priceYearly: '$2.640.000/y',
      desc: 'Acceso ilimitado en horario para freelancers y profesionales independientes.',
      features: [
        'Hot desk libre + escritorios disponibles',
        '4 horas de salas de reunión al mes',
        '20% off en cafetería',
        'Acceso 24/7 con credencial',
        'Casillero personal'
      ]
    },
    {
      id: 'membresia-anual',
      tier: 'Anual',
      priceMonthly: '$200.000/m',
      priceYearly: '$2.400.000/y',
      desc: 'Para quienes ya saben que este es su lugar. Ahorras dos meses.',
      features: [
        'Escritorio dedicado tuyo',
        '8 horas de salas al mes',
        '30% off en cafetería',
        'Acceso 24/7 + invitados gratis',
        'Dirección comercial incluida'
      ],
      pro: true
    }
  ];

  async function comprar(planId: string) {
    const email = window.prompt('Ingresa tu email para asociar la membresía:');
    if (!email || !email.includes('@')) return;
    const nombre = window.prompt('Nombre completo (opcional):') || '';
    setLoadingId(planId);
    try {
      const r = await fetch(`${API_BASE}/api/checkout/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productoId: planId, email, nombre })
      });
      if (!r.ok) throw new Error((await r.json()).error || 'Error');
      const { url } = await r.json();
      window.location.href = url;
    } catch (e) {
      alert(e instanceof Error ? e.message : 'No pudimos iniciar el pago');
      setLoadingId(null);
    }
  }

  return (
    <section id="planes" className="c3-pricing-section relative z-10">
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <filter id="c3-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves={2} stitchTiles="stitch" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.075" />
          </feComponentTransfer>
          <feComposite in2="SourceGraphic" operator="in" result="noise" />
          <feBlend in="SourceGraphic" in2="noise" mode="overlay" />
        </filter>
      </svg>

      <div className="c3-watermark-container">
        <div className="c3-watermark-main">
          <span className="c3-watermark-line-1">Tu espacio.</span>
          <span className="c3-watermark-line-2">Reinventado</span>
        </div>
      </div>

      <div className="c3-grid">
        {plans.map((plan) => {
          const price = yearly ? plan.priceYearly : plan.priceMonthly;
          return (
            <div key={plan.id} className={`c3-card ${plan.pro ? 'c3-card-pro' : ''}`}>
              <div className="c3-tier-small">{plan.tier}</div>
              <div className="c3-tier-large">{price}</div>
              <p className="c3-desc">{plan.desc}</p>
              <ul className="c3-list">
                {plan.features.map((f) => (
                  <li key={f}>
                    <span className="c3-check">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                className="c3-btn"
                disabled={loadingId === plan.id}
                onClick={() => comprar(plan.id)}
              >
                {loadingId === plan.id ? 'Procesando…' : 'Comprar plan'}
              </button>
            </div>
          );
        })}
      </div>

      <div className="c3-toggle-wrap">
        <span className="text-sm text-white/70">Pago anual (ahorras 2 meses)</span>
        <button
          className={`c3-toggle ${yearly ? 'active' : ''}`}
          onClick={() => setYearly((v) => !v)}
          aria-label="Toggle yearly pricing"
        >
          <span className="c3-toggle-knob" />
        </button>
      </div>

      <p className="text-xs text-white/40 mt-6 max-w-md text-center">
        Pagos procesados por Stripe. En modo prueba: usa la tarjeta <code className="text-white/70">4242 4242 4242 4242</code> con cualquier fecha futura y CVC.
      </p>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20 md:py-32 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="liquid-glass relative overflow-hidden rounded-3xl px-8 py-16 md:py-24 text-center"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(600px circle at 50% 0%, rgba(255,255,255,0.15), transparent 70%)',
            opacity: 0.3
          }}
        />
        <div className="relative">
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.02]">
            Trae tu laptop.
            <br />
            Quédate todo el día.
          </h2>
          <p className="mt-6 text-white/60 max-w-md mx-auto text-sm leading-[1.6]">
            Tu primer pase diario es a mitad de precio. Ven, conoce el espacio, y decide después.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
            <PrimaryButton
              label="Comprar membresía"
              onClick={() => document.getElementById('planes')?.scrollIntoView({ behavior: 'smooth' })}
            />
            <button className="group inline-flex items-center justify-center gap-1 rounded-full border border-white/15 text-white text-sm font-medium px-5 py-3 hover:bg-white/5 transition">
              Reservar visita guiada
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-[1px]" />
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="max-w-6xl mx-auto px-6 py-10 border-t border-white/10 relative z-10">
      <div className="grid md:grid-cols-3 gap-8 text-sm">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <LogoMark className="w-5 h-5" />
            <span className="font-semibold">Coworking Hub</span>
          </div>
          <p className="text-xs text-white/50 leading-relaxed max-w-xs">
            Av. Apoquindo, Las Condes · Santiago.<br />
            Proyecto académico — Becerra & Varas, UTalca 2026.
          </p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-white/40 mb-3">Navegación</div>
          <ul className="space-y-2 text-white/60 text-xs">
            <li><a href="#espacios" className="hover:text-white">Espacios</a></li>
            <li><a href="#planes" className="hover:text-white">Planes</a></li>
            <li><a href="#" className="hover:text-white">Reservar visita</a></li>
            <li><a href="/admin" className="hover:text-white">Acceso staff</a></li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-white/40 mb-3">Contacto</div>
          <ul className="space-y-2 text-white/60 text-xs">
            <li>hola@coworkinghub.cl</li>
            <li>+56 9 0000 0000</li>
            <li>L–V 09:00–19:00</li>
          </ul>
        </div>
      </div>
      <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-between text-xs text-white/30">
        <span>© 2026 Coworking Hub</span>
        <span>Hecho con teoría de operaciones (Heizer cap. 13)</span>
      </div>
    </footer>
  );
}

// ============================================================
// ADMIN PLACEHOLDER (Fase 2 lo expande)
// ============================================================
function AdminLogin() {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (pin === 'utalca2026' || pin === '0000') {
      // Fase 2: redirige al CRM real. Por ahora, redirige al dashboard legacy.
      window.location.href = 'https://coworking-hub.onrender.com';
    } else {
      setError('PIN incorrecto');
    }
  }

  return (
    <div className="min-h-screen grid place-items-center px-6 relative">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover" src={VIDEO_URL} />
        <div className="absolute inset-0 bg-[#0c0c0c]/70" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="liquid-glass relative z-10 rounded-3xl p-10 w-full max-w-md"
      >
        <div className="flex items-center gap-3 mb-8">
          <LogoMark className="w-7 h-7" />
          <span className="font-semibold tracking-tight">Coworking Hub</span>
          <span className="ml-auto text-[10px] uppercase tracking-widest text-white/40 px-2 py-0.5 rounded-full border border-white/10">
            CRM
          </span>
        </div>

        <h1 className="text-2xl font-semibold tracking-tight mb-2">Acceso staff</h1>
        <p className="text-sm text-white/55 mb-8">
          Ingresa tu PIN para acceder al panel de gestión interno.
        </p>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="text-[10px] uppercase tracking-widest text-white/50 font-medium block mb-2">
              PIN de acceso
            </label>
            <input
              type="password"
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                setError('');
              }}
              autoFocus
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-white/30 focus:bg-white/[0.07] transition"
            />
            {error && <div className="mt-2 text-xs text-red-400">{error}</div>}
          </div>

          <PrimaryButton label="Ingresar al CRM" full />

          <div className="pt-4 text-center">
            <a href="/" className="text-xs text-white/40 hover:text-white transition">
              ← Volver al sitio público
            </a>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 text-[11px] text-white/35 leading-relaxed">
          <b className="text-white/60">Demo:</b> usa el PIN <code className="text-white/70">utalca2026</code> para acceder al panel legacy mientras desarrollamos la Fase 2 con el CRM nuevo.
        </div>
      </motion.div>
    </div>
  );
}

function Landing() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0c0c0c] text-white">
      {/* Root SVG noise filter (used by headline) */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <filter id="c3-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves={2}
            stitchTiles="stitch"
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.35 0"
          />
          <feComposite in2="SourceGraphic" operator="in" result="noise" />
          <feBlend in="SourceGraphic" in2="noise" mode="multiply" />
        </filter>
      </svg>

      {/* Background video */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover pointer-events-none"
          src={VIDEO_URL}
        />
        <div className="absolute inset-0 bg-[#0c0c0c]/40" />
      </div>

      {/* Vertical guide lines */}
      <div className="hidden md:block pointer-events-none fixed inset-y-0 left-1/2 -translate-x-[calc(50%+36rem)] w-px bg-white/10 z-[5]" />
      <div className="hidden md:block pointer-events-none fixed inset-y-0 left-1/2 translate-x-[calc(-50%+36rem)] w-px bg-white/10 z-[5]" />

      <Navbar />
      <Hero />
      <MenuBar />
      <WorkspaceMockup />
      <FeatureTriage />
      <FeatureGrid />
      <LogoCloud />
      <Testimonials />
      <Pricing />
      <FinalCTA />
      <Footer />
    </div>
  );
}

// ============================================================
// APP — routing simple por pathname
// ============================================================
export default function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handler = () => setPath(window.location.pathname);
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);

  if (path.startsWith('/admin')) return <AdminLogin />;
  return <Landing />;
}
