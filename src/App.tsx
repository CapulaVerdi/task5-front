import './App.css'
import Toolbar from './components/toolbar/Toolbar'
import Table from './components/table/Table';
import "xp.css/dist/XP.css";
import { useState } from 'react';

interface AppProps {

}

function App() {
  const [lang, setLang] = useState('EN')
  const [seed, setSeed] = useState('')
  const [likes, setLikes] = useState(0)
  const [page, setPage] = useState(1)

  return (
    <div className='flex-container'>
      <Toolbar 
        lang={lang} setLang={setLang}
        seed={seed} setSeed={setSeed}
        likes={likes} setLikes={setLikes} 
      ></Toolbar>
      <Table lang={lang} seed={seed} likes={likes} page={page} setPage={setPage}></Table>
    </div>
  )
}

export default App
