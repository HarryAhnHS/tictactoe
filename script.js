// Factory function to create grid of n x n (from 3 to 5)
const gameboard = ((n) => {
    const _grids = n*n; // Total num of grids for game
    
    var _gridArr = []; // 2D Array to hold game

    // Initialize grid as 2D array filled with 0
    function createGrids() {
        for (r = 0; r < _grids; r+=n) {
            // Create inner array for each row
            var _colArr = [];
            for (c = r; c < r+n; c++) {
                _colArr.push(0);
            }
            // Add inner array into outer array
            _gridArr.push(_colArr);
        }

    };

    function fillGrid(player,r,c) {
        if (_gridArr[r][c] == 0) {
            _gridArr[r][c] = player;
        }
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
    // n = 3, _grids = 9
    //   0 1 2
    // 0 ? ? ?
    // 1 ? ? ?
    // 2 ? ? ?

    // n = 4, _grids = 16
    //   0 1 2 3
    // 0 ? ? ? ?
    // 1 ? ? ? ?
    // 2 ? ? ? ?
    // 3 ? ? ? ?

    // n = 5, _grids = 25
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

    return {_grids, createGrids, fillGrid, getGrid, clearGrids, displayGrids, checkColWinner, checkRowWinner, checkDiagWinnerTLBR, checkDiagWinnerTRBL};    
});

const game = gameboard(3);

game.createGrids();
game.displayGrids();


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

