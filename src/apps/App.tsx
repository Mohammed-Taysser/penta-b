import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Mars from '../components/Mars';

import northIcon from '../assets/images/icons/north.png';

import 'react-toastify/dist/ReactToastify.css';
import '../assets/css/app.css';

// (x, y, direction)
const START_POSITION: Position = [0, 0, 'NORTH'];
const MARS_BLATE_SIZE = 6;

function App() {
  const [commands, setCommands] = useState('');
  const [start, setStart] = useState(false);
  const [reset, setReset] = useState(false);

  const addCommand = (command: Command) => {
    setCommands(commands + command);
    setReset(true);
  };

  const runSample = (sample: string) => {
    setCommands(sample);
    setReset(true);
  };

  const executeCommands = () => {
    setStart(true);
    setReset(false);
  };

  const clear = () => {
    setCommands('');
    setStart(false);
    setReset(true);
  };

  const stopExecute = () => {
    setStart(false);
  };

  return (
    <div className='app'>
      <ToastContainer />

      <img src={northIcon} alt='north-icon' className='north-icon' />

      <div className='control-panel'>
        <div className='execution'>
          <div className=''>
            <button onClick={clear} className='error' disabled={start}>
              Clear
            </button>
          </div>

          <input
            type='text'
            className='command'
            value={commands}
            placeholder='Write command ...'
            disabled
            title='Command'
          />

          <div className=''>
            <button
              className='success'
              onClick={executeCommands}
              disabled={start || commands.length === 0}
            >
              Execute
            </button>
          </div>
        </div>
        <div className='wrapper'>
          <div className='commands'>
            <div className='single-col'>
              <button onClick={() => addCommand('L')}>⬅️ Left</button>
            </div>

            <div className='command-col'>
              <button onClick={() => addCommand('F')}>Forward ⬆️</button>
              <button onClick={() => addCommand('D')}>Backward ⬇️</button>
            </div>

            <div className='single-col'>
              <button onClick={() => addCommand('R')}>Right ➡️</button>
            </div>
          </div>
        </div>
        <div className='samples'>
          <h4 className='samples-title'>Sample: </h4>

          <ul>
            <li>
              <button onClick={() => runSample('FFRFFLFFRF')} disabled={start}>
                MMRMMLMMRM
              </button>
            </li>

            <li>
              <button onClick={() => runSample('RFFFLFRFLF')} disabled={start}>
                RMMMLMRMLM
              </button>
            </li>
          </ul>
        </div>
      </div>

      <Mars
        size={MARS_BLATE_SIZE}
        position={START_POSITION}
        commands={commands}
        start={start}
        reset={reset}
        onDone={stopExecute}
      />
    </div>
  );
}

export default App;
