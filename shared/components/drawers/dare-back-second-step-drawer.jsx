import {useEffect, useRef} from 'react';
import styled from '@emotion/native';
import { Animated, SafeAreaView } from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {WINDOW_HEIGHT} from '../../constants';
import { closeDareBackSecondStepBottomDrawer } from '../../redux-ui-state/slices/dareBackSlice';
import DareBackSecondStep from '../dareBack/components/dareBackSecondStep';

const ANIMATION_DURATION = 100; // 5 sec

const DareBackSecondStepDrawer = (props, { navigation }) => {
  const dispatch = useDispatch();
  const {secondStepShow} = useSelector(state => state.dareBack);
  const {colors} = useTheme();
  const slideAnimation = useRef(new Animated.Value(WINDOW_HEIGHT)).current;

  const toggleDrawer = () => {
    Animated.timing(slideAnimation, {
      toValue: secondStepShow ? 0 : WINDOW_HEIGHT,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();
  };

  const onCloseIconClick = () => {
    console.log("back clicked");
    dispatch(closeDareBackSecondStepBottomDrawer());
  };

  useEffect(() => {
    toggleDrawer();
  }, [toggleDrawer, secondStepShow]);


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
          <DareBackSecondStep 
            onCloseIconClick={onCloseIconClick}
           />
        </Body>
      </SafeAreaView>
    </Animated.View>
  );
};

export default DareBackSecondStepDrawer;

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