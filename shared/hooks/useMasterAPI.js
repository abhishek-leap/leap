import {
	useInfiniteQuery,
	useMutation,
  } from '@tanstack/react-query';
import { competitorList, countriesList, getEntityId, hashtagList, skillsGroups, skillsList, sportsList, suggestionList } from '../apis';
import { ENTITY, LIST_TYPE, MAX_TOTAL_CONNECTIONS, OFFSET_LIMIT, ROLE_TYPE } from '../constants';
import { getData, queryString } from '../utils/helper';

export const useCountryList = () => {
	return useMutation({
		mutationFn: async () => {
		  return await countriesList()
		},
	})
}

export const useSportList = () => {
	const options = {filter: JSON.stringify({where:{type: 'sport'}})};
	return useMutation({
		mutationFn: async () => {
		  return await sportsList(options)
		},
	})
}

export const useSkillsGroup = () => {
	return useMutation({
		mutationFn: async () => {
		  return await skillsGroups();
		},
	})
}

export const useSkillsList = () => {
	return useMutation({
		mutationFn: async (skillGroupId) => {
			const options = {filter: JSON.stringify({where:{skillGroupId: skillGroupId}})};
		  return await skillsList(options);
		},
	})
}

export const useEntityId = () => {
	return useMutation({
		mutationFn: async (options) => {
		  return await getEntityId(options);
		},
	})
}

export const useCompetitorsList = () => {
	return useMutation({
		mutationFn: async (data) => {
		const USER_ID = getData("user_id");
		const options = {options: { offset: 0, limit: 10 }, entityName: ENTITY.CUSTOMER, entityId: USER_ID, listType: data.type}; 
		return await competitorList(data.id, options)
		},
	})
}

export const useSuggestionList = () => {
	return useMutation({
		mutationFn: async (alias = '') => {
			const options = {role: ROLE_TYPE.PLAYERS, alias: alias, options: { offset: 0, limit: MAX_TOTAL_CONNECTIONS }};
		  return await suggestionList(options)
		},
	})
}

export const useHashtagList = () => {
	return useMutation({
		mutationFn: async () => {
		  return await hashtagList()
		},
	})
}

// const getCompetitorList = async ({ pageParam = 0 }) => {
// 	const options = {options: JSON.stringify({listType: 'connections', entityName: 'Customer', entityId: '5eef85bb511b3b0109452824'})};
//     const {data: items, meta} = await competitorList(options);
//     return { response: items, nextPage: meta };
// }

// export const useInfiniteCompetitor = () => {
// 	return useInfiniteQuery(['competitor'], getCompetitorList, {
// 		select: data => {
// 			const allPagesArray = []
// 			data?.pages ? data.pages.forEach(competitorArray => allPagesArray.push(competitorArray?.response)) : null
// 			const flatContacts = allPagesArray.flat()
// 			return {
// 				pages: data.pages,
// 				pageParams: data.pageParams,
// 				feeds: flatContacts,
// 			}
// 		},
// 		getNextPageParam: lastPage => lastPage?.nextPage?.offset + OFFSET_LIMIT,
// 		onError: (error) => console.log(error),
// 		// staleTime: 1000 * 60 * 60,
// 	})
// }

