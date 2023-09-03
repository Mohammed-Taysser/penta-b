/// <reference types="vite/client" />

interface RoverProps {
  ghost?: boolean;
  direction: string;
}

type Position = [number, number, Direction];

type Command = 'F' | 'D' | 'R' | 'L';

type Direction = 'NORTH' | 'EAST' | 'WEST' | 'SOUTH';

type Vector = { [key in Direction]: number[] };

interface MarsProps {
  size: number;
  position: Position;
  commands: string;
  start: boolean;
  reset: boolean;
  onDone: () => void;
}

interface MarsInitState {
  start: string;
  end: string;
  position: string;
  direction: Direction;
  path: { [key: string]: string };
  error: boolean;
  commandIndex: number;
}
