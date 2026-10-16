import { useEffect, useRef, useState, type ReactNode, type MouseEvent, type FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import {
  ArrowUpRight, BarChart3, BookOpen, BriefcaseBusiness, Check, ChevronDown, CircleUserRound, CirclePlay, Code2, Cpu, Download,
  Dumbbell, FileCheck2, Gauge, GraduationCap, Grid2X2, Layers, Link2, Mail, Menu, Network, Phone, Radio,
  Send, Sparkles, TrainFront, X,
} from 'lucide-react';

type Page = 'accueil' | 'parcours' | 'expertises' | 'projets' | 'contact';

const portraitUrl = '/WhatsApp_Image_2026-10-14_at_17.38.51.jpeg';
const cvUrl = '/CV_Fatou_Cisse_Gueye.pdf';
const email = 'fcisse.gueye@gmail.com';
const phone = '+33 7 53 37 48 73';
const linkedin = 'https://www.linkedin.com/in/fatou-ciss%C3%A9-gueye';

const navItems: { id: Page; label: string; icon: typeof Grid2X2 }[] = [
  { id: 'accueil', label: 'Accueil', icon: Grid2X2 },
  { id: 'parcours', label: 'Parcours', icon: BriefcaseBusiness },
  { id: 'expertises', label: 'Expertises', icon: Gauge },
  { id: 'projets', label: 'Projets', icon: Network },
  { id: 'contact', label: 'Contact', icon: Mail },
];

type Item = { period: string; role: string; org: string; place?: string; bullets: string[]; tags?: string[] };

const jobs: Item[] = [
  { period: 'Fév 2026 — aujourd’hui', role: 'Ingénieure Système Ferroviaire', org: 'Viveris Technologies / Alstom', place: 'Projet NExTEO · RER B / RER D',
    tags: ['DOORS NG', 'SIGRS', 'SNCF Réseau', 'SNCF Voyageurs', 'RATP'],
    bullets: [
      'Gestion des exigences contractuelles sous DOORS NG : mise à jour, identifiants d’origine, liens de traçabilité et vérification de leur couverture dans les livrables.',
      'Coordination avec les équipes produit Alstom pour consolider les preuves techniques et traiter les compléments et déviations jusqu’à acceptation client.',
      'Traitement des Fiches d’avis (FA) client sur les équipements embarqués : odomètres, Secure Gateways, antennes et équipements fournisseurs (dont Hasler).',
      'Analyse technique des FA à partir des spécifications, procédures, rapports d’essais, dossiers de qualification et de maintenance.',
      'Rédaction et mise à jour des spécifications techniques et fonctionnelles, interfaces mécaniques et électriques, documents d’essais et cahiers d’essais de série.',
      'Utilisation de la SIGRS comme référentiel documentaire pour relier exigences, documents projet et livrables client.'] },
  { period: 'Mars 2025 — Jan 2026', role: 'Ingénieure Data Validation ATC / DV', org: 'Viveris Technologies', place: 'Massy · Hong Kong Metro, SNCF/RATP, SACEM, URBALIS U100/U300',
    tags: ['Excel/VBA', 'Python', 'Linux', 'Valpar', 'DOSBox-X', 'Beyond Compare', 'DOORS', 'Alstom', 'SNCF', 'RATP'],
    bullets: [
      'Analyse de plans de voie et caractérisation des singularités : signaux, aiguilles, balises, pentes, PK, profils de vitesse, itinéraires et zones d’arrêt d’urgence.',
      'Calcul et vérification des distances entre éléments de voie et balises ; préparation et validation des données par segments selon les règles de signalisation.',
      'Développement de macros Excel pour automatiser les contrôles de cohérence, de complétude et de conformité des données.',
      'Construction et exécution de scénarios de simulation selon le parcours du train, les itinéraires et la configuration des aiguillages ; comparaison obtenu / attendu.',
      'Investigation des non-conformités, qualification et suivi des écarts.',
      'Contrôle d’intégrité (checksum), double validation des périmètres critiques et traçabilité exigences → données → scénarios → résultats.'] },
];
const stages: Item[] = [
  { period: 'Mars 2024 — Août 2024', role: 'Stagiaire ONB V&V Lab Engineer · stage de fin d’études', org: 'Alstom Belgium', place: 'Charleroi',
    tags: ['Python', 'Linux', 'MySQL', 'ERTMS', 'NFC ACR122U / Mifare 1K'],
    bullets: [
      'Conception en Python d’une application de gestion et de sécurisation des accès aux bancs de tests ERTMS.',
      'Intégration d’un lecteur NFC ACR122U / Mifare 1K et stockage des données d’accès sous MySQL.',
      'Tests unitaires, déploiement sur postes Windows et Debian, durcissement des configurations et mode kiosque.',
      'Journalisation des logs vers un serveur distant, chiffrement asymétrique, protection des mots de passe avec Bcrypt et scan de vulnérabilités.'] },
  { period: 'Oct 2022 — Jan 2023', role: 'Stagiaire en développement de logiciel d’automatisation', org: 'Sens Digital', place: 'Montpellier',
    tags: ['Python', 'OpenCV', 'Raspberry Pi'],
    bullets: ['Développement en Python d’un système d’automatisation à base de flux vidéo sur Raspberry Pi.', 'Automatisation du processus de réservation de tickets de bowling, avec OpenCV pour le traitement d’images.'] },
];
const studies: Item[] = [
  { period: 'Sept 2021 — Sept 2024', role: 'Cycle d’ingénieur en Électronique et Systèmes Embarqués', org: 'INSA Hauts-de-France', place: 'Valenciennes',
    tags: ['Python', 'C', 'Matlab/Simulink', 'VHDL/FPGA'],
    bullets: ['Systèmes embarqués et interfaces de communication.', 'Programmation en Python, C, Matlab/Simulink, VHDL/FPGA.', 'Électronique, IA, réseaux et télécommunications.'] },
  { period: 'Sept 2019 — Juil 2021', role: 'Classe préparatoire scientifique aux grandes écoles (CPGE)', org: 'Spécialité PCSI', place: 'Physique, Chimie, Sciences de l’ingénieur', bullets: ['Formation scientifique généraliste intensive en physique, chimie et sciences de l’ingénieur.'] },
];
const tabs = { emplois: { label: 'Emplois', data: jobs, icon: BriefcaseBusiness }, stages: { label: 'Stages', data: stages, icon: Layers }, formation: { label: 'Formation', data: studies, icon: GraduationCap } };
type Tab = keyof typeof tabs;

const skills = [
  { title: 'Validation de données ATC / DV', text: 'Analyse de plans de voie, calcul de distances, validation par segments et contrôles d’intégrité.', icon: TrainFront, tone: '', tags: ['Singularités', 'Itinéraires', 'Checksum', 'Double validation'] },
  { title: 'Systèmes de signalisation', text: 'Validation fonctionnelle de systèmes critiques, scénarios de simulation et qualification des écarts.', icon: Radio, tone: 'blue', tags: ['URBALIS U100', 'URBALIS U300', 'SACEM', 'ERTMS'] },
  { title: 'Ingénierie système & exigences', text: 'Traçabilité des exigences, spécifications techniques, qualification matériel et environnementale.', icon: FileCheck2, tone: 'coral', tags: ['DOORS NG', 'SIGRS', 'Fiches d’avis', 'Cahiers d’essais'] },
  { title: 'Outils & développement', text: 'Automatisation des contrôles et développement d’applications sécurisées.', icon: Code2, tone: '', tags: ['Python', 'Excel/VBA', 'C', 'Matlab/Simulink', 'VHDL/FPGA', 'MySQL', 'Linux', 'Valpar', 'DOSBox-X', 'Beyond Compare'] },
];

const keyProjects = [
  { name: 'CDG Express', where: 'Île-de-France, France' }, { name: 'Bourg-la-Reine', where: 'Île-de-France, France' },
  { name: 'Santiago', where: 'Chili' }, { name: 'Singapour', where: 'Singapour' },
];
const academic = [
  { title: 'Application d’accès aux bancs ERTMS', meta: 'Alstom Belgium · 2024', text: 'Gestion et sécurisation des accès par badge NFC, avec journalisation et chiffrement.', icon: Cpu, tags: ['Python', 'NFC', 'MySQL'] },
  { title: 'Immersion 3D dans une carte électronique', meta: 'Projet de fin d’études · INSA HdF · 2023–2024', text: 'Environnement d’apprentissage virtuel autour de la diode, avec un Cube de réalité virtuelle.', icon: Sparkles, tags: ['Réalité virtuelle', '3D'] },
  { title: 'Véhicule électrique autonome', meta: 'INSA HdF · 2022', text: 'Cartographie de l’environnement avec un LiDAR et d’autres capteurs ; gestion des messages CAM, DENM, SPATEM et MAPEM.', icon: Network, tags: ['LiDAR', 'V2X'] },
];

/* ---------- Hooks & primitives ---------- */
function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return [ref, seen] as const;
}

function Crystal({ className = '', children, onClick, delay = 0 }: { className?: string; children: ReactNode; onClick?: () => void; delay?: number }) {
  const [ref, seen] = useInView<HTMLDivElement>();
  const move = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = el.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width; const y = (e.clientY - r.top) / r.height;
    el.style.setProperty('--mx', `${x * 100}%`); el.style.setProperty('--my', `${y * 100}%`);
    el.style.setProperty('--rx', `${(0.5 - y) * 5}deg`); el.style.setProperty('--ry', `${(x - 0.5) * 6}deg`);
  };
  const leave = () => { const el = ref.current; if (!el) return; el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg'); };
  return <div ref={ref} onMouseMove={move} onMouseLeave={leave} onClick={onClick} style={{ transitionDelay: seen ? `${delay}ms` : '0ms' }} className={`crystal reveal ${seen ? 'in' : ''} ${className}`}>{children}</div>;
}

function Counter({ to }: { to: number }) {
  const [ref, seen] = useInView<HTMLElement>();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!seen) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setN(to); return; }
    let f = 0; const id = setInterval(() => { f++; setN(Math.min(to, Math.round((f / 24) * to))); if (f >= 24) clearInterval(id); }, 40);
    return () => clearInterval(id);
  }, [seen, to]);
  return <b ref={ref}>{String(n).padStart(2, '0')}</b>;
}

function Chips({ tags }: { tags?: string[] }) { return tags ? <div className="chips">{tags.map((t) => <span className="chip" key={t}>{t}</span>)}</div> : null; }

function PageHeader({ kicker, title, text }: { kicker: string; title: ReactNode; text: string }) {
  return <header className="section-header"><p className="eyebrow"><Sparkles size={15} /> {kicker}</p><h2>{title}</h2><p>{text}</p></header>;
}

/* ---------- App ---------- */
function App() {
  const [page, setPage] = useState<Page>('accueil');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = (p: Page) => { setPage(p); setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return (
    <div className="site-shell">
      <header className="top-bar">
        <div className="top-bar-inner">
          <button className="top-brand" onClick={() => navigate('accueil')} aria-label="Retour à l'accueil">
            <span className="brand-mark">FC<i /></span>
            <span className="top-brand-name">Fatou Cissé <strong>Gueye</strong></span>
          </button>
          <nav className={`top-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Navigation principale">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button key={id} className={`top-link ${page === id ? 'active' : ''}`} onClick={() => navigate(id)}><Icon size={16} strokeWidth={1.8} /><span>{label}</span></button>
            ))}
          </nav>
          <div className="top-actions">
            <span className="availability"><span className="status-dot" /> Disponible</span>
            <a className="btn btn-dark top-cta" href={cvUrl} download>Télécharger mon CV <Download size={15} /></a>
            <button className="menu-toggle" onClick={() => setMenuOpen((v) => !v)} aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={menuOpen}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
          </div>
        </div>
      </header>

      <main className="page-area">
        <div className="art-header" aria-hidden="true"><span className="art-sun" /><span className="art-orbit art-orbit-one" /><span className="art-orbit art-orbit-two" /><span className="art-brush art-brush-one" /><span className="art-brush art-brush-two" /><span className="art-track" /><span className="art-dot art-dot-one" /><span className="art-dot art-dot-two" /></div>
        <div className="ambient-threads" aria-hidden="true"><span className="thread thread-one" /><span className="thread thread-two" /><span className="thread thread-three" /></div>
        {page === 'accueil' && <Home navigate={navigate} />}
        {page === 'parcours' && <Journey />}
        {page === 'expertises' && <Expertise />}
        {page === 'projets' && <Projects />}
        {page === 'contact' && <Contact />}
        <footer className="site-footer"><span>Fatou Cissé Gueye</span><span>Ingénieure systèmes ferroviaires · Data Validation ATC/DV · V&amp;V</span><span>© 2026</span></footer>
      </main>
    </div>
  );
}

function Home({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <section className="home-hero-page page-content">
      <div className="hero">
        <Crystal className="hero-photo">
          <div className="frame"><img src={portraitUrl} alt="Portrait de Fatou Cissé Gueye" /></div>
          <div className="portrait-label"><strong>Fatou Cissé Gueye</strong><span>Viveris Technologies</span></div>
        </Crystal>
        <div className="hero-text">
          <div>
            <p className="eyebrow"><Sparkles size={15} /> Ingénieure systèmes ferroviaires</p>
            <h1>Donner de la <em>clarté</em> aux systèmes de signalisation critiques.</h1>
            <p className="intro-copy">Je m’appelle <strong>Fatou Cissé Gueye</strong>. Je valide des données et des fonctions de signalisation ferroviaire pour Alstom, la SNCF et la RATP, de la donnée de voie jusqu’à la preuve client.</p>
          </div>
          <div className="hero-bottom">
            <a className="btn btn-dark" href={cvUrl} download>Télécharger mon CV <Download size={16} /></a>
            <button className="btn btn-soft" onClick={() => navigate('parcours')}>Découvrir mon parcours <ArrowUpRight size={16} /></button>
          </div>
        </div>
      </div>

      <div className="stats">
        <Crystal className="stat" delay={0}><Counter to={6} /><span>projets clés de signalisation</span></Crystal>
        <Crystal className="stat" delay={90}><Counter to={2} /><span>systèmes URBALIS validés (U100 et U300)</span></Crystal>
        <Crystal className="stat" delay={180}><Counter to={4} /><span>expériences en entreprise et en stage</span></Crystal>
      </div>

      <div className="home-cards">
        <Crystal className="now-card">
          <div className="neo-icon"><BarChart3 size={20} /></div>
          <h3 style={{ marginTop: 20 }}>Aujourd’hui · projet NExTEO</h3>
          <strong>Ingénieure Système Ferroviaire · Viveris Technologies / Alstom</strong>
          <p>Gestion des exigences sous DOORS NG, traitement des fiches d’avis client et consolidation des preuves techniques pour le RER B et le RER D.</p>
          <Chips tags={['DOORS NG', 'SIGRS', 'SNCF Réseau', 'RATP']} />
        </Crystal>
        <Crystal className="quote-card" delay={100}>
          <span className="quote-mark">“</span>
          <p>Évoluer vers un poste à dominante technique, avec une forte composante validation, intégration et sûreté de fonctionnement.</p>
          <span className="card-label">Mon objectif</span>
        </Crystal>
      </div>
    </section>
  );
}

function TLCard({ item, index }: { item: Item; index: number }) {
  const [open, setOpen] = useState(index === 0);
  const shown = open ? item.bullets : item.bullets.slice(0, 2);
  return (
    <article className="timeline-item" style={{ animationDelay: `${index * 90}ms` }}>
      <div className="timeline-marker"><BriefcaseBusiness size={18} /></div>
      <Crystal className={`tl-card ${open ? 'open' : ''}`} onClick={() => setOpen((v) => !v)}>
        <span className="period">{item.period}</span>
        <h3>{item.role}</h3>
        <span className="org">{item.org}{item.place && <span className="sub">{item.place}</span>}</span>
        <ul>{shown.map((b) => <li key={b}>{b}</li>)}</ul>
        {open && <div style={{ marginTop: 14 }}><Chips tags={item.tags} /></div>}
        {item.bullets.length > 2 && <button className="toggle" aria-expanded={open}>{open ? 'Réduire' : 'Voir le détail'} <ChevronDown size={14} /></button>}
      </Crystal>
    </article>
  );
}

function Journey() {
  const [tab, setTab] = useState<Tab>('emplois');
  return (
    <section className="page-content inner-page">
      <PageHeader kicker="Parcours" title={<>Un chemin construit <em>avec méthode.</em></>} text="De la classe préparatoire à l’ingénierie système ferroviaire : emplois, stages et formation, du plus récent au plus ancien." />
      <div className="tabs" role="tablist">{(Object.keys(tabs) as Tab[]).map((k) => <button key={k} role="tab" aria-selected={tab === k} className={`tab ${tab === k ? 'active' : ''}`} onClick={() => setTab(k)}>{tabs[k].label}</button>)}</div>
      <div className="journey-grid">
        <div key={tab}>{tabs[tab].data.map((it, i) => <TLCard key={it.role} item={it} index={i} />)}</div>
        <Crystal className="journey-aside">
          <div className="neo-icon"><CircleUserRound size={21} /></div>
          <span className="card-label" style={{ marginTop: 22 }}>Ma démarche</span>
          <h3>Du calcul de distance à la preuve client.</h3>
          <p>J’ai débuté par la validation de données ATC/DV, puis évolué vers l’ingénierie système ferroviaire : même exigence de traçabilité, avec une vision plus large du produit et du client.</p>
        </Crystal>
      </div>
    </section>
  );
}

function Expertise() {
  return (
    <section className="page-content inner-page">
      <PageHeader kicker="Expertises" title={<>La rigueur, <em>en mouvement.</em></>} text="Validation, ingénierie système et développement : les compétences que j’utilise sur les projets ferroviaires." />
      <div className="skills-grid">
        {skills.map((s, i) => { const Icon = s.icon; return (
          <Crystal className="skill-card" key={s.title} delay={i * 80}><div className={`neo-icon ${s.tone}`}><Icon size={22} /></div><h3>{s.title}</h3><p>{s.text}</p><Chips tags={s.tags} /></Crystal>
        ); })}
      </div>
      <div className="duo">
        <Crystal>
          <span className="card-label">Langues</span>
          <div className="lang-row"><span>Français</span><span className="lang-bar" aria-label="Bilingue"><i className="on" /><i className="on" /><i className="on" /><i className="on" /></span><small>Bilingue</small></div>
          <div className="lang-row"><span>Anglais</span><span className="lang-bar" aria-label="Compétence professionnelle"><i className="on" /><i className="on" /><i className="on" /><i /></span><small>Professionnel</small></div>
        </Crystal>
        <Crystal>
          <span className="card-label">Formation</span>
          <div className="lang-row"><span>INSA Hauts-de-France</span><small>Électronique et systèmes embarqués</small></div>
          <div className="lang-row"><span>CPGE</span><small>Physique, chimie, sciences de l’ingénieur</small></div>
        </Crystal>
      </div>
      <h3 className="h-sub">Hors du <em>travail</em></h3>
      <div className="life-grid">
        <Crystal><div className="neo-icon coral"><CirclePlay size={20} /></div><h4>Money In Real Life</h4><p>Ma chaîne YouTube : finance personnelle, épargne, investissements et construction de patrimoine.</p></Crystal>
        <Crystal delay={80}><div className="neo-icon"><BookOpen size={20} /></div><h4>Lecture</h4><p>Finance, entrepreneuriat et thrillers psychologiques.</p></Crystal>
        <Crystal delay={160}><div className="neo-icon blue"><Dumbbell size={20} /></div><h4>Sport</h4><p>Musculation, fitness et course à pied.</p></Crystal>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section className="page-content inner-page">
      <PageHeader kicker="Projets" title={<>Des systèmes qui <em>font avancer.</em></>} text="Projets ferroviaires menés pour Alstom, la SNCF et la RATP, puis projets d’études et de stage." />
      <Crystal className="project-feature">
        <div>
          <span className="tag">Projet en cours · Viveris pour Alstom</span>
          <h3>NExTEO · RER B et RER D</h3>
          <p>Ingénieure Système Ferroviaire pour SNCF Réseau, SNCF Voyageurs et la RATP : exigences contractuelles sous DOORS NG, fiches d’avis client sur les équipements embarqués et spécifications techniques.</p>
          <Chips tags={['DOORS NG', 'SIGRS', 'Odomètres', 'Secure Gateways', 'Hasler']} />
        </div>
        <div className="track-art" aria-hidden="true">
          <svg viewBox="0 0 300 220" preserveAspectRatio="xMidYMid slice"><path d="M-10 170 C80 170 90 70 160 70 S240 40 320 40" fill="none" stroke="#7fb08c" strokeWidth="3" strokeLinecap="round" strokeDasharray="2 9" />
            <path d="M-10 190 C80 190 100 90 170 90 S250 60 320 60" fill="none" stroke="#c9967b" strokeWidth="2" opacity=".7" />
            {[60, 120, 190, 250].map((x, i) => <circle key={x} cx={x} cy={[165, 100, 74, 48][i]} r="6" fill="#c9e2ce" />)}<circle cx="190" cy="74" r="14" fill="none" stroke="#c9e2ce" strokeWidth="1.5" opacity=".6" /></svg>
        </div>
      </Crystal>

      <h3 className="h-sub">Projets <em>clés</em> de signalisation</h3>
      <div className="project-cards">
        <Crystal className="project-small">
          <div className="neo-icon"><TrainFront size={22} /></div><h3>Hong Kong Metro</h3><span className="where">Viveris pour Alstom · Chine</span>
          <p>Validation de données et simulation de scénarios sur des systèmes URBALIS U100 et U300.</p><Chips tags={['URBALIS', 'Excel/VBA', 'Valpar']} />
        </Crystal>
        {keyProjects.map((p, i) => (
          <Crystal className={`project-small ${i % 2 ? 'peach' : ''}`} key={p.name} delay={(i + 1) * 70}>
            <div className={`neo-icon ${i % 2 ? 'coral' : ''}`}><Radio size={22} /></div><h3>{p.name}</h3><span className="where">Viveris pour Alstom · {p.where}</span>
            <p>Validation fonctionnelle de systèmes de signalisation critiques, rédaction et simulation de scénarios de test, qualification des écarts.</p><Chips tags={['URBALIS', 'Scénarios de test', 'Qualification']} />
          </Crystal>
        ))}
        <Crystal className="project-small" delay={350}>
          <div className="neo-icon blue"><Network size={22} /></div><h3>SNCF / RATP · SACEM</h3><span className="where">Viveris · Île-de-France</span>
          <p>Validation de données ATC/DV : plans de voie, singularités, distances et itinéraires.</p><Chips tags={['SACEM', 'ATC / DV']} />
        </Crystal>
      </div>

      <h3 className="h-sub">Projets d’études et de <em>stage</em></h3>
      <div className="project-cards">
        {academic.map((p, i) => { const Icon = p.icon; return (
          <Crystal className="project-small" key={p.title} delay={i * 80}><div className="neo-icon"><Icon size={22} /></div><h3>{p.title}</h3><span className="where">{p.meta}</span><p>{p.text}</p><Chips tags={p.tags} /></Crystal>
        ); })}
      </div>
    </section>
  );
}

const emailCfg = { service: import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined, template: import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined, key: import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined };

function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget; const d = new FormData(form);
    const name = String(d.get('name')), from = String(d.get('email')), message = String(d.get('message'));
    if (!emailCfg.service || !emailCfg.template || !emailCfg.key) {
      window.location.href = `mailto:${email}?subject=${encodeURIComponent('Contact via le portfolio : ' + name)}&body=${encodeURIComponent(message + '\n\n' + name + ' (' + from + ')')}`;
      return;
    }
    setStatus('sending');
    try {
      await emailjs.send(emailCfg.service, emailCfg.template, { from_name: name, reply_to: from, message }, { publicKey: emailCfg.key });
      setStatus('sent'); form.reset();
    } catch { setStatus('error'); }
  };
  return (
    <section className="page-content inner-page">
      <PageHeader kicker="Contact" title={<>Construisons la <em>suite.</em></>} text="Une opportunité, une question ou l’envie d’échanger sur la signalisation ferroviaire ? Écrivez-moi." />
      <div className="contact-layout">
        <Crystal className="contact-details">
          <div className="contact-avatar"><img src={portraitUrl} alt="Fatou Cissé Gueye" /></div>
          <h3>Fatou Cissé Gueye</h3>
          <p>Ingénieure systèmes ferroviaires<br />Data Validation ATC/DV · V&amp;V</p>
          <a className="contact-line" href={`mailto:${email}`}><span className="neo-icon"><Mail size={17} /></span>{email}</a>
          <a className="contact-line" href={`tel:${phone.replace(/\s/g, '')}`}><span className="neo-icon coral"><Phone size={17} /></span>{phone}</a>
<a className="contact-line" href={linkedin} target="_blank" rel="noreferrer"><span className="neo-icon blue"><Link2 size={17} /></span>Profil LinkedIn</a>          <a className="btn btn-dark" style={{ marginTop: 22 }} href={cvUrl} download>Télécharger mon CV <Download size={16} /></a>
        </Crystal>
        <Crystal>
          <form className="contact-form" onSubmit={submit}>
            <label>Votre nom<input required name="name" type="text" placeholder="Comment vous appelez-vous ?" /></label>
            <label>Votre adresse e-mail<input required name="email" type="email" placeholder="vous@exemple.com" /></label>
            <label>Votre message<textarea required name="message" rows={5} placeholder="Parlons de votre projet…" /></label>
            <button className="btn btn-dark" style={{ justifySelf: 'start' }} type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Envoi en cours…' : status === 'sent' ? <><Check size={17} /> Message envoyé</> : <>Envoyer le message <Send size={16} /></>}
            </button>
            {status === 'sent' && <p className="form-note" role="status">Merci, votre message est bien parti. Je vous réponds rapidement.</p>}
            {status === 'error' && <p className="form-note err" role="alert">L’envoi a échoué. Réessayez, ou écrivez-moi directement à {email}.</p>}
          </form>
        </Crystal>
      </div>
    </section>
  );
}

export default App;