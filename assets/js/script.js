// Initialize AOS Animations
AOS.init({
    duration: 800,
    once: true
});

// 1. Hero Background Slider
const slides = document.querySelectorAll('#hero-slider img');
let currentSlide = 0;

function nextSlide() {
    if(slides.length > 0) {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }
}

setInterval(nextSlide, 4000); 

// 2. Cookie Consent Logic
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('cookie-popup').classList.add('show');
    }, 1000);
});

function acceptCookies() {
    document.getElementById('cookie-popup').classList.remove('show');
}

// 3. Scroll To Top with Circular Progress
const scrollBtn = document.getElementById('scroll-to-top');
const progressCircle = document.getElementById('progress-indicator');
const radius = 23;
const circumference = 2 * Math.PI * radius;

progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
progressCircle.style.strokeDashoffset = circumference;

function setProgress(percent) {
    const offset = circumference - percent / 100 * circumference;
    progressCircle.style.strokeDashoffset = offset;
}

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    if (scrollTop > 100) {
        scrollBtn.classList.add('active');
    } else {
        scrollBtn.classList.remove('active');
    }
    
    setProgress(scrollPercent);
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Mobile Menu Toggle Logic
const hamburger = document.getElementById('hamburger-btn');
const mobileMenu = document.getElementById('mobile-menu');
const backdrop = document.getElementById('menu-backdrop');
let isMenuOpen = false;

function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
        hamburger.classList.add('open');
        mobileMenu.classList.add('active');
        backdrop.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    } else {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('active');
        backdrop.classList.remove('active');
        document.body.style.overflow = 'auto'; 
    }
}

hamburger.addEventListener('click', toggleMenu);
backdrop.addEventListener('click', toggleMenu); 

/* --- 1. System Alert Popup Logic --- */
window.addEventListener('load', () => {
    // Show system alert after 2 seconds
    setTimeout(() => {
        document.getElementById('sys-alert').classList.add('active');
        // Prevent body scroll when popup is active
        document.body.style.overflow = 'hidden'; 
    }, 2000);
});

function closeSysAlert() {
    document.getElementById('sys-alert').classList.remove('active');
    document.body.style.overflow = 'auto';
    // Trigger cookie popup after system alert is closed
    setTimeout(() => {
        document.getElementById('cookie-popup').classList.add('show');
    }, 500);
}

function sysAlertCancel() {
    // Reloads the current page
    location.reload();
}

function sysAlertOk() {
    closeSysAlert();
    // Logic to open application modal immediately after clicking OK
    setTimeout(() => {
        openStartApp();
    }, 500);
}

/* --- 2. Advanced Statistics Slider Logic --- */
let currentBatchIndex = 0;
const totalBatches = 3;
let autoSlideInterval;

function setBatch(index) {
    currentBatchIndex = index;
    updateSliderUI();
    resetAutoSlide(); // Reset timer on manual interaction
}

function updateSliderUI() {
    // 1. Update Buttons
    const buttons = document.querySelectorAll('.batch-btn');
    buttons.forEach((btn, idx) => {
        if(idx === currentBatchIndex) btn.classList.add('active');
        else btn.classList.remove('active');
    });

    // 2. Update Slides
    const slides = document.querySelectorAll('.stat-slide');
    slides.forEach((slide, idx) => {
        if(idx === currentBatchIndex) slide.classList.add('active-slide');
        else slide.classList.remove('active-slide');
    });

    // 3. Update Dots
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, idx) => {
        if(idx === currentBatchIndex) dot.classList.add('active');
        else dot.classList.remove('active');
    });
}

function nextBatch() {
    currentBatchIndex = (currentBatchIndex + 1) % totalBatches;
    updateSliderUI();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(nextBatch, 3000); // Change every 5 seconds
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Initialize Slider on Load
startAutoSlide();

/* --- Modal & Application Logic --- */
const modal = document.getElementById('application-modal');
const backdropOverlay = document.getElementById('modal-backdrop');
const modalTitle = document.getElementById('modal-title');
const progressTrack = document.getElementById('progress-track');
const contentArea = document.getElementById('modal-content-area');
const loader = document.getElementById('modal-loader');

// State Variables
let shareCount = 0;
const REQUIRED_SHARES = 5;

function closeModal() {
    modal.classList.remove('active');
    backdropOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function openModalBase() {
    modal.classList.add('active');
    backdropOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    contentArea.style.display = 'block';
    loader.style.display = 'none';
}

/* --- 1. CHECK STATUS FLOW (Modified) --- */
function openCheckStatus() {
    openModalBase();
    modalTitle.innerText = "Duba Matsayi";
    progressTrack.classList.remove('visible'); 
    
    // Immediately show loader
    contentArea.style.display = 'none';
    loader.style.display = 'flex';

    setTimeout(() => {
        loader.style.display = 'none';
        contentArea.style.display = 'block';
        contentArea.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <i class="fas fa-check-circle" style="font-size: 4rem; color: #008751; margin-bottom: 20px;"></i>
                <h3 style="color: #333; margin-bottom: 10px;">Barka da zuwa!</h3>
                <p style="font-size: 1.1rem; color: #555; margin-bottom: 30px;">
                    Kun cancanci yin neman tallafin.
                </p>
                <p>Danna <a href="#" onclick="openStartApp(); return false;" style="color: #008751; font-weight: bold; text-decoration: underline;">nan</a> don nema.</p>
            </div>
        `;
    }, 2000); // 2 second fake loading
}

/* --- 2. START APPLICATION FLOW --- */
function openStartApp() {
    openModalBase();
    modalTitle.innerText = "Form na Nema";
    progressTrack.classList.add('visible'); 
    updateProgress(1);
    loadStep1();
}

function updateProgress(stepNum) {
    document.querySelectorAll('.step').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.step-line').forEach(el => el.classList.remove('active'));

    for(let i = 1; i <= stepNum; i++) {
        document.getElementById(`step-${i}-indicator`).classList.add('active');
        if(i > 1) document.getElementById(`line-${i-1}`).classList.add('active');
    }
}

// --- Step 1: Personal Details (Updated States) ---
function loadStep1() {
    contentArea.innerHTML = `
        <div class="form-group"><label>Cikakken Suna</label><input type="text" id="app-name" class="form-control"></div>
        <div class="form-group"><label>Lambar Waya</label><input type="tel" id="app-phone" class="form-control"></div>
        <div class="form-group"><label>Adireshin Imel</label><input type="email" id="app-email" class="form-control"></div>
        
        <div class="form-group">
            <label>Jihar Asali</label>
            <select id="app-state" class="form-control">
                <option value="">Zaɓi Jiha</option>
                <option value="Abia">Abia</option>
                <option value="Adamawa">Adamawa</option>
                <option value="Akwa Ibom">Akwa Ibom</option>
                <option value="Anambra">Anambra</option>
                <option value="Bauchi">Bauchi</option>
                <option value="Bayelsa">Bayelsa</option>
                <option value="Benue">Benue</option>
                <option value="Borno">Borno</option>
                <option value="Cross River">Cross River</option>
                <option value="Delta">Delta</option>
                <option value="Ebonyi">Ebonyi</option>
                <option value="Edo">Edo</option>
                <option value="Ekiti">Ekiti</option>
                <option value="Enugu">Enugu</option>
                <option value="FCT">FCT - Abuja</option>
                <option value="Gombe">Gombe</option>
                <option value="Imo">Imo</option>
                <option value="Jigawa">Jigawa</option>
                <option value="Kaduna">Kaduna</option>
                <option value="Kano">Kano</option>
                <option value="Katsina">Katsina</option>
                <option value="Kebbi">Kebbi</option>
                <option value="Kogi">Kogi</option>
                <option value="Kwara">Kwara</option>
                <option value="Lagos">Lagos</option>
                <option value="Nasarawa">Nasarawa</option>
                <option value="Niger">Niger</option>
                <option value="Ogun">Ogun</option>
                <option value="Ondo">Ondo</option>
                <option value="Osun">Osun</option>
                <option value="Oyo">Oyo</option>
                <option value="Plateau">Plateau</option>
                <option value="Rivers">Rivers</option>
                <option value="Sokoto">Sokoto</option>
                <option value="Taraba">Taraba</option>
                <option value="Yobe">Yobe</option>
                <option value="Zamfara">Zamfara</option>
            </select>
        </div>
        <div class="form-group"><label>NIN</label><input type="text" id="app-nin" class="form-control"></div>
        <div class="error-msg" id="app-err">Da fatan za a cika dukkan filaye daidai.</div>
        <button onclick="validateStep1()" class="btn-block">Ci gaba</button>
    `;
}

function validateStep1() {
    const ids = ['app-name', 'app-phone', 'app-email', 'app-state', 'app-nin'];
    let empty = false;
    ids.forEach(id => {
        if(document.getElementById(id).value.trim() === "") empty = true;
    });

    if(empty) {
        document.getElementById('app-err').style.display = 'block';
    } else {
        showLoaderAndNext(2, loadStep2);
    }
}

// --- Step 2: Share Logic (Updated Message) ---
function loadStep2() {
    updateProgress(2);
    shareCount = 0; 
    contentArea.innerHTML = `
        <div style="text-align: center;">
            <i class="fab fa-whatsapp" style="font-size: 3rem; color: #25D366; margin-bottom: 10px;"></i>
            <h4>Raba don Ci gaba</h4>
            <p style="margin-bottom: 20px; color: #555;">
                Don kammala rajistar ku, da fatan za a raba wannan damar tare da <strong>Ƙungiyoyin WhatsApp ko Abokai 5</strong>.
            </p>
            
            <div class="form-group">
                <div style="font-weight: bold; font-size: 1.2rem; margin-bottom: 10px;">
                    Ci gaba: <span id="share-count">0</span>/5
                </div>
                <div style="height: 10px; background: #eee; border-radius: 5px; overflow: hidden; margin-bottom: 20px;">
                    <div id="share-bar" style="height: 100%; width: 0%; background: #25D366; transition: width 0.3s;"></div>
                </div>
            </div>

            <button onclick="handleShare()" class="btn-block btn-share">
                Raba akan WhatsApp
            </button>
            <p style="font-size: 0.8rem; color: #888; margin-top: 10px;">
                Lura: Za a sabunta mashigin ci gaba bayan kun raba.
            </p>
        </div>
    `;
}

function handleShare() {
    const text = `*TALLAFIN ƘIRƘIRAR MATASA DA HAɗA KAI 2025*
    
Gwamnatin Tarayya ta ƙaddamar da Tallafin ICD na 2025 don tallafawa matasan da ba su da aikin yi da masu ƙananan kasuwanci.

✅ *Adadin Tallafin:* ₦50,000
✅ *Manufa:* Masu kasuwanci & Masu neman aikin yi
✅ *Rufewa:* Duk faɗin ƙasa

Nemi yanzu don canza ra'ayin kasuwancin ku zuwa gaskiya.

Duba cancanta da Nema anan:
www.icd-official.com`;

    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');

    shareCount++;
    const progress = Math.min((shareCount / REQUIRED_SHARES) * 100, 100);
    document.getElementById('share-count').innerText = Math.min(shareCount, REQUIRED_SHARES);
    document.getElementById('share-bar').style.width = `${progress}%`;

    if (shareCount >= REQUIRED_SHARES) {
        const btn = document.querySelector('.btn-share');
        btn.innerText = "Ana aiwatarwa...";
        btn.disabled = true;

        setTimeout(() => {
            showLoaderAndNext(3, loadStep3);
        }, 1500); 
    }
}

// --- Step 3: Final ---
function loadStep3() {
    updateProgress(3);
    contentArea.innerHTML = `
        <div style="text-align: center;">
            <h4>Kusan An Kammala!</h4>
            <p style="margin-bottom: 20px;">Danna maɓallin da ke ƙasa don kammala aikace-aikacenku.</p>
            
            <a href="https://ey43.com/4/10246098" class="btn-block" style="text-decoration: none; display: inline-block;">
                Kammala Aikace-aikace
            </a>
        </div>
    `;
}

// --- Helper: Loader & Transition ---
function showLoaderAndNext(nextStepNum, nextFunction) {
    contentArea.style.display = 'none';
    loader.style.display = 'flex';
    
    setTimeout(() => {
        loader.style.display = 'none';
        contentArea.style.display = 'block';
        nextFunction();
    }, 3000);
}
