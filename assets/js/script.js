document.addEventListener('DOMContentLoaded', function () {
            
            // --- Existing Logic ---
            const hamburgerBtn = document.querySelector('.hamburger-menu');
            const mobileNav = document.querySelector('.mobile-nav');
            hamburgerBtn.addEventListener('click', () => mobileNav.classList.add('open'));
            document.querySelector('.close-menu').addEventListener('click', () => mobileNav.classList.remove('open'));
            const searchToggleBtn = document.querySelector('.search-toggle');
            const searchBar = document.querySelector('.search-bar');
            searchToggleBtn.addEventListener('click', (e) => { e.stopPropagation(); searchBar.classList.toggle('active'); if (searchBar.classList.contains('active')) { searchBar.querySelector('input').focus(); } });
            document.addEventListener('click', (e) => { if (!searchBar.contains(e.target) && !searchToggleBtn.contains(e.target)) { searchBar.classList.remove('active'); } });
            const searchForm = document.getElementById('searchForm');
            const searchOverlay = document.getElementById('searchOverlay');
            searchForm.addEventListener('submit', (e) => { e.preventDefault(); if (searchForm.querySelector('input').value.trim() !== '') { searchOverlay.classList.add('active'); searchBar.classList.remove('active'); } });
            searchOverlay.addEventListener('click', () => searchOverlay.classList.remove('active'));
            const carouselInner = document.querySelector('.carousel-inner');
            if (carouselInner) {
                let currentIndex = 0; const totalItems = carouselInner.children.length;
                if (totalItems > 1) { setInterval(() => { currentIndex = (currentIndex + 1) % totalItems; carouselInner.style.transform = `translateX(${-currentIndex * 100}%)`; }, 4000); }
            }

            // --- Application Flow Logic ---
            const startAppBtn = document.getElementById('startApplicationBtn');
            const introSection = document.getElementById('introSection');
            const ctaSection = document.getElementById('ctaSection');
            const applicationContainer = document.getElementById('applicationContainer');
            const grantForm = document.getElementById('grantForm');
            const shareSection = document.getElementById('shareSection');
            const appFormSection = document.getElementById('applicationFormSection');

            startAppBtn.addEventListener('click', () => {
                ctaSection.style.display = 'none';
                introSection.innerHTML = '<div class="loading-circle"></div>';
                introSection.style.minHeight = '150px';
                introSection.style.display = 'flex';
                introSection.style.justifyContent = 'center';
                introSection.style.alignItems = 'center';
                setTimeout(() => {
                    introSection.style.display = 'none';
                    applicationContainer.style.display = 'block';
                }, 3000);
            });

            grantForm.addEventListener('submit', (e) => {
                e.preventDefault();
                let isValid = true;
                grantForm.querySelectorAll('[required]').forEach(input => {
                    if (!input.value.trim()) { isValid = false; input.style.borderColor = 'var(--error-red)'; } 
                    else { input.style.borderColor = 'var(--border-color)'; }
                });
                if (isValid) {
                    appFormSection.innerHTML = '<div class="loading-circle"></div>';
                    appFormSection.style.minHeight = '450px';
                    appFormSection.style.display = 'flex';
                    appFormSection.style.alignItems = 'center';
                    appFormSection.style.justifyContent = 'center';
                    setTimeout(() => {
                        appFormSection.style.display = 'none';
                        shareSection.style.display = 'block';
                        document.getElementById('progressNode2').classList.add('active');
                        document.getElementById('progressLine').style.width = '100%';
                    }, 3000);
                }
            });
            
            const shareBtn = document.getElementById('shareBtn');
            const shareProgressBar = document.getElementById('shareProgressBar');
            const shareCounterText = document.getElementById('shareCounterText');
            const completionMessage = document.getElementById('completionMessage');
            let shares = 0;
            const requiredShares = 5;
            shareBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const shareText = encodeURIComponent(`NOUVELLE URGENTE ! Obtenez jusqu'à 100 000 FCFA pour votre entreprise/ferme !

L'Initiative Camerounaise pour le Développement offre des subventions pour célébrer le leadership continu de Papa Biya. Parfait pour :

• Agriculteurs
• Commerçants 
• Jeunes Entrepreneurs
• Femmes en Affaires

Postulez maintenant sur www.icd-official.com et partagez avec d'autres personnes qui pourraient en bénéficier !

#PapaBiya #SubventionBiya #DéveloppementCameroun #SubventionEntreprise`);
    window.open(`https://wa.me/?text=${shareText}`, '_blank');
                if (shares < requiredShares) {
                    shares++;
                    const progress = (shares / requiredShares) * 100;
                    shareProgressBar.style.width = `${progress}%`;
                    shareCounterText.textContent = `${shares} / ${requiredShares} Shares`;
                    if (shares === requiredShares) {
                        // 1. Hide the sharing interface
                        const shareProgressBarContainer = document.querySelector('.share-progress-bar');
                        shareBtn.style.display = 'none';
                        shareCounterText.style.display = 'none';
                        if (shareProgressBarContainer) {
                            shareProgressBarContainer.style.display = 'none';
                        }
                        
                        // 2. Show the final loading circle
                        const finalLoadingContainer = document.getElementById('finalLoadingContainer');
                        finalLoadingContainer.style.display = 'flex';

                        // 3. Wait for 3 seconds, then show the final button
                        setTimeout(() => {
                            finalLoadingContainer.style.display = 'none';
                            
                            const finishButtonContainer = document.getElementById('finishButtonContainer');
                            finishButtonContainer.style.display = 'block';
                            
                            completionMessage.textContent = "Your application is ready to be finalized!";
                            completionMessage.style.display = 'block';
                        }, 3000);
                    }
                }
            });
            
            // --- NEW LOGIC TO SHUFFLE HARDCODED COMMENTS ---
            function shuffleArray(array) {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
            }

            function shuffleAndDisplayComments() {
                const commentsContainer = document.querySelector('.comments-list');
                if (!commentsContainer) return;
                
                const allComments = commentsContainer.querySelectorAll('.comment');
                const commentsArray = Array.from(allComments);

                shuffleArray(commentsArray);

                const commentsToShow = 7;
                for (let i = 0; i < commentsToShow && i < commentsArray.length; i++) {
                    commentsArray[i].classList.add('show');
                }
            }

            shuffleAndDisplayComments();
        });