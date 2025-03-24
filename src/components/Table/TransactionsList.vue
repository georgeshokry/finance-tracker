<template>
    <v-card rounded="lg" elevation="3"  class="mx-auto">
        <TableFilters />
        <v-data-table :headers="headers" :items="useFinanceStore.filterTransactions">
            <template v-slot:item.amountExchange="{item}">
                {{useFinanceStore.convertToBaseCurrency(item.amount, item.currency)}} 
                ({{ useFinanceStore.currentCurrency }})
            </template>
            <template v-slot:item.transactionType="{item}">
                <v-chip 
                    :prepend-icon="transactionTypeBadgeIcon(item.transactionType)"  
                    :color="transactionTypeBadgeColor(item.transactionType)" 
                    class="text-capitalize"
                >
                    {{item.transactionType}}
                </v-chip>
            </template>
            <template v-slot:item.date="{item}">
                {{showFormateDate(item.date)}}
            </template>
            <template v-slot:item.actions="{item}">
                <v-row>
                    <v-tooltip location="top" text="Edit Transaction">
                        <template v-slot:activator="{ props }">
                            <v-btn v-bind="props" color="primary" icon="mdi-file-edit" size="x-small" class="mr-3" @click="useFinanceStore.openEditTransaction(item, 'edit')"></v-btn>
                        </template>
                    </v-tooltip>

                    <v-tooltip location="top" text="Delete Transaction">
                        <template v-slot:activator="{ props }">
                            <v-btn v-bind="props" color="red" icon="mdi-delete-circle" size="x-small" @click="useFinanceStore.openConfirmDialog(item)"></v-btn>
                        </template>
                    </v-tooltip>
                </v-row>
            </template>
        </v-data-table>
    </v-card>
  </template>
  
<script lang="ts">
import TableFilters from '@/components/Table/TableFilters.vue';
import {useFinanceStore} from "@/stores/finance"
import type {TransactionType} from "@/utils/types"
import {incomeView, expansesView, tableHeaders} from "@/utils/constants"
import {formatDate} from "@/utils/dateUtil"
export default {
    components:{
        TableFilters
    },
    data(){
        return{
            useFinanceStore: useFinanceStore(),
            headers: tableHeaders
        }
    },
    methods:{
        transactionTypeBadgeColor(transactionType: TransactionType): string{
            if(transactionType){
                return transactionType === 'income' ? incomeView.color : expansesView.color
            }
            return transactionType
        },
        transactionTypeBadgeIcon(transactionType: TransactionType): string{
            if(transactionType){
                return transactionType === 'income' ? incomeView.icon : expansesView.icon
            }
            return transactionType
        },
        showFormateDate(plainDate: Date): string{
            return formatDate(plainDate)
        }
    }
}
</script>
  