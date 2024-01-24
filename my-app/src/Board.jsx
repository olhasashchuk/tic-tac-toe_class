import { Component } from "react";
import { Button } from "./components/Button.jsx";
import { Square } from "./components/Square.jsx";

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
            winner: null,
        }
    }

    calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (const line of lines) {
            const [a, b, c] = line;
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    handleClick = (position) => {
        const { squares, winner, xIsNext } = this.state;
        if (squares[position] || winner) {
            return;
        } else {
            const newSquares = [...squares];
            newSquares[position] = xIsNext ? 'X' : 'O';
            const newWinner = this.calculateWinner(newSquares);
            this.setState( {
                squares: newSquares,
                xIsNext: !xIsNext,
                winner: newWinner,
            });
            localStorage.setItem('gameState', JSON.stringify({ squares: newSquares, winner: newWinner }));
        }
    }

    componentDidMount() {
        const gameState = localStorage.getItem('gameState');
        if (gameState !== null) {
            const { squares, winner } = JSON.parse(gameState);
            this.setState({
                squares,
                winner,
            });
        }
    }

    resetGame = () => {
        localStorage.removeItem('gameState');
        this.setState({
            squares: Array(9).fill(null),
            winner: null,
        })
    }
    renderSquare = (i) => {
        const { squares} = this.state;
        return <Square key={i} value={squares[i]} onClick={() => {
            this.handleClick(i)
        }}/>
    }

    render() {
        const { winner } = this.state;

        return (
            <div className="container board_container">
                <h1 className="text-white m-5">Tic-Tac-Toe Game</h1>
                <div>
                    <div className="flex">
                        {[0, 1, 2].map(this.renderSquare)}
                    </div>
                    <div className="flex">
                        {[3, 4, 5].map(this.renderSquare)}
                    </div>
                    <div className="flex">
                        {[6, 7, 8].map(this.renderSquare)}
                    </div>
                </div>
                <h2 className="text-white m-5">Winner is {winner} !</h2>
                <Button className="btn-success" onClick={this.resetGame}>Start New Game</Button>
            </div>
        )
    }
}
export default Board;






