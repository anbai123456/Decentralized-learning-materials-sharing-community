import { reactive, computed, watch, onMounted, useAttrs } from "vue";
import useVuelidate from '@vuelidate/core';
import { useApp } from 'src/composables/app';

import { useConfirm } from 'primevue/useconfirm';

export function useAddPage({ store, props, formData, rules = {}, beforeSubmit, afterSubmit }) {

	const app = useApp();
	const attrs = useAttrs();

	const confirm = useConfirm();

	const storeState = store.state;

	const state = reactive({
		id: null,
		pageReady: false,
		submitted: false,
		saving: false,
	});

	const $v = useVuelidate(rules, formData); // form validation

	setFormDefaultValues();

	const apiUrl = computed(() => {
		return props.apiPath
	});

	function validateForm() {
		state.submitted = true;
		$v.value.$validate();
		const isValid = !$v.value.$invalid;
		if(!isValid){
			app.flashMsg(props.formValidationError, props.formValidationMsg, "error");
		}
		return isValid;
	}


	function normalizeFormData(formValues) {
		if (typeof formValues === 'string') {
			return formValues;
		}
		if (Array.isArray(formValues)) {
			return formValues.map(form => normalizeFormData(form));
		}
		if (typeof formValues === 'object') {
			const postData = { ...formValues }
			Object.keys(postData).forEach(function (key) {
				const fieldValue = postData[key];
				if (Array.isArray(fieldValue)) {
					if(fieldValue.every(item => typeof item === "string")){
						postData[key] = fieldValue.toString();
					}
					else{
						postData[key] = normalizeFormData(fieldValue);
					}
				}
				else if (fieldValue instanceof Date) {
					postData[key] = fieldValue.toISOString().slice(0, 19).replace('T', ' ');
				}
				else if (fieldValue === '') {
					postData[key] = null;
				}
			});
			return postData;
		}
		return formValues
	}

	function submitForm() {
		state.submitted = true;
		if (beforeSubmit !== undefined) {
			if (!beforeSubmit()) { return; }
		}

		if (!validateForm()) {
			return;
		}

		const confirmMsg = props.msgBeforeSave;
		if (confirmMsg) {
			confirm.require({
				message: confirmMsg,
				header: props.msgTitle,
				icon: 'pi pi-save',
				accept: async () => {
					saveFormData();
				},
				reject: () => {
					//callback to execute when user rejects the action
				}
			});
		}
		else {
			saveFormData();
		}
	}

	async function saveFormData() {
		state.saving = true;
		const url = apiUrl.value;
		let payload;
		if (Array.isArray(formData)) {
			payload = formData.map(form => normalizeFormData(form));
		}
		else {
			payload = normalizeFormData(formData)
		}

		const data = { url, payload }
		try {
			const response = await store.saveRecord(data);
			if (attrs.onSubmitted) {
				attrs.onSubmitted(response);
			}
			else if (afterSubmit) {
				afterSubmit(response);
			}
		}
		catch (err) {
			app.showPageRequestError(err);
		}
		finally {
			state.saving = false;
		}
	}

	function setFormDefaultValues() {
		state.submitted = false;
		const storeFormData = computed(() => storeState.formData); // from data from store
		const pageData = props.pageData; // when form default values is passed by component props
		const formDefaultValues = { ...pageData, ...storeFormData.value };

		if (Array.isArray(formData)) {
			formData.forEach(oldFormData => {
				Object.assign(oldFormData, formDefaultValues); //reset form data
			})
		}
		else {
			Object.assign(formData, formDefaultValues); //reset form data
		}
	}

	function getErrorClass(field, index) {
		let isInvalid = false;
		if (index === undefined) {
			isInvalid = ($v.value[field]?.$invalid || false) && state.submitted;
		}
		else {//for multi form validation
			isInvalid = ($v.value.$each.$response.$errors[index][field]?.length || false) && state.submitted;
		}
		return { "p-invalid": isInvalid };
	}

	function isFieldValid(field, index) {
		if (index === undefined) {
			return ($v.value[field]?.$invalid || false) && state.submitted;
		}
		else {
			return ($v.value.$each.$response.$errors[index][field]?.length || false) && state.submitted;
		}
	}

	function getFieldError(field, index) {
		let fieldErrors = null;
		if (index === undefined) {
			fieldErrors = $v.value[field]?.$silentErrors;
			if (fieldErrors?.length) {
				return fieldErrors[0].$message; //return the first error
			}
		}
		else {
			fieldErrors = $v.value.$each.$response.$errors[index][field];
			if (fieldErrors?.length) {
				return fieldErrors[0].$message; //return the first error
			}
		}
		return null;
	}

	watch(() => props.pageData, (current) => {
		Object.assign(formData, current);
	},
		{ deep: true, immediate: true }
	);

	onMounted(() => {
		state.pageReady = true;
	});


	const computedProps = {
		apiUrl,
	}

	const methods = {
		submitForm,
		getErrorClass,
		getFieldError,
		isFieldValid
	}

	return {
		validateForm,
		setFormDefaultValues,
		formData,
		state,
		computedProps,
		methods
	}

}