<template>
    <v-card rounded="lg" color="primary" elevation="3" variant="tonal" class="mx-auto">
        <v-card-item>
            <div>
                <div class="text-overline mb-1">{{balanceView.name}}</div>
                <v-icon :color="balanceView.color" :icon="balanceView.icon" size="x-large"></v-icon>
                <div class="text-h5 mb-1 text-blue">{{useFinanceStore.totalNetBalance()}} {{ useFinanceStore.currentCurrency }}</div>
                <div class="text-caption">Your Total Net Balance</div>
            </div>
        </v-card-item>
    </v-card>
</template>

<script lang="ts">
import {balanceView} from "@/utils/constants"
import {useFinanceStore} from "@/stores/finance"
export default {
    data(){
        return{
            balanceView: balanceView,
            useFinanceStore: useFinanceStore()
        }
    }
}
</script>
    