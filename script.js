let globe = document.getElementById('snowglobe');
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