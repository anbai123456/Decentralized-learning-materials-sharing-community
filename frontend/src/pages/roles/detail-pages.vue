<template>
    <div id="master-detailpage">
        <TabView v-model:activeIndex="activeTab">
            <template v-if="auth.canView('permissions')">
                <TabPanel>
                    <template #header>
                        <div class=" text-lg font-bold" >
                            {{ $t('rolePermissions') }}
                        </div>
                    </template>
                    <div class="card my-3 p-3 surface-50">
                        <PermissionsListPage ref="permissionsListPage"  field-name="permissions.role_id" :field-value="masterRecord.role_id" :show-header="false" :show-breadcrumbs="false" isSubPage>
                        </PermissionsListPage>
                    </div>
                </TabPanel>
            </template>
            <template v-if="auth.canView('users')">
                <TabPanel>
                    <template #header>
                        <div class=" text-lg font-bold" >
                            {{ $t('roleUsers') }}
                        </div>
                    </template>
                    <div class="card my-3 p-3 surface-50">
                        <UsersListPage ref="usersListPage"  field-name="users.user_role_id" :field-value="masterRecord.role_id" :show-header="false" :show-breadcrumbs="false" isSubPage>
                        </UsersListPage>
                    </div>
                </TabPanel>
            </template>
        </TabView>
    </div>
</template>
<script setup>
import { watch, computed, ref, onMounted } from 'vue';
import { useApp } from 'src/composables/app.js';
import { useAuth } from 'src/composables/auth';
import { $t } from 'src/services/i18n';
import { usePageStore } from 'src/store/page';
import PermissionsListPage from "../permissions/list.vue";
import UsersListPage from "../users/list.vue";
const props = defineProps({
	isSubPage: {
		type : Boolean,
		default : true,
	},
	scrollIntoView: {
		type : Boolean,
		default : false,
	},
});
const store = usePageStore('ROLES');
const app = useApp();
const auth = useAuth();
const masterRecord = computed(() => store.state.currentRecord);
const activeTab = ref(0);
const pageReady = computed(() => masterRecord.value != null);
//scroll detail page into view
function scrollToDetailPage() {
	if (props.scrollIntoView) {
		const pageElement = document.getElementById('master-detailpage');
		if(pageElement){
			pageElement.scrollIntoView({behavior:'smooth', block:'start'});
		}
	}
}
// pass form data from master to detail
function setDetailPageFormData(){
	const record = masterRecord.value;
	 
	// set permissions form data
	const permissionsStore = usePageStore('permissions');
	permissionsStore.setFormData({ role_id:record?.role_id });
	 
	// set users form data
	const usersStore = usePageStore('users');
	usersStore.setFormData({ user_role_id:record?.role_id });
}
watch(() => masterRecord, () => {
		setDetailPageFormData();
		scrollToDetailPage();
	},
	{ deep: true, immediate: true }
);
onMounted(()=>{ 
    scrollToDetailPage();
});
</script>
