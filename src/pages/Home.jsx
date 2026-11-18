import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, ShieldCheck, Users, Construction, Trash2, Lightbulb, Trees } from 'lucide-react'

const categories = [
  ['Infraestrutura', 'Buracos e calçadas', Construction],
  ['Iluminação', 'Postes e lâmpadas', Lightbulb],
  ['Limpeza urbana', 'Lixo e entulho', Trash2],
  ['Vegetação', 'Mato alto e árvores', Trees],
]

export default function Home({ user }) {
  return <>
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-copy">
          <div className="eyebrow light">CIDADANIA QUE TRANSFORMA</div>
          <h1>Uma cidade melhor começa com <em>um alerta.</em></h1>
          <p>Encontrou um buraco, poste apagado ou lixo acumulado? Registre o problema e ajude a melhorar os espaços públicos.</p>
          <div className="hero-actions">
            <Link className="btn btn-light" to={user ? '/novo-alerta' : '/cadastro'}>Registrar um problema <ArrowRight size={18}/></Link>
            <a className="hero-link" href="#como-funciona">Como funciona</a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="visual-circle"><MapPin size={76}/></div>
          <div className="visual-card"><span className="status-dot"/><div><b>Participação cidadã</b><small>Problemas identificados pela comunidade</small></div></div>
          <div className="visual-stats"><Users size={19}/><span>Uma comunidade mais ativa</span></div>
        </div>
      </div>
    </section>
    <section className="section" id="como-funciona">
      <div className="section-heading"><div className="eyebrow">SIMPLES E COLABORATIVO</div><h2>Como funciona?</h2><p className="muted">Do registro ao acompanhamento, tudo em um só lugar.</p></div>
      <div className="steps-grid">
        <article className="step"><span>01</span><h3>Registre</h3><p>Informe o tipo de problema, descreva o que aconteceu e indique o local.</p></article>
        <article className="step"><span>02</span><h3>Acompanhe</h3><p>Consulte o andamento do alerta e veja as atualizações realizadas.</p></article>
        <article className="step"><span>03</span><h3>Transforme</h3><p>Ajude a dar visibilidade às necessidades do seu bairro e da cidade.</p></article>
      </div>
    </section>
    <section className="section soft">
      <div className="section-heading"><div className="eyebrow">O QUE PODE SER REGISTRADO?</div><h2>Problemas que merecem atenção</h2></div>
      <div className="category-grid">{categories.map(([title, desc, Icon]) => <article className="category-card" key={title}><span className="category-icon"><Icon size={25}/></span><h3>{title}</h3><p>{desc}</p></article>)}</div>
    </section>
    <section className="bottom-cta"><div><h2>Sua participação faz a diferença.</h2><p>Ajude a identificar o que precisa melhorar.</p></div><Link className="btn btn-primary" to={user ? '/novo-alerta' : '/cadastro'}>Começar agora <ArrowRight size={17}/></Link></section>
  </>
}