class Game {
  #players;
  #isOver;
  #winner;

  constructor(players) {
    this.#players = players;
    this.#isOver = false;
    this.#winner = null;
  }

  consolidateMove(move) {
    if (!this.#players.validMove(move)) return;

    this.#players.recordMove(move);

    if (this.#players.hasWon()) {
      this.#isOver = true;
      this.#winner = this.#players.currentPlayerName;
      return;
    }

    if (this.#players.totalMovesMade() === 9) {
      this.#isOver = true;
      return;
    }

    this.#players.changeTurn();
  }

  status() {
    return {
      moves: this.#players.movesMade(),
      currentPlayerName: this.#players.currentPlayerName,
      winner: this.#winner,
      isOver: this.#isOver,
    };
  }
}

class Player {
  #name;
  #icon;
  #moves;

  constructor(name, icon) {
    this.#name = name;
    this.#icon = icon;
    this.#moves = new Set();
  }

  get name() {
    return this.#name;
  }

  get movesMade() {
    return [...this.#moves].map((move) => [move, this.#icon]);
  }

  updateMoves(playerMove) {
    this.#moves.add(playerMove);
  }
}

const WINNING_SEQUENCES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

class Players {
  #players;

  constructor(player1, player2) {
    this.#players = [player1, player2];
  }

  get currentPlayerName() {
    return this.#players[0].name;
  }

  changeTurn() {
    this.#players.reverse();
  }

  recordMove(move) {
    this.#players[0].updateMoves(move);
  }

  validMove(move) {
    const movesMadeSofar = this.#players
      .flatMap((player) => player.movesMade)
      .map(([move]) => move);

    return !movesMadeSofar.includes(move);
  }

  totalMovesMade() {
    return this.#players.flatMap((player) => player.movesMade).length;
  }

  movesMade() {
    return Object.fromEntries(
      this.#players.flatMap((player) => player.movesMade)
    );
  }

  hasWon() {
    const playerMoves = Object.fromEntries(this.#players[0].movesMade);

    return WINNING_SEQUENCES.some((sequence) => {
      return sequence.every((number) => number in playerMoves);
    });
  }
}

const keymap = {
  box1: 0,
  box2: 1,
  box3: 2,
  box4: 3,
  box5: 4,
  box6: 5,
  box7: 6,
  box8: 7,
  box9: 8,
};

const SYMBOLS = ['O', 'X'];

const getBoxId = (move) => `box${+move + 1}`;

const renderMoves = (moves) => {
  Object.entries(moves).forEach(([move, symbol]) => {
    const boxId = getBoxId(move);
    const box = document.getElementById(boxId);
    box.innerText = symbol;
  });
};

const getPlayerInfoContainer = () => document.querySelector('#current-player');

const displayResult = (winner) => {
  const msg = winner ? `${winner} Won!!` : `It's a Draw`;
  const playerInfoContainer = getPlayerInfoContainer();
  playerInfoContainer.innerText = msg;
};

const nextTurnOf = (player) => {
  const playerInfoContainer = getPlayerInfoContainer();
  playerInfoContainer.innerText = `${player}'s turn`;
};

const renderBoard = ({ moves, currentPlayerName, winner, isOver }) => {
  renderMoves(moves);

  if (isOver) {
    displayResult(winner);
    return;
  }

  nextTurnOf(currentPlayerName);
};

const clearPlayersMoves = () => {
  const allElements = document.querySelectorAll('.box, #current-player');
  Array.from(allElements).forEach((element) => {
    element.innerText = '';
  });
};

const askForNewGame = () => {
  setTimeout(() => {
    confirmation = confirm('Another Quick Game?');
    if (confirmation) playTicTacToe();
    clearPlayersMoves();
  }, 500);
};

const runGame = (game) => {
  const container = document.querySelector('#container');
  renderBoard(game.status());

  container.onclick = (e) => {
    const box = e.target;
    const move = keymap[box.id];

    game.consolidateMove(move);
    renderBoard(game.status());

    if (game.status().isOver) {
      askForNewGame();
      return;
    }
  };
};

const playTicTacToe = () => {
  const player1Name = prompt('Enter player 1 name: ') || 'Tom';
  const player2Name = prompt('Enter player 2 name: ') || 'Jerry';

  const player1 = new Player(player1Name, SYMBOLS[0]);
  const player2 = new Player(player2Name, SYMBOLS[1]);

  const players = new Players(player1, player2);

  const game = new Game(players);

  runGame(game);
};

window.onload = playTicTacToe;
