// src/pages/Proyectos.jsx
import React from 'react';
import './Proyectos.css'; // o módulo CSS si usas CSS modules

const Proyectos = () => {
  return (
    <main className="proyectos-page">
      <section className="proyectos-hero">
        <h1>Proyectos</h1>
        <p>Algunos de mis trabajos destacados, tanto deployados como en desarrollo.</p>
      </section>

      {/* Fila centrada con 3 iframes */}
      <section className="proyectos-iframes">
        <h2>Proyectos en vivo</h2>
        <div className="proyectos-iframe-row">
          <iframe
            src="https://tu-deploy-1.com"
            title="Proyecto 1"
            loading="lazy"
          />
          <iframe
            src="https://tu-deploy-2.com"
            title="Proyecto 2"
            loading="lazy"
          />
          <iframe
            src="https://tu-deploy-3.com"
            title="Proyecto 3"
            loading="lazy"
          />
        </div>
      </section>

      {/* Abajo: otros proyectos solo con imagen */}
      <section className="proyectos-galeria">
        <h2>Otros proyectos</h2>
        <div className="proyectos-grid">
          <article className="proyecto-card">
            <img src="/images/proyecto-a.png" alt="Proyecto A" />
            <h3>Proyecto A</h3>
            <p>Proyecto sin deploy, pero con diseño finalizado.</p>
          </article>

          <article className="proyecto-card">
            <img src="/images/proyecto-b.png" alt="Proyecto B" />
            <h3>Proyecto B</h3>
            <p>Concepto UI con animaciones y tipografía de la home.</p>
          </article>

          <article className="proyecto-card">
            <img src="/images/proyecto-c.png" alt="Proyecto C" />
            <h3>Proyecto C</h3>
            <p>Landing experimental con efectos parallax.</p>
          </article>

          {/* agrega más cards según necesites */}
        </div>
      </section>
    </main>
  );
};

export default Proyectos;