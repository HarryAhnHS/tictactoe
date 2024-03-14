// Player object
const player = (marker) => {
    var _marker = marker;
    function getMarker() {
        return _marker;
    }
    function setMarker() {
        _marker = marker;
    }
    return {getMarker, setMarker};
};

// Factory function to create grid and players of n x n (from 3 to 5)
const gameboard = ((n) => {

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

    function clearGrids() {
        for (r = 0; r < n; r++) {
            for (c = 0; c < n; c++) {
                _gridArr[r][c] = 0;
            }
        }
    };

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
            clearGrids, 
            displayGrids, 
            checkColWinner, 
            checkRowWinner, 
            checkDiagWinnerTLBR, 
            checkDiagWinnerTRBL,
            checkTie};    
});

// Game controller
const gameRunner = (n) => {
        
    const _player1 = player(-1);
    const _player2 = player(1);
    const _playerAI = player(1);

    const getPlayer1 = () => _player1;
    const getPlayer2 = () => _player2;
    const getPlayerAI = () => _playerAI;

    const game = gameboard(n);
    
    // Initialize gameboard with n*n grids
    function initGame() {
        game.createGrids();
    }

    // Restart game
    function restart() {
        game.clearGrids();
    }

    function checkResult() {
        // Check for winner/tie
        if (game.checkColWinner()) return game.checkColWinner();
        if (game.checkRowWinner()) return game.checkRowWinner(); 
        if (game.checkDiagWinnerTLBR()) return game.checkDiagWinnerTLBR();
        if (game.checkDiagWinnerTRBL()) return game.checkDiagWinnerTRBL();
        if (game.checkTie()) return 2;

        return 0;
    }

    // Each round of play 
    function stepPlayer1(r,c) {
    
    



        

    }





    


};