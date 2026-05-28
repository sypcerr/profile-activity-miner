const fs = require('fs');

const mockCommitData = [
    [0, 1, 2, 0, 4, 1, 0],
    [1, 0, 3, 4, 0, 2, 1],
    [0, 0, 1, 2, 4, 0, 0],
    [2, 3, 0, 1, 0, 4, 2],
    [0, 1, 1, 4, 2, 0, 3]
];

function generateMiningSVG(data) {
    const boxSize = 12;
    const gap = 3;
    const paddingLeft = 40;
    const paddingTop = 25;
    
    let svgWidth = data.length * (boxSize + gap) + paddingLeft + 60;
    let svgHeight = 7 * (boxSize + gap) + paddingTop + 30;

    const colors = {
        0: '#161b22',
        1: '#0e4429',
        2: '#006d32',
        3: '#26a641',
        4: '#39d353'
    };

    let gridSVG = '';

    data.forEach((week, x) => {
        week.forEach((level, y) => {
            const xPos = paddingLeft + x * (boxSize + gap);
            const yPos = paddingTop + y * (boxSize + gap);
            const color = colors[level] || colors[0];
            
            let extra = '';
            if (level === 4) {
                extra = `style="animation: crystalGlow 2s infinite alternate;"`;
            }

            gridSVG += `<rect x="${xPos}" y="${yPos}" width="${boxSize}" height="${boxSize}" rx="2" fill="${color}" ${extra} />\n`;
        });
    });

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}">
    <style>
        @keyframes mineWalk {
            0% { transform: translate(0px, 0px); }
            45% { transform: translate(${svgWidth - 90}px, 0px); }
            50% { transform: translate(${svgWidth - 90}px, 0px) scaleX(-1); }
            95% { transform: translate(0px, 0px) scaleX(-1); }
            100% { transform: translate(0px, 0px) scaleX(1); }
        }
        @keyframes pickaxeSwing {
            0% { transform: rotate(0deg); }
            50% { transform: rotate(-60deg); }
            100% { transform: rotate(0deg); }
        }
        @keyframes crystalGlow {
            0% { filter: drop-shadow(0 0 1px #39d353); }
            100% { fill: #a3ffb4; filter: drop-shadow(0 0 4px #39d353); }
        }
        .miner-engine {
            animation: mineWalk 20s infinite linear;
            transform-origin: center;
        }
        .tool-swing {
            transform-origin: 18px 25px;
            animation: pickaxeSwing 0.6s infinite ease-in-out;
        }
    </style>

    <rect width="100%" height="100%" fill="#0d1117" rx="10" />

    ${gridSVG}

    <g class="miner-engine">
        <g transform="translate(10, ${svgHeight / 2 - 20})">
            <rect x="15" y="20" width="16" height="22" rx="4" fill="#f1c40f" />
            <path d="M13 20 C 13 10, 33 10, 33 20 Z" fill="#e67e22" />
            <rect x="20" y="12" width="6" height="4" fill="#f1c40f" />
            <polygon points="26,14 45,5 45,23" fill="#f1c40f" opacity="0.15" />
            <rect x="15" y="42" width="6" height="4" fill="#2c3e50" />
            <rect x="25" y="42" width="6" height="4" fill="#2c3e50" />
            
            <g class="tool-swing">
                <rect x="16" y="5" width="3" height="25" rx="1" fill="#795548" transform="rotate(30 16 5)" />
                <path d="M5 4 C 12 2, 22 2, 29 4 L 17 8 Z" fill="#95a5a6" />
            </g>
        </g>
    </g>
</svg>`;
}

const svgContent = generateMiningSVG(mockCommitData);
fs.writeFileSync('mining-grid.svg', svgContent);
console.log('Pixel Miner SVG generated');
