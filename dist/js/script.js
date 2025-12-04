document.addEventListener('DOMContentLoaded', () => {

    /* Data download function */
    async function loadData() {
        try {
            const response = await fetch('data.json');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Passing the loaded data to the display function
            initPage(data);

        } catch (error) {
            console.error('Помилка завантаження data.json:', error);
        }
    }

    /* Content generation */
    function initPage(data) {
        // Insert name
        const nameContainer = document.getElementById('personName');
        if (nameContainer) {
            const info = data.personalInfo;
            nameContainer.innerHTML = `<h1 class="cv-name-first">${info.firstName}</h1>
                                       <h1 class="cv-name-last">${info.lastName}</h1>
                                       <h1 class="cv-title">${info.role}</h1>`;
        }

        // Generation of experience
        renderExperience(data.experience);

        // Click initialization
        initToggles();
    }

    function renderExperience(experienceData) {
        const container = document.getElementById('experience-container');
        if (!container) return;

        container.innerHTML = '';

        experienceData.forEach(item => {
            const html = `
                <div class="mb-4 toggle-content-wrapper"> <h6 class="fw-bold mb-1">${item.title}</h6>
                    <p class="mb-2">${item.company}/${item.location}/${item.period}</p>
                    <p class="main-content-wrapper text-muted mb-0">${item.description}</p>
                </div>
            `;
            container.innerHTML += html;
        });
    }

    /* Event handling Toggle */
    function initToggles() {
        const triggers = document.querySelectorAll('.toggle-trigger');

        triggers.forEach(trigger => {
            trigger.addEventListener('click', function() {
                // Find the next element (content)
                const content = this.nextElementSibling;
                // Find the arrow inside the title
                const arrow = this.querySelector('.arrow-icon');

                // Switch classes
                if (content) {
                    content.classList.toggle('hidden');
                }
                if (arrow) {
                    arrow.classList.toggle('rotate');
                }
            });
        });
    }

    // Start downloading
    loadData();
});