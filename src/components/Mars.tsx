import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  LEFT_TURNS_MAP,
  MOVE_BACKWARD,
  MOVE_FORWARD,
  RIGHT_TURNS_MAP,
} from '../constants/mars';
import Rover from './Rover';

function Mars(props: MarsProps) {
  const initialState: MarsInitState = {
    start: `${props.position[0]}-${props.position[1]}`,
    end: '',
    position: `${props.position[0]}-${props.position[1]}`,
    direction: props.position[2],
    path: {},
    error: false,
    commandIndex: 0,
  };

  const [state, setState] = useState<MarsInitState>({ ...initialState });
  const [cells, setCells] = useState<string[]>([]);

  useEffect(() => {
    const cls = [];
    for (let i = props.size - 1; i >= 0; i--) {
      for (let j = 0; j < props.size; j++) {
        cls.push(j + '-' + i);
      }
    }

    setCells(cls);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (props.start) {
      reset().then(run);
    }

    if (props.reset) {
      reset();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  useEffect(() => {
    if (props.start) {
      setTimeout(() => {
        run();
      }, 300);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.commandIndex]);

  const reset = () => {
    return new Promise((resolve) => {
      setState({ ...initialState });
      toast.dismiss();
      resolve(true);
    });
  };

  const run = () => {
    if (state.commandIndex !== props.commands.length) {
      const path = { ...state.path };

      path[state.position] = state.direction;

      const cmd = props.commands[state.commandIndex];

      let newPosition = {};

      if (cmd === 'L') {
        newPosition = turnRoverLeft();
      } else if (cmd === 'R') {
        newPosition = turnRoverRight();
      } else if (cmd === 'F') {
        newPosition = moveRoverForward();
      } else if (cmd === 'D') {
        newPosition = moveRoverBackward();
      } else {
        console.log('Invalid command', cmd);
      }

      setState((prev) => ({
        ...prev,
        ...newPosition,
        path,
        commandIndex: prev.commandIndex + 1,
      }));
    } else {
      setState((prev) => ({
        ...prev,
        end: prev.position,
      }));
      reportEndpoint();

      props.onDone();
    }
  };

  const reportEndpoint = () => {
    const [x, y] = state.position.split('-');

    toast.info(`Rover report: (${x}, ${y}) ${state.direction}`, {
      theme: 'dark',
    });
  };

  const moveRoverForward = () => {
    const moveVector = MOVE_FORWARD[state.direction];

    const pos = state.position.split('-').map(Number);

    const x = pos[0] + moveVector[0];
    const y = pos[1] + moveVector[1];

    if (x < 0 || x >= props.size || y < 0 || y >= props.size) {
      return { error: true };
    }

    return {
      position: x + '-' + y,
    };
  };

  const moveRoverBackward = () => {
    const moveVector = MOVE_BACKWARD[state.direction];

    const pos = state.position.split('-').map(Number);

    const x = pos[0] + moveVector[0];
    const y = pos[1] + moveVector[1];

    if (x < 0 || x >= props.size || y < 0 || y >= props.size) {
      return { error: true };
    }

    return {
      position: x + '-' + y,
    };
  };

  const turnRoverLeft = () => {
    return {
      direction: LEFT_TURNS_MAP[state.direction],
    };
  };

  const turnRoverRight = () => {
    return {
      direction: RIGHT_TURNS_MAP[state.direction],
    };
  };

  return (
    <ul
      className='mars'
      style={{ gridTemplateColumns: `1fr `.repeat(props.size) }}
    >
      {cells.map((cell) => {
        let rover = null;
        let roverGhost = null;
        let cellStatus = '';

        if (state.error && state.end === cell) {
          cellStatus = 'error';
        }

        if (state.start === cell) {
          cellStatus += ' start';
        }

        if (state.end === cell) {
          cellStatus += ' end';
        }

        if (state.position === cell) {
          rover = <Rover direction={state.direction} />;
        } else {
          roverGhost = state.path[cell] && (
            <Rover direction={state.path[cell]} ghost={true} />
          );
        }

        return (
          <li
            className={`cell ${state.path[cell] ? 'path' : ''} ${cellStatus}`}
            key={cell}
          >
            <label>{cell}</label>
            {rover ?? roverGhost}
          </li>
        );
      })}
    </ul>
  );
}

export default Mars;
