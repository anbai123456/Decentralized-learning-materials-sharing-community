<template>
    <main class="main-page"  id="">
        <template v-if="showHeader">
            <section class="page-section mb-3" >
                <div class="container-fluid">
                    <div class="grid justify-content-between align-items-center">
                        <div  class="col " >
                            <div class=" text-2xl text-primary font-bold" >
                                {{ $t('audits') }}
                            </div>
                        </div>
                        <div  class="col-fixed " >
                            <router-link :to="`/audits/add`">
                                <Button :label="$t('addNewAudit')" icon="pi pi-plus" type="button" class="p-button w-full bg-primary "  />
                            </router-link>
                        </div>
                        <div  class="col-12 md:col-3 " >
                            <span class="p-input-icon-left w-full">
                            <i class="pi pi-search" />
                            <InputText  :placeholder="$t('search')" class="w-full" :value="filters.search.value" @input="debounce(() => { filters.search.value = $event.target.value })"  />
                            </span>
                        </div>
                        
                    </div>
                </div>
            </section>
        </template>
        <section class="page-section " >
            <div class="container-fluid">
                <div class="grid ">
                    <div  class="col comp-grid" >
                        <div class="flex align-items-center">
                            <filter-tags :controller="page.filterController" />
                        </div>
                        <div >
                            <template v-if="showBreadcrumbs && $route.query.tag && !isSubPage">
                                <Breadcrumb :home="{icon: 'pi pi-home', to: '/audits'}" :model="pageBreadCrumb" />
                            </template>
                            <!-- page records template -->
                            <div class="page-records"  >
                                <DataTable :lazy="true"   :loading="loading"     :value="records" dataKey="log_id" @sort="onSort($event)" class=" p-datatable-sm" :stripedRows ="true" :showGridlines="false" :rowHover="true" responsiveLayout="stack">
                                    <Column  field="log_id" :header="$t('logId')" >
                                        <template #body="{ data, index }">
                                            <router-link :to="`/audits/view/${data.log_id}`">
                                                {{ data.log_id }}
                                            </router-link>
                                        </template>
                                    </Column>
                                    <Column  field="action" :header="$t('action')" >
                                        <template #body="{ data, index }">
                                            {{ data.action }}
                                        </template>
                                    </Column>
                                    <Column  field="page" :header="$t('page')" >
                                        <template #body="{ data, index }">
                                            {{ data.page }}
                                        </template>
                                    </Column>
                                    <Column  field="record_id" :header="$t('recordId')" >
                                        <template #body="{ data, index }">
                                            {{ data.record_id }}
                                        </template>
                                    </Column>
                                    <Column  field="user_id" :header="$t('userId')" >
                                        <template #body="{ data, index }">
                                            {{ data.user_id }}
                                        </template>
                                    </Column>
                                    <Column  field="user_ip" :header="$t('userIp')" >
                                        <template #body="{ data, index }">
                                            {{ data.user_ip }}
                                        </template>
                                    </Column>
                                    <Column  field="user_agent" :header="$t('userAgent')" >
                                        <template #body="{ data, index }">
                                            {{ data.user_agent }}
                                        </template>
                                    </Column>
                                    <Column  field="request_url" :header="$t('requestUrl')" >
                                        <template #body="{ data, index }">
                                            {{ data.request_url }}
                                        </template>
                                    </Column>
                                    <Column  field="old_values" :header="$t('oldValues')" >
                                        <template #body="{ data, index }">
                                            {{ data.old_values }}
                                        </template>
                                    </Column>
                                    <Column  field="new_values" :header="$t('newValues')" >
                                        <template #body="{ data, index }">
                                            {{ data.new_values }}
                                        </template>
                                    </Column>
                                    <Column  field="timestamp" :header="$t('timestamp')" >
                                        <template #body="{ data, index }">
                                            {{ data.timestamp }}
                                        </template>
                                    </Column>
                                    <Column  headerStyle="width: 2rem" headerClass="text-center">
                                        <template #body="{ data, index }">
                                            <div class="flex justify-content-end">
                                                <SplitButton dropdownIcon="pi pi-bars" class="p-button dropdown-only p-button-text p-button-plain" :model="getActionMenuModel(data)">
                                                    <i></i>
                                                </SplitButton>
                                            </div>
                                        </template>
                                    </Column>
                                </DataTable>
                            </div>
                            <!-- Empty record -->
                            <template v-if="pageReady && !records.length">
                                <div class="p-3 my-3 text-500 text-lg font-medium text-center">
                                    {{ $t('noRecordFound') }}
                                </div>
                            </template>
                            <!-- end of empty record-->
                            <!-- pagination component-->
                            <template v-if="showFooter && pageReady">
                                <div class="grid justify-content-between align-items-center">
                                    <div class="flex gap-2 flex-grow-0">
                                    </div>
                                    <div v-if="paginate && totalPages > 1" class="flex-grow-1">
                                        <Paginator class="paginator-flat my-3" :first="recordsPosition - 1" @page="(event)=>{pagination.page = event.page + 1}" :rows="pagination.limit" :totalRecords="totalRecords">
                                            <template #start>
                                                <span class="px-2">
                                                {{ $t('records') }} <b>{{ recordsPosition }} {{ $t('of') }} {{ totalRecords }}</b>
                                                </span>
                                            </template>
                                            <template #end>
                                            </template>
                                        </Paginator>
                                    </div>
                                </div>
                            </template>
                            <!-- end of pagination component-->
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>
<script setup>
	import {   toRefs, onMounted } from 'vue';
	import { usePageStore } from 'src/store/page';
	import { useApp } from 'src/composables/app.js';
	import { useAuth } from 'src/composables/auth';
	import { $t } from 'src/services/i18n';
	import { useListPage } from 'src/composables/listpage.js';
	
	const props = defineProps({
		primaryKey : {
			type : String,
			default : 'log_id',
		},
		pageStoreKey: {
			type: String,
			default: 'AUDITS',
		},
		pageName: {
			type: String,
			default : 'audits',
		},
		routeName: {
			type: String,
			default: 'auditslist',
		},
		apiPath: {
			type: String,
			default: 'audits/index',
		},
		autoLoad: {
			type: Boolean,
			default: true,
		},
		enableCache: {
			type: Boolean,
			default: false,
		},
		paginate: {
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
		showBreadcrumbs: {
			type: Boolean,
			default: true,
		},
		exportButton: {
			type: Boolean,
			default: true,
		},
		importButton: {
			type: Boolean,
			default: false,
		},
		multiCheckbox: {
			type: Boolean,
			default: false,
		},
		page: {
			type: Number,
			default: 1,
		},
		limit: {
			type: Number,
			default: 10,
		},
		mergeRecords: { // for infinite loading
			type: Boolean,
			default: false,
		},
		search: {
			type: String,
			default: '',
		},
		fieldName: null,
		fieldValue: null,
		queryParams: { 
			type: Object,
			default: () => ({})
		},
		sortBy: {
			type: String,
			default: '',
		},
		sortType: {
			type: String,
			default: 'desc', //desc or asc
		},
		isSubPage: {
			type: Boolean,
			default: false,
		},
		emptyRecordMsg: {
			type: String,
			default: () => $t('noRecordFound'),
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
		filterTagClass: {
			type: String,
			default: 'surface-card p-2 text-500 flex-grow-1 text-center m-1 mb-3 flex-grow-1 text-center',
		}
	});
	
	const app = useApp();
	const auth = useAuth();
	
	const defaultStoreState = {
		filters: {
			search: {
				tag: "Search",
				value: '',
				valueType: 'single',
				options: [],
			}
		},
		pagination: {
			page: props.page,
			limit: props.limit,
			sortBy: props.sortBy,
			sortType: props.sortType
		},
		primaryKey: props.primaryKey,
		enableCache: props.enableCache
	}
	const store = usePageStore(props.pageStoreKey,  defaultStoreState);
	
	// page hooks where logics resides
	const page = useListPage({ store, props });
	
	const {records, filters,  totalRecords,  selectedItems,  pagination,} = toRefs(store.state);
	const { pageReady, loading, } = toRefs(page.state);
	
	const {  pageBreadCrumb,   totalPages, recordsPosition, } = page.computedProps;
	
	const { load,    exportPage, debounce, onSort,  deleteItem,    } = page.methods;
	
	function getActionMenuModel(data){
		return [
		{
			label: () => $t('view'),
			to: `/audits/view/${data.log_id}`,
			icon: "pi pi-eye",
			visible: auth.canView('audits/view')
		},
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
		const pageTitle = $t('audits');
		app.setPageTitle(props.routeName, pageTitle);
	});
</script>
<style scoped>
</style>
