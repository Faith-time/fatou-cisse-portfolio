import { useState, type ReactNode } from 'react';
import {
  ArrowUpRight,
  BarChart3,
  BriefcaseBusiness,
  Check,
  CircleUserRound,
  Gauge,
  Grid2X2,
  Linkedin,
  Mail,
  Menu,
  Network,
  Radio,
  Send,
  Sparkles,
  TrainFront,
  X,
} from 'lucide-react';

type Page = 'accueil' | 'parcours' | 'expertises' | 'projets' | 'contact';

const portraitUrl = '/WhatsApp_Image_2026-10-14_at_17.38.51.jpeg';
const trainUrl = 'https://images.pexels.com/photos/40180594/pexels-photo-40180594.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

const navItems: { id: Page; label: string; icon: typeof Grid2X2 }[] = [
  { id: 'accueil', label: 'Accueil', icon: Grid2X2 },
  { id: 'parcours', label: 'Parcours', icon: BriefcaseBusiness },
  { id: 'expertises', label: 'Expertises', icon: Gauge },
  { id: 'projets', label: 'Projets', icon: Network },
  { id: 'contact', label: 'Contact', icon: Mail },
];

const experience = [
  { period: '2024 — aujourd’hui', role: 'Railway Data Validation — ATC/DV Engineer', company: 'VIVERIS Technologies', detail: 'Validation de données et contrôle de cohérence pour des systèmes ferroviaires critiques.' },
  { period: '2023 — 2024', role: 'Ingénieure validation & systèmes', company: 'Environnement ferroviaire', detail: 'Analyse des exigences, vérification des livrables et coordination avec les équipes techniques.' },
  { period: 'Formation', role: 'Ingénieure systèmes et numérique', company: 'INSA Hauts-de-France', detail: 'Une formation tournée vers les systèmes complexes, l’analyse et les environnements industriels.' },
];

const skills = [
  { title: 'Railway Data Validation', text: 'Transformer des données techniques en décisions fiables pour des systèmes où chaque détail compte.', icon: TrainFront, tone: 'blue' },
  { title: 'ATC / DV', text: 'Comprendre, contrôler et documenter les interfaces et exigences des systèmes ferroviaires.', icon: Radio, tone: 'mint' },
  { title: 'Qualité & méthode', text: 'Travailler avec rigueur, clarté et sens du collectif sur des sujets à forte responsabilité.', icon: Check, tone: 'sand' },
];

function App() {
  const [page, setPage] = useState<Page>('accueil');
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);

  const navigate = (nextPage: Page) => {
    setPage(nextPage);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="site-shell">
      <header className="top-bar">
        <div className="top-bar-inner">
          <button className="top-brand" onClick={() => navigate('accueil')} aria-label="Retour à l'accueil">
            <span className="brand-mark"><span>FC</span><i /></span>
            <span className="top-brand-name">Fatou Cissé <strong>Gueye</strong></span>
          </button>

          <nav className={`top-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Navigation principale">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button key={id} className={`top-link ${page === id ? 'active' : ''}`} onClick={() => navigate(id)}>
                <Icon size={16} strokeWidth={1.8} />
                <span>{label}</span>
              </button>
            ))}
          </nav>

          <div className="top-actions">
            <span className="availability"><span className="status-dot" /> Disponible</span>
            <button className="top-cta" onClick={() => navigate('contact')}>Me contacter <ArrowUpRight size={15} /></button>
            <button className="menu-toggle" onClick={() => setMenuOpen((v) => !v)} aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={menuOpen}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <main className="page-area">
        <div className="art-header" aria-hidden="true"><span className="art-sun" /><span className="art-orbit art-orbit-one" /><span className="art-orbit art-orbit-two" /><span className="art-brush art-brush-one" /><span className="art-brush art-brush-two" /><span className="art-track" /><span className="art-dot art-dot-one" /><span className="art-dot art-dot-two" /></div>
        <div className="ambient-threads" aria-hidden="true"><span className="thread thread-one" /><span className="thread thread-two" /><span className="thread thread-three" /><span className="thread-glint" /></div>
        {page === 'accueil' && <Home navigate={navigate} />}
        {page === 'parcours' && <Journey />}
        {page === 'expertises' && <Expertise />}
        {page === 'projets' && <Projects />}
        {page === 'contact' && <Contact sent={sent} setSent={setSent} />}
        <footer className="site-footer"><span>Fatou Cissé Gueye</span><span>Railway data · validation · systèmes</span><span>© 2026</span></footer>
      </main>
    </div>
  );
}

function Home({ navigate }: { navigate: (page: Page) => void }) {
  return (
    <section className="home-hero-page page-content">
      {/* Bloc héro : photo d'abord, texte ensuite, même hauteur */}
      <div className="hero">
        <figure className="hero-photo glass-card reveal">
          <img src={portraitUrl} alt="Portrait de Fatou Cissé Gueye" />
          <figcaption className="portrait-label"><strong>Profil professionnel</strong><span>INSA HdF</span></figcaption>
        </figure>

        <div className="hero-text reveal delay-1">
          <div>
            <p className="eyebrow"><Sparkles size={15} /> Ingénieure en systèmes critiques</p>
            <h1>Donner de la <em>clarté</em> aux systèmes complexes.</h1>
            <p className="intro-copy">Je m’appelle <strong>Fatou Cissé Gueye</strong>. Je travaille à l’intersection de la donnée, de la validation et de la mobilité ferroviaire.</p>
          </div>
          <div className="hero-bottom">
            <button className="hero-button" onClick={() => navigate('parcours')}>Découvrir mon parcours <ArrowUpRight size={16} /></button>
            <div className="home-note"><div className="round-icon"><ArrowUpRight size={18} /></div><p>Un profil technique, curieux et attentif à l’humain derrière chaque système.</p></div>
          </div>
        </div>
      </div>

      {/* Trois cartes de même hauteur */}
      <div className="home-cards">
        <div className="quote-card glass-card reveal delay-2"><span className="quote-mark">“</span><p>La précision technique devient une vraie force lorsqu’elle sert un objectif simple : rendre les systèmes plus sûrs.</p><span className="quote-author">— Ma manière de travailler</span></div>
        <div className="signal-card glass-card reveal delay-2"><div className="mini-icon"><BarChart3 size={18} /></div><span className="card-label">Aujourd’hui</span><strong>Railway<br />Data Validation</strong><div className="signal-line"><i /><i /><i /><i /><i /><i /><i /></div><small>ATC / DV · VIVERIS Technologies</small></div>
        <div className="number-card reveal delay-3"><strong>03</strong><span>axes de travail</span><div><b>Data</b><b>Validation</b><b>Systèmes</b></div></div>
      </div>
    </section>
  );
}

function PageHeader({ kicker, title, text }: { kicker: string; title: ReactNode; text: string }) {
  return <header className="section-header"><p className="eyebrow">{kicker}</p><h2>{title}</h2><p>{text}</p></header>;
}

function Journey() {
  return <section className="page-content inner-page"><PageHeader kicker="02 / Parcours" title={<>Un chemin construit<br /><em>avec méthode.</em></>} text="Des expériences qui m'ont appris à relier l'exigence technique à une vision concrète du terrain." />
    <div className="journey-grid"><div className="timeline">{experience.map((item, index) => <article className="timeline-item" key={item.role}><div className="timeline-marker">0{index + 1}</div><div><span className="period">{item.period}</span><h3>{item.role}</h3><strong>{item.company}</strong><p>{item.detail}</p></div></article>)}</div><div className="journey-aside glass-card"><div className="aside-icon"><CircleUserRound size={21} /></div><span className="card-label">Ce qui m’anime</span><h3>Comprendre avant de valider.</h3><p>J’aime entrer dans la logique d’un système, poser les bonnes questions et rendre les informations lisibles pour toute l’équipe.</p><div className="aside-stat"><strong>606</strong><span>personnes dans mon réseau<br />professionnel</span></div></div></div>
  </section>;
}

function Expertise() {
  return <section className="page-content inner-page"><PageHeader kicker="03 / Expertises" title={<>La rigueur,<br /><em>en mouvement.</em></>} text="Mon expertise se construit autour de trois réflexes : observer, vérifier, transmettre." /><div className="skills-list">{skills.map((skill, index) => { const Icon = skill.icon; return <article className={`skill-row ${skill.tone}`} key={skill.title}><span className="skill-index">0{index + 1}</span><div className="skill-icon"><Icon size={24} /></div><div className="skill-text"><h3>{skill.title}</h3><p>{skill.text}</p></div><ArrowUpRight className="skill-arrow" size={20} /></article>; })}</div><div className="principles glass-card"><span className="card-label">En pratique</span><div className="principle-items"><span><Check size={15} /> Esprit d’analyse</span><span><Check size={15} /> Communication claire</span><span><Check size={15} /> Culture qualité</span><span><Check size={15} /> Sens du collectif</span></div></div></section>;
}

function Projects() {
  return <section className="page-content inner-page"><PageHeader kicker="04 / Projets" title={<>Des systèmes qui<br /><em>font avancer.</em></>} text="Quelques repères visuels sur mon univers professionnel : des environnements techniques, utiles et profondément humains." /><div className="project-feature glass-card"><img src={trainUrl} alt="Intérieur lumineux d'un train moderne" /><div className="project-overlay"><span>01 — Système ferroviaire</span><h3>La donnée comme<br />voie de confiance.</h3><p>Validation · cohérence · sécurité</p></div></div><div className="project-cards"><article className="project-small glass-card"><div className="project-number">02</div><BarChart3 size={22} /><h3>Rendre les données fiables</h3><p>Contrôler, comparer et documenter l'information avant sa mise en circulation.</p></article><article className="project-small glass-card peach"><div className="project-number">03</div><Network size={22} /><h3>Faire le lien entre les équipes</h3><p>Créer une compréhension commune entre métier, technique et qualité.</p></article></div></section>;
}

function Contact({ sent, setSent }: { sent: boolean; setSent: (value: boolean) => void }) {
  return <section className="page-content inner-page contact-page"><PageHeader kicker="05 / Contact" title={<>Construisons la<br /><em>suite.</em></>} text="Une question, une collaboration ou simplement l'envie d'échanger sur les systèmes de demain ?" /><div className="contact-layout"><div className="contact-details glass-card"><div className="contact-avatar"><img src={portraitUrl} alt="Fatou Cissé Gueye" /></div><h3>Fatou Cissé Gueye</h3><p>Railway Data Validation<br />ATC / DV Engineer</p><span className="contact-detail-line"><Mail size={17} /> Disponible via le formulaire</span><span className="contact-detail-line"><Linkedin size={17} /> Profil professionnel</span></div><form className="contact-form glass-card" onSubmit={(event) => { event.preventDefault(); setSent(true); }}><label>Votre nom<input required type="text" placeholder="Comment vous appelez-vous ?" /></label><label>Votre adresse email<input required type="email" placeholder="vous@exemple.com" /></label><label>Votre message<textarea required rows={4} placeholder="Parlons de votre projet..." /></label><button className="submit-button" type="submit">{sent ? <><Check size={17} /> Message envoyé</> : <>Envoyer le message <Send size={16} /></>}</button></form></div></section>;
}

export default App;