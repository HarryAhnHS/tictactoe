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
                _colArr.push(c);
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
    // 0 1 2
    // 3 4 5
    // 6 7 8

    // n = 4, _grids = 16
    // 0 1 2 3
    // 4 5 6 7
    // 8 9 10 11
    // 12 13 14 15

    // n = 5, _grids = 25
    // 0 1 2 3 4
    // 5 6 7 8 9
    // 10 11 12 13 14 
    // 15 16 17 18 19
    // 20 21 22 23 24

    // Check if there is winner in row, return -1, 0 (no result), 1
    // function checkRowWinner() {
    //     let winner = false;
    //     for (r = 0; r < n; r++) {
    //         for (c = r; r < _grids; r+=n) {
    //             if (_gridArr[])
            
    //         } 
    //     }

    // }

    return {_grids, createGrids, fillGrid, getGrid, clearGrids, displayGrids};    
});

const game = gameboard(5);

game.createGrids();
game.displayGrids();

// console.log(game.getGrid(4,4));
// console.log(game.getGrid(1,4));
// console.log(game.getGrid(0,1));
// console.log(game.getGrid(5,1));
// console.log(game.getGrid(6,6));


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

