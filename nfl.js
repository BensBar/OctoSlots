<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover, minimal-ui">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="apple-mobile-web-app-title" content="NFL Slots">
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="theme-color" content="#013369">
  <title>NFL Slots - Championship Slot Machine</title>
  <style>
    :root {
      /* NFL Theme Colors */
      --nfl-blue: #013369;
      --nfl-red: #D50A0A;
      --nfl-silver: #A5ACAF;
      --nfl-gold: #FFB612;
      --primary-bg: linear-gradient(135deg, #000000 0%, #1a1a2e 50%, #16213e 100%);
      --secondary-bg: #111827;
      --machine-body: linear-gradient(145deg, #2d3748, #1a202c);
      --machine-face: #000000;
      --chrome: #4a5568;
      --gold: #FFB612;
      --red-led: #DC2626;
      --green-led: #10B981;
      --blue-led: #3B82F6;
      --border-color: #374151;
      --text-color: #FFFFFF;
      --highlight-color: #FFB612;
      --win-color: #10B981;
      --jackpot-color: #FFB612;
      --machine-width: 1000px;
      --machine-height: 1100px;
      --vh: calc(var(--vh, 1vh) * 100);
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Arial Black', Arial, sans-serif;
      background: var(--primary-bg);
      color: var(--text-color);
      overflow-x: hidden;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px;
    }

    .game-container {
      width: 100%;
      max-width: var(--machine-width);
      height: 100vh;
      max-height: var(--machine-height);
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
    }

    .slot-machine {
      width: 100%;
      max-width: 900px;
      background: var(--machine-body);
      border: 8px solid var(--nfl-silver);
      border-top: none;
      border-radius: 0 0 25px 25px;
      padding: 30px;
      box-shadow: 
        0 0 50px rgba(255, 182, 18, 0.3),
        inset 0 0 30px rgba(0, 0, 0, 0.5),
        0 25px 50px rgba(0, 0, 0, 0.8);
      position: relative;
      backdrop-filter: blur(10px);
      animation: machineGlow 3s ease-in-out infinite alternate;
    }

    @keyframes machineGlow {
      0% { box-shadow: 0 0 50px rgba(255, 182, 18, 0.3), inset 0 0 30px rgba(0, 0, 0, 0.5), 0 25px 50px rgba(0, 0, 0, 0.8); }
      100% { box-shadow: 0 0 80px rgba(255, 182, 18, 0.5), inset 0 0 30px rgba(0, 0, 0, 0.5), 0 25px 50px rgba(0, 0, 0, 0.8); }
    }

    .machine-header {
      text-align: center;
      margin-bottom: 30px;
      position: relative;
      margin-top: -15px;
    }

    .nfl-logo {
      width: 120px;
      height: auto;
      margin-bottom: 15px;
      filter: drop-shadow(0 0 20px rgba(255, 182, 18, 0.8));
      animation: logoFloat 2s ease-in-out infinite alternate;
      position: relative;
      z-index: 10;
      margin-top: -25px;
    }

    @keyframes logoFloat {
      0% { transform: translateY(0px); }
      100% { transform: translateY(-5px); }
    }

    .machine-title {
      font-size: clamp(24px, 4vw, 36px);
      font-weight: 900;
      color: var(--nfl-gold);
      text-shadow: 
        2px 2px 4px rgba(0, 0, 0, 0.8),
        0 0 20px rgba(255, 182, 18, 0.6);
      margin-bottom: 10px;
      letter-spacing: 2px;
    }

    .jackpot-display {
      font-size: clamp(16px, 2.5vw, 24px);
      font-weight: bold;
      color: var(--jackpot-color);
      text-shadow: 0 0 15px rgba(255, 182, 18, 0.8);
      background: linear-gradient(45deg, rgba(0, 0, 0, 0.8), rgba(30, 30, 60, 0.8));
      padding: 10px 20px;
      border-radius: 15px;
      border: 3px solid var(--nfl-gold);
      animation: jackpotPulse 2s ease-in-out infinite;
    }

    @keyframes jackpotPulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }

    .led-lights {
      position: absolute;
      top: -15px;
      left: 20px;
      right: 20px;
      height: 30px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      z-index: 10;
    }

    .led-light {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #333;
      border: 2px solid var(--chrome);
      box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.8);
      transition: all 0.3s ease;
    }

    .led-light.on {
      background: var(--red-led);
      box-shadow: 
        0 0 20px var(--red-led),
        0 0 40px var(--red-led),
        inset 0 0 8px rgba(255, 255, 255, 0.3);
    }

    .led-light:nth-child(2n).on {
      background: var(--blue-led);
      box-shadow: 
        0 0 20px var(--blue-led),
        0 0 40px var(--blue-led),
        inset 0 0 8px rgba(255, 255, 255, 0.3);
    }

    .led-light:nth-child(3n).on {
      background: var(--green-led);
      box-shadow: 
        0 0 20px var(--green-led),
        0 0 40px var(--green-led),
        inset 0 0 8px rgba(255, 255, 255, 0.3);
    }

    .led-light.win {
      background: var(--nfl-gold);
      box-shadow: 
        0 0 20px var(--nfl-gold),
        0 0 40px var(--nfl-gold),
        inset 0 0 8px rgba(255, 255, 255, 0.3);
      animation: winLightPulse 0.15s ease-in-out infinite alternate;
    }

    @keyframes winLightPulse {
      0% { opacity: 0.6; }
      100% { opacity: 1; }
    }

    .reels-container {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin: 30px 0;
      padding: 25px;
      background: linear-gradient(145deg, #000000, #1a1a2e);
      border: 6px solid var(--nfl-silver);
      border-radius: 20px;
      box-shadow: 
        inset 0 0 30px rgba(0, 0, 0, 0.8),
        0 0 20px rgba(255, 182, 18, 0.2);
      position: relative;
      overflow: hidden;
    }

    .reel {
      height: 240px;
      background: linear-gradient(180deg, #1a1a2e 0%, #000000 50%, #1a1a2e 100%);
      border: 4px solid var(--chrome);
      border-radius: 15px;
      overflow: hidden;
      position: relative;
      box-shadow: 
        inset 0 0 20px rgba(0, 0, 0, 0.8),
        0 0 15px rgba(255, 182, 18, 0.1);
    }

    /* FIXED: Enhanced symbol track for seamless spinning */
    .symbol-track {
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: space-around;
      align-items: center;
      padding: 0;
      transition: transform 0.1s ease;
      position: relative;
    }

    .symbol-track.spinning {
      animation: reelSpinSmooth 0.15s linear infinite;
      filter: blur(3px);
      transition: filter 0.3s;
    }

    .symbol-track.decelerating {
      filter: blur(0px);
      transition: filter 0.3s;
    }

    /* FIXED: Smooth continuous spinning animation */
    @keyframes reelSpinSmooth {
      0% { transform: translateY(0); }
      100% { transform: translateY(-80px); }
    }

    /* FIXED: Enhanced symbol styling */
    .symbol-track img {
      width: 80px;
      height: 80px;
      object-fit: contain;
      border-radius: 10px;
      transition: all 0.3s ease;
      filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.5));
      flex-shrink: 0;
      margin: 0;
      display: block;
    }

    .symbol-track img.win {
      transform: scale(1.1);
      filter: 
        drop-shadow(0 0 15px rgba(255, 182, 18, 0.8))
        drop-shadow(0 0 25px rgba(255, 182, 18, 0.6));
      animation: winGlow 1s ease-in-out infinite alternate;
    }

    @keyframes winGlow {
      0% { filter: drop-shadow(0 0 15px rgba(255, 182, 18, 0.8)) drop-shadow(0 0 25px rgba(255, 182, 18, 0.6)); }
      100% { filter: drop-shadow(0 0 25px rgba(255, 182, 18, 1)) drop-shadow(0 0 35px rgba(255, 182, 18, 0.8)); }
    }

    .payline {
      position: absolute;
      width: 100%;
      height: 4px;
      background: transparent;
      z-index: 5;
      transition: all 0.3s ease;
    }

    .payline.active {
      background: linear-gradient(90deg, 
        transparent 0%, 
        var(--nfl-gold) 20%, 
        var(--nfl-gold) 80%, 
        transparent 100%);
      box-shadow: 0 0 20px var(--nfl-gold);
      animation: paylineGlow 1s ease-in-out infinite alternate;
    }

    @keyframes paylineGlow {
      0% { opacity: 0.8; }
      100% { opacity: 1; }
    }

    .payline.line-1 { top: 25%; }
    .payline.line-2 { top: 50%; }
    .payline.line-3 { top: 75%; }

    .controls-section {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      gap: 20px;
      align-items: center;
      margin-top: 30px;
    }

    .info-displays {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 15px;
    }

    .info-card {
      background: linear-gradient(145deg, #1f2937, #111827);
      border: 3px solid var(--nfl-silver);
      border-radius: 12px;
      padding: 15px;
      text-align: center;
      box-shadow: 
        inset 0 0 15px rgba(0, 0, 0, 0.5),
        0 0 10px rgba(255, 182, 18, 0.2);
    }

    .info-label {
      font-size: 14px;
      font-weight: bold;
      color: var(--nfl-silver);
      margin-bottom: 5px;
      letter-spacing: 1px;
    }

    .info-value {
      font-size: clamp(18px, 3vw, 24px);
      font-weight: 900;
      color: var(--nfl-gold);
      text-shadow: 0 0 10px rgba(255, 182, 18, 0.6);
    }

    .spin-button {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background: linear-gradient(145deg, var(--nfl-red), #dc2626);
      border: 6px solid var(--nfl-gold);
      color: white;
      font-size: 20px;
      font-weight: 900;
      letter-spacing: 1px;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 
        0 0 30px rgba(213, 10, 10, 0.5),
        inset 0 0 20px rgba(255, 255, 255, 0.1),
        0 8px 15px rgba(0, 0, 0, 0.4);
      position: relative;
      overflow: hidden;
    }

    .spin-button:hover {
      transform: translateY(-3px);
      box-shadow: 
        0 0 40px rgba(213, 10, 10, 0.7),
        inset 0 0 20px rgba(255, 255, 255, 0.2),
        0 12px 25px rgba(0, 0, 0, 0.6);
    }

    .spin-button:active {
      transform: translateY(0);
      box-shadow: 
        0 0 20px rgba(213, 10, 10, 0.5),
        inset 0 0 20px rgba(0, 0, 0, 0.3),
        0 4px 10px rgba(0, 0, 0, 0.6);
    }

    .spin-button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }

    .betting-controls {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
      justify-self: end;
    }

    .bet-button {
      padding: 12px 20px;
      background: linear-gradient(145deg, var(--nfl-blue), #1e40af);
      border: 3px solid var(--nfl-silver);
      border-radius: 10px;
      color: white;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .bet-button:hover {
      background: linear-gradient(145deg, #1e40af, var(--nfl-blue));
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
    }

    .bet-button.active {
      background: linear-gradient(145deg, var(--nfl-gold), #f59e0b);
      color: #000;
    }

    .game-controls {
      display: flex;
      justify-content: center;
      gap: 15px;
      margin-top: 25px;
      flex-wrap: wrap;
    }

    .control-button {
      padding: 12px 24px;
      background: linear-gradient(145deg, #374151, #1f2937);
      border: 3px solid var(--nfl-silver);
      border-radius: 10px;
      color: var(--nfl-gold);
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .control-button:hover {
      background: linear-gradient(145deg, var(--nfl-gold), #f59e0b);
      color: #000;
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
    }

    .win-overlay {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0);
      background: rgba(30, 30, 60, 0.55); /* More see-through */
      border: 3px solid var(--nfl-gold);
      border-radius: 20px;
      padding: 18px 32px;
      text-align: center;
      z-index: 1000;
      backdrop-filter: blur(6px);
      box-shadow: 0 0 30px rgba(255, 182, 18, 0.5), inset 0 0 10px rgba(0, 0, 0, 0.3);
      transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      color: var(--nfl-gold);
      font-size: 1.7rem;
      font-weight: 900;
      pointer-events: none;
    }

    .win-overlay.visible {
      transform: translate(-50%, -50%) scale(1);
    }

    .paytable {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 90%;
      max-width: 500px;
      max-height: 80vh;
      background: linear-gradient(145deg, #1f2937, #111827);
      border: 6px solid var(--nfl-gold);
      border-radius: 20px;
      padding: 30px;
      color: white;
      z-index: 2000;
      display: none;
      overflow-y: auto;
      box-shadow: 
        0 0 50px rgba(255, 182, 18, 0.5),
        inset 0 0 30px rgba(0, 0, 0, 0.5);
    }

    .paytable.visible {
      display: block;
      animation: paytableSlideIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }

    @keyframes paytableSlideIn {
      0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
      100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
    }

    .paytable-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.8);
      z-index: 1999;
      display: none;
      backdrop-filter: blur(10px);
    }

    .paytable-overlay.visible {
      display: block;
    }

    .paytable-title {
      text-align: center;
      font-size: 28px;
      font-weight: 900;
      color: var(--nfl-gold);
      margin-bottom: 25px;
      text-shadow: 0 0 15px rgba(255, 182, 18, 0.6);
    }

    .paytable-section {
      margin-bottom: 25px;
    }

    .paytable-section h3 {
      font-size: 20px;
      color: var(--nfl-silver);
      margin-bottom: 15px;
      border-bottom: 2px solid var(--nfl-gold);
      padding-bottom: 5px;
    }

    .payout-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px;
      margin-bottom: 8px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 8px;
      border: 1px solid rgba(255, 182, 18, 0.2);
    }

    .payout-symbols {
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .payout-symbols img {
      width: 32px;
      height: 32px;
      object-fit: contain;
    }

    .payout-value {
      font-weight: bold;
      color: var(--nfl-gold);
    }

    .paytable-close {
      position: absolute;
      top: 15px;
      right: 20px;
      background: var(--nfl-red);
      border: none;
      color: white;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      font-size: 20px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .paytable-close:hover {
      background: #dc2626;
      transform: scale(1.1);
    }

    /* Coin animation */
    .coin-animation {
      position: absolute;
      width: 30px;
      height: 30px;
      background: radial-gradient(circle, var(--nfl-gold), #f59e0b);
      border-radius: 50%;
      border: 2px solid #fff;
      animation: coinFall 1s ease-out forwards;
      z-index: 100;
    }

    @keyframes coinFall {
      0% { 
        transform: translateY(0) rotate(0deg);
        opacity: 1;
      }
      100% { 
        transform: translateY(200px) rotate(720deg);
        opacity: 0;
      }
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      body { padding: 5px; }
      
      .slot-machine {
        max-width: 100%;
        padding: 20px;
        border-width: 4px;
        padding-top: max(20px, env(safe-area-inset-top));
      }
      
      .machine-header {
        margin-top: -20px;
      }
      
      .nfl-logo {
        margin-top: max(-30px, calc(-30px + env(safe-area-inset-top)));
      }
      
      .machine-title {
        font-size: 24px;
      }
      
      .reels-container {
        gap: 10px;
        padding: 15px;
      }
      
      .reel {
        height: 180px;
      }
      
      .symbol-track img {
        width: 60px;
        height: 60px;
      }
      
      .controls-section {
        grid-template-columns: 1fr;
        gap: 20px;
        text-align: center;
      }
      
      .spin-button {
        width: 100px;
        height: 100px;
        font-size: 16px;
        justify-self: center;
      }
      
      .betting-controls {
        justify-self: center;
      }
      
      .info-displays {
        grid-template-columns: 1fr;
        gap: 10px;
      }
    }

    .symbol-track.spinning {
      animation: reelSpinSmooth 0.15s linear infinite;
      filter: blur(3px);
      transition: filter 0.3s;
    }

    .symbol-track.decelerating {
      animation: reelDecelerate 1.5s cubic-bezier(0.23, 1, 0.320, 1) forwards;
      filter: blur(0px);
      transition: filter 0.3s;
    }
  </style>
</head>
<body>
  <div class="game-container">
    <div class="slot-machine">
      <!-- LED Lights -->
      <div class="led-lights">
        <div class="led-light"></div>
        <div class="led-light"></div>
        <div class="led-light"></div>
        <div class="led-light"></div>
        <div class="led-light"></div>
        <div class="led-light"></div>
        <div class="led-light"></div>
        <div class="led-light"></div>
        <div class="led-light"></div>
        <div class="led-light"></div>
        <div class="led-light"></div>
        <div class="led-light"></div>
      </div>

      <!-- Machine Header -->
      <div class="machine-header">
        <img src="./logos/nfl.png" alt="NFL Logo" class="nfl-logo" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMTIwIDgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iODAiIGZpbGw9IiNGRkI2MTIiLz48dGV4dCB4PSI2MCIgeT0iNTAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZm9udC13ZWlnaHQ9ImJvbGQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiMwMDAiPk5GTDwvdGV4dD48L3N2Zz4='">
        <h1 class="machine-title">NFL CHAMPIONSHIP SLOTS</h1>
        <div class="jackpot-display" id="jackpot">
          JACKPOT: <span id="jackpot-amount">50,000</span>
        </div>
      </div>

      <!-- Reels Container -->
      <div class="reels-container">
        <div class="payline line-1" data-line="0"></div>
        <div class="payline line-2" data-line="1"></div>
        <div class="payline line-3" data-line="2"></div>
        
        <div class="reel" id="reel1">
          <div class="symbol-track">
            <img src="./logos/nfl.png" alt="NFL" data-symbol="NFL Shield" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAiIGhlaWdodD0iODAiIGZpbGw9IiNGRkI2MTIiLz48dGV4dCB4PSI0MCIgeT0iNTAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZm9udC13ZWlnaHQ9ImJvbGQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiMwMDAiPvCfj4g8L3RleHQ+PC9zdmc+'">
            <img src="./logos/chiefs.png" alt="Chiefs" data-symbol="Chiefs" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAiIGhlaWdodD0iODAiIGZpbGw9IiNFMzE4MzciLz48dGV4dCB4PSI0MCIgeT0iNTAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZm9udC13ZWlnaHQ9ImJvbGQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNGRkYiPktDPC90ZXh0Pjwvc3ZnPg=='">
            <img src="./logos/patriots.png" alt="Patriots" data-symbol="Patriots" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAiIGhlaWdodD0iODAiIGZpbGw9IiMwMDIyNDQiLz48dGV4dCB4PSI0MCIgeT0iNTAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZm9udC13ZWlnaHQ9ImJvbGQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNGRkYiPk5FPC90ZXh0Pjwvc3ZnPg=='">
          </div>
        </div>
        
        <div class="reel" id="reel2">
          <div class="symbol-track">
            <img src="./logos/packers.png" alt="Packers" data-symbol="Packers" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAiIGhlaWdodD0iODAiIGZpbGw9IiMyMDM3MzEiLz48dGV4dCB4PSI0MCIgeT0iNTAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZm9udC13ZWlnaHQ9ImJvbGQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNGRkI2MTIiPkdCPC90ZXh0Pjwvc3ZnPg=='">
            <img src="./logos/cowboys.png" alt="Cowboys" data-symbol="Cowboys" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAiIGhlaWdodD0iODAiIGZpbGw9IiMwNDFFNDIiLz48dGV4dCB4PSI0MCIgeT0iNTAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9ImJvbGQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNGRkYiPkRBTDwvdGV4dD48L3N2Zz4='">
            <img src="./logos/steelers.png" alt="Steelers" data-symbol="Steelers" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAiIGhlaWdodD0iODAiIGZpbGw9IiMwMDAiLz48dGV4dCB4PSI0MCIgeT0iNTAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZm9udC13ZWlnaHQ9ImJvbGQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNGRkI2MTIiPlBJVDwvdGV4dD48L3N2Zz4='">
          </div>
        </div>
        
        <div class="reel" id="reel3">
          <div class="symbol-track">
            <img src="./logos/49ers.png" alt="49ers" data-symbol="49ers" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAiIGhlaWdodD0iODAiIGZpbGw9IiNBQTAwMDAiLz48dGV4dCB4PSI0MCIgeT0iNTAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZm9udC13ZWlnaHQ9ImJvbGQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNGRkYiPlNGPC90ZXh0Pjwvc3ZnPg=='">
            <img src="./logos/eagles.png" alt="Eagles" data-symbol="Eagles" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAiIGhlaWdodD0iODAiIGZpbGw9IiMwMDRDNTQiLz48dGV4dCB4PSI0MCIgeT0iNTAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZm9udC13ZWlnaHQ9ImJvbGQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNGRkYiPlBISTwvdGV4dD48L3N2Zz4='">
            <img src="./logos/falcons.png" alt="Falcons" data-symbol="Falcons" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAiIGhlaWdodD0iODAiIGZpbGw9IiNBNzE5MzAiLz48dGV4dCB4PSI0MCIgeT0iNTAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZm9udC13ZWlnaHQ9ImJvbGQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNGRkYiPkFUTDwvdGV4dD48L3N2Zz4='">
          </div>
        </div>
      </div>

      <!-- Controls Section -->
      <div class="controls-section">
        <!-- Info Displays -->
        <div class="info-displays">
          <div class="info-card">
            <div class="info-label">CREDITS</div>
            <div class="info-value" id="credits">1,000</div>
          </div>
          <div class="info-card">
            <div class="info-label">BET</div>
            <div class="info-value" id="bet-amount">25</div>
          </div>
          <div class="info-card">
            <div class="info-label">WIN</div>
            <div class="info-value" id="win-amount">0</div>
          </div>
        </div>

        <!-- Spin Button -->
        <button class="spin-button" id="spin-button">
          SPIN
        </button>

        <!-- Betting Controls -->
        <div class="betting-controls">
          <button class="bet-button bet-down">BET -</button>
          <button class="bet-button bet-up">BET +</button>
          <button class="bet-button max-bet">MAX BET</button>
          <button class="bet-button autoplay-button">AUTO</button>
        </div>
      </div>

      <!-- Game Controls -->
      <div class="game-controls">
        <button class="control-button paytable-button">PAYTABLE</button>
        <button class="control-button" onclick="toggleSound()">SOUND</button>
        <button class="control-button" onclick="toggleFullscreen()">FULLSCREEN</button>
      </div>
    </div>
  </div>

  <!-- Win Overlay -->
  <div class="win-overlay" id="winOverlay">
    <div style="font-size: 36px; font-weight: 900; color: var(--nfl-gold); margin-bottom: 20px;">🏆 BIG WIN! 🏆</div>
    <div style="font-size: 28px; font-weight: bold; color: var(--win-color);">1,250 CREDITS!</div>
  </div>

  <!-- Paytable Overlay -->
  <div class="paytable-overlay"></div>
  
  <!-- Paytable Modal -->
  <div class="paytable">
    <button class="paytable-close">&times;</button>
    <h2 class="paytable-title">NFL CHAMPIONSHIP PAYOUTS</h2>
    
    <div class="paytable-section">
      <h3>🏆 JACKPOT SYMBOLS</h3>
      <div class="payout-item">
        <div class="payout-symbols">
          <img src="./logos/trophy.png" alt="Trophy" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIGZpbGw9IiNGRkQ3MDAiLz48dGV4dCB4PSIxNiIgeT0iMjAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZm9udC13ZWlnaHQ9ImJvbGQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiMwMDAiPvCfj4Y8L3RleHQ+PC9zdmc+'">
          <img src="./logos/trophy.png" alt="Trophy" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIGZpbGw9IiNGRkQ3MDAiLz48dGV4dCB4PSIxNiIgeT0iMjAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZm9udC13ZWlnaHQ9ImJvbGQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiMwMDAiPvCfj4Y8L3RleHQ+PC9zdmc+'">
          <img src="./logos/trophy.png" alt="Trophy" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIGZpbGw9IiNGRkQ3MDAiLz48dGV4dCB4PSIxNiIgeT0iMjAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZm9udC13ZWlnaHQ9ImJvbGQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiMwMDAiPvCfj4Y8L3RleHQ+PC9zdmc+'">
          <span>SUPER BOWL TROPHY</span>
        </div>
        <div class="payout-value">JACKPOT!</div>
      </div>
    </div>

    <div class="paytable-section">
      <h3>🏈 PREMIUM SYMBOLS</h3>
      <div class="payout-item">
        <div class="payout-symbols">
          <img src="./logos/afc.png" alt="AFC" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIGZpbGw9IiNGRjAwMDAiLz48dGV4dCB4PSIxNiIgeT0iMjAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMCIgZm9udC13ZWlnaHQ9ImJvbGQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNGRkYiPkFGQzwvdGV4dD48L3N2Zz4='">
          <img src="./logos/afc.png" alt="AFC" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIGZpbGw9IiNGRjAwMDAiLz48dGV4dCB4PSIxNiIgeT0iMjAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMCIgZm9udC13ZWlnaHQ9ImJvbGQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNGRkYiPkFGQzwvdGV4dD48L3N2Zz4='">
          <img src="./logos/afc.png" alt="AFC" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIGZpbGw9IiNGRjAwMDAiLz48dGV4dCB4PSIxNiIgeT0iMjAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMCIgZm9udC13ZWlnaHQ9ImJvbGQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNGRkYiPkFGQzwvdGV4dD48L3N2Zz4='">
          <span>AFC CHAMPIONSHIP</span>
        </div>
        <div class="payout-value">1000x</div>
      </div>
      <div class="payout-item">
        <div class="payout-symbols">
          <img src="./logos/nfc.png" alt="NFC" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIGZpbGw9IiMwMDAwRkYiLz48dGV4dCB4PSIxNiIgeT0iMjAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMCIgZm9udC13ZWlnaHQ9ImJvbGQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNGRkYiPk5GQzwvdGV4dD48L3N2Zz4='">
          <img src="./logos/nfc.png" alt="NFC" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIGZpbGw9IiMwMDAwRkYiLz48dGV4dCB4PSIxNiIgeT0iMjAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMCIgZm9udC13ZWlnaHQ9ImJvbGQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNGRkYiPk5GQzwvdGV4dD48L3N2Zz4='">
    <div class="paytable-section">
      <h3>🏟️ TEAM SYMBOLS</h3>
      <div class="payout-item">
        <div class="payout-symbols">
          <img src="./logos/patriots.png" alt="Patriots" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIGZpbGw9IiMwMDIyNDQiLz48dGV4dCB4PSIxNiIgeT0iMjAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMCIgZm9udC13ZWlnaHQ9ImJvbGQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNGRkYiPk5FPC90ZXh0Pjwvc3ZnPg=='">
          <span>PATRIOTS</span>
        </div>
        <div class="payout-value">150x</div>
      </div>
      <div class="payout-item">
        <div class="payout-symbols">
          <img src="./logos/chiefs.png" alt="Chiefs" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIGZpbGw9IiNFMzE4MzciLz48dGV4dCB4PSIxNiIgeT0iMjAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMCIgZm9udC13ZWlnaHQ9ImJvbGQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNGRkYiPktDPC90ZXh0Pjwvc3ZnPg=='">
          <span>CHIEFS</span>
        </div>
        <div class="payout-value">140x</div>
      </div>
      <div class="payout-item">
        <div class="payout-symbols">
          <img src="./logos/eagles.png" alt="Eagles" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIGZpbGw9IiMwMDRDNTQiLz48dGV4dCB4PSIxNiIgeT0iMjAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMCIgZm9udC13ZWlnaHQ9ImJvbGQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNGRkYiPlBISTwvdGV4dD48L3N2Zz4='">
          <span>EAGLES</span>
        </div>
        <div class="payout-value">130x</div>
      </div>
      <div class="payout-item">
        <div class="payout-symbols">
          <img src="./logos/packers.png" alt="Packers" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIGZpbGw9IiMyMDM3MzEiLz48dGV4dCB4PSIxNiIgeT0iMjAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMCIgZm9udC13ZWlnaHQ9ImJvbGQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNGRkI2MTIiPkdCPC90ZXh0Pjwvc3ZnPg=='">
          <span>PACKERS / COWBOYS / STEELERS</span>
        </div>
        <div class="payout-value">125x</div>
      </div>
      <div class="payout-item">
        <div class="payout-symbols">
          <img src="./logos/49ers.png" alt="49ers" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIGZpbGw9IiNBQTAwMDAiLz48dGV4dCB4PSIxNiIgeT0iMjAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMCIgZm9udC13ZWlnaHQ9ImJvbGQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNGRkYiPlNGPC90ZXh0Pjwvc3ZnPg=='">
          <span>49ERS</span>
        </div>
        <div class="payout-value">110x</div>
      </div>
      <div class="payout-item">
        <div class="payout-symbols">
          <img src="./logos/falcons.png" alt="Falcons" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIGZpbGw9IiNBNzE5MzAiLz48dGV4dCB4PSI0MCIgeT0iNTAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZm9udC13ZWlnaHQ9ImJvbGQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNGRkYiPkFUTDwvdGV4dD48L3N2Zz4='">
          <span>FALCONS & OTHER TEAMS</span>
        </div>
        <div class="payout-value">100x</div>
      </div>
    </div>

    <div class="paytable-section">
      <h3>ℹ️ GAME INFO</h3>
      <p style="margin-bottom: 10px;"><strong>Wild Symbol:</strong> NFL Shield substitutes for all symbols except Trophy</p>
      <p style="margin-bottom: 10px;"><strong>Jackpot:</strong> 3 Trophy symbols anywhere on reels</p>
      <p style="margin-bottom: 10px;"><strong>Paylines:</strong> 3 horizontal lines pay left to right</p>
      <p style="margin-bottom: 10px;"><strong>Minimum Bet:</strong> 5 credits</p>
      <p><strong>Maximum Bet:</strong> 100 credits</p>
    </div>
  </div>

  <script>
    // Enhanced NFL Slots Game with Fixed Symbol Spacing and Logo Support
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
          creditsDisplay: document.getElementById('credits'),
          betDisplay: document.getElementById('bet-amount'),
          winDisplay: document.getElementById('win-amount'),
          jackpotDisplay: document.getElementById('jackpot-amount'),
          winOverlay: document.getElementById('winOverlay'),
          betUpButton: document.querySelector('.bet-up'),
          betDownButton: document.querySelector('.bet-down'),
          maxBetButton: document.querySelector('.max-bet'),
          autoplayButton: document.querySelector('.autoplay-button'),
          ledLights: document.querySelectorAll('.led-light'),
          paylines: document.querySelectorAll('.payline'),
          paytable: document.querySelector('.paytable'),
          paytableButton: document.querySelector('.paytable-button'),
          paytableClose: document.querySelector('.paytable-close'),
          paytableOverlay: document.querySelector('.paytable-overlay')
        };

        console.log('Elements initialized:', this.elements);

        // NFL Teams data with logo paths
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
          lever: null,
          lose: null
        };

        this.spinDuration = 2000;
        this.reelStopDelay = 300;
        this.jackpot = 50000;

        // --- DEMO MODE ---
        this.demoMode = false;
        this.demoInterval = null;

        this.init();
      }

      init() {
        this.initSounds();
        this.initEventListeners();
        this.initReels();
        this.updateDisplays();
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
          lever: 'sounds/stop.wav',
          lose: 'sounds/lose.wav'
        };

        Object.entries(soundFiles).forEach(([key, file]) => {
          this.sounds[key] = new Audio(file);
          if (this.sounds[key]) {
            this.sounds[key].preload = 'auto';
            this.sounds[key].volume = 0.7;

            // Error handling for missing sound files
            this.sounds[key].onerror = () => {
              console.warn(`Sound file not found: ${file}`);
              this.sounds[key] = null;
            };
          }
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
        console.log('Initializing event listeners...');
        console.log('Spin button element:', this.elements.spinButton);
        
        // Spin button
        this.elements.spinButton?.addEventListener('click', () => {
          console.log('Spin button clicked!');
          this.spin();
        });

        // Betting controls
        this.elements.betUpButton?.addEventListener('click', () => this.adjustBet(5));
        this.elements.betDownButton?.addEventListener('click', () => this.adjustBet(-5));
        this.elements.maxBetButton?.addEventListener('click', () => this.setMaxBet());

        // Autoplay
        this.elements.autoplayButton?.addEventListener('click', () => this.toggleAutoplay());

        // Paytable
        this.elements.paytableButton?.addEventListener('click', () => this.showPaytable());
        this.elements.paytableClose?.addEventListener('click', () => this.hidePaytable());
        this.elements.paytableOverlay?.addEventListener('click', () => this.hidePaytable());

        // Keyboard controls
        document.addEventListener('keydown', (e) => this.handleKeydown(e));

        // Prevent paytable from closing when clicking inside it
        this.elements.paytable?.addEventListener('click', function(e) {
          e.stopPropagation();
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
            this.showPaytable();
            break;
        }
      }

      initReels() {
        this.elements.reels.forEach((reel, index) => {
          if (reel) {
            const track = reel.querySelector('.symbol-track');
            if (track) {
              this.setReelSymbols(index, this.getRandomReelSymbols());
            } else {
              console.warn(`No .symbol-track found in reel #${index+1}`);
            }
          } else {
            console.warn(`No reel found at index ${index}`);
          }
        });
      }

      getRandomSymbol() {
        return this.teams[Math.floor(Math.random() * this.teams.length)];
      }

      getRandomReelSymbols() {
        return [this.getRandomSymbol(), this.getRandomSymbol(), this.getRandomSymbol()];
      }

      // Enhanced reel symbol setting with proper spacing and logo support
      setReelSymbols(reelIndex, symbols) {
        const reel = this.elements.reels[reelIndex];
        if (!reel) return;

        const track = reel.querySelector('.symbol-track');
        if (!track) return;

        // Create symbols with proper spacing and no gaps
        const symbolElements = symbols.map(symbol => {
          const img = document.createElement('img');
          img.src = symbol.image;
          img.alt = symbol.name;
          img.setAttribute('data-symbol', symbol.name);
          img.style.width = '80px';
          img.style.height = '80px';
          img.style.objectFit = 'contain';
          img.style.borderRadius = '10px';
          img.style.display = 'block';
          img.style.margin = '0';
          img.style.padding = '0';
          img.style.flexShrink = '0';
          
          // Add fallback SVG for missing logos
          img.onerror = () => {
            img.src = this.createFallbackSVG(symbol);
          };
          
          return img;
        });

        // Clear existing content and add new symbols
        track.innerHTML = '';
        symbolElements.forEach(element => track.appendChild(element));
      }

      // Create fallback SVG for missing logos
      createFallbackSVG(symbol) {
        const colorMap = {
          'NFL Shield': { bg: '#FFB612', text: '#000', label: '🏈' },
          'Trophy': { bg: '#FFD700', text: '#000', label: '🏆' },
          'AFC': { bg: '#FF0000', text: '#FFF', label: 'AFC' },
          'NFC': { bg: '#0000FF', text: '#FFF', label: 'NFC' },
          'Chiefs': { bg: '#E31837', text: '#FFF', label: 'KC' },
          'Patriots': { bg: '#002244', text: '#FFF', label: 'NE' },
          'Packers': { bg: '#203731', text: '#FFB612', label: 'GB' },
          'Cowboys': { bg: '#041E42', text: '#FFF', label: 'DAL' },
          'Steelers': { bg: '#000', text: '#FFB612', label: 'PIT' },
          '49ers': { bg: '#AA0000', text: '#FFF', label: 'SF' },
          'Eagles': { bg: '#004C54', text: '#FFF', label: 'PHI' },
          'Falcons': { bg: '#A71930', text: '#FFF', label: 'ATL' }
        };

        const colors = colorMap[symbol.name] || { bg: '#333', text: '#FFF', label: '?' };
        const fontSize = colors.label.length > 3 ? '12' : '16';

        const svg = `
          <svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="grad_${symbol.name.replace(/\s+/g, '_')}" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:${colors.bg};stop-opacity:1" />
                <stop offset="100%" style="stop-color:${this.adjustBrightness(colors.bg, -20)};stop-opacity:1" />
              </linearGradient>
            </defs>
            <rect width="80" height="80" rx="10" fill="url(#grad_${symbol.name.replace(/\s+/g, '_')})" stroke="${colors.text}" stroke-width="2"/>
            <text x="40" y="50" font-family="Arial Black, Arial" font-size="${fontSize}" font-weight="bold" text-anchor="middle" fill="${colors.text}" stroke="${colors.bg}" stroke-width="0.5">${colors.label}</text>
          </svg>
        `;
        return 'data:image/svg+xml;base64,' + btoa(svg);
      }

      // Utility to adjust color brightness
      adjustBrightness(hex, percent) {
        const num = parseInt(hex.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
          (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
          (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
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
          this.elements.autoplayButton && (this.elements.autoplayButton.textContent = 'AUTO');
        }
      }

      async autoSpin() {
        if (!this.autoplay || this.autoplaySpins <= 0) {
          this.autoplay = false;
          this.elements.autoplayButton?.classList.remove('active');
          this.elements.autoplayButton && (this.elements.autoplayButton.textContent = 'AUTO');
          return;
        }

        await this.spin(true);

        if (this.autoplay && this.autoplaySpins > 0) {
          setTimeout(() => this.autoSpin(), 1000);
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
        ];

        let totalWin = 0;
        let winningLines = [];
        let winType = 'no-win';

        for (let lineIndex =   0; lineIndex < lines.length; lineIndex++) {
          const line = lines[lineIndex];
          const symbols = line.map(([c,r]) => grid[c][r]);

          // Handle wild cards
          const wilds = symbols.filter(s => s.isWild).length;
          const nonWilds = symbols.filter(s => !s.isWild);

          if (nonWilds.length === 0) continue;

          const baseSymbol = nonWilds[0];
          const matchingSymbols = nonWilds.filter(s => s.name === baseSymbol.name).length + wilds;

          if (matchingSymbols === 3) {
            let lineWin = 0;

            if (baseSymbol.isJackpot) {
              lineWin = this.jackpot;
              winType = 'jackpot';
            } else if (baseSymbol.isPremium) {
              lineWin = baseSymbol.value * this.bet / 5;
              winType = 'premium';
            } else {
              lineWin = baseSymbol.value * this.bet / 5;
              winType = 'three-match';
            }

            totalWin += lineWin;
            winningLines.push({ line: lineIndex, symbols, win: lineWin });
          } else if (matchingSymbols === 2) {
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

      // Enhanced spin method with better animation handling
      async spin(isAutoplay = false) {
        console.log('Spin method called, isSpinning:', this.isSpinning);
        if (this.isSpinning) return;
        if (this.credits < this.bet) {
          this.showMessage('Not enough credits!');
          this.autoplay = false;
          return;
        }

        console.log('Starting spin animation...');
        
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

        console.log('Final grid generated:', finalGrid);

        // Enhanced reel spinning with seamless animation


        // --- Parallel reel spin logic with correct sound sequence ---
        const stopSound = (soundName) => {
          if (this.sounds[soundName]) {
            this.sounds[soundName].pause();
            this.sounds[soundName].currentTime = 0;
          }
        };

        // Start all reels spinning at the same time
        const spinPromises = this.elements.reels.map(async (reel, index) => {
          const track = reel.querySelector('.symbol-track');
          if (!track) {
            console.log(`No track found for reel ${index}`);
            return;
          }

          // All reels: start spinning immediately
          track.classList.add('spinning');
          this.createSpinningSymbols(track, index);

          // Only the stopping is staggered
          await this.delay(this.spinDuration + (index * this.reelStopDelay));

          // Stop spinning and set final symbols
          track.classList.remove('spinning');
          track.classList.add('decelerating');
          this.setReelSymbols(index, finalGrid[index]);
          // Play stop.wav as a new instance for each reel
          if (this.sounds['stop']) {
            const stopClone = this.sounds['stop'].cloneNode();
            stopClone.currentTime = 0;
            stopClone.play();
          }
          // Stop spin sound when the final (3rd) reel starts decelerating
          if (index === 2) {
            console.log('Final reel started decelerating, stopping spin sound...');
            stopSound('spin');
          }
          // Wait for a natural deceleration (matches previous animation: 1.5s)
          await this.delay(1500);
          track.classList.remove('decelerating');

        });

        // Wait for all reels to finish
        await Promise.all(spinPromises);

        // Stop spinning effects
        this.stopSpinEffects();

        // Now that all reels have completed their animations, calculate and handle the win
        console.log('All reels animation completed, calculating win...');
        const result = this.calculateWin(finalGrid);
        await this.handleWinResult(result, finalGrid);

        // Re-enable controls
        this.isSpinning = false;
        this.elements.spinButton && (this.elements.spinButton.disabled = false);
      }

      async handleWinResult(result, grid) {
        // Play win or lose sound, and re-enable spin immediately after
        let soundPlayed = false;
        if (result.win > 0) {
        // Add winnings to credits
        this.credits += result.win;

        // Show win popup and effects immediately
        this.showWinEffects(result, grid);
        this.elements.winDisplay && (this.elements.winDisplay.textContent = result.win.toLocaleString());

        // Play sound and effects as soon as popup appears
        let winSoundName = null;
        if (result.type === 'jackpot') {
          winSoundName = 'jackpot';
          this.createJackpotCelebration();
        } else if (result.win > this.bet * 10) {
          winSoundName = 'bigWin';
        } else {
          winSoundName = 'win';
        }
        if (winSoundName && this.sounds[winSoundName]) {
          this.sounds[winSoundName].currentTime = 0;
          this.sounds[winSoundName].play();
          soundPlayed = true;
        }
        this.animateCoins(result.win);

        // Wait for effect duration, then hide popup and re-enable spin
        await this.delay(2000);
        this.hideWinOverlay();
        this.clearSymbolHighlights();
        this.hidePaylines();
        this.stopWinLights();
        if (winSoundName && this.sounds[winSoundName]) {
          this.sounds[winSoundName].pause();
          this.sounds[winSoundName].currentTime = 0;
        }
        this.isSpinning = false;
        this.elements.spinButton && (this.elements.spinButton.disabled = false);
        } else {
          // Play lose sound and re-enable spin immediately after
          if (this.sounds['lose']) {
            this.sounds['lose'].currentTime = 0;
            this.sounds['lose'].play();
            soundPlayed = true;
            setTimeout(() => {
              this.sounds['lose'].pause();
              this.sounds['lose'].currentTime = 0;
              this.isSpinning = false;
              this.elements.spinButton && (this.elements.spinButton.disabled = false);
            }, 1100);
          } else {
            // If no lose sound, re-enable spin immediately
            this.isSpinning = false;
            this.elements.spinButton && (this.elements.spinButton.disabled = false);
          }
        }
        if (!soundPlayed) {
          // Fallback: re-enable spin if no sound was played
          this.isSpinning = false;
          this.elements.spinButton && (this.elements.spinButton.disabled = false);
        }
        this.updateDisplays();
      }

      // Create seamless spinning symbols
      createSpinningSymbols(track, reelIndex) {
        // First, preserve current symbols to avoid blank period during transition
        const currentSymbols = [];
        const existingImages = track.querySelectorAll('img');
        existingImages.forEach(img => {
          if (img.getAttribute('data-symbol')) {
            // Find the team object for this symbol
            const teamName = img.getAttribute('data-symbol');
            const team = this.teams.find(t => t.name === teamName);
            if (team) {
              currentSymbols.push(team);
            }
          }
        });

        // Create base symbol array starting with current symbols for continuity
        const symbolsToShow = [];
        
        // Start with current symbols if they exist to maintain visual continuity
        if (currentSymbols.length > 0) {
          symbolsToShow.push(...currentSymbols);
        }
        
        // Fill the remaining spinning track with random picks from teams for true variety
        const additionalSymbols = Array.from({length: 100}, () => this.teams[Math.floor(Math.random() * this.teams.length)]);
        symbolsToShow.push(...additionalSymbols);

        // Clear track and add spinning symbols
        track.innerHTML = '';
        symbolsToShow.forEach(symbol => {
          const img = document.createElement('img');
          img.src = symbol.image;
          img.alt = symbol.name;
          img.setAttribute('data-symbol', symbol.name);
          img.style.width = '80px';
          img.style.height = '80px';
          img.style.objectFit = 'contain';
          img.style.borderRadius = '10px';
          img.style.display = 'block';
          img.style.margin = '0';
          img.style.padding = '0';
          img.style.flexShrink = '0';
          // Add fallback for missing logos
          img.onerror = () => {
            img.src = this.createFallbackSVG(symbol);
          };
          track.appendChild(img);
        });
      }

      hideWinOverlay() {
        if (this.elements.winOverlay) {
          this.elements.winOverlay.classList.remove('visible');
        }
      }

      clearSymbolHighlights() {
        // Remove win class from all symbols
        this.elements.reels.forEach(reel => {
          const symbols = reel.querySelectorAll('img');
          symbols.forEach(symbol => {
            symbol.classList.remove('win');
          });
        });
      }

      hidePaylines() {
        if (this.elements.paylines) {
          this.elements.paylines.forEach(payline => {
            payline.classList.remove('active');
          });
        }
      }

      async showWinEffects(result, grid) {
        // Show winning symbols
        (result.lines || []).forEach(line => {
          // For compatibility, support both {symbols, win, line} and {positions, ...}
          const positions = line.positions || [];
          positions.forEach(pos => {
            const reel = this.elements.reels[pos[0]];
            if (reel) {
              const symbols = reel.querySelectorAll('img');
              if (symbols[pos[1]]) {
                symbols[pos[1]].classList.add('win');
              }
            }
          });
          // Show winning payline
          if (this.elements.paylines && this.elements.paylines[line.lineIndex || line.line]) {
            this.elements.paylines[line.lineIndex || line.line].classList.add('active');
          }
        });

        // Show win overlay
        if (this.elements.winOverlay) {
          const winText = this.elements.winOverlay.querySelector('div:last-child');
          if (winText) {
            winText.textContent = `${result.win.toLocaleString()} CREDITS!`;
          }
          this.elements.winOverlay.classList.add('visible');
        }

        // Start win lights
        this.startWinLights();

        // Wait for effect duration
        await this.delay(2000);

        // Hide effects
        this.hideWinOverlay();
        this.clearSymbolHighlights();
        this.hidePaylines();
        this.stopWinLights();
      }

      createJackpotCelebration() {
      }

      animateCoins(amount) {
        // Simple coin animation: animate gold circles from reels to credits display
        const creditsElem = this.elements.creditsDisplay;
        if (!creditsElem) return;
        const rect = creditsElem.getBoundingClientRect();
        for (let i = 0; i < Math.min(20, Math.max(5, Math.floor(amount / 100))); i++) {
          setTimeout(() => {
            const coin = document.createElement('div');
            coin.style.position = 'fixed';
            coin.style.left = (window.innerWidth / 2 + (Math.random() - 0.5) * 200) + 'px';
            coin.style.top = (window.innerHeight / 2 + (Math.random() - 0.5) * 100) + 'px';
            coin.style.width = '18px';
            coin.style.height = '18px';
            coin.style.borderRadius = '50%';
            coin.style.background = 'radial-gradient(circle at 30% 30%, #FFD700 80%, #B8860B 100%)';
            coin.style.zIndex = '9999';
            coin.style.boxShadow = '0 0 8px #FFD700, 0 0 2px #B8860B';
            coin.style.pointerEvents = 'none';
            coin.style.transition = 'all 1s cubic-bezier(0.4,1.4,0.4,1)';
            document.body.appendChild(coin);
            setTimeout(() => {
              coin.style.left = (rect.left + rect.width / 2) + 'px';
              coin.style.top = (rect.top + rect.height / 2) + 'px';
              coin.style.opacity = '0';
              coin.style.transform = 'scale(0.5)';
            }, 10);
            setTimeout(() => {
              if (coin.parentNode) coin.parentNode.removeChild(coin);
            }, 1100);
          }, i * 60);
        }
        // Create confetti effect for jackpot wins
        for (let i = 0; i < 50; i++) {
          setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '-10px';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'][Math.floor(Math.random() * 5)];
            confetti.style.zIndex = '9999';
            confetti.style.animation = 'confettiDrop 3s linear forwards';
            confetti.style.pointerEvents = 'none';
            document.body.appendChild(confetti);
            
            setTimeout(() => {
              if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
              }
            }, 3000);
          }, i * 50);
        }
      }

      // --- DEMO MODE ---
      toggleDemoMode() {
        this.demoMode = !this.demoMode;
        if (this.demoMode) {
          this.startDemo();
        } else {
          this.stopDemo();
        }
      }
      startDemo() {
        if (this.demoInterval) clearInterval(this.demoInterval);
        this.demoInterval = setInterval(() => {
          if (!this.isSpinning) {
            this.spin();
          }
        }, 3500);
      }
      stopDemo() {
        if (this.demoInterval) clearInterval(this.demoInterval);
        this.demoInterval = null;
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
        this.elements.paytableOverlay?.classList.add('visible');
      }

      hidePaytable() {
        this.elements.paytable?.classList.remove('visible');
        this.elements.paytableOverlay?.classList.remove('visible');
      }

      showMessage(message) {
        // Create temporary message overlay
        const messageDiv = document.createElement('div');
        messageDiv.className = 'win-overlay visible';
        messageDiv.innerHTML = `<div style="font-size: 24px; padding: 20px 30px;">${message}</div>`;

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
    }

    // Global variables for additional functionality
    let soundEnabled = true;
    let isFullscreen = false;

    // Sound toggle function
    function toggleSound() {
      soundEnabled = !soundEnabled;
      const button = event.target;
      button.textContent = soundEnabled ? 'SOUND' : 'MUTED';
      button.style.opacity = soundEnabled ? '1' : '0.6';
      
      if (window.nflSlots) {
        // Update sound volume in the game instance
        Object.values(window.nflSlots.sounds).forEach(sound => {
          if (sound) {
            sound.volume = soundEnabled ? 0.7 : 0;
          }
        });
      }
    }

    // Fullscreen toggle function
    function toggleFullscreen() {
      const gameContainer = document.querySelector('.game-container');
      
      if (!isFullscreen) {
        if (gameContainer.requestFullscreen) {
          gameContainer.requestFullscreen();
        } else if (gameContainer.webkitRequestFullscreen) {
          gameContainer.webkitRequestFullscreen();
        } else if (gameContainer.mozRequestFullScreen) {
          gameContainer.mozRequestFullScreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        }
      }
    }

    // Fullscreen change handler
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);

    function handleFullscreenChange() {
      isFullscreen = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement);
      const button = document.querySelector('.control-button:last-child');
      if (button) {
        button.textContent = isFullscreen ? 'EXIT FULLSCREEN' : 'FULLSCREEN';
      }
    }

    // Initialize the game and demo button when DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
      if (document.querySelector('.slot-machine')) {
        window.nflSlots = new NFLSlots();
        // Add a demo mode toggle button to the UI (if not present)
        const demoBtn = document.createElement('button');
        demoBtn.textContent = 'Demo Mode';
        demoBtn.style.position = 'fixed';
        demoBtn.style.bottom = '24px';
        demoBtn.style.right = '24px';
        demoBtn.style.zIndex = 2000;
        demoBtn.style.padding = '1rem 2rem';
        demoBtn.style.background = 'linear-gradient(145deg, #FFD700 0%, #FFA500 100%)';
        demoBtn.style.color = '#222';
        demoBtn.style.fontWeight = 'bold';
        demoBtn.style.border = 'none';
        demoBtn.style.borderRadius = '1.2rem';
        demoBtn.style.boxShadow = '0 2px 12px #0004';
        demoBtn.style.cursor = 'pointer';
        demoBtn.onclick = () => window.nflSlots && window.nflSlots.toggleDemoMode();
        document.body.appendChild(demoBtn);
      }
    });

    // Mobile viewport height fix
    function setVH() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', () => {
      setTimeout(setVH, 100);
    });

    // CSS for confetti animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes confettiDrop {
        0% { 
          transform: translateY(-100vh) rotate(0deg);
          opacity: 1;
        }
        100% { 
          transform: translateY(100vh) rotate(720deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);

    // Touch handling for better mobile experience
    document.addEventListener('touchstart', function() {}, { passive: true });

    // (Demo button creation now handled above)
  </script>
</body>
</html>
