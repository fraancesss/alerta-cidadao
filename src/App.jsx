import { useEffect, useState } from 'react'
import { Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import { AlertTriangle, Bell, ClipboardList, Home as HomeIcon, LogIn, LogOut, Menu, PlusCircle, ShieldCheck, UserRound, X } from 'lucide-react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db, firebaseConfigured } from './firebase'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import NewAlert from './pages/NewAlert'
import MyAlerts from './pages/MyAlerts'
import Admin from './pages/Admin'

export default function App() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (!auth) return
    return onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser)
      if (currentUser && db) {
        try {
          const snap = await getDoc(doc(db, 'users', currentUser.uid))
          setProfile(snap.exists() ? snap.data() : null)
        } catch {
          setProfile(null)
        }
      } else {
        setProfile(null)
      }
    })
  }, [])

  async function handleLogout() {
    if (auth) await signOut(auth)
    setMenuOpen(false)
    navigate('/')
  }

  const isAdmin = profile?.role === 'admin'

  return (
    <>
      <header className="site-header">
        <div className="nav-wrap">
          <Link className="brand" to="/" onClick={() => setMenuOpen(false)}>
            <span className="brand-mark"><AlertTriangle size={22} /></span>
            <span>Alerta <b>Cidadão</b></span>
          </Link>
          <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu">
            {menuOpen ? <X /> : <Menu />}
          </button>
          <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
            <NavLink to="/" onClick={() => setMenuOpen(false)}><HomeIcon size={17}/> Início</NavLink>
            {user && <NavLink to="/meus-alertas" onClick={() => setMenuOpen(false)}><ClipboardList size={17}/> Meus alertas</NavLink>}
            {user && <NavLink to="/novo-alerta" onClick={() => setMenuOpen(false)}><PlusCircle size={17}/> Registrar problema</NavLink>}
            {isAdmin && <NavLink to="/admin" onClick={() => setMenuOpen(false)}><ShieldCheck size={17}/> Painel responsável</NavLink>}
            {!user ? <><Link className="nav-login" to="/login" onClick={() => setMenuOpen(false)}><LogIn size={17}/> Entrar</Link><Link className="btn btn-small" to="/cadastro" onClick={() => setMenuOpen(false)}>Criar conta</Link></> :
              <button className="nav-logout" onClick={handleLogout}><LogOut size={17}/> Sair</button>}
          </nav>
        </div>
      </header>
      {!firebaseConfigured && <div className="setup-notice"><Bell size={16}/> Modo de configuração: conecte seu Firebase no arquivo <b>.env.local</b> para habilitar cadastro e login.</div>}
      <main>
        <Routes>
          <Route path="/" element={<Home user={user}/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Register />} />
          <Route path="/novo-alerta" element={<NewAlert user={user}/>} />
          <Route path="/meus-alertas" element={<MyAlerts user={user}/>} />
          <Route path="/admin" element={<Admin user={user} isAdmin={isAdmin}/>} />
          <Route path="*" element={<div className="empty-page"><h1>Página não encontrada</h1><Link to="/" className="btn">Voltar ao início</Link></div>} />
        </Routes>
      </main>
      <footer className="footer"><div className="footer-inner"><span className="brand footer-brand">Alerta <b>Cidadão</b></span><span>Participação cidadã para cidades melhores.</span><small>Projeto acadêmico CitizenTech • 2026</small></div></footer>
    </>
  )
}