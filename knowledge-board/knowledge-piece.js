const currentScript = document.currentScript;

const jsonFilePath = currentScript.getAttribute('data-json');

if (jsonFilePath) {
    fetch(jsonFilePath)
        .then(response => response.json())
        .then(data => renderKnowledgeBoard(data))
        .catch (error => console.error('Error parsing knowledge board data:', error));
}

function renderKnowledgeBoard(data) {
    const container = document.getElementById('knowledge-board-container');
    if (!container) return;
    container.innerHTML = '';

    const header = document.createElement('h1');
    header.textContent = data.metadata?.title || 'Knowledge Board';
    container.appendChild(header);

    data.blocks.forEach(block => {
    const card = document.createElement('div');
    card.className = 'knowledge-card';
    
    block.items.forEach(item => {
        if (item.type === 'text') {
            const p = document.createElement('p');
            p.className = 'card-text-content';
            p.textContent = item.value;
            card.appendChild(p);
        }
        else if (item.type === 'code') {
            const pre = document.createElement('pre');
            const code = document.createElement('code');
            code.textContent = item.value;
            pre.appendChild(code);
            card.appendChild(pre);
        }
        else if (item.type === 'image') {
            const imgWrapper = document.createElement('div');
            imgWrapper.className = 'image-container-box';
            const img = document.createElement('img');
            img.src = item.value;
            img.alt = "Board Attachment";
            imgWrapper.appendChild(img);
            card.appendChild(imgWrapper);
        }
        else if (item.type === 'link') {
            const p = document.createElement('p');
            p.className = 'card-link-container';

            const anchor = document.createElement('a');
            anchor.href = item.href;
            anchor.textContent = item.value || item.href;

            anchor.target = "_blank";
            anchor.rel = "noopener noreferrer";
            anchor.className = "board-link";

            p.appendChild(anchor);
            card.appendChild(p);
        }
    });

    const signature = document.createElement('div');
    signature.className = 'card-signature-footer';
    signature.innerHTML = `
    <span class="author"> --${block.postAuthor}</span>
    <span class="post-timestamp"> ${block.postDate}</span>
    `;
    card.appendChild(signature);
    container.appendChild(card);
    });
}