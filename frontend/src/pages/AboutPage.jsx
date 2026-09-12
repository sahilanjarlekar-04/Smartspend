import React from 'react';
import { Server, Database, Code, ShieldCheck, CheckCircle } from 'lucide-react';

export default function AboutPage() {
  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>About This Project</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Full Stack Java Development Course Capstone Application
        </p>
      </div>

      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--accent-primary)' }}>
          💰 SpendSmart - Personal Finance Manager
        </h3>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
          This full stack web application was designed and built to demonstrate complete end-to-end web architecture integrating a modern React user interface with a robust Java 21 Spring Boot REST API backend and a MySQL relational database.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
          <div style={{ padding: '1.2rem', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
            <Code size={24} color="var(--accent-primary)" style={{ marginBottom: '0.5rem' }} />
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.3rem' }}>React Frontend</h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Built with Vite, React Router, custom Glassmorphism CSS, and responsive state management hooks.
            </p>
          </div>

          <div style={{ padding: '1.2rem', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
            <Server size={24} color="var(--income-color)" style={{ marginBottom: '0.5rem' }} />
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.3rem' }}>Java Spring Boot API</h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Spring Boot 3 REST Controllers, Service logic layer, DTOs, and Spring Data JPA integration.
            </p>
          </div>

          <div style={{ padding: '1.2rem', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
            <Database size={24} color="var(--accent-secondary)" style={{ marginBottom: '0.5rem' }} />
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.3rem' }}>MySQL Database</h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Relational tables (`users`, `transactions`) mapped via JPA Entities and Hibernate ORM.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
