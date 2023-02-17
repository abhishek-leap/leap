import {
    useInfiniteQuery
  } from '@tanstack/react-query';
import {loadDares} from '../apis';
import {OFFSET_LIMIT} from '../constants';

const getInfiniteDares = async ({ pageParam = 0 }) => {
    const queyParams = {options: JSON.stringify({filter: {offset: pageParam, limit: 10}, q: {source: 'bar'}})};
    const {dares: apiDares, meta} = await loadDares(queyParams);
	// const data = apiDares.reduce((group, arr) => {
	// 	const { status } = arr;
	// 	group[status] = group[status] ?? [];
	// 	group[status].push(arr);
	// 	return group;
	//   },
	// {});
	// const groupedData = Object.values(apiDares.reduce((spd, item) => {
	// 	if (!spd[item.status]) spd[item.status] = {
	// 		key: item.status,
	// 		data: []
	// 	};
	// 	spd[item.status].data.push(item);
	// 	return spd;
	// }, {}));
	// console.log('calling API of dares: ', apiDares, meta);
    return { response: apiDares, nextPage: meta };
}

export const useInfiniteDares = () => {
	return useInfiniteQuery(['dares'], getInfiniteDares, {
		select: data => {
			const allPagesArray = []
			data?.pages ? data.pages.forEach(daresArray => allPagesArray.push(daresArray?.response)) : null
			const flatContacts = allPagesArray.flat()
			return {
				pages: data.pages,
				pageParams: data.pageParams,
				dares: flatContacts,
			}
		},
		getNextPageParam: lastPage => lastPage?.nextPage?.offset + OFFSET_LIMIT,
		onError: (error) => console.log(error),
		// staleTime: 1000 * 60 * 60,
	})
}