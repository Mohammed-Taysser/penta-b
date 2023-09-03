const MOVE_FORWARD: Vector = {
  SOUTH: [0, -1],
  WEST: [-1, 0],
  NORTH: [0, 1],
  EAST: [1, 0],
};

const MOVE_BACKWARD: Vector = {
  SOUTH: [0, 1],
  WEST: [1, 0],
  NORTH: [0, -1],
  EAST: [-1, 0],
};

const LEFT_TURNS_MAP: { [key in Direction]: Direction } = {
  NORTH: 'WEST',
  WEST: 'SOUTH',
  SOUTH: 'EAST',
  EAST: 'NORTH',
};

const RIGHT_TURNS_MAP: { [key in Direction]: Direction } = {
  NORTH: 'EAST',
  EAST: 'SOUTH',
  SOUTH: 'WEST',
  WEST: 'NORTH',
};

export { LEFT_TURNS_MAP, MOVE_BACKWARD, MOVE_FORWARD, RIGHT_TURNS_MAP };
