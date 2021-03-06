import React, { useState } from 'react';
import './App.css';
import { TextField, Button, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { proves } from './provesData';
import img1 from './assets/images/01.png';
import img2 from './assets/images/02.png';
import img3 from './assets/images/03.png';
import img4 from './assets/images/04.png';
import img5 from './assets/images/05.png';
import img6 from './assets/images/06.png';
import imgLock1 from './assets/images/01 lock.png';
import imgLock2 from './assets/images/02 lock.png';
import imgLock3 from './assets/images/03 lock.png';
import imgLock4 from './assets/images/04 lock.png';
import imgLock5 from './assets/images/05 lock.png';
import imgLock6 from './assets/images/06 lock.png';
import './assets/styles/bootstrap.min.css'

const puzzleOrder = [2, 4, 3, 5, 1, 0];

function App() {
  const [actProva, setActProva] = useState(0);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [puzzleFlipped, setPuzzleFlipped] = useState([false, false, false, false, false, false]);
  const [allFinished, setAllFinished] = useState(false);
  const [inputError, setInputError] = useState(false);
  const resolvedImages = [img1, img2, img3, img4, img5, img6];
  const lockImages = [imgLock1, imgLock2, imgLock3, imgLock4, imgLock5, imgLock6];

  const handleProvaClick = () => {
    if (proves[actProva].response === inputValue) {
      setShowSuccessMessage(true);
      let updatedPuzzleFlipped = [...puzzleFlipped];
      updatedPuzzleFlipped[puzzleOrder[actProva]] = true;
      setPuzzleFlipped(updatedPuzzleFlipped);
      if (actProva < 5) setActProva(actProva + 1);
      else setAllFinished(true);
      setInputValue('');
      setInputError(false);
    } else setInputError(true);
  }

  const handleSubmit = e => {
    e.preventDefault();
    handleProvaClick();
  }

  return (
    <div className="App">
      <a
        href="https://meet.jit.si/lamartinafa30anys"
        target="_blank"
        className="mr-3"
        style={{ position: 'absolute', right: '0' }}
      >Jitsi</a>
      <h1 className="mt-2">Gincana Virtual INA 30</h1>

      <Snackbar open={showSuccessMessage} autoHideDuration={3000} onClose={() => setShowSuccessMessage(false)}>
        <MuiAlert elevation={6} variant="filled" onClose={() => setShowSuccessMessage(false)} severity="success" >
          Resposta correcta!
        </MuiAlert>
      </Snackbar>

      {!allFinished &&
        <div className="d-flex flex-column align-items-center my-4">
          <h3 >{`Prova ${actProva + 1} ${proves[actProva].icon}`}</h3>
          <div className="mb-2">{proves[actProva]?.description}</div>
          <div className="d-flex p-3">
            <form onSubmit={handleSubmit}>
              <TextField
                id="standard-basic"
                label={proves[actProva].label}
                value={inputValue}
                variant="outlined"
                onChange={(e) => { setInputValue(e.target.value); setInputError(false); }}
                error={inputError}
              />
              <Button variant="contained" className='ml-2' type="submit">Comprova</Button>
            </form>
          </div>

        </div>
      }

      <div >
        {puzzleFlipped.map((p, key) => (
          <>
            <img src={p ? resolvedImages[key] : lockImages[key]} style={{ width: '20%', borderRadius: p ? '' : '20%' }} />
            {key == 2 && <br />}
          </>
        ))}
      </div>

      {allFinished &&
        <div className="mt-3">
          <h2>Yuhuuuu!!! Felicitats, aquí tens el nostre regal: linkk</h2>
          <p>Necessitaràs una contrasenya... el puzzle que acabes de resoldre t'hauria d'ajudar! 😜</p>
        </div>
      }

    </div >
  );
}

export default App;
