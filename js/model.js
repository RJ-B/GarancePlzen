document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        // Funkce pro načtení modelu do určitého kontejneru
        function loadModel(containerId, objPath, mtlPath, cameraPosition, lookAtPosition) {
            const modelContainer = document.getElementById(containerId);
            if (!modelContainer) {
                return;
            }

            // Nastavení scény
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

            // Zajištění velikosti kontejneru
            modelContainer.style.width = "100%";
            modelContainer.style.height = "300px";

            const width = modelContainer.clientWidth;
            const height = modelContainer.clientHeight;

            renderer.setSize(width, height);
            modelContainer.appendChild(renderer.domElement);

            // Osvětlení (lepší viditelnost modelu)
            const light = new THREE.AmbientLight(0xffffff, 1);
            const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
            directionalLight.position.set(0, 20, 30);
            scene.add(light);
            scene.add(directionalLight);

            // Načtení materiálů, pokud existuje .MTL soubor
            const mtlLoader = new THREE.MTLLoader();
            mtlLoader.load(mtlPath, function (materials) {
                materials.preload();

                // Načtení modelu OBJ
                const objLoader = new THREE.OBJLoader();
                objLoader.setMaterials(materials);
                objLoader.load(objPath, function (object) {
                    // Přidání modelu přímo do scény (bez pivotu)
                    scene.add(object);

                    // Nastavení kamery - posuneme ji dál
                    camera.position.set(...cameraPosition);

                    // Nastavení pozice pozorovatele (kam bude kamera směřovat)
                    const lookAtVector = new THREE.Vector3(...lookAtPosition);
                    camera.lookAt(lookAtVector);

                    // Animace modelu (otočení)
                    function animate() {
                        requestAnimationFrame(animate);
                        object.rotation.y += 0.01; // Pomalá rotace kolem středu
                        renderer.render(scene, camera);
                    }
                    animate();
                });
            });

            // Funkce pro přizpůsobení velikosti rendereru kontejneru
            function resizeRenderer() {
                const width = modelContainer.clientWidth;
                const height = modelContainer.clientHeight;

                renderer.setSize(width, height);
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
            }

            // Přizpůsobení velikosti při změně okna
            window.addEventListener('resize', resizeRenderer);
        }

        // Načtení prvního modelu (haly)
        loadModel(
            "model-container-1",
            "img/models/warehouse/warehouse.obj",
            "img/models/warehouse/warehouse.mtl",
            [0, 13, 46],  // Pozice kamery
            [0, 2, 0]     // Pozice, kam se kamera dívá
        );

        // Načtení druhého modelu (bytový dům)
        loadModel(
            "model-container-2",
            "img/models/bytovy_dum/building.obj",
            "img/models/bytovy_dum/building.mtl",
            [0, 4, 5],   // Pozice kamery
            [0, 1.5, 0]    // Pozice, kam se kamera dívá
        );

        // Načtení prvního modelu (Rodinné domy)
        loadModel(
            "model-container-3",
            "img/models/rodinny_dum/house.obj",
            "img/models/rodinny_dum/house.mtl",
            [0, 10, 22],  // Pozice kamery
            [0, 2, 0]     // Pozice, kam se kamera dívá
        );

    }, 1000); // Počkám 500 ms na vykreslení HTML
});
