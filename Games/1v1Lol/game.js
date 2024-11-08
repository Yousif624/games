// Game setup and Three.js scene initialization (camera, renderer, etc.)
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Player properties
let playerHealth = 100;
let playerShield = 100;
let hasWeapon = false;

// UI update functions
function updateHealthBar() {
    const healthValue = document.getElementById('health-value');
    const healthProgress = document.getElementById('health-progress').children[0];
    healthValue.textContent = playerHealth;
    healthProgress.style.width = `${playerHealth}%`;
}

function updateShieldBar() {
    const shieldValue = document.getElementById('shield-value');
    const shieldProgress = document.getElementById('shield-progress').children[0];
    shieldValue.textContent = playerShield;
    shieldProgress.style.width = `${playerShield}%`;
}

function updateWeaponStatus() {
    const weaponStatusText = document.getElementById('weapon-status-text');
    weaponStatusText.textContent = hasWeapon ? 'Weapon Equipped' : 'No Weapon';
}

// Create a basic floor and walls
let floor = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100),
    new THREE.MeshBasicMaterial({ color: 0x228B22 })
);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// Bot and pickup setup
let bots = [];
let pickups = [];
let weapons = [];

// Helper function to create a pickup
function createPickup(type, color, position) {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color });
    const pickup = new THREE.Mesh(geometry, material);
    pickup.type = type;
    pickup.position.copy(position);
    scene.add(pickup);
    pickups.push(pickup);
}

// Adding medkits, shields, and weapons
createPickup('medkit', 0x00ff00, new THREE.Vector3(10, 0.5, -10));
createPickup('shield', 0x0000ff, new THREE.Vector3(-15, 0.5, 20));
createWeapon(new THREE.Vector3(5, 0.5, -5));

// Weapon creation
function createWeapon(position) {
    const geometry = new THREE.BoxGeometry(1, 1, 2);
    const material = new THREE.MeshBasicMaterial({ color: 0xffa500 });
    const weapon = new THREE.Mesh(geometry, material);
    weapon.position.copy(position);
    scene.add(weapon);
    weapons.push(weapon);
}

// Call this function to update pickups when collected
function checkPlayerPickups() {
    pickups.forEach((pickup, index) => {
        const distance = pickup.position.distanceTo(camera.position);
        if (distance < 2) {
            if (pickup.type === 'medkit' && playerHealth < 100) {
                playerHealth = Math.min(playerHealth + 30, 100);
                scene.remove(pickup);
                pickups.splice(index, 1);
                updateHealthBar();
                console.log("Picked up medkit! Health:", playerHealth);
            } else if (pickup.type === 'shield' && playerShield < 100) {
                playerShield = Math.min(playerShield + 30, 100);
                scene.remove(pickup);
                pickups.splice(index, 1);
                updateShieldBar();
                console.log("Picked up shield! Shield:", playerShield);
            }
        }
    });

    weapons.forEach((weapon, index) => {
        const distance = weapon.position.distanceTo(camera.position);
        if (distance < 2 && !hasWeapon) {
            hasWeapon = true;
            scene.remove(weapon);
            weapons.splice(index, 1);
            updateWeaponStatus();
            console.log("Picked up a weapon!");
        }
    });
}

// Animate function with game loop
function animate() {
    requestAnimationFrame(animate);
    checkPlayerPickups();
    renderer.render(scene, camera);
}
animate();
