import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { collection, onSnapshot, orderBy, query, updateDoc, doc, addDoc } from 'firebase/firestore'
import { db } from '../firebase'

export default function Admin({ user, isAdmin }) {
  const [alerts,setAlerts]=useState([]); const [error,setError]=useState('')
  useEffect(()=>{
    if (!isAdmin || !db) return
    const q=query(collection(db,'alerts'),orderBy('createdAt','desc'))
    return onSnapshot(q,snap=>setAlerts(snap.docs.map(d=>({id:d.id,...d.data()}))),()=>setError('Não foi possível carregar os alertas.'))
  },[isAdmin])
  async function changeStatus(alert,status) {
    try {
      await updateDoc(doc(db,'alerts',alert.id),{status})
      await addDoc(collection(db,'history'),{alertId:alert.id,status,changedBy:user.uid,createdAt:new Date().toISOString()})
    } catch { setError('Falha ao atualizar. Verifique as regras do Firestore.') }
  }
  if (!user) return <section className="empty-page"><h1>Acesso restrito</h1><Link to="/login" className="btn btn-primary">Entrar</Link></section>
  if (!isAdmin) return <section className="empty-page"><h1>Painel restrito</h1><p>Esta área é destinada aos responsáveis pelo atendimento dos alertas.</p></section>
  return <section className="content-page"><div className="eyebrow">GESTÃO DE SOLICITAÇÕES</div><h1>Painel de alertas</h1><p className="muted">Consulte os registros e atualize o andamento.</p>{error&&<p className="error-msg">{error}</p>}
    {!alerts.length?<div className="empty-state">Nenhum alerta recebido.</div>:<div className="alert-list">{alerts.map(a=><article className="alert-card admin-card" key={a.id}><div><span className="eyebrow">{a.category} • {a.priority}</span><h3>{a.location}</h3><p>{a.description}</p><small>Enviado por: {a.userEmail}</small></div><div className="admin-actions"><span className="status-pill">{a.status}</span><select value={a.status} onChange={e=>changeStatus(a,e.target.value)}><option>Novo</option><option>Em análise</option><option>Em andamento</option><option>Concluído</option><option>Não procedente</option></select></div></article>)}</div>}
  </section>
}