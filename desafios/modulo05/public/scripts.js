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

if (formDelete) {
    formDelete.addEventListener("submit", (event) => {
        const confirmation = confirm("Deseja deletar?")
        if (!confirmation) {
            event.preventDefault()
        }
    })
}

if (formEdit) {
    formEdit.addEventListener("submit", (event) => {
        const confirmation = confirm("Deseja editar?")
        if (!confirmation) {
            event.preventDefault()
        }
    })
}

// Pagination

function paginate(selectedPage, totalPages) {
    
    let pages = [],
        oldPage


    for (let currentPage = 1; currentPage <= totalPages; currentPage++) {

        const firstAndLastPages = currentPage <= 2 || currentPage > (totalPages - 2)
        const intermediatePages = totalPages <= 7 || (selectedPage - currentPage) == 1 || (selectedPage == currentPage) || (selectedPage - currentPage) == -1

        if(firstAndLastPages || intermediatePages) {

            if(oldPage && currentPage - oldPage > 2) {
                pages.push('...')
            }

            if(oldPage && currentPage - oldPage == 2) {
                pages.push(oldPage+1)
            }

            pages.push(currentPage)

            oldPage = currentPage
        }
        
    }
    
    return pages
}

function createPagination (pagination) {

    const filter = pagination.dataset.filter
    const total = +pagination.dataset.total
    const currentPage = +pagination.dataset.page
    const pages = paginate( currentPage, total )
    
    let elements = ''

    for(let page of pages) {
        if(String(page).includes('...')) {
            elements += `<span>${page}</span>`
        } else {
            if(filter) {
                
                if(currentPage == page) {
                    elements += `<a href=?page=${page}&filter=${filter}><strong>${page}</strong></a>`
                } else {
                    elements += `<a href=?page=${page}&filter=${filter}>${page}</a>`
                }
            } else {
                if(currentPage == page) {
                    elements += `<a href=?page=${page}><strong>${page}</strong></a>`
                } else {
                    elements += `<a href=?page=${page}>${page}</a>`
                }
            }
        }
    }

    pagination.innerHTML = elements
    
}

const pagination = document.querySelector(".pagination")

if(pagination) {
    createPagination(pagination)
}