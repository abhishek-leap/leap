import { useTheme } from '@react-navigation/native';
import React, { useRef } from 'react';
import {Text, View, useWindowDimensions, LogBox, Platform} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import styled from '@emotion/native';
import TxtInput from '../components/common/textInput';
import { PLACEHOLDER_DARE_TITLE, WINDOW_WIDTH } from '../constants';

const FirstRoute = ({param}) => (
  <View style={{ flex: 1, backgroundColor: '#290C54', justifyContent: 'center', alignItems: 'center'}}>
    <Text style={{color: 'white'}}>{'Talent List'}</Text>
  </View>
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#290C54', justifyContent: 'center', alignItems: 'center'  }}>
    <Text style={{color: 'white'}}>{'Skills List'}</Text>
  </View>
);

const ThirdRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#290C54', justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{color: 'white'}}>{'Tags List'}</Text>
  </View>
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
});

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: 'white' }}
    style={{ backgroundColor: '#290C54' }}
  />
);

export default ({ navigation }) => {
  const layout = useWindowDimensions();
  const { colors } = useTheme();
  
  const [index, setIndex] = React.useState(0);
  const preIndex = useRef(-1);
  const [routes] = React.useState([
    { key: 'first', title: 'Talent', param: colors },
    { key: 'second', title: 'Skills' },
    { key: 'third', title: 'Tags' },
  ]);

 const handleSwipe = () => {
  if(index == 0 && preIndex.current === 0) {
    preIndex.current = index
    navigation.jumpTo('Feeds');
  } else if (index == 2 && preIndex.current == 2) {
    navigation.jumpTo('Create Dare');
  }
  preIndex.current = index;
 }

  LogBox.ignoreLogs(["Sending `onAnimatedValueUpdate` with no listeners registered.",]);

  return (
    <>
    <TextInputOuterView>
      <TxtInput 
          value={'Search'}
          width={WINDOW_WIDTH / 3.85 +'%'}
          onChangeText={(text) => setTitle(text)}
          placeholder={PLACEHOLDER_DARE_TITLE}
          placeholderTextColor={'rgba(255, 255, 255, 1)'}
          // style={{padding: '2% 2% 2% 0%'}}
      />
    </TextInputOuterView>
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      onSwipeEnd={() => Platform.OS === 'ios' ? handleSwipe(index) : null}
      initialLayout={{ width: layout.width }}
    />
    </>
  );
};

const TextInputOuterView = styled.View`
    padding: 5px 15px 0px 15px;
    background-color: #290C54;
`;