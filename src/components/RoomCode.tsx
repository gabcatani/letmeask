import '../styles/room-code.scss';
import copyImg from '../assets/images/copy.svg'
import { useState } from 'react';

type RoomCodeProps = {
    code: string;
}

export function RoomCode() {

    const [roomNumber, setRoomNumber] = useState('')

       function copyRoomCodeToClipboard(props: RoomCodeProps) {
           navigator.clipboard.writeText(props.code);
           setRoomNumber(props.code)
    }

    return (
        <button className="room-code" onClick={() => copyRoomCodeToClipboard}>
            <div>
                <img src={copyImg} alt="Copy room code"/>
            </div>
            <span>Sala #{roomNumber}</span>
        </button>
    )
}