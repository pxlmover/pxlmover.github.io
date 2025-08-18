const themes = [
  {
    bodyBg: "linear-gradient(120deg, #181a2a 0%, #6a5cff 20%, #64b5f6 40%, #a259f7 65%, #ff4e8e 100%)",
    headerBg: "linear-gradient(90deg, #6a5cff, #64b5f6 40%, #a259f7 70%, #81c784 100%)",
    headerSubBg: "linear-gradient(90deg, #ff4e8e, #a259f7 40%, #64b5f6 70%, #fff176 100%)"
  },
  {
    bodyBg: "linear-gradient(120deg, #181a2a 0%, #ffb347 20%, #ffcc33 40%, #ffecb3 65%, #ffd700 100%)",
    headerBg: "linear-gradient(90deg, #ffd700, #ffb347 40%, #ffcc33 70%, #fff176 100%)",
    headerSubBg: "linear-gradient(90deg, #ffecb3, #ffd700 40%, #ffb347 70%, #ffcc33 100%)"
  },
  {
    bodyBg: "linear-gradient(120deg, #181a2a 0%, #00c3ff 20%, #ffff1c 40%, #ff4e8e 65%, #a259f7 100%)",
    headerBg: "linear-gradient(90deg, #00c3ff, #ffff1c 40%, #ff4e8e 70%, #a259f7 100%)",
    headerSubBg: "linear-gradient(90deg, #ff4e8e, #a259f7 40%, #00c3ff 70%, #ffff1c 100%)"
  },
  {
    bodyBg: "linear-gradient(120deg, #181a2a 0%, #81c784 20%, #64b5f6 40%, #a259f7 65%, #ff4e8e 100%)",
    headerBg: "linear-gradient(90deg, #81c784, #64b5f6 40%, #a259f7 70%, #ff4e8e 100%)",
    headerSubBg: "linear-gradient(90deg, #a259f7, #ff4e8e 40%, #64b5f6 70%, #81c784 100%)"
  },
  // Additional themes
  {
    bodyBg: "linear-gradient(120deg, #181a2a 0%, #ff4e8e 20%, #a259f7 40%, #64b5f6 65%, #6a5cff 100%)",
    headerBg: "linear-gradient(90deg, #ff4e8e, #a259f7 40%, #64b5f6 70%, #6a5cff 100%)",
    headerSubBg: "linear-gradient(90deg, #6a5cff, #64b5f6 40%, #a259f7 70%, #ff4e8e 100%)"
  },
  {
    bodyBg: "linear-gradient(120deg, #181a2a 0%, #81c784 20%, #fff176 40%, #ffb347 65%, #ffd700 100%)",
    headerBg: "linear-gradient(90deg, #81c784, #fff176 40%, #ffb347 70%, #ffd700 100%)",
    headerSubBg: "linear-gradient(90deg, #ffd700, #ffb347 40%, #fff176 70%, #81c784 100%)"
  },
  {
    bodyBg: "linear-gradient(120deg, #181a2a 0%, #ffecb3 20%, #ffcc33 40%, #ffb347 65%, #ffd700 100%)",
    headerBg: "linear-gradient(90deg, #ffecb3, #ffcc33 40%, #ffb347 70%, #ffd700 100%)",
    headerSubBg: "linear-gradient(90deg, #ffd700, #ffb347 40%, #ffcc33 70%, #ffecb3 100%)"
  },
  {
    bodyBg: "linear-gradient(120deg, #181a2a 0%, #00c3ff 20%, #81c784 40%, #ff4e8e 65%, #a259f7 100%)",
    headerBg: "linear-gradient(90deg, #00c3ff, #81c784 40%, #ff4e8e 70%, #a259f7 100%)",
    headerSubBg: "linear-gradient(90deg, #a259f7, #ff4e8e 40%, #81c784 70%, #00c3ff 100%)"
  }
];
let currentTheme = 0;

// Read theme from localStorage and apply immediately
const savedTheme = localStorage.getItem('arThemeIndex');
if (savedTheme !== null) {
  currentTheme = parseInt(savedTheme, 10) || 0;
  const t = themes[currentTheme];
  document.body.style.setProperty('--body-bg', t.bodyBg);
  document.body.style.setProperty('--header-bg', t.headerBg);
  document.body.style.setProperty('--header-sub-bg', t.headerSubBg);
}

document.addEventListener('DOMContentLoaded', function() {
  // Signature
  const sig = document.createElement('div');
  sig.className = 'site-signature';
  sig.textContent = 'Created In Unreal Engine By Daniel Jensen - 2025';
  document.body.appendChild(sig);

  // Theme randomizer
  const btn = document.getElementById('theme-randomizer');
  if (btn) {
    btn.addEventListener('click', function() {
      currentTheme = (currentTheme + 1) % themes.length;
      localStorage.setItem('arThemeIndex', currentTheme); // Save theme index
      const t = themes[currentTheme];
      document.body.style.setProperty('--body-bg', t.bodyBg);
      document.body.style.setProperty('--header-bg', t.headerBg);
      document.body.style.setProperty('--header-sub-bg', t.headerSubBg);
    });
  }
});