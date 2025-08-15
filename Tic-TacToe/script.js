const Game = {
    mode: null,       // 'friend' | 'computer'
    playerSymbol: null,
    computerSymbol: null,
    currentPlayer: "X",
    board: Array(9).fill(""),
    active: true,

    init() {
        this.cacheElements();
        this.bindEvents();
    },

    cacheElements() {
        this.menu = document.querySelector("#menu");
        this.gameArea = document.querySelector("#gameArea");
        this.modeBtns = document.querySelectorAll(".modeBtn");
        this.symbolBtns = document.querySelectorAll(".symbolBtn");
        this.startBtn = document.querySelector("#startGame");
        this.cells = document.querySelectorAll(".cell");
        this.titleHeader = document.querySelector("#titleHeader");
        this.xDisplay = document.querySelector("#xPlayerDisplay");
        this.oDisplay = document.querySelector("#oPlayerDisplay");
        this.restartBtn = document.querySelector("#restartBtn");
    },

    bindEvents() {
        this.modeBtns.forEach(btn =>
            btn.addEventListener("click", () => this.selectMode(btn))
        );
        this.symbolBtns.forEach(btn =>
            btn.addEventListener("click", () => this.selectSymbol(btn))
        );
        this.startBtn.addEventListener("click", () => this.startGame());
        this.cells.forEach(cell =>
            cell.addEventListener("click", e => this.handleMove(e))
        );
        this.restartBtn.addEventListener("click", () => this.reset());
    },

    selectMode(btn) {
        this.modeBtns.forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
        this.mode = btn.dataset.mode;
        this.checkStartReady();
    },

    selectSymbol(btn) {
        this.symbolBtns.forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
        this.playerSymbol = btn.dataset.symbol;
        this.computerSymbol = this.playerSymbol === "X" ? "O" : "X";
        this.checkStartReady();
    },

    checkStartReady() {
        this.startBtn.disabled = !(this.mode && this.playerSymbol);
    },

    startGame() {
        this.menu.style.display = "none";
        this.gameArea.style.display = "flex";
        this.reset();
        if (this.mode === "computer" && this.playerSymbol === "O") {
            this.computerMove();
        }
    },

    handleMove(e) {
        const index = e.target.dataset.index;
        if (!this.active || this.board[index] !== "") return;

        this.board[index] = this.currentPlayer;
        e.target.textContent = this.currentPlayer;

        if (this.checkWinner()) return;

        this.switchTurn();

        if (this.mode === "computer" && this.currentPlayer === this.computerSymbol) {
            setTimeout(() => this.computerMove(), 400);
        }
    },

    switchTurn() {
        this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
        this.updateTurnDisplay();
    },

    updateTurnDisplay() {
        this.titleHeader.textContent = `Turn: ${this.currentPlayer}`;
        this.xDisplay.classList.toggle("player-active", this.currentPlayer === "X");
        this.oDisplay.classList.toggle("player-active", this.currentPlayer === "O");
    },

    checkWinner() {
        const wins = [
            [0,1,2],[3,4,5],[6,7,8],
            [0,3,6],[1,4,7],[2,5,8],
            [0,4,8],[2,4,6]
        ];
        for (let [a, b, c] of wins) {
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                this.titleHeader.textContent = `${this.currentPlayer} Wins! 🎉`;
                this.active = false;
                return true;
            }
        }
        if (!this.board.includes("")) {
            this.titleHeader.textContent = "Draw! 🤝";
            this.active = false;
            return true;
        }
        return false;
    },

    computerMove() {
        let empty = this.board.map((v, i) => v === "" ? i : null).filter(v => v !== null);
        let choice = empty[Math.floor(Math.random() * empty.length)];
        this.board[choice] = this.computerSymbol;
        this.cells[choice].textContent = this.computerSymbol;

        if (!this.checkWinner()) {
            this.switchTurn();
        }
    },

    reset() {
        this.board.fill("");
        this.active = true;
        this.currentPlayer = "X";
        this.updateTurnDisplay();
        this.cells.forEach(cell => cell.textContent = "");
    }
};

Game.init();
