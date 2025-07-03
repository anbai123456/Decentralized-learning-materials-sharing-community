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
                                    {{ $t('multimediaDetails') }}
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </section>
            </template>
            <section class="page-section mb-3" >
                <div class="container">
                    <div class="grid ">
                        <div  class="col-4 comp-grid" >
                            <Button :label="$t('reply')"   @click="app.openPageDialog({ page: 'multimediareply/add', url: `/multimediareply/add` , closeBtn: true })"  class="p-button bg-primary p-button-text "  />
                        </div>
                        <div  class="col-4 comp-grid" >
                            <div class="">
                                <div>
                                    <button v-on:click="toggleLike" class="styled-button" :disabled="mlikeStatus === null">
                                    <!-- 添加图标 -->
                                    <i class="pi pi-heart" style="margin-right: 8px;"></i>
                                    {{ mlikeStatus === true ? '取消点赞' : '请点赞' }}
                                    </button>
                                    <span class="like-counter" v-if="mlikeStatus !== null">
                                    {{ mlikeStatus === true ? '你已点赞' : '你未点赞' }} | {{likecounter}}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div  class="col-4 comp-grid" >
                            <div class="">
                                <button v-on:click="toggleCollect" class="styled-button" :disabled="mcollectStatus === null">
                                <i class="pi pi-heart" style="margin-right: 8px;"></i>
                                {{ mcollectStatus === true ? '取消收藏' : '收藏' }}
                                </button>
                                <span class="like-counter" v-if="mcollectStatus !== null">
                                {{ mcollectStatus === true ? '你已收藏' : '你未收藏' }} | {{collectCounter}}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="page-section " >
                <div class="container">
                    <div class="grid ">
                        <div  class="col comp-grid" >
                            <div >
                                <div class="grid ">
                                    <div class="col">
                                        <div class="mb-3 grid ">
                                            <div class="col-12 md:col-4">
                                                <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                                    <div class="">
                                                        <div class="text-400 mb-1">{{ $t('userId') }}</div>
                                                        <div class="font-bold">
                                                            <Button class="p-button-text" icon="pi pi-eye" :label="$t('usersDetail')" v-if="item.user_id" @click="app.openPageDialog({ page: 'users/view', url: `/users/view/${item.user_id}` , closeBtn: true })" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12 md:col-4">
                                                <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                                    <div class="">
                                                        <div class="text-400 mb-1">{{ $t('imageFile') }}</div>
                                                        <div class="font-bold">
                                                            <image-viewer image-size="medium" image-preview-size="" :src="item.image_file" width="40px" height="40px" class="img-fluid" :num-display="1">
                                                            </image-viewer>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12 md:col-4">
                                                <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                                    <div class="">
                                                        <div class="text-400 mb-1">{{ $t('videoFile') }}</div>
                                                        <div class="font-bold">{{$utils.truncate( item.video_file , 30, '...')}}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12 md:col-4">
                                                <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                                    <div class="">
                                                        <div class="text-400 mb-1">{{ $t('docFile') }}</div>
                                                        <div class="font-bold">{{$utils.truncate( item.doc_file , 6, '...')}}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12 md:col-4">
                                                <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                                    <div class="">
                                                        <div class="text-400 mb-1">{{ $t('description') }}</div>
                                                        <div class="font-bold">{{$utils.truncate( item.description , 8, '...')}}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12 md:col-4">
                                                <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                                    <div class="">
                                                        <div class="text-400 mb-1">{{ $t('multimediaId') }}</div>
                                                        <div class="font-bold">{{ item.multimedia_id }}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12 md:col-4">
                                                <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                                    <div class="">
                                                        <div class="text-400 mb-1">{{ $t('tag') }}</div>
                                                        <div class="font-bold">{{ item.tag }}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12 md:col-4">
                                                <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                                    <div class="">
                                                        <div class="text-400 mb-1">{{ $t('learntime') }}</div>
                                                        <div class="font-bold">{{ item.learntime }}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12 md:col-4">
                                                <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                                    <div class="">
                                                        <div class="text-400 mb-1">{{ $t('createdAt') }}</div>
                                                        <div class="font-bold">{{$utils.humanDatetime( item.created_at )}}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12 md:col-4">
                                                <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                                    <div class="">
                                                        <div class="text-400 mb-1">{{ $t('updatedAt') }}</div>
                                                        <div class="font-bold">{{$utils.humanDatetime( item.updated_at )}}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- action buttons -->
                                        <div  class=" flex gap-3 justify-content-start">
                                            <Menubar class="p-0 inline-menu" ref="actionMenu" :model="getActionMenuModel(item)" />
                                        </div>
                                    </div>
                                    <!-- Detal Page Column -->
                                    <template v-if="currentRecord && !isSubPage">
                                        <div class="col-12">
                                            <div class="card  my-3 p-1">
                                                <component :is="masterDetailPage" :scroll-into-view="false"></component>
                                            </div>
                                        </div>
                                    </template>
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
	import { defineAsyncComponent, computed, ref, toRefs, onMounted } from 'vue';
	import { ApiService } from 'src/services/api';
	import { utils } from 'src/utils';
	import { useApp } from 'src/composables/app.js';
	import { useAuth } from 'src/composables/auth';
	import { $t } from 'src/services/i18n';
	import { usePageStore } from 'src/store/page';
	import { useViewPage } from 'src/composables/viewpage.js';
	const props = defineProps({
		id: [String, Number],
		primaryKey: {
			type: String,
			default: 'multimedia_id',
		},
		pageStoreKey: {
			type: String,
			default: 'MULTIMEDIA',
		},
		pageName: {
			type: String,
			default: 'multimedia',
		},
		routeName: {
			type: String,
			default: 'multimediaview',
		},
		apiPath: {
			type: String,
			default: 'multimedia/view',
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
	const auth = useAuth();
	
	const page = useViewPage({ store, props }); // where page logics resides
	
	const {  currentRecord } = toRefs(store.state);
	const { loading, pageReady } = toRefs(page.state);
	const item = currentRecord;
	
	const  { load, deleteItem, exportPage,   } = page.methods;
	
	function getActionMenuModel(data){
		return [
		{
			label: () => $t('edit'),
			command: (event) => { app.openPageDialog({ page:'multimedia/edit', url: `/multimedia/edit/${data.multimedia_id}`, closeBtn: true }) },
			icon: "pi pi-pencil",
			visible: auth.canView('multimedia/edit')
		},
		{
			label: () => $t('delete'),
			command: (event) => { deleteItem(data.multimedia_id) },
			icon: "pi pi-trash",
			visible: auth.canView('multimedia/delete')
		}
	]
	}
	const masterDetailPage = computed(() => defineAsyncComponent(() => import("./detail-pages.vue")));
	
	onMounted(()=>{ 
		const pageTitle = $t('multimediaDetails');
		app.setPageTitle(props.routeName, pageTitle); // set browser page title
	});
	
	const isLiked = ref(false); 
const likecounter = ref(0); 
onMounted(()=>{
    getLikeCount(props.id);
});
const mlikeStatus = ref(null);
onMounted(async () => {
    await getLikeStatus(props.id,auth.userId);
})
const getLikeStatus = async (multimedia_id, user_id) => {
    try {
        const response = await ApiService.get("multimedia/status/" + multimedia_id + "/" + user_id);
        if (response.data && response.data.length > 0) {
            mlikeStatus.value = true;
            } else {
            mlikeStatus.value = false;
        }
        } catch (error) {
        console.error('Error checking like status:', error);
        mlikeStatus.value = false;
    }
};
const toggleLike = async () => {
    mlikeStatus.value = !mlikeStatus.value
    if (mlikeStatus.value) {
        await like(); 
        } else {
        await unlike(); 
    }
};
const like = async () => {  
    await postLike();
};
const unlike = async () => {  
    await deleteLikeCount(props.id,auth.userId);
};
async function postLike() {
    console.log("==postLike====");
    try {
        let postData = {
            multimedia_id: props.id,
            user_id: auth.userId,
        };
        let response = await ApiService.post("mlikes/add", postData); 
        } catch (e) {
        console.error(e);
    }
}
async function getLikeCount(multimedia_id) {
    const response = await ApiService.get("multimedia/getlikecount/" + multimedia_id); 
    console.log("==getLikeCount():",response.data[0].likecount);
    likecounter.value = response.data[0].likecount;
}
async function deleteLikeCount(multimedia_id, user_id) {
    try {
        const url = `multimedia/del/${multimedia_id}/${user_id}`;
        const response = await ApiService.get(url);
        if (response.data && response.data.length > 0) {
            likecounter.value = response.data[0].likecount;
            } else {
            console.error('No like count data received or invalid response format');
            likecounter.value = 0; 
        }
        } catch (error) {
        console.error('Error fetching like count:', error);
        likecounter.value = 0; 
    }
}
console.log("=============================收藏计=============================")
const isCollected = ref(false); 
const collectCounter = ref(0);
onMounted(async () => {
    await getCollectCount(props.id);
});
const mcollectStatus = ref(null);
onMounted(async () => {
    await getCollectStatus(props.id, auth.userId);
});
const getCollectStatus = async (multimedia_id, user_id) => {  
    try {
        const response = await ApiService.get("mcollect/status/" + multimedia_id + "/" + user_id);
        if(response.data && response.data.length > 0){
            mcollectStatus.value = true;
            }else{
            mcollectStatus.value = false;
        }
        } catch (error) {
        console.error('Error checking collect status:', error);
        isCollected.value = false;
    }
};
const getCollectCount = async (multimedia_id) => {  
    try {
        const response = await ApiService.get("mcollect/count/" + multimedia_id);
        console.log("=========getCollectCount=========",response.data[0].collectcount)
        collectCounter.value = response.data[0].collectcount; // 从数组提取值
        } catch (error) {
        console.error('Error fetching collect count:', error);
        collectCounter.value = 0;
    }
};
const toggleCollect = async () => {
    mcollectStatus.value = !mcollectStatus.value;
    if (mcollectStatus.value) {
        await addCollect();
        } else {
        await deleteCollect(props.id, auth.userId);
    }
};
async function addCollect() {
    console.log("====================add===============")
    try {
        const postData = {
            multimedia_id: props.id,
            user_id: auth.userId
        };
        let response = await ApiService.post("mcollect/add", postData);
        } catch (e) {
        console.error('Error adding collect:', e);
    }
};
async function deleteCollect(multimedia_id, user_id) {
    try {
        console.log("===============del==============");
        const url = `mcollect/del/${multimedia_id}/${user_id}`;
        console.log("DELETE URL:", url); // 打印 URL
        const response = await ApiService.get(url);
        console.log("Delete Response:", response.data);
        if (response.data && response.data.success) {
            console.log("Collect removed successfully.");
            await getCollectCount(multimedia_id); // 更新收藏计数
            } else {
            console.error("Delete operation failed:", response.data.message);
        }
        } catch (error) {
        console.error("Error removing collect:", error.message);
        console.error("Error Details:", error.response ? error.response.data : error); // 打印更多信息
    }
}
</script>
<style scoped>
</style>
