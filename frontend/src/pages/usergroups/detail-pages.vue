<template>
    <div id="master-detailpage">
        <TabView v-model:activeIndex="activeTab">
            <TabPanel>
                <template #header>
                    <div class=" text-lg font-bold" >
                        {{ $t('userGroupGroupMembers') }}
                    </div>
                </template>
                <div class="card my-3 p-3 surface-50">
                    <GroupmembersListPage ref="groupmembersListPage"  field-name="group_members.group_id" :field-value="masterRecord.group_id" :show-header="false" :show-breadcrumbs="false" isSubPage>
                    </GroupmembersListPage>
                </div>
            </TabPanel>
        </TabView>
    </div>
</template>
<script setup>
import { watch, computed, ref, onMounted } from 'vue';
import { useApp } from 'src/composables/app.js';
import { $t } from 'src/services/i18n';
import { usePageStore } from 'src/store/page';
import GroupmembersListPage from "../groupmembers/list.vue";
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
const store = usePageStore('USERGROUPS');
const app = useApp();
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
	 
	// set groupmembers form data
	const groupmembersStore = usePageStore('groupmembers');
	groupmembersStore.setFormData({ group_id:record?.group_id });
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
