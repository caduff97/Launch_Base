const modalOverlay = document.querySelector('.modal-overlay')
const cards = document.querySelectorAll('.card')


for (let card of cards) {
    card.addEventListener('click', () => {
        const videoId = card.getAttribute('id')
        window.location.href = `/project?id=${videoId}`
    })
}

document.querySelector('.close-modal').addEventListener('click', () => {
    modalOverlay.classList.remove('active')
    modalOverlay.querySelector('iframe').src = ""
})

