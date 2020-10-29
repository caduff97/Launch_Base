// bold title

const currentPage = location.pathname
const menuItems = document.querySelectorAll("header .links a")

for (item of menuItems) {
    if (currentPage.includes(item.getAttribute("href"))) {
        item.classList.add("active")
    }
}

// Deletion member/instructor confirmation
const formDelete = document.querySelector("#form-delete")

formDelete.addEventListener("submit", (event) => {
    const confirmation = confirm("Deseja deletar?")
    if (!confirmation) {
        event.preventDefault()
    }
})