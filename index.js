const fs = require('fs');

function generateTrueMiningSVG() {
    const rows = 7;
    const cols = 53;
    const boxSize = 10;
    const gap = 3;
    const paddingLeft = 10;
    const paddingTop = 30;
    
    const svgWidth = cols * (boxSize + gap) + paddingLeft + 20;
    const svgHeight = rows * (boxSize + gap) + paddingTop + 30;

    const colors = {
        0: '#161b22', // Leer
        1: '#0e4429', // Stein
        2: '#006d32', // Kupfer
        3: '#26a641', // Gold
        4: '#39d353'  // Diamant
    };

    let gridSVG = '';
    let styles = '';

    // Generiere ein volles 53x7 Raster mit zufälligen Erz-Stufen (wie echte Commits)
    for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
            const xPos = paddingLeft + x * (boxSize + gap);
            const yPos = paddingTop + y * (boxSize + gap);
            
            // Zufällige Verteilung für den Look
            const rand = Math.random();
            const level = rand > 0.85 ? 4 : rand > 0.7 ? 3 : rand > 0.5 ? 2 : rand > 0.2 ? 1 : 0;
            const color = colors[level];

            // Jede Spalte bekommt eine eigene Verzögerung basierend auf der Laufzeit des Miners
            // Der Miner braucht 30 Sekunden für den gesamten Weg (53 Spalten)
            const delay = (x / cols) * 30;

            // CSS-Animation für das exakte Zerstören und Respawnen dieses spezifischen Blocks
            styles += `
                .block-${x}-${y} {
                    animation: breakAndRespawn-${x} 30s infinite linear;
                    transform-origin: ${xPos + boxSize/2}px ${yPos + boxSize/2}px;
                }
                @keyframes breakAndRespawn-${x} {
                    0% { opacity: 1; transform: scale(1); fill: ${color}; }
                    /* Kurz bevor der Miner die Spalte erreicht */
                    ${((delay / 30) * 100).toFixed(1)}% { opacity: 1; transform: scale(1); }
                    /* Treffer: Block explodiert/zerfällt */
                    ${(((delay + 0.2) / 30) * 100).toFixed(1)}% { opacity: 0; transform: scale(0) rotate(45deg); }
                    /* 5 Sekunden Respawn-Dauer (5 / 30 = ~16.6% der Gesamtlaufzeit) */
                    ${(((delay + 5.2) / 30) * 100).toFixed(1)}% { opacity: 0; transform: scale(0); }
                    /* Zurückgesetzt für den nächsten Durchlauf */
                    ${(((delay + 5.7) / 30) * 100).toFixed(1)}% { opacity: 1; transform: scale(1); }
                    100% { opacity: 1; transform: scale(1); }
                }
            `;

            gridSVG += `<rect class="block-${x}-${y}" x="${xPos}" y="${yPos}" width="${boxSize}" height="${boxSize}" rx="2" />\n`;
        }
    }

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}">
    <style>
        ${styles}
        @keyframes mineWalk {
            0% { transform: translate(0px, 0px); }
            95% { transform: translate(${svgWidth - 40}px, 0px); }
            100% { transform: translate(${svgWidth - 40}px, 0px); }
        }
        @keyframes pickaxeSwing {
            0% { transform: rotate(0deg); }
            50% { transform: rotate(-70deg); }
            100% { transform: rotate(0deg); }
        }
        .miner-engine {
            animation: mineWalk 30s infinite linear;
        }
        .tool-swing {
            transform-origin: 8px 15px;
            animation: pickaxeSwing 0.4s infinite ease-in-out;
        }
    </style>

    <rect width="100%" height="100%" fill="#0d1117" rx="6" />

    ${gridSVG}

    <g class="miner-engine">
        <g transform="translate(0, ${paddingTop + 15})">
            <rect x="5" y="10" width="10" height="14" rx="2" fill="#f1c40f" />
            <path d="M4 10 C 4 4, 16 4, 16 10 Z" fill="#e67e22" />
            <rect x="8" y="5" width="4" height="2" fill="#f1c40f" />
            <polygon points="12,6 35,0 35,16" fill="#f1c40f" opacity="0.15" />
            
            <g class="tool-swing">
                <rect x="6" y="2" width="2" height="14" rx="1" fill="#795548" transform="rotate(30 6 2)" />
                <path d="M0 2 C 4 0, 10 0, 14 2 L 7 4 Z" fill="#95a5a6" />
            </g>
        </g>
    </g>
</svg>`;
}

const svgContent = generateTrueMiningSVG();
fs.writeFileSync('mining-grid.svg', svgContent);
console.log('💎 True 53x7 Pixel Art Mining Grid generated.');
