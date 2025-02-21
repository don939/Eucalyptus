document.getElementById('plant-seed').addEventListener('click', function() {
    const plantName = document.getElementById('plant-name').value;
    const plantContainer = document.createElement('div');
    plantContainer.className = 'bg-green-100 p-4 rounded-lg mb-4';
    let growthStage = 1;
    let health = 100;

    plantContainer.innerHTML = `
        <h3 class="text-lg font-semibold mb-2">${plantName}</h3>
        <p>Growth Stage: <span class="growth-stage">${growthStage}</span></p>
        <p>Health: <span class="health">${health}%</span></p>
        <div class="mt-2">
            <button class="bg-white border px-4 py-2 rounded mr-2 water-btn"><i class="fas fa-tint"></i> Water</button>
            <button class="bg-white border px-4 py-2 rounded fertilize-btn"><i class="fas fa-seedling"></i> Fertilize</button>
            <button class="bg-red-500 text-white px-4 py-2 rounded remove-plant">Remove</button>
        </div>
    `;
    document.getElementById('plants-container').appendChild(plantContainer);

    const waterBtn = plantContainer.querySelector('.water-btn');
    const fertilizeBtn = plantContainer.querySelector('.fertilize-btn');
    const removeBtn = plantContainer.querySelector('.remove-plant');
    const growthText = plantContainer.querySelector('.growth-stage');
    const healthText = plantContainer.querySelector('.health');

    waterBtn.addEventListener('click', function() {
        health = Math.min(health + 10, 100);
        healthText.textContent = health + '%';
        update3DPlant();
    });

    fertilizeBtn.addEventListener('click', function() {
        if (health > 50) {
            growthStage += 1;
            growthText.textContent = growthStage;
            update3DPlant();
        }
    });

    removeBtn.addEventListener('click', function() {
        plantContainer.remove();
        document.getElementById('view-section').innerHTML = '<p>Select a plant to view</p>';
    });

    plantContainer.addEventListener('click', function() {
        show3DPlant(growthStage, health);
    });
});

function show3DPlant(growthStage = 1, health = 100) {
    const viewSection = document.getElementById('view-section');
    viewSection.innerHTML = '';
    const canvas = document.createElement('canvas');
    viewSection.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, viewSection.clientWidth / viewSection.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas });
    renderer.setSize(viewSection.clientWidth, viewSection.clientHeight);

    const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.2, growthStage, 10);
    const trunkMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    scene.add(trunk);

    const leavesGeometry = new THREE.SphereGeometry(0.5 + (growthStage * 0.2), 16, 16);
    const leavesMaterial = new THREE.MeshBasicMaterial({ color: health > 50 ? 0x228B22 : 0xA9A9A9 });
    const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
    leaves.position.y = growthStage / 2 + 0.5;
    scene.add(leaves);

    camera.position.z = 5;

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();
}

function update3DPlant() {
    show3DPlant();
}
