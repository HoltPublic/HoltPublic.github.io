document.addEventListener("DOMContentLoaded", () => {
    fetch('Files/Data/home.json')
        .then(response => response.json())
        .then(data => {
            
            // 1. Render Announcements
            const section = document.getElementById('announcements-section');
            const grid = document.getElementById('announcements-grid');
            const activeAnnouncements = data.announcements.filter(item => item.show);

            if (activeAnnouncements && activeAnnouncements.length > 0) {
                activeAnnouncements.forEach(event => {
                    const card = document.createElement('div');
                    card.className = 'event-card';

                    const flyerWrapper = document.createElement('div');
                    flyerWrapper.className = 'event-flyer-wrapper';
                    const img = document.createElement('img');
                    img.className = 'event-flyer-img';
                    img.src = event.flyerUrl || '';
                    img.alt = `${event.title} Flyer`;
                    flyerWrapper.appendChild(img);

                    const content = document.createElement('div');
                    content.className = 'event-content';
                    const title = document.createElement('h3');
                    title.textContent = event.title;
                    const desc = document.createElement('p');
                    desc.textContent = event.description;

                    content.appendChild(title);
                    content.appendChild(desc);
                    card.appendChild(flyerWrapper);
                    card.appendChild(content);
                    grid.appendChild(card);
                });
                section.classList.remove('hidden');
            }

            // 2. Map Season Notice Elements
            document.getElementById('join-heading').textContent = data.onboarding.heading;
            document.getElementById('join-message').textContent = data.onboarding.message;
            document.getElementById('onboarding-logo').src = data.onboarding.logoUrl;

            // 3. Map Programs Directory (with Crash Safeguard)
            const subTeamsGrid = document.getElementById('programs-grid');
            if (subTeamsGrid && data.programs) {
                data.programs.forEach(team => {
                    const programCard = document.createElement('div');
                    programCard.className = 'program-card';

                    const cardContent = `
                        <h3>${team.name}</h3>
                        <p>${team.description}</p>
                        <a href="${team.link}" class="btn-brown" style="margin-top:15px; text-align:center;">View Sub-Team</a>
                    `;
                    programCard.innerHTML = cardContent;
                    subTeamsGrid.appendChild(programCard);
                });
            }

            // 4. Populate About Us Context Block
            document.getElementById('about-text').textContent = data.aboutUs.text;
            document.getElementById('first-text').textContent = data.aboutUs.firstRoboticsText;

            // 5. Append Media Streaming Frames
            const videoGrid = document.getElementById('video-grid');
            data.youtubeVideos.forEach(videoUrl => {
                const iframe = document.createElement('iframe');
                iframe.src = videoUrl;
                iframe.title = "Holt Robotics Feature Match";
                iframe.frameBorder = "0";
                iframe.allowFullscreen = true;
                videoGrid.appendChild(iframe);
            });
        })
        .catch(error => console.error("Error building structural dashboard data:", error));
});
