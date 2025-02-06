function loadTemplate() {
    const game = document.getElementById('game');
    game.innerHTML = `
        <h1><img src="img/11_logo/header.png" alt="El-Pollo-Loco-Logo"></h1>
        
        
        <div class="overlay">
            <img class="fullscreen-button" id="soundToggle" onclick="toggleSound()" src="./img/icons/sound.png" alt="Sound Button">
            <img class="fullscreen-button" id="FULLSCREEN" onclick="openFullscreen(document.getElementById('canvas'))" src="./img/icons/fullscreen.png" alt="Fullscreen Button">
        </div>
        
        <div>
        <div class="overlay">
            <img class="fullscreen-button" id="soundToggle" onclick="toggleSound()" src="./img/icons/sound.png" alt="Sound Button">
            <img class="fullscreen-button" id="FULLSCREEN" onclick="openFullscreen(document.getElementById('canvas'))" src="./img/icons/fullscreen.png" alt="Fullscreen Button">
        </div>
            <div id="content" class="content-container">
                <div class="starting-screen" id="startScreen">
                    <img src="img/startscreen/startscreen.png" alt="StartScreen">
                    <button class="start-button" onclick="startGame()">Start</button>
                </div>
                <div id="gameOverScreen" class="d-none">
                    <img src="img/9_intro_outro_screens/game_over/game-over.png" alt="GameOverScreen">
                    <button class="restart-button" onclick="restartGame()">Neustart</button>
                </div>
                <div id="gameWinScreen" class="d-none">
                    <img src="img/9_intro_outro_screens/win/won_2.png" alt="GameWinScreen">
                    <button class="restart-button" onclick="restartGame()">Neustart</button>
                </div>
            </div>
            <div>
                <canvas id="canvas" width="720" height="480"></canvas>
                
            </div>

            <div class="layout">
                <div class="left">
                    <div>
                        <img src="/img/icons/moveLeft.png" alt="move-left btn" >
                        <b>Move Left</b>
                    </div>
                    <div>
                        <img src="/img/icons/moveRight.png" alt="move-right btn" >
                        <b>Move Right</b>
                    </div>
                </div>
                <div class="right">
                    <div>
                        <img src="/img/icons/jump.png" alt="jump btn" >
                        <b>Jump</b>
                    </div>
                    <div>
                        <img src="/img/icons/space.png" alt="space btn">
                        <b>Throw bottle</b>
                    </div>
                </div>
            </div>
        </div>
    `;
}
