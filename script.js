let globe = document.getElementById('snowglobe');
let penguin = document.getElementById('tux');
let house = document.getElementById('house');
let particles;
function calculateAcceleration(event) {
    const {x, y, z} = event.accelerationIncludingGravity;
    const accelerationMagnitude = Math.sqrt(x * x + y * y + z * z);
    return accelerationMagnitude;
}

function shakeItUp() {
    particles.play();
    globe.classList.add("shake")
    setTimeout(() => {globe.classList.remove("shake")}, 1100)
    house.classList.add("shake_house")
    setTimeout(() => {house.classList.remove("shake_house")}, 1100)
    penguin.classList.add("spin")
    setTimeout(() => {penguin.classList.remove("spin")}, 10000)
}

tsParticles.loadJSON('particles', 'particles.json')
.then(function () {
  // Select the particle container and pause the particles
  particles = tsParticles.domItem(0);
  particles.pause()

  // Add globe event listener
  globe.addEventListener('click', () => {
    shakeItUp()
  });
  house.addEventListener('click', () => {
    shakeItUp()
  });

  // Add gyro event listener
  window.addEventListener("devicemotion", (event) => {
    // Calculate the magnitude every time
    const acceleration = calculateAcceleration(event);

    // Compare the magnitude to threshold.
    if (acceleration > 23) {
      shakeItUp()
    }
  });
});