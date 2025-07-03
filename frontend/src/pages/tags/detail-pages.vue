<template>
    <div id="master-detailpage">
        <TabView v-model:activeIndex="activeTab">
            <TabPanel>
                <template #header>
                    <div class=" text-lg font-bold" >
                        {{ $t('tagContentTags') }}
                    </div>
                </template>
                <div class="card my-3 p-3 surface-50">
                    <ContenttagsListPage ref="contenttagsListPage"  field-name="content_tags.tag_id" :field-value="masterRecord.tag_id" :show-header="false" :show-breadcrumbs="false" isSubPage>
                    </ContenttagsListPage>
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
import ContenttagsListPage from "../contenttags/list.vue";
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
const store = usePageStore('TAGS');
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
	 
	// set contenttags form data
	const contenttagsStore = usePageStore('contenttags');
	contenttagsStore.setFormData({ tag_id:record?.tag_id });
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
