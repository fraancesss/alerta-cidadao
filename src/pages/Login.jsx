import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, firebaseConfigured } from '../firebase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function submit(e) {
    e.preventDefault()
    setError('')
    if (!firebaseConfigured) return setError('Configure o Firebase no arquivo .env.local antes de entrar.')
    setLoading(true)
    try { await signInWithEmailAndPassword(auth, email, password); navigate('/meus-alertas') }
    catch { setError('Não foi possível entrar. Confira seu e-mail e sua senha.') }
    finally { setLoading(false) }
  }

  return <section className="form-page"><form className="form-card" onSubmit={submit}>
    <div className="eyebrow">BEM-VINDO DE VOLTA</div><h1>Entrar na sua conta</h1><p className="muted">Acompanhe os problemas registrados por você.</p>
    <label>E-mail<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required placeholder="seu@email.com"/></label>
    <label>Senha<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required placeholder="Sua senha"/></label>
    {error && <p className="error-msg">{error}</p>}
    <button className="btn btn-primary full" disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}</button>
    <p className="form-bottom">Ainda não tem conta? <Link to="/cadastro">Cadastre-se</Link></p>
  </form></section>
}