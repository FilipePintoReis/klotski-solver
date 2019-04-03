import React from "react";
import PropTypes from "prop-types";
import Klotski, {
  methods,
  createEasyBoard,
  createTestBoard,
  create21Board,
  createHardBoard
} from "@klotski/logic";
import {
  Container,
  Header,
  Menu,
  Grid,
  Segment,
  Button
} from "semantic-ui-react";
import ReactLoading from "react-loading";
import Map from "./map";

const maps = {
  easyMap: "easyMap",
  test: "test",
  easy21: "easy21",
  hard: "hard"
};

const style = {
  body: { padding: "2rem", backgroundColor: "#b2dbbf", minHeight: "800px" },
  header: {
    marginBottom: "5rem"
  },
  headerText: {
    color: "#247ba0"
  },
  menu: { borderColor: "#f3ffbd" },
  menuHeader: {
    backgroundColor: "#70c1b3",
    color: "black",
    fontSize: "1.2rem"
  },
  loadingContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
};

// klotski game
const game = new Klotski();

class App extends React.Component {
  state = {
    loading: false,
    method: null,
    map: null,
    solved: false
  };

  createGame = () => {
    this.setState({ game: game });
  };

  selectMethod = method => {
    const { solved, loading } = this.state;
    this.setState({ method: method });
  };

  selectMap = map => {
    const { solved, loading } = this.state;

    this.setState({ map: map });
  };

  runSearch = async () => {
    const { method, map } = this.state;

    // start loading function
    this.setState({ loading: true });

    let board = null;

    switch (map) {
      case maps.easyMap:
        board = createEasyBoard();
        break;
      case maps.test:
        board = createTestBoard();
        break;
      case maps.easy21:
        board = create21Board();
        break;
      case maps.hard:
        board = createHardBoard();
        break;
      default:
        break;
    }

    if (board === null) throw new Error("Map is null!");

    const solved = game.solve(board, method);

    this.setState({ loading: false, solved: solved });
  };

  render() {
    const { loading, method, map, solved } = this.state;

    if (game == null) return null;

    return (
      <Container fluid style={style.body}>
        <Container textAlign="center" style={style.header}>
          <Header as="h1" style={style.headerText}>
            Klotski
          </Header>
        </Container>

        <Grid columns={2}>
          <Grid.Column width={4}>
            <Menu vertical fluid style={style.menu}>
              <Menu.Item style={style.menuHeader}>Algorithms</Menu.Item>
              <Menu.Item
                active={method === methods.breadthFirst}
                onClick={() => this.selectMethod(methods.breadthFirst)}
              >
                Breadth First Search
              </Menu.Item>
              <Menu.Item
                active={method === methods.depthFirstSearch}
                onClick={() => this.selectMethod(methods.depthFirstSearch)}
              >
                Depth First Search
              </Menu.Item>
              <Menu.Item
                onClick={() => this.selectMethod(methods.iterativeDeepening)}
                active={method === methods.iterativeDeepening}
              >
                Iterative Search
              </Menu.Item>
              <Menu.Item
                onClick={() => this.selectMethod(methods.depthLimitedSearch)}
                active={method === methods.depthLimitedSearch}
              >
                Depth Limited Search
              </Menu.Item>
              <Menu.Item
                onClick={() => this.selectMethod(methods.greedySearch)}
                active={method === methods.greedySearch}
              >
                Greedy Search
              </Menu.Item>
              <Menu.Item
                onClick={() => this.selectMethod(methods.aStar)}
                active={method === methods.aStar}
              >
                A*
              </Menu.Item>
            </Menu>
          </Grid.Column>
          <Grid.Column width={12}>
            <Segment>
              <Menu>
                <Menu.Item style={style.menuHeader}>Maps</Menu.Item>
                <Menu.Item
                  active={map === maps.easyMap}
                  onClick={() => this.selectMap(maps.easyMap)}
                >
                  Easy
                </Menu.Item>
                <Menu.Item
                  active={map === maps.test}
                  onClick={() => this.selectMap(maps.test)}
                >
                  Map 1
                </Menu.Item>
                <Menu.Item
                  active={map === maps.easy21}
                  onClick={() => this.selectMap(maps.easy21)}
                >
                  Map 2
                </Menu.Item>
                <Menu.Item
                  active={map === maps.hard}
                  onClick={() => this.selectMap(maps.hard)}
                >
                  Map 3
                </Menu.Item>
              </Menu>

              {/* Run button */}
              {!solved ? (
                <Button
                  onClick={() => this.runSearch(method)}
                  disabled={method == null || map == null}
                >
                  ` Run Search
                </Button>
              ) : loading ? (
                <ReactLoading
                  width="10rem"
                  height="10rem"
                  color="red"
                  type="spin"
                />
              ) : (
                <Map plays={game.plays} />
              )}
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

App.propTypes = {
  game: PropTypes.func.isRequired
};

export default App;
