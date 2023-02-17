import {useEffect, useRef} from 'react';
import styled from '@emotion/native';
import { Animated, SafeAreaView } from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {WINDOW_HEIGHT} from '../../constants';
import Picker from '../common/picker';
import { useHashtagList } from '../../hooks/useMasterAPI';
import { closeHastagBottomDrawer, selectedHashtags } from '../../redux-ui-state/slices/createDareSlice';

const ANIMATION_DURATION = 500; // 5 sec

const HashtagsDrawer = (props, { navigation }) => {
  const dispatch = useDispatch();
  const hashtagList = useHashtagList();
  const {hashtagShow} = useSelector(state => state.createDare);
  const {colors} = useTheme();
  const slideAnimation = useRef(new Animated.Value(WINDOW_HEIGHT)).current;

  const toggleDrawer = () => {
    Animated.timing(slideAnimation, {
      toValue: hashtagShow ? WINDOW_HEIGHT / 4 : WINDOW_HEIGHT,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();
  };

  const onCloseIconClick = () => {
    dispatch(closeHastagBottomDrawer());
  };

  useEffect(() => {
    toggleDrawer();
  }, [toggleDrawer, hashtagShow]);

  useEffect(() => {
    if(hashtagList.data === undefined) {
      hashtagList.mutate();
    }
  }, [hashtagShow])

  const handleItem = (item) => {
    dispatch(selectedHashtags({name: item.name, value: item.name}));
    onCloseIconClick();
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
              title={'Hashtags'} 
              data={hashtagList.data}
              onCloseIconClick={onCloseIconClick}
              handleSelectItem={handleItem}
          />
        </Body>
      </SafeAreaView>
    </Animated.View>
  );
};

export default HashtagsDrawer;

const Body = styled.View`
  height: 100%;
`;

const ClosedContainer = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
  padding: 5px;
`;
