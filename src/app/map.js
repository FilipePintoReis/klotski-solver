import React from "react";
import PropTypes from "prop-types";
import { Container } from "semantic-ui-react";
import { Stage, Layer, Rect, Line } from "react-konva";

const colors = [
  "green",
  "yellow",
  "blue",
  "orange",
  "purple",
  "gray",
  "aliceBlue",
  "azure",
  "aquamarine",
  "black",
  "bisque",
  "brown",
  "burlywood",
  "chocolate",
  "coral",
  "cornSilk"
];

const MULTIPLIER = 55;

class Map extends React.Component {
  constructor(props) {
    super(props);
    const { plays } = props;

    this.state = { board: plays[0], index: 0 };
  }

  componentDidMount = () => {
    // timeout loop
    this.timeout();
  };

  timeout = () => {
    const { plays } = this.props;
    const { index } = this.state;

    setTimeout(() => {
      if (index < plays.length) {
        this.setState({ board: plays[index], index: index + 1 });
        this.timeout();
      }
    }, 300);
  };

  renderGrid = board => {
    let grid = [];

    for (let i = 0; i < board.height + 1; i++) {
      grid.push(
        <Line
          key={`${i} columns `}
          x={0}
          y={i * MULTIPLIER}
          points={[0, 0, board.height * MULTIPLIER, 0]}
          stroke="black"
        />
      );
    }

    for (let j = 0; j <= board.width; j++) {
      grid.push(
        <Line
          key={`${j} lines `}
          x={j * MULTIPLIER}
          y={0}
          points={[0, board.width * MULTIPLIER + MULTIPLIER, 0, 0]}
          stroke="black"
        />
      );
    }

    return grid;
  };

  renderMap = board => {
    let element = [];

    board.pieces.forEach((piece, index) =>
      element.push(
        <Rect
          key={`${index}`}
          x={piece.x1 * MULTIPLIER}
          y={piece.y1 * MULTIPLIER}
          width={piece.height * MULTIPLIER}
          height={piece.width * MULTIPLIER}
          fill={colors[index]}
          shadowBlur={2}
        />
      )
    );

    return element;
  };

  render() {
    const { board } = this.state;

    return (
      <Container fluid style={{ padding: "2rem" }}>
        <Stage
          width={board.width * MULTIPLIER}
          height={board.height * MULTIPLIER}
        >
          <Layer>{this.renderGrid(board)}</Layer>
          <Layer>{this.renderMap(board)}</Layer>
        </Stage>
      </Container>
    );
  }
}

Map.propTypes = {
  plays: PropTypes.array.isRequired
};

export default Map;
