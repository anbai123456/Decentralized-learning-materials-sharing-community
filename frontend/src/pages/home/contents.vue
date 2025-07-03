<template>
    <main class="main-page" id="">
        <section class="page-section q-pa-md" >
            <div class="container-fluid">
                <div class="grid ">
                    <div  class="col comp-grid" >
                        <div class="mt-4 text-4xl text-primary" >
                            {{ $t('welcomeContentsToStudyMaterialSharing') }}
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
                            <div :class="{ 'card ': !isSubPage }" class="">
                                <div class="q-pa-md">
                                    <div class="font-bold text-lg">文字分享</div>
                                    <div class="text-500"></div>
                                    <hr />
                                    <div class="row q-col-gutter-sm">
                                        <div class="col">
                                            <api-data-source :enable-cache="false"   api-path="components_data/barchart_" >
                                                <template v-slot="req">
                                                    <div style="position:relative;text-align:center">
                                                        <div class="text-center p-3" v-if="req.loading">
                                                            <ProgressSpinner style="width:50px;height:50px" />
                                                        </div>
                                                        <vue-chart :chart-data="req.response" chart-type="bar" ></vue-chart>
                                                    </div>
                                                </template>
                                            </api-data-source>
                                        </div>
                                    </div>
                                </div>
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
	import VueChart from 'src/components/VueCharts.vue';
	
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
