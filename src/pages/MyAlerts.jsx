import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../firebase'

export default function MyAlerts({ user }) {
  const [alerts,setAlerts]=useState([]); const [error,setError]=useState('')
  useEffect(()=>{
    if (!user || !db) return
    const q=query(collection(db,'alerts'),where('userId','==',user.uid))
    return onSnapshot(q,snap=>setAlerts(snap.docs.map(d=>({id:d.id,...d.data()}))),()=>setError('Não foi possível carregar seus alertas.'))
  },[user])
  if (!user) return <section className="empty-page"><h1>Faça login para ver seus alertas</h1><Link className="btn btn-primary" to="/login">Entrar</Link></section>
  return <section className="content-page"><div className="page-heading"><div><div className="eyebrow">ACOMPANHAMENTO</div><h1>Meus alertas</h1><p className="muted">Veja as solicitações que você registrou.</p></div><Link className="btn btn-primary" to="/novo-alerta">+ Novo alerta</Link></div>
    {error && <p className="error-msg">{error}</p>}
    {!alerts.length ? <div className="empty-state"><h3>Nenhum alerta registrado ainda</h3><p>Quando você enviar um problema, ele aparecerá aqui.</p></div> :
      <div className="alert-list">{alerts.map(a=><article className="alert-card" key={a.id}><div><span className="eyebrow">{a.category}</span><h3>{a.location}</h3><p>{a.description}</p><small>Prioridade sugerida: {a.priority}</small></div><span className="status-pill">{a.status}</span></article>)}</div>}
  </section>
}