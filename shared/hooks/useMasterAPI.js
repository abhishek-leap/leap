import {useInfiniteQuery, useMutation, useQuery} from '@tanstack/react-query';
import {
  competitorList,
  countriesList,
  getEntityId,
  hashtagList,
  mockAPI,
  mockAPIPlayLeapFeeds,
  skillsGroups,
  skillsList,
  sportsList,
  suggestionList,
} from '../apis';
import {ENTITY, MAX_TOTAL_CONNECTIONS, ROLE_TYPE} from '../constants';
import {getData} from '../utils/helper';

export const useCountryList = () => {
  return useQuery(['countryList'], async () => {
    return await countriesList();
  });
};

export const useSportList = () => {
  return useQuery(['sportList'], async () => {
    const options = {filter: JSON.stringify({where: {type: 'sport'}})};
    return await sportsList(options);
  });
};

export const useSkillsGroup = () => {
  return useQuery(['skillsGroup'], async () => {
    return await skillsGroups();
  });
};

export const useSkillsList = () => {
  return useMutation({
    mutationFn: async skillGroupId => {
      const options = {
        filter: JSON.stringify({where: {skillGroupId: skillGroupId}}),
      };
      return await skillsList(options);
    },
  });
};

export const useEntityId = () => {
  return useMutation({
    mutationFn: async options => {
      return await getEntityId(options);
    },
  });
};

export const useCompetitorsList = () => {
  return useMutation({
    mutationFn: async data => {
      const USER_ID = getData('user_id');
      const options = {
        options: {offset: 0, limit: 10},
        entityName: ENTITY.CUSTOMER,
        entityId: USER_ID,
        listType: data.type,
      };
      return await competitorList(data.id, options);
    },
  });
};

export const useSuggestionList = () => {
  return useMutation({
    mutationFn: async (alias = '') => {
      const options = {
        role: ROLE_TYPE.PLAYERS,
        alias: alias,
        options: {offset: 0, limit: MAX_TOTAL_CONNECTIONS},
      };
      return await suggestionList(options);
    },
  });
};

export const useHashtagList = () => {
  return useQuery(['hashList'], async () => {
    return await hashtagList();
  });
};

export const useMojAPI = () => {
  return useQuery(
    ['mojURls'],
    async () => {
      return await mockAPI();
    },
    {staleTime: 1000 * 60 * 60},
  );
};

export const useLeapMockAPI = () => {
  return useQuery(
    ['leapMockURLS'],
    async () => {
      return await mockAPIPlayLeapFeeds();
    },
    {staleTime: 1000 * 60 * 60},
  );
};

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
