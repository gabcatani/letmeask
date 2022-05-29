
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router';
import toast, { Toaster } from 'react-hot-toast'
import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'
import { useAuth } from '../hooks/useAuth'
import '../styles/room.scss'
import deleteImg from '../assets/images/delete.svg'
import { Question } from '../components/Question'
import { useRoom } from '../hooks/useRoom'
import { database } from '../services/firebase'
import checkImg from '../assets/images/check.svg'
import answerImg from '../assets/images/answer.svg'


type RoomParams = {
    id: string
}

export function AdminRoom() {
    let navigate = useNavigate();
    const params = useParams<RoomParams>()
    const { user } = useAuth()
    const roomId = params.id
    const {title, questions} = useRoom(roomId as string)
    
    async function handleEndRoom() {
        await database.ref(`rooms/${roomId}`).update({ 
            endedAt: new Date(),
        })

        toast.success('Sala encerrada com sucesso')
        navigate('/')
    }


    async function handleDeleteQuestion(questionId: string) {
        if (window.confirm('Are you sure you want to delete this question?')) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
        }
    }

    async function handleCheckQuestionAsAnswered (questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true,
        })
        toast.success('Pergunta marcada como respondida')
    }

    async function handleHighlightQuestion(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlight: true,
        })
        toast.success('Pergunta marcada como destaque')
    }

    return(
        <div id="page-room">
            <Toaster />
            <header>
                <div className="content">
                    <img src={logoImg} alt="logo"/>
                    <div>
                        {/* BUG - Pass room code by props don't work */}
                        <RoomCode /> 
                        <Button 
                            isOutline
                            onClick={handleEndRoom} 
                        >
                            Encerrar Sala
                        </Button>
                    </div>
                </div>
            </header>

            <main className="content"> 
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    { questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>
    
                <div className="question-list">
                    {questions.map(question => {
                        return (
                            <Question 
                                key={question.id}
                                content={question.content}
                                author={question.author}
                                isAnswered={question.isAnswered}
                                isHighlighted={question.isHighlighted}
                            >
                                <button
                                    type="button"
                                    onClick={() => handleDeleteQuestion(question.id)}
                                >
                                    <img src={deleteImg} alt="Remover Pergunta" />
                                </button>
                               { !question.isAnswered && (
                                   <>
                                    <button
                                    type="button"
                                    onClick={() => handleCheckQuestionAsAnswered(question.id)}
                                >
                                    <img src={checkImg} alt="Marcar pergunta como respondida Pergunta" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleHighlightQuestion(question.id)}
                                >
                                    <img src={answerImg} alt="Dar destaque a pergunta Pergunta" />
                                </button>
                                </>
                               )}
                            </Question>
                        )
                    })}
                </div>
            </main>
        </div>
    )
}