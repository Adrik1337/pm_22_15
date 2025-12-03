document.addEventListener('DOMContentLoaded', () => {

    /* --- Data for insertion --- */
    /* Name */
    const personalInfo = {
        firstName: "John",
        lastName: "Parker",
        role: "UI DESIGNER"
    };

    /* Experience data */
    const experienceData = [
        {
            title: "Senior UX Designer",
            company: "Company Name",
            location: "Location",
            period: "2019-present",
            description: "Lorem ipsum dolor sit amet, this is a thena consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim"
        },
        {
            title: "Junior UX Designer",
            company: "Company Name",
            location: "Location",
            period: "2017–2019",
            description: "Lorem ipsum dolor sit amet, this is a thena consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim"
        }
    ];

    /* --- Generating content function --- */
    function initPage() {
        // 1. Name insertion
        const nameContainer = document.getElementById('personName');
        if (nameContainer) {
            nameContainer.innerHTML = `<h1 class="cv-name-first">${personalInfo.firstName}</h1>
                                       <h1 class="cv-name-last">${personalInfo.lastName}</h1>
                                       <h1 class="cv-title">${personalInfo.role}</h1>`;
        }

        // 2. Generating experience from array
        renderExperience(experienceData);

        // 3. Interactive initialization
        initToggles();
    }

    function renderExperience(data) {
        const container = document.getElementById('experience-container');
        if (!container) return;

        // Clearing container before insertion
        container.innerHTML = '';

        data.forEach(item => {
            const html = `
                <div class="mb-4">
                    <h6 class="fw-bold mb-1">${item.title}</h6>
                    <p class="mb-2">${item.company}/${item.location}/${item.period}</p>
                    <p class="main-content-wrapper text-muted mb-0">${item.description}</p>
                </div>
            `;
            container.innerHTML += html; // Adding to the content
        });
    }

    /* --- Toggle event processing --- */
    function initToggles() {
        // Find all headers that have the class 'toggle-trigger'
        const triggers = document.querySelectorAll('.toggle-trigger');

        const arrows = document.querySelectorAll('.arrow-icon');

        triggers.forEach(trigger => {
            trigger.addEventListener('click', function() {
                console.log("click")
                // Find next element
                const content = this.nextElementSibling;
                // Find toggle inside header
                const arrow = this.querySelector('.arrow-icon');

                // Switch classes
                if (content) {
                    content.classList.toggle('hidden');
                    console.log("hidden")
                }
                if (arrow) {
                    arrow.classList.toggle('rotate');
                    console.log("rotate")
                }
            });
        });
    }

    // Script running
    initPage();
});