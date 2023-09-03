# Mars Rover

[`demo`](https://mohammed-taysser.github.io/penta-b-rover-task)

## Problem Description

You are part of the team that explores Mars by sending remotely controlled vehicles to the surface of
the planet. Develop an API that translates the commands sent from earth to instructions that are
understood by the rover.

When the rover touches down on Mars, it is initialized with it's current coordinates and the direction
it is facing. These could be any coordinates, supplied as arguments `(x, y, direction)` e.g. `(4, 2, EAST)`.

## Feathers

- Modern and responsive layout
- Use minimal need for any custom CSS.
- Written in TypeScript with predictable static types.
- Lint using Eslint

## Approach

You should tackle this problem as you would any real world requirement that would be shipped as
part of a real product. You should showcase how you work and the way you decompose a problem
into smaller pieces.

## Task Parts

### Part I (Solved)

The rover is given a command string which contains multiple commands. This string must then be
broken into each individual command and that command then executed. The valid commands are:

- `F` -> Move forward on current heading
- `B` -> Move backwards on current heading
- `L` -> Rotate left by 90 degrees
- `R` -> Rotate right by 90 degrees

An example command might be `FLFFFRFLB`

- Once the full command string has been followed, the rover reports it's current coordinates and heading in the format `(6, 4) NORTH`
- As Mars is a globe, there is no 'Edge of the world' to fall off, so negative coordinates are valid.

### Part II

Previous missions have had to be aborted due to obstacles that caused damage to the rover. Given a
set of coordinates for all the known obstacles in the format:

`[[1,4], [3,5], [7,4]]`

When the rover would enter a coordinate with an obstacle, instead stop at the coordinate immediately before and report position,
heading and Stopped due to collision, e.g. `(3, 4) WEST STOPPED`

### Part III

Given the rover's current position and heading, plus the known obstacles, calculate a command
string for the rover that will safely move it to a given coordinate avoiding all obstacles.
