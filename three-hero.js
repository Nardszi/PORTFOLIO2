// three-hero.js - Hero background using Three.js
// Falls back to existing canvas (code rain) if WebGL not supported or prefers-reduced-motion

export function initHeroThree() {
  const canvas = document.getElementById('hero-three');
  if (!canvas) {
    console.warn('Hero three canvas not found');
    return;
  }

  // Check for prefers-reduced-motion
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) {
    // Hide WebGL canvas, let fallback (code rain) show
    canvas.style.display = 'none';
    return;
  }

  // Try to create WebGL2 context
  const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
  if (!gl) {
    console.warn('WebGL not supported, falling back to canvas rain');
    canvas.style.display = 'none';
    return;
  }

  // Import three.js from CDN (dynamic import)
  // We'll load three.js via a promise to avoid blocking initial render
  import('https://cdnjs.cloudflare.com/ajax/libs/threejs/r128/three.module.js')
    .then(({ default: THREE, OrbitControls }) => {
      // Scene setup
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x000000); // transparent background via alpha

      const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
      camera.position.set(0, 1.5, 3);

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // limit DPI for performance

      // Lights
      const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
      scene.add(hemi);
      const dir = new THREE.DirectionalLight(0xffffff, 1);
      dir.position.set(5, 10, 7);
      scene.add(dir);

      // Object: low‑poly torus knot (accent color)
      const geometry = new THREE.TorusKnotGeometry(0.6, 0.2, 64, 16);
      const material = new THREE.MeshStandardMaterial({
        color: 0xff6a00, // matches --accent
        metalness: 0.2,
        roughness: 0.4,
      });
      const torus = new THREE.Mesh(geometry, material);
      scene.add(torus);

      // Animation loop
      const clock = new THREE.Clock();
      function animate() {
        requestAnimationFrame(animate);
        const elapsed = clock.getElapsedTime();
        torus.rotation.y = elapsed * 0.2;
        torus.rotation.x = elapsed * 0.1;
        renderer.render(scene, camera);
      }
      animate();

      // Handle resize
      window.addEventListener('resize', () => {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      });

      // Ensure canvas is visible
      canvas.style.display = 'block';
    })
    .catch((err) => {
      console.error('Failed to load three.js', err);
      canvas.style.display = 'none';
    });
}