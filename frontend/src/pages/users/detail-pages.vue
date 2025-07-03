<template>
    <div id="master-detailpage">
        <TabView v-model:activeIndex="activeTab">
            <template v-if="auth.canView('ccollect')">
                <TabPanel>
                    <template #header>
                        <div class=" text-lg font-bold" >
                            {{ $t('userCCollect') }}
                        </div>
                    </template>
                    <div class="card my-3 p-3 surface-50">
                        <CcollectListPage ref="ccollectListPage"  field-name="c_collect.user_id" :field-value="masterRecord.user_id" :show-header="false" :show-breadcrumbs="false" isSubPage>
                        </CcollectListPage>
                    </div>
                </TabPanel>
            </template>
            <template v-if="auth.canView('cstart')">
                <TabPanel>
                    <template #header>
                        <div class=" text-lg font-bold" >
                            {{ $t('userCStart') }}
                        </div>
                    </template>
                    <div class="card my-3 p-3 surface-50">
                        <CstartListPage ref="cstartListPage"  field-name="c_start.starteduser_id" :field-value="masterRecord.user_id" :show-header="false" :show-breadcrumbs="false" isSubPage>
                        </CstartListPage>
                    </div>
                </TabPanel>
            </template>
            <template v-if="auth.canView('fans')">
                <TabPanel>
                    <template #header>
                        <div class=" text-lg font-bold" >
                            {{ $t('userFans') }}
                        </div>
                    </template>
                    <div class="card my-3 p-3 surface-50">
                        <FansListPage ref="fansListPage"  field-name="fans.followee_user_id" :field-value="masterRecord.user_id" :show-header="false" :show-breadcrumbs="false" isSubPage>
                        </FansListPage>
                    </div>
                </TabPanel>
            </template>
            <template v-if="auth.canView('fans')">
                <TabPanel>
                    <template #header>
                        <div class=" text-lg font-bold" >
                            {{ $t('userFans') }}
                        </div>
                    </template>
                    <div class="card my-3 p-3 surface-50">
                        <FansListPage ref="fansListPage"  field-name="fans.follower_user_id" :field-value="masterRecord.user_id" :show-header="false" :show-breadcrumbs="false" isSubPage>
                        </FansListPage>
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
import CcollectListPage from "../ccollect/list.vue";
import CstartListPage from "../cstart/list.vue";
import FansListPage from "../fans/list.vue";
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
const store = usePageStore('USERS');
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
	 
	// set ccollect form data
	const ccollectStore = usePageStore('ccollect');
	ccollectStore.setFormData({ user_id:record?.user_id });
	 
	// set cstart form data
	const cstartStore = usePageStore('cstart');
	cstartStore.setFormData({ starteduser_id:record?.user_id });
	 
	// set fans form data
	const fansStore = usePageStore('fans');
	fansStore.setFormData({ followee_user_id:record?.user_id, follower_user_id:record?.user_id });
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
