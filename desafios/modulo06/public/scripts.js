const Mask = {
    apply(input, funcao) {
        input.value = input.value.replace(/\D/g, "")
        setTimeout(() => {
            input.value = Mask[funcao](input.value)
        }, 1);
    },
    formatCPF(value) {
        
        if(value.length > 11) value = value.slice(0,11)
    

        value = value.replace(/(\d{3})(\d)/, "$1.$2")
        value = value.replace(/(\d{3})(\d)/, "$1.$2")
        value = value.replace(/(\d{3})(\d)/, "$1-$2")

        return value
    },  
    formatPercent(value) {
        if(value.length > 6) value = value.slice(0,6)
        value = new Intl.NumberFormat("pt-BR", {
            style: "percent",
            minimumFractionDigits: 2,
            maximumFractionDigits: 4
        }).format(value/10000)

        return value
    }
}