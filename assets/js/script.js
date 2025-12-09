// Initialize AOS Animations
        AOS.init({
            duration: 800,
            once: true
        });

        // 1. Hero Background Slider
        const slides = document.querySelectorAll('#hero-slider img');
        let currentSlide = 0;

        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }

        setInterval(nextSlide, 4000); // Change image every 4 seconds

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
        // Prevent background scrolling
        document.body.style.overflow = 'hidden'; 
    } else {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('active');
        backdrop.classList.remove('active');
        // Restore background scrolling
        document.body.style.overflow = 'auto'; 
    }
}

hamburger.addEventListener('click', toggleMenu);
backdrop.addEventListener('click', toggleMenu); // Close when clicking outside

/* --- Modal & Application Logic --- */

const modal = document.getElementById('application-modal');
const backdropOverlay = document.getElementById('modal-backdrop'); // Renamed to avoid conflict with menu backdrop
const modalTitle = document.getElementById('modal-title');
const progressTrack = document.getElementById('progress-track');
const contentArea = document.getElementById('modal-content-area');
const loader = document.getElementById('modal-loader');

// State Variables
let shareCount = 0;
const REQUIRED_SHARES = 5;

// Close Modal Function
function closeModal() {
    modal.classList.remove('active');
    backdropOverlay.classList.remove('active');
    // Reset Scroll
    document.body.style.overflow = 'auto';
}

// Open Modal Base Function
function openModalBase() {
    modal.classList.add('active');
    backdropOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    contentArea.style.display = 'block';
    loader.style.display = 'none';
}

/* --- 1. CHECK STATUS FLOW --- */
function openCheckStatus() {
    openModalBase();
    modalTitle.innerText = "Check Application Status";
    progressTrack.classList.remove('visible'); // Hide progress bar
    
    contentArea.innerHTML = `
        <div class="form-group">
            <label>Email Address</label>
            <input type="email" id="status-email" class="form-control" placeholder="Enter your email">
            <div class="error-msg" id="err-email">Please enter a valid email.</div>
        </div>
        <div class="form-group">
            <label>Application ID / Phone</label>
            <input type="text" id="status-id" class="form-control" placeholder="Enter ID or Phone Number">
            <div class="error-msg" id="err-id">This field is required.</div>
        </div>
        <button onclick="validateStatus()" class="btn-block">Check Status</button>
    `;
}

function validateStatus() {
    const email = document.getElementById('status-email').value;
    const id = document.getElementById('status-id').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isValid = true;

    // Validation
    if (!emailRegex.test(email)) {
        document.getElementById('err-email').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('err-email').style.display = 'none';
    }

    if (id.trim() === "") {
        document.getElementById('err-id').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('err-id').style.display = 'none';
    }

    if (isValid) {
        showLoaderAndRedirect("https://ey43.com/4/10246098");
    }
}

/* --- 2. START APPLICATION FLOW --- */
function openStartApp() {
    openModalBase();
    modalTitle.innerText = "Application Form";
    progressTrack.classList.add('visible'); // Show progress bar
    updateProgress(1);
    loadStep1();
}

// Update the visual progress bar
function updateProgress(stepNum) {
    // Reset all
    document.querySelectorAll('.step').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.step-line').forEach(el => el.classList.remove('active'));

    // Set active
    for(let i = 1; i <= stepNum; i++) {
        document.getElementById(`step-${i}-indicator`).classList.add('active');
        if(i > 1) document.getElementById(`line-${i-1}`).classList.add('active');
    }
}

// --- Step 1: Personal Details (Updated LGAs) ---
function loadStep1() {
    contentArea.innerHTML = `
        <div class="form-group"><label>Full Name</label><input type="text" id="app-name" class="form-control"></div>
        <div class="form-group"><label>Phone Number</label><input type="tel" id="app-phone" class="form-control"></div>
        <div class="form-group"><label>Email Address</label><input type="email" id="app-email" class="form-control"></div>
        
        <div class="form-group">
            <label>Local Government Area</label>
            <select id="app-lga" class="form-control">
                <option value="">Select LGA</option>
                <option value="Abak">Abak</option>
                <option value="Eastern Obolo">Eastern Obolo</option>
                <option value="Eket">Eket</option>
                <option value="Esit Eket">Esit Eket</option>
                <option value="Essien Udim">Essien Udim</option>
                <option value="Etim Ekpo">Etim Ekpo</option>
                <option value="Etinan">Etinan</option>
                <option value="Ibeno">Ibeno</option>
                <option value="Ibesikpo Asutan">Ibesikpo Asutan</option>
                <option value="Ibiono Ibom">Ibiono Ibom</option>
                <option value="Ika">Ika</option>
                <option value="Ikono">Ikono</option>
                <option value="Ikot Abasi">Ikot Abasi</option>
                <option value="Ikot Ekpene">Ikot Ekpene</option>
                <option value="Ini">Ini</option>
                <option value="Itu">Itu</option>
                <option value="Mbo">Mbo</option>
                <option value="Mkpat Enin">Mkpat Enin</option>
                <option value="Nsit Atai">Nsit Atai</option>
                <option value="Nsit Ibom">Nsit Ibom</option>
                <option value="Nsit Ubium">Nsit Ubium</option>
                <option value="Obot Akara">Obot Akara</option>
                <option value="Okobo">Okobo</option>
                <option value="Onna">Onna</option>
                <option value="Oron">Oron</option>
                <option value="Oruk Anam">Oruk Anam</option>
                <option value="Udung Uko">Udung Uko</option>
                <option value="Ukanafun">Ukanafun</option>
                <option value="Uruan">Uruan</option>
                <option value="Urue-Offong/Oruko">Urue-Offong/Oruko</option>
                <option value="Uyo">Uyo</option>
            </select>
        </div>
        <div class="form-group"><label>NIN</label><input type="text" id="app-nin" class="form-control"></div>
        <div class="error-msg" id="app-err">Please fill all fields correctly.</div>
        <button onclick="validateStep1()" class="btn-block">Continue</button>
    `;
}

function validateStep1() {
    // Simple validation: check if any required field is empty
    const ids = ['app-name', 'app-phone', 'app-email', 'app-lga', 'app-nin'];
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

// --- Step 3: Share Logic (Updated for Real WhatsApp Sharing) ---
function loadStep2() {
    updateProgress(2);
    shareCount = 0; // Reset share count
    contentArea.innerHTML = `
        <div style="text-align: center;">
            <i class="fab fa-whatsapp" style="font-size: 3rem; color: #25D366; margin-bottom: 10px;"></i>
            <h4>Share to Proceed</h4>
            <p style="margin-bottom: 20px; color: #555;">
                To complete your registration, you must share this news with <strong>5 WhatsApp Groups or Friends</strong>.
            </p>
            
            <div class="form-group">
                <div style="font-weight: bold; font-size: 1.2rem; margin-bottom: 10px;">
                    Progress: <span id="share-count">0</span>/5
                </div>
                <div style="height: 10px; background: #eee; border-radius: 5px; overflow: hidden; margin-bottom: 20px;">
                    <div id="share-bar" style="height: 100%; width: 0%; background: #25D366; transition: width 0.3s;"></div>
                </div>
            </div>

            <button onclick="handleShare()" class="btn-block btn-share">
                Share on WhatsApp
            </button>
            <p style="font-size: 0.8rem; color: #888; margin-top: 10px;">
                Note: The progress bar will update after you share.
            </p>
        </div>
    `;
}

function handleShare() {
    // 1. The Message based on the article
    const siteUrl = window.location.href; // Gets the current website link
    const text = `BREAKING: Akwa Ibom State Governor has launched an empowerment program for Akwa Ibom citizens! 
    
✅ Inclusive Employment for All
✅ Empowering Akwa Ibom Citizens
✅ Skills Training for others

Check if you are eligible and complete your application here: 
www.icd-official.com`;

    // 2. Create the WhatsApp URL
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;

    // 3. Open WhatsApp in a new tab/window
    window.open(whatsappUrl, '_blank');

    // 4. Increment Progress (Optimistic UI update)
    // We increment because we can't technically track if they *actually* hit send inside WhatsApp,
    // but this ensures they clicked the button to go there.
    shareCount++;
    
    const progress = Math.min((shareCount / REQUIRED_SHARES) * 100, 100);
    document.getElementById('share-count').innerText = Math.min(shareCount, REQUIRED_SHARES);
    document.getElementById('share-bar').style.width = `${progress}%`;

    // 5. Check if complete
    if (shareCount >= REQUIRED_SHARES) {
        // Change button text to indicate completion
        const btn = document.querySelector('.btn-share');
        btn.innerText = "Processing...";
        btn.disabled = true;

        setTimeout(() => {
            showLoaderAndNext(3, loadStep3);
        }, 1500); // Slight delay to allow user to return to tab
    }
}

// --- Step 4: Final ---
function loadStep3() {
    updateProgress(3);
    contentArea.innerHTML = `
        <div style="text-align: center;">
            <i class="fas fa-file-upload" style="font-size: 3rem; color: var(--accent-orange); margin-bottom: 10px;"></i>
            <h4>Almost Done!</h4>
            <p style="margin-bottom: 20px;">Click the button below to upload your academic certificates and finalize your complete application.</p>
            
            <a href="https://ey43.com/4/10246098" class="btn-block" style="text-decoration: none; display: inline-block;">
                Complete Application
            </a>
        </div>
    `;
}

// --- Helper: Loader & Transition ---
function showLoaderAndRedirect(url) {
    contentArea.style.display = 'none';
    loader.style.display = 'flex';
    
    setTimeout(() => {
        window.location.href = url;
    }, 3000);
}

function showLoaderAndNext(nextStepNum, nextFunction) {
    contentArea.style.display = 'none';
    loader.style.display = 'flex';
    
    setTimeout(() => {
        loader.style.display = 'none';
        contentArea.style.display = 'block';
        nextFunction();
    }, 3000);
}