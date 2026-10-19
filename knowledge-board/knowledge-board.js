document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('boards-container');

  
  fetch('/Files/Data/kbregistry.json')
    .then(res => res.json())
    .then(registry => {
      registry.forEach(board => {
        
        fetch(board.jsonPath)
          .then(res => res.json())
          .then(subpageData => {
            
            const card = document.createElement('a');
            card.className = 'board-card';
            card.href = board.fileName; // Links directly to the HTML page

            card.innerHTML = `
              <h2>${subpageData.metadata.title}</h2>
              <div class="meta-text">
                <p><strong>Last Updated:</strong> ${subpageData.metadata.lastUpdated}</p>
                <p><strong>Latest Author:</strong> ${subpageData.metadata.latestAuthor}</p>
              </div>
            `;

            container.appendChild(card);
          })
          .catch(err => console.error(`Error loading JSON for ${board.slug}:`, err));
      });
    })
    .catch(err => console.error('Error loading registry:', err));
});
