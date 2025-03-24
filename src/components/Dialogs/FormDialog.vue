<template>
  <div class="pa-4 text-center">
    <v-dialog
      v-model="useFinanceStore.getFormDialogSwitch"
      max-width="600"
    >
    <v-form ref="formDialog" v-model="valid">
      <v-card>
        {{ formDialog.transactionType }}
      <v-card-title>
        <v-container>
          <v-row align="center">
            <v-icon class="mr-2" :icon="useFinanceStore.getCurrentDialogIcon" size="x-large"></v-icon>
            <div class="text-h5 text-capitalize">{{dialogTitle}}</div>
          </v-row>
      </v-container>
      </v-card-title>

      <v-card-text>
          <v-row dense>
            <v-col
              cols="12"
              :md="currentEditDataTransactionType ? '6': '12'"
              sm="6"
            >
              <v-text-field
                v-model="formDialog.name"
                label="Name"
                required
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
            <v-col
              v-if="currentEditDataTransactionType"
              cols="12"
              md="6"
              sm="6"
            >
            <v-select
                v-model="formDialog.category"
                :items="expensesCategoryList()"
                label="Category"
                item-title="label"
                item-value="value"
                :rules="[rules.required]"
                :required="currentEditDataTransactionType"
              ></v-select>
            </v-col>
            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-text-field
                v-model="formDialog.amount"
                label="Amount"
                :rules="[rules.amount]"
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
              sm="6"
            >
              <v-select
                v-model="formDialog.currency"
                :items="useFinanceStore.currencyList"
                label="Currency"
                :rules="[rules.required]"
                required
              ></v-select>
            </v-col>

            <v-col
              cols="12"
              md="4"
              sm="6"
            >
            <v-date-input
                v-model="formDialog.date"
                label="Select Date"
                prepend-icon=""
                :rules="[rules.required]"
                required
                ></v-date-input>
            </v-col>
            <v-col
              cols="12"
              md="12"
              sm="12"
            >
              <v-textarea 
                v-model="formDialog.description"
                label="Description"
                row-height="25"
                rows="3"
              >
              </v-textarea>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text="Close"
            variant="plain"
            @click="useFinanceStore.switchDialogShow()"
          ></v-btn>

          <v-btn
            color="primary"
            text="Save"
            variant="tonal"
            @click="saveTransaction"
          ></v-btn>
        </v-card-actions>
      </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import {useFinanceStore} from "@/stores/finance"
import {expansesCategory, expense} from "@/utils/constants"
import type { ExpansesCategory, Transaction } from "@/utils/types"
import { VDateInput } from 'vuetify/labs/VDateInput'
import { VForm } from "vuetify/components"

export default {
    components:{
      VDateInput
    },
    data(){
        return{
            useFinanceStore: useFinanceStore(),
            transaction: false,
            valid: false,
            formDialog:{
              id: '',
              name: '',
              category: '',
              amount: 0,
              currency: '',
              date: new Date(),
              description: '',
              transactionType: 'income'
            } as Transaction,
            rules: {
              required: (value: string) => !!value || "This field is required",
              amount: (value: number) => !!value || "Required valid amount",
            },
        }
    },
    computed:{
      dialogTitle(): string{
        return this.useFinanceStore.$state.currentDialogType + " " + this.useFinanceStore.$state.title  
      },
      currentDialogType(): boolean{
        return this.useFinanceStore.$state.dialogFinanceType === expense 
      },
      transactionToEdit(){
        return this.useFinanceStore.transactionToDeleteEdit
      },
      currentEditDataTransactionType(): boolean{
        return this.formDialog.transactionType === 'outcome'
      }
    },
    watch:{
      currentDialogType:{
        handler(value){
          this.formDialog.transactionType = value ? 'outcome' : 'income'
        },
        immediate: true
      },
      transactionToEdit:{
        handler(value){
          this.formDialog = value
        }
      }
    },
    methods:{
      expensesCategoryList(){
        return Object.values(expansesCategory) as ExpansesCategory[]
      },
      async saveTransaction(){
        const form = this.$refs.formDialog as InstanceType<typeof VForm>;
          const formValidate = await form.validate()
        if (formValidate) {

          if(this.useFinanceStore.$state.currentDialogType === 'add'){
            // to add
            this.useFinanceStore.saveTransaction(this.formDialog)
            form.reset()
            form.resetValidation()
          }
          this.resetForm()
          this.useFinanceStore.switchDialogShow()
        }
      },
      resetForm(){
        this.formDialog = {
          id: '',
          name: '',
          category: '',
          amount: 0,
          currency: '',
          date: new Date(),
          description: '',
          transactionType: 'income'
        } as Transaction
      }
 
    }
}
</script>
    