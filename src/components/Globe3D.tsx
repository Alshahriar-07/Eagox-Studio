import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { TELEMETRY_NODES } from '../data/projectsData';
import { TelemetryNode } from '../types';
import {
  Radio,
  RefreshCw,
  Zap,
  Shield,
  Activity,
  Plus,
  Minus,
  Navigation as NavigationIcon,
  Maximize2,
  Compass,
} from 'lucide-react';

interface Globe3DProps {
  onNodeSelect?: (node: TelemetryNode) => void;
  className?: string;
}

export const Globe3D: React.FC<Globe3DProps> = ({ onNodeSelect, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState<TelemetryNode>(TELEMETRY_NODES[0]);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [telemetryThroughput, setTelemetryThroughput] = useState<string>('4.82 Gbps');
  const [packetCount, setPacketCount] = useState<number>(142850);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [fps, setFps] = useState<number>(60);
  const targetRotationRef = useRef<{ x: number; y: number } | null>(null);

  // Lat/Lng to Vector3 on sphere
  const latLngToVector3 = (lat: number, lng: number, radius: number): THREE.Vector3 => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);
    return new THREE.Vector3(x, y, z);
  };

  // Helper to check if a lat/lng falls into realistic continental land bounds
  const isLandmass = (lat: number, lng: number): boolean => {
    // North America
    if (lat > 15 && lat < 72 && lng > -168 && lng < -52) return true;
    // South America
    if (lat > -56 && lat < 13 && lng > -82 && lng < -34) return true;
    // Europe
    if (lat > 35 && lat < 71 && lng > -10 && lng < 45) return true;
    // Africa
    if (lat > -35 && lat < 38 && lng > -18 && lng < 52) return true;
    // Asia (including Indian subcontinent & Bangladesh)
    if (lat > 5 && lat < 75 && lng > 45 && lng < 150) return true;
    // Australia
    if (lat > -44 && lat < -10 && lng > 112 && lng < 154) return true;
    // Japan / SE Asia Islands
    if (lat > -11 && lat < 28 && lng > 95 && lng < 145) return true;
    // Default oceanic matrix
    return false;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPacketCount((prev) => prev + Math.floor(Math.random() * 48 + 15));
      const speed = (4.6 + Math.random() * 0.75).toFixed(2);
      setTelemetryThroughput(`${speed} Gbps`);
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    let width = container.clientWidth || 540;
    let height = container.clientHeight || 480;

    // Three.js Scene Setup
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    // Camera positioned with standard field of view
    camera.position.set(0, 0, 235);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Main Globe Group - Shifted Up and to the Right
    const globeRadius = 70;
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Apply the requested UP-RIGHT shift:
    // x: +20 (Right), y: +14 (Up), z: 0
    const isMobile = width < 640;
    const offsetX = isMobile ? 8 : 22;
    const offsetY = isMobile ? 6 : 14;
    globeGroup.position.set(offsetX, offsetY, 0);

    // Initial orientation: Bangladesh facing camera with dynamic tilt
    globeGroup.rotation.y = 1.32;
    globeGroup.rotation.x = 0.32;

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x10b981, 2.0);
    dirLight1.position.set(120, 150, 180);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x06b6d4, 1.2);
    dirLight2.position.set(-150, -80, 100);
    scene.add(dirLight2);

    // 1. Base Core Sphere with Specular Sheen
    const sphereGeo = new THREE.SphereGeometry(globeRadius, 64, 64);
    const sphereMat = new THREE.MeshPhongMaterial({
      color: 0xfafafa,
      emissive: 0x0f172a,
      emissiveIntensity: 0.05,
      specular: 0x10b981,
      shininess: 35,
      transparent: true,
      opacity: 0.92,
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(sphereMesh);

    // 2. Atmospheric Outer Glow Shell (Fresnel Rim Aura)
    const glowGeo = new THREE.SphereGeometry(globeRadius * 1.15, 48, 48);
    const glowMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.2);
          gl_FragColor = vec4(0.06, 0.72, 0.51, 1.0) * intensity * 0.45;
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
    });
    const glowMesh = new THREE.Mesh(glowGeo, glowMat);
    globeGroup.add(glowMesh);

    // 3. Subtle Latitude & Longitude Coordinate Lines
    const gridGroup = new THREE.Group();
    globeGroup.add(gridGroup);

    // Parallels (Latitudes)
    const latAngles = [-60, -30, 0, 30, 60];
    latAngles.forEach((lat) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const ringRadius = globeRadius * Math.sin(phi);
      const ringY = globeRadius * Math.cos(phi);
      const ringGeo = new THREE.BufferGeometry();
      const segments = 90;
      const points: THREE.Vector3[] = [];
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(ringRadius * Math.cos(theta), ringY, ringRadius * Math.sin(theta)));
      }
      ringGeo.setFromPoints(points);
      const ringMat = new THREE.LineBasicMaterial({
        color: lat === 0 ? 0x10b981 : 0xe2e8f0,
        transparent: true,
        opacity: lat === 0 ? 0.45 : 0.25,
        linewidth: lat === 0 ? 1.5 : 1,
      });
      gridGroup.add(new THREE.Line(ringGeo, ringMat));
    });

    // Meridians (Longitudes)
    const lonAngles = [0, 45, 90, 135, 180, 225, 270, 315];
    lonAngles.forEach((lon) => {
      const ringGeo = new THREE.BufferGeometry();
      const segments = 90;
      const points: THREE.Vector3[] = [];
      for (let i = 0; i <= segments; i++) {
        const phi = (i / segments) * Math.PI * 2;
        const x = globeRadius * Math.sin(phi) * Math.cos((lon * Math.PI) / 180);
        const y = globeRadius * Math.cos(phi);
        const z = globeRadius * Math.sin(phi) * Math.sin((lon * Math.PI) / 180);
        points.push(new THREE.Vector3(x, y, z));
      }
      ringGeo.setFromPoints(points);
      const ringMat = new THREE.LineBasicMaterial({
        color: 0xe2e8f0,
        transparent: true,
        opacity: 0.22,
      });
      gridGroup.add(new THREE.Line(ringGeo, ringMat));
    });

    // 4. Ultra-Dense Continental Matrix Dots (3,800 points with landmass detection)
    const dotCount = 3600;
    const dotGeo = new THREE.BufferGeometry();
    const dotPositions = new Float32Array(dotCount * 3);
    const dotColors = new Float32Array(dotCount * 3);
    const dotSizes = new Float32Array(dotCount);

    for (let i = 0; i < dotCount; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / dotCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;

      const lat = 90 - (phi * 180) / Math.PI;
      const lng = ((theta * 180) / Math.PI) % 360 - 180;

      const isLand = isLandmass(lat, lng);
      const r = globeRadius * (isLand ? 1.002 : 0.998);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.cos(phi);
      const z = r * Math.sin(phi) * Math.sin(theta);

      dotPositions[i * 3] = x;
      dotPositions[i * 3 + 1] = y;
      dotPositions[i * 3 + 2] = z;

      if (isLand) {
        // Crisp Dark Slate & Emerald accent land dots
        const isHighlight = Math.random() > 0.85;
        if (isHighlight) {
          dotColors[i * 3] = 0.06;
          dotColors[i * 3 + 1] = 0.72;
          dotColors[i * 3 + 2] = 0.51;
        } else {
          dotColors[i * 3] = 0.12;
          dotColors[i * 3 + 1] = 0.14;
          dotColors[i * 3 + 2] = 0.2;
        }
        dotSizes[i] = 2.2;
      } else {
        // Oceanic faint matrix
        dotColors[i * 3] = 0.78;
        dotColors[i * 3 + 1] = 0.82;
        dotColors[i * 3 + 2] = 0.88;
        dotSizes[i] = 1.0;
      }
    }

    dotGeo.setAttribute('position', new THREE.BufferAttribute(dotPositions, 3));
    dotGeo.setAttribute('color', new THREE.BufferAttribute(dotColors, 3));

    const dotMat = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const dotPoints = new THREE.Points(dotGeo, dotMat);
    globeGroup.add(dotPoints);

    // 5. Dual Inclined Outer Orbital Telemetry Rings
    const orbitGroup = new THREE.Group();
    orbitGroup.rotation.x = Math.PI / 6;
    orbitGroup.rotation.z = Math.PI / 12;
    globeGroup.add(orbitGroup);

    // Orbital Ring 1
    const orbit1Geo = new THREE.RingGeometry(globeRadius * 1.32, globeRadius * 1.325, 96);
    const orbit1Mat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4,
    });
    const orbit1Mesh = new THREE.Mesh(orbit1Geo, orbit1Mat);
    orbitGroup.add(orbit1Mesh);

    // Orbital Ring 2 (Outer tilted dashed orbit)
    const orbit2Geo = new THREE.RingGeometry(globeRadius * 1.55, globeRadius * 1.554, 96);
    const orbit2Mat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25,
    });
    const orbit2Mesh = new THREE.Mesh(orbit2Geo, orbit2Mat);
    orbitGroup.add(orbit2Mesh);

    // Floating Orbital Constellation Particles
    const satelliteCount = 36;
    const satGeo = new THREE.BufferGeometry();
    const satPositions = new Float32Array(satelliteCount * 3);
    const satRadius = globeRadius * 1.32;

    for (let s = 0; s < satelliteCount; s++) {
      const angle = (s / satelliteCount) * Math.PI * 2;
      satPositions[s * 3] = satRadius * Math.cos(angle);
      satPositions[s * 3 + 1] = satRadius * Math.sin(angle);
      satPositions[s * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    satGeo.setAttribute('position', new THREE.BufferAttribute(satPositions, 3));
    const satMat = new THREE.PointsMaterial({
      color: 0x10b981,
      size: 3.2,
      transparent: true,
      opacity: 0.75,
    });
    const satPoints = new THREE.Points(satGeo, satMat);
    orbitGroup.add(satPoints);

    // 6. Bangladesh Primary Hub Node & Signal Beacon
    const bdCoords = TELEMETRY_NODES[0];
    const bdPos = latLngToVector3(bdCoords.lat, bdCoords.lng, globeRadius);

    // Bangladesh Core Glowing Marker
    const bdMarkerGeo = new THREE.SphereGeometry(2.8, 24, 24);
    const bdMarkerMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    const bdMarkerMesh = new THREE.Mesh(bdMarkerGeo, bdMarkerMat);
    bdMarkerMesh.position.copy(bdPos);
    globeGroup.add(bdMarkerMesh);

    // Bangladesh Holographic Light Pillar Beam
    const beamHeight = 22;
    const beamGeo = new THREE.CylinderGeometry(0.3, 1.2, beamHeight, 16);
    beamGeo.translate(0, beamHeight / 2, 0);
    const beamMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.75,
      side: THREE.DoubleSide,
    });
    const beamMesh = new THREE.Mesh(beamGeo, beamMat);
    beamMesh.position.copy(bdPos);
    beamMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), bdPos.clone().normalize());
    globeGroup.add(beamMesh);

    // Top Beacon Orb
    const beaconOrbGeo = new THREE.SphereGeometry(1.6, 16, 16);
    const beaconOrbMat = new THREE.MeshBasicMaterial({ color: 0x34d399 });
    const beaconOrbMesh = new THREE.Mesh(beaconOrbGeo, beaconOrbMat);
    beaconOrbMesh.position.copy(bdPos.clone().add(bdPos.clone().normalize().multiplyScalar(beamHeight)));
    globeGroup.add(beaconOrbMesh);

    // Triple Expanding Radar Waves from Dhaka
    const radarRings: { mesh: THREE.Mesh; mat: THREE.MeshBasicMaterial; phase: number }[] = [];
    for (let r = 0; r < 3; r++) {
      const rRingGeo = new THREE.RingGeometry(2.5, 3.8, 32);
      const rRingMat = new THREE.MeshBasicMaterial({
        color: 0x10b981,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8,
      });
      const rRingMesh = new THREE.Mesh(rRingGeo, rRingMat);
      rRingMesh.position.copy(bdPos.clone().multiplyScalar(1.02));
      rRingMesh.lookAt(bdPos.clone().multiplyScalar(2));
      globeGroup.add(rRingMesh);
      radarRings.push({ mesh: rRingMesh, mat: rRingMat, phase: r * 0.33 });
    }

    // 7. Global Nodes & High-Resolution Parabolic Arcs
    const arcsGroup = new THREE.Group();
    globeGroup.add(arcsGroup);

    const remoteNodes = TELEMETRY_NODES.slice(1);
    const curvePointsList: THREE.Vector3[][] = [];

    remoteNodes.forEach((node) => {
      const nodePos = latLngToVector3(node.lat, node.lng, globeRadius);

      // Node Marker Outer Halo
      const nodeRingGeo = new THREE.RingGeometry(1.6, 2.4, 24);
      const nodeRingMat = new THREE.MeshBasicMaterial({
        color: 0x0ea5e9,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7,
      });
      const nodeRingMesh = new THREE.Mesh(nodeRingGeo, nodeRingMat);
      nodeRingMesh.position.copy(nodePos.clone().multiplyScalar(1.01));
      nodeRingMesh.lookAt(nodePos.clone().multiplyScalar(2));
      globeGroup.add(nodeRingMesh);

      // Node Core Marker
      const nodeMarkerGeo = new THREE.SphereGeometry(1.6, 16, 16);
      const nodeMarkerMat = new THREE.MeshBasicMaterial({ color: 0x0284c7 });
      const nodeMesh = new THREE.Mesh(nodeMarkerGeo, nodeMarkerMat);
      nodeMesh.position.copy(nodePos);
      globeGroup.add(nodeMesh);

      // Parabolic Arc with Dynamic Peak Elevation
      const midPoint = new THREE.Vector3().addVectors(bdPos, nodePos).multiplyScalar(0.5);
      const distance = bdPos.distanceTo(nodePos);
      const altitude = globeRadius + distance * 0.42;
      midPoint.normalize().multiplyScalar(altitude);

      const curve = new THREE.QuadraticBezierCurve3(bdPos, midPoint, nodePos);
      const points = curve.getPoints(70);
      curvePointsList.push(points);

      // Arc Tube/Line Geometry
      const arcGeo = new THREE.BufferGeometry().setFromPoints(points);
      const arcMat = new THREE.LineBasicMaterial({
        color: 0x06b6d4,
        transparent: true,
        opacity: 0.5,
        linewidth: 2,
      });
      const arcLine = new THREE.Line(arcGeo, arcMat);
      arcsGroup.add(arcLine);
    });

    // 8. Traveling Data Photons & Comet Pulse Trails
    const packets: { mesh: THREE.Mesh; curveIndex: number; progress: number; speed: number }[] = [];
    const packetGeo = new THREE.SphereGeometry(1.5, 12, 12);
    const packetMat = new THREE.MeshBasicMaterial({ color: 0x34d399 });

    for (let i = 0; i < curvePointsList.length; i++) {
      for (let p = 0; p < 3; p++) {
        const pMesh = new THREE.Mesh(packetGeo, packetMat);
        globeGroup.add(pMesh);
        packets.push({
          mesh: pMesh,
          curveIndex: i,
          progress: (p * 0.33 + Math.random() * 0.15) % 1,
          speed: 0.006 + Math.random() * 0.005,
        });
      }
    }

    // Interactive Drag Controls with Damped Inertia Physics
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let velocity = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      velocity = { x: 0, y: 0 };
      targetRotationRef.current = null;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      velocity = { x: deltaX * 0.005, y: deltaY * 0.005 };

      globeGroup.rotation.y += velocity.x;
      globeGroup.rotation.x += velocity.y;
      globeGroup.rotation.x = Math.max(-0.85, Math.min(0.85, globeGroup.rotation.x));

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    // Touch Support with Inertia
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        velocity = { x: 0, y: 0 };
        targetRotationRef.current = null;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.y;

      velocity = { x: deltaX * 0.0065, y: deltaY * 0.0065 };

      globeGroup.rotation.y += velocity.x;
      globeGroup.rotation.x += velocity.y;
      globeGroup.rotation.x = Math.max(-0.85, Math.min(0.85, globeGroup.rotation.x));

      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    // Mouse Wheel Zoom
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomDelta = e.deltaY * 0.001;
      camera.position.z = Math.max(160, Math.min(320, camera.position.z + zoomDelta * 50));
      setZoomLevel(Number((235 / camera.position.z).toFixed(2)));
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    domElement.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);
    domElement.addEventListener('wheel', onWheel, { passive: false });

    // Resize Observer for Fluid Canvas
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newWidth = entry.contentRect.width || 540;
        const newHeight = entry.contentRect.height || 480;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);

        // Adjust position dynamically
        const isSm = newWidth < 640;
        globeGroup.position.set(isSm ? 8 : 22, isSm ? 6 : 14, 0);
      }
    });
    resizeObserver.observe(container);

    // Animation & Render Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();
    let frameCount = 0;
    let lastTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Measure FPS periodically
      frameCount++;
      const currentTime = performance.now();
      if (currentTime - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (currentTime - lastTime)));
        frameCount = 0;
        lastTime = currentTime;
      }

      // Smooth programmatic target rotation (when selecting a node from UI)
      if (targetRotationRef.current) {
        globeGroup.rotation.y += (targetRotationRef.current.y - globeGroup.rotation.y) * 0.06;
        globeGroup.rotation.x += (targetRotationRef.current.x - globeGroup.rotation.x) * 0.06;
        if (
          Math.abs(targetRotationRef.current.y - globeGroup.rotation.y) < 0.005 &&
          Math.abs(targetRotationRef.current.x - globeGroup.rotation.x) < 0.005
        ) {
          targetRotationRef.current = null;
        }
      } else if (!isDragging) {
        // Apply inertia decay
        if (Math.abs(velocity.x) > 0.0001 || Math.abs(velocity.y) > 0.0001) {
          globeGroup.rotation.y += velocity.x;
          globeGroup.rotation.x += velocity.y;
          globeGroup.rotation.x = Math.max(-0.85, Math.min(0.85, globeGroup.rotation.x));
          velocity.x *= 0.94;
          velocity.y *= 0.94;
        } else if (autoRotate) {
          // Continuous smooth rotation
          globeGroup.rotation.y += 0.0028;
        }
      }

      // Slowly rotate orbital particle rings
      orbitGroup.rotation.z += 0.0018;

      // Animate Bangladesh Radar Waves
      radarRings.forEach((ring) => {
        const currentPhase = (elapsedTime * 1.5 + ring.phase) % 1;
        const scale = 1 + currentPhase * 3.2;
        ring.mesh.scale.set(scale, scale, scale);
        ring.mat.opacity = Math.max(0, 0.9 * (1 - currentPhase));
      });

      // Animate Beacon Orb Pulse
      const beaconScale = 1 + Math.sin(elapsedTime * 6) * 0.25;
      beaconOrbMesh.scale.set(beaconScale, beaconScale, beaconScale);

      // Animate Traveling Data Photons
      packets.forEach((packet) => {
        packet.progress = (packet.progress + packet.speed) % 1;
        const points = curvePointsList[packet.curveIndex];
        if (points && points.length > 0) {
          const index = Math.floor(packet.progress * (points.length - 1));
          packet.mesh.position.copy(points[index]);
          const pulseScale = 1 + Math.sin(packet.progress * Math.PI) * 0.6;
          packet.mesh.scale.set(pulseScale, pulseScale, pulseScale);
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domElement.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      domElement.removeEventListener('wheel', onWheel);
      renderer.dispose();
    };
  }, [autoRotate]);

  // Handle Node Focus / Navigation
  const handleSelectNode = (node: TelemetryNode) => {
    setActiveNode(node);
    onNodeSelect?.(node);

    // Calculate rotation to focus on this node
    const phi = (90 - node.lat) * (Math.PI / 180);
    const theta = (node.lng + 180) * (Math.PI / 180);
    const targetY = -theta + Math.PI / 2;
    const targetX = phi - Math.PI / 2;

    targetRotationRef.current = {
      y: targetY,
      x: Math.max(-0.7, Math.min(0.7, targetX)),
    };
  };

  const handleResetView = () => {
    targetRotationRef.current = {
      y: 1.32,
      x: 0.32,
    };
  };

  return (
    <div
      className={`relative w-full rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-black text-white border border-zinc-800 shadow-2xl overflow-hidden group ${className}`}
      id="eagox-interactive-3d-globe"
    >
      {/* Dynamic Background Grid & Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Telemetry Header Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800/80">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold tracking-wider text-emerald-400 uppercase">
                DHAKA BACKBONE HUB
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-emerald-950 text-emerald-300 border border-emerald-800/60">
                23.6850° N, 90.3563° E
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-800/70 border border-zinc-700/60 text-[11px] font-mono text-zinc-300">
            <Activity className="w-3 h-3 text-emerald-400" />
            <span>{fps} FPS</span>
          </div>

          <button
            onClick={handleResetView}
            className="p-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 text-xs font-mono flex items-center gap-1.5 transition-all border border-zinc-700/70 shadow-xs"
            title="Recenter Globe on Bangladesh"
          >
            <Compass className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden md:inline">Recenter</span>
          </button>

          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`p-2 rounded-xl border text-xs font-mono flex items-center gap-1.5 transition-all ${
              autoRotate
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-xs'
                : 'bg-zinc-800/80 text-zinc-300 border-zinc-700/70 hover:bg-zinc-700'
            }`}
            title="Toggle Globe Auto-Rotation"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }} />
            <span className="hidden sm:inline">{autoRotate ? 'Orbiting' : 'Paused'}</span>
          </button>
        </div>
      </div>

      {/* Main WebGL 3D Canvas with Enhanced Resolution */}
      <div
        ref={containerRef}
        className="w-full h-[380px] sm:h-[450px] md:h-[500px] cursor-grab active:cursor-grabbing relative"
      />

      {/* Up-Right Position Floating Coordinate Badge */}
      <div className="absolute top-16 right-4 z-10 hidden sm:flex flex-col items-end pointer-events-none">
        <div className="px-3 py-1.5 rounded-xl bg-zinc-900/90 backdrop-blur-md border border-zinc-700/60 text-right shadow-lg">
          <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5 justify-end">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>Mesh Pipeline</span>
          </div>
          <p className="text-xs font-mono font-bold text-white mt-0.5">3,600+ Continental Nodes</p>
        </div>
      </div>

      {/* Left Data Conduit Selectors */}
      <div className="absolute top-16 left-4 z-10 flex flex-col gap-1.5 max-w-[170px] pointer-events-auto">
        <div className="px-2 py-1 rounded-md bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold flex items-center justify-between">
          <span>Global Conduits</span>
          <NavigationIcon className="w-3 h-3 text-emerald-400" />
        </div>
        <div className="space-y-1">
          {TELEMETRY_NODES.map((node) => (
            <button
              key={node.id}
              onClick={() => handleSelectNode(node)}
              className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center justify-between border ${
                activeNode.id === node.id
                  ? 'bg-emerald-500 text-zinc-950 font-bold border-emerald-400 shadow-md scale-102'
                  : 'bg-zinc-900/80 hover:bg-zinc-800/90 text-zinc-300 border-zinc-800/80 backdrop-blur-md'
              }`}
            >
              <div className="truncate">
                <span>{node.city}</span>
              </div>
              <span
                className={`text-[10px] ml-1.5 font-bold ${
                  activeNode.id === node.id ? 'text-zinc-950' : 'text-emerald-400'
                }`}
              >
                {node.ping}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Floating Telemetry Overlay Bar */}
      <div className="absolute bottom-4 left-4 right-4 z-10 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div className="p-3 rounded-2xl bg-zinc-900/85 backdrop-blur-md border border-zinc-800/90 shadow-md">
          <div className="flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-wider text-zinc-400">
            <Radio className="w-3.5 h-3.5 text-emerald-400" />
            <span>Target Node</span>
          </div>
          <p className="text-xs font-bold text-white mt-1 truncate">
            {activeNode.city}, {activeNode.country.split(' ')[0]}
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-zinc-900/85 backdrop-blur-md border border-zinc-800/90 shadow-md">
          <div className="flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-wider text-zinc-400">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>RTT Latency</span>
          </div>
          <p className="text-xs font-mono font-bold text-white mt-1 flex items-center gap-1.5">
            <span>{activeNode.ping}</span>
            <span className="text-[10px] text-emerald-400 font-semibold">(Direct)</span>
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-zinc-900/85 backdrop-blur-md border border-zinc-800/90 shadow-md">
          <div className="flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-wider text-zinc-400">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>Bandwidth</span>
          </div>
          <p className="text-xs font-mono font-bold text-white mt-1">{telemetryThroughput}</p>
        </div>

        <div className="p-3 rounded-2xl bg-zinc-900/85 backdrop-blur-md border border-zinc-800/90 shadow-md">
          <div className="flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-wider text-zinc-400">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>Mesh Pipeline</span>
          </div>
          <p className="text-xs font-mono font-bold text-emerald-400 mt-1 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            ACTIVE MESH
          </p>
        </div>
      </div>
    </div>
  );
};
