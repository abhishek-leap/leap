import React, {useEffect, useRef, useState} from 'react';
import {View, useWindowDimensions, LogBox, Platform} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import styled from '@emotion/native';
import {useDispatch, useSelector} from 'react-redux';

import {
  useHashtagList,
  useSkillsGroup,
  useSkillsList,
} from '../hooks/useMasterAPI';
import SkillsList from '../components/search/skills';
import TxtInput from '../components/common/textInput';
import {PLACEHOLDER_SEARCH, WINDOW_WIDTH} from '../constants';
import HashtagsList from '../components/search/hashtaglist';
import {searchScreenText} from '../redux-ui-state/slices/feedsSlice';
import TalentList from '../components/search/talent';

const TalentTab = () => {
  const {searchText} = useSelector(state => state.feeds);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#290C54',
        // justifyContent: 'center',
        // alignItems: 'center',
      }}>
      <TalentList query={searchText} filter={''} showFilter={true} />
    </View>
  );
};

const SkillsTab = () => {
  const skillsList = useSkillsList();
  const {data: skillGroupData} = useSkillsGroup();
  const {searchText} = useSelector(state => state.feeds);

  useEffect(() => {
    if (skillsList.data === undefined && skillGroupData != undefined) {
      const searchSkillID = skillGroupData?.filter(
        item => item.alias == 'player_technical' && item.entityName == 'Player',
      );
      skillsList.mutate(searchSkillID[0].id);
    }
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#290C54',
        // justifyContent: 'center',
        // alignItems: 'center',
      }}>
      <SkillsList
        data={skillsList.data?.filter(ele =>
          ele.name?.toLowerCase().includes(searchText?.toLowerCase()),
        )}
      />
    </View>
  );
};

const TagsTab = () => {
  const {data: HashTagList} = useHashtagList();
  const {searchText} = useSelector(state => state.feeds);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#290C54',
        // justifyContent: 'center',
        // alignItems: 'center',
      }}>
      <HashtagsList
        data={HashTagList?.filter(ele =>
          ele.alias?.toLowerCase().includes(searchText?.toLowerCase()),
        )}
      />
    </View>
  );
};

const renderScene = SceneMap({
  talent: TalentTab,
  skills: SkillsTab,
  tags: TagsTab,
});

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{backgroundColor: 'white'}}
    style={{backgroundColor: '#290C54'}}
  />
);

export default ({navigation}) => {
  const layout = useWindowDimensions();
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const [index, setIndex] = React.useState(0);
  const preIndex = useRef(-1);
  const [routes] = React.useState([
    {key: 'talent', title: 'Talent'},
    {key: 'skills', title: 'Skills'},
    {key: 'tags', title: 'Tags'},
  ]);

  const handleSwipe = () => {
    if (index == 0 && preIndex.current === 0) {
      preIndex.current = index;
      navigation.jumpTo('Feeds');
    } else if (index == 2 && preIndex.current == 2) {
      navigation.jumpTo('Create Dare');
    }
    preIndex.current = index;
    _handleClearSearchText();
  };

  const _handleClearSearchText = () => {
    setSearchValue('');
    dispatch(searchScreenText(''));
  }

  LogBox.ignoreLogs([
    'Sending `onAnimatedValueUpdate` with no listeners registered.',
  ]);

  const handleSearch = text => {
    setSearchValue(text);
    dispatch(searchScreenText(text));
  };

  return (
    <>
      <TextInputOuterView>
        <TxtInput
          value={searchValue}
          width={WINDOW_WIDTH / 3.85 + '%'}
          onChangeText={handleSearch}
          placeholder={PLACEHOLDER_SEARCH}
          placeholderTextColor={'rgba(255, 255, 255, 0.6)'}
          searchIcon={true}
          // style={{padding: '2% 2% 2% 0%'}}
        />
      </TextInputOuterView>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        onSwipeEnd={() => (Platform.OS === 'ios' ? handleSwipe(index) : _handleClearSearchText())}
        initialLayout={{width: layout.width}}
      />
    </>
  );
};

const TextInputOuterView = styled.View`
  padding: 5px 15px 0px 15px;
  background-color: #290c54;
`;
