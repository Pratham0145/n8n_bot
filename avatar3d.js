class Avatar3D {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            modelPath: options.modelPath || 'model.glb',
            scale: options.scale || 6,
            enableAudio: options.enableAudio !== false,
            lipSyncSpeed: options.lipSyncSpeed || 1.5,
            lipSyncIntensity: options.lipSyncIntensity || 1.2,
            enableBlinking: options.enableBlinking !== false,
            ...options
        };

        // Three.js variables
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.avatarMesh = null;
        this.mixer = null;
        this.clock = null;

        // Morph target mappings
        this.lipSyncMorphs = {
            'CH': 51, 'DD': 52, 'E': 53, 'FF': 54, 'Laughter': 55,
            'PP': 56, 'RR': 57, 'SS': 58, 'TH': 59, 'aa': 60,
            'ih': 61, 'kk': 62, 'nn': 63, 'oh': 64, 'ou': 65,
            'jawOpen': 24, 'mouthFunnel': 31, 'mouthPucker': 37,
            'mouthSmileLeft': 43, 'mouthSmileRight': 44,
            'mouthStretchLeft': 45, 'mouthStretchRight': 46
        };

        this.eyeBlinkMorphs = {
            'eyeBlinkLeft': 8,
            'eyeBlinkRight': 9
        };

        this.eyeEyebrowMorphs = {
            'browDownLeft': 0,
            'browDownRight': 1,
            'browInnerUp': 2,
            'browOuterUpLeft': 3,
            'browOuterUpRight': 4,
            'eyeLookDownLeft': 10,
            'eyeLookDownRight': 11,
            'eyeLookInLeft': 12,
            'eyeLookInRight': 13,
            'eyeLookOutLeft': 14,
            'eyeLookOutRight': 15,
            'eyeLookUpLeft': 16,
            'eyeLookUpRight': 17,
            'eyeSquintLeft': 18,
            'eyeSquintRight': 19,
            'eyeWideLeft': 20,
            'eyeWideRight': 21
        };

        // Animation variables
        this.currentMorphTargets = {};
        this.targetMorphTargets = {};
        this.smoothingFactor = 0.7;
        this.lipSyncUpdateInterval = null;
        this.blinkInterval = null;
        this.idleAnimationInterval = null;

        // Audio variables
        this.audioContext = null;
        this.analyser = null;
        this.dataArray = null;

        // Speech variables
        this.speechSynthesis = window.speechSynthesis;
        this.utterance = null;
        this.isSpeaking = false;

        // Phoneme data
        this.enhancedPhonemeMapping = {
            'a': { morphs: ['aa', 'jawOpen'], duration: 200, intensity: 0.8 },
            'e': { morphs: ['E', 'mouthStretchLeft', 'mouthStretchRight'], duration: 180, intensity: 0.7 },
            'i': { morphs: ['ih', 'mouthSmileLeft', 'mouthSmileRight'], duration: 160, intensity: 0.6 },
            'o': { morphs: ['oh', 'mouthFunnel'], duration: 220, intensity: 0.9 },
            'u': { morphs: ['ou', 'mouthPucker'], duration: 200, intensity: 0.8 },
            'p': { morphs: ['PP'], duration: 80, intensity: 1.0 },
            'b': { morphs: ['PP'], duration: 80, intensity: 1.0 },
            'm': { morphs: ['PP'], duration: 120, intensity: 0.9 },
            'f': { morphs: ['FF'], duration: 100, intensity: 0.8 },
            'v': { morphs: ['FF'], duration: 100, intensity: 0.8 },
            't': { morphs: ['DD', 'TH'], duration: 60, intensity: 0.7 },
            'd': { morphs: ['DD'], duration: 70, intensity: 0.7 },
            'n': { morphs: ['nn', 'DD'], duration: 90, intensity: 0.6 },
            's': { morphs: ['SS'], duration: 120, intensity: 0.8 },
            'z': { morphs: ['SS'], duration: 120, intensity: 0.8 },
            'th': { morphs: ['TH'], duration: 100, intensity: 0.7 },
            'l': { morphs: ['DD'], duration: 80, intensity: 0.6 },
            'r': { morphs: ['RR'], duration: 90, intensity: 0.7 },
            'k': { morphs: ['kk'], duration: 70, intensity: 0.8 },
            'g': { morphs: ['kk'], duration: 70, intensity: 0.8 },
            'ch': { morphs: ['CH'], duration: 100, intensity: 0.9 },
            'w': { morphs: ['ou', 'mouthPucker'], duration: 120, intensity: 0.8 },
            'y': { morphs: ['ih'], duration: 80, intensity: 0.6 },
            'h': { morphs: ['jawOpen'], duration: 100, intensity: 0.4 }
        };

        this.phonemeSequence = [];
        this.currentPhonemeIndex = 0;
        this.speechStartTime = 0;
        this.estimatedDuration = 0;

        this.init();
    }

    async init() {
        try {
            this.initScene();
            if (this.options.enableAudio) {
                this.initAudioAnalyzer();
            }
            await this.loadAvatar();
            this.setDefaultSmile();
            this.startIdleAnimation();
            this.animate();
            if (this.options.enableBlinking) {
                this.startBlinking();
            }
            return this;
        } catch (error) {
            console.error('Failed to initialize avatar:', error);
            throw error;
        }
    }

    setDefaultSmile() {
        this.setMorphTarget('mouthSmileLeft', 0.3);
        this.setMorphTarget('mouthSmileRight', 0.3);
    }

    startIdleAnimation() {
        if (this.idleAnimationInterval) {
            clearInterval(this.idleAnimationInterval);
        }
        const scheduleNextIdle = () => {
            const nextIdleTime = 3000 + Math.random() * 5000;
            this.idleAnimationInterval = setTimeout(() => {
                if (!this.isSpeaking) {
                    this.idleEyeEyebrowAnimation();
                }
                scheduleNextIdle();
            }, nextIdleTime);
        };
        scheduleNextIdle();
    }

    idleEyeEyebrowAnimation() {
        if (!this.avatarMesh) return;

        const movements = [
            { morph: 'browInnerUp', value: 0.3 },
            { morph: 'browOuterUpLeft', value: 0.2 },
            { morph: 'browOuterUpRight', value: 0.2 },
            { morph: 'eyeLookInLeft', value: 0.3 },
            { morph: 'eyeLookInRight', value: 0.3 },
            { morph: 'eyeLookOutLeft', value: 0.3 },
            { morph: 'eyeLookOutRight', value: 0.3 },
            { morph: 'eyeSquintLeft', value: 0.2 },
            { morph: 'eyeSquintRight', value: 0.2 }
        ];

        const selectedMovement = movements[Math.floor(Math.random() * movements.length)];
        const duration = 500;

        this.avatarMesh.traverse((node) => {
            if (node.isMesh && node.morphTargetInfluences) {
                const morphIndex = this.eyeEyebrowMorphs[selectedMovement.morph];
                if (morphIndex !== undefined) {
                    const initialValue = node.morphTargetInfluences[morphIndex] || 0;
                    const startTime = performance.now();

                    const animateIdle = () => {
                        const elapsed = performance.now() - startTime;
                        if (elapsed < duration) {
                            const progress = elapsed / duration;
                            const value = Math.sin(progress * Math.PI) * selectedMovement.value;
                            node.morphTargetInfluences[morphIndex] = initialValue + value;
                            requestAnimationFrame(animateIdle);
                        } else {
                            node.morphTargetInfluences[morphIndex] = initialValue;
                        }
                    };
                    animateIdle();
                }
            }
        });
    }

    createGradientTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 2048;
        canvas.height = 2048;
        const ctx = canvas.getContext('2d');
        
        const mainGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        mainGradient.addColorStop(0, '#00c3ff');
        mainGradient.addColorStop(1, '#00e676');
        
        ctx.fillStyle = mainGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        const patternSize = 120;
        
        ctx.globalCompositeOperation = 'overlay';
        ctx.fillStyle = 'rgba(0, 213, 255, 0.2)';
        
        for (let x = 0; x < canvas.width; x += patternSize) {
            for (let y = 0; y < canvas.height; y += patternSize) {
                ctx.save();
                ctx.translate(x + patternSize/2, y + patternSize/2);
                ctx.rotate(Math.PI * 3/4);
                ctx.fillRect(-patternSize/4, -patternSize/2, patternSize/2, patternSize);
                ctx.restore();
            }
        }
        
        ctx.fillStyle = 'rgba(0, 255, 150, 0.15)';
        
        for (let x = 0; x < canvas.width; x += patternSize) {
            for (let y = 0; y < canvas.height; y += patternSize) {
                ctx.save();
                ctx.translate(x + patternSize/2, y + patternSize/2);
                ctx.rotate(Math.PI / 4);
                ctx.fillRect(-patternSize/4, -patternSize/2, patternSize/2, patternSize);
                ctx.restore();
            }
        }
        
        ctx.fillStyle = 'rgba(0, 200, 255, 0.1)';
        
        for (let x = 0; x < canvas.width; x += patternSize) {
            for (let y = 0; y < canvas.height; y += patternSize) {
                ctx.beginPath();
                ctx.moveTo(x + patternSize * 0.75, y + patternSize);
                ctx.lineTo(x + patternSize, y + patternSize * 0.75);
                ctx.lineTo(x + patternSize, y + patternSize);
                ctx.closePath();
                ctx.fill();
            }
        }
        
        ctx.fillStyle = 'rgba(0, 200, 255, 0.43)';
        
        for (let x = 0; x < canvas.width; x += patternSize) {
            for (let y = 0; y < canvas.height; y += patternSize) {
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x + patternSize * 0.25, y);
                ctx.lineTo(x, y + patternSize * 0.25);
                ctx.closePath();
                ctx.fill();
            }
        }
        
        ctx.globalCompositeOperation = 'soft-light';
        const radialGlow = ctx.createRadialGradient(
            canvas.width * 0.4, canvas.height * 0.3, 0,
            canvas.width * 0.4, canvas.height * 0.3, canvas.width * 0.8
        );
        radialGlow.addColorStop(0, 'rgba(255,255,255,0.3)');
        radialGlow.addColorStop(0.5, 'rgba(255, 255, 255, 0.06)');
        radialGlow.addColorStop(1, 'rgba(255,255,255,0)');
        
        ctx.fillStyle = radialGlow;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.globalCompositeOperation = 'overlay';
        const waveGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        waveGradient.addColorStop(0, 'rgba(0, 255, 255, 0.34)');
        waveGradient.addColorStop(0.5, 'rgba(0, 106, 255, 0.44)');
        waveGradient.addColorStop(1, 'rgba(0, 255, 255, 0.35)');
        
        ctx.fillStyle = waveGradient;
        
        for (let y = 0; y < canvas.height; y += 40) {
            const waveOffset = Math.sin(y * 0.01) * 30;
            ctx.save();
            ctx.transform(1, 0, Math.sin(y * 0.005) * 0.1, 1, waveOffset, 0);
            ctx.fillRect(0, y, canvas.width, 20);
            ctx.restore();
        }
        
        ctx.globalCompositeOperation = 'multiply';
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
            const noise = (Math.random() - 0.5) * 8;
            data[i] = Math.max(0, Math.min(255, data[i] + noise));
            data[i+1] = Math.max(0, Math.min(255, data[i+1] + noise));
            data[i+2] = Math.max(0, Math.min(255, data[i+2] + noise));
        }
        ctx.putImageData(imageData, 0, 0);
        
        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        
        this.animateTexture(texture);
        
        return texture;
    }

    animateTexture(texture) {
        if (this.textureAnimationId) {
            cancelAnimationFrame(this.textureAnimationId);
        }
        
        let time = 0;
        const animateFrame = () => {
            time += 0.003;
            texture.offset.x = Math.sin(time) * 0.02;
            texture.offset.y = Math.cos(time * 0.7) * 0.015;
            const scale = 1 + Math.sin(time * 0.5) * 0.01;
            texture.repeat.set(scale, scale);
            texture.needsUpdate = true;
            this.textureAnimationId = requestAnimationFrame(animateFrame);
        };
        
        animateFrame();
    }

    initScene() {
        this.scene = new THREE.Scene();
        this.scene.background = this.createGradientTexture();
        this.camera = new THREE.PerspectiveCamera(45, this.container.clientWidth / this.container.clientHeight, 0.1, 1000);
        this.camera.position.set(0, 1.5, 4);
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: false
        });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = false;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.container.appendChild(this.renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        this.scene.add(ambientLight);
        const keyLight = new THREE.DirectionalLight(0xffffff, 0.6);
        keyLight.position.set(0, 2, 2);
        this.scene.add(keyLight);
        const fillLight = new THREE.DirectionalLight(0xffffff, 0.4);
        fillLight.position.set(-1, 1, 1);
        this.scene.add(fillLight);
        const backLight = new THREE.DirectionalLight(0xffffff, 0.3);
        backLight.position.set(0, 1, -1);
        this.scene.add(backLight);

        this.clock = new THREE.Clock();
        window.addEventListener('resize', () => this.onWindowResize());
    }

    loadAvatar() {
        return new Promise((resolve, reject) => {
            const loader = new THREE.GLTFLoader();
            loader.load(
                this.options.modelPath,
                (gltf) => {
                    this.avatarMesh = gltf.scene;
                    this.avatarMesh.scale.set(this.options.scale, this.options.scale, this.options.scale);
                    const box = new THREE.Box3().setFromObject(this.avatarMesh);
                    const center = box.getCenter(new THREE.Vector3());
                    const size = box.getSize(new THREE.Vector3());
                    this.avatarMesh.position.x = -center.x;
                    this.avatarMesh.position.y = -center.y - size.y * 0.09; // Adjust for height
                    this.avatarMesh.position.z = -center.z;
                    this.avatarMesh.traverse((node) => {
                        if (node.isMesh) {
                            if (node.material) {
                                node.material.needsUpdate = true;
                                if (node.material.type === 'MeshBasicMaterial') {
                                    const oldMaterial = node.material;
                                    node.material = new THREE.MeshStandardMaterial({
                                        color: oldMaterial.color,
                                        map: oldMaterial.map,
                                        transparent: oldMaterial.transparent,
                                        opacity: oldMaterial.opacity,
                                        roughness: 0.6,
                                        metalness: 0.1
                                    });
                                }
                            }
                            if (node.morphTargetInfluences && node.morphTargetDictionary) {
                                for (let i = 0; i < node.morphTargetInfluences.length; i++) {
                                    node.morphTargetInfluences[i] = 0;
                                }
                            }
                        }
                    });
                    this.scene.add(this.avatarMesh);
                    this.camera.position.set(0, 0, 4);
                    this.camera.lookAt(0, 0, 0);
                    resolve(this.avatarMesh);
                },
                (progress) => {
                    console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
                },
                (error) => {
                    console.error('Error loading GLB:', error);
                    reject(error);
                }
            );
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.renderer.render(this.scene, this.camera);
        if (this.mixer) {
            this.mixer.update(this.clock.getDelta());
        }
    }

    initAudioAnalyzer() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.analyser = this.audioContext.createAnalyser();
            this.analyser.fftSize = 128;
            this.analyser.smoothingTimeConstant = 0.3;
            this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
        } catch (error) {
            console.warn('Audio analyzer not available:', error);
        }
    }

    textToPhonemes(text) {
        const words = text.toLowerCase().split(/\s+/);
        let phonemes = [];
        words.forEach(word => {
            for (let i = 0; i < word.length; i++) {
                const char = word[i];
                const nextChar = word[i + 1];
                if (char === 't' && nextChar === 'h') {
                    phonemes.push('th');
                    i++;
                } else if (char === 'c' && nextChar === 'h') {
                    phonemes.push('ch');
                    i++;
                } else if (char === 's' && nextChar === 'h') {
                    phonemes.push('s');
                    i++;
                } else if (this.enhancedPhonemeMapping[char]) {
                    phonemes.push(char);
                }
            }
            phonemes.push('pause');
        });
        return phonemes;
    }

    updateMorphTargets(intensity = 0, phoneme = null, audioData = null) {
        if (!this.avatarMesh) return;

        this.targetMorphTargets = {};

        if (intensity > 0) {
            const adjustedIntensity = intensity * this.options.lipSyncIntensity;
            if (phoneme && this.enhancedPhonemeMapping[phoneme]) {
                const phonemeData = this.enhancedPhonemeMapping[phoneme];
                phonemeData.morphs.forEach(morphName => {
                    if (this.lipSyncMorphs[morphName] !== undefined) {
                        let morphIntensity = adjustedIntensity * phonemeData.intensity;
                        if (morphName === 'jawOpen') {
                            morphIntensity *= 1.5; // Increase jawOpen intensity
                        }
                        this.targetMorphTargets[this.lipSyncMorphs[morphName]] = Math.min(morphIntensity, 1.0);
                    }
                });
            } else {
                let baseIntensity = adjustedIntensity;
                if (audioData && audioData.length > 0) {
                    const avgVolume = audioData.reduce((sum, val) => sum + val, 0) / audioData.length;
                    baseIntensity = (avgVolume / 255) * this.options.lipSyncIntensity;
                }
                this.targetMorphTargets[this.lipSyncMorphs.jawOpen] = Math.min(baseIntensity * 1.2, 0.9); // Adjusted jawOpen
                const randomPhonemes = ['aa', 'E', 'oh', 'ih', 'ou'];
                const selectedPhoneme = randomPhonemes[Math.floor(Math.random() * randomPhonemes.length)];
                if (this.lipSyncMorphs[selectedPhoneme] !== undefined) {
                    this.targetMorphTargets[this.lipSyncMorphs[selectedPhoneme]] = Math.min(baseIntensity * 0.7, 0.8);
                }
            }
        } else {
            // Maintain default smile when not speaking
            this.targetMorphTargets[this.lipSyncMorphs.mouthSmileLeft] = 0.3;
            this.targetMorphTargets[this.lipSyncMorphs.mouthSmileRight] = 0.3;
        }

        this.avatarMesh.traverse((node) => {
            if (node.isMesh && node.morphTargetInfluences) {
                for (let i = 0; i < node.morphTargetInfluences.length; i++) {
                    const targetValue = this.targetMorphTargets[i] || 0;
                    const currentValue = node.morphTargetInfluences[i];
                    const transitionSpeed = 1 - this.smoothingFactor;
                    node.morphTargetInfluences[i] = currentValue + (targetValue - currentValue) * transitionSpeed;
                }
            }
        });
    }

    startEnhancedLipSync(text) {
        this.phonemeSequence = this.textToPhonemes(text);
        this.currentPhonemeIndex = 0;
        this.speechStartTime = performance.now();
        this.estimatedDuration = text.length * 80;
        const updateInterval = 30 / this.options.lipSyncSpeed;
        this.lipSyncUpdateInterval = setInterval(() => {
            const elapsed = performance.now() - this.speechStartTime;
            const progress = elapsed / this.estimatedDuration;
            const phonemeIndex = Math.floor(progress * this.phonemeSequence.length);
            const currentPhoneme = this.phonemeSequence[Math.min(phonemeIndex, this.phonemeSequence.length - 1)];
            let audioData = null;
            if (this.analyser && this.dataArray) {
                this.analyser.getByteFrequencyData(this.dataArray);
                audioData = Array.from(this.dataArray);
            }
            let intensity = 0.5 + Math.random() * 0.3;
            if (audioData) {
                const avgVolume = audioData.reduce((sum, val) => sum + val, 0) / audioData.length;
                intensity = Math.max(0.2, avgVolume / 255);
            }
            if (currentPhoneme === 'pause') {
                this.updateMorphTargets(0.1, null, audioData);
            } else {
                this.updateMorphTargets(intensity, currentPhoneme, audioData);
            }
        }, updateInterval);
    }

    stopLipSync() {
        if (this.lipSyncUpdateInterval) {
            clearInterval(this.lipSyncUpdateInterval);
            this.lipSyncUpdateInterval = null;
        }
        const resetInterval = setInterval(() => {
            this.updateMorphTargets(0);
            let allAtRest = true;
            if (this.avatarMesh) {
                this.avatarMesh.traverse((node) => {
                    if (node.isMesh && node.morphTargetInfluences) {
                        for (let i = 0; i < node.morphTargetInfluences.length; i++) {
                            if (i === this.lipSyncMorphs.mouthSmileLeft || i === this.lipSyncMorphs.mouthSmileRight) {
                                continue; // Skip smile morphs
                            }
                            if (Math.abs(node.morphTargetInfluences[i]) > 0.01) {
                                allAtRest = false;
                                break;
                            }
                        }
                    }
                });
            }
            if (allAtRest) {
                clearInterval(resetInterval);
                this.setDefaultSmile();
            }
        }, 30);
    }

    blinkEyes() {
        if (!this.avatarMesh) return;
        const blinkDuration = 150;
        const blinkStrength = 1.0;
        this.avatarMesh.traverse((node) => {
            if (node.isMesh && node.morphTargetInfluences) {
                const leftEyeIndex = this.eyeBlinkMorphs.eyeBlinkLeft;
                const rightEyeIndex = this.eyeBlinkMorphs.eyeBlinkRight;
                if (leftEyeIndex !== -1 && rightEyeIndex !== -1) {
                    const initialLeft = node.morphTargetInfluences[leftEyeIndex];
                    const initialRight = node.morphTargetInfluences[rightEyeIndex];
                    const startTime = performance.now();
                    const animateBlink = () => {
                        const elapsed = performance.now() - startTime;
                        if (elapsed < blinkDuration) {
                            const progress = elapsed / blinkDuration;
                            const blinkValue = Math.sin(progress * Math.PI) * blinkStrength;
                            node.morphTargetInfluences[leftEyeIndex] = Math.max(initialLeft, blinkValue);
                            node.morphTargetInfluences[rightEyeIndex] = Math.max(initialRight, blinkValue);
                            requestAnimationFrame(animateBlink);
                        } else {
                            node.morphTargetInfluences[leftEyeIndex] = initialLeft;
                            node.morphTargetInfluences[rightEyeIndex] = initialRight;
                        }
                    };
                    animateBlink();
                }
            }
        });
    }

    startBlinking() {
        if (this.blinkInterval) clearInterval(this.blinkInterval);
        const scheduleNextBlink = () => {
            const nextBlinkTime = 2000 + Math.random() * 4000;
            this.blinkInterval = setTimeout(() => {
                this.blinkEyes();
                scheduleNextBlink();
            }, nextBlinkTime);
        };
        scheduleNextBlink();
    }

    stopBlinking() {
        if (this.blinkInterval) {
            clearTimeout(this.blinkInterval);
            this.blinkInterval = null;
        }
    }

    speak(text, voice = null) {
        return new Promise((resolve, reject) => {
            if (this.isSpeaking) {
                reject(new Error('Avatar is already speaking'));
                return;
            }
            if (!text.trim()) {
                reject(new Error('No text provided'));
                return;
            }
            this.utterance = new SpeechSynthesisUtterance(text);
            const voices = speechSynthesis.getVoices();
            const heeraVoice = voices.find(voice => 
                voice.name === 'Microsoft Heera - English (India)' || 
                voice.name.includes('Heera') && voice.lang === 'en-IN'
            );
            if (heeraVoice) this.utterance.voice = heeraVoice;
            this.utterance.rate = 0.9;
            this.utterance.pitch = 1.0;
            this.utterance.onstart = () => {
                this.isSpeaking = true;
                this.startEnhancedLipSync(text);
                this.stopBlinking();
                this.stopIdleAnimation();
            };
            this.utterance.onend = () => {
                this.isSpeaking = false;
                this.stopLipSync();
                if (this.options.enableBlinking) {
                    this.startBlinking();
                }
                this.startIdleAnimation();
                resolve();
            };
            this.utterance.onerror = (event) => {
                console.error('SpeechSynthesis error:', event);
                this.isSpeaking = false;
                this.stopLipSync();
                if (this.options.enableBlinking) {
                    this.startBlinking();
                }
                this.startIdleAnimation();
                reject(event);
            };
            this.speechSynthesis.speak(this.utterance);
        });
    }

    stopSpeaking() {
        if (this.isSpeaking) {
            this.speechSynthesis.cancel();
            this.isSpeaking = false;
            this.stopLipSync();
            if (this.options.enableBlinking) {
                this.startBlinking();
            }
            this.startIdleAnimation();
        }
    }

    stopIdleAnimation() {
        if (this.idleAnimationInterval) {
            clearTimeout(this.idleAnimationInterval);
            this.idleAnimationInterval = null;
        }
    }

    updateSettings(newSettings) {
        this.options = { ...this.options, ...newSettings };
        if (newSettings.backgroundColors) {
            this.scene.background = this.createGradientTexture();
        }
    }

    setMorphTarget(morphName, value) {
        if (!this.avatarMesh) return;
        const morphIndex = this.lipSyncMorphs[morphName] || this.eyeBlinkMorphs[morphName] || this.eyeEyebrowMorphs[morphName];
        if (morphIndex === undefined) return;
        this.avatarMesh.traverse((node) => {
            if (node.isMesh && node.morphTargetInfluences) {
                node.morphTargetInfluences[morphIndex] = Math.max(0, Math.min(1, value));
            }
        });
    }

    getVoices() {
        return this.speechSynthesis.getVoices();
    }

    onWindowResize() {
        this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    }

    destroy() {
        this.stopSpeaking();
        this.stopBlinking();
        this.stopIdleAnimation();
        this.stopLipSync();
        if (this.renderer && this.container.contains(this.renderer.domElement)) {
            this.container.removeChild(this.renderer.domElement);
        }
        if (this.audioContext) {
            this.audioContext.close();
        }
    }
}

if (typeof exports !== 'undefined' && typeof module !== 'undefined' && module.exports) {
    module.exports = Avatar3D;
} else if (typeof define === 'function' && define.amd) {
    define([], function() { return Avatar3D; });
} else {
    window.Avatar3D = Avatar3D;
}