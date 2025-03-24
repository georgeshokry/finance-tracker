<template>
  <v-card class="mx-auto" color="transparent" flat>
    <v-layout full-height>
      <v-app-bar
        color="primary"
        density="compact"
      >
        <template v-slot:prepend>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title>Finance Tracker</v-app-bar-title>

        <template v-slot:append>
          <v-menu :close-on-content-click="false" max-height="300px">
            <template v-slot:activator="{ props }">
              <v-btn prepend-icon="mdi-cash-sync" append-icon="mdi-chevron-down" variant="outlined" v-bind="props" class="mr-4" min-width="180px">
                {{ useFinanceStore.currentCurrency }}
              </v-btn>
            </template>

            <v-card>
              <!-- Search Input -->
              <v-text-field
                v-model="search"
                label="Search currency..."
                dense
                variant="outlined"
                class="pa-2"
                prepend-inner-icon="mdi-magnify"
              />

              <v-divider />

              <!-- Currency List -->
              <v-list>
                <v-list-item
                  v-for="(item, i) in filteredCurrencyList"
                  :key="i"
                  @click="selectCurrency(item)"
                >
                  <v-list-item-title>{{ item }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>
        </template>
      </v-app-bar>

      <v-main>
        <v-container class="custom-container" fluid>
          <v-row justify="center">
            <v-col cols="12" sm="6" md="4" lg="3" xxl="3">
              <IncomeCard />
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="3" align-self="center">
              <BalanceCard />
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="3">
              <ExpanseCard />
            </v-col>
          </v-row>
          <v-divider color="info" class="border-opacity-100 my-5"></v-divider>
          <v-row justify="center">
            <v-col cols="12">
              <ExpansesPieChart v-if="!useFinanceStore.loading" :series="chartData" :labels="chartLabels" width="500" height="500"/>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12">
              <ExpansesList />
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-layout>
    <FormDialog />
    <DeleteDialog />
  </v-card>
</template>

<script lang="ts">
import IncomeCard from '@/components/Cards/IncomeCard.vue'
import ExpanseCard from '@/components/Cards/ExpanseCard.vue'
import BalanceCard from '@/components/Cards/BalanceCard.vue'
import ExpansesList from '@/components/Table/TransactionsList.vue'
import ExpansesPieChart from '@/components/Charts/ExpansesPieChart.vue'
import FormDialog from '@/components/Dialogs/FormDialog.vue'
import {useFinanceStore} from "@/stores/finance"
import DeleteDialog from '@/components/Dialogs/DeleteDialog.vue'
import {expansesCategory} from "@/utils/constants"
import type {ExpansesCategory} from "@/utils/types"
import { mapStores } from 'pinia';
export default {
  components: {
    IncomeCard,
    ExpanseCard,
    BalanceCard,
    ExpansesList,
    ExpansesPieChart,
    FormDialog,
    DeleteDialog
  },
  data(){
    return{
      search: "",
      useFinanceStore: useFinanceStore()
      
    }
  },
  computed: {
    ...mapStores(useFinanceStore),
    filteredCurrencyList() {
      return this.useFinanceStore.currencyList.filter((item: string) =>
        item.toLowerCase().includes(this.search.toLowerCase())
      );
    },
    chartLabels(){
      return Object.values(expansesCategory).map((item: ExpansesCategory)=> item.label)
    },
    chartData(){
      return Object.values(this.useFinanceStore.getGroupByCategory)
    }
  },
  async beforeMount(){
    await this.useFinanceStore.fetchExchangeRate()
  },
  methods: {
    selectCurrency(item: string) {
      this.useFinanceStore.changeCurrency(item)
    },

  }
}
</script>
<style scoped>
.custom-container {
  max-width: 100%; /* Default for small screens */
}

@media (min-width: 960px) { /* md and up */
  .custom-container {
    max-width: 70%;
  }
}
</style>
