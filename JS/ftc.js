//Basically when the content is loaded, the Javascript will fetch the associated JSON file
//And then parse that stream into a JS Object, which then with that we then map the list dynamically into a topic block.
document.addEventListener("DOMContentLoaded", () => {
    fetch('Files/Data/ftc.json')
        .then(response => response.json())
        .then(data => {

            //Map FTC Seasons (Game Breakdown and Awards Only)
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
