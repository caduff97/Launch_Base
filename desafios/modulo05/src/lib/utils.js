module.exports = {
    age(timestamp) {
        const today = new Date()
        const birthDate = new Date(timestamp)

        let age = today.getUTCFullYear() - birthDate.getUTCFullYear()
        const month = today.getUTCMonth() - birthDate.getUTCMonth()

        if (month < 0 || month == 0 && today.getUTCDate() < birthDate.getUTCDate()) {
            age = age -1
        }
    
        return age
    },
    graduation(level) {

        switch (level) {

            case "Medio": level = "Ensino Médio Completo"; break;
            case "Superior": level = "Ensino Superior Completo"; break;

        }

        return level

    },
    class_type(type) {

        switch (type) {

            case "D": type = "À Distância"; break;
            case "P": type = "Presencial"; break;
        
        }

        return type

    },
    date(timestamp) {

        const date = new Date(timestamp)

        const day = `0${date.getUTCDate()}`.slice(-2)
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const year = date.getUTCFullYear()
        
        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`,
            date: `${day}/${month}/${year}`
        }
    },
    grade(year) {

        switch (year) {
            
            case "5F": year = "5° ano - Ensino Fundamental"; break;
            case "6F": year = "6° ano - Ensino Fundamental"; break;
            case "7F": year = "7° ano - Ensino Fundamental"; break;
            case "8F": year = "8° ano - Ensino Fundamental"; break;
            case "9F": year = "9° ano - Ensino Fundamental"; break;
            case "1M": year = "1° ano - Ensino Médio"; break;
            case "2M": year = "2° ano - Ensino Médio"; break;
            case "3M": year = "3° ano - Ensino Médio"; break;
        
        }

        return year
    }
}