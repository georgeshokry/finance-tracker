import { defineStore } from 'pinia'
import type { Finance, DialogType, ExchangeRateResponse, Transaction } from '@/utils/types'
import { expansesView, incomeView, expense, income } from '@/utils/constants'
import { generateUniqueId } from '@/utils/helper'
const apiUrl = `${import.meta.env.VITE_EXCHANGE_API}${import.meta.env.VITE_EXCHANGE_API_KEY}/latest/`

export const useFinanceStore = defineStore('finance', {
  state: (): Finance => ({
    formDialog: false,
    confirmDialog: false,
    currentDialogType: 'add',
    dialogFinanceType: expense,
    title: 'Income',
    currencyList: [],
    currentCurrency: 'USD',
    transactionList: [] as Array<Transaction>,
    currentExchange: {} as ExchangeRateResponse,
    transactionToDeleteEdit: {} as Transaction,
    filters: {
      dateRange: [] as Array<string | Date>,
      category: '',
    },
    loading: false,
  }),
  getters: {
    getFormDialogSwitch(state): boolean {
      return state.formDialog
    },
    getCurrentDialogIcon(state): string {
      return state.currentDialogType === 'add' ? incomeView.icon : expansesView.icon
    },
    getExpensesList(state): Transaction[] {
      return state.transactionList
    },
    getConfirmDialog(state): boolean {
      return state.confirmDialog
    },
    filterTransactions(state) {
      const startDateFilter = state.filters.dateRange.length > 0 ? state.filters.dateRange[0] : null
      const endDateFilter =
        state.filters.dateRange.length > 0
          ? state.filters.dateRange[state.filters.dateRange.length - 1]
          : null
      return state.transactionList.filter((transaction) => {
        const matchesCategory =
          !state.filters.category || transaction.category === state.filters.category

        const matchesDateRange =
          (!startDateFilter || new Date(transaction.date) >= new Date(startDateFilter)) &&
          (!endDateFilter || new Date(transaction.date) <= new Date(endDateFilter))

        return matchesCategory && matchesDateRange
      })
    },
    getGroupByCategory(state) {
      const store = useFinanceStore()
      const groupedTotals = state.transactionList.reduce<Record<string, number>>(
        (acc, transaction) => {
          const { category, amount, currency } = transaction

          if (category && !acc[category]) {
            acc[category] = 0
          }

          if (category) {
            acc[category] += store.convertToBaseCurrency(amount, currency)
          }

          return acc
        },
        {},
      )
      return groupedTotals
    },
    totalIncome(state): number {
      const store = useFinanceStore()
      return Math.ceil(
        state.transactionList
          .filter((transaction) => transaction.transactionType === 'income')
          .reduce(
            (total, transaction) =>
              total + store.convertToBaseCurrency(transaction.amount, transaction.currency),
            0,
          ),
      )
    },

    totalExpenses(state): number {
      const store = useFinanceStore()
      return Math.ceil(
        state.transactionList
          .filter((transaction) => transaction.transactionType === 'outcome')
          .reduce(
            (total, transaction) =>
              total + store.convertToBaseCurrency(transaction.amount, transaction.currency),
            0,
          ),
      )
    },
  },
  actions: {
    switchDialogShow() {
      this.formDialog = !this.formDialog
    },
    openDialog(type: DialogType, action: typeof expense | typeof income) {
      this.currentDialogType = type
      this.title = action
      this.dialogFinanceType = action
      this.switchDialogShow()
    },
    async fetchExchangeRate() {
      this.loading = true
      try {
        const response = await fetch(`${apiUrl}${this.currentCurrency}`)
        const data = await response.json()

        if (data && data.result === 'success') {
          this.currentExchange = await data
        }
        this.listCurrencyData(this.currentExchange.conversion_rates)
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    async changeCurrency(newCurrency: string) {
      this.currentCurrency = newCurrency
      await this.fetchExchangeRate()
    },
    listCurrencyData(conversionRates: Record<string, number>) {
      if (Object.keys(conversionRates).length) {
        this.currencyList = Object.keys(conversionRates)
      }
    },
    saveTransaction(transactionData: Transaction) {
      this.transactionList.push({
        ...transactionData,
        id: generateUniqueId(),
      })
    },
    openConfirmDialog(itemToDelete: Transaction | null) {
      if (itemToDelete) {
        this.transactionToDeleteEdit = itemToDelete
      } else {
        this.transactionToDeleteEdit = {} as Transaction
      }
      this.switchDeleteDialogShow()
    },
    confirmDeleteTransaction() {
      if (this.transactionToDeleteEdit) {
        this.transactionList = this.transactionList.filter(
          (item: Transaction) => item.id !== this.transactionToDeleteEdit.id,
        )
        this.transactionToDeleteEdit = {} as Transaction
        this.switchDeleteDialogShow()
      }
    },
    switchDeleteDialogShow() {
      this.confirmDialog = !this.confirmDialog
    },
    openEditTransaction(itemToEdit: Transaction, type: DialogType) {
      this.transactionToDeleteEdit = itemToEdit
      this.currentDialogType = type
      this.switchDialogShow()
    },
    resetFilters() {
      this.filters = {
        dateRange: [],
        category: '',
      }
    },
    convertToBaseCurrency(amount: number, currency: string): number {
      if (this.currentExchange.conversion_rates) {
        if (!this.currentExchange.conversion_rates[currency]) return amount
        return parseFloat((amount / this.currentExchange.conversion_rates[currency]).toFixed(3))
      }
      return amount
    },
    totalNetBalance(): number {
      return Math.ceil(this.totalIncome - this.totalExpenses)
    },
  },
})
