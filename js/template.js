function loadTemplate() {
    const game = document.getElementById('game');
    game.innerHTML = `
        <h1>
            <img src="img/11_logo/header.png" alt="El-Pollo-Loco-Logo">
        </h1>
        <div id="content">
            <div id="startScreen" class="starting-screen">
                <img src="img/startscreen/startscreen.png" alt="StartScreen">
                <button class="start-button" onclick="startGame()">START</button>
            </div>
            
            <div id="gameOverScreen" class="d-none">
                <img src="img/9_intro_outro_screens/game_over/game-over.png" alt="GameOverScreen">
                <button class="restart-button" onclick="restartGame()">Neustart</button>
            </div>
            
            <div id="gameWinScreen" class="d-none">
                <img src="img/9_intro_outro_screens/win/won_2.png" alt="GameWinScreen">
                <button class="restart-button" onclick="restartGame()">Neustart</button>
            </div>
            
            <canvas id="canvas" width="720" height="480"></canvas>
            
            <div id="impressumDialog" class="d-none impressum-dialog">
                <div class="impressum-content">
                    <img class="close-btn" src="./img/icons/x.png" alt="Close Button" onclick="closeImpressum()">
                    <h2>Impressum</h2>
                    <strong>
                        Anbieter<br>
                        Michael Schwittay<br>
                        Unnaer Straße 55<br>
                        59457 Werl<br>
                        E-Mail: m.schwittay96@web.de<br>
                    </strong>
                    <br>
                    <strong>
                        EU-Streitschlichtung<br>
                        Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit, 
                        die Sie unter https://ec.europa.eu/consumers/odr/ finden. 
                        Wir sind weder verpflichtet noch bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                    </strong>
                    <br>
                    <strong>
                        Urheberrechtshinweis<br>
                        Die auf unserer Internetseite vorhandenen Texte, Bilder, Fotos, Videos oder Grafiken 
                        unterliegen in der Regel dem Schutz des Urheberrechts. 
                        Jede unberechtigte Verwendung (insbesondere die Vervielfältigung, Bearbeitung oder Verbreitung) 
                        dieser urheberrechtlich geschützten Inhalte ist daher untersagt. 
                        Wenn Sie beabsichtigen, diese Inhalte oder Teile davon zu verwenden, kontaktieren Sie uns bitte im Voraus.
                    </strong>
                    <br>
                    <strong>
                        Bildquellen:<br>
                        Die verwendeten Icons stammen von Flaticon.<br>
                        Das Hintergrundbild wurde mit Künstlicher Intelligenz (AI) generiert.
                    </strong>
                </div>
            </div>
            
            <div class="overlay">
                <img class="fullscreen-button" id="impressum" onclick="openImpressum()" src="./img/icons/impressum.png" alt="impressum icon">
                <img class="fullscreen-button" id="soundToggle" onclick="toggleSound()" src="./img/icons/sound.png" alt="Sound Button">
                <img class="fullscreen-button" id="FULLSCREEN" onclick="openFullscreen(document.getElementById('canvas'))" src="./img/icons/fullscreen.png" alt="Fullscreen Button">
            </div>
            
            <div class="mobileBTN">
                <img class="mobile-btn" id="mobileBtnLeft" src="./img/icons/moveLeft.png" alt="">
                <img class="mobile-btn" id="mobileBtnRight" src="./img/icons/moveRight.png" alt="">
            </div>
            
            <div class="mobileBTN2">    
                <img class="mobile-btn" id="mobileBtnJump" src="./img/icons/jump.png" alt="">
                <img class="mobile-btn" id="mobileBtnBottle" src="./img/icons/bottle.png" alt="">
            </div>
            
            <div class="layout">
                <div class="left">
                    <div>
                        <img src="/img/icons/moveLeft1.png" alt="move-left btn">
                        <b>Move Left</b>
                    </div>
                    <div>
                        <img src="/img/icons/moveRight1.png" alt="move-right btn">
                        <b>Move Right</b>
                    </div>
                </div>
                
                <div class="right">
                    <div>
                        <img src="/img/icons/jump1.png" alt="jump btn">
                        <b>Jump</b>
                    </div>
                    <div>
                        <img src="/img/icons/space1.png" alt="space btn">
                        <b>Throw bottle</b>
                    </div>
                </div>
            </div>
        </div>
    `;
}
