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
                                    {{ $t('auditDetails') }}
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </section>
            </template>
            <section class="page-section " >
                <div class="container">
                    <div class="grid ">
                        <div  class="col comp-grid" >
                            <div >
                                <div class="mb-3 grid ">
                                    <div class="col-12 md:col-4">
                                        <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                            <div class="">
                                                <div class="text-400 mb-1">{{ $t('logId') }}</div>
                                                <div class="font-bold">{{ item.log_id }}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 md:col-4">
                                        <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                            <div class="">
                                                <div class="text-400 mb-1">{{ $t('action') }}</div>
                                                <div class="font-bold">{{ item.action }}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 md:col-4">
                                        <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                            <div class="">
                                                <div class="text-400 mb-1">{{ $t('page') }}</div>
                                                <div class="font-bold">{{ item.page }}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 md:col-4">
                                        <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                            <div class="">
                                                <div class="text-400 mb-1">{{ $t('recordId') }}</div>
                                                <div class="font-bold">{{ item.record_id }}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 md:col-4">
                                        <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                            <div class="">
                                                <div class="text-400 mb-1">{{ $t('userId') }}</div>
                                                <div class="font-bold">{{ item.user_id }}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 md:col-4">
                                        <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                            <div class="">
                                                <div class="text-400 mb-1">{{ $t('userIp') }}</div>
                                                <div class="font-bold">{{ item.user_ip }}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 md:col-4">
                                        <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                            <div class="">
                                                <div class="text-400 mb-1">{{ $t('userAgent') }}</div>
                                                <div class="font-bold">{{ item.user_agent }}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 md:col-4">
                                        <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                            <div class="">
                                                <div class="text-400 mb-1">{{ $t('requestUrl') }}</div>
                                                <div class="font-bold">{{ item.request_url }}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 md:col-4">
                                        <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                            <div class="">
                                                <div class="text-400 mb-1">{{ $t('oldValues') }}</div>
                                                <div class="font-bold">{{ item.old_values }}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 md:col-4">
                                        <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                            <div class="">
                                                <div class="text-400 mb-1">{{ $t('newValues') }}</div>
                                                <div class="font-bold">{{ item.new_values }}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 md:col-4">
                                        <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                            <div class="">
                                                <div class="text-400 mb-1">{{ $t('timestamp') }}</div>
                                                <div class="font-bold">{{ item.timestamp }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- action buttons -->
                                <div  class=" flex gap-3 justify-content-start">
                                    <Menubar class="p-0 inline-menu" ref="actionMenu" :model="getActionMenuModel(item)" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </template>
        <template v-if="loading">
            <div style="min-height:200px" class="flex gap-3 justify-content-center align-items-center p-3">
                <div><ProgressSpinner style="width:50px;height:50px" /> </div>
                <div class="text-500">{{ $t('loading') }} </div>
            </div>
        </template>
    </main>
</template>
<script setup>
	import {   toRefs, onMounted } from 'vue';
	import { useApp } from 'src/composables/app.js';
	import { $t } from 'src/services/i18n';
	import { usePageStore } from 'src/store/page';
	import { useViewPage } from 'src/composables/viewpage.js';
	const props = defineProps({
		id: [String, Number],
		primaryKey: {
			type: String,
			default: 'log_id',
		},
		pageStoreKey: {
			type: String,
			default: 'AUDITS',
		},
		pageName: {
			type: String,
			default: 'audits',
		},
		routeName: {
			type: String,
			default: 'auditsview',
		},
		apiPath: {
			type: String,
			default: 'audits/view',
		},
		autoLoad: {
			type: Boolean,
			default: true,
		},
		titleBeforeDelete: {
			type: String,
			default: $t('deleteRecord'),
		},
		msgBeforeDelete: {
			type: String,
			default: () => $t('promptDeleteRecord'),
		},
		msgAfterDelete: {
			type: String,
			default: () => $t('recordDeletedSuccessfully'),
		},
		exportButton: {
			type: Boolean,
			default: true,
		},
		showHeader: {
			type: Boolean,
			default: true,
		},
		showFooter: {
			type: Boolean,
			default: true,
		},
		isSubPage: {
			type : Boolean,
			default : false,
		}
	});
	
	const store = usePageStore(props.pageStoreKey);
	const app = useApp(props);
	
	const page = useViewPage({ store, props }); // where page logics resides
	
	const {  currentRecord } = toRefs(store.state);
	const { loading, pageReady } = toRefs(page.state);
	const item = currentRecord;
	
	const  { load, deleteItem, exportPage,   } = page.methods;
	
	function getActionMenuModel(data){
		return [
		{
			label: () => $t('edit'),
			to: `/audits/edit`,
			icon: "pi pi-pencil"
		},
		{
			label: () => $t('delete'),
			to: `/audits/delete`,
			icon: "pi pi-trash"
		}
	]
	}
	
	onMounted(()=>{ 
		const pageTitle = $t('auditDetails');
		app.setPageTitle(props.routeName, pageTitle); // set browser page title
	});
	
</script>
<style scoped>
</style>
