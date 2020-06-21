const cards = document.querySelectorAll('.card')
const modalOverlay = document.querySelector('.modal-overlay')
const closeButton = document.querySelector('.buttons .close')
const fullscreenButton = document.querySelector('.buttons .fullscreen')

for (let card of cards) {
    card.addEventListener('click', () => {
        modalId = card.getAttribute('id')
        modalOverlay.querySelector('iframe').src = `https://rocketseat.com.br/${modalId}`
        modalOverlay.classList.add('active')
    })
}

closeButton.addEventListener('click', () => {
    modalOverlay.classList.remove('active')
    modalOverlay.querySelector('iframe').src = ""
    modalOverlay.classList.remove('fullscreen')
    fullscreenButton.querySelector('i').innerHTML = "fullscreen"
})


fullscreenButton.addEventListener('click', () => {
    if (modalOverlay.classList.contains('fullscreen')) {
        modalOverlay.classList.remove('fullscreen')
        fullscreenButton.querySelector('i').innerHTML = "fullscreen"
    } else {
        modalOverlay.classList.add('fullscreen')
        fullscreenButton.querySelector('i').innerHTML = "fullscreen_exit"
    }
})

