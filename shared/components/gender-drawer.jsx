import {useEffect, useRef} from 'react';
import styled from '@emotion/native';
import { Animated, SafeAreaView } from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {closeGenderBottomDrawer} from '../redux-ui-state/slices/authenticationSlice';
import {WINDOW_HEIGHT} from '../constants';
import Picker from './picker';

const ANIMATION_DURATION = 500; // 5 sec

const GenderDrawer = (props, { navigation }) => {
  const dispatch = useDispatch();
  const {genderShow} = useSelector(state => state.authentication);
  const {colors} = useTheme();
  const slideAnimation = useRef(new Animated.Value(WINDOW_HEIGHT)).current;

  const toggleDrawer = () => {
    Animated.timing(slideAnimation, {
      toValue: genderShow ? WINDOW_HEIGHT / 1.3 : WINDOW_HEIGHT,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();
  };

  const onCloseIconClick = () => {
    dispatch(closeGenderBottomDrawer());
  };

  useEffect(() => {
    toggleDrawer();
  }, [toggleDrawer, genderShow]);


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
              title={'Gender'} 
              data={[{name: "Male", code: "male", id: 0}, {name: "Female", code: "female", id: 1}]}
              onCloseIconClick={onCloseIconClick}
              store_key={'SelectedGender'}
          />
        </Body>
      </SafeAreaView>
    </Animated.View>
  );
};

export default GenderDrawer;

const Body = styled.View`
  height: 100%;
`;

const ClosedContainer = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
  padding: 5px;
`;

const Title = styled.View`
`;

const TitleTxt = styled.Text`
  color: white;
  font-size: 16px;
`;