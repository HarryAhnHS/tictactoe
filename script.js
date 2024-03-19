// Factory function to create grid and players of n x n (from 3 to 5)
function gameboard(n) {

    const grids = n*n; // Total num of grids for game
    
    var _gridArr = []; // 2D Array to hold game

    // Getter function for n
    function getN() {
        return n;
    }

    //Initialize grid as 2D array filled with ""
    function createGrids() {
        _gridArr = []; // Initialize as empty 
        
        for (let r = 0; r < parseInt(grids); r+=parseInt(n)) {
            // Create inner array for each row
            var _colArr = [];
            for (let c = r; c < r+parseInt(n); c++) {
                _colArr.push("");
                // console.log(`r = ${r} | c = ${c}`)
            }
            
            // Add inner array into outer array
            _gridArr.push(_colArr);
            // console.log(`pushed ${_colArr} into ${_gridArr}`)
        }
    };

    /**
     * Set grid with marker to 2D indices [r,c]
     * @param {string} marker - marker for player
     * @param {int} r -2D row index
     * @param {int} c -2D column index
     */
    function setGrid(marker,r,c) {
        _gridArr[r][c] = marker;
    };

    /**
     * Get contents of grid with marker to 2D indices [r,c] 
     * @param {int} r -2D row index
     * @param {int} c -2D column index
     * Marker - """ (not filled), 'X', 'O'
     */
    function getGrid(r,c) {
        if (r >= 0 && r < n && c >= 0 && c < n) {
            return _gridArr[r][c];
        }
        else {
            return "Invalid Range";
        }
    }

    function logGridArr() {
        console.log(_gridArr);
    };

    function getGridArr() {
        return _gridArr;
    };

    /* CHECK WINNERS(3x3~5x5) rows, cols, diag, tie
    n = 3, grids = 9
      0 1 2
    0 ? ? ?
    1 ? ? ?
    2 ? ? ?

    n = 4, grids = 16
      0 1 2 3
    0 ? ? ? ?
    1 ? ? ? ?
    2 ? ? ? ?
    3 ? ? ? ?

    n = 5, grids = 25
      0 1 2 3 4
    0 ? ? ? ? ?
    1 ? ? ? ? ? 
    2 ? ? ? ? ? 
    3 ? ? ? ? ?
    4 ? ? ? ? ?
    */

    // Check if there is winner, return 'X, 0 (no result), or 'O
    function checkColWinner() {
        for (r = 0; r < n; r++) {
            let cols = [];
            for (c = 0; c < n; c++) {
                cols.push(_gridArr[r][c]);
            }
            if (cols.every((val) => val == 'X')) return 'X';
            if (cols.every((val) => val == 'O')) return 'O';
        }

        return 0;
    }
    function checkRowWinner() {
        for (c = 0; c < n; c++) {
            let rows = [];
            for (r = 0; r < n; r++) {
                rows.push(_gridArr[r][c]);
            }
            if (rows.every((val) => val =='X')) return 'X';
            if (rows.every((val) => val == 'O')) return 'O';
        }

        return 0;
    }

    function checkDiagWinnerTLBR() {
        let check = [];
        for (r = 0; r < n; r++) {
            check.push(_gridArr[r][r]);
        }
        if (check.every((val) => val == 'X')) return 'X';
        if (check.every((val) => val == 'O')) return 'O';

        return 0;
    }

    function checkDiagWinnerTRBL() {
        let check = [];
        for (r = 0; r < n; r++) {
            check.push(_gridArr[r][n-r-1]);
        }

        if (check.every((val) => val == 'X')) return 'X';
        if (check.every((val) => val == 'O')) return 'O';

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
            getN,
            createGrids, 
            setGrid, 
            getGrid, 
            getGridArr,
            logGridArr,
            checkColWinner, 
            checkRowWinner, 
            checkDiagWinnerTLBR, 
            checkDiagWinnerTRBL,
            checkTie};    
};

// Factory Function to create Player object
function player(marker) {
    var _marker = marker;
    var _active = false;
    function getMarker() {
        return _marker;
    }
    function setMarker() {
        _marker = marker;
    }
    function getActive() {
        return _active;
    }
    function setActive(bool) {
        _active = bool;
    }
    return {getMarker, setMarker, getActive, setActive};
};

// Game controller module
const gameRunner = (() => {
        
    const _player1 = player('X');
    const _player2 = player('O');
    
    // Boolean defaults for active, player1 always starts
    _player1.setActive(true);
    _player2.setActive(false);

    function getActivePlayer() {
        if (getPlayer1().getActive() && !getPlayer2().getActive()) return getPlayer1();
        if (getPlayer2().getActive() && !getPlayer1().getActive()) return getPlayer2();
    }

    function getPlayer1() { return _player1 };
    function getPlayer2() { return _player2 };

    var _game = null;
    var _n = null; 

    function getGameboard() {return _game};

    // Create gameboard object with _gamearr, set default player active states ('X' active, 'O' )
    function initGame(n) {
        // Take n input and create grids
        _game = gameboard(n);
        _game.createGrids();
        _n = _game.getN();

        // Return default active state - player1 always starts
        _player1.setActive(true);
        _player2.setActive(false);
    };

    function logGame() {
        _game.logGridArr();
    }


    // Run through gameboard and check for final result
    // If outcome exists, return winner's marker or 2 for tie.
    // If no outcome exists and game should continue, return 0.
    function checkResult() {
        // Check for winner/tie, return false otherwise
        if (_game.checkColWinner()) return _game.checkColWinner();
        if (_game.checkRowWinner()) return _game.checkRowWinner(); 
        if (_game.checkDiagWinnerTLBR()) return _game.checkDiagWinnerTLBR();
        if (_game.checkDiagWinnerTRBL()) return _game.checkDiagWinnerTRBL();
        if (_game.checkTie()) return 2;

        return 0;
    }

    /**
     * Each round of play, update _game's _gameArr with player's marker at index r,c
     * @param {player} player - player object making current step 
     * @param {int} r - 2D row index
     * @param {int} c - 2D column index
     *  */ 
    function stepPlayer(player,r,c) {
        _game.setGrid(player.getMarker(),r,c);
    }

    /**
     * Minimax function to determine and step player - return [r,c] index of next move
     * @param {string} marker - marker for the AI Player to be maximizing player
     * @param {float} percentage - percentage of times the aimove will choose the minimax unbeatable option
     * ex) if percentage = 0.7, 70% will be minimax option choice and 30% will be random
     ** @param {int} n - number of rows/columns in gameboard
     
    */
    function aiStepIdx(marker, percentage) {

        if (Math.random() < percentage) { // Minimax option
            let bestScore = -Infinity;
            let bestMove; 
            
            for (let r = 0; r < _n; r++) {
                for (let c = 0; c < _n; c++) {
                    if (_game.getGrid(r,c) == "") {    
                        _game.setGrid(marker,r,c); // Temporarily set empty spot as marker
                        
                        let score = minimax(marker, 0, false); 
    
                        _game.setGrid("",r,c); // Undo move after minimax called
                        if (score > bestScore) {
                            bestScore = score;
                            bestMove = {r, c};
                        }
                    }
                }
            }
            console.log(bestMove);
            return bestMove;
        }
        else { // Randomized option
            // Empty available spots
            let empty = [];
            for (let r = 0; r < _n; r++) {
                for (let c = 0; c < _n; c++) {
                    if (_game.getGrid(r,c) == "") {
                        empty.push({r, c});
                    }
                }
            }

            console.log(`Randomized move`)

            return empty[Math.floor(Math.random()*empty.length)];
        }
    };

    /**
     * Minimax crux algorithm to determine score of each step in each depth
     * @param {string} marker - maximizing player's marker
     * @param {int} depth - depth of recursion tree
     * @param {bool} isMaximizing - true/false whether depth from call is maximizing's turn
     * 
     */
    function minimax(marker, depth, isMaximizing) {


        let other;
        if (marker == 'X') {
            other = 'O';
        }
        else if (marker == 'O') {
            other = 'X';
        }

        // Check result and return score (Base case scenario);
        if (checkResult()) {
            if (checkResult() == 2) {
                return 0; // Tie
            }
            else if (checkResult() == marker) {
                return 1;
            }
            else if (checkResult() == other) {
                return -1;
            }
        }



        // (Recursive case)
        if (isMaximizing) { // if maximizing player's turn
            let bestScore = -Infinity;
            
            for (let r = 0; r < _n; r++) {
                for (let c = 0; c < _n; c++) {
                    if (_game.getGrid(r,c) == "") {

                        _game.setGrid(marker,r,c); // Temporarily set empty spot as marker
                        
                        let score = minimax(marker, depth + 1, false); 
    
                        _game.setGrid("",r,c); // Undo move after minimax called
                        bestScore = Math.max(score, bestScore)
                    }
                }
            }
            return bestScore;       
        }
        else {
            // If minimizing player's turn
            let bestScore = Infinity;
            
            for (let r = 0; r < _n; r++) {
                for (let c = 0; c < _n; c++) {
                    if (_game.getGrid(r,c) == "") {

                        _game.setGrid(other,r,c); // Temporarily set empty spot as marker
                        
                        let score = minimax(marker, depth + 1, true); 
    
                        _game.setGrid("",r,c); // Undo move after minimax called
                        bestScore = Math.min(score, bestScore);
                    }
                }
            }
            return bestScore;  
        };
    };

    return {
            getActivePlayer,
            getPlayer1,
            getPlayer2,
            getGameboard,
            initGame,
            logGame,
            checkResult,
            stepPlayer,
            aiStepIdx,
            };
})();


// Main exec module
const displayGame = (() => {
    // Take input for n
    // Create GameRunner instance with n row

    // Defaults
    let _n = 3; // Number of rows/columns 
    let _m = -1; // Game Mode - -1 (pvp), 0 (random), 1 (easy), 2 (medium), 3 (hard), 4(impossible)

    // Main
    startGame(); 

    // Default state of Player 1 (active) and Player 2 (inactive) and run game logic (Restart)
    function startGame() {
        const headx = document.querySelector(".head-x");
        const heado = document.querySelector(".head-o");
        
        headx.classList.add("player-active");
        heado.classList.remove("player-active");

        gameRunner.initGame(_n); // Initialize game array and display
        displayGrids();
        let htmlgrids = document.querySelectorAll(".grid-unit");

        htmlgrids.forEach( (grid) => {
            grid.addEventListener('mouseover', (e) => {
                if (gameRunner.getGameboard().getGrid(convertIdxtoRC(grid.id).r,convertIdxtoRC(grid.id).c) == "") {
                    e.target.textContent = gameRunner.getActivePlayer().getMarker();
                    e.target.style['color'] = "#C0C0C0";
                }
            });
            grid.addEventListener('mouseout', (e) => {
                if (gameRunner.getGameboard().getGrid(convertIdxtoRC(grid.id).r,convertIdxtoRC(grid.id).c) == "") {                    
                    e.target.textContent = "";
                    e.target.style['color'] = "black";
                }
            });
            // Run game logic to each grid unit
            grid.addEventListener('click',(e) => {
                gridPressedGameLogic(e.target);
            });
        });
    };

    // Display n by n grid 
    function displayGrids() {
        let gameboard = document.querySelector(".gameboard");
        gameboard.innerHTML = ""; // Clear existing

        // Add n*n grids into container, assign each an id from 0 to n*n-1
        for (i = 0; i < _n*_n; i++) {
            const gridUnit = document.createElement('div');
            gridUnit.classList.add('grid-unit');
            gridUnit.id = i; // assign each an id from 0 to n*n-1
    
            gridUnit.style.width = `${100/_n}%`;
            gridUnit.style.height = `${100/_n}%`;
            gridUnit.style.flex = 'auto';
            gridUnit.style['outline'] = '3px solid black';
            
    
            gameboard.appendChild(gridUnit);
        };
    };
    

    /**
     * Main game logic function to be run on click of a grid depending on _m, and player active states
     * If grid already not selected, Set grid to clicked player's marker and update player active states,
     * If _m > -1, set AI to make next move depending on difficulty
     * @param {e} grid - event of grid clicked
     */
    function gridPressedGameLogic(grid) {

        const modal = document.querySelector(".result");
        const result = document.querySelector(".result-text");

        const headx = document.querySelector(".head-x");
        const heado = document.querySelector(".head-o");

        // console.log(gameRunner.getPlayer1().getActive());
        // console.log(gameRunner.getPlayer2().getActive());
        
        if (gameRunner.getPlayer1().getActive()) {
            // Player 1 ('X') is active, and grid is clicked
            if (gameRunner.getGameboard().getGrid(convertIdxtoRC(grid.id).r,convertIdxtoRC(grid.id).c) == "") {

                if (_m == -1) { // PvP Gamemode
                    gameRunner.stepPlayer(gameRunner.getPlayer1(),convertIdxtoRC(grid.id).r,convertIdxtoRC(grid.id).c);
                    grid.textContent = 'X';
                    grid.style['color'] = "black";
                    
                    gameRunner.getPlayer1().setActive(false);
                    gameRunner.getPlayer2().setActive(true);
                    headx.classList.remove("player-active");
                    heado.classList.add("player-active");
                }
                else if (_m > -1) { // Random AI with _m determining difficulty percentage
                    gameRunner.stepPlayer(gameRunner.getPlayer1(),convertIdxtoRC(grid.id).r,convertIdxtoRC(grid.id).c);
                    grid.textContent = 'X';
                    grid.style['color'] = "black";

                    let AIStep = gameRunner.aiStepIdx('O',_m * 0.25);

                    if (gameRunner.checkResult() == 0) {
                        gameRunner.stepPlayer(gameRunner.getPlayer2(),AIStep.r, AIStep.c);
                        displayGridStep('O',AIStep.r, AIStep.c);
                    }
                }   
            }
            else {
                console.log("Already filled. Choose different grid.")
            }
        }
        else if (gameRunner.getPlayer2().getActive()) {
            // Player 2 ('O') is active
            if (gameRunner.getGameboard().getGrid(convertIdxtoRC(grid.id).r,convertIdxtoRC(grid.id).c) == "") {

                if (_m == -1) { // PvP Gamemode
                    gameRunner.stepPlayer(gameRunner.getPlayer2(),convertIdxtoRC(grid.id).r,convertIdxtoRC(grid.id).c);
                    grid.textContent = 'O';
                    grid.style['color'] = "black";

                    gameRunner.getPlayer2().setActive(false);
                    gameRunner.getPlayer1().setActive(true);

                    heado.classList.remove("player-active");
                    headx.classList.add("player-active");
                }
                else if (_m > -1) { // Random AI with _m determining difficulty percentage
                    gameRunner.stepPlayer(gameRunner.getPlayer2(),convertIdxtoRC(grid.id).r,convertIdxtoRC(grid.id).c);
                    grid.textContent = 'O';
                    grid.style['color'] = "black";

                    let AIStep = gameRunner.aiStepIdx('X',_m * 0.25);

                    if (gameRunner.checkResult() == 0) {
                        gameRunner.stepPlayer(gameRunner.getPlayer1(),AIStep.r, AIStep.c);
                        displayGridStep('X',AIStep.r, AIStep.c);
                    }
                }   

            }
            else {
                console.log("Already filled. Choose different grid.")
            }
        }  
        gameRunner.logGame();
        

        // Check for winner after each step, if result exists pop modal and stop game until restarteds
        if (gameRunner.checkResult() != 0) {
            if (gameRunner.checkResult() == 2) {
                console.log("Tie");

                modal.showModal();
                modal.classList.add("result-displayed");
                result.textContent = "It's a tie!";
            }
            else {
                console.log(`${gameRunner.checkResult()} wins`);

                modal.showModal();
                modal.classList.add("result-displayed");
                result.textContent = `${gameRunner.checkResult()} wins`;
            }
        }
    };

    /**
     * Function to update grid display with appropriate marker if AI made automatic choice
     * @param {string} marker 
     * @param {int} r 
     * @param {int} c 
     */
    function displayGridStep(marker,r,c) {
        let i = parseInt(convertRCtoIdx(r,c));
        let grid = document.getElementById(i);
        grid.textContent = marker;
    }

    /**
     * Convert 1D index into 2D {r,c} indices object
     * @param {int} i - 1D index
     * @returns {object} 2D {r,c} index object 
     */
    function convertIdxtoRC(i) {
        return {r: Math.floor(i / _n), c: i % _n};
    }

    /**
     * Convert 2D {r,c} indices object to 1D array index i
     * @param {object} 2D {r,c} index object 
     * @returns {int} i - 1D index
     */
    function convertRCtoIdx(r,c) {
        return (r*_n + c);
    }

    // Module to run if restart button is clicked in game over modal
    const restartGame = (() => {
        const restart = document.querySelectorAll(".restart");
        
        restart.forEach( (btn) => {
            btn.addEventListener('click', ()=> {

                const modal = document.querySelector(".result");
                // Call the built-in 'close' method to close the modal
                modal.close();
                modal.classList.remove("result-displayed");
    
                startGame();
            })
        })
    })();

    // HANDLING INPUT CHANGES IN GRID SIZE AND MODE

    // Set gamemode based on input module
    const setMode = (() => {
        const headText = document.getElementById('head-text');
        const mode = document.querySelector("#game-mode");
        mode.addEventListener('change', (e) => {
            _m = parseInt(e.target.value); 
            // Reset Game            
            startGame();
            if (_m > -1) {
                headText.textContent = 'Choose your player';
            }
            else {
                headText.textContent = '';
            }
        });
    })();

    // Module tracking click of headx and heado
    // Allow ability to Switch player if vs. AI
    const changePlayer = (() => {
        
        const headx = document.querySelector(".head-x");
        const heado = document.querySelector(".head-o");
    
        // Switch from X to O
        heado.addEventListener('click', changeXtoO);

        function changeXtoO() {
            if (_m > -1) {
                startGame();
                
                console.log("head clicked running");
                // Run AI makes first move (X) based on _m 
                let AIStep = gameRunner.aiStepIdx('X',_m * 0.25);
                gameRunner.stepPlayer(gameRunner.getPlayer1(),AIStep.r, AIStep.c);
                displayGridStep('X',AIStep.r, AIStep.c);
    
                // Set O to be active player
                headx.classList.remove("player-active")
                heado.classList.add("player-active")
                gameRunner.getPlayer1().setActive(false);
                gameRunner.getPlayer2().setActive(true);
            }
        };

        // Switch from O to X
        headx.addEventListener('click', changeOtoX);

        function changeOtoX() {
            if (_m > -1) {
                // Set X to be Active Player (Restart to default)
                startGame();
                console.log("head clicked running");
            }
        };
    })();




    // Take input for 1v1 or against AI or against Random

    return {
            startGame,

            gridPressedGameLogic,
        
            displayGrids,
            displayGridStep,

            restartGame,
            
            convertIdxtoRC,
            convertRCtoIdx,
            setMode,
            changePlayer,
            
            };

})()