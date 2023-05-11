import { useTheme } from '@react-navigation/native';
import React from 'react';
import {Text, View, useWindowDimensions, LogBox} from 'react-native';
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

export default () => {
  const layout = useWindowDimensions();
  const { colors } = useTheme();
  
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Talent', param: colors },
    { key: 'second', title: 'Skills' },
    { key: 'third', title: 'Tags' },
  ]);

  LogBox.ignoreLogs(["Sending `onAnimatedValueUpdate` with no listeners registered.",]);

  console.log("index ", index);
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
      // swipeEnabled={index == 0 || 2 ? false : true}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
    </>
  );
};

const TextInputOuterView = styled.View`
    padding: 5px 15px 0px 15px;
    background-color: #290C54;
`;