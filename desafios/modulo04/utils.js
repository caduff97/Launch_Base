module.exports = {
    age: function(timestamp) {
        const today = new Date()
        const birthDate = new Date(timestamp)

        let age = today.getUTCFullYear() - birthDate.getUTCFullYear()
        const month = today.getUTCMonth() - birthDate.getUTCMonth()

        if (month < 0 || month == 0 && today.getUTCDate() < birthDate.getUTCDate()) {
            age = age -1
        }
    
        return age
    },
    graduation: function(level) {

        let gradName = level

        if (level == "Medio") {
            gradName = "Ensino Médio Completo"
        } else if (level == "Superior") {
            gradName = "Ensino Superior Completo"
        }

        return gradName

    },
    class_type: function(type) {
        
        let classType = type

        if (type == "D") {
            classType = "À Distância"
        } else if (type == "P") {
            classType = "Presencial"
        }

        return classType

    },
    date: function(timestamp) {

        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return `${year}-${month}-${day}`
    }
}