import {useEffect, useRef} from 'react';
import styled from '@emotion/native';
import { Animated, SafeAreaView } from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {WINDOW_HEIGHT} from '../../constants';
import DareBack from '../dareBack';
import { closeDareBackBottomDrawer } from '../../redux-ui-state/slices/dareBackSlice';

const ANIMATION_DURATION = 500; // 5 sec

const DareBackDrawer = (props, { navigation }) => {
  const dispatch = useDispatch();
  const {darBackshow, selectedPostItem} = useSelector(state => state.dareBack);
  const {colors} = useTheme();
  const slideAnimation = useRef(new Animated.Value(WINDOW_HEIGHT)).current;

  const toggleDrawer = () => {
    Animated.timing(slideAnimation, {
      toValue: darBackshow ? WINDOW_HEIGHT / 6 : WINDOW_HEIGHT,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();
  };

  const onCloseIconClick = () => {
    dispatch(closeDareBackBottomDrawer());
  };

  useEffect(() => {
    toggleDrawer();
  }, [toggleDrawer, darBackshow]);


  return (
    <TopView
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
          {show &&
           <DareBack 
            selectedPostItem={selectedPostItem}
            onCloseIconClick={onCloseIconClick}
           />
          }
        </Body>
      </SafeAreaView>
    </TopView>
  );
};

export default DareBackDrawer;

const Body = styled.View`
  height: 100%;
`;

const TopView = styled(Animated.View)`
  border-radius: 25px 25px 0 0;
`