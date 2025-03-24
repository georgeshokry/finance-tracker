<template>
  <v-card rounded="lg" color="red" elevation="3" variant="tonal" class="mx-auto">
    <v-card-item>
      <div>
        <div class="text-overline mb-1">Expanses</div>
        <v-icon :color="expansesView.color" :icon="expansesView.icon" size="x-large"></v-icon>
        <div class="text-h6 mb-1 text-red">{{useFinanceStore.totalExpenses}} {{ useFinanceStore.currentCurrency }}</div>
        <div class="text-caption">Your total Expanses</div>
      </div>
    </v-card-item>

    <v-card-actions>
      <v-btn prepend-icon="mdi-plus-box" variant="tonal" block @click="useFinanceStore.openDialog('add', 'expense')"> Add New Expanses </v-btn>
    </v-card-actions>
  </v-card>
</template>
  
<script lang="ts">
import {useFinanceStore} from "@/stores/finance"
import { expansesView } from "@/utils/constants";
export default {
  data(){
      return{
          dialog: false,
          expansesView: expansesView,
          useFinanceStore: useFinanceStore()
      }
  }
}
</script>
  