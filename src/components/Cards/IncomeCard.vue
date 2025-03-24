<template>
  <v-card rounded="lg" color="green" elevation="3" variant="tonal" class="mx-auto">
    <v-card-item>
      <div>
        <div class="text-overline mb-1">{{incomeView.name}}</div>
        <v-icon :color="incomeView.color" :icon="incomeView.icon" size="x-large"></v-icon>
        <div class="text-h6 mb-1 text-green">{{useFinanceStore.totalIncome}} {{ useFinanceStore.currentCurrency }}</div>
        <div class="text-caption">Your latest Income</div>
      </div>
    </v-card-item>

    <v-card-actions>
      <v-btn prepend-icon="mdi-plus-box" variant="tonal" block @click="useFinanceStore.openDialog('add', 'income')"> Add New Income </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import {useFinanceStore} from "@/stores/finance"
import {incomeView} from "@/utils/constants"
export default {
  data(){
      return{
        incomeView: incomeView,
        useFinanceStore: useFinanceStore()
      }
    }
}
</script>
