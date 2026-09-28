import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { 
  Shield, 
  ShieldAlert, 
  ShieldCheck, 
  Cpu, 
  Activity, 
  Sliders, 
  Play, 
  Pause, 
  RotateCcw, 
  Layers, 
  Terminal, 
  AlertTriangle, 
  CheckCircle, 
  HelpCircle,
  Zap,
  Info,
  Globe,
  Users,
  Compass,
  Maximize2
} from 'lucide-react';

// Packet interface
interface SimPacket {
  mesh: THREE.Group;
  type: 'legit' | 'malware' | 'disguised';
  pathPhase: 'ingress' | 'egress';
  sourceStationIdx: number;
  ingressCurve: THREE.CatmullRomCurve3;
  egressCurve?: THREE.CatmullRomCurve3;
  targetConduitIdx?: number;
  progress: number;
  speed: number;
  color: number;
}

// Particle spark interface
interface Spark {
  mesh: THREE.Mesh;
  velocity: THREE.Vector3;
  life: number;
  maxLife: number;
}

export const Firewall3DSimulator: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  // Simulation Controls State
  const [ruleMode, setRuleMode] = useState<'permissive' | 'restrictive'>('restrictive');
  const [inspectionMode, setInspectionMode] = useState<'l4' | 'l7'>('l7');
  const [trafficRate, setTrafficRate] = useState<'normal' | 'high' | 'surge'>('normal');
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [autoRotate, setAutoRotate] = useState<boolean>(false);

  // Metrics State
  const [passedCount, setPassedCount] = useState<number>(0);
  const [blockedCount, setBlockedCount] = useState<number>(0);
  const [activeSessions, setActiveSessions] = useState<number>(1280);
  const [cpuUsage, setCpuUsage] = useState<number>(38);
  const [breachAlert, setBreachAlert] = useState<string | null>(null);

  // Refs for animation loop access without recreation
  const stateRef = useRef({
    ruleMode,
    inspectionMode,
    trafficRate,
    isPaused,
    autoRotate,
    passedCount: 0,
    blockedCount: 0,
    activeSessions: 1280
  });

  useEffect(() => {
    stateRef.current.ruleMode = ruleMode;
    stateRef.current.inspectionMode = inspectionMode;
    stateRef.current.trafficRate = trafficRate;
    stateRef.current.isPaused = isPaused;
    stateRef.current.autoRotate = autoRotate;
  }, [ruleMode, inspectionMode, trafficRate, isPaused, autoRotate]);

  // Three.js Scene Setup & Loop
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x04060b);
    scene.fog = new THREE.FogExp2(0x04060b, 0.015);

    const aspect = container.clientWidth / container.clientHeight;
    const camera = new THREE.PerspectiveCamera(38, aspect, 0.1, 1000);
    
    // Default Isometric Camera Position (Elevated 40-degree diagonal view like Image 2)
    const DEFAULT_CAM_POS = new THREE.Vector3(17, 21, 23);
    const TARGET_LOOK_AT = new THREE.Vector3(0, 1.2, 0);
    camera.position.copy(DEFAULT_CAM_POS);
    camera.lookAt(TARGET_LOOK_AT);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // 2. Interactive Orbiting & Mouse Drag Controls
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let cameraAngle = Math.atan2(camera.position.x, camera.position.z);
    let cameraElevation = Math.atan2(camera.position.y, Math.sqrt(camera.position.x * camera.position.x + camera.position.z * camera.position.z));
    let cameraDistance = camera.position.distanceTo(TARGET_LOOK_AT);

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      cameraAngle -= deltaX * 0.007;
      cameraElevation = Math.max(0.15, Math.min(Math.PI / 2.2, cameraElevation + deltaY * 0.007));

      camera.position.x = TARGET_LOOK_AT.x + cameraDistance * Math.cos(cameraElevation) * Math.sin(cameraAngle);
      camera.position.y = TARGET_LOOK_AT.y + cameraDistance * Math.sin(cameraElevation);
      camera.position.z = TARGET_LOOK_AT.z + cameraDistance * Math.cos(cameraElevation) * Math.cos(cameraAngle);
      camera.lookAt(TARGET_LOOK_AT);

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      cameraDistance = Math.max(14, Math.min(48, cameraDistance + e.deltaY * 0.03));
      camera.position.x = TARGET_LOOK_AT.x + cameraDistance * Math.cos(cameraElevation) * Math.sin(cameraAngle);
      camera.position.y = TARGET_LOOK_AT.y + cameraDistance * Math.sin(cameraElevation);
      camera.position.z = TARGET_LOOK_AT.z + cameraDistance * Math.cos(cameraElevation) * Math.cos(cameraAngle);
      camera.lookAt(TARGET_LOOK_AT);
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('wheel', onWheel, { passive: false });

    // Touch support for mobile/tablets
    let touchStartDist = 0;
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2) {
        touchStartDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1 && isDragging) {
        const deltaX = e.touches[0].clientX - previousMousePosition.x;
        const deltaY = e.touches[0].clientY - previousMousePosition.y;

        cameraAngle -= deltaX * 0.008;
        cameraElevation = Math.max(0.15, Math.min(Math.PI / 2.2, cameraElevation + deltaY * 0.008));

        camera.position.x = TARGET_LOOK_AT.x + cameraDistance * Math.cos(cameraElevation) * Math.sin(cameraAngle);
        camera.position.y = TARGET_LOOK_AT.y + cameraDistance * Math.sin(cameraElevation);
        camera.position.z = TARGET_LOOK_AT.z + cameraDistance * Math.cos(cameraElevation) * Math.cos(cameraAngle);
        camera.lookAt(TARGET_LOOK_AT);

        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2) {
        const currentDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const deltaDist = touchStartDist - currentDist;
        cameraDistance = Math.max(14, Math.min(48, cameraDistance + deltaDist * 0.05));
        camera.position.x = TARGET_LOOK_AT.x + cameraDistance * Math.cos(cameraElevation) * Math.sin(cameraAngle);
        camera.position.y = TARGET_LOOK_AT.y + cameraDistance * Math.sin(cameraElevation);
        camera.position.z = TARGET_LOOK_AT.z + cameraDistance * Math.cos(cameraElevation) * Math.cos(cameraAngle);
        camera.lookAt(TARGET_LOOK_AT);
        touchStartDist = currentDist;
      }
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    container.addEventListener('touchstart', onTouchStart, { passive: true });
    container.addEventListener('touchmove', onTouchMove, { passive: true });
    container.addEventListener('touchend', onTouchEnd, { passive: true });

    // 3. Lighting & Cyber Ambiance (Cyan and Blue tones inspired by Image 2)
    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.6);
    dirLight.position.set(15, 25, 20);
    scene.add(dirLight);

    // Cyan Fill light from front-left
    const fillLight = new THREE.DirectionalLight(0x00f0ff, 1.1);
    fillLight.position.set(-15, 12, 10);
    scene.add(fillLight);

    // Center Plinth Glow Light (Intense Cyan/Neon Blue directly underneath firewall)
    const plinthGlowLight = new THREE.PointLight(0x00d2ff, 4.0, 16);
    plinthGlowLight.position.set(0, 0.4, 0);
    scene.add(plinthGlowLight);

    // Subtle red backlight for blocking effect
    const alertLight = new THREE.PointLight(0xff1e27, 0, 18);
    alertLight.position.set(0, 3, 0);
    scene.add(alertLight);

    // 4. Floor Grid & Concentric Cyber Rings (Inspired by Image 2)
    const mainGrid = new THREE.GridHelper(50, 50, 0x1e293b, 0x090e18);
    mainGrid.position.y = -0.05;
    scene.add(mainGrid);

    // Concentric Circular Radar Rings around the Firewall
    const ringRadii = [3.5, 6.0, 9.5, 13.5, 18.0];
    ringRadii.forEach((radius, idx) => {
      const ringGeom = new THREE.RingGeometry(radius - 0.03, radius + 0.03, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x00e5ff,
        transparent: true,
        opacity: 0.15 - idx * 0.025,
        side: THREE.DoubleSide
      });
      const ringMesh = new THREE.Mesh(ringGeom, ringMat);
      ringMesh.rotation.x = -Math.PI / 2;
      ringMesh.position.y = 0.01;
      scene.add(ringMesh);
    });

    // =========================================================================
    // 5. CENTERPIECE: DUAL-TOWER SERVER RACK ON GLOWING PLINTH (Exact Image 2)
    // =========================================================================
    const firewallGroup = new THREE.Group();
    scene.add(firewallGroup);

    // Beveled Base Plinth
    const plinthGeo = new THREE.BoxGeometry(4.8, 0.45, 4.8);
    const plinthMat = new THREE.MeshStandardMaterial({
      color: 0x0a101f,
      roughness: 0.2,
      metalness: 0.85
    });
    const plinthMesh = new THREE.Mesh(plinthGeo, plinthMat);
    plinthMesh.position.set(0, 0.22, 0);
    firewallGroup.add(plinthMesh);

    // Intense Glowing Neon Rim around Plinth
    const plinthRimGeo = new THREE.BoxGeometry(5.0, 0.12, 5.0);
    const plinthRimMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.95
    });
    const plinthRim = new THREE.Mesh(plinthRimGeo, plinthRimMat);
    plinthRim.position.set(0, 0.12, 0);
    firewallGroup.add(plinthRim);

    // Secondary Platform Step
    const stepGeo = new THREE.BoxGeometry(3.6, 0.25, 3.6);
    const stepMat = new THREE.MeshStandardMaterial({
      color: 0x131e33,
      roughness: 0.3,
      metalness: 0.8
    });
    const stepMesh = new THREE.Mesh(stepGeo, stepMat);
    stepMesh.position.set(0, 0.45, 0);
    firewallGroup.add(stepMesh);

    // TOWER 1: Front-Left Server Tower (with drive bays and status LEDs)
    const tower1Geo = new THREE.BoxGeometry(2.0, 4.4, 2.0);
    const tower1Mat = new THREE.MeshStandardMaterial({
      color: 0x182438,
      roughness: 0.25,
      metalness: 0.8
    });
    const tower1 = new THREE.Mesh(tower1Geo, tower1Mat);
    tower1.position.set(-0.6, 2.7, 0.2);
    firewallGroup.add(tower1);

    // TOWER 2: Back-Right Server Tower (with illuminated cyber window logo)
    const tower2Geo = new THREE.BoxGeometry(1.8, 5.0, 1.8);
    const tower2Mat = new THREE.MeshStandardMaterial({
      color: 0x141f30,
      roughness: 0.3,
      metalness: 0.8
    });
    const tower2 = new THREE.Mesh(tower2Geo, tower2Mat);
    tower2.position.set(0.7, 3.0, -0.4);
    firewallGroup.add(tower2);

    // Blade Server Drive Bays on Front Face of Tower 1
    const driveBaysCount = 10;
    const bayLedMeshes: THREE.Mesh[] = [];
    for (let i = 0; i < driveBaysCount; i++) {
      // Horizontal drive tray slot
      const bayGeo = new THREE.BoxGeometry(1.6, 0.2, 0.05);
      const bayMat = new THREE.MeshStandardMaterial({
        color: 0x090e18,
        metalness: 0.9,
        roughness: 0.4
      });
      const bay = new THREE.Mesh(bayGeo, bayMat);
      bay.position.set(-0.6, 1.2 + i * 0.35, 1.22);
      firewallGroup.add(bay);

      // Status LED indicator on each tray
      const ledGeo = new THREE.BoxGeometry(0.1, 0.06, 0.06);
      const ledMat = new THREE.MeshBasicMaterial({
        color: i % 3 === 0 ? 0x00ff88 : 0x00e5ff
      });
      const led = new THREE.Mesh(ledGeo, ledMat);
      led.position.set(-1.25, 1.2 + i * 0.35, 1.25);
      firewallGroup.add(led);
      bayLedMeshes.push(led);
    }

    // Stylized Glowing Cyber Window Emblem on Tower 2 Side (Exact Image 2)
    const logoCanvas = document.createElement('canvas');
    logoCanvas.width = 256;
    logoCanvas.height = 256;
    const lCtx = logoCanvas.getContext('2d');
    if (lCtx) {
      lCtx.clearRect(0, 0, 256, 256);
      lCtx.fillStyle = '#00f0ff';
      lCtx.shadowColor = '#00f0ff';
      lCtx.shadowBlur = 18;

      // 4 quadrantes chanfrados inspirados no logo de cibersegurança empresarial
      const sz = 70;
      const gap = 16;
      const startX = 45;
      const startY = 45;

      // Top-Left
      lCtx.fillRect(startX, startY, sz, sz);
      // Top-Right
      lCtx.fillRect(startX + sz + gap, startY, sz, sz);
      // Bottom-Left
      lCtx.fillRect(startX, startY + sz + gap, sz, sz);
      // Bottom-Right
      lCtx.fillRect(startX + sz + gap, startY + sz + gap, sz, sz);
    }
    const logoTex = new THREE.CanvasTexture(logoCanvas);
    const logoMat = new THREE.MeshBasicMaterial({
      map: logoTex,
      transparent: true,
      side: THREE.DoubleSide
    });
    const logoPlane = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 1.3), logoMat);
    logoPlane.rotation.y = Math.PI / 2;
    logoPlane.position.set(1.61, 3.0, -0.4);
    firewallGroup.add(logoPlane);

    // Vertical Inspection Core Laser Field (Center between towers)
    const coreBeamGeo = new THREE.CylinderGeometry(0.35, 0.35, 4.2, 16);
    const coreBeamMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.45
    });
    const coreBeam = new THREE.Mesh(coreBeamGeo, coreBeamMat);
    coreBeam.position.set(0, 2.7, 0);
    firewallGroup.add(coreBeam);

    // =========================================================================
    // 6. LEFT SIDE: 5 USER STATIONS & 3D AVATAR GROUPS (LAN / User-ID)
    // =========================================================================
    interface UserStation {
      id: number;
      label: string;
      position: THREE.Vector3;
      userCount: number;
      color: number;
      role: 'Admin' | 'Engenharia' | 'Financeiro' | 'Estação Padrão' | 'Dispositivo Móvel';
    }

    const USER_STATIONS: UserStation[] = [
      { id: 1, label: 'TI / Admin (Autorizado)', position: new THREE.Vector3(-8.2, 0.25, -4.8), userCount: 1, color: 0x00e5ff, role: 'Admin' },
      { id: 2, label: 'Workstation 01', position: new THREE.Vector3(-10.4, 0.25, -1.8), userCount: 1, color: 0x00b4d8, role: 'Estação Padrão' },
      { id: 3, label: 'Engenharia & DevOps', position: new THREE.Vector3(-11.2, 0.25, 1.8), userCount: 2, color: 0x0096c7, role: 'Engenharia' },
      { id: 4, label: 'Grupo Financeiro / ERP', position: new THREE.Vector3(-9.6, 0.25, 5.2), userCount: 3, color: 0x0284c7, role: 'Financeiro' },
      { id: 5, label: 'Diretoria & SecOps', position: new THREE.Vector3(-5.8, 0.25, 6.6), userCount: 3, color: 0x10b981, role: 'Admin' }
    ];

    const avatarMeshes: THREE.Group[] = [];

    // Helper to build 3D Human Avatar
    const create3DAvatar = (color: number): THREE.Group => {
      const avatar = new THREE.Group();

      // Head
      const headGeo = new THREE.SphereGeometry(0.24, 16, 16);
      const avatarMat = new THREE.MeshStandardMaterial({
        color: color,
        roughness: 0.3,
        metalness: 0.6,
        emissive: color,
        emissiveIntensity: 0.2
      });
      const head = new THREE.Mesh(headGeo, avatarMat);
      head.position.y = 0.85;
      avatar.add(head);

      // Torso & Shoulders
      const bodyGeo = new THREE.CylinderGeometry(0.18, 0.36, 0.65, 16);
      const body = new THREE.Mesh(bodyGeo, avatarMat);
      body.position.y = 0.35;
      avatar.add(body);

      // Avatar base glow disc
      const discGeo = new THREE.RingGeometry(0.15, 0.45, 16);
      const discMat = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide
      });
      const disc = new THREE.Mesh(discGeo, discMat);
      disc.rotation.x = -Math.PI / 2;
      disc.position.y = 0.02;
      avatar.add(disc);

      return avatar;
    };

    USER_STATIONS.forEach((station) => {
      // Floating Rounded Beveled Platform Pad
      const padGroup = new THREE.Group();
      padGroup.position.copy(station.position);

      const padGeo = new THREE.BoxGeometry(2.1, 0.3, 2.1);
      const padMat = new THREE.MeshStandardMaterial({
        color: 0x0c1626,
        roughness: 0.3,
        metalness: 0.8
      });
      const padMesh = new THREE.Mesh(padGeo, padMat);
      padGroup.add(padMesh);

      // Glowing Neon Rim around Station Pad
      const rimGeo = new THREE.BoxGeometry(2.25, 0.08, 2.25);
      const rimMat = new THREE.MeshBasicMaterial({
        color: station.color,
        transparent: true,
        opacity: 0.95
      });
      const rimMesh = new THREE.Mesh(rimGeo, rimMat);
      rimMesh.position.y = 0.05;
      padGroup.add(rimMesh);

      // Add 3D Avatars based on userCount
      if (station.userCount === 1) {
        const av = create3DAvatar(station.color);
        av.position.set(0, 0.15, 0);
        padGroup.add(av);
        avatarMeshes.push(av);
      } else if (station.userCount === 2) {
        const av1 = create3DAvatar(station.color);
        av1.position.set(-0.35, 0.15, 0);
        padGroup.add(av1);
        avatarMeshes.push(av1);

        const av2 = create3DAvatar(station.color);
        av2.position.set(0.35, 0.15, 0);
        padGroup.add(av2);
        avatarMeshes.push(av2);
      } else {
        // 3 Avatars arranged triangularly (Exact Image 2 bottom pads)
        const av1 = create3DAvatar(station.color);
        av1.position.set(-0.45, 0.15, -0.25);
        padGroup.add(av1);
        avatarMeshes.push(av1);

        const av2 = create3DAvatar(station.color);
        av2.position.set(0.45, 0.15, -0.25);
        padGroup.add(av2);
        avatarMeshes.push(av2);

        const av3 = create3DAvatar(station.color);
        av3.position.set(0, 0.15, 0.4);
        padGroup.add(av3);
        avatarMeshes.push(av3);
      }

      scene.add(padGroup);
    });

    // =========================================================================
    // 7. PCB CIRCUIT TRACES (Tree Network converging to Firewall Ingress)
    // =========================================================================
    // Create CatmullRom curves for each station to the firewall entrance
    const ingressCurves: THREE.CatmullRomCurve3[] = [];
    const firewallIngressPoint = new THREE.Vector3(-2.4, 0.35, 0);

    USER_STATIONS.forEach((station) => {
      // Create multi-segment orthogonal/45-deg path like circuit boards
      const start = station.position.clone().setY(0.1);
      const mid1 = new THREE.Vector3(
        start.x + (firewallIngressPoint.x - start.x) * 0.45,
        0.1,
        start.z * 0.8
      );
      const mid2 = new THREE.Vector3(
        -3.8,
        0.15,
        start.z * 0.3
      );
      const end = firewallIngressPoint.clone();

      const curve = new THREE.CatmullRomCurve3([start, mid1, mid2, end]);
      ingressCurves.push(curve);

      // Render glowing circuit trace line
      const points = curve.getPoints(50);
      const lineGeom = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineBasicMaterial({
        color: station.color,
        transparent: true,
        opacity: 0.75,
        linewidth: 2
      });
      const line = new THREE.Line(lineGeom, lineMat);
      scene.add(line);

      // Junction node at start and intermediate points
      const nodeGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.05, 12);
      const nodeMat = new THREE.MeshBasicMaterial({ color: station.color });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.copy(mid1);
      scene.add(nodeMesh);
    });

    // =========================================================================
    // 8. RIGHT SIDE: 4 ELEVATED CONDUITS & HOLOGRAPHIC GLOBES (Exact Image 2)
    // =========================================================================
    interface WanConduit {
      id: number;
      title: string;
      color: number;
      startY: number;
      startZ: number;
      endPoint: THREE.Vector3;
      globeName: string;
      curve: THREE.CatmullRomCurve3;
      globeMesh: THREE.Group;
    }

    const CONDUIT_DEFS = [
      {
        id: 0,
        title: 'SaaS / Office365 Cloud',
        color: 0x00b4d8, // Sky Blue
        startZ: -1.2,
        endPoint: new THREE.Vector3(12.5, 0.4, -5.2),
        globeName: 'Cloud SaaS'
      },
      {
        id: 1,
        title: 'Web Segura (Porta 443 HTTPS)',
        color: 0x10b981, // Vibrant Green
        startZ: -0.4,
        endPoint: new THREE.Vector3(14.0, 0.4, -1.8),
        globeName: 'Secure Web'
      },
      {
        id: 2,
        title: 'Datacenter / Multi-Cloud VPN',
        color: 0x06b6d4, // Teal / Cyan
        startZ: 0.4,
        endPoint: new THREE.Vector3(14.0, 0.4, 1.8),
        globeName: 'Private Core'
      },
      {
        id: 3,
        title: 'Tráfego Não Classificado / Shadow IT',
        color: 0x8b5cf6, // Purple / Indigo
        startZ: 1.2,
        endPoint: new THREE.Vector3(12.5, 0.4, 5.2),
        globeName: 'Public Web'
      }
    ];

    const wanConduits: WanConduit[] = [];
    const rotatingGlobes: THREE.Group[] = [];

    CONDUIT_DEFS.forEach((cDef) => {
      const firewallEgressPoint = new THREE.Vector3(2.4, 0.4, cDef.startZ);

      // Create S-curve conduit path
      const p0 = firewallEgressPoint;
      const p1 = new THREE.Vector3(4.5, 0.4, cDef.startZ * 1.1);
      const p2 = new THREE.Vector3(7.5, 0.4, cDef.endPoint.z * 0.7);
      const p3 = new THREE.Vector3(10.0, 0.4, cDef.endPoint.z);
      const p4 = cDef.endPoint;

      const curve = new THREE.CatmullRomCurve3([p0, p1, p2, p3, p4]);

      // Build 3D Extruded Elevated Conduit Ribbon
      const points = curve.getPoints(60);
      const conduitWidth = 0.95;

      // Create flat strip geometry along the curve
      const ribbonPositions: number[] = [];
      const ribbonIndices: number[] = [];

      for (let i = 0; i < points.length; i++) {
        const pt = points[i];
        // Calculate tangent
        const tangent = i < points.length - 1 
          ? points[i + 1].clone().sub(pt).normalize()
          : pt.clone().sub(points[i - 1]).normalize();
        
        // Normal in XZ plane
        const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();

        // Left and right vertices
        const left = pt.clone().add(normal.clone().multiplyScalar(conduitWidth * 0.5));
        const right = pt.clone().sub(normal.clone().multiplyScalar(conduitWidth * 0.5));

        ribbonPositions.push(left.x, left.y, left.z);
        ribbonPositions.push(right.x, right.y, right.z);

        if (i < points.length - 1) {
          const base = i * 2;
          ribbonIndices.push(base, base + 1, base + 2);
          ribbonIndices.push(base + 1, base + 3, base + 2);
        }
      }

      const ribbonGeo = new THREE.BufferGeometry();
      ribbonGeo.setAttribute('position', new THREE.Float32BufferAttribute(ribbonPositions, 3));
      ribbonGeo.setIndex(ribbonIndices);
      ribbonGeo.computeVertexNormals();

      const ribbonMat = new THREE.MeshStandardMaterial({
        color: 0x091120,
        roughness: 0.35,
        metalness: 0.8,
        side: THREE.DoubleSide
      });
      const conduitMesh = new THREE.Mesh(ribbonGeo, ribbonMat);
      scene.add(conduitMesh);

      // Glowing Center LED Track line along Conduit
      const lineGeom = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineBasicMaterial({
        color: cDef.color,
        transparent: true,
        opacity: 0.95,
        linewidth: 2
      });
      const centerLine = new THREE.Line(lineGeom, lineMat);
      centerLine.position.y += 0.02;
      scene.add(centerLine);

      // Side Glowing Rails
      const leftRailPoints = points.map((p, idx) => {
        const tangent = idx < points.length - 1 ? points[idx + 1].clone().sub(p).normalize() : p.clone().sub(points[idx - 1]).normalize();
        const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
        return p.clone().add(normal.multiplyScalar(conduitWidth * 0.52)).setY(p.y + 0.04);
      });
      const leftRailLine = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(leftRailPoints),
        new THREE.LineBasicMaterial({ color: cDef.color, transparent: true, opacity: 0.45 })
      );
      scene.add(leftRailLine);

      const rightRailPoints = points.map((p, idx) => {
        const tangent = idx < points.length - 1 ? points[idx + 1].clone().sub(p).normalize() : p.clone().sub(points[idx - 1]).normalize();
        const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
        return p.clone().sub(normal.multiplyScalar(conduitWidth * 0.52)).setY(p.y + 0.04);
      });
      const rightRailLine = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(rightRailPoints),
        new THREE.LineBasicMaterial({ color: cDef.color, transparent: true, opacity: 0.45 })
      );
      scene.add(rightRailLine);

      // Destination Rounded Pedestal Pad (Beveled Pad at the end of conduit)
      const destPad = new THREE.Group();
      destPad.position.copy(cDef.endPoint);

      const dPadGeo = new THREE.BoxGeometry(2.3, 0.35, 2.3);
      const dPadMat = new THREE.MeshStandardMaterial({
        color: 0x091220,
        roughness: 0.3,
        metalness: 0.8
      });
      const dPadMesh = new THREE.Mesh(dPadGeo, dPadMat);
      destPad.add(dPadMesh);

      // Pedestal Glowing Rim
      const dRimGeo = new THREE.BoxGeometry(2.45, 0.08, 2.45);
      const dRimMat = new THREE.MeshBasicMaterial({
        color: cDef.color,
        transparent: true,
        opacity: 0.95
      });
      const dRim = new THREE.Mesh(dRimGeo, dRimMat);
      dRim.position.y = 0.08;
      destPad.add(dRim);

      // =======================================================================
      // HOLOGRAPHIC WIREFRAME GLOBE (Exact Image 2)
      // =======================================================================
      const globeGroup = new THREE.Group();
      globeGroup.position.set(0, 1.25, 0);

      // Wireframe Latitude/Longitude Sphere
      const sphereGeo = new THREE.SphereGeometry(0.85, 18, 14);
      const sphereMat = new THREE.MeshBasicMaterial({
        color: cDef.color,
        wireframe: true,
        transparent: true,
        opacity: 0.65
      });
      const globeMesh = new THREE.Mesh(sphereGeo, sphereMat);
      globeGroup.add(globeMesh);

      // Inner Core Solid Soft Glowing Sphere
      const coreGeo = new THREE.SphereGeometry(0.55, 16, 16);
      const coreMat = new THREE.MeshBasicMaterial({
        color: cDef.color,
        transparent: true,
        opacity: 0.25
      });
      const core = new THREE.Mesh(coreGeo, coreMat);
      globeGroup.add(core);

      // Outer Orbital Ring
      const ringGeo = new THREE.RingGeometry(1.05, 1.14, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: cDef.color,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide
      });
      const orbitRing = new THREE.Mesh(ringGeo, ringMat);
      orbitRing.rotation.x = Math.PI / 3;
      globeGroup.add(orbitRing);

      destPad.add(globeGroup);
      scene.add(destPad);

      rotatingGlobes.push(globeGroup);

      wanConduits.push({
        id: cDef.id,
        title: cDef.title,
        color: cDef.color,
        startY: 0.4,
        startZ: cDef.startZ,
        endPoint: cDef.endPoint,
        globeName: cDef.globeName,
        curve,
        globeMesh: globeGroup
      });
    });

    // =========================================================================
    // 9. ANIMATED PACKET STREAMS & SPARK PARTICLES
    // =========================================================================
    const activePackets: SimPacket[] = [];
    const sparks: Spark[] = [];

    // Helper to create glowing packet capsule
    const createPacketMesh = (color: number): THREE.Group => {
      const group = new THREE.Group();
      
      const geom = new THREE.SphereGeometry(0.18, 12, 12);
      const mat = new THREE.MeshBasicMaterial({ color: color });
      const core = new THREE.Mesh(geom, mat);
      group.add(core);

      const glowGeom = new THREE.SphereGeometry(0.35, 10, 10);
      const glowMat = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.35
      });
      const glow = new THREE.Mesh(glowGeom, glowMat);
      group.add(glow);

      return group;
    };

    // Spawn Packet Handler
    let spawnTimer = 0;
    const spawnPacket = () => {
      // Pick random station
      const stationIdx = Math.floor(Math.random() * USER_STATIONS.length);
      const station = USER_STATIONS[stationIdx];

      // Determine traffic type based on station & rules
      const rand = Math.random();
      let type: 'legit' | 'malware' | 'disguised' = 'legit';

      if (station.role === 'Admin') {
        type = rand < 0.1 ? 'disguised' : 'legit';
      } else if (station.role === 'Financeiro') {
        type = rand < 0.25 ? 'disguised' : 'legit';
      } else {
        if (rand < 0.3) type = 'malware';
        else if (rand < 0.55) type = 'disguised';
        else type = 'legit';
      }

      let color = 0x00ff88; // Green for legit
      if (type === 'malware') color = 0xff1e27; // Red for malware
      if (type === 'disguised') color = 0xf59e0b; // Amber for disguised SSL/443

      const mesh = createPacketMesh(color);
      scene.add(mesh);

      const curve = ingressCurves[stationIdx];
      const startPos = curve.getPointAt(0);
      mesh.position.copy(startPos);

      // Packet speed modified by trafficRate
      let baseSpeed = 0.012;
      if (stateRef.current.trafficRate === 'high') baseSpeed = 0.02;
      if (stateRef.current.trafficRate === 'surge') baseSpeed = 0.035;

      activePackets.push({
        mesh,
        type,
        pathPhase: 'ingress',
        sourceStationIdx: stationIdx,
        ingressCurve: curve,
        progress: 0,
        speed: baseSpeed + Math.random() * 0.004,
        color
      });
    };

    // Spark Burst Creator (When threat is blocked at firewall)
    const triggerSparkBurst = (pos: THREE.Vector3) => {
      const sparkCount = 18;
      for (let i = 0; i < sparkCount; i++) {
        const sparkGeo = new THREE.BoxGeometry(0.08, 0.08, 0.08);
        const sparkMat = new THREE.MeshBasicMaterial({
          color: 0xff1e27,
          transparent: true,
          opacity: 1
        });
        const sparkMesh = new THREE.Mesh(sparkGeo, sparkMat);
        sparkMesh.position.copy(pos);
        scene.add(sparkMesh);

        const velocity = new THREE.Vector3(
          (Math.random() - 0.5) * 0.25,
          Math.random() * 0.25 + 0.05,
          (Math.random() - 0.5) * 0.25
        );

        sparks.push({
          mesh: sparkMesh,
          velocity,
          life: 0,
          maxLife: 20 + Math.random() * 15
        });
      }

      // Flash alert light briefly
      alertLight.intensity = 3.5;
    };

    // =========================================================================
    // 10. MAIN ANIMATION LOOP
    // =========================================================================
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Auto-rotation around target if enabled
      if (stateRef.current.autoRotate && !isDragging) {
        cameraAngle += 0.003;
        camera.position.x = TARGET_LOOK_AT.x + cameraDistance * Math.cos(cameraElevation) * Math.sin(cameraAngle);
        camera.position.z = TARGET_LOOK_AT.z + cameraDistance * Math.cos(cameraElevation) * Math.cos(cameraAngle);
        camera.lookAt(TARGET_LOOK_AT);
      }

      // Dim alert light smoothly
      if (alertLight.intensity > 0) {
        alertLight.intensity = Math.max(0, alertLight.intensity - 0.15);
      }

      // Rotate Globes
      rotatingGlobes.forEach((g, idx) => {
        g.rotation.y += 0.015 * (idx % 2 === 0 ? 1 : -1);
      });

      // Pulse Core Beam
      (coreBeam.material as THREE.MeshBasicMaterial).opacity = 0.35 + Math.sin(time * 6) * 0.15;

      // Blink Server Blade LEDs
      bayLedMeshes.forEach((led, idx) => {
        if (Math.sin(time * 8 + idx) > 0.6) {
          (led.material as THREE.MeshBasicMaterial).opacity = 1.0;
        } else {
          (led.material as THREE.MeshBasicMaterial).opacity = 0.3;
        }
      });

      if (!stateRef.current.isPaused) {
        // Spawn timer
        spawnTimer++;
        const spawnInterval = stateRef.current.trafficRate === 'surge' ? 8 : (stateRef.current.trafficRate === 'high' ? 16 : 28);
        if (spawnTimer >= spawnInterval) {
          spawnTimer = 0;
          spawnPacket();
        }

        // Update Packets
        for (let i = activePackets.length - 1; i >= 0; i--) {
          const p = activePackets[i];
          p.progress += p.speed;

          if (p.pathPhase === 'ingress') {
            // Traveling along user circuit into firewall
            if (p.progress >= 1.0) {
              // PACKET ENTERED THE FIREWALL: POLICY & INSPECTION EVALUATION
              const { ruleMode, inspectionMode } = stateRef.current;
              let isBlocked = false;

              if (ruleMode === 'restrictive') {
                // Menor Privilégio:
                if (p.type === 'malware') {
                  isBlocked = true;
                } else if (p.type === 'disguised') {
                  // If L7 is ON: Deep Packet Inspection detects hidden payload!
                  if (inspectionMode === 'l7') {
                    isBlocked = true;
                  } else {
                    // L4 Mode: Port 443 fooled the firewall! Breach!
                    isBlocked = false;
                  }
                } else {
                  isBlocked = false;
                }
              } else {
                // ANY ANY (Permissive Mode):
                // Almost all traffic passes without restriction
                isBlocked = p.type === 'malware' && inspectionMode === 'l7';
              }

              if (isBlocked) {
                // BLOCK PACKET!
                triggerSparkBurst(firewallIngressPoint);
                scene.remove(p.mesh);
                activePackets.splice(i, 1);

                stateRef.current.blockedCount++;
                setBlockedCount(stateRef.current.blockedCount);
                continue;
              } else {
                // PASSED FIREWALL: Transition to Egress Conduit
                p.pathPhase = 'egress';
                p.progress = 0;

                // Select matching conduit based on type & station
                let targetConduitIdx = 1; // Default: Web Segura (Green)
                if (p.type === 'disguised') {
                  targetConduitIdx = 3; // Shadow IT / Unclassified (Purple)
                } else if (USER_STATIONS[p.sourceStationIdx].role === 'Admin') {
                  targetConduitIdx = 2; // Datacenter / Multi-cloud (Cyan)
                } else if (USER_STATIONS[p.sourceStationIdx].role === 'Financeiro') {
                  targetConduitIdx = 0; // SaaS / Cloud (Blue)
                }

                p.targetConduitIdx = targetConduitIdx;
                p.egressCurve = wanConduits[targetConduitIdx].curve;

                // If disguised threat passed in L4 mode, trigger breach flash
                if (p.type === 'disguised' && inspectionMode === 'l4') {
                  setBreachAlert('BRECHA DETECTADA: Malware na porta 443 passou despercebido (Inspeção L4 sem DPI)!');
                  setTimeout(() => setBreachAlert(null), 3500);
                }

                stateRef.current.passedCount++;
                setPassedCount(stateRef.current.passedCount);
              }
            } else {
              const currentPos = p.ingressCurve.getPointAt(p.progress);
              p.mesh.position.copy(currentPos);
            }
          } else {
            // Egress Phase: Traveling along Conduit towards Destination Globe
            if (p.progress >= 1.0) {
              // Reached Destination Globe
              const conduit = wanConduits[p.targetConduitIdx || 0];
              // Pulse globe size
              conduit.globeMesh.scale.set(1.2, 1.2, 1.2);
              setTimeout(() => conduit.globeMesh.scale.set(1.0, 1.0, 1.0), 180);

              scene.remove(p.mesh);
              activePackets.splice(i, 1);
            } else if (p.egressCurve) {
              const currentPos = p.egressCurve.getPointAt(p.progress);
              p.mesh.position.copy(currentPos);
            }
          }
        }

        // Update Sparks
        for (let i = sparks.length - 1; i >= 0; i--) {
          const sp = sparks[i];
          sp.life++;
          sp.mesh.position.add(sp.velocity);
          sp.velocity.y -= 0.008; // gravity
          (sp.mesh.material as THREE.MeshBasicMaterial).opacity = 1 - (sp.life / sp.maxLife);

          if (sp.life >= sp.maxLife) {
            scene.remove(sp.mesh);
            sparks.splice(i, 1);
          }
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // 11. Handle Container Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Reset Camera Function
    (window as any).__resetSimCamera = () => {
      camera.position.copy(DEFAULT_CAM_POS);
      cameraAngle = Math.atan2(DEFAULT_CAM_POS.x, DEFAULT_CAM_POS.z);
      cameraElevation = Math.atan2(DEFAULT_CAM_POS.y, Math.sqrt(DEFAULT_CAM_POS.x * DEFAULT_CAM_POS.x + DEFAULT_CAM_POS.z * DEFAULT_CAM_POS.z));
      cameraDistance = DEFAULT_CAM_POS.distanceTo(TARGET_LOOK_AT);
      camera.lookAt(TARGET_LOOK_AT);
    };

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('wheel', onWheel);
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('touchend', onTouchEnd);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update CPU usage dynamically based on settings
  useEffect(() => {
    let base = 25;
    if (inspectionMode === 'l7') base += 28;
    if (ruleMode === 'restrictive') base += 12;
    if (trafficRate === 'high') base += 15;
    if (trafficRate === 'surge') base += 32;
    setCpuUsage(Math.min(98, base));

    let sess = 1200;
    if (trafficRate === 'high') sess = 4800;
    if (trafficRate === 'surge') sess = 18500;
    setActiveSessions(sess);
  }, [ruleMode, inspectionMode, trafficRate]);

  const handleResetCamera = () => {
    if ((window as any).__resetSimCamera) {
      (window as any).__resetSimCamera();
    }
  };

  const handleResetCounters = () => {
    stateRef.current.passedCount = 0;
    stateRef.current.blockedCount = 0;
    setPassedCount(0);
    setBlockedCount(0);
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-red-900/60 bg-[#04060b] shadow-[0_0_50px_rgba(0,0,0,0.85)] flex flex-col font-sans select-none">
      
      {/* TOP HUD BAR (TELEMETRIA E STATUS) */}
      <div className="p-4 sm:p-5 border-b border-slate-800 bg-[#060810]/95 backdrop-blur-md flex flex-wrap items-center justify-between gap-4 z-10">
        
        {/* Title & Badge */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/60 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.35)] shrink-0">
            <Shield className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-[10px] font-mono font-bold tracking-widest text-cyan-400 uppercase">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>ARQUITETURA ISOMÉTRICA 3D · NÍVEL DE ENGENHARIA</span>
            </div>
            <h2 className="text-sm sm:text-base font-black text-white font-mono tracking-tight uppercase">
              NGFW Inspection Core: L4 vs. L7 & Menor Privilégio
            </h2>
          </div>
        </div>

        {/* Real-time Telemetry Metrics */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono">
          
          {/* Passed */}
          <div className="px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800/80 flex items-center gap-2 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#10b981]" />
            <span className="text-slate-400">Liberados:</span>
            <span className="text-[#10b981] font-bold text-sm">{passedCount}</span>
          </div>

          {/* Blocked */}
          <div className="px-3 py-1.5 rounded-lg bg-red-950/60 border border-red-800/80 flex items-center gap-2 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#ff1e27]" />
            <span className="text-slate-400">Bloqueados:</span>
            <span className="text-[#ff1e27] font-bold text-sm">{blockedCount}</span>
          </div>

          {/* CPU Bar */}
          <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-2.5">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-slate-400">CPU Core:</span>
            <span className={`font-bold ${cpuUsage > 75 ? 'text-red-400' : 'text-cyan-300'}`}>
              {cpuUsage}%
            </span>
          </div>

          {/* Sessions */}
          <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hidden md:flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-400">Sessões:</span>
            <span className="text-amber-300 font-bold">{activeSessions.toLocaleString('pt-BR')}</span>
          </div>
        </div>

      </div>

      {/* 3D CANVAS VIEWPORT */}
      <div className="relative w-full h-[520px] sm:h-[600px] cursor-grab active:cursor-grabbing overflow-hidden">
        
        {/* Three.js Container */}
        <div ref={mountRef} className="absolute inset-0 w-full h-full" />

        {/* Breach Alert Banner Overlay */}
        {breachAlert && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 max-w-lg px-4 py-2.5 rounded-xl bg-red-950/95 border-2 border-red-500 text-red-200 text-xs font-mono font-bold shadow-[0_0_30px_rgba(239,68,68,0.7)] flex items-center gap-2 animate-bounce">
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
            <span>{breachAlert}</span>
          </div>
        )}

        {/* Visual Zone Legends (LAN Users on Left, NGFW Center, WAN on Right) */}
        <div className="absolute top-3 left-3 z-10 pointer-events-none hidden sm:block">
          <div className="px-2.5 py-1.5 rounded-lg bg-slate-950/80 border border-slate-800 text-[10px] font-mono text-cyan-400 space-y-0.5">
            <div className="font-bold flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-cyan-400" />
              <span>LAN / ZONAS DE USUÁRIO (USER-ID)</span>
            </div>
            <p className="text-slate-400 text-[9px]">5 Estações & Grupos em Topologia de Árvore</p>
          </div>
        </div>

        <div className="absolute top-3 right-3 z-10 pointer-events-none hidden sm:block text-right">
          <div className="px-2.5 py-1.5 rounded-lg bg-slate-950/80 border border-slate-800 text-[10px] font-mono text-emerald-400 space-y-0.5">
            <div className="font-bold flex items-center justify-end gap-1.5">
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>WAN / AUTOPISTAS & NUVENS</span>
            </div>
            <p className="text-slate-400 text-[9px]">4 Rodovias com Globos Holográficos</p>
          </div>
        </div>

        {/* Viewport Control Buttons (Orbit, Reset, Auto-Rotate) */}
        <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-3 py-1.5 rounded-lg border font-mono text-xs flex items-center gap-1.5 transition-all cursor-pointer backdrop-blur-md shadow-md ${
              autoRotate
                ? 'bg-cyan-600 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                : 'bg-slate-950/80 hover:bg-slate-900 border-slate-800 text-slate-300'
            }`}
            title="Ativar/desativar rotação contínua da câmera em 360°"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{autoRotate ? 'Parar Rotação' : 'Rotação 360°'}</span>
          </button>

          <button
            onClick={handleResetCamera}
            className="p-2 rounded-lg bg-slate-950/80 hover:bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-all cursor-pointer backdrop-blur-md shadow-md"
            title="Restaurar ângulo de visão isométrico padrão"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Didactic Floating Guidance Note */}
        <div className="absolute bottom-4 left-4 z-10 max-w-xs p-2.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800 text-[10px] font-mono text-slate-300 hidden md:block">
          <span className="text-cyan-400 font-bold block mb-0.5">💡 Interação 3D:</span>
          <span>Clique e arraste com o mouse para orbitar a arquitetura; use o scroll para zoom.</span>
        </div>

      </div>

      {/* CONTROLS DASHBOARD (INTERACTIVE SIMULATION SETTINGS) */}
      <div className="p-4 sm:p-5 border-t border-slate-800 bg-[#060810] space-y-4 z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* 1. Modo de Regras (Menor Privilégio vs ANY ANY) */}
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
                <span>Matriz de Políticas (Capítulo 5)</span>
              </span>
              <span className="text-[10px] text-slate-500 uppercase">Filtragem</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setRuleMode('restrictive')}
                className={`px-2.5 py-1.5 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
                  ruleMode === 'restrictive'
                    ? 'bg-red-600 text-white shadow-[0_0_10px_rgba(239,68,68,0.4)]'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
                }`}
              >
                Menor Privilégio
              </button>

              <button
                onClick={() => setRuleMode('permissive')}
                className={`px-2.5 py-1.5 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
                  ruleMode === 'permissive'
                    ? 'bg-amber-600 text-white shadow-[0_0_10px_rgba(245,158,11,0.4)]'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
                }`}
              >
                ANY ANY (Inseguro)
              </button>
            </div>
            <p className="text-[10px] text-slate-400 leading-tight">
              {ruleMode === 'restrictive' 
                ? 'Apenas portas e aplicações homologadas por grupo de usuário têm passagem autorizada.' 
                : 'Regra perigosa ANY ANY: libera qualquer origem para qualquer destino.'}
            </p>
          </div>

          {/* 2. Nível de Inspeção (L4 Stateful vs L7 DPI) */}
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>Profundidade (Capítulo 2 & 6)</span>
              </span>
              <span className="text-[10px] text-slate-500 uppercase">Inspeção</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setInspectionMode('l7')}
                className={`px-2.5 py-1.5 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
                  inspectionMode === 'l7'
                    ? 'bg-cyan-600 text-white shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
                }`}
              >
                L7 Deep Packet (DPI)
              </button>

              <button
                onClick={() => setInspectionMode('l4')}
                className={`px-2.5 py-1.5 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
                  inspectionMode === 'l4'
                    ? 'bg-purple-600 text-white shadow-[0_0_10px_rgba(168,85,247,0.4)]'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
                }`}
              >
                L4 Stateful (Porta/IP)
              </button>
            </div>
            <p className="text-[10px] text-slate-400 leading-tight">
              {inspectionMode === 'l7'
                ? 'Inspeciona o payload da aplicação (App-ID) e destrói cavalos de Troia camuflados na porta 443.'
                : 'Apenas avalia cabeçalhos TCP/UDP. Malwares disfarçados de HTTPS passam despercebidos!'}
            </p>
          </div>

          {/* 3. Intensidade de Carga de Tráfego */}
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-amber-400" />
                <span>Vazão de Pacotes (Capítulo 9)</span>
              </span>
              <span className="text-[10px] text-slate-500 uppercase">Throughput</span>
            </div>

            <div className="grid grid-cols-3 gap-1.5">
              {(['normal', 'high', 'surge'] as const).map((rate) => (
                <button
                  key={rate}
                  onClick={() => setTrafficRate(rate)}
                  className={`px-2 py-1.5 rounded-lg font-mono text-[11px] font-bold capitalize transition-all cursor-pointer ${
                    trafficRate === rate
                      ? 'bg-slate-200 text-slate-950 shadow'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
                  }`}
                >
                  {rate === 'normal' ? 'Normal' : rate === 'high' ? 'Pico' : 'Surto'}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-slate-400 leading-tight">
              {trafficRate === 'normal'
                ? 'Volume padrão operacional (10 Gbps com 30% a 50% de headroom).'
                : trafficRate === 'high'
                ? 'Horário de pico: exige maior esforço do hardware ASIC/NPU.'
                : 'Rajada massiva de conexões simultâneas (estresse extremo de CPS e CPU).'}
            </p>
          </div>

        </div>

        {/* Action Buttons Footer: Play/Pause, Reset Counters */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-850">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-mono text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm"
            >
              {isPaused ? <Play className="w-4 h-4 text-emerald-400" /> : <Pause className="w-4 h-4 text-amber-400" />}
              <span>{isPaused ? 'Retomar Fluxo' : 'Pausar Simulação'}</span>
            </button>

            <button
              onClick={handleResetCounters}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white font-mono text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Resetar Métricas</span>
            </button>
          </div>

          <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>
              Status:{' '}
              <strong className="text-white">
                {inspectionMode === 'l7' ? 'DPI L7 Ativo (App-ID + User-ID)' : 'Modo L4 Vulnerável a Ameaças na Porta 443'}
              </strong>
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};
