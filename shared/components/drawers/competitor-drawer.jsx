import {useEffect, useRef, useState} from 'react';
import styled from '@emotion/native';
import { Animated, SafeAreaView } from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {LIST_TYPE, USER_TYPE, WINDOW_HEIGHT} from '../../constants';
import Picker from '../common/picker';
import { useCompetitorsList, useEntityId, useSuggestionList } from '../../hooks/useMasterAPI';
import { closeCompetitorBottomDrawer, selectedCompetitor } from '../../redux-ui-state/slices/createDareSlice';
import { getData } from '../../utils/helper';

const ANIMATION_DURATION = 500; // 5 sec

const CompetitorDrawer = (props, { navigation }) => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const connectionsList = useCompetitorsList();
  const followersList = useCompetitorsList();
  const followingList = useCompetitorsList();
  const suggestionList = useSuggestionList();
  const entityID = useEntityId();
  const {competitorShow} = useSelector(state => state.createDare);
  const {colors} = useTheme();
  const slideAnimation = useRef(new Animated.Value(WINDOW_HEIGHT)).current;
  const [mergeArray, setMergeArray] = useState(undefined);

  const toggleDrawer = () => {
    Animated.timing(slideAnimation, {
      toValue: competitorShow ? WINDOW_HEIGHT / 4 : WINDOW_HEIGHT,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();
  };

  const onCloseIconClick = () => {
    setSearchValue('');
    dispatch(closeCompetitorBottomDrawer());
  };

  useEffect(() => {
    toggleDrawer();
  }, [toggleDrawer, competitorShow]);

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
    console.log("suggested List ", suggestionList.data);
  }, [competitorShow]);

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
    <Animated.View
      style={{
        ...props.style,
        position: 'absolute',
        backgroundColor: colors.primary,
        width: '100%',
        height: '100%',
        transform: [{translateY: slideAnimation}],
      }}>
      <SafeAreaView>
        <Body>
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
        </Body>
      </SafeAreaView>
    </Animated.View>
  );
};

export default CompetitorDrawer;

const Body = styled.View`
  height: 100%;
  border-radius: 20px;
`;

const ClosedContainer = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
  padding: 5px;
`;
