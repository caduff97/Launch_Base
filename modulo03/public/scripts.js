const modalOverlay = document.querySelector('.modal-overlay')
const cards = document.querySelectorAll('.card')


for (let card of cards) {
    card.addEventListener('click', () => {
        const videoId = card.getAttribute('id')
<<<<<<< HEAD
        modalOverlay.classList.add('active')
        modalOverlay.querySelector('iframe').src = `https://www.youtube.com/embed/${videoId}`
=======
        window.location.href = `/project?id=${videoId}`
>>>>>>> 032e35f2bc19b7f2b70d01790bd4cdf11b78ef73
    })
}

document.querySelector('.close-modal').addEventListener('click', () => {
    modalOverlay.classList.remove('active')
    modalOverlay.querySelector('iframe').src = ""
})

