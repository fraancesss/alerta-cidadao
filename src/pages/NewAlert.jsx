import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { addDoc, collection } from 'firebase/firestore'
import { db, firebaseConfigured } from '../firebase'

export default function NewAlert({ user }) {
  const [category,setCategory]=useState('Infraestrutura'); const [priority,setPriority]=useState('Média')
  const [description,setDescription]=useState(''); const [location,setLocation]=useState(''); const [error,setError]=useState('')
  const [loading,setLoading]=useState(false); const navigate=useNavigate()
  if (!user) return <section className="empty-page"><h1>Entre para registrar um problema</h1><p>Você precisa de uma conta para enviar e acompanhar alertas.</p><Link className="btn btn-primary" to="/login">Entrar</Link></section>
  async function submit(e) {
    e.preventDefault(); setError('')
    if (!firebaseConfigured) return setError('Configure o Firebase no arquivo .env.local antes de enviar alertas.')
    setLoading(true)
    try {
      await addDoc(collection(db,'alerts'),{userId:user.uid,userEmail:user.email,category,priority,description,location,status:'Novo',createdAt:new Date().toISOString()})
      navigate('/meus-alertas')
    } catch { setError('Não foi possível enviar o alerta. Confira as configurações do Firebase.') }
    finally { setLoading(false) }
  }
  return <section className="form-page"><form className="form-card wide" onSubmit={submit}>
    <div className="eyebrow">CONTRIBUA COM SUA CIDADE</div><h1>Registrar um problema</h1><p className="muted">Descreva a situação com o máximo de clareza possível.</p>
    <label>Categoria<select value={category} onChange={e=>setCategory(e.target.value)}><option>Infraestrutura</option><option>Iluminação</option><option>Limpeza urbana</option><option>Vegetação</option><option>Outro</option></select></label>
    <label>Prioridade sugerida<select value={priority} onChange={e=>setPriority(e.target.value)}><option>Baixa</option><option>Média</option><option>Alta</option></select></label>
    <label>Localização<input value={location} onChange={e=>setLocation(e.target.value)} required placeholder="Rua, número, bairro ou ponto de referência"/></label>
    <label>Descrição<textarea value={description} onChange={e=>setDescription(e.target.value)} required rows="5" placeholder="Explique o que aconteceu..."/></label>
    {error && <p className="error-msg">{error}</p>}
    <button className="btn btn-primary full" disabled={loading}>{loading?'Enviando...':'Enviar alerta'}</button>
  </form></section>
}