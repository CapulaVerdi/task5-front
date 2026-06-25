import { useState } from "react"
import "./tableSong.css"
import TableCard from "../tableCard/TableCard"

interface TableSongProps {
    data: {
        id: number,
        artist: string,
        album: string,
        genre: string,
        songName: string,
        likes: number
    },
    seed: string
}

export default function TableSong({data, seed}: TableSongProps) {
    const [tableCardOpened, setTableCardOpened] = useState(false)

    function openTableCard() {
        setTableCardOpened(!tableCardOpened)
    }

    return (
        <div>
            <div className="tableSong" onClick={openTableCard}>
                <span>{data.id}</span>
                <span>{data.artist}</span>
                <span>{data.album}</span>
                <span>{data.genre}</span>
                <span>{data.songName}</span>
                <span>{data.likes}</span>
            </div>
            {tableCardOpened ? <TableCard artist={data.artist} album={data.album} songName={data.songName} likes={data.likes} seed={seed} id={data.id}></TableCard> : ''}
        </div>
    )
}