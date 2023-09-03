import RoverSVG from '../SVG/Rover.svg';

/**
 * The Rover component renders a SVG image of a rover with a specified direction
 * and optional ghost effect.
 * @param {RoverProps} props

- direction : the direction of the rover that will move
- ghost : determine if rover moved in the path or not

 */
function Rover(props: RoverProps) {
  return (
    <span className={`rover ${props.direction} ${props.ghost ? 'ghost' : ''} `}>
      <RoverSVG />
    </span>
  );
}

export default Rover;
