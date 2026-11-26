var menuLinks = document.querySelectorAll('.menu a');
var allPanels = document.querySelectorAll('.side-panel');
var closeBtn = document.querySelectorAll('.closeBtn');
var allFullViews = document.querySelectorAll('.full-view');
var closeViewsBtns = document.querySelectorAll('.close-btn-view');
var projectItems = document.querySelectorAll('.project-item');
var projectModal = document.getElementById('project-modal');
var modalTitle = document.getElementById('modal-title');
var modalDesc = document.getElementById('modal-desc');
var modalLink = document.getElementById('modal-link');
var closeModalBtn = document.getElementById('close-modal-btn');

//Ouverture
menuLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        let targetId = link.getAttribute('href');
        let targetPanel = document.getElementById('panel-' + targetId.substring(1));
        let targetView = document.getElementById('view-' + targetId.substring(1));

        if (targetPanel || targetView) {
            event.preventDefault();
            closeAllPanels();

            if (targetPanel) {
                targetPanel.classList.add('active');
            }
            if (targetView) {
                targetView.classList.add('active');
            }

            document.body.classList.add('is-panel-open');
        }
    });
});




//Fermeture
closeBtn.forEach(btn => {
    btn.addEventListener('click', function() {
        this.closest('.side-panel').classList.remove('active'); 
        document.body.classList.remove('is-panel-open');
    });
});

//Fermeture pour les vues
closeViewsBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        this.closest('.full-view').classList.remove('active');
        document.body.classList.remove('is-panel-open');
    })
})

//Tout fermer (au cas où)
function closeAllPanels() {
    allPanels.forEach(panel => {
        panel.classList.remove('active');
    });
    allFullViews.forEach(view => {
        view.classList.remove('active');
    });
    document.body.classList.remove('is-panel-open');
}

//Fermer en dehors du menu
document.addEventListener('click', (event) => {
    if (document.body.classList.contains('is-panel-open')) {
        let isClickInsidePanel = event.target.closest('.side-panel, .full-view');
        let isClickOnMenu = event.target.closest('.menu a');

        if (!isClickInsidePanel && !isClickOnMenu) {
            closeAllPanels();
        }
    }
});











projectItems.forEach(item => {
    item.addEventListener('click', () => {
        //On récupère les infos cachées
        let title = item.getAttribute('data-title');
        let desc = item.getAttribute('data-desc');
        let link = item.getAttribute('data-link');

        //On remplace le texte du modal
        modalTitle.textContent = title;
        modalDesc.textContent = desc;

        //Gestion du lien Github (caché s'il n'y a pas)
        if (link) {
            modalLink.href = link;
            modalLink.style.display = 'inline-block';
        } else {
            modalLink.style.display = 'none';
        }

        //Bande noire
        projectModal.classList.add('active');
    });
});

//Fermeture
closeModalBtn.addEventListener('click', () => {
    projectModal.classList.remove('active');
});

projectModal.addEventListener('click', (e) => {
    if (e.target == projectModal) {
        projectModal.classList.remove('active');
    }
});


















// --- GRAPHIQUE EN ÉTOILE (COMPÉTENCES) ---

// On s'assure que le canvas existe sur la page avant de le dessiner
var canvasCompetences = document.getElementById('radarChart');

if (canvasCompetences) {
    var ctx = canvasCompetences.getContext('2d');
    
    // Initialisation du graphique Chart.js
    var competencesChart = new Chart(ctx, {
        type: 'radar',
        data: {
            // Les mots-clés courts pour les 6 branches
            labels: ['Développement', ['Optimisation', 'd\'application'], ['Administration', 'réseaux'], 'Données', ['Gestion', 'de projet'], ['Travailler', 'en équipe']],
            datasets: [{
                label: 'Niveau',
                data: [80, 65, 50, 80, 70, 70], 
                
                // Le style de l'étoile (Couleurs Persona)
                backgroundColor: 'rgba(0, 229, 255, 0.4)',
                borderColor: '#00e5ff',
                pointBackgroundColor: '#ff005a',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#ff005a',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    // Couleur de la toile d'araignée
                    angleLines: { color: 'rgba(255, 255, 255, 0.5)' },
                    grid: { color: 'rgba(255, 255, 255, 0.5)' },
                    // Style du texte des branches
                    pointLabels: {
                        color: 'white',
                        font: {
                            family: 'Anton',
                            size: 20,
                            letterSpacing: 1,
                        },
                        backdropColor: 'rgba(0, 0, 0, 0.7)', // Un fond noir semi-transparent (70% d'opacité)
                        backdropPadding: 6, // L'espace entre le texte et le bord de la boîte
                        borderRadius: 4
                    },
                    // Échelle de 0 à 100
                    min: 0,
                    max: 100,
                    ticks: { display: false } // Cache les numéros de l'échelle
                }
            },
            plugins: {
                legend: { display: false }, // Cache la légende inutile
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleFont: { family: 'Anton', size: 14 },
                    bodyFont: { size: 14 },
                    displayColors: false
                }
            }
        }
    });
}


const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        //On découpe le filtre en tableau de mots
        const filters = btn.getAttribute('data-filter').split(' ');

        projectItems.forEach(item => {
            const tags = item.getAttribute('data-tags') || '';
            //On affiche si le filtre est "all" ou si au moins un mot correspond
            const matches = filters.includes('all') || filters.some(f => tags.includes(f));
            item.style.display = matches ? 'flex' : 'none';
        });
    });
});





//ONGLETS DE COMPÉTENCES
const compTabBtns = document.querySelectorAll('.comp-tab-btn');
const compPanels = document.querySelectorAll('.comp-panel');

compTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        compTabBtns.forEach(b => b.classList.remove('active'));
        compPanels.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const targetPanel = document.getElementById(btn.getAttribute('data-target'));
        if (targetPanel) {
            targetPanel.classList.add('active');
        }
    });
});