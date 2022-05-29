import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import illustracionImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'
import '../styles/auth.scss'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'
import toast, { Toaster } from 'react-hot-toast'



export function Home() {
    const history = useNavigate()
    const { user, signInWithGoogle } = useAuth()
    const [roomCode, setRoomCode] = useState('')

    async function handleSignIn() {
        if (!user) {
            await signInWithGoogle()
        }

        history('/rooms/new')
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault()

        if (roomCode.trim() === '') {
            return
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get()

        if (!roomRef.exists()) {
            toast.error(`Não encontramos a sala ${roomCode}.`)
            return
        }

        if(roomRef.val().endedAt) {
            toast.error(`Sala ${roomCode} fechada.`)
            return
        }
        
        history(`/rooms/${roomCode}`)
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustracionImg} alt="illustracion" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="logo" />
                    <div><Toaster/></div>
                    <button onClick={handleSignIn} className="create-room">
                        <img src={googleIconImg} alt="google"/>
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">
                        ou entre em uma sala
                    </div>
                    <form onSubmit={handleJoinRoom}>
                        <input 
                            type="text" 
                            placeholder="Digite o código da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}