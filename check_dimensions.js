// Execute this in browser console to check dimensions
const symbol = document.querySelector('.symbol');
if (symbol) {
  const computedStyle = getComputedStyle(symbol);
  console.log('Symbol height from CSS:', computedStyle.height);
  console.log('Symbol actual height:', symbol.offsetHeight);
  
  const reel = document.querySelector('.reel');
  if (reel) {
    console.log('Reel height:', reel.offsetHeight);
  }
  
  // Check CSS variable value
  const root = getComputedStyle(document.documentElement);
  console.log('--symbol-size value:', root.getPropertyValue('--symbol-size'));
}
