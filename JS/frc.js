//Basically when the content is loaded, the Javascript will fetch the associated JSON file
//And then parse that stream into a JS Object, which then with that we then map the list dynamically into a topic block.
document.addEventListener("DOMContentLoaded", () => {
    fetch('Files/Data/frc.json')
        .then(response => response.json()) //This basically parses the stream into a JavaScript object
        .then(data => {
            // Map Season Lists Dynamically into Paired Topic Blocks
            const masterContainer = document.getElementById('frc-seasons-container');
            if (!masterContainer || !data.seasons) return;
            masterContainer.innerHTML = '';

            //I believe this stuff is more or less meant for each season found within the JSON File
            data.seasons.forEach(season => {
                const seasonBlock = document.createElement('section');
                seasonBlock.className = 'season-wrapper';

                const yearHeader = document.createElement('h2');
                yearHeader.className = 'season-year-heading';
                yearHeader.textContent = `${season.year} Season`;
                seasonBlock.appendChild(yearHeader);

                // --- CARD 1: THE GAME ---
                const gameCard = document.createElement('div');
                gameCard.className = 'card topic-row-card';
                gameCard.innerHTML = `
                    <div class="topic-text-side">
                        <h2>The Game: ${season.gameName}</h2>
                        <p>${season.gameBreakdown}</p>
                    </div>
                    <div class="topic-media-side img-contain-frame">
                        <img src="${season.gameLogoUrl}" alt="${season.gameName} Logo">
                    </div>
                `;
                seasonBlock.appendChild(gameCard);

                // --- CARD 2: THE TEAM ---
                let awardsHTML = '';
                if (season.awards && season.awards.length > 0) {
                    awardsHTML = `
                        <div class="data-list-block" style="margin-top: 15px;">
                            <h4>🏆 Season Awards</h4>
                            <ul>${season.awards.map(award => `<li>${award}</li>`).join('')}</ul>
                        </div>
                    `;
                }

                const teamCard = document.createElement('div');
                teamCard.className = `card topic-row-card ${!season.teamPhotoUrl ? 'no-media' : ''}`;

                let teamPhotoMarkup = '';
                if (season.teamPhotoUrl) {
                    teamPhotoMarkup = `
                        <div class="topic-media-side">
                            <img src="${season.teamPhotoUrl}" alt="FRC 6078 ${season.year} Team Crew Photo">
                        </div>
                    `;
                }

                teamCard.innerHTML = `
                    <div class="topic-text-side">
                        <h2>The Team & Competitions</h2>
                        <div class="data-list-block">
                            <h4>🏁 Event Results</h4>
                            <ul>${season.competitions.map(comp => `<li>${comp}</li>`).join('')}</ul>
                        </div>
                        ${awardsHTML}
                    </div>
                    ${teamPhotoMarkup}
                `;
                seasonBlock.appendChild(teamCard);

                // --- CARD 3: THE ROBOT (With Dynamic "Meet RobotName" Title) ---
                const robotCard = document.createElement('div');
                robotCard.className = `card topic-row-card ${!season.robotPhotoUrl ? 'no-media' : ''}`;

                // Determine heading wording based on robotName presence
                const machineHeading = season.robotName ? `Meet ${season.robotName}` : 'Meet the Robot';

                let robotPhotoMarkup = '';
                if (season.robotPhotoUrl) {
                    robotPhotoMarkup = `
                        <div class="topic-media-side">
                            <img src="${season.robotPhotoUrl}" alt="FRC 6078 Machine: ${season.robotName || 'Robot'}">
                        </div>
                    `;
                }

                robotCard.innerHTML = `
                    <div class="topic-text-side">
                        <h2>${machineHeading}</h2>
                        <h3>🤖 Technical Blueprint</h3>
                        <p>${season.robotInfo}</p>
                    </div>
                    ${robotPhotoMarkup}
                `;
                seasonBlock.appendChild(robotCard);

                // --- CARD 4: THE REFLECTION ---
                const reflectionCard = document.createElement('div');
                reflectionCard.className = 'card topic-row-card gameplay-card-row';
                reflectionCard.innerHTML = `
                    <div class="topic-text-side">
                        <h2>Season Reflection</h2>
                        <p style="color: var(--text-muted);">${season.seasonReflection}</p>
                    </div>
                    <div class="topic-media-side video-contain-frame">
                        <iframe src="${season.matchVideoEmbed}" title="${season.year} Match Highlight" frameborder="0" allowfullscreen></iframe>
                    </div>
                `;
                seasonBlock.appendChild(reflectionCard);

                masterContainer.appendChild(seasonBlock);
            });
        })
        .catch(error => console.error("Error building structural FRC history data:", error));
});
