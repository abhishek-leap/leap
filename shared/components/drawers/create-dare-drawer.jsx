import {useEffect, useRef} from 'react';
import styled from '@emotion/native';
import { Animated, SafeAreaView } from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {WINDOW_HEIGHT} from '../../constants';
import CreateDare from '../createDare';
import { closeCreateDareBottomDrawer } from '../../redux-ui-state/slices/createDareSlice';

const ANIMATION_DURATION = 100; // 5 sec

const CreateDareDrawer = (props, { navigation }) => {
  const dispatch = useDispatch();
  const {show} = useSelector(state => state.createDare);
  const {colors} = useTheme();
  const slideAnimation = useRef(new Animated.Value(WINDOW_HEIGHT)).current;

  const toggleDrawer = () => {
    Animated.timing(slideAnimation, {
      toValue: show ? 0 : WINDOW_HEIGHT,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();
  };

  const onCloseIconClick = () => {
    dispatch(closeCreateDareBottomDrawer());
  };

  useEffect(() => {
    toggleDrawer();
  }, [toggleDrawer, show]);


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
           <CreateDare 
            onCloseIconClick={onCloseIconClick}
           />
        </Body>
      </SafeAreaView>
    </Animated.View>
  );
};

export default CreateDareDrawer;

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