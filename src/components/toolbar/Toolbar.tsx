import "xp.css/dist/XP.css";
import "./toolbar.css"
import "./../../index.css"
import { useState } from "react";

interface ToolbarProrps {

}

export default function Toolbar({
    lang, setLang,
    seed, setSeed,
    likes, setLikes,
}) {
    function getRandomSeed() {
        setSeed(Math.random().toString(36).substring(2, 64)); 
    }
    
    return (
        <div className="window-padding window-margin-bottom">
            <div className="window">
                <div className="title-bar">
                    <div className="title-bar-text">Task 5 toolbar</div>
                    <div className="title-bar-controls">
                        <button aria-label="Close"></button>
                    </div>
                </div>
                <div className="window-body flex-cont">
                    <select className=" toolbar-margin" onChange={(e) => setLang(e.target.value)}>
                        <option value={"EN"}>English</option>
                        <option value={"RU"}>Russian</option>
                    </select>
                    <div className="field-row toolbar-margin">
                        <label htmlFor="text21">Seed</label>
                        <input className="toolbar-seed-input" value={seed} onChange={(e) => setSeed(e.target.value)} id="text21" type="text" />
                        <button onClick={getRandomSeed}>Random seed</button>
                    </div>
                    <div className="field-row range-margin">
                        <label htmlFor="range25">Likes:</label>
                        <label htmlFor="range26">{likes}</label>
                        <input 
                            id="range26" 
                            type="range" 
                            min="0" 
                            max="10" 
                            value={likes} 
                            step="0.1" 
                            onChange={(e) => setLikes(Number(e.target.value))}/>
                    </div>
                </div>
            </div>
        </div>
    )
}