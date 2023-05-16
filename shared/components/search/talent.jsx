import styled from '@emotion/native';
import {FlatList} from 'react-native';
import {useInfiniteQuery} from '@tanstack/react-query';
import Item from './item';
import {loadSearchTalents} from '../../apis';
import {TALENTS_PER_PAGE, TALENT_USER_FILTERS_OBJ} from '../../constants';
import {getData} from '../../utils/helper';
// import Filter from "@/ui/common/filter";

const TalentList = ({
  query = '',
  filter = '',
  onClick,
  disabled,
  showFilter = false,
}) => {
  const isPowerUser = getData('power_user');
  const getParams = pageParam => {
    const params = {
      options: {offset: pageParam || 0, limit: TALENTS_PER_PAGE},
      role: 'players',
    };
    if (query && query?.length > 0) {
      params.alias = query;
    }
    if (filter) {
      params.filter = {blockType: filter};
    }
    return params;
  };

  const {data: items, fetchNextPage} = useInfiniteQuery({
    queryKey: ['talents', query, filter],
    queryFn: ({pageParam}) => loadSearchTalents(getParams(pageParam)),
    getNextPageParam: (lastPage, allPages) => {
      const total = lastPage?.meta?.total || 0;
      const newOffset = allPages?.reduce((len, item) => {
        if (item?.data) {
          len += item.data.length;
        }
        return len;
      }, 0);
      return newOffset < total ? newOffset : undefined;
    },
  });

  const mergedTalents =
    items?.pages?.reduce((arr, item) => {
      if (item?.data?.length) {
        const talents = item.data.map(ele => ({
          ...ele,
          component: (
            <TalentView
              key={ele.id}
              onPress={() => {
                onClick && onClick(ele);
              }}>
              <Item
                url={`/profile/${ele.alias}`}
                text={ele.alias}
                type={'talent'}
                user={{alias: ele.alias, userId: ele.userId}}
                fontStyle={onClick && 'italic'}
                disabled={disabled}
              />
            </TalentView>
          ),
        }));

        arr = [...arr, ...talents];
      }
      return arr;
    }, []) || [];

  const _renderItem = item => {
    return <RenderTalentView>{item.component}</RenderTalentView>;
  };

  return (
    <TalentContainer>
      {isPowerUser && showFilter && (
        <FilterWrapper>
          {/* <Filter
            isMultiSelect={false}
            filtersOptions={TALENT_USER_FILTERS_OBJ}
            labelColor={"#FF3030"}
          /> */}
        </FilterWrapper>
      )}
      <FlatList
        data={mergedTalents}
        renderItem={({item}) => _renderItem(item)}
        onEndReached={() => fetchNextPage()}
      />
    </TalentContainer>
  );
};

export default TalentList;

const TalentContainer = styled.View`
  padding-top: 40px;
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: scroll;
`;

const FilterWrapper = styled.View`
  position: relative;
  width: 70%;
  height: 50px;
  padding-block: 10px 0px;
`;

const TalentView = styled.TouchableOpacity`
  padding: 3px 30px 3px 20px;
  width: 100%;
`;

const RenderTalentView = styled.View``;
