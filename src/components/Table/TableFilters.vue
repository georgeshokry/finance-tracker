<template>
    <v-card rounded="lg" flat class="mx-auto">   
        <v-card-text>
            <v-row d-flex justify="space-between">
                <div class="v-card-title ">
                    Your Transactions
                </div>

                <v-tooltip location="top" text="Download Transactions csv">
                    <template v-slot:activator="{ props }">
                        <v-btn v-bind="props" color="primary" icon="mdi-file-download" size="x-small" @click="downloadCSV"></v-btn>
                    </template>
                </v-tooltip>
            </v-row>
        </v-card-text>
        <v-container>
        <v-row fluid>
            <v-col cols="12" sm="12" md="5" lg="5" xxl="5">
                <v-select
                    v-model="useFinanceStore.filters.category"
                    :items="expensesCategoryList()"
                    label="Category"
                    item-title="label"
                    item-value="value"
                    density="compact"
                ></v-select>
            </v-col>
            <v-col cols="12" sm="12" md="5" lg="5" xxl="5">
                <v-date-input
                v-model="useFinanceStore.filters.dateRange"
                label="Select Date range"
                multiple="range"
                density="compact"
                prepend-icon=""
                ></v-date-input>
            </v-col>
            <v-col cols="2" sm="12" md="2" lg="2" xxl="2">
                <v-btn block variant="outlined" @click="useFinanceStore.resetFilters()"> Reset </v-btn>
            </v-col>
        </v-row>
    </v-container>
    </v-card>
</template>
  
<script lang="ts">
import { VDateInput } from 'vuetify/labs/VDateInput'
import type { ExpansesCategory, Transaction } from "@/utils/types"
import {expansesCategory} from "@/utils/constants"
import {useFinanceStore} from "@/stores/finance"
export default {
    components:{
        VDateInput
    },
    data(){
        return {
            useFinanceStore: useFinanceStore(),
        }
    },
    methods:{
      expensesCategoryList(){
        return Object.values(expansesCategory) as ExpansesCategory[]
      },
      downloadCSV() {
      let csvContent = "data:text/csv;charset=utf-8,";

      const headers = ["Name", "Category", "Description", "Amount", "Currency", "Date"];
      csvContent += headers.join(",") + "\n";

      this.useFinanceStore.filterTransactions.forEach((row: Transaction) => {
        const rowData = [row.name, row.category, row.description, row.amount, row.currency, row.date].join(",");
        csvContent += rowData + "\n";
      });

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "Transactions.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    }
}
</script>
  