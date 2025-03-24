export const expansesCategory = {
  food: {
    id: 0,
    value: 'food',
    label: 'Food',
    icon: 'mdi-food-outline',
  },
  transportation: {
    id: 1,
    value: 'transportation',
    label: 'Transportation',
    icon: 'mdi-plane-car',
  },
  bills: {
    id: 2,
    value: 'bills',
    label: 'Bills',
    icon: 'mdi-newspaper-variant-outline',
  },
  general: {
    id: 3,
    value: 'general',
    label: 'General',
    icon: '',
  },
}

export const expansesView = {
  name: 'Expanses',
  color: 'red',
  icon: 'mdi-bank-transfer-out',
}

export const incomeView = {
  name: 'Income',
  color: 'green',
  icon: 'mdi-bank-transfer-in',
}

export const balanceView = {
  name: 'Balance',
  color: 'blue',
  icon: 'mdi-wallet',
}

export const expense = 'expense'
export const income = 'income'

export const tableHeaders = [
  {
    title: 'Name',
    key: 'name',
  },
  {
    title: 'Category',
    key: 'category',
  },
  {
    title: 'Description',
    key: 'description',
  },
  {
    title: 'Amount',
    key: 'amount',
  },
  {
    title: 'Main Currency',
    key: 'currency',
  },
  {
    title: 'Conversion Amount',
    key: 'amountExchange',
  },
  {
    title: 'Date',
    key: 'date',
  },
  {
    title: 'Transaction Type',
    key: 'transactionType',
  },
  {
    title: 'Actions',
    key: 'actions',
  },
]
