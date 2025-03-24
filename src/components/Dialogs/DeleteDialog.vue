<template>
  <div class="pa-4 text-center">
    <v-dialog
      v-model="useFinanceStore.getConfirmDialog"
      max-width="600"
    >
      <v-card>
      <v-card-title>
        <v-container>
          <v-row align="center">
            <v-icon class="mr-2" icon="mdi-delete-circle" size="x-large" color="red"></v-icon>
            <div class="text-h5 text-capitalize text-red">Delete Dialog</div>
          </v-row>
      </v-container>
      </v-card-title>

      <v-card-text>
          <v-row dense>
            <v-col
              cols="12"
            >
            Confirm Delete Transaction "{{ useFinanceStore.transactionToDeleteEdit.name }}"?
            </v-col>
          </v-row>
      </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text="No"
            variant="plain"
            @click="useFinanceStore.openConfirmDialog(null)"
          ></v-btn>

          <v-btn
            color="red"
            text="Delete!"
            variant="tonal"
            @click="useFinanceStore.confirmDeleteTransaction()"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import {useFinanceStore} from "@/stores/finance"


export default {

    data(){
        return{
            useFinanceStore: useFinanceStore(),
        }
    },
    methods:{

 
    }
}
</script>
    