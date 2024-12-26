// Gestion du mode sombre/clair
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
    themeToggle.textContent = savedTheme === 'dark-mode' ? 'Mode Clair' : 'Mode Nuit';
}

themeToggle.addEventListener('click', () => {
    const isDarkMode = body.classList.toggle('dark-mode');
    themeToggle.textContent = isDarkMode ? 'Mode Clair' : 'Mode Nuit';
    localStorage.setItem('theme', isDarkMode ? 'dark-mode' : '');
});

// Toggle de l'icône de menu et de la navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Scroll et sections actives
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                document.querySelector(`header nav a[href*=${id}]`).classList.add('active');
            });
            sec.classList.add('show-animate');
        } else {
            sec.classList.remove('show-animate');
        }
    });

    document.querySelector('header').classList.toggle('sticky', window.scrollY > 100);

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

    document.querySelector('footer').classList.toggle(
        'show-animate',
        this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight
    );
};

// Animation de confettis
const Confettiful = function(el) {
    this.el = el;
    this.containerEl = null;

    this.confettiFrequency = 3;
    this.confettiColors = ['#EF2964', '#00C09D', '#754ef9', '#48485E', '#ededed'];
    this.confettiAnimations = ['slow', 'medium', 'fast'];

    this._setupElements();
    this._renderConfetti();
};

Confettiful.prototype._setupElements = function() {
    const containerEl = document.createElement('div');
    this.el.style.position = this.el.style.position !== 'relative' && this.el.style.position !== 'absolute' ? 'relative' : this.el.style.position;

    containerEl.classList.add('confetti-container');
    this.el.appendChild(containerEl);
    this.containerEl = containerEl;
};

Confettiful.prototype._renderConfetti = function() {
    this.confettiInterval = setInterval(() => {
        const confettiEl = document.createElement('div');
        const confettiSize = `${Math.floor(Math.random() * 3) + 7}px`;
        const confettiBackground = this.confettiColors[Math.floor(Math.random() * this.confettiColors.length)];
        const confettiLeft = `${Math.floor(Math.random() * this.el.offsetWidth)}px`;
        const confettiAnimation = this.confettiAnimations[Math.floor(Math.random() * this.confettiAnimations.length)];

        confettiEl.classList.add('confetti', `confetti--animation-${confettiAnimation}`);
        confettiEl.style.left = confettiLeft;
        confettiEl.style.width = confettiSize;
        confettiEl.style.height = confettiSize;
        confettiEl.style.backgroundColor = confettiBackground;

        confettiEl.removeTimeout = setTimeout(() => {
            confettiEl.parentNode.removeChild(confettiEl);
        }, 3000);

        this.containerEl.appendChild(confettiEl);
    }, 25);
};

// Fonction pour démarrer l'animation de confettis
function start() {
    new Confettiful(document.querySelector('.js-container'));
    document.querySelector('.congrats').style.display = 'block';
}

// Gestion des événements
document.querySelector('.recruter').addEventListener('click', start);

const endanim = document.querySelector('#endanim');
endanim.addEventListener('click', () => {
    document.querySelector('.confetti-container').style.display = 'none';
    document.querySelector('.congrats').style.display = 'none';
});
