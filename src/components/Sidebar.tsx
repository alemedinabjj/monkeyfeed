import styles from './Sidebar.module.css';
import ProfileMonkey from '../assets/logo.svg'
import { PencilLine, SignOut } from 'phosphor-react';
import { Avatar } from './Avatar';
import { useAuth } from '../hooks/useAuth';

export function Sidebar() {
  const { user, logout } = useAuth()

  return(
    <aside className={styles.sidebar}>
      <img className={styles.cover} src="https://images.unsplash.com/photo-1519379598731-434820e76667?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=40" />
      <div className={styles.profile}>
        <Avatar name={user?.username || ''} />

        <strong>{user?.username}</strong>
        <span>Developer</span>
      </div>

      <footer>
        <a href="#">
          <PencilLine size={20} />
          Editar seu perfil
        </a>
        <a href=""
          onClick={logout}
        >
          <SignOut size={20} />
          Deslogar
        </a>
      </footer>

    </aside>
  )
}