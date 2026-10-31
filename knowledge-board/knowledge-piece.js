const currentScript = document.currentScript;

const jsonFilePath = currentScript.getAttribute('data-json');

if (jsonFilePath) {
    fetch(jsonFilePath)
        .then(response => response.json())
        .then(data => {
            renderKnowledgeBoard(data);
            setupTimelineObserver(data);
        })
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
    card.id = `post-${block.postNumber}`;
    //Handles type rendering for each item inside each post block
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

function setupTimelineObserver(data) {
    const sidebar = document.getElementById('timeline-sidebar');
    const blocks = data.blocks;
    if (!sidebar || !blocks || blocks.length === 0) return;
    const maxPosts = blocks.length;

    const getFirstDayWord = (dateStr) => dateStr ? dateStr.trim().split(' ')[0] : '';
    const initialDate = getFirstDayWord(blocks[0].postDate);
    const finalDate = getFirstDayWord(blocks[maxPosts - 1 ].postDate);

    sidebar.innerHTML = `
    <div class="timeline-wrapper">
        <div class="timeline-top-date">${initialDate}</div>
        <div class="timeline-track">
            <div id="timeline-button" class="timeline-indicator-box">
                <span id="active-post-index">1</span> / ${maxPosts}
                <div id="active-post-date" class="timeline-sub-date">${initialDate}</div>
            </div>
        </div>
        <div class="timeline-bottom-date">${finalDate}</div>
    </div>
    `;
    const indexDisplay = document.getElementById('active-post-index');
    const dateDisplay = document.getElementById('active-post-date');
    const timelineButton = document.getElementById('timeline-button');
    const cards = document.querySelectorAll('.knowledge-card');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -50% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentNum = parseInt(entry.target.id.replace('post-', ''), 10);
                const currentBlock = blocks.find(b => b.postNumber === currentNum);

                if (currentBlock) {
                    currentPostNumber = currentNum;
                    indexDisplay.textContent = currentNum;
                    dateDisplay.textContent = getFirstDayWord(currentBlock.postDate);

                    const percentage = ((currentNum - 1) / Math.max(maxPosts - 1, 1)) * 100;
                    timelineButton.style.top = `${percentage}%`;
                }

            }
        });
    }, observerOptions);
    cards.forEach(card => observer.observe(card));
}