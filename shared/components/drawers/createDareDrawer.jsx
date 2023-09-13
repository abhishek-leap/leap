import {useEffect, useRef} from 'react';
import styled from '@emotion/native';
import {Animated, SafeAreaView} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {WINDOW_HEIGHT} from '../../constants';
import CreateDare from '../createDare';
import {closeCreateDareBottomDrawer} from '../../redux-ui-state/slices/createDareSlice';
import {
  useCompetitorsList,
  useHashtagList,
  useSkillsGroup,
  useSkillsList,
  useSportList,
  useSuggestionList,
} from '../../hooks/useMasterAPI';

const ANIMATION_DURATION = 100; // 5 sec

const CreateDareDrawer = (props, {navigation}) => {
  const dispatch = useDispatch();
  // const {  } = useSportList();
  // const {  } = useHashtagList();
  // const skillsList = useSkillsList();
  // const connectionsList = useCompetitorsList();
  // const followersList = useCompetitorsList();
  // const followingList = useCompetitorsList();
  // const suggestionList = useSuggestionList();
  // const { } = useSkillsGroup()
  const {creatDareshow} = useSelector(state => state.createDare);
  const {colors} = useTheme();
  const slideAnimation = useRef(new Animated.Value(WINDOW_HEIGHT)).current;

  const toggleDrawer = () => {
    Animated.timing(slideAnimation, {
      toValue: creatDareshow ? 0 : WINDOW_HEIGHT,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();
  };

  const onCloseIconClick = () => {
    dispatch(closeCreateDareBottomDrawer());
  };

  useEffect(() => {
    toggleDrawer();
  }, [toggleDrawer, creatDareshow]);

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
          <CreateDare onCloseIconClick={onCloseIconClick} />
        </Body>
      </SafeAreaView>
    </Animated.View>
  );
};

export default CreateDareDrawer;

const Body = styled.View`
  height: 100%;
`;
