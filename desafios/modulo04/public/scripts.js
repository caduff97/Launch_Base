// bold title

const currentPage = location.pathname
const menuItems = document.querySelectorAll("header .links a")

for (item of menuItems) {

    if (currentPage.includes(item.getAttribute("href"))) {
        item.classList.add("active")
    }
}

// deletion member/instructor confirmation

const formDelete = document.querySelector("#form-delete")
const formEdit = document.querySelector("form#edit")

formDelete.addEventListener("submit", (event) => {
    const confirmation = confirm("Deseja deletar?")
    if (!confirmation) {
        event.preventDefault()
    }
})

formEdit.addEventListener("submit", (event) => {
    const confirmation = confirm("Deseja editar?")
    if (!confirmation) {
        event.preventDefault()
    }
})
