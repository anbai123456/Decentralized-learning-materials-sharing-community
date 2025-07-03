<template>
    <div id="master-detailpage">
        <TabView v-model:activeIndex="activeTab">
            <TabPanel>
                <template #header>
                    <div class=" text-lg font-bold" >
                        {{ $t('contentCategoryContentCategoryRelations') }}
                    </div>
                </template>
                <div class="card my-3 p-3 surface-50">
                    <ContentcategoryrelationsListPage ref="contentcategoryrelationsListPage"  field-name="content_category_relations.category_id" :field-value="masterRecord.category_id" :show-header="false" :show-breadcrumbs="false" isSubPage>
                    </ContentcategoryrelationsListPage>
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
import ContentcategoryrelationsListPage from "../contentcategoryrelations/list.vue";
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
const store = usePageStore('CONTENTCATEGORIES');
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
	 
	// set contentcategoryrelations form data
	const contentcategoryrelationsStore = usePageStore('contentcategoryrelations');
	contentcategoryrelationsStore.setFormData({ category_id:record?.category_id });
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
