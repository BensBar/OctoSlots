// Game configuration
const CONFIG = {
    reels: 3,
    symbols: [
        { name: 'NFL Shield', image: './logos/nfl.png', value: 15, isWild: true, isPremium: true },
        { name: 'Trophy', image: './logos/trophy.png', value: 2000, isJackpot: true },
        { name: 'AFC', image: './logos/afc.png', value: 1000, isPremium: true },
        { name: 'NFC', image: './logos/nfc.png', value: 1000, isPremium: true },
        { name: 'Patriots', image: './logos/patriots.png', value: 200 },
        { name: 'Packers', image: './logos/packers.png', value: 200 },
        { name: 'Cowboys', image: './logos/cowboys.png', value: 150 },
        { name: 'Chiefs', image: './logos/chiefs.png', value: 150 },
        { name: 'Eagles', image: './logos/eagles.png', value: 100 },
        { name: 'Bills', image: './logos/bills.png', value: 100 },
        { name: 'Ravens', image: './logos/ravens.png', value: 100 },
        { name: 'Steelers', image: './logos/steelers.png', value: 100 },
        { name: '49ers', image: './logos/49ers.png', value: 75 },
        { name: 'Rams', image: './logos/rams.png', value: 75 },
        { name: 'Bengals', image: './logos/bengals.png', value: 50 },
        { name: 'Titans', image: './logos/titans.png', value: 50 }
    ],
    paylines: 25,
    minBet: 1,
    maxBet: 100,
    spinDuration: 2000,
    reelStopDelay: 500
};

// WebGL renderer initialization
let gl = null;
let useWebGL = false;

const initRenderer = () => {
    try {
        const canvas = document.createElement('canvas');
        gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (gl) {
            useWebGL = true;
            console.log('WebGL renderer initialized');
        } else {
            console.log('WebGL not supported, falling back to DOM rendering');
        }
    } catch (e) {
        console.log('WebGL initialization failed, using DOM rendering');
        useWebGL = false;
    }
};

// Reel animation system
class ReelSystem {
    constructor() {
        this.reels = [];
        this.spinning = false;
        this.useWebGL = useWebGL;
        this.spinPromises = [];
        this.init();
    }

    init() {
        const reelsContainer = document.getElementById('reels-container');
        
        // Create reels dynamically
        for (let i = 0; i < CONFIG.reels; i++) {
            const reel = this.createReel(i);
            reelsContainer.appendChild(reel);
            this.reels.push({
                element: reel,
                symbols: this.getRandomSymbols(3),
                spinning: false
            });
        }
        
        this.updateReelDisplay();
    }

    createReel(index) {
        const reel = document.createElement('div');
        reel.className = 'reel';
        reel.id = `reel-${index}`;
        
        const inner = document.createElement('div');
        inner.className = 'reel-inner';
        
        // Create symbol positions
        for (let i = 0; i < 3; i++) {
            const symbol = document.createElement('div');
            symbol.className = 'symbol';
            symbol.style.top = `${i * 33.33}%`;
            inner.appendChild(symbol);
        }
        
        reel.appendChild(inner);
        return reel;
    }

    getRandomSymbols(count) {
        const symbols = [];
        for (let i = 0; i < count; i++) {
            symbols.push(CONFIG.symbols[Math.floor(Math.random() * CONFIG.symbols.length)]);
        }
        return symbols;
    }

    updateReelDisplay() {
        this.reels.forEach((reel, reelIndex) => {
            const symbolElements = reel.element.querySelectorAll('.symbol');
            reel.symbols.forEach((symbol, symbolIndex) => {
                if (symbolElements[symbolIndex]) {
                    symbolElements[symbolIndex].innerHTML = `<img src="${symbol.image}" alt="${symbol.name}" />`;
                }
            });
        });
    }

    async spin() {
        if (this.spinning) return;
        
        this.spinning = true;
        this.spinPromises = [];
        
        // Start all reels spinning
        this.reels.forEach((reel, index) => {
            reel.element.classList.add('spinning');
            reel.spinning = true;
            
            // Create promise for this reel
            const promise = new Promise((resolve) => {
                setTimeout(() => {
                    this.stopReel(index);
                    resolve();
                }, CONFIG.spinDuration + (index * CONFIG.reelStopDelay));
            });
            
            this.spinPromises.push(promise);
        });
        
        // Wait for all reels to stop
        await Promise.all(this.spinPromises);
        this.spinning = false;
        
        return this.getCurrentSymbols();
    }

    stopReel(index) {
        const reel = this.reels[index];
        if (!reel) return;
        
        reel.element.classList.remove('spinning');
        reel.spinning = false;
        
        // Generate new symbols for this reel
        reel.symbols = this.getRandomSymbols(3);
        
        // Update display
        const symbolElements = reel.element.querySelectorAll('.symbol');
        reel.symbols.forEach((symbol, symbolIndex) => {
            if (symbolElements[symbolIndex]) {
                symbolElements[symbolIndex].innerHTML = `<img src="${symbol.image}" alt="${symbol.name}" />`;
            }
        });
        
        // Play stop sound
        SoundSystem.getInstance().play('stop');
    }

    getCurrentSymbols() {
        return this.reels.map(reel => reel.symbols[1]); // Middle symbol
    }

    highlightWinningSymbols(winningPositions) {
        // Clear previous highlights
        this.clearHighlights();
        
        winningPositions.forEach(position => {
            const reel = this.reels[position.reel];
            if (reel) {
                const symbolElements = reel.element.querySelectorAll('.symbol');
                if (symbolElements[position.symbol]) {
                    symbolElements[position.symbol].classList.add('winning');
                }
            }
        });
    }

    clearHighlights() {
        this.reels.forEach(reel => {
            const symbols = reel.element.querySelectorAll('.symbol');
            symbols.forEach(symbol => symbol.classList.remove('winning'));
        });
    }
}

// Sound system
class SoundSystem {
    static instance = null;
    
    static getInstance() {
        if (!SoundSystem.instance) {
            SoundSystem.instance = new SoundSystem();
        }
        return SoundSystem.instance;
    }

    constructor() {
        this.sounds = new Map();
        this.audioContext = null;
        this.masterVolume = 0.7;
        this.loadSounds();
        this.initAudioContext();
    }

    initAudioContext() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Web Audio API not supported');
        }
    }

    loadSounds() {
        const soundFiles = {
            'spin': './sounds/spin.wav',
            'stop': './sounds/stop.wav',
            'win': './sounds/win.wav',
            'bigwin': './sounds/win3.wav',
            'lose': './sounds/lose.wav'
        };

        Object.entries(soundFiles).forEach(([name, path]) => {
            const audio = new Audio(path);
            audio.preload = 'auto';
            audio.volume = this.masterVolume;
            this.sounds.set(name, audio);
        });
    }

    play(soundName) {
        const sound = this.sounds.get(soundName);
        if (sound) {
            // Reset to start and play
            sound.currentTime = 0;
            sound.play().catch(e => {
                console.log(`Could not play sound ${soundName}:`, e);
            });
        }
    }

    setVolume(volume) {
        this.masterVolume = Math.max(0, Math.min(1, volume));
        this.sounds.forEach(sound => {
            sound.volume = this.masterVolume;
        });
    }
}

// Paytable system
class PaytableSystem {
    constructor() {
        this.paytable = this.generatePaytable();
        this.init();
    }

    generatePaytable() {
        const table = [];
        
        // Jackpot combinations
        const jackpotSymbols = CONFIG.symbols.filter(s => s.isJackpot);
        jackpotSymbols.forEach(symbol => {
            table.push({
                combination: [symbol, symbol, symbol],
                payout: symbol.value,
                type: 'jackpot'
            });
        });

        // Premium combinations
        const premiumSymbols = CONFIG.symbols.filter(s => s.isPremium && !s.isJackpot);
        premiumSymbols.forEach(symbol => {
            table.push({
                combination: [symbol, symbol, symbol],
                payout: symbol.value,
                type: 'premium'
            });
        });

        // Regular combinations
        const regularSymbols = CONFIG.symbols.filter(s => !s.isPremium && !s.isJackpot);
        regularSymbols.forEach(symbol => {
            table.push({
                combination: [symbol, symbol, symbol],
                payout: symbol.value * 10,
                type: 'regular'
            });
        });

        return table;
    }

    init() {
        const paytableElement = document.getElementById('paytable');
        if (paytableElement) {
            this.renderPaytable(paytableElement);
        }
    }

    renderPaytable(container) {
        container.innerHTML = '<h3>PAYTABLE</h3>';
        
        // Show top paying combinations
        const topCombinations = this.paytable
            .sort((a, b) => b.payout - a.payout)
            .slice(0, 8);

        topCombinations.forEach(combo => {
            const item = document.createElement('div');
            item.className = 'paytable-item';
            
            const symbols = document.createElement('div');
            symbols.innerHTML = `<img src="${combo.combination[0].image}" class="paytable-symbol" /> × 3`;
            
            const payout = document.createElement('div');
            payout.className = 'paytable-payout';
            payout.textContent = combo.payout.toLocaleString();
            
            item.appendChild(symbols);
            item.appendChild(payout);
            container.appendChild(item);
        });
    }

    checkWin(symbols) {
        const results = [];
        
        // Check for exact matches
        if (symbols[0].name === symbols[1].name && symbols[1].name === symbols[2].name) {
            const matchingSymbol = symbols[0];
            const combo = this.paytable.find(c => 
                c.combination[0].name === matchingSymbol.name
            );
            
            if (combo) {
                results.push({
                    type: combo.type,
                    payout: combo.payout,
                    symbols: symbols,
                    positions: [
                        { reel: 0, symbol: 1 },
                        { reel: 1, symbol: 1 },
                        { reel: 2, symbol: 1 }
                    ]
                });
            }
        }
        
        // Check for wild combinations
        const wilds = symbols.filter(s => s.isWild);
        if (wilds.length > 0) {
            // Implementation for wild symbol combinations
            // This would be more complex in a real slot machine
        }

        return results;
    }
}

// Main game class
class NFLSlots {
    constructor() {
        this.credits = 1000;
        this.currentBet = CONFIG.minBet;
        this.autoPlay = false;
        this.autoPlayCount = 0;
        
        this.reelSystem = null;
        this.soundSystem = null;
        this.paytableSystem = null;
        
        this.init();
        this.setupEventListeners();
    }

    init() {
        // Initialize WebGL renderer
        initRenderer();
        
        // Initialize game systems
        this.reelSystem = new ReelSystem();
        this.soundSystem = SoundSystem.getInstance();
        this.paytableSystem = new PaytableSystem();
        
        // Update UI
        this.updateCreditsDisplay();
        this.updateBetDisplay();
        
        console.log('NFL 4K Slots initialized');
    }

    setupEventListeners() {
        // Spin button
        const spinButton = document.getElementById('spin-button');
        if (spinButton) {
            spinButton.addEventListener('click', () => this.spin());
        }

        // Bet controls
        const betOneButton = document.getElementById('bet-one');
        if (betOneButton) {
            betOneButton.addEventListener('click', () => this.adjustBet(1));
        }

        const betMaxButton = document.getElementById('bet-max');
        if (betMaxButton) {
            betMaxButton.addEventListener('click', () => this.setBetMax());
        }

        const autoPlayButton = document.getElementById('auto-play');
        if (autoPlayButton) {
            autoPlayButton.addEventListener('click', () => this.toggleAutoPlay());
        }

        // Lever
        const lever = document.getElementById('lever');
        if (lever) {
            lever.addEventListener('click', () => this.pullLever());
        }

        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                this.spin();
            }
        });
    }

    async spin() {
        if (this.reelSystem.spinning) return;
        
        if (this.credits < this.currentBet) {
            this.showMessage('Not enough credits!');
            return;
        }

        // Deduct bet
        this.credits -= this.currentBet;
        this.updateCreditsDisplay();

        // Disable controls during spin
        this.setControlsEnabled(false);

        // Play spin sound
        this.soundSystem.play('spin');

        try {
            // Spin reels
            const symbols = await this.reelSystem.spin();
            
            // Check for wins
            const winResults = this.paytableSystem.checkWin(symbols);
            
            if (winResults.length > 0) {
                await this.handleWin(winResults);
            } else {
                this.soundSystem.play('lose');
            }
        } catch (error) {
            console.error('Spin error:', error);
        } finally {
            // Re-enable controls
            this.setControlsEnabled(true);
            
            // Continue auto play if active
            if (this.autoPlay && this.autoPlayCount > 0) {
                this.autoPlayCount--;
                setTimeout(() => this.spin(), 1000);
            }
        }
    }

    async handleWin(winResults) {
        const totalPayout = winResults.reduce((sum, result) => sum + result.payout, 0);
        
        // Add credits
        this.credits += totalPayout;
        this.updateCreditsDisplay();

        // Highlight winning symbols
        const allPositions = winResults.flatMap(result => result.positions);
        this.reelSystem.highlightWinningSymbols(allPositions);

        // Show win celebration
        this.showWinCelebration(totalPayout);

        // Play win sound
        const winType = winResults.some(r => r.type === 'jackpot') ? 'bigwin' : 'win';
        this.soundSystem.play(winType);

        // Clear highlights after celebration
        setTimeout(() => {
            this.reelSystem.clearHighlights();
        }, 3000);
    }

    showWinCelebration(amount) {
        const celebration = document.createElement('div');
        celebration.className = 'win-celebration';
        celebration.innerHTML = `<div class="win-text">WIN ${amount.toLocaleString()}!</div>`;
        
        document.body.appendChild(celebration);
        
        setTimeout(() => {
            document.body.removeChild(celebration);
        }, 3000);
    }

    showMessage(message) {
        // Simple message display - could be enhanced with a modal
        alert(message);
    }

    adjustBet(amount) {
        const newBet = this.currentBet + amount;
        if (newBet >= CONFIG.minBet && newBet <= CONFIG.maxBet) {
            this.currentBet = newBet;
            this.updateBetDisplay();
        }
    }

    setBetMax() {
        this.currentBet = Math.min(CONFIG.maxBet, this.credits);
        this.updateBetDisplay();
    }

    toggleAutoPlay() {
        this.autoPlay = !this.autoPlay;
        if (this.autoPlay) {
            this.autoPlayCount = 10; // Default auto play count
            this.spin();
        }
        
        const button = document.getElementById('auto-play');
        if (button) {
            button.textContent = this.autoPlay ? 'Stop Auto' : 'Auto Play';
        }
    }

    pullLever() {
        const lever = document.getElementById('lever');
        if (lever) {
            lever.classList.add('pulled');
            setTimeout(() => {
                lever.classList.remove('pulled');
            }, 300);
        }
        
        this.spin();
    }

    setControlsEnabled(enabled) {
        const controls = [
            'spin-button',
            'bet-one', 
            'bet-max',
            'auto-play',
            'lever'
        ];
        
        controls.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.disabled = !enabled;
                if (!enabled) {
                    element.classList.add('loading');
                } else {
                    element.classList.remove('loading');
                }
            }
        });
    }

    updateCreditsDisplay() {
        const creditsElement = document.getElementById('credits');
        if (creditsElement) {
            creditsElement.textContent = this.credits.toLocaleString();
        }
    }

    updateBetDisplay() {
        const betElements = document.querySelectorAll('.bet-display');
        betElements.forEach(element => {
            element.textContent = this.currentBet.toLocaleString();
        });
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const game = new NFLSlots();
    
    // Make game instance globally available for debugging
    window.nflSlots = game;
});

// Export for module systems
export { NFLSlots, CONFIG };