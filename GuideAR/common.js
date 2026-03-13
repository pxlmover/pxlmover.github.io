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
  },
  {
    bodyBg: "linear-gradient(120deg, #181a2a 0%, #5ee7df 20%, #b490ca 45%, #8fd3f4 70%, #e0c3fc 100%)",
    headerBg: "linear-gradient(90deg, #5ee7df, #b490ca 40%, #8fd3f4 70%, #e0c3fc 100%)",
    headerSubBg: "linear-gradient(90deg, #e0c3fc, #8fd3f4 35%, #b490ca 70%, #5ee7df 100%)"
  },
  {
    bodyBg: "linear-gradient(120deg, #181a2a 0%, #fa709a 20%, #fee140 45%, #f6d365 70%, #fda085 100%)",
    headerBg: "linear-gradient(90deg, #fa709a, #fee140 40%, #f6d365 70%, #fda085 100%)",
    headerSubBg: "linear-gradient(90deg, #fda085, #f6d365 35%, #fee140 70%, #fa709a 100%)"
  },
  {
    bodyBg: "linear-gradient(120deg, #181a2a 0%, #43cea2 20%, #185a9d 45%, #6dd5ed 70%, #2193b0 100%)",
    headerBg: "linear-gradient(90deg, #43cea2, #185a9d 40%, #6dd5ed 70%, #2193b0 100%)",
    headerSubBg: "linear-gradient(90deg, #2193b0, #6dd5ed 35%, #185a9d 70%, #43cea2 100%)"
  },
  {
    bodyBg: "linear-gradient(120deg, #181a2a 0%, #f7971e 20%, #ffd200 45%, #f857a6 70%, #ff5858 100%)",
    headerBg: "linear-gradient(90deg, #f7971e, #ffd200 40%, #f857a6 70%, #ff5858 100%)",
    headerSubBg: "linear-gradient(90deg, #ff5858, #f857a6 35%, #ffd200 70%, #f7971e 100%)"
  },
  {
    bodyBg: "linear-gradient(120deg, #181a2a 0%, #30cfd0 20%, #330867 45%, #753a88 70%, #cc2b5e 100%)",
    headerBg: "linear-gradient(90deg, #30cfd0, #330867 40%, #753a88 70%, #cc2b5e 100%)",
    headerSubBg: "linear-gradient(90deg, #cc2b5e, #753a88 35%, #330867 70%, #30cfd0 100%)"
  },
  {
    bodyBg: "linear-gradient(120deg, #181a2a 0%, #f83600 20%, #f9d423 45%, #ff4e50 70%, #fc913a 100%)",
    headerBg: "linear-gradient(90deg, #f83600, #f9d423 40%, #ff4e50 70%, #fc913a 100%)",
    headerSubBg: "linear-gradient(90deg, #fc913a, #ff4e50 35%, #f9d423 70%, #f83600 100%)"
  },
  {
    bodyBg: "linear-gradient(120deg, #181a2a 0%, #12c2e9 20%, #c471ed 45%, #f64f59 70%, #ff8a00 100%)",
    headerBg: "linear-gradient(90deg, #12c2e9, #c471ed 40%, #f64f59 70%, #ff8a00 100%)",
    headerSubBg: "linear-gradient(90deg, #ff8a00, #f64f59 35%, #c471ed 70%, #12c2e9 100%)"
  },
  {
    bodyBg: "linear-gradient(120deg, #181a2a 0%, #4facfe 20%, #00f2fe 45%, #43e97b 70%, #38f9d7 100%)",
    headerBg: "linear-gradient(90deg, #4facfe, #00f2fe 40%, #43e97b 70%, #38f9d7 100%)",
    headerSubBg: "linear-gradient(90deg, #38f9d7, #43e97b 35%, #00f2fe 70%, #4facfe 100%)"
  },
  {
    bodyBg: "linear-gradient(120deg, #181a2a 0%, #654ea3 20%, #eaafc8 45%, #8e2de2 70%, #4a00e0 100%)",
    headerBg: "linear-gradient(90deg, #654ea3, #eaafc8 40%, #8e2de2 70%, #4a00e0 100%)",
    headerSubBg: "linear-gradient(90deg, #4a00e0, #8e2de2 35%, #eaafc8 70%, #654ea3 100%)"
  },
  {
    bodyBg: "linear-gradient(120deg, #181a2a 0%, #00cdac 20%, #8ddad5 45%, #ffd166 70%, #fcb045 100%)",
    headerBg: "linear-gradient(90deg, #00cdac, #8ddad5 40%, #ffd166 70%, #fcb045 100%)",
    headerSubBg: "linear-gradient(90deg, #fcb045, #ffd166 35%, #8ddad5 70%, #00cdac 100%)"
  },
  {
    bodyBg: "linear-gradient(120deg, #181a2a 0%, #7f00ff 20%, #e100ff 45%, #ff6a88 70%, #ff99ac 100%)",
    headerBg: "linear-gradient(90deg, #7f00ff, #e100ff 40%, #ff6a88 70%, #ff99ac 100%)",
    headerSubBg: "linear-gradient(90deg, #ff99ac, #ff6a88 35%, #e100ff 70%, #7f00ff 100%)"
  },
  {
    bodyBg: "linear-gradient(120deg, #181a2a 0%, #0fd850 20%, #f9f047 45%, #ff8c00 70%, #ff2e63 100%)",
    headerBg: "linear-gradient(90deg, #0fd850, #f9f047 40%, #ff8c00 70%, #ff2e63 100%)",
    headerSubBg: "linear-gradient(90deg, #ff2e63, #ff8c00 35%, #f9f047 70%, #0fd850 100%)"
  },
  {
    bodyBg: "linear-gradient(120deg, #181a2a 0%, #355c7d 20%, #6c5b7b 45%, #c06c84 70%, #f67280 100%)",
    headerBg: "linear-gradient(90deg, #355c7d, #6c5b7b 40%, #c06c84 70%, #f67280 100%)",
    headerSubBg: "linear-gradient(90deg, #f67280, #c06c84 35%, #6c5b7b 70%, #355c7d 100%)"
  },
  {
    bodyBg: "linear-gradient(120deg, #181a2a 0%, #00f5a0 20%, #00d9f5 45%, #b2fefa 70%, #0ed2f7 100%)",
    headerBg: "linear-gradient(90deg, #00f5a0, #00d9f5 40%, #b2fefa 70%, #0ed2f7 100%)",
    headerSubBg: "linear-gradient(90deg, #0ed2f7, #b2fefa 35%, #00d9f5 70%, #00f5a0 100%)"
  },
  {
    bodyBg: "linear-gradient(120deg, #181a2a 0%, #fd746c 20%, #ff9068 45%, #ffd194 70%, #fcb69f 100%)",
    headerBg: "linear-gradient(90deg, #fd746c, #ff9068 40%, #ffd194 70%, #fcb69f 100%)",
    headerSubBg: "linear-gradient(90deg, #fcb69f, #ffd194 35%, #ff9068 70%, #fd746c 100%)"
  },
  {
    bodyBg: "linear-gradient(120deg, #181a2a 0%, #667eea 20%, #764ba2 45%, #f093fb 70%, #f5576c 100%)",
    headerBg: "linear-gradient(90deg, #667eea, #764ba2 40%, #f093fb 70%, #f5576c 100%)",
    headerSubBg: "linear-gradient(90deg, #f5576c, #f093fb 35%, #764ba2 70%, #667eea 100%)"
  },
  {
    bodyBg: "linear-gradient(120deg, #181a2a 0%, #3a1c71 20%, #d76d77 45%, #ffaf7b 70%, #ffd3a5 100%)",
    headerBg: "linear-gradient(90deg, #3a1c71, #d76d77 40%, #ffaf7b 70%, #ffd3a5 100%)",
    headerSubBg: "linear-gradient(90deg, #ffd3a5, #ffaf7b 35%, #d76d77 70%, #3a1c71 100%)"
  },
  {
    bodyBg: "linear-gradient(120deg, #181a2a 0%, #56ab2f 20%, #a8e063 45%, #f7ff00 70%, #db36a4 100%)",
    headerBg: "linear-gradient(90deg, #56ab2f, #a8e063 40%, #f7ff00 70%, #db36a4 100%)",
    headerSubBg: "linear-gradient(90deg, #db36a4, #f7ff00 35%, #a8e063 70%, #56ab2f 100%)"
  }
];
let currentTheme = 0;
const savedTheme = localStorage.getItem('arThemeIndex');
if (savedTheme !== null) {
  currentTheme = parseInt(savedTheme, 10) || 0;
}

function extractHexColors(gradientText) {
  if (!gradientText) return [];
  const matches = gradientText.match(/#[0-9a-fA-F]{6}/g);
  return matches || [];
}

function applyTheme(theme) {
  if (!theme) return;

  document.body.style.setProperty('--body-bg', theme.bodyBg);
  document.body.style.setProperty('--header-bg', theme.headerBg);
  document.body.style.setProperty('--header-sub-bg', theme.headerSubBg);

  const headerColors = extractHexColors(theme.headerBg);
  const subHeaderColors = extractHexColors(theme.headerSubBg);

  const discordStart = headerColors[1] || '#5865f2';
  const discordEnd = headerColors[2] || '#7b8cff';
  const youtubeStart = subHeaderColors[1] || '#ff3d3d';
  const youtubeEnd = subHeaderColors[2] || '#ff7a3d';

  document.body.style.setProperty('--community-discord-bg', `linear-gradient(90deg, ${discordStart}, ${discordEnd})`);
  document.body.style.setProperty('--community-youtube-bg', `linear-gradient(90deg, ${youtubeStart}, ${youtubeEnd})`);
}

applyTheme(themes[currentTheme]);

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
      applyTheme(themes[currentTheme]);
    });
  }
});