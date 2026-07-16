import { useMemo, useState } from 'react';
import { demoPlans } from './data/demoPlans';
import type { Plan, Portal } from './types';

const money = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });
const UF = 39700;

function Logo() {
  return <div className="logo"><span className="logoMark">Y</span><span>Yo Cotizo <b>Isapre</b></span></div>;
}

function Header({ portal, onPortal }: { portal: Portal; onPortal: (p: Portal) => void }) {
  return <header><Logo /><nav>
    <button className={portal === 'publico' ? 'active' : ''} onClick={() => onPortal('publico')}>Cotizar</button>
    <button className={portal === 'asesor' ? 'active' : ''} onClick={() => onPortal('asesor')}>Portal asesores</button>
    <button className={portal === 'admin' ? 'active' : ''} onClick={() => onPortal('admin')}>Administración</button>
  </nav><span className="uf">UF {money.format(UF)}</span></header>;
}

function QuoteForm({ onQuote }: { onQuote: () => void }) {
  return <section className="quoteCard">
    <div><span className="eyebrow">Cotización personalizada</span><h1>Encuentra un plan de salud que se ajuste a ti</h1><p>Compara precio, cobertura y prestadores con información clara. Un asesor confirma las condiciones antes de contratar.</p></div>
    <form onSubmit={(e) => { e.preventDefault(); onQuote(); }}>
      <label>Región<select defaultValue="Metropolitana"><option>Metropolitana</option><option>Valparaíso</option><option>Biobío</option></select></label>
      <div className="cols"><label>Edad<input type="number" defaultValue="35" min="18" /></label><label>Renta imponible<input type="number" defaultValue="1800000" /></label></div>
      <div className="cols"><label>Sexo<select><option>Masculino</option><option>Femenino</option></select></label><label>N.º de cargas<input type="number" defaultValue="0" min="0" /></label></div>
      <button className="primary" type="submit">Ver planes disponibles →</button>
      <small>Los documentos contractuales están disponibles a través de asesores registrados.</small>
    </form>
  </section>;
}

function PlanCard({ plan, advisor }: { plan: Plan; advisor: boolean }) {
  const totalUf = plan.baseUf + plan.gesUf;
  return <article className="planCard">
    <div className="planTop"><span className="insurer">{plan.isapre}</span><span className="type">{plan.modalidad}</span></div>
    <h3>{plan.nombre}</h3><p className="code">Código {plan.codigo}</p>
    <div className="coverage"><span><b>{plan.hospitalaria}%</b> Hospitalaria</span><span><b>{plan.ambulatoria}%</b> Ambulatoria</span></div>
    <p className="providers">{plan.prestadores.join(' · ')}</p>
    <div className="planBottom"><div><small>Valor mensual desde</small><strong>{totalUf.toFixed(2)} UF</strong><span>{money.format(totalUf * UF)}</span></div>
      <div className="actions"><button>Ver detalle</button>{advisor && <><button className="outline">Ver PDF</button><button className="whatsapp">WhatsApp</button></>}</div></div>
  </article>;
}

function Results({ advisor }: { advisor: boolean }) {
  const [isapre, setIsapre] = useState('Todas');
  const plans = useMemo(() => isapre === 'Todas' ? demoPlans : demoPlans.filter(p => p.isapre === isapre), [isapre]);
  return <main className="results"><aside><h3>Filtrar planes</h3><label>Isapre<select value={isapre} onChange={e => setIsapre(e.target.value)}><option>Todas</option>{[...new Set(demoPlans.map(p => p.isapre))].map(x => <option key={x}>{x}</option>)}</select></label><label>Precio máximo<input type="range" min="2" max="10" defaultValue="7" /></label><label>Cobertura mínima<select><option>Sin mínimo</option><option>70%</option><option>80%</option><option>90%</option></select></label></aside>
    <section><div className="resultsTitle"><div><span className="eyebrow">Resultados personalizados</span><h2>{plans.length} planes para comparar</h2></div><select><option>Menor precio</option><option>Mayor cobertura</option></select></div>{plans.map(p => <PlanCard key={p.id} plan={p} advisor={advisor} />)}</section></main>;
}

function Advisor() {
  const [ready, setReady] = useState(false);
  if (ready) return <Results advisor />;
  return <section className="auth"><span className="eyebrow">Acceso profesional</span><h1>Herramientas para cotizar y cerrar mejor</h1><p>Consulta planes, descarga documentos oficiales y comparte propuestas con tus clientes.</p><div className="login"><label>Correo profesional<input type="email" placeholder="asesor@correo.cl" /></label><label>Contraseña<input type="password" placeholder="••••••••" /></label><button className="primary" onClick={() => setReady(true)}>Ingresar a la demostración</button></div></section>;
}

function Admin() {
  const stats = [['2.255','Planes'],['2.255','PDF vinculados'],['7','Isapres'],['0','Documentos pendientes']];
  return <main className="admin"><div className="adminHead"><div><span className="eyebrow">Panel administrativo</span><h1>Control de la plataforma</h1></div><button className="primary">Importar planes</button></div><div className="statsGrid">{stats.map(([v,l]) => <div key={l}><strong>{v}</strong><span>{l}</span></div>)}</div><section className="adminPanel"><h2>Configuración general</h2>{['Planes e Isapres','Documentos PDF','Valor UF y GES','Asesores y usuarios','Leads y asignaciones','Contenido del sitio'].map(x => <button key={x}><span>{x}</span><b>→</b></button>)}</section></main>;
}

export default function App() {
  const [portal, setPortal] = useState<Portal>('publico');
  const [quoted, setQuoted] = useState(false);
  return <><Header portal={portal} onPortal={(p) => { setPortal(p); setQuoted(false); }} />
    {portal === 'publico' && (quoted ? <Results advisor={false} /> : <QuoteForm onQuote={() => setQuoted(true)} />)}
    {portal === 'asesor' && <Advisor />}{portal === 'admin' && <Admin />}
    <footer><Logo /><p>Información referencial sujeta a validación. La contratación se realiza con asesoría profesional.</p></footer></>;
}
