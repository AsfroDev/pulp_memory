const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

window.onload = () => {
    
    spanPlayer.innerHTML = localStorage.getItem('player');

    if (timer >= 2) {

        window.location = '../pages/login.html';

    } else {
        setTimeout(() => {
            
            startTimer();
            loadGame();
            
        }, 5000);
    }

}

const characters = [
    'vicent-james',
    'mia-wallace',
    'vicent-mia',
    'james',
    'porteiro',
    'vicent',
    'mia-overdose',
    'traficante',
    'ladroes'
];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
    const disableCards = document.querySelectorAll('.disable-card');

    if (disableCards.length === 18) {
        clearInterval(this.loop);    
        alert('Parabéns ' + localStorage.getItem('player') + '!  Seu tempo foi: ' + timer.innerHTML);
        window.location.href = '../pages/login.html';
    }
}

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter === secondCharacter) {
    
        firstCard.firstChild.classList.add('disable-card');
        secondCard.firstChild.classList.add('disable-card');

        firstCard = '';
        secondCard = '';

        checkEndGame();

    } else {
        setTimeout(() => {
            
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';
            
        }, 500);
    }
}

const revealCard = ({target}) => {

    if (target.parentNode.className.includes('reveal-card')) {
        return;
    } 

    if (firstCard === '') {

        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;

    } else if (secondCard === '') {

        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();

    }

}

const createCard = (character) => {

    const card = createElement('div','card');
    const front = createElement('div','face front');
    const back = createElement('div','face back');

    front.style.backgroundImage = `url('../images/${character}.PNG')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character);

    return card;
    
}

const loadGame = () =>{

    const duplicateCharacters = [ ...characters, ...characters ];

    const shuffledArray = duplicateCharacters.sort( () => Math.random() - 0.5  );

    shuffledArray.forEach((character) =>{
        
        const card =  createCard(character);
        grid.appendChild(card);

    });
}

const startTimer = () => {

    this.loop = setInterval(() => {
        const currentTimer = +timer.innerHTML;
        timer.innerHTML = currentTimer +1;
    }, 1000);

}
// melhorar timer
// tela de end game com botao reset p tela login e botao de abrir rank
// telinha de rank