import { useDispatch} from 'react-redux';
import Picker from '../../common/picker';
import { closeCompetitorBottomDrawer, selectedCompetitor } from '../../../redux-ui-state/slices/createDareSlice';
import { getData } from '../../../utils/helper';
import { useEffect, useState } from 'react';
import { useCompetitorsList, useEntityId, useSuggestionList } from '../../../hooks/useMasterAPI';

const CompetitorPicker = (props) => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const connectionsList = useCompetitorsList();
  const followersList = useCompetitorsList();
  const followingList = useCompetitorsList();
  const suggestionList = useSuggestionList();
  const entityID = useEntityId();
  const [mergeArray, setMergeArray] = useState(undefined);

  const onCloseIconClick = () => {
    setSearchValue('');
    dispatch(closeCompetitorBottomDrawer());
  };

  useEffect(() => {
    if((connectionsList.data === undefined || followersList.data === undefined || followingList.data === undefined) && entityID?.data?.details?.id) {
        const ID = entityID?.data?.details?.id;
        connectionsList.mutate({type: LIST_TYPE.CONNECTION, id: ID});
        followersList.mutate({type: LIST_TYPE.FOLLOWERS, id: ID});
        followingList.mutate({type: LIST_TYPE.FOLLOWING, id: ID});
    }
    if(suggestionList.data === undefined || suggestionList.data?.data?.length == 0) {
      suggestionList.mutate();
    }
    if(entityID.data === undefined) {
      const options = {userAlias: getData('user_alias'), userRole: getData('user_role')}
      entityID.mutate(options);
    }
    if(connectionsList?.data && followersList?.data && followingList?.data) {
      const followingArray = [...connectionsList.data?.items, ...followersList.data?.items, ...followingList.data?.items];
      setMergeArray(followingArray);
    }
  }, []);

  const handleItem = (item) => {
    dispatch(selectedCompetitor({name: (item.userInfo ? item.userInfo[0]?.alias.toUpperCase() : item.userId), value: item.userId}));
    setSearchValue('');
    onCloseIconClick();
  }

  const handleSearch = (item) => {
    setSearchValue(item);
    suggestionList.mutate(item);
    if(searchValue === '') {
      if(connectionsList?.data && followersList?.data && followingList?.data) {
        const followingArray = [...followersList.data?.items, ...connectionsList.data?.items, ...followingList.data?.items];
        setMergeArray(followingArray);
      }
    } else {
      setMergeArray([]);
    }
  }
  

  return (
    <Picker
        title={'Competitor'}
        sectionList={true}
        data={[
          {title: 'Following', data: mergeArray || []}, 
          {title: 'Suggested', data: suggestionList?.data?.data || []}
        ]}
        onCloseIconClick={onCloseIconClick}
        handleSelectItem={handleItem}
        handleSearch={handleSearch}
        searchValue={searchValue}
        searching={true}
        displayTitleAsAlias={true}
        placeholderTextColor={'rgba(255, 255, 255, 0.6)'}
        hr={true}
    />
  );
};

export default CompetitorPicker;