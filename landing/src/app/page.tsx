"use client";

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050505] text-neutral-300 font-sans selection:bg-white/10">
      <main className="max-w-4xl mx-auto px-6 py-12 md:py-20 relative">
        
        {/* Subtle Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-64 bg-white/[0.03] blur-[120px] rounded-full pointer-events-none -z-10"></div>

        {/* Hero Section */}
        <section className="text-center mb-24 relative z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500 drop-shadow-sm">
            TableData Extractor
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            La extensión de Chrome orientada a desarrolladores para extraer, limpiar y exportar tablas HTML directamente a CSV, JSON, o tu Webhook de automatización favorito (n8n, Make).
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <a 
              href="#download" 
              className="bg-white hover:bg-neutral-200 text-black px-8 py-3 rounded-md font-medium transition-colors shadow-lg shadow-white/5"
            >
              Descargar .zip
            </a>
            <a 
              href="#installation" 
              className="bg-transparent hover:bg-white/5 text-neutral-300 px-8 py-3 rounded-md font-medium transition-colors border border-neutral-700/50"
            >
              Guía de Instalación
            </a>
          </div>
        </section>

        {/* Installation Guide */}
        <section id="installation" className="mb-20 scroll-mt-10">
          <h2 className="text-2xl font-bold mb-6 border-b border-slate-800 pb-2">Guía de Instalación para Desarrolladores (Descomprimida)</h2>
          
          <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
            <ol className="list-decimal list-inside space-y-4 text-slate-300">
              <li>
                <strong className="text-slate-100">Descarga el código fuente:</strong> Obtén el archivo `.zip` del enlace a continuación y extráelo en tu computadora.
              </li>
              <li>
                <strong className="text-slate-100">Instala las dependencias (Opcional):</strong> Si deseas modificar el código, ejecuta <code className="bg-slate-800 px-1.5 py-0.5 rounded text-blue-300 text-sm">npm install</code> en la carpeta <code className="bg-slate-800 px-1.5 py-0.5 rounded text-blue-300 text-sm">/extension</code>.
              </li>
              <li>
                <strong className="text-slate-100">Compila la extensión:</strong> Ejecuta <code className="bg-slate-800 px-1.5 py-0.5 rounded text-blue-300 text-sm">npm run build</code> en el directorio <code className="bg-slate-800 px-1.5 py-0.5 rounded text-blue-300 text-sm">/extension</code>.
              </li>
              <li>
                <strong className="text-slate-100">Abre Extensiones de Chrome:</strong> Navega a <code className="bg-slate-800 px-1.5 py-0.5 rounded text-blue-300 text-sm">chrome://extensions/</code> en tu navegador.
              </li>
              <li>
                <strong className="text-slate-100">Activa el Modo Desarrollador:</strong> Enciende el interruptor de "Modo de desarrollador" en la esquina superior derecha.
              </li>
              <li>
                <strong className="text-slate-100">Carga la extensión descomprimida:</strong> Haz clic en el botón "Cargar descomprimida" y selecciona la carpeta <code className="bg-slate-800 px-1.5 py-0.5 rounded text-blue-300 text-sm">dist</code> dentro del directorio <code className="bg-slate-800 px-1.5 py-0.5 rounded text-blue-300 text-sm">/extension</code>.
              </li>
            </ol>
          </div>
        </section>

        {/* Download Section */}
        <section id="download" className="mb-20 scroll-mt-10">
          <div className="bg-gradient-to-br from-blue-900/20 to-slate-900 rounded-2xl p-8 border border-blue-900/30 text-center">
            <h2 className="text-2xl font-bold mb-3">¿Listo para extraer algunos datos?</h2>
            <p className="text-slate-400 mb-6">Descarga la última versión y comienza a construir tus flujos de automatización.</p>
            <a 
              href="/tabledata-extractor.zip" 
              download
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded font-medium transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              Descargar tabledata-extractor.zip
            </a>
          </div>
        </section>

        {/* Changelog */}
        <section id="changelog" className="mb-10">
          <h2 className="text-2xl font-bold mb-6 border-b border-slate-800 pb-2">Registro de Cambios (Changelog)</h2>
          
          <div className="space-y-6 text-slate-300">
            <div className="relative pl-6 border-l-2 border-slate-800">
              <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-1.5"></div>
              <div className="font-semibold text-slate-100 flex items-center gap-3">
                v1.0.0 
                <span className="text-xs bg-slate-800 px-2 py-0.5 rounded text-slate-400 font-normal">Última</span>
              </div>
              <div className="text-sm text-slate-500 mb-2">Julio 2026</div>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Lanzamiento inicial de TableData Extractor.</li>
                <li>Soporte añadido para tablas complejas (con y sin thead).</li>
                <li>Exportación directa a CSV y JSON.</li>
                <li>Integración de Webhook compatible con n8n/Make.</li>
                <li>Interfaz de usuario moderna en modo oscuro con Tailwind CSS.</li>
              </ul>
            </div>
          </div>
        </section>

      </main>
      
      <footer className="border-t border-neutral-800/50 py-8 text-center text-neutral-500 text-sm">
        <p>Construido por Cesar@Huriarte</p>
      </footer>
    </div>
  );
}
