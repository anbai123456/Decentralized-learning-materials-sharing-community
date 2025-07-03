<template>
    <main class="main-page"  id="">
        <template v-if="showHeader">
            <section class="page-section mb-3" >
                <div class="container-fluid">
                    <div class="grid justify-content-between align-items-center">
                        <div  class="col " >
                            <div class=" text-2xl text-primary font-bold" >
                                {{ $t('users') }}
                            </div>
                        </div>
                        <div  class="col-fixed " >
                            <template v-if="auth.canView('users/add')">
                                <router-link :to="`/users/add`">
                                    <Button :label="$t('addNewUser')" icon="pi pi-plus" type="button" class="p-button w-full bg-primary "  />
                                </router-link>
                            </template>
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
                                <Breadcrumb :home="{icon: 'pi pi-home', to: '/users'}" :model="pageBreadCrumb" />
                            </template>
                            <div class="grid ">
                                <div class="col">
                                    <!-- page records template -->
                                    <div class="page-records"  >
                                        <DataTable :lazy="true"   :loading="loading"    v-model:selection="selectedItems"
                                             :value="records" dataKey="user_id" @sort="onSort($event)" class=" p-datatable-sm" :stripedRows ="true" :showGridlines="false" :rowHover="true" responsiveLayout="stack">
                                            <Column selectionMode="multiple" headerStyle="width: 2rem" />
                                                <Column  field="" header="" >
                                                    <template #body="{ data, index }">
                                                        <Button @click="setCurrentRecord(data)" class="p-button-text" icon="pi pi-caret-down" label="" />
                                                    </template>
                                                </Column>
                                                <Column  field="user_id" :header="$t('userId')" :sortable="true">
                                                    <template #body="{ data, index }">
                                                        <router-link :to="`/users/view/${data.user_id}`">
                                                            {{ data.user_id }}
                                                        </router-link>
                                                    </template>
                                                </Column>
                                                <Column  field="username" :header="$t('username')" >
                                                    <template #body="{ data, index }">
                                                        {{ data.username }}
                                                    </template>
                                                </Column>
                                                <Column  field="email" :header="$t('email')" >
                                                    <template #body="{ data, index }">
                                                        <a class="p-button-text" :href="`mailto:${data.email}`">
                                                            {{ data.email }}
                                                        </a>
                                                    </template>
                                                </Column>
                                                <Column  field="bio" :header="$t('bio')" >
                                                    <template #body="{ data, index }">
                                                        {{$utils.truncate( data.bio , 5, '...')}}
                                                    </template>
                                                </Column>
                                                <Column  field="created_at" :header="$t('createdAt')" :sortable="true">
                                                    <template #body="{ data, index }">
                                                        {{$utils.humanDatetime( data.created_at )}}
                                                    </template>
                                                </Column>
                                                <Column  field="updated_at" :header="$t('updatedAt')" :sortable="true">
                                                    <template #body="{ data, index }">
                                                        {{$utils.humanDatetime( data.updated_at )}}
                                                    </template>
                                                </Column>
                                                <Column  field="tele" :header="$t('tele')" >
                                                    <template #body="{ data, index }">
                                                        {{ data.tele }}
                                                    </template>
                                                </Column>
                                                <Column  field="photo" :header="$t('photo')" >
                                                    <template #body="{ data, index }">
                                                        <image-viewer image-size="small" image-preview-size="" :src="data.photo" width="50px" height="50px" class="img-fluid" :num-display="1">
                                                        </image-viewer>
                                                    </template>
                                                </Column>
                                                <Column  field="user_role_id" :header="$t('userRoleId')" :sortable="true">
                                                    <template #body="{ data, index }">
                                                        <Button class="p-button-text" icon="pi pi-eye" :label="$t('roles')" v-if="data.user_role_id" @click="app.openPageDialog({ page: 'roles/view', url: `/roles/view/${data.user_role_id}` , closeBtn: true })" />
                                                    </template>
                                                </Column>
                                                <Column  field="date_created" :header="$t('dateCreated')" >
                                                    <template #body="{ data, index }">
                                                        {{$utils.humanDatetime( data.date_created )}}
                                                    </template>
                                                </Column>
                                                <Column  field="date_updated" :header="$t('dateUpdated')" >
                                                    <template #body="{ data, index }">
                                                        {{$utils.humanDatetime( data.date_updated )}}
                                                    </template>
                                                </Column>
                                                <Column  field="followers_count" :header="$t('followersCount')" >
                                                    <template #body="{ data, index }">
                                                        {{ data.followers_count }}
                                                    </template>
                                                </Column>
                                                <Column  field="following_count" :header="$t('followingCount')" >
                                                    <template #body="{ data, index }">
                                                        {{ data.following_count }}
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
                                                    <template v-if="auth.canView('users')">
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
                                    <!-- Detal Page Column -->
                                    <template v-if="currentRecord && !isSubPage">
                                        <div class="col-12">
                                            <div class="card  p-0">
                                                <component :is="masterDetailPage" :scroll-into-view="true"></component>
                                            </div>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
</template>
<script setup>
	import { defineAsyncComponent, computed,  toRefs, onMounted } from 'vue';
	import { usePageStore } from 'src/store/page';
	import { utils } from 'src/utils';
	import { useApp } from 'src/composables/app.js';
	import { useAuth } from 'src/composables/auth';
	import { $t } from 'src/services/i18n';
	import { useListPage } from 'src/composables/listpage.js';
	
	const props = defineProps({
		primaryKey : {
			type : String,
			default : 'user_id',
		},
		pageStoreKey: {
			type: String,
			default: 'USERS',
		},
		pageName: {
			type: String,
			default : 'users',
		},
		routeName: {
			type: String,
			default: 'userslist',
		},
		apiPath: {
			type: String,
			default: 'users/index',
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
			default: 6,
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
	
	const {records, filters, currentRecord, totalRecords,  selectedItems,  pagination,} = toRefs(store.state);
	const { pageReady, loading, } = toRefs(page.state);
	
	const {  pageBreadCrumb,   totalPages, recordsPosition, } = page.computedProps;
	
	const { load,    exportPage, debounce, onSort,  deleteItem, setCurrentRecord,   } = page.methods;
	
	function getActionMenuModel(data){
		return [
		{
			label: () => $t('view'),
			to: `/users/view/${data.user_id}`,
			icon: "pi pi-eye",
			visible: auth.canView('users/view')
		},
		{
			label: () => $t('edit'),
			to: `/users/edit/${data.user_id}`,
			icon: "pi pi-pencil",
			visible: auth.canView('users/edit')
		},
		{
			label: () => $t('delete'),
			command: (event) => { deleteItem(data.user_id) },
			icon: "pi pi-trash",
			visible: auth.canView('users/delete')
		}
	]
	}
	const masterDetailPage = computed(() => defineAsyncComponent(() => import("./detail-pages.vue")));
	
	onMounted(()=>{ 
		const pageTitle = $t('users');
		app.setPageTitle(props.routeName, pageTitle);
	});
</script>
<style scoped>
</style>
