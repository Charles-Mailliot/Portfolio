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
//var currentLang = localStorage.getItem('portfolio_lang') || 'fr';

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
        let title = (currentLang === 'en' && item.getAttribute('data-title-en')) || item.getAttribute('data-title');
        let desc = (currentLang === 'en' && item.getAttribute('data-desc-en')) || item.getAttribute('data-desc');
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
                            size: window.innerWidth <= 900 ? 12 : 20,
                            letterSpacing: 1,
                        },
                        backdropColor: 'rgba(0, 0, 0, 0.7)', // Un fond noir semi-transparent (70% d'opacité)
                        backdropPadding: window.innerWidth <= 900 ? 3 : 6, // L'espace entre le texte et le bord de la boîte
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


















// ================== TRADUCTION FR / EN ==================
const translations = {
    fr: {
        "menu.moi": "MOI",
        "menu.parcours": "PARCOURS",
        "menu.projets": "PROJETS",
        "menu.competences": "COMPÉTENCES",
        "btn.back": "RETOUR",
        "footer.rights": "Design inspiré par Persona 3. Tous les assets et droits appartiennent à Atlus / SEGA.",
        "moi.title": "MOI",
        "moi.bio": "Je suis un passionné de technologies et de création sous toutes ses formes. En parallèle de mes études en informatique, je cultive un écosystème personnel très visuel et sonore : montage vidéo, musique, et une immersion quotidienne dans la culture gaming et le design graphique. Mon moteur principal ? Une curiosité insatiable. J'aime apprendre en continu, tester de nouveaux logiciels, et trouver le point d'équilibre parfait où la technique pure rencontre l'art créatif.",
        "parcours.title": "PARCOURS",
        "parcours.p1": "Stage d'observation chez SAM Informatique",
        "parcours.p2": "Baccalauréat mention Bien, spécialités Mathématiques, Physique-Chimie et option Mathématiques Expertes au lycée Pierre et Marie Curie à Neufchâteau",
        "parcours.p3": "1ère année de BUT Informatique à l'IUT Nancy-Charlemagne.",
        "parcours.p4": "2ème année de BUT Informatique à l'IUT Nancy-Charlemagne.",
        "parcours.p5": "Cast du tournoi Mario Kart et Valorant à la ULLAN à Metz.",
        "social.phone": "NUMÉRO",
        "social.pro": "Professionnel : ",
        "social.perso": "Personnel : ",
        "social.link": "Lien : ",
        "comp.tab.but": "COMPÉTENCES BUT",
        "comp.tab.tech": "LANGAGES & OUTILS",
        "comp.tab.lang": "LANGUES",
        "comp.tech.mastered": "LANGAGES MAÎTRISÉS",
        "comp.tech.learning": "EN APPRENTISSAGE",
        "comp.tech.tools": "OUTILS UTILISÉS",
        "lang.level.native": "NATIF",
        "lang.level.learning": "EN APPRENTISSAGE",
        "lang.fr": "Français",
        "lang.en": "Anglais",
        "lang.es": "Espagnol",
        "lang.fi": "Finnois",
        "proj.filter.all": "TOUT",
        "proj.filter.data": "DONNÉES",
        "proj.filter.dev": "DEV / LOGICIEL",
        "proj.filter.team": "GESTION / ÉQUIPE",
        "role.gestion": "GESTION",
        "role.equipe": "ÉQUIPE",
        "role.data": "DONNÉES",
        "modal.view": "Voir le projet",
        "role.ia": "IA",
        "comp.watermark": "COMPETENCES",
        "modal.close": "FERMER",
        "radar.labels": ['Développement', ['Optimisation', "d'application"], ['Administration', 'réseaux'], 'Données', ['Gestion', 'de projet'], ['Travailler', 'en équipe']]
    },
    en: {
        "menu.moi": "ABOUT ME",
        "menu.parcours": "BACKGROUND",
        "menu.projets": "PROJECTS",
        "menu.competences": "SKILLS",
        "btn.back": "BACK",
        "footer.rights": "Design inspired by Persona 3. All assets and rights belong to Atlus / SEGA.",
        "moi.title": "ABOUT ME",
        "moi.bio": "I am passionate about technology and creation in all its forms. Alongside my computer science studies, I cultivate a rich visual and audio ecosystem: video editing, music production, and daily immersion in gaming culture and graphic design. My main driver? Insatiable curiosity. I love learning continuously, testing new software, and finding the sweet spot where pure engineering meets creative art.",
        "parcours.title": "BACKGROUND",
        "parcours.p1": "Observation internship at SAM Informatique",
        "parcours.p2": "French Baccalauréat with Honors (Mention Bien), majoring in Mathematics & Physics-Chemistry with Advanced Mathematics option at Lycée Pierre et Marie Curie in Neufchâteau",
        "parcours.p3": "1st year of BUT Computer Science at IUT Nancy-Charlemagne.",
        "parcours.p4": "2nd year of BUT Computer Science at IUT Nancy-Charlemagne.",
        "parcours.p5": "Commentator (caster) for the Mario Kart and Valorant tournaments at ULLAN in Metz.",
        "social.phone": "PHONE",
        "social.pro": "Professional: ",
        "social.perso": "Personal: ",
        "social.link": "Profile: ",
        "comp.tab.but": "DEGREE SKILLS",
        "comp.tab.tech": "LANGUAGES & TOOLS",
        "comp.tab.lang": "LANGUAGES",
        "comp.tech.mastered": "PROFICIENT LANGUAGES",
        "comp.tech.learning": "CURRENTLY LEARNING",
        "comp.tech.tools": "TOOLS & WORKFLOW",
        "lang.level.native": "NATIVE",
        "lang.level.learning": "LEARNING",
        "lang.fr": "French",
        "lang.en": "English",
        "lang.es": "Spanish",
        "lang.fi": "Finnish",
        "proj.filter.all": "ALL",
        "proj.filter.data": "DATA",
        "proj.filter.dev": "DEV / SOFTWARE",
        "proj.filter.team": "MANAGEMENT / TEAM",
        "role.gestion": "MANAGEMENT",
        "role.equipe": "TEAM",
        "role.data": "DATA",
        "modal.view": "View project",
        "role.ia": "AI",
        "comp.watermark": "SKILLS",
        "modal.close": "CLOSE",
        "radar.labels": ['Development', ['Application', 'Optimization'], ['Network', 'Admin'], 'Databases', ['Project', 'Management'], ['Teamwork']]
    }
};

let currentLang = localStorage.getItem('portfolio_lang') || 'fr';
const langToggleBtn = document.getElementById('lang-toggle');

function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('portfolio_lang', lang);
    document.documentElement.lang = lang;

    // Met à jour le texte du bouton (affiche la langue cible)
    if (langToggleBtn) {
        langToggleBtn.textContent = lang === 'fr' ? 'EN' : 'FR';
    }

    // Traduit tous les éléments balisés data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });

    // Met à jour les branches du graphique Chart.js
    if (typeof competencesChart !== 'undefined') {
        competencesChart.data.labels = translations[lang]['radar.labels'];
        competencesChart.update();
    }
}

if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
        applyLanguage(currentLang === 'fr' ? 'en' : 'fr');
    });
}

// Applique la langue sauvegardée au chargement
applyLanguage(currentLang);