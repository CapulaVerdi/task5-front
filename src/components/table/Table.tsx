import "xp.css/dist/XP.css";
import "./../../index.css"
import "./table.css"
import TableSong from "../table-song/TableSong";
import { useEffect, useState } from "react"
import axios from "axios";
import type { Dispatch, SetStateAction } from "react"

interface TableProps {
    lang: string,
    seed: string,
    likes: number,
    page: number,
    setPage: Dispatch<SetStateAction<number>>
}

export default function Table({lang, seed, likes, page, setPage}: TableProps) {
    const [songs, setSongs] = useState([])

    useEffect(() => {
        axios.post("https://task5-back-kappa.vercel.app/getSongs", { seed, likes, lang, page }).then(res => {setSongs(res.data)})
    }, [seed, likes, lang, page])

    return (
        <div className="window-padding table">
            <div className="window table">
                <div className="title-bar">
                    <div className="title-bar-text">Task 5 content</div>
                    <div className="title-bar-controls">
                        <button aria-label="Close"></button>
                    </div>
                </div>
                <div className="window-body window-scroll">
                    <div className="content-title">
                        <span>#</span>
                        <span>Song</span>
                        <span>Artist</span>
                        <span>Album</span>
                        <span>Genre</span>
                        <span>likes</span>
                    </div>

                    <div className="">
                        {songs.map((item, index) => (
                            <TableSong key={index} data={item} seed={seed}></TableSong>
                        ))}
                    </div>
                </div>

                <div className="pagination-panel">
                    <button onClick={() => {setPage(page - 1)}} disabled={!(page > 1)}>Prev</button>
                    <span>{page}</span>
                    <button onClick={() => {setPage(page + 1)}}>Next</button>
                </div>
            </div>
        </div>
    )
}

