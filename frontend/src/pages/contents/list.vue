<template>
    <main class="main-page"  id="">
        <template v-if="showHeader">
            <section class="page-section mb-3" >
                <div class="container-fluid">
                    <div class="grid justify-content-between align-items-center">
                        <div  class="col " >
                            <div class=" text-2xl text-primary font-bold" >
                                {{ $t('contents') }}
                            </div>
                        </div>
                        <div  class="col-fixed " >
                            <template v-if="auth.canView('contents/add')">
                                <router-link :to="`/contents/add`">
                                    <Button :label="$t('addNewContent')" icon="pi pi-plus" type="button" class="p-button w-full bg-primary "  />
                                </router-link>
                            </template>
                        </div>
                        <div  class="col-12 md:col-3 " >
                            <span class="p-input-icon-left w-full">
                            <i class="pi pi-search" />
                            <InputText  :placeholder="$t('')" class="w-full" :value="filters.search.value" @input="debounce(() => { filters.search.value = $event.target.value })"  />
                            </span>
                        </div>
                        
                    </div>
                </div>
            </section>
        </template>
        <section class="page-section " >
            <div class="container-fluid">
                <div class="grid ">
                    <div  class="col-3 comp-grid" >
                        <record-count api-path="components_data/getcount_contents" max="" v-slot="record">
                        <router-link  :to="`/users`">
                            <div class="card text-blue-800 bg-blue-100 mb-3 " >
                                <div class="flex align-items-center justify-content-between">
                                    <div>
                                        <div class="font-medium text-lg">Contents</div>
                                        <div class="font-bold text-4xl" v-if="!record.loading">总评论数：{{ record.num }}</div>
                                        <Skeleton v-else width="3rem" height="2rem" class="m-2" />
                                        <div class="text-500 text-sm">Total Users</div>
                                    </div>
                                    <div style="width:auto;">
                                        <Avatar icon="pi pi-comments" size="large" class="bg-blue-600 text-blue-100" />
                                        </div>
                                    </div>
                                </div>
                            </router-link>
                            </record-count>
                            <div :class="{ 'card ': !isSubPage }" class="p-3 mb-3">
                                <api-data-source :enable-cache="true" @loaded="(response)=> filters.user_id.options=response"  api-path="components_data/user_id_option_list_2" >
                                    <template v-slot="req">
                                        <div class="p-3 font-bold text-primary" >
                                            {{ $t('filterByUserId') }}
                                        </div>
                                        <div class="mt-2">
                                            <MultiSelect class="w-full" optionLabel="label" optionValue="value" v-model="filters.user_id.value" :options="filters.user_id.options" label="" >
                                            </MultiSelect>  
                                        </div>
                                    </template>
                                </api-data-source>
                            </div>
                            <div :class="{ 'card ': !isSubPage }" class="p-3 mb-3">
                                <api-data-source :enable-cache="true" @loaded="(response)=> filters.tag.options=response"  api-path="components_data/tag_option_list_2" >
                                    <template v-slot="req">
                                        <div class="p-3 font-bold text-primary" >
                                            {{ $t('filterByTag') }}
                                        </div>
                                        <div class="mt-2">
                                            <MultiSelect class="w-full" optionLabel="label" optionValue="value" v-model="filters.tag.value" :options="filters.tag.options" label="" >
                                            </MultiSelect>  
                                        </div>
                                    </template>
                                </api-data-source>
                            </div>
                        </div>
                        <div  class="col-9 comp-grid" >
                            <div class="flex align-items-center">
                                <filter-tags :controller="page.filterController" />
                            </div>
                            <div >
                                <template v-if="showBreadcrumbs && $route.query.tag && !isSubPage">
                                    <Breadcrumb :home="{icon: 'pi pi-home', to: '/contents'}" :model="pageBreadCrumb" />
                                </template>
                                <!-- page records template -->
                                <div class="page-records"  >
                                    <DataTable :lazy="true"   :loading="loading"    v-model:selection="selectedItems"
                                         :value="records" dataKey="content_id" @sort="onSort($event)" class=" p-datatable-sm" :stripedRows ="true" :showGridlines="false" :rowHover="true" responsiveLayout="stack">
                                        <Column selectionMode="multiple" headerStyle="width: 2rem" />
                                            <Column  field="" header="" >
                                                <template #body="{ data, index }">
                                                    <Button class="p-button-text"
                                                    @click="()=>{
                                                    setCurrentRecord(data);
                                                    app.openPageDialog({ page: 'contents/detail-pages', pageData: data , closeBtn: true }); 
                                                    }"
                                                    label="" icon="pi pi-caret-down" />
                                                </template>
                                            </Column>
                                            <Column  field="content_id" :header="$t('cId')" :sortable="true">
                                                <template #body="{ data, index }">
                                                    <router-link :to="`/contents/view/${data.content_id}`">
                                                        {{ data.content_id }}
                                                    </router-link>
                                                </template>
                                            </Column>
                                            <Column  field="user_id" :header="$t('userId')" :sortable="true">
                                                <template #body="{ data, index }">
                                                    <Button class="p-button-text" icon="" :label="data.users_username" v-if="data.user_id" @click="app.openPageDialog({ page: 'users/view', url: `/users/view/${data.user_id}` , closeBtn: true })" />
                                                </template>
                                            </Column>
                                            <Column  field="content_type" :header="$t('cType')" >
                                                <template #body="{ data, index }">
                                                    {{ data.content_type }}
                                                </template>
                                            </Column>
                                            <Column  field="tag" :header="$t('tag')" >
                                                <template #body="{ data, index }">
                                                    {{ data.tag }}
                                                </template>
                                            </Column>
                                            <Column  field="body" :header="$t('body')" >
                                                <template #body="{ data, index }">
                                                    {{$utils.truncate( data.body , 10, '...')}}
                                                </template>
                                            </Column>
                                            <Column  field="blocknum" :header="$t('blocknum')" >
                                                <template #body="{ data, index }">
                                                    {{ data.blocknum }}
                                                </template>
                                            </Column>
                                            <Column  field="tx_hash" :header="$t('txHash')" >
                                                <template #body="{ data, index }">
                                                    {{$utils.truncate( data.tx_hash , 10, '...')}}
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
                                                <template v-if="auth.canView('contents')">
                                                    <div v-if="selectedItems.length" class="m-2">
                                                        <Button @click="deleteItem(selectedItems)" icon="pi pi-trash" class="p-button-danger" :title="$t('deleteSelected')" />
                                                    </div>
                                                </template>
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
	import { utils } from 'src/utils';
	import { useApp } from 'src/composables/app.js';
	import { useAuth } from 'src/composables/auth';
	import { $t } from 'src/services/i18n';
	import { useListPage } from 'src/composables/listpage.js';
	
	const props = defineProps({
		primaryKey : {
			type : String,
			default : 'content_id',
		},
		pageStoreKey: {
			type: String,
			default: 'CONTENTS',
		},
		pageName: {
			type: String,
			default : 'contents',
		},
		routeName: {
			type: String,
			default: 'contentslist',
		},
		apiPath: {
			type: String,
			default: 'contents/index',
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
			default: true,
		},
		page: {
			type: Number,
			default: 1,
		},
		limit: {
			type: Number,
			default: 8,
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
			},user_id: {
				tag: "User Id",
				value: [],
				valueType: 'multiple',
				options: [],
			},tag: {
				tag: "Tag",
				value: [],
				valueType: 'multiple',
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
	
	const { load,    exportPage, debounce, onSort,  deleteItem, setCurrentRecord,   } = page.methods;
	
	function getActionMenuModel(data){
		return [
		{
			label: () => $t('view'),
			to: `/contents/view/${data.content_id}`,
			icon: "pi pi-eye",
			visible: auth.canView('contents/view')
		},
		{
			label: () => $t('edit'),
			to: `/contents/edit/${data.content_id}`,
			icon: "pi pi-pencil",
			visible: auth.canView('contents/edit')
		},
		{
			label: () => $t('delete'),
			command: (event) => { deleteItem(data.content_id) },
			icon: "pi pi-trash",
			visible: auth.canView('contents/delete')
		}
	]
	}
	
	onMounted(()=>{ 
		const pageTitle = $t('contents');
		app.setPageTitle(props.routeName, pageTitle);
	});
</script>
<style scoped>
</style>
