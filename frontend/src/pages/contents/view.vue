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
                                    {{ $t('contentDetails') }}
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </section>
            </template>
            <section class="page-section mb-3" >
                <div class="container">
                    <div class="grid justify-content-between align-items-center">
                        <div  class="col-3 comp-grid" >
                            <Button :label="$t('reply')"   @click="app.openPageDialog({ page: 'contentsreply/add', url: `/contentsreply/add` , closeBtn: true })"  class="p-button bg-primary p-button-text "  />
                        </div>
                        <div  class="col-3 comp-grid" >
                            <div class="">
                                <div>
                                    <button v-on:click="toggleLike" class="styled-button" :disabled="contentslikeStatus === null">
                                    <!-- 添加图标 -->
                                    <i class="pi pi-heart" style="margin-right: 8px;"></i>
                                    {{ contentslikeStatus === true ? '取消点赞' : '点赞' }}
                                    </button>
                                    <span class="like-counter" v-if="contentslikeStatus !== null">
                                    {{ contentslikeStatus === true ? '你已点赞' : '你未点赞' }} | {{likecounter}}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div  class="col-3 comp-grid" >
                            <div class="">
                                <button v-on:click="toggleCollect" class="styled-button" :disabled="ccollectStatus === null">
                                <i class="pi pi-heart" style="margin-right: 8px;"></i>
                                {{ ccollectStatus === true ? '取消收藏' : '收藏' }}
                                </button>
                                <span class="like-counter" v-if="ccollectStatus !== null">
                                {{ ccollectStatus === true ? '你已收藏' : '你未收藏' }} | {{collectCounter}}
                                </span>
                            </div>
                        </div>
                        <div  class="col-3 comp-grid" >
                            <div class="">
                                <button 
                                v-on:click="toggleStart" 
                                class="styled-button" 
                                :disabled="cstartStatus === null"
                                >
                                <i class="pi pi-heart" style="margin-right: 8px;"></i>
                                {{
                                cstartStatus === null 
                                ? '加载中...' 
                                : (cstartStatus 
                                ? (cfans === 1 ? '互关' : '取消关注') 
                                : '关注')
                                }}
                                </button>
                                <span class="like-counter" v-if="cstartStatus !== null">
                                {{
                                cstartStatus 
                                ? (cfans === 1 ? '互相关注' : '已关注作者') 
                                : '你未关注作者'
                                }}
                                | {{ startCounter }}
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
                                                        <div class="text-400 mb-1">{{ $t('contentId') }}</div>
                                                        <div class="font-bold">{{ item.content_id }}</div>
                                                    </div>
                                                </div>
                                            </div>
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
                                                        <div class="text-400 mb-1">{{ $t('contentType') }}</div>
                                                        <div class="font-bold">{{ item.content_type }}</div>
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
                                            <div class="col-12 md:col-4">
                                                <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                                    <div class="">
                                                        <div class="text-400 mb-1">{{ $t('blocknum') }}</div>
                                                        <div class="font-bold">{{ item.blocknum }}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12 md:col-4">
                                                <div class="flex gap-2 align-items-center card shadow-none p-3 surface-100 ">
                                                    <div class="">
                                                        <div class="text-400 mb-1">{{ $t('txHash') }}</div>
                                                        <div class="font-bold">{{$utils.truncate( item.tx_hash , 10, '...')}}</div>
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
                                                        <div class="text-400 mb-1">{{ $t('body') }}</div>
                                                        <div class="font-bold">{{$utils.truncate( item.body , 10, '...')}}</div>
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
			default: 'content_id',
		},
		pageStoreKey: {
			type: String,
			default: 'CONTENTS',
		},
		pageName: {
			type: String,
			default: 'contents',
		},
		routeName: {
			type: String,
			default: 'contentsview',
		},
		apiPath: {
			type: String,
			default: 'contents/view',
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
			command: (event) => { app.openPageDialog({ page:'contents/edit', url: `/contents/edit/${data.content_id}`, closeBtn: true }) },
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
	const masterDetailPage = computed(() => defineAsyncComponent(() => import("./detail-pages.vue")));
	
	onMounted(()=>{ 
		const pageTitle = $t('contentDetails');
		app.setPageTitle(props.routeName, pageTitle); // set browser page title
	});
	
	const isLiked = ref(false); 
const likecounter = ref(0); 
onMounted(()=>{
    getLikeCount(props.id);
});
const contentslikeStatus = ref(null);
onMounted(async () => {
    await getLikeStatus(props.id,auth.userId);
})
const getLikeStatus = async (content_id, user_id) => {
    try {
        const response = await ApiService.get("contents/status/" + content_id + "/" + user_id);
        if (response.data && response.data.length > 0) {
            contentslikeStatus.value = true;
            } else {
            contentslikeStatus.value = false;
        }
        } catch (error) {
        console.error('Error checking like status:', error);
        contentslikeStatus.value = false;
    }
};
const toggleLike = async () => {
    contentslikeStatus.value = !contentslikeStatus.value
    if (contentslikeStatus.value) {
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
            content_id: props.id,
            user_id: auth.userId,
        };
        let response = await ApiService.post("contentslikes/add", postData); 
        } catch (e) {
        console.error(e);
    }
}
async function getLikeCount(content_id) {
    const response = await ApiService.get("contentslikes/getlikecount/" + content_id); 
    console.log("==getLikeCount():",response.data[0].likecount);
    likecounter.value = response.data[0].likecount;
}
async function deleteLikeCount(content_id, user_id) {
    try {
        const url = `contentslikes/del/${content_id}/${user_id}`;
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
console.log("=============================collect==============================")
const isCollected = ref(false); 
const collectCounter = ref(0);
onMounted(async () => {
    await getCollectCount(props.id);
});
const ccollectStatus = ref(null);
onMounted(async () => {
    await getCollectStatus(props.id, auth.userId);
});
const getCollectStatus = async (content_id, user_id) => {  
    try {
        const response = await ApiService.get("ccollect/status/" + content_id + "/" + user_id);
        if(response.data && response.data.length > 0){
            ccollectStatus.value = true;
            }else{
            ccollectStatus.value = false;
        }
        } catch (error) {
        console.error('Error checking collect status:', error);
        isCollected.value = false;
    }
};
const getCollectCount = async (content_id) => {  
    try {
        const response = await ApiService.get("ccollect/count/" + content_id);
        console.log("=========getCollectCount=========",response.data[0].collectcount)
        collectCounter.value = response.data[0].collectcount; // 从数组提取值
        } catch (error) {
        console.error('Error fetching collect count:', error);
        collectCounter.value = 0;
    }
};
const toggleCollect = async () => {
    ccollectStatus.value = !ccollectStatus.value;
    if (ccollectStatus.value) {
        await addCollect();
        } else {
        await deleteCollect(props.id, auth.userId);
    }
};
async function addCollect() {
    console.log("====================add===============")
    try {
        const postData = {
            content_id: props.id,
            user_id: auth.userId
        };
        let response = await ApiService.post("ccollect/add", postData);
        } catch (e) {
        console.error('Error adding collect:', e);
    }
};
async function deleteCollect(content_id, user_id) {
    try {
        console.log("===============del==============");
        const url = `ccollect/del/${content_id}/${user_id}`;
        console.log("DELETE URL:", url); // 打印 URL
        const response = await ApiService.get(url);
        console.log("Delete Response:", response.data);
        if (response.data && response.data.success) {
            console.log("Collect removed successfully.");
            await getCollectCount(content_id); // 更新收藏计数
            } else {
            console.error("Delete operation failed:", response.data.message);
        }
        } catch (error) {
        console.error("Error removing collect:", error.message);
        console.error("Error Details:", error.response ? error.response.data : error); // 打印更多信息
    }
}
console.log("=============================start==============================")
const isStarted = ref(false); // 是否已经开始
const startCounter = ref(0); // 计数器
const startedid = ref(0); // 文章作者 ID
const cstartStatus = ref(null); // 当前用户是否关注文章作者
const cfans = ref(null); // 互关标志，1 为互关，0 为单方面关注
onMounted(async () => {
    try {
        // 第一步：获取文章作者 ID
        await getStartedid(props.id);
        console.log("============startedid:", startedid.value);
        // 第二步：如果获取到了作者 ID，查询关注数量
        if (startedid.value) {
            await getStartCount(startedid.value);
        }
        // 第三步：查询当前用户是否关注作者
        await getStartStatus(startedid.value, auth.userId);
        // 判断关注状态并进一步处理互关逻辑
        if (cstartStatus.value) {
            // 如果已关注作者，检查是否互关
            await checkMutualFollow(auth.userId, startedid.value);  // 确保这个调用完成后再判断
            console.log("cfans.value:", cfans.value);  // 打印 cfans 的值
            if (cfans.value === 1) {
                console.log("互关");
                } else {
                console.log("作者关注了你");
            }
            } else {
            console.log("你需要先关注作者");
        }
        } catch (error) {
        console.error('初始化过程中发生错误:', error);
    }
});
// 获取文章作者 ID
const getStartedid = async (content_id) => {  
    try {
        const response = await ApiService.get("cstart/getstartedid/" + content_id);
        console.log("API Response:", response.data); // 打印响应数据
        // 正确检查数据并赋值
        if (response.data && response.data.startedid !== undefined) {
            startedid.value = response.data.startedid; // 直接从对象中获取 startedid
            console.log("Started ID:", startedid.value);
            } else {
            // 如果数据中没有 startedid，处理为空的情况
            console.warn("No startedid found for content_id:", content_id);
            startedid.value = 0;
        }
        } catch (error) {
        console.error("Error fetching startedid:", error);
        startedid.value = 0;
    }
};
// 获取关注数量
const getStartCount = async (startedid) => {  
    try {
        const response = await ApiService.get("cstart/count/" + startedid);
        console.log("=========getStartCount=========", response.data[0].startcount);
        startCounter.value = response.data[0].startcount; // 从数组提取值
        } catch (error) {
        console.error('Error fetching start count:', error);
        startCounter.value = 0;
    }
};
// 获取当前用户是否关注文章作者
const getStartStatus = async (starteduser_id, user_id) => {  
    try {
        const response = await ApiService.get("cstart/status/" + starteduser_id + "/" + user_id);
        if (response.data && response.data.length > 0) {
            cstartStatus.value = true; // 当前用户已关注文章作者
            } else {
            cstartStatus.value = false; // 当前用户未关注文章作者
        }
        } catch (error) {
        console.error('Error checking start status:', error);
        cstartStatus.value = null; // 默认没有关注
    }
};
const checkMutualFollow = async (user_id, starteduser_id) => {
    try {
        // 检查当前用户是否关注了作者
        const response1 = await ApiService.get("cstart/fans/" + user_id + "/" + starteduser_id);
        // 检查作者是否也关注了当前用户
        const response2 = await ApiService.get("cstart/fans/" + starteduser_id + "/" + user_id);
        console.log('Response1 (current user -> author):', response1.data);
        console.log('Response2 (author -> current user):', response2.data);
        // 只有两个条件都成立时才算互关
        if (response1.data && response1.data.length > 0 && response2.data && response2.data.length > 0) {
            cfans.value = 1; // 互关
            console.log("互关");
            } else {
            cfans.value = 0; // 非互关
            console.log("单方面关注");
        }
        } catch (error) {
        console.error("Error checking mutual follow:", error);
        cfans.value = null; // 默认没有互关
    }
};
const toggleStart = async () => {
    try {
        // 切换关注状态
        cstartStatus.value = !cstartStatus.value;
        if (cstartStatus.value) {
            // 当前用户关注作者
            await addStart();
            // 检查是否为互关
            await checkMutualFollow(auth.userId, startedid.value);
            console.log("你已关注作者");
            } else {
            // 当前用户取消关注作者
            await deleteStart(startedid.value, auth.userId);
            // 更新互关状态为单方面关注
            cfans.value = 0;
            console.log("你已取消关注作者");
        }
        } catch (error) {
        console.error("切换关注状态时发生错误:", error);
    }
};
async function addStart() {
    console.log("====================add===============")
    try {
        const postData = {
            starteduser_id: startedid.value,
            user_id: auth.userId
        };
        console.log("===============postData:",postData)
        let response = await ApiService.post("cstart/add", postData);
        } catch (e) {
        console.error('Error adding collect:', e);
    }
};
async function deleteStart(starteduser_id, user_id) {
    try {
        console.log("===============del==============");
        const url = `cstart/del/${starteduser_id}/${user_id}`;
        console.log("DELETE URL:", url); // 打印 URL
        const response = await ApiService.get(url);
        console.log("Delete Response:", response.data);
        if (response.data && response.data.success) {
            console.log("start removed successfully.");
            await getStartCount(content_id); // 更新收藏计数
            } else {
            console.error("Delete operation failed:", response.data.message);
        }
        } catch (error) {
        console.error("Error removing start:", error.message);
        console.error("Error Details:", error.response ? error.response.data : error); // 打印更多信息
    }
}
</script>
<style scoped>
.like-button, .follow-button {
    cursor: pointer;
    font-size: 24px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    display: inline-block;
    margin: 5px;
}
.like-button:hover, .follow-button:hover {
    background-color: #f0f0f0;
}
</style>
