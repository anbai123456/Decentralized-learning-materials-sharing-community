<template>
    <main class="main-page" id="">
        <section class="page-section q-pa-md ml-8 mr-0 pl-8" >
            <div class="container-fluid">
                <div class="grid ">
                    <div  class="col comp-grid" >
                        <div class="mt-4 text-4xl text-primary" >
                            {{ $t('welcomeHistoryToStudyMaterialSharing') }}
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="page-section mb-3" >
            <div class="container-fluid">
                <div class="grid ">
                    <div  class="col comp-grid" >
                    </div>
                </div>
            </div>
        </section>
        <section class="page-section mb-3 ml-8 mr-0 pt-2" >
            <div class="container-fluid">
                <div class="grid ">
                    <div  class="col-sm-4 col-md-4 col-1 comp-grid" >
                    </div>
                    <div  class="col-6 comp-grid" >
                        <div class="text-center ml-7 pl-6">
                            <div :class="{ 'card ': !isSubPage }" class="text-center ml-8 mr-1">
                                <NiceImage class="img-fluid" src="images/History.jpg"   style="max-width:100%;" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>

</template>
<script setup>
	import {  ref } from 'vue';
	
	
	import { useApp } from 'src/composables/app.js';
	
	import { $t } from 'src/services/i18n';
	
	const props = defineProps({
		pageName: {
			type: String,
			default: 'home',
		},
		routeName: {
			type: String,
			default: 'home',
		},
		isSubPage: {
			type : Boolean,
			default : false,
		},
	});
	const app = useApp();
	
	const pageReady = ref(true);
	
</script>
<style scoped>
</style>
