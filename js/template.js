function loadTemplate() {
    const game = document.getElementById('game');
    game.innerHTML = `
        <h1><img src="img/11_logo/header.png" alt="El-Pollo-Loco-Logo"></h1>
        <div>
            <div id="content" class="content-container">
                <div class="starting-screen" id="startScreen">
                    <img src="img/startscreen/startscreen.png" alt="StartScreen">
                    <button class="start-button" onclick="startGame()">Start</button>
                </div>
                <div id="gameOverScreen" class="d-none">
                    <img src="img/9_intro_outro_screens/game_over/game-over.png" alt="GameOverScreen">
                    <button class="restart-button" onclick="restartGame()">Neustart</button>
                </div>
            </div>
            <div>
                <canvas id="canvas" width="720" height="480"></canvas>
            </div>
        </div>
    `;
}
