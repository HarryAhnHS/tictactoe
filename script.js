// Factory function to create grid and players of n x n (from 3 to 5)
function gameboard(n) {

    const grids = n*n; // Total num of grids for game
    
    var _gridArr = []; // 2D Array to hold game

    // Initialize grid as 2D array filled with 0
    function createGrids() {
        for (r = 0; r < grids; r+=n) {
            // Create inner array for each row
            var _colArr = [];
            for (c = r; c < r+n; c++) {
                _colArr.push(0);
            }
            // Add inner array into outer array
            _gridArr.push(_colArr);
        }
    };

    function setGrid(marker,r,c) {
        if (_gridArr[r][c] == 0) {
            _gridArr[r][c] = marker;
        }
        else {
            console.log("Already filled.")
            return false;
        }
        return true;
    };

    function getGrid(r,c) {
        if (r >= 0 && r < n && c >= 0 && c < n) {
            return _gridArr[r][c];
        }
        else {
            return "Invalid Range";
        }
    }

    // Helper
    function displayGrids() {
        console.log(_gridArr);
    }

    // CHECK WINNERS(3x3~5x5) rows, cols, diag, tie
    // n = 3, grids = 9
    //   0 1 2
    // 0 ? ? ?
    // 1 ? ? ?
    // 2 ? ? ?

    // n = 4, grids = 16
    //   0 1 2 3
    // 0 ? ? ? ?
    // 1 ? ? ? ?
    // 2 ? ? ? ?
    // 3 ? ? ? ?

    // n = 5, grids = 25
    //   0 1 2 3 4
    // 0 ? ? ? ? ?
    // 1 ? ? ? ? ? 
    // 2 ? ? ? ? ? 
    // 3 ? ? ? ? ?
    // 4 ? ? ? ? ?

    // Check if there is winner, return -1, 0 (no result), or 1
    function checkColWinner() {
        for (r = 0; r < n; r++) {
            let cols = [];
            for (c = 0; c < n; c++) {
                cols.push(_gridArr[r][c]);
            }
            if (cols.every((val) => val == -1)) return -1;
            if (cols.every((val) => val == 1)) return 1;
        }

        return 0;
    }

    function checkRowWinner() {
        for (c = 0; c < n; c++) {
            let rows = [];
            for (r = 0; r < n; r++) {
                rows.push(_gridArr[r][c]);
            }
            if (rows.every((val) => val == -1)) return -1;
            if (rows.every((val) => val == 1)) return 1;
        }

        return 0;
    }

    function checkDiagWinnerTLBR() {
        let check = [];
        for (r = 0; r < n; r++) {
            check.push(_gridArr[r][r]);
        }
        if (check.every((val) => val == -1)) return -1;
        if (check.every((val) => val == 1)) return 1;

        return 0;
    }

    function checkDiagWinnerTRBL() {
        let check = [];
        for (r = 0; r < n; r++) {
            check.push(_gridArr[r][n-r-1]);
        }

        if (check.every((val) => val == -1)) return -1;
        if (check.every((val) => val == 1)) return 1;

        return 0;
    }

    function checkTie() {
        let check = [];
        for (r = 0; r < n; r++) {
            for (c = 0; c < n; c++) {
                check.push(_gridArr[r][c])
            }
        }

        // If every grid is filled and no winners
        if (check.every((val) => val != 0)) {
            if (!checkRowWinner() && !checkColWinner() && !checkDiagWinnerTLBR() && !checkDiagWinnerTRBL()) {
                return true;
            }
        }

        return false;
    }

    return {grids,
            createGrids, 
            setGrid, 
            getGrid, 
            displayGrids, 
            checkColWinner, 
            checkRowWinner, 
            checkDiagWinnerTLBR, 
            checkDiagWinnerTRBL,
            checkTie};    
};

// Factory Function to create Player object
function player(marker) {
    var _marker = marker;
    function getMarker() {
        return _marker;
    }
    function setMarker() {
        _marker = marker;
    }
    return {getMarker, setMarker};
};

// Game controller module
const gameRunner = (() => {
        
    const _player1 = player(-1);
    const _player2 = player(1);

    const getPlayer1 = () => _player1;
    const getPlayer2 = () => _player2;

    var _game = null; 

    function initGame(n) {
        // Take n input and create grids
        _game = gameboard(n);
        _game.createGrids();
    };


    function logGame() {
        _game.displayGrids();
    }


    function checkResult() {
        // Check for winner/tie, return false otherwise
        if (_game.checkColWinner()) return _game.checkColWinner();
        if (_game.checkRowWinner()) return _game.checkRowWinner(); 
        if (_game.checkDiagWinnerTLBR()) return _game.checkDiagWinnerTLBR();
        if (_game.checkDiagWinnerTRBL()) return _game.checkDiagWinnerTRBL();
        if (_game.checkTie()) return 2;

        return 0;
    }

    // Each round of play 
    function stepPlayer1(r,c) {
        if (!checkResult()) {
            _game.setGrid(_player1.getMarker,r,c);
        }
    }

    function stepPlayer2(r,c) {
        if (!checkResult()) {
            _game.setGrid(_player2.getMarker,r,c);
        }
    }

    return {
            getPlayer1,
            getPlayer2,
            initGame,
            logGame,
            checkResult,
            stepPlayer1,
            stepPlayer2,
            };
})();


// Main exec module
const displayGame = (() => {
    // Take input for n
    // Create GameRunner instance with n row

    // Defaults
    let _n = 3; // Number of rows/columns 
    let _m = 0; // Game Mode - 0 (pvp), 1 (easy), 2 (medium), 3 (hard), 4 (impossible), 5(random)

    // Prepare game
    const prepGame = (() => {
        gameRunner.initGame(_n);
        setGrids();
    })();

    // Display n by n grid 
    function setGrids() {
        let gameboard = document.querySelector(".gameboard");
        gameboard.innerHTML = ""; // Clear existing
        for (i = 0; i < _n*_n; i++) {
            const gridUnit = document.createElement('div');
            gridUnit.classList.add('grid-unit');
    
            gridUnit.style.width = `${100/_n}%`;
            gridUnit.style.height = `${100/_n}%`;
            gridUnit.style.flex = 'auto';
            gridUnit.style['background-color'] = 'white';
            gridUnit.style['outline'] = '1px solid black';
    
            gameboard.appendChild(gridUnit);
        };
    };


    // HANDLING INPUT CHANGES IN GRID SIZE AND MODE

    // Set number of rows/columns based on input
    const setN = (() => {
        const range = document.querySelector("#num-grids");
        range.value = 3; // Set default size
        
        const rangeFeedback = document.querySelector("#num-grids-feedback");
        rangeFeedback.textContent = "3 X 3" // Set default
    
        range.addEventListener('input', (e) => {
            rangeFeedback.textContent = `${e.target.value} X ${e.target.value}`;
            _n = e.target.value;
            setGrids();
        })
    })();

    // Set gamemode based on input
    const setMode = (() => {
        const mode = document.querySelector("#game-mode");
        mode.addEventListener('change', (e) => {
            _m = e.target.value;
        });
    })();









    // Take input for 1v1 or against AI or against Random

    return {
            setGrids,
            setN,
            setMode,

            }

})();



