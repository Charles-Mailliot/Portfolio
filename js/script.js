var menuLinks = document.querySelectorAll('.menu a');
var allPanels = document.querySelectorAll('.side-panel');
var closeBtn = document.querySelectorAll('.closeBtn');

//Ouverture
menuLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        let targetId = link.getAttribute('href');
        let targetPanel = document.getElementById('panel-' + targetId.substring(1));

        if (targetPanel) {
            event.preventDefault();
            closeAllPanels();

            targetPanel.classList.add('active');
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

//Tout fermer (au cas où)
function closeAllPanels() {
    allPanels.forEach(panel => {
        panel.classList.remove('active');
    });
    document.body.classList.remove('is-panel-open');
}

//Fermer en dehors du menu
document.addEventListener('click', (event) => {
    if (document.body.classList.contains('is-panel-open')) {
        let isClickInsidePanel = event.target.closest('.side-panel');
        let isClickOnMenu = event.target.closest('.menu a');

        if (!isClickInsidePanel && !isClickOnMenu) {
            closeAllPanels();
        }
    }
})