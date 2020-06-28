const user = {
    name: 'Carlos',
    transactions: [],
    balance: 0
}

function createTransaction(transaction) {
    if (transaction.type === 'credit') {
        user.balance += transaction.value
        user.transactions.push({ type: transaction.type, value: transaction.value })
    } else if (transaction.type === 'debit') {
        user.balance -= transaction.value
        user.transactions.push({ type: transaction.type, value: transaction.value })
    } else {
        console.log('operation error')
    }
}

function getHigherTransactionByTipe(type) {
    let higherTransaction = { value: 0 }
    let nTransactions = 0

    for (let transaction of user.transactions) {
        if ((transaction.type === type) && (transaction.value > higherTransaction.value)) {
            higherTransaction = transaction
            nTransactions += 1
        }
    }

    if (nTransactions === 0) {
        console.log(`no ${type} found`)
    } else {
        console.log(higherTransaction)
    }
}

function getAverageTransactionValue() {
    let nTransactions = 0
    let sum = 0

    for (transaction of user.transactions) {
        sum += transaction.value
        nTransactions += 1
    }

    if (nTransactions === 0) {
        console.log(`no transactions found`)
    } else {
        console.log(sum / nTransactions)
    }
}

function getTransactionsCount() {
    let transactionsCount = { credit: 0, debit: 0 }

    for (transaction of user.transactions) {
        if (transaction.type === 'credit') {
            transactionsCount.credit += 1
        } else if (transaction.type === 'debit') {
            transactionsCount.debit += 1
        }
    }

    console.log(transactionsCount)
}

createTransaction({ type: "credit", value: 50 });
createTransaction({ type: "credit", value: 120 });
createTransaction({ type: "debit", value: 80 });
createTransaction({ type: "debit", value: 30 });

console.log(user.balance);

getHigherTransactionByTipe('credit')
getHigherTransactionByTipe('debit')

getAverageTransactionValue()

getTransactionsCount()