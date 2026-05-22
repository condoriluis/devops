"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Globe,
  Server,
  Database,
  Shield,
  Zap,
  GitBranch,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Layers,
  Cpu,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const features = [
  {
    icon: Globe,
    title: "Deployments Frontend",
    description:
      "Gestiona despliegues en Vercel, Netlify y otras plataformas desde un solo lugar.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Server,
    title: "Servicios Backend",
    description:
      "Controla APIs, microservicios y servidores desplegados en Render o Railway.",
    color: "from-purple-500 to-indigo-500",
  },
  {
    icon: Database,
    title: "Bases de Datos",
    description:
      "Organiza conexiones, entornos y credenciales de todas tus bases de datos.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Shield,
    title: "Seguridad",
    description:
      "Protección avanzada con autenticación segura y almacenamiento cifrado.",
    color: "from-red-500 to-rose-500",
  },
  {
    icon: Zap,
    title: "Monitoreo",
    description:
      "Visualiza el estado y disponibilidad de tus servicios en tiempo real.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: GitBranch,
    title: "Repositorios",
    description:
      "Accede rápidamente a GitHub, documentación y dashboards de cada proyecto.",
    color: "from-slate-500 to-gray-500",
  },
];

// Variantes de animación
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const scaleOnHover = {
  hover: { scale: 1.02, transition: { duration: 0.3, ease: "easeOut" } }
};

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white relative overflow-x-hidden">
      {/* HERO SECTION WITH BACKGROUND IMAGE */}
      <div className="relative min-h-screen flex items-center">
        {/* Background Image Container */}
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0">
            <img
              src="/devops.jpg"
              alt="DevOps Background"
              className="h-full w-full object-cover"
            />
            {/* Gradient Overlay más moderno */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
          </div>
        </motion.div>

        {/* NAVBAR */}
        <motion.nav 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`fixed top-0 left-0 right-0 z-20 transition-all duration-300 ${
            scrolled ? "bg-black/80 backdrop-blur-xl py-4" : "bg-transparent py-6"
          }`}
        >
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex items-center justify-between">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 cursor-pointer"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                  <Layers className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold tracking-tight text-white">
                    DevOps Center
                  </h1>
                  <p className="text-xs text-white/60">
                    Infrastructure Dashboard
                  </p>
                </div>
              </motion.div>

              <div className="hidden md:flex items-center gap-8">
                {["Producto", "Características", "Precios", "Documentación"].map((item, index) => (
                  <motion.a
                    key={item}
                    href="#"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {item}
                  </motion.a>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
              >
                <Button
                  asChild
                  className="rounded-xl bg-white text-gray-900 hover:bg-gray-100 shadow-lg transition-all duration-300"
                >
                  <Link href="/login">
                    Ingresar
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.nav>

        {/* HERO CONTENT */}
        <div className="relative z-10 w-full">
          <div className="mx-auto max-w-7xl px-6 py-32">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-3xl"
            >
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 mb-8 border border-white/20"
              >
                <Sparkles className="h-4 w-4 text-white" />
                <span className="text-sm text-white/90">Plataforma moderna para desarrolladores</span>
              </motion.div>

              <motion.h1 
                variants={fadeInUp}
                className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6 leading-normal"
              >
                Gestiona todos tus
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                  proyectos y despliegues
                </span>
              </motion.h1>

              <motion.p 
                variants={fadeInUp}
                className="text-xl text-white/80 max-w-2xl mb-10 leading-relaxed"
              >
                Centraliza tus deployments, servidores, bases de datos, repositorios 
                y herramientas DevOps en una interfaz limpia, moderna y minimalista.
              </motion.p>

              <motion.div 
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    asChild
                    className="h-12 rounded-xl bg-white text-gray-900 hover:bg-gray-100 px-8 shadow-lg transition-all duration-300"
                  >
                    <Link href="/login">
                      Comenzar ahora
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 rounded-xl border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-8 transition-all duration-300"
                  >
                    Ver características
                  </Button>
                </motion.div>
              </motion.div>

              {/* Trust indicators */}
              <motion.div 
                variants={fadeInUp}
                className="mt-16 flex items-center gap-8 text-white/60 text-sm"
              >
                {[
                  { icon: Cpu, text: "99.9% Uptime" },
                  { icon: Shield, text: "Enterprise Grade" },
                  { icon: Zap, text: "Real-time Sync" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.1, color: "#fff" }}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center cursor-pointer"
          >
            <motion.div 
              animate={{ height: [2, 6, 2] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="w-1 bg-white/50 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* FEATURES SECTION */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 mb-6">
              <Sparkles className="h-4 w-4 text-gray-600" />
              <span className="text-sm text-gray-600">Características principales</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4">
              Todo en un solo lugar
            </h2>
            <p className="text-xl text-gray-600">
              Diseñado para desarrolladores modernos y equipos DevOps.
            </p>
          </motion.div>

          {/* Features grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover="hover"
                  custom={index}
                >
                  <motion.div
                    variants={scaleOnHover}
                    className="group relative overflow-hidden rounded-2xl border-0 shadow-lg hover:shadow-xl transition-all duration-500"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                    <CardContent className="p-8">
                      <motion.div 
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} shadow-lg`}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </motion.div>
                      <h3 className="mb-3 text-xl font-semibold text-gray-900">
                        {feature.title}
                      </h3>
                      <p className="leading-relaxed text-gray-600">
                        {feature.description}
                      </p>
                    </CardContent>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 bg-[url('/devops.jpg')] opacity-10 bg-cover bg-center"
        />
        <div className="mx-auto max-w-4xl px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.h2 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6"
            >
              Organiza toda tu infraestructura
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
            >
              Mantén el control de tus proyectos, despliegues, repositorios 
              y servicios desde un dashboard moderno.
            </motion.p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Button
                size="lg"
                asChild
                className="rounded-xl bg-white text-gray-900 hover:bg-gray-100 px-8 shadow-xl transition-all duration-300 text-lg"
              >
                <Link href="/login">
                  Entrar al Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="border-t border-gray-200 bg-white"
      >
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col items-center justify-between gap-6 text-sm text-gray-600 md:flex-row">
            <motion.p whileHover={{ scale: 1.02 }}>© 2026 DevOps Center. Todos los derechos reservados.</motion.p>
            <div className="flex items-center gap-8">
              {["Privacidad", "Seguridad", "Contacto", "Términos"].map((item, index) => (
                <motion.a
                  key={item}
                  href="#"
                  whileHover={{ scale: 1.1, color: "#000" }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="hover:text-gray-900 transition-colors cursor-pointer"
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}