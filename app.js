/* ===== FIREBASE CONFIG ===== */
const firebaseConfig = {
    apiKey: "AIzaSyDummyKeyPlaceholder123",
    authDomain: "friendship-18-site.firebaseapp.com",
    projectId: "friendship-18-site",
    storageBucket: "friendship-18-site.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const storage = firebase.storage();

/* ===== STATE MANAGEMENT ===== */
let isAuthorized = false;
let currentUser = null;
let visitorCount = 0;

/* ===== INITIALIZATION ===== */
document.addEventListener('DOMContentLoaded', () => {
    initializeVisitorCounter();
    initializeEventListeners();
    loadVisitorCount();
});

/* ===== VISITOR COUNTER ===== */
function initializeVisitorCounter() {
    db.ref('stats/visitorCount').once('value', snapshot => {
        visitorCount = snapshot.val() || 0;
        visitorCount++;
        updateVisitorDisplay();
        db.ref('stats/visitorCount').set(visitorCount);
    });
}

function updateVisitorDisplay() {
    const countStr = String(visitorCount).padStart(6, '0');
    const displayEl = document.getElementById('visitorCount');
    displayEl.innerHTML = '';
    
    for (let i = 0; i < countStr.length; i++) {
        const digit = document.createElement('span');
        digit.className = 'counter-digit';
        digit.textContent = countStr[i];
        displayEl.appendChild(digit);
    }
}

function loadVisitorCount() {
    db.ref('stats/visitorCount').on('value', snapshot => {
        visitorCount = snapshot.val() || 0;
        updateVisitorDisplay();
    });
}

/* ===== LOGIN SYSTEM ===== */
document.getElementById('loginBtn').addEventListener('click', () => {
    const name = document.getElementById('nameInput').value.trim();
    const answer = document.getElementById('securityInput').value.trim().toLowerCase();
    
    if (!name) {
        alert('Bitte gib deinen Namen ein!');
        return;
    }
    
    // CHANGE THIS TO YOUR CORRECT ANSWER
    const correctAnswer = 'schule'; // Placeholder - update this!
    
    if (answer === correctAnswer) {
        isAuthorized = true;
        currentUser = name;
        document.getElementById('nameInput').value = '';
        document.getElementById('securityInput').value = '';
        alert(`Willkommen, ${name}! 🎉`);
        updateAuthState();
    } else {
        alert('Falsche Antwort! Versuchen Sie es erneut.');
        document.getElementById('securityInput').value = '';
    }
});

function updateAuthState() {
    const imageElements = document.querySelectorAll('.gallery-image.blurred, .toilet-note.verpixelt');
    imageElements.forEach(el => {
        el.classList.remove('blurred');
        el.classList.remove('verpixelt');
    });
}

/* ===== "DU KENNST UNS" BUTTON ===== */
document.getElementById('knowUsBtn').addEventListener('click', () => {
    playSound('click');
    document.getElementById('knowUsModal').classList.remove('hidden');
});

document.getElementById('confirmAgeBtn').addEventListener('click', () => {
    playSound('click');
    isAuthorized = true;
    document.getElementById('knowUsModal').classList.add('hidden');
    updateAuthState();
});

document.getElementById('cancelAgeBtn').addEventListener('click', () => {
    document.getElementById('knowUsModal').classList.add('hidden');
});

/* ===== EVENT LISTENERS ===== */
function initializeEventListeners() {
    // Stern (Self-Test)
    document.querySelector('[data-element="stern"]').addEventListener('click', openSelfTest);
    
    // Tourneeplakat
    document.querySelector('[data-element="tourneeplakat"]').addEventListener('click', openTourneeplakat);
    
    // Auto (Timeline)
    document.querySelector('[data-element="auto"]').addEventListener('click', openTimeline);
    
    // Briefkasten (Images)
    document.querySelector('[data-element="briefkasten"]').addEventListener('click', openImages);
    
    // Kalender
    document.querySelector('[data-element="kalender"]').addEventListener('click', openCalendar);
    
    // Post-It
    document.querySelector('[data-element="postit"]').addEventListener('click', openPinboard);
    
    // Toilette
    document.querySelector('[data-element="toilette"]').addEventListener('click', openToilet);
    
    // Notizbuch
    document.querySelector('[data-element="notizbuch"]').addEventListener('click', openCalendar);
    
    // Modal close buttons
    document.getElementById('quizCloseBtn').addEventListener('click', closeQuiz);
    document.getElementById('timelineCloseBtn').addEventListener('click', closeTimeline);
    document.getElementById('imagesCloseBtn').addEventListener('click', closeImages);
    document.getElementById('calendarCloseBtn').addEventListener('click', closeCalendar);
    document.getElementById('pinboardCloseBtn').addEventListener('click', closePinboard);
    document.getElementById('toiletCloseBtn').addEventListener('click', closeToilet);
    
    // Upload button
    document.getElementById('uploadImagesBtn').addEventListener('click', () => {
        document.getElementById('imageUploadInput').click();
    });
    
    // Image upload handler
    document.getElementById('imageUploadInput').addEventListener('change', handleImageUpload);
    
    // Add note button
    document.getElementById('addNoteBtn').addEventListener('click', openNoteInput);
    
    // Add voucher button
    document.getElementById('addVoucherBtn').addEventListener('click', openVoucherInput);
    
    // Fullscreen viewer close
    document.getElementById('fullscreenViewer').addEventListener('click', closeFullscreenViewer);
}

/* ===== SELF-TEST (STERN) ===== */
function openSelfTest() {
    playSound('whoosh');
    const stern = document.querySelector('[data-element="stern"]');
    stern.classList.add('star-spinning');
    
    setTimeout(() => {
        stern.classList.remove('star-spinning');
        document.getElementById('quizModal').classList.remove('hidden');
        loadQuiz();
    }, 1000);
}

function loadQuiz() {
    const quizContainer = document.getElementById('quizContainer');
    const quizResult = document.getElementById('quizResult');
    
    quizContainer.innerHTML = '';
    quizResult.classList.add('hidden');
    
    const questions = [
        {
            question: "Frage 1: Was ist dein Lieblingsfach?",
            options: ["Mathe", "Deutsch", "Sport", "Kunst"],
            correctCount: 2
        },
        {
            question: "Frage 2: Wann hast du am liebsten Schule?",
            options: ["Morgens", "Mittags", "Nachmittags", "Nie"],
            correctCount: 1
        },
        {
            question: "Frage 3: Was magst du an dieser Gruppe?",
            options: ["Der Humor", "Die Freundschaft", "Die Abenteuer", "Alles"],
            correctCount: 3
        }
    ];
    
    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'quiz-question';
        questionDiv.innerHTML = `<h3>${q.question}</h3>`;
        
        q.options.forEach(option => {
            questionDiv.innerHTML += `
                <label class="quiz-option">
                    <input type="checkbox" class="quiz-answer" data-question="${index}">
                    <span>${option}</span>
                </label>
            `;
        });
        
        quizContainer.appendChild(questionDiv);
    });
    
    const submitBtn = document.createElement('button');
    submitBtn.textContent = 'Ergebnis ansehen';
    submitBtn.style.cssText = 'width: 100%; padding: 12px; background: #c17a6b; color: white; border: none; border-radius: 8px; cursor: pointer; margin-top: 20px; font-weight: bold;';
    submitBtn.addEventListener('click', () => calculateQuizResult(questions));
    
    quizContainer.appendChild(submitBtn);
}

function calculateQuizResult(questions) {
    let score = 0;
    const answers = document.querySelectorAll('.quiz-answer');
    
    answers.forEach(answer => {
        if (answer.checked) score++;
    });
    
    showQuizResult(score);
    triggerConfetti();
    playSound('fanfare');
}

function showQuizResult(score) {
    const quizContainer = document.getElementById('quizContainer');
    const quizResult = document.getElementById('quizResult');
    
    quizContainer.classList.add('hidden');
    quizResult.classList.remove('hidden');
    
    let resultText = '';
    if (score <= 2) resultText = '⭐ Du bist ein geheimer Star!';
    else if (score <= 4) resultText = '🌟 Du bist ein echter Star!';
    else resultText = '✨ Du bist ein MEGA-Star!';
    
    quizResult.innerHTML = `
        <h3>Dein Ergebnis: ${score} Punkte</h3>
        <p>${resultText}</p>
    `;
}

function closeQuiz() {
    document.getElementById('quizModal').classList.add('hidden');
}

/* ===== TOURNEEPLAKAT ===== */
function openTourneeplakat() {
    playSound('pageflip');
    const img = document.getElementById('plakatImg');
    const viewer = document.getElementById('fullscreenViewer');
    const fullscreenImg = document.getElementById('fullscreenImg');
    
    if (img.src) {
        fullscreenImg.src = img.src;
        viewer.classList.remove('hidden');
    } else {
        alert('Bitte lade zuerst ein Plakat-Bild hoch!');
    }
}

function closeFullscreenViewer() {
    document.getElementById('fullscreenViewer').classList.add('hidden');
}

/* ===== TIMELINE (AUTO) ===== */
function openTimeline() {
    playSound('motorStart');
    document.getElementById('timelineModal').classList.remove('hidden');
    loadTimeline();
}

function loadTimeline() {
    const timelineContainer = document.getElementById('timelineContainer');
    timelineContainer.innerHTML = '';
    
    // Placeholder timeline events
    const events = [
        { date: '2008', title: 'Alles begann...', description: 'Hier ist die Geschichte unserer Freundschaft gestartet!' },
        { date: '2015', title: 'GE 230', description: 'Wir haben uns alle kennengelernt!' },
        { date: '2020', title: 'Die besten Jahre', description: 'Unvergessliche Momente zusammen!' },
        { date: '2026', title: 'Volljährig!', description: 'Und jetzt sind wir 18! 🎉' }
    ];
    
    events.forEach(event => {
        const eventDiv = document.createElement('div');
        eventDiv.className = 'timeline-event';
        eventDiv.innerHTML = `
            <div class="timeline-content">
                <h3>${event.date} - ${event.title}</h3>
                <p>${event.description}</p>
            </div>
        `;
        timelineContainer.appendChild(eventDiv);
    });
    
    // Add input form for new events
    const inputDiv = document.createElement('div');
    inputDiv.style.cssText = 'margin-top: 30px; padding: 20px; background: #f9f9f9; border-radius: 10px;';
    inputDiv.innerHTML = `
        <h3 style="margin-bottom: 15px;">Neues Event hinzufügen</h3>
        <input type="text" placeholder="Jahr" id="eventYear" style="width: 100%; padding: 8px; margin-bottom: 10px; border: 1px solid #ddd; border-radius: 5px;">
        <input type="text" placeholder="Titel" id="eventTitle" style="width: 100%; padding: 8px; margin-bottom: 10px; border: 1px solid #ddd; border-radius: 5px;">
        <textarea placeholder="Beschreibung" id="eventDesc" style="width: 100%; padding: 8px; margin-bottom: 10px; border: 1px solid #ddd; border-radius: 5px; min-height: 60px;"></textarea>
        <button id="addEventBtn" style="width: 100%; padding: 10px; background: #c17a6b; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">Event speichern</button>
    `;
    timelineContainer.appendChild(inputDiv);
    
    document.getElementById('addEventBtn').addEventListener('click', () => {
        const year = document.getElementById('eventYear').value;
        const title = document.getElementById('eventTitle').value;
        const desc = document.getElementById('eventDesc').value;
        
        if (year && title && desc) {
            db.ref('timeline').push({ year, title, desc });
            loadTimeline();
        }
    });
}

function closeTimeline() {
    document.getElementById('timelineModal').classList.add('hidden');
}

/* ===== IMAGES GALLERY (BRIEFKASTEN) ===== */
function openImages() {
    playSound('mailboxSqueak');
    document.getElementById('imagesModal').classList.remove('hidden');
    loadImages();
}

function loadImages() {
    const gallery = document.getElementById('imagesGallery');
    gallery.innerHTML = '';
    
    db.ref('images').on('value', snapshot => {
        snapshot.forEach(child => {
            const image = child.val();
            const img = document.createElement('img');
            img.src = image.url;
            img.className = 'gallery-image';
            if (!isAuthorized) img.classList.add('blurred');
            
            img.addEventListener('click', () => {
                const viewer = document.getElementById('fullscreenViewer');
                document.getElementById('fullscreenImg').src = image.url;
                viewer.classList.remove('hidden');
            });
            
            gallery.appendChild(img);
        });
    });
}

function handleImageUpload(event) {
    const files = event.target.files;
    
    Array.from(files).forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const timestamp = Date.now() + index;
            const ref = db.ref(`images/${timestamp}`);
            
            // For demo: store as data URL (in production, use Firebase Storage)
            ref.set({
                url: e.target.result,
                timestamp: timestamp,
                uploader: currentUser || 'Anonym'
            });
        };
        reader.readAsDataURL(file);
    });
    
    event.target.value = '';
    loadImages();
}

function closeImages() {
    document.getElementById('imagesModal').classList.add('hidden');
}

/* ===== CALENDAR ===== */
function openCalendar() {
    playSound('calendarFlip');
    document.getElementById('calendarModal').classList.remove('hidden');
    loadCalendar();
}

function loadCalendar() {
    const calendarContainer = document.getElementById('calendarContainer');
    calendarContainer.innerHTML = '';
    
    // Simple calendar grid
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    
    const monthNames = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    
    let html = `<h3 style="text-align: center; margin-bottom: 20px;">${monthNames[month]} ${year}</h3>`;
    html += '<div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 5px;">';
    
    const dayNames = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
    dayNames.forEach(day => {
        html += `<div style="text-align: center; font-weight: bold; padding: 5px;">${day}</div>`;
    });
    
    for (let i = 0; i < firstDay - 1; i++) {
        html += '<div></div>';
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
        html += `<div style="border: 1px solid #ddd; padding: 10px; text-align: center; cursor: pointer; border-radius: 5px;" class="calendar-day" data-day="${day}">${day}</div>`;
    }
    
    html += '</div>';
    calendarContainer.innerHTML = html;
    
    // Load entries
    loadCalendarEntries();
}

function loadCalendarEntries() {
    db.ref('calendar').on('value', snapshot => {
        snapshot.forEach(child => {
            const entry = child.val();
            const dayElement = document.querySelector(`.calendar-day[data-day="${entry.day}"]`);
            if (dayElement) {
                dayElement.style.background = '#f0e6d3';
                dayElement.title = entry.text;
            }
        });
    });
}

function closeCalendar() {
    document.getElementById('calendarModal').classList.add('hidden');
}

/* ===== PINBOARD (POST-IT) ===== */
function openPinboard() {
    playSound('paperTear');
    document.getElementById('pinboardModal').classList.remove('hidden');
    loadPinboard();
}

function loadPinboard() {
    const pinboardContainer = document.getElementById('pinboardContainer');
    pinboardContainer.innerHTML = '';
    
    db.ref('pinboard').orderByChild('timestamp').limitToLast(50).on('value', snapshot => {
        let notes = [];
        snapshot.forEach(child => {
            notes.push(child.val());
        });
        
        notes.reverse();
        notes.forEach((note, index) => {
            const noteEl = document.createElement('div');
            noteEl.className = 'pinboard-note';
            noteEl.style.left = Math.random() * (80 - 20) + 20 + '%';
            noteEl.style.top = (index * 30) % 400 + 'px';
            noteEl.style.transform = `rotate(${Math.random() * 20 - 10}deg)`;
            noteEl.textContent = note.text;
            pinboardContainer.appendChild(noteEl);
        });
    });
}

function openNoteInput() {
    const text = prompt('Schreib deine Danksagung:');
    if (text && text.trim()) {
        db.ref('pinboard').push({
            text: text.trim(),
            timestamp: Date.now(),
            author: currentUser || 'Anonym'
        });
        loadPinboard();
    }
}

function closePinboard() {
    document.getElementById('pinboardModal').classList.add('hidden');
}

/* ===== TOILET NOTES ===== */
function openToilet() {
    playSound('flush');
    // Show water animation
    const animation = document.createElement('div');
    animation.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 100px; z-index: 999;';
    animation.innerHTML = '🌊🦆';
    document.body.appendChild(animation);
    
    setTimeout(() => {
        animation.remove();
        document.getElementById('toiletModal').classList.remove('hidden');
        loadToiletNotes();
    }, 2000);
}

function loadToiletNotes() {
    const toiletContainer = document.getElementById('toiletContainer');
    toiletContainer.innerHTML = '';
    
    db.ref('toilet').on('value', snapshot => {
        let notes = [];
        snapshot.forEach(child => {
            notes.push(child.val());
        });
        
        notes.forEach((note, index) => {
            const noteEl = document.createElement('div');
            noteEl.className = 'toilet-note';
            if (!isAuthorized) noteEl.classList.add('verpixelt');
            noteEl.style.left = Math.random() * 80 + '%';
            noteEl.style.top = Math.random() * 80 + '%';
            noteEl.style.transform = `rotate(${Math.random() * 30 - 15}deg)`;
            noteEl.textContent = note.text;
            
            noteEl.addEventListener('click', () => {
                const viewer = document.getElementById('fullscreenViewer');
                const img = document.getElementById('fullscreenImg');
                img.style.backgroundImage = 'none';
                img.textContent = note.text;
                img.style.cssText = 'width: auto; height: auto; padding: 40px; background: #c0c0c0; border: 2px dashed #999; font-size: 16px; max-width: 80vw;';
                viewer.classList.remove('hidden');
            });
            
            toiletContainer.appendChild(noteEl);
        });
    });
}

function closeToilet() {
    playSound('bubble');
    document.getElementById('toiletModal').classList.add('hidden');
}

/* ===== CONFETTI ===== */
function triggerConfetti() {
    const container = document.getElementById('confettiContainer');
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.backgroundColor = ['#ff6b6b', '#ffd93d', '#6bcf7f', '#4d96ff', '#ff6bcf'][Math.floor(Math.random() * 5)];
        
        container.appendChild(confetti);
        
        setTimeout(() => {
            confetti.classList.add('confetti-falling');
        }, i * 10);
        
        setTimeout(() => {
            confetti.remove();
        }, 3000 + i * 10);
    }
}