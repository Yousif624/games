<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>3D Shooter Game</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div id="ui-container">
        <div id="health-bar">
            <label>Health: <span id="health-value">100</span></label>
            <div id="health-progress"><div></div></div>
        </div>
        <div id="shield-bar">
            <label>Shield: <span id="shield-value">100</span></label>
            <div id="shield-progress"><div></div></div>
        </div>
        <div id="weapon-status">
            <label>Weapon: <span id="weapon-status-text">No Weapon</span></label>
        </div>
    </div>

    <!-- Include Three.js Library -->
    <script src="../games/libs/three.min.js"></script>

    <!-- Include other game scripts -->
    <script src="game.js"></script>
</body>
</html>
