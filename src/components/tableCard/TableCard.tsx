import "xp.css/dist/XP.css";
import "./tableCard.css"
import * as Tone from "tone"
import { useRef } from "react"

interface TableCardProps {
    artist: string,
    album: string,
    songName: string,
    likes: number,
    seed: string,
    id: number
}

export default function TableCard({artist, album, songName, likes, seed, id}: TableCardProps) {

    function stringToSeed(str: string): () => number {
        let hash = 0
        for (let i = 0; i < str.length; i++) {
            hash = (hash * 31 + str.charCodeAt(i)) >>> 0
        }
        
        return () => {
            hash = (hash * 1664525 + 1013904223) >>> 0
            return hash / 0xFFFFFFFF
        }
    }

    function playMelody(seed: string) {
        const rng = stringToSeed(seed + id)

        const notes = ["C4", "D4", "E4", "G4", "A4", "C5"]
        const durations = ["8n", "4n", "4n", "2n"]

        const synth = new Tone.Synth().toDestination()
        const melody = Array.from({ length: 8 }, () => ({
            note: notes[Math.floor(rng() * notes.length)],
            duration: durations[Math.floor(rng() * durations.length)],
        }))

        const seq = new Tone.Sequence((time, { note, duration }) => {
            synth.triggerAttackRelease(note, duration, time)
        }, melody, "4n")

        Tone.Transport.start()
        seq.start(0)
        return seq
    }

    const seqRef = useRef<Tone.Sequence | null>(null)
    const isPlayingRef = useRef(false)


    const handleToggle = async () => {
        if (isPlayingRef.current) {
            seqRef.current?.stop()
            Tone.Transport.stop()
            isPlayingRef.current = false
        } else {
            await Tone.start()
            seqRef.current?.stop()
            Tone.Transport.cancel()

            seqRef.current = playMelody(seed)
            isPlayingRef.current = true
        }
    }

    return (
        <div className="window tableCard">
            <div className="title-bar">
                <div className="title-bar-text">A Window With Stuff In It</div>
                <div className="title-bar-controls">
                <button aria-label="Close"></button>
                </div>
            </div>
            <div className="window-body tableCard-flex">
                <div className="tableCard-control">
                    
                    <span>Likes: {likes}</span>
                    <button onClick={handleToggle}>play</button>
                </div>
                <div className="tableCard-info">
                    <span>Artist: {artist}</span>
                    <span>Album: {album}</span>
                    <span>Song: {songName}</span>
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}