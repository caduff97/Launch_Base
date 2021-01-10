const Mask = {
    apply(input, func) {
        setTimeout(() => {
            input.value = Mask[func](input.value)
        },1)
    },
    formatBRL(value) {
        value = value.replace(/\D/g, "")

        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value/100)
    },
    formatCPF(value) {

    }
}

const PhotosUpload = {
    input: "",
    preview: document.querySelector("#photos-preview"),
    uploadLimit: 6,
    files: [],
    handleFileInput(event) {
        const { files: fileList } = event.target
        PhotosUpload.input = event.target

        const { preview, files, hasLimit, getAllFiles, getContainer } = PhotosUpload        

        if (hasLimit(event, fileList)) return

        Array.from(fileList).forEach(file => {

            files.push(file)

            const reader = new FileReader()

            reader.onload = () => {
                const image = new Image()
                image.src = String(reader.result)

                const div = getContainer(image)
                preview.appendChild(div)
            }

            reader.readAsDataURL(file)
        })

        PhotosUpload.input.files = getAllFiles()
    },
    hasLimit(event, fileList) {
        const { uploadLimit, preview } = PhotosUpload
        
        if (fileList.length > uploadLimit) {
            alert(`Envie no máximo ${uploadLimit} fotos`)
            event.preventDefault()
            return true
        }

        const photosDiv = []
        preview.childNodes.forEach(item => {
            if(item.classList && item.classList.value == "photo")
                photosDiv.push(item)
        })

        const totalPhotos = fileList.length + photosDiv.length

        if (totalPhotos > uploadLimit) {
            alert("Você atingiu o limite de fotos")
            event.preventDefault()
            return true
        }
            
    },
    getAllFiles() {
        const { files } = PhotosUpload

        const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer()

        files.forEach(file => dataTransfer.items.add(file))
        
        return dataTransfer.files
    },
    getContainer(image) {
        const { getRemoveButton, removePhoto } = PhotosUpload
        const div = document.createElement("div")

        div.classList.add("photo")
        div.onclick = removePhoto
        div.appendChild(image)
        div.appendChild(getRemoveButton())

        return div
    },
    getRemoveButton() {
        const button = document.createElement("i")
        button.classList.add("material-icons")
        button.innerHTML = "close"
        return button
    },
    removePhoto(event) {
        const { preview, files, getAllFiles } = PhotosUpload

        const photoDiv = event.target.parentNode
        const photosArray = Array.from(preview.children)
        const index = photosArray.indexOf(photoDiv)

        files.splice(index, 1)
        PhotosUpload.input.files = getAllFiles()

        photoDiv.remove()
    },
    removeOldPhoto(event) {
        const photoDiv = event.target.parentNode

        if(photoDiv.id) {
            const removedFiles = document.querySelector("input[name='removed_files']")
            if(removedFiles) {
                removedFiles.value += `${photoDiv.id},`
            }
        }

        photoDiv.remove()
    }
}

const ImageGallery = {
    highlight: document.querySelector(".gallery .highlight > img"),
    previews: document.querySelectorAll(".gallery-preview img"),
    setImage(e) {
        const { target } = e

        ImageGallery.previews.forEach(preview => preview.classList.remove("active"))
        target.classList.add("active")

        ImageGallery.highlight.src = target.src
        ImageGallery.highlight.alt = target.alt
        Lightbox.image.src = target.src
    }
}

const Lightbox = {
    target: document.querySelector(".lightbox-target"),
    image: document.querySelector(".lightbox-target img"),
    closeButton: document.querySelector(".lightbox-target a.lightbox-close"),
    open() {
        Lightbox.target.style.opacity = 1
        Lightbox.target.style.top = 0
        Lightbox.target.style.bottom = 0
        Lightbox.closeButton.style.top = 0
    },
    close() {
        Lightbox.target.style.opacity = 0
        Lightbox.target.style.top = "-100%"
        Lightbox.target.style.bottom = "initial"
        Lightbox.closeButton.style.top = "-80px"
    }
}