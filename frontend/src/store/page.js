import { reactive, ref } from 'vue';
import { defineStore } from 'pinia';
import { ApiService } from 'src/services/api';

function getPageStore(pageName, defaultState = {}) {
	return defineStore(pageName, () => {
		const storeInitialized = ref(false);
		const pageState = {
			apiData: null,
			records: [],
			currentRecord: null,
			formData: null,
			editRecord: null,
			filters: {},
			id: null,
			totalRecords: 0,
			recordCount: 0,
			singleSelect: false,
			selectedItems: [],
			expandedRows: [],
			pagination: {
				page: 1,
				limit: 10,
				sortBy: '',
				descending: true,
			},
			primaryKey: '',
			enableCache: false,
			cacheKeys: [],
		}

		const initState = { ...pageState, ...defaultState }
		const state = reactive(initState);

		function init(data) {
			Object.assign(state, data);
			storeInitialized.value = true;
		}

		async function fetchRecords(args) {
			try {
				state.currentRecord = null;
				const { url, merge } = args;
				const response = await ApiService.get(url, { cache: state.enableCache });
				const apiData = response.data;
				state.apiData = apiData;
				if (apiData) {
					const newRecords = apiData.records || apiData;
					if (merge) {
						state.records = state.records.concat(newRecords);
					}
					else {
						state.records = newRecords;
					}
					//update pagination state with new response data
					state.totalRecords = apiData?.totalRecords;
					state.recordCount = apiData?.recordCount;
				}
				saveCacheKey(response);
				return apiData;
			}
			catch (err) {
				throw err;
			}
		}

		async function fetchRecord(url) {
			try {
				//state.currentRecord = null;
				const response = await ApiService.get(url, { cache: false });
				const apiData = response.data;
				if (apiData) {
					state.currentRecord = apiData;
				}
				return apiData;
			}
			catch (err) {
				throw err;
			}
		}

		async function fetchEditRecord(url) {
			try {
				const response = await ApiService.get(url, { cache: false });
				const apiData = response.data;
				if (apiData) {
					state.editRecord = apiData;
				}
				return apiData;
			}
			catch (err) {
				throw err;
			}
		}

		async function saveRecord(args) {
			try {
				const { url, payload } = args;
				const response = await ApiService.post(url, payload);
				const newRecord = response.data;
				if (newRecord) {
					if (Array.isArray(newRecord)) {
						for (let index = 0; index < newRecord.length; index++) {
							state.records.unshift(newRecord[index]);
						}
					}
					else {
						state.records.unshift(newRecord);
					}
				}
				await invalidateCache();
				return newRecord;
			}
			catch (err) {
				throw err;
			}
		}

		async function updateRecord(args) {
			try {
				let { url, payload, id } = args;
				const response = await ApiService.post(url, payload);
				const updatedRecord = response.data;
				id = id || payload[state.primaryKey];
				if (updatedRecord) {
					const item = state.records.find(item => item[state.primaryKey] == id);
					if (item) {
						Object.assign(item, updatedRecord);
						state.currentRecord = item;
					}
					if (state.currentRecord) {
						Object.assign(state.currentRecord, updatedRecord);
					}
				}
				await invalidateCache();
				return updatedRecord
			}
			catch (err) {
				throw err;
			}
		}

		async function deleteRecord(args) {
			try {
				const { url, id } = args;
				const response = await ApiService.get(url);
				const deletedRecordIds = response.data;
				if (Array.isArray(id)) {
					id.forEach((itemId) => {
						let itemIndex = state.records.findIndex(item => item[state.primaryKey] == itemId);
						if (itemIndex != -1) {
							state.records.splice(itemIndex, 1);
						}
					})
				}
				else {
					let itemIndex = state.records.findIndex(item => item[state.primaryKey] == id);
					if (itemIndex != -1) {
						state.records.splice(itemIndex, 1);
					}
				}
				await invalidateCache();
				return deletedRecordIds;
			}
			catch (err) {
				throw err;
			}
		}

		async function invalidateCache() {
			state.cacheKeys.forEach(async (id) => {
				await ApiService.axios().storage.remove(id);
			});
		}

		async function saveCacheKey(response) {
			const id = response.id;
			if (!state.cacheKeys.includes(id)) {
				state.cacheKeys.push(id);
			}
		}

		function setFormData(formData) {
			state.formData = formData;
		}

		function resetPageRecords() {
			state.records = [];
			state.recordCount = 0;
			state.totalRecords = 0;
			state.pagination.page = 1;
			state.pagination.totalRecords = 0;
		}

		return {
			state,
			init,
			storeInitialized,
			fetchRecords,
			fetchRecord,
			fetchEditRecord,
			saveRecord,
			updateRecord,
			deleteRecord,
			setFormData,
			resetPageRecords
		}
	})()
}

export function usePageStore(pageName, defaultState) {
	const store = getPageStore(pageName, defaultState);
	if (!store.storeInitialized && defaultState) {
		store.init(defaultState);
	}
	return store;
}