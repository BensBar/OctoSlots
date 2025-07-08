// Test script to change the reel color
document.getElementById('reel-color-picker').value = '#ff6b6b';
document.getElementById('reel-color-picker').dispatchEvent(new Event('input', { bubbles: true }));
