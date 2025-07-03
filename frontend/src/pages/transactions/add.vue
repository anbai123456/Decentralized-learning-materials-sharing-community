<template>
    <main class="main-page"  id="">
        <template v-if="pageReady">
            <template v-if="showHeader">
                <section class="page-section mb-3" >
                    <div class="container">
                        <div class="grid justify-content-between align-items-center">
                            <div  v-if="!isSubPage"  class="col-fixed " >
                                <Button @click="$router.go(-1)"   class="p-button p-button-text " icon="pi pi-arrow-left"  />
                            </div>
                            <div  class="col " >
                                <div class=" text-2xl text-primary font-bold" >
                                    {{ $t('addNewTransaction') }}
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </section>
            </template>
            <section class="page-section " >
                <div class="container">
                    <div class="grid ">
                        <div  class="md:col-9 sm:col-12 comp-grid" >
                            <div >
                                <form ref="observer" tag="form" @submit.prevent="submitForm()" :class="{ 'card ': !isSubPage }" class=" ">
                                    <div class="grid">
                                        <div class="col-12">
                                            <div class="formgrid grid">
                                                <div class="col-12 md:col-3">
                                                    {{ $t('fromUserId') }} 
                                                </div>
                                                <div class="col-12 md:col-9">
                                                    <api-data-source :enable-cache="true"   api-path="components_data/user_id_option_list" >
                                                        <template v-slot="req">
                                                            <Dropdown  class="w-full" :class="getErrorClass('from_user_id')"   :loading="req.loading"   optionLabel="label" optionValue="value" ref="ctrlfrom_user_id"  v-model="formData.from_user_id" :options="req.response" :label="$t('fromUserId')"  :placeholder="$t('selectAValue')" >
                                                            </Dropdown> 
                                                            <small v-if="isFieldValid('from_user_id')" class="p-error">{{ getFieldError('from_user_id') }}</small> 
                                                        </template>
                                                    </api-data-source>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="formgrid grid">
                                                <div class="col-12 md:col-3">
                                                    {{ $t('toUserId') }} 
                                                </div>
                                                <div class="col-12 md:col-9">
                                                    <api-data-source :enable-cache="true"   api-path="components_data/user_id_option_list" >
                                                        <template v-slot="req">
                                                            <Dropdown  class="w-full" :class="getErrorClass('to_user_id')"   :loading="req.loading"   optionLabel="label" optionValue="value" ref="ctrlto_user_id"  v-model="formData.to_user_id" :options="req.response" :label="$t('toUserId')"  :placeholder="$t('selectAValue')" >
                                                            </Dropdown> 
                                                            <small v-if="isFieldValid('to_user_id')" class="p-error">{{ getFieldError('to_user_id') }}</small> 
                                                        </template>
                                                    </api-data-source>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="formgrid grid">
                                                <div class="col-12 md:col-3">
                                                    {{ $t('amount') }} 
                                                </div>
                                                <div class="col-12 md:col-9">
                                                    <InputText  ref="ctrlamount" v-model.trim="formData.amount"  :label="$t('amount')" type="number" :placeholder="$t('enterAmount')"   step="0.1"    
                                                    class=" w-full" :class="getErrorClass('amount')">
                                                    </InputText>
                                                    <small v-if="isFieldValid('amount')" class="p-error">{{ getFieldError('amount') }}</small> 
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="formgrid grid">
                                                <div class="col-12 md:col-3">
                                                    {{ $t('transactionType') }} 
                                                </div>
                                                <div class="col-12 md:col-9">
                                                    <Dropdown  class="w-full" :class="getErrorClass('transaction_type')"      optionLabel="label" optionValue="value" ref="ctrltransaction_type"  v-model="formData.transaction_type" :options="app.menus.transactionType" :label="$t('transactionType')"  :placeholder="$t('selectAValue')" >
                                                    </Dropdown> 
                                                    <small v-if="isFieldValid('transaction_type')" class="p-error">{{ getFieldError('transaction_type') }}</small> 
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="formgrid grid">
                                                <div class="col-12 md:col-3">
                                                    {{ $t('status') }} 
                                                </div>
                                                <div class="col-12 md:col-9">
                                                    <Dropdown  class="w-full" :class="getErrorClass('status')"      optionLabel="label" optionValue="value" ref="ctrlstatus"  v-model="formData.status" :options="app.menus.status2" :label="$t('status')"  :placeholder="$t('selectAValue')" >
                                                    </Dropdown> 
                                                    <small v-if="isFieldValid('status')" class="p-error">{{ getFieldError('status') }}</small> 
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="formgrid grid">
                                                <div class="col-12 md:col-3">
                                                    {{ $t('blockchainTx') }} 
                                                </div>
                                                <div class="col-12 md:col-9">
                                                    <InputText  ref="ctrlblockchain_tx" v-model.trim="formData.blockchain_tx"  :label="$t('blockchainTx')" type="text" :placeholder="$t('enterBlockchainTx')"      
                                                    class=" w-full" :class="getErrorClass('blockchain_tx')">
                                                    </InputText>
                                                    <small v-if="isFieldValid('blockchain_tx')" class="p-error">{{ getFieldError('blockchain_tx') }}</small> 
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="showSubmitButton" class="text-center my-3">
                                        <Button class="p-button-primary" type="submit" :label="$t('submit')" icon="pi pi-send" :loading="saving" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </template>
    </main>
</template>
<script setup>
	import {  computed,  reactive, toRefs, onMounted } from 'vue';
	import { required, numeric, } from 'src/services/validators';
	import { useApp } from 'src/composables/app.js';
	import { $t } from 'src/services/i18n';
	import { useAddPage } from 'src/composables/addpage.js';
	import { usePageStore } from 'src/store/page';
	const props = defineProps({
		pageStoreKey: {
			type: String,
			default: 'TRANSACTIONS',
		},
		pageName : {
			type : String,
			default : 'transactions',
		},
		routeName : {
			type : String,
			default : 'transactionsadd',
		},
		apiPath : {
			type : String,
			default : 'transactions/add',
		},
		submitButtonLabel: {
			type: String,
			default: () => $t('submit'),
		},
		formValidationError: {
			type: String,
			default: $t('formIsInvalid'),
		},
		formValidationMsg: {
			type: String,
			default: $t('pleaseCompleteTheForm'),
		},
		msgTitle: {
			type: String,
			default: $t('createRecord'),
		},
		msgAfterSave: {
			type: String,
			default: () => $t('recordAddedSuccessfully'),
		},
		msgBeforeSave: {
			type: String,
			default: () => $t(''),
		},
		showHeader: {
			type: Boolean,
			default: true,
		},
		showSubmitButton: {
			type: Boolean,
			default: true,
		},
		redirect: {
			type : Boolean,
			default : true,
		},
		isSubPage: {
			type : Boolean,
			default : false,
		},
		pageData: { // use to set formData default values from another page
			type: Object,
			default: () => ({
				from_user_id: "", to_user_id: "", amount: "", transaction_type: "", status: "", blockchain_tx: "", 
			})
		},
	});
	//lines
	const store = usePageStore(props.pageStoreKey);
	const app = useApp();
	
	const formData = reactive({ ...props.pageData });
	
	//vuelidate form validation rules
	const rules = computed(() => {
		return {
			from_user_id: {  },
			to_user_id: {  },
			amount: { numeric },
			transaction_type: {  },
			status: {  },
			blockchain_tx: {  }
		}
	});
	
	const page = useAddPage({ store, props, formData, rules, beforeSubmit, afterSubmit });
	
	// event raised before submit form
	function beforeSubmit(){
		return true;
	}
	
	// event raised after form submited
	function afterSubmit(response) { 
		app.flashMsg(props.msgTitle, props.msgAfterSave);
		page.setFormDefaultValues(); //reset form data
		if(app.isDialogOpen()){
			app.closeDialogs(); // if page is open as dialog, close dialog
		}
		else if(props.redirect) {
			app.navigateTo(`/transactions`);
		}
	}
	
	const {  saving, pageReady, } = toRefs(page.state);
	
	const { submitForm, getErrorClass, getFieldError, isFieldValid,  } = page.methods;
	
	onMounted(()=>{
		const pageTitle = $t('addNewTransaction');
		app.setPageTitle(props.routeName, pageTitle); // set browser page title
	});
	
	// expose page object for other components access
	defineExpose({
		page
	});
</script>
<style scoped>
</style>
