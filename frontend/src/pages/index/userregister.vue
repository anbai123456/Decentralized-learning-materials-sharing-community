<template>
    <main class="main-page"  id="">
        <template v-if="pageReady">
            <template v-if="showHeader">
                <section class="page-section mb-3 mb-3" >
                    <div class="container">
                        <div class="grid justify-content-between align-items-center">
                            <div  v-if="!isSubPage"  class="col-fixed " >
                                <Button @click="$router.go(-1)"   class="p-button p-button-text " icon="pi pi-arrow-left"  />
                            </div>
                            <div  class=" col " >
                                <div class=" text-2xl text-primary font-bold" >
                                    {{ $t('userRegistration') }}
                                </div>
                            </div>
                            <div  class="col-12 md:col-4 comp-grid" >
                                <div class="">
                                    <div class="flex align-items-center">
                                        <div>{{ $t('alreadyHaveAnAccount') }}</div>
                                        <div class="ml-2">
                                            <router-link  to="/">
                                                <Button icon="pi pi-user" :label="$t('login')" /> 
                                            </router-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </section>
            </template>
            <section class="page-section " >
                <div class="container">
                    <div class="grid ">
                        <div  class="md:col-9 sm:col-12 comp-grid" >
                            <div >
                                <form ref="observer"  tag="form" @submit.prevent="submitForm()" :class="{ 'card ': !isSubPage }" class=" ">
                                    <div class="grid">
                                        <div class="col-12">
                                            <div class="formgrid grid">
                                                <div class="col-12 md:col-3">
                                                    {{ $t('username') }} *
                                                </div>
                                                <div class="col-12 md:col-9">
                                                    <check-duplicate v-model="formData.username" check-path="components_data/users_username_exist/" v-slot="checker">
                                                    <InputText  ref="ctrlusername" @blur="checker.check" :loading="checker.loading" v-model.trim="formData.username"  :label="$t('username')" type="text" :placeholder="$t('enterUsername')"      
                                                    class=" w-full" :class="getErrorClass('username')">
                                                    </InputText>
                                                    <small v-if="isFieldValid('username')" class="p-error">{{ getFieldError('username') }}</small> 
                                                    <small v-if="!checker.loading && checker.exist" class="p-error"> {{ $t('notAvailable') }}</small>
                                                    <small v-if="checker.loading" class="text-500">Checking...</small>
                                                    </check-duplicate>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="formgrid grid">
                                                <div class="col-12 md:col-3">
                                                    {{ $t('email') }} *
                                                </div>
                                                <div class="col-12 md:col-9">
                                                    <check-duplicate v-model="formData.email" check-path="components_data/users_email_exist/" v-slot="checker">
                                                    <InputText  ref="ctrlemail" @blur="checker.check" :loading="checker.loading" v-model.trim="formData.email"  :label="$t('email')" type="email" :placeholder="$t('enterEmail')"      
                                                    class=" w-full" :class="getErrorClass('email')">
                                                    </InputText>
                                                    <small v-if="isFieldValid('email')" class="p-error">{{ getFieldError('email') }}</small> 
                                                    <small v-if="!checker.loading && checker.exist" class="p-error"> {{ $t('notAvailable') }}</small>
                                                    <small v-if="checker.loading" class="text-500">Checking...</small>
                                                    </check-duplicate>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="formgrid grid">
                                                <div class="col-12 md:col-3">
                                                    {{ $t('password') }} *
                                                </div>
                                                <div class="col-12 md:col-9">
                                                    <Password ref="ctrlpassword" v-model="formData.password" :label="$t('password')" :placeholder="$t('enterPassword')"   
                                                    class="w-full" inputClass="w-full" toggleMask :feedback="true" :class="getErrorClass('password')" />
                                                    <small v-if="isFieldValid('password')" class="p-error">{{ getFieldError('password') }}</small> 
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="formgrid grid">
                                                <div class="col-12 md:col-3">
                                                    {{ $t('confirmPassword') }} *
                                                </div>
                                                <div class="col-12 md:col-9">
                                                    <Password  class="w-full" :class="getErrorClass('confirm_password', row)" inputClass="w-full" :feedback="false" toggleMask ref="ctrlconfirmpassword" v-model="formData.confirm_password" :label="$t('confirmPassword')" :placeholder="$t('confirmPassword')"  />
                                                    <small v-if="isFieldValid('confirm_password', row)" class="p-error">{{ getFieldError('confirm_password', row) }}</small> 
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="formgrid grid">
                                                <div class="col-12 md:col-3">
                                                    {{ $t('tele') }} *
                                                </div>
                                                <div class="col-12 md:col-9">
                                                    <InputText  ref="ctrltele" v-model.trim="formData.tele"  :label="$t('tele')" type="number" :placeholder="$t('enterTele')"   step="any"    
                                                    class=" w-full" :class="getErrorClass('tele')">
                                                    </InputText>
                                                    <small v-if="isFieldValid('tele')" class="p-error">{{ getFieldError('tele') }}</small> 
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="formgrid grid">
                                                <div class="col-12 md:col-3">
                                                    {{ $t('photo') }} *
                                                </div>
                                                <div class="col-12 md:col-9">
                                                    <div class="mb-3">
                                                        <Uploader @uploadError="(msg)=>app.flashMsg('File Upload', msg, 'error')" :class="getErrorClass('photo')" upload-path="fileuploader/upload/photo" v-model="formData.photo" :fileLimit="1" :maxFileSize="3000000" accept=".jpg,.png,.gif,.jpeg" :multiple="false" :label="$t('chooseFilesOrDropFilesHere')" />
                                                    </div>
                                                    <small v-if="isFieldValid('photo')" class="p-error">{{ getFieldError('photo') }}</small> 
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="formgrid grid">
                                                <div class="col-12 md:col-3">
                                                    {{ $t('followersCount') }} *
                                                </div>
                                                <div class="col-12 md:col-9">
                                                    <InputText  ref="ctrlfollowers_count" v-model.trim="formData.followers_count"  :label="$t('followersCount')" type="number" :placeholder="$t('enterFollowersCount')"   step="any"    
                                                    class=" w-full" :class="getErrorClass('followers_count')">
                                                    </InputText>
                                                    <small v-if="isFieldValid('followers_count')" class="p-error">{{ getFieldError('followers_count') }}</small> 
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="formgrid grid">
                                                <div class="col-12 md:col-3">
                                                    {{ $t('followingCount') }} *
                                                </div>
                                                <div class="col-12 md:col-9">
                                                    <InputText  ref="ctrlfollowing_count" v-model.trim="formData.following_count"  :label="$t('followingCount')" type="number" :placeholder="$t('enterFollowingCount')"   step="any"    
                                                    class=" w-full" :class="getErrorClass('following_count')">
                                                    </InputText>
                                                    <small v-if="isFieldValid('following_count')" class="p-error">{{ getFieldError('following_count') }}</small> 
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="showSubmitButton" class="text-center my-3">
                                        <Button type="submit" :label="$t('submit')" icon="pi pi-send" :loading="saving" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </template>
    </main>
</template>
<script setup>
	import {  computed,  reactive, toRefs, onMounted } from 'vue';
	import { required, email, sameAs, numeric, } from 'src/services/validators';
	import { useApp } from 'src/composables/app.js';
	import { useAuth } from 'src/composables/auth';
	import { $t } from 'src/services/i18n';
	import { useAddPage } from 'src/composables/addpage.js';
	import { usePageStore } from 'src/store/page';
	const props = defineProps({
		pageStoreKey: {
			type: String,
			default: 'REGISTER',
		},
		pageName : {
			type : String,
			default : 'users',
		},
		routeName : {
			type : String,
			default : 'usersuserregister',
		},
		apiPath : {
			type : String,
			default : 'auth/register',
		},
		submitButtonLabel: {
			type: String,
			default: () => $t('submit'),
		},
		formValidationError: {
			type: String,
			default: $t('formIsInvalid'),
		},
		formValidationMsg: {
			type: String,
			default: $t('pleaseCompleteTheForm'),
		},
		msgTitle: {
			type: String,
			default: $t('createRecord'),
		},
		msgAfterSave: {
			type: String,
			default: () => $t('recordAddedSuccessfully'),
		},
		msgBeforeSave: {
			type: String,
			default: () => $t(''),
		},
		showHeader: {
			type: Boolean,
			default: true,
		},
		showSubmitButton: {
			type: Boolean,
			default: true,
		},
		redirect: {
			type : Boolean,
			default : true,
		},
		isSubPage: {
			type : Boolean,
			default : false,
		},
		pageData: { // use to set formData default values from another page
			type: Object,
			default: () => ({
				username: "", email: "", password: "", confirm_password: "", tele: "", photo: "", followers_count: "0", following_count: "0", 
			})
		},
	});
	//lines
	const store = usePageStore(props.pageStoreKey);
	const app = useApp();
	const auth = useAuth();
	
	const formData = reactive({ ...props.pageData });
	
	//vuelidate form validation rules
	const rules = computed(() => {
		return {
			username: { required },
			email: { required, email },
			password: { required },
			confirm_password: {required, sameAs: sameAs(formData.password, 'Password') },
			tele: { required, numeric },
			photo: { required },
			followers_count: { required, numeric },
			following_count: { required, numeric }
		}
	});
	
	const page = useAddPage({ store, props, formData, rules, beforeSubmit, afterSubmit });
	
	// event raised before submit form
	function beforeSubmit(){
		return true;
	}
	
	// event raised after form submited
	function afterSubmit(response) { 
		app.flashMsg(props.msgTitle, props.msgAfterSave);
		page.setFormDefaultValues(); //reset form data
		const loginData = response;
		// user registration completed. navigate to home page
		if (loginData.token) {
			auth.saveLoginData(loginData, false);
			location.href = "/";
		}
		else{
			app.flashMsg(loginData.message); //show flashMsg if available
			app.navigateTo(loginData.nextpage);// navigate to next page if available
		}
	}
	
	const {  saving, pageReady, } = toRefs(page.state);
	
	const { submitForm, getErrorClass, getFieldError, isFieldValid,  } = page.methods;
	
	onMounted(()=>{
		const pageTitle = $t('addNewUser');
		app.setPageTitle(props.routeName, pageTitle); // set browser page title
	});
	
	// expose page object for other components access
	defineExpose({
		page
	});
</script>
<style scoped>
</style>
