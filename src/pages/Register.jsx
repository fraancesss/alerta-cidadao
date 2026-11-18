import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db, firebaseConfigured } from '../firebase'

export default function Register() {
  const [name,setName]=useState(''); const [email,setEmail]=useState(''); const [password,setPassword]=useState('')
  const [error,setError]=useState(''); const [loading,setLoading]=useState(false); const navigate=useNavigate()
  async function submit(e) {
    e.preventDefault(); setError('')
    if (!firebaseConfigured) return setError('Configure o Firebase no arquivo .env.local antes de criar uma conta.')
    if (password.length < 6) return setError('A senha precisa ter pelo menos 6 caracteres.')
    setLoading(true)
    try {
      const result=await createUserWithEmailAndPassword(auth,email,password)
      await updateProfile(result.user,{displayName:name})
      await setDoc(doc(db,'users',result.user.uid),{name,email,role:'citizen',createdAt:new Date().toISOString()})
      navigate('/meus-alertas')
    } catch (error) {
  console.error('Erro ao cadastrar:', error)

  setError(
    `Erro: ${error.code || error.message}`
  )
}
    finally { setLoading(false) }
  }
  return <section className="form-page"><form className="form-card" onSubmit={submit}>
    <div className="eyebrow">FAÇA PARTE DA MUDANÇA</div><h1>Criar uma conta</h1><p className="muted">Registre problemas e acompanhe suas solicitações.</p>
    <label>Nome completo<input value={name} onChange={e=>setName(e.target.value)} required placeholder="Seu nome"/></label>
    <label>E-mail<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required placeholder="seu@email.com"/></label>
    <label>Senha<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required minLength={6} placeholder="Mínimo de 6 caracteres"/></label>
    {error && <p className="error-msg">{error}</p>}
    <button className="btn btn-primary full" disabled={loading}>{loading?'Criando conta...':'Criar conta'}</button>
    <p className="form-bottom">Já tem uma conta? <Link to="/login">Entrar</Link></p>
  </form></section>
}