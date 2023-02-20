import {
    useInfiniteQuery
  } from '@tanstack/react-query';
import {dareBackPreUploadedVideos, loadFeeds} from '../apis';
import {OFFSET_LIMIT} from '../constants';
import { getData } from '../utils/helper';

const getInfiniteFeeds = async ({ pageParam = 0 }) => {
    const queyParams = {filter: {offset: pageParam, limit: 10}, q: {smartSort: 'true'}};
    const {feeds: apiFeeds, meta} = await loadFeeds(queyParams);
    return { response: apiFeeds, nextPage: meta };
}

export const useInfiniteFeeds = () => {
	return useInfiniteQuery(['feeds'], getInfiniteFeeds, {
		select: data => {
			const allPagesArray = []
			data?.pages ? data.pages.forEach(feedsArray => allPagesArray.push(feedsArray?.response)) : null
			const flatContacts = allPagesArray.flat()
			return {
				pages: data.pages,
				pageParams: data.pageParams,
				feeds: flatContacts,
			}
		},
		getNextPageParam: lastPage => lastPage?.nextPage?.offset + OFFSET_LIMIT,
		onError: (error) => console.log(error),
		// staleTime: 1000 * 60 * 60,
	})
}

const getDareBackFeeds = async ({ pageParam = 0 }) => {
	let userId = getData('user_id');
    const queyParams = {filter: {offset: pageParam, limit: 10},  q: {userId: userId}};
    const {feeds: apiFeeds, meta} = await dareBackPreUploadedVideos(queyParams);
    return { response: apiFeeds, nextPage: meta };
}

export const useDareBackInfiniteFeeds = () => {
	return useInfiniteQuery(['uploadedVideos'], getDareBackFeeds, {
		select: data => {
			const allPagesArray = []
			data?.pages ? data.pages.forEach(feedsArray => allPagesArray.push(feedsArray?.response)) : null
			const flatContacts = allPagesArray.flat()
			return {
				pages: data.pages,
				pageParams: data.pageParams,
				feeds: flatContacts,
			}
		},
		getNextPageParam: lastPage => lastPage?.nextPage?.offset + OFFSET_LIMIT,
		onError: (error) => console.log(error),
		// staleTime: 1000 * 60 * 60,
	})
}