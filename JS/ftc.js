document.addEventListener("DOMContentLoaded", () => {
    fetch('Files/Data/ftc.json')
        .then(response => response.json())
        .then(data => {

            // 1. Render Core Values and Identity Elements
            if (data.identity) {
                document.getElementById('team-mission').textContent = data.identity.mission;
                const valuesContainer = document.getElementById('team-values-list');
                if (valuesContainer && data.identity.values) {
                    valuesContainer.innerHTML = '';
                    data.identity.values.forEach(item => {
                        const itemBox = document.createElement('div');
                        itemBox.className = 'individual-value-item';
                        itemBox.innerHTML = `<h4>${item.title}</h4><p>${item.desc}</p>`;
                        valuesContainer.appendChild(itemBox);
                    });
                }
            }

            // 2. Map FTC Seasons (Game Breakdown and Awards Only)
            const masterContainer = document.getElementById('ftc-seasons-container');
            if (!masterContainer || !data.seasons) return;
            masterContainer.innerHTML = '';

            data.seasons.forEach(season => {
                const seasonBlock = document.createElement('section');
                seasonBlock.className = 'season-wrapper';

                const yearHeader = document.createElement('h2');
                yearHeader.className = 'season-year-heading';
                yearHeader.textContent = `${season.year} Season`;
                seasonBlock.appendChild(yearHeader);

                // --- OPTIMIZED CARD: THE GAME & AWARDS ---
                let awardsHTML = '';
                if (season.awards && season.awards.length > 0) {
                    awardsHTML = `
                        <div class="data-list-block" style="margin-top: 15px;">
                            <h4>🏆 Season Awards</h4>
                            <ul>${season.awards.map(award => `<li>${award}</li>`).join('')}</ul>
                        </div>
                    `;
                }

                const infoCard = document.createElement('div');
                infoCard.className = 'card topic-row-card';
                infoCard.innerHTML = `
                    <div class="topic-text-side">
                        <h2>The Game: ${season.gameName}</h2>
                        <p>${season.gameBreakdown}</p>
                        ${awardsHTML}
                    </div>
                    <div class="topic-media-side img-contain-frame">
                        <img src="${season.gameLogoUrl}" alt="${season.gameName} Logo">
                    </div>
                `;
                seasonBlock.appendChild(infoCard);

                masterContainer.appendChild(seasonBlock);
            });
        })
        .catch(error => console.error("Error building structural FTC history data:", error));
});
