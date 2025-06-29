// NFL Slots Game - Enhanced Slot Machine Experience
class NFLSlots {
  constructor() {
    this.credits = 1000;
    this.bet = 25;
    this.maxBet = 100;
    this.minBet = 5;
    this.isSpinning = false;
    this.autoplay = false;
    this.autoplaySpins = 0;
    this.maxAutoplaySpins = 10;

    // Game elements
    this.elements = {
      reels: [
        document.getElementById('reel1'),
        document.getElementById('reel2'),
        document.getElementById('reel3')
      ],
      spinButton: document.querySelector('.spin-button'),
      leverHandle: document.querySelector('.lever-handle'),
      creditsDisplay: document.getElementById('credits'),
      betDisplay: document.getElementById('bet-amount'),
      winDisplay: document.getElementById('win-amount'),
      jackpotDisplay: document.getElementById('jackpot'),
      winOverlay: document.getElementById('winOverlay'),
      paytable: document.querySelector('.paytable'),
      paytableButton: document.querySelector('.paytable-button'),
      paytableClose: document.querySelector('.paytable-close'),
      betUpButton: document.querySelector('.bet-up'),
      betDownButton: document.querySelector('.bet-down'),
      maxBetButton: document.querySelector('.max-bet'),
      autoplayButton: document.querySelector('.autoplay-button'),
      ledLights: document.querySelectorAll('.led-light'),
      paylines: document.querySelectorAll('.payline')
    };

    // NFL Teams data
    this.teams = [
      { name: 'NFL Shield', image: './logos/nfl.png', value: 15, isWild: true, isPremium: true },
      { name: 'Trophy', image: './logos/trophy.png', value: 2000, isJackpot: true },
      { name: 'AFC', image: './logos/afc.png', value: 1000, isPremium: true },
      { name: 'NFC', image: './logos/nfc.png', value: 1000, isPremium: true },
      { name: 'Falcons', image: './logos/falcons.png', value: 100 },
      { name: 'Patriots', image: './logos/patriots.png', value: 150 },
      { name: 'Packers', image: './logos/packers.png', value: 125 },
      { name: 'Cowboys', image: './logos/cowboys.png', value: 125 },
      { name: 'Steelers', image: './logos/steelers.png', value: 125 },
      { name: '49ers', image: './logos/49ers.png', value: 110 },
      { name: 'Chiefs', image: './logos/chiefs.png', value: 140 },
      { name: 'Eagles', image: './logos/eagles.png', value: 130 }
    ];

    // Sound system
    this.sounds = {
      spin: null,
      stop: null,
      win: null,
      bigWin: null,
      jackpot: null,
      coin: null,
      lever: null
    };

    // Animation settings
    this.spinDuration = 2000;
    this.reelStopDelay = 300;
    this.jackpot = 50000;

    this.init();
  }

  init() {
    this.initSounds();
    this.initEventListeners();
    this.initReels();
    this.updateDisplays();
    this.createPaylines();

    // Initialize LED lights
    this.startIdleLights();
  }

  initSounds() {
    // Create audio elements for sound effects
    const soundFiles = {
      spin: 'sounds/spin.wav',
      stop: 'sounds/stop.wav',
      win: 'sounds/win.wav',
      bigWin: 'sounds/win3.wav',
      jackpot: 'sounds/Ben.wav',
      coin: 'sounds/win.wav',
      lever: 'sounds/stop.wav'
    };

    Object.entries(soundFiles).forEach(([key, file]) => {
      this.sounds[key] = new Audio(file);
      this.sounds[key].preload = 'auto';
      this.sounds[key].volume = 0.7;

      // Error handling for missing sound files
      this.sounds[key].onerror = () => {
        console.warn(`Sound file not found: ${file}`);
        this.sounds[key] = null;
      };
    });
  }

  playSound(soundName) {
    if (this.sounds[soundName]) {
      this.sounds[soundName].currentTime = 0;
      this.sounds[soundName].play().catch(e => {
        console.warn(`Failed to play sound: ${soundName}`, e);
      });
    }
  }

  initEventListeners() {
    // Spin button
    this.elements.spinButton?.addEventListener('click', () => this.spin());

    // Lever handle
    this.elements.leverHandle?.addEventListener('click', () => this.pullLever());

    // Betting controls
    this.elements.betUpButton?.addEventListener('click', () => this.adjustBet(5));
    this.elements.betDownButton?.addEventListener('click', () => this.adjustBet(-5));
    this.elements.maxBetButton?.addEventListener('click', () => this.setMaxBet());

    // Autoplay
    this.elements.autoplayButton?.addEventListener('click', () => this.toggleAutoplay());

    // Paytable
    this.elements.paytableButton?.addEventListener('click', () => this.showPaytable());
    this.elements.paytableClose?.addEventListener('click', () => this.hidePaytable());

    // Keyboard controls
    document.addEventListener('keydown', (e) => this.handleKeydown(e));

    // Prevent context menu on game elements
    document.addEventListener('contextmenu', (e) => {
      if (e.target.closest('.slot-machine')) {
        e.preventDefault();
      }
    });
  }

  handleKeydown(e) {
    switch(e.code) {
      case 'Space':
        e.preventDefault();
        this.spin();
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.adjustBet(5);
        break;
      case 'ArrowDown':
        e.preventDefault();
        this.adjustBet(-5);
        break;
      case 'KeyM':
        this.setMaxBet();
        break;
      case 'KeyA':
        this.toggleAutoplay();
        break;
      case 'KeyP':
        this.togglePaytable();
        break;
    }
  }

  initReels() {
    this.elements.reels.forEach((reel, index) => {
      if (reel) {
        const track = reel.querySelector('.symbol-track');
        if (track) {
          this.setReelSymbols(index, this.getRandomReelSymbols());
        }
      }
    });
  }

  createPaylines() {
    if (!this.elements.paylines.length) {
      const reelsContainer = document.querySelector('.reels-container');
      if (reelsContainer) {
        // Create 3 horizontal paylines
        for (let i = 1; i <= 3; i++) {
          const payline = document.createElement('div');
          payline.className = `payline line-${i}`;
          payline.setAttribute('data-line', i);
          reelsContainer.appendChild(payline);
        }
        this.elements.paylines = document.querySelectorAll('.payline');
      }
    }
  }

  getRandomSymbol() {
    return this.teams[Math.floor(Math.random() * this.teams.length)];
  }

  getRandomReelSymbols() {
    return [this.getRandomSymbol(), this.getRandomSymbol(), this.getRandomSymbol()];
  }

  setReelSymbols(reelIndex, symbols) {
    const reel = this.elements.reels[reelIndex];
    if (!reel) return;

    const track = reel.querySelector('.symbol-track');
    if (!track) return;

    track.innerHTML = symbols.map(symbol => 
      `<img src="${symbol.image}" alt="${symbol.name}" data-symbol="${symbol.name}" 
            onerror="this.src='./logos/nfl.png'" loading="lazy">`
    ).join('');
  }

  adjustBet(amount) {
    if (this.isSpinning) return;

    const newBet = Math.max(this.minBet, Math.min(this.maxBet, this.bet + amount));
    if (newBet !== this.bet) {
      this.bet = newBet;
      this.updateDisplays();
      this.playSound('coin');
    }
  }

  setMaxBet() {
    if (this.isSpinning) return;

    this.bet = this.maxBet;
    this.updateDisplays();
    this.playSound('coin');
  }

  toggleAutoplay() {
    this.autoplay = !this.autoplay;

    if (this.autoplay) {
      this.autoplaySpins = this.maxAutoplaySpins;
      this.elements.autoplayButton?.classList.add('active');
      this.elements.autoplayButton && (this.elements.autoplayButton.textContent = `Auto (${this.autoplaySpins})`);
      this.autoSpin();
    } else {
      this.autoplaySpins = 0;
      this.elements.autoplayButton?.classList.remove('active');
      this.elements.autoplayButton && (this.elements.autoplayButton.textContent = 'Auto Play');
    }
  }

  async autoSpin() {
    if (!this.autoplay || this.autoplaySpins <= 0) {
      this.autoplay = false;
      this.elements.autoplayButton?.classList.remove('active');
      this.elements.autoplayButton && (this.elements.autoplayButton.textContent = 'Auto Play');
      return;
    }

    await this.spin(true);

    if (this.autoplay && this.autoplaySpins > 0) {
      setTimeout(() => this.autoSpin(), 1000);
    }
  }

  pullLever() {
    if (this.isSpinning) return;

    const lever = this.elements.leverHandle;
    if (lever) {
      lever.classList.add('pulled');
      this.playSound('lever');

      setTimeout(() => {
        lever.classList.remove('pulled');
        this.spin();
      }, 200);
    }
  }

  updateDisplays() {
    this.elements.creditsDisplay && (this.elements.creditsDisplay.textContent = `${this.credits.toLocaleString()}`);
    this.elements.betDisplay && (this.elements.betDisplay.textContent = `${this.bet}`);
    this.elements.jackpotDisplay && (this.elements.jackpotDisplay.textContent = this.jackpot.toLocaleString());
  }

  calculateWin(grid) {
    const lines = [
      [[0,0],[1,0],[2,0]], // Top row
      [[0,1],[1,1],[2,1]], // Middle row
      [[0,2],[1,2],[2,2]], // Bottom row
      [[0,0],[1,1],[2,2]], // Diagonal top-left to bottom-right
      [[2,0],[1,1],[0,2]]  // Diagonal top-right to bottom-left
    ];

    let totalWin = 0;
    let winningLines = [];
    let winType = 'no-win';

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      const line = lines[lineIndex];
      const symbols = line.map(([c,r]) => grid[c][r]);

      // Handle wild cards
      const wilds = symbols.filter(s => s.isWild).length;
      const nonWilds = symbols.filter(s => !s.isWild);

      if (nonWilds.length === 0) continue; // All wilds (shouldn't happen with current setup)

      const baseSymbol = nonWilds[0];
      const matchingSymbols = nonWilds.filter(s => s.name === baseSymbol.name).length + wilds;

      if (matchingSymbols === 3) {
        // Three of a kind
        let lineWin = 0;

        if (baseSymbol.isJackpot) {
          lineWin = this.jackpot;
          winType = 'jackpot';
        } else if (baseSymbol.isPremium) {
          lineWin = baseSymbol.value * this.bet / 5; // Scale with bet
          winType = 'premium';
        } else {
          lineWin = baseSymbol.value * this.bet / 5;
          winType = 'three-match';
        }

        totalWin += lineWin;
        winningLines.push({ line: lineIndex, symbols, win: lineWin });
      } else if (matchingSymbols === 2) {
        // Two of a kind
        const lineWin = Math.floor(baseSymbol.value * this.bet / 20);
        totalWin += lineWin;
        winningLines.push({ line: lineIndex, symbols, win: lineWin });
        if (winType === 'no-win') winType = 'two-match';
      }
    }

    return { 
      win: totalWin, 
      type: winType, 
      lines: winningLines,
      multiplier: this.bet / 5
    };
  }

  async spin(isAutoplay = false) {
    if (this.isSpinning) return;
    if (this.credits < this.bet) {
      this.showMessage('Not enough credits!');
      this.autoplay = false;
      return;
    }

    // Deduct bet
    this.credits -= this.bet;
    if (this.autoplay) {
      this.autoplaySpins--;
      this.elements.autoplayButton && (this.elements.autoplayButton.textContent = `Auto (${this.autoplaySpins})`);
    }

    this.isSpinning = true;
    this.elements.spinButton && (this.elements.spinButton.disabled = true);
    this.updateDisplays();

    // Clear previous win state
    this.hideWinOverlay();
    this.clearSymbolHighlights();
    this.hidePaylines();

    // Start spinning effects
    this.startSpinEffects();
    this.playSound('spin');

    // Generate final result
    const finalGrid = [
      this.getRandomReelSymbols(),
      this.getRandomReelSymbols(), 
      this.getRandomReelSymbols()
    ];

    // Spin each reel with staggered stops
    const spinPromises = this.elements.reels.map(async (reel, index) => {
      const track = reel.querySelector('.symbol-track');
      if (!track) return;

      track.classList.add('spinning');

      // Wait for reel-specific delay
      await this.delay(this.spinDuration + (index * this.reelStopDelay));

      // Stop spinning and set final symbols
      track.classList.remove('spinning');
      track.classList.add('decelerating');

      // Set final symbols
      this.setReelSymbols(index, finalGrid[index]);
      this.playSound('stop');

      // Remove deceleration class after animation
      setTimeout(() => {
        track.classList.remove('decelerating');
      }, 1500);
    });

    // Wait for all reels to stop
    await Promise.all(spinPromises);

    // Stop spinning effects
    this.stopSpinEffects();

    // Calculate and handle win
    const result = this.calculateWin(finalGrid);
    await this.handleWinResult(result, finalGrid);

    // Re-enable controls
    this.isSpinning = false;
    this.elements.spinButton && (this.elements.spinButton.disabled = false);
  }

  async handleWinResult(result, grid) {
    if (result.win > 0) {
      // Add winnings to credits
      this.credits += result.win;

      // Show win animations
      await this.showWinEffects(result, grid);

      // Update win display
      this.elements.winDisplay && (this.elements.winDisplay.textContent = result.win.toLocaleString());

      // Play appropriate win sound
      if (result.type === 'jackpot') {
        this.playSound('jackpot');
      } else if (result.win > this.bet * 10) {
        this.playSound('bigWin');
      } else {
        this.playSound('win');
      }

      // Show coin animation
      this.animateCoins(result.win);
    }

    this.updateDisplays();
  }

  async showWinEffects(result, grid) {
    // Highlight winning paylines
    result.lines.forEach(winLine => {
      if (winLine.line < this.elements.paylines.length) {
        this.elements.paylines[winLine.line].classList.add('active');
      }
    });

    // Highlight winning symbols
    result.lines.forEach(winLine => {
      const linePositions = [
        [[0,0],[1,0],[2,0]], // Top row
        [[0,1],[1,1],[2,1]], // Middle row  
        [[0,2],[1,2],[2,2]], // Bottom row
        [[0,0],[1,1],[2,2]], // Diagonal
        [[2,0],[1,1],[0,2]]  // Diagonal
      ];

      if (winLine.line < linePositions.length) {
        linePositions[winLine.line].forEach(([reelIndex, symbolIndex]) => {
          const reel = this.elements.reels[reelIndex];
          if (reel) {
            const symbols = reel.querySelectorAll('.symbol-track img');
            if (symbols[symbolIndex]) {
              symbols[symbolIndex].classList.add('win');
            }
          }
        });
      }
    });

    // Show win overlay
    this.showWinOverlay(result);

    // Flash LED lights
    this.startWinLights();

    // Auto-hide after delay
    setTimeout(() => {
      this.hideWinOverlay();
      this.hidePaylines();
      this.clearSymbolHighlights();
      this.stopWinLights();
    }, 3000);
  }

  showWinOverlay(result) {
    if (!this.elements.winOverlay) return;

    let message = '';
    switch(result.type) {
      case 'jackpot':
        message = `🏆 JACKPOT! 🏆<br>${result.win.toLocaleString()} CREDITS!`;
        break;
      case 'premium':
        message = `💎 BIG WIN! 💎<br>${result.win.toLocaleString()} CREDITS!`;
        break;
      case 'three-match':
        message = `🎉 THREE OF A KIND! 🎉<br>${result.win.toLocaleString()} CREDITS!`;
        break;
      default:
        message = `WIN!<br>${result.win.toLocaleString()} CREDITS!`;
    }

    this.elements.winOverlay.innerHTML = message;
    this.elements.winOverlay.classList.add('visible');
  }

  hideWinOverlay() {
    this.elements.winOverlay?.classList.remove('visible');
  }

  hidePaylines() {
    this.elements.paylines.forEach(payline => {
      payline.classList.remove('active');
    });
  }

  clearSymbolHighlights() {
    this.elements.reels.forEach(reel => {
      const symbols = reel.querySelectorAll('.symbol-track img');
      symbols.forEach(symbol => symbol.classList.remove('win'));
    });
  }

  animateCoins(amount) {
    const coinCount = Math.min(Math.floor(amount / 100), 20); // Max 20 coins
    const container = document.querySelector('.slot-machine-container');

    if (!container) return;

    for (let i = 0; i < coinCount; i++) {
      setTimeout(() => {
        const coin = document.createElement('div');
        coin.className = 'coin-animation';
        coin.style.left = `${Math.random() * 80 + 10}%`;
        coin.style.top = `70%`;
        container.appendChild(coin);

        setTimeout(() => {
          coin.remove();
        }, 1000);
      }, i * 100);
    }
  }

  startSpinEffects() {
    this.startSpinLights();
  }

  stopSpinEffects() {
    this.stopSpinLights();
  }

  startIdleLights() {
    this.lightInterval = setInterval(() => {
      this.elements.ledLights.forEach((light, index) => {
        light.classList.toggle('on', Math.random() > 0.7);
      });
    }, 2000);
  }

  startSpinLights() {
    this.stopIdleLights();

    let index = 0;
    this.spinLightInterval = setInterval(() => {
      this.elements.ledLights.forEach((light, i) => {
        light.classList.toggle('on', i === index % this.elements.ledLights.length);
      });
      index++;
    }, 100);
  }

  stopSpinLights() {
    if (this.spinLightInterval) {
      clearInterval(this.spinLightInterval);
      this.spinLightInterval = null;
    }
    this.startIdleLights();
  }

  startWinLights() {
    this.stopIdleLights();

    this.winLightInterval = setInterval(() => {
      this.elements.ledLights.forEach(light => {
        light.classList.toggle('win', Math.random() > 0.3);
      });
    }, 150);
  }

  stopWinLights() {
    if (this.winLightInterval) {
      clearInterval(this.winLightInterval);
      this.winLightInterval = null;
    }

    this.elements.ledLights.forEach(light => {
      light.classList.remove('win');
    });

    this.startIdleLights();
  }

  stopIdleLights() {
    if (this.lightInterval) {
      clearInterval(this.lightInterval);
      this.lightInterval = null;
    }
  }

  showPaytable() {
    this.elements.paytable?.classList.add('visible');
  }

  hidePaytable() {
    this.elements.paytable?.classList.remove('visible');
  }

  togglePaytable() {
    if (this.elements.paytable?.classList.contains('visible')) {
      this.hidePaytable();
    } else {
      this.showPaytable();
    }
  }

  showMessage(message) {
    // Create temporary message overlay
    const messageDiv = document.createElement('div');
    messageDiv.className = 'win-overlay visible';
    messageDiv.textContent = message;
    messageDiv.style.fontSize = '24px';
    messageDiv.style.padding = '20px 30px';

    const container = document.querySelector('.slot-machine');
    if (container) {
      container.appendChild(messageDiv);

      setTimeout(() => {
        messageDiv.remove();
      }, 2000);
    }
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Utility method to handle requestAnimationFrame optimization
  animate(callback) {
    const animate = (timestamp) => {
      callback(timestamp);
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }

  // Error handling for missing assets
  handleAssetError(asset, fallback) {
    console.warn(`Asset failed to load: ${asset}, using fallback: ${fallback}`);
    return fallback;
  }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Check if we're on the NFL slots page
  if (document.querySelector('.slot-machine')) {
    window.nflSlots = new NFLSlots();
  }
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NFLSlots;
}
