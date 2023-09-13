import {useEffect} from 'react';
import styled from '@emotion/native';
import {useTheme} from '@react-navigation/native';
import {FlatList, Text, View, Image} from 'react-native';
import CloseIcon from '../../images/close.svg';
import {handleGoBack} from '../../navigation/navigationService';
import {useInfiniteNotifications} from '../../hooks/useInfiniteFeeds';
import NotificationBase from './components/notification-base';
import {getData} from '../..//utils/helper';
import DefaultAvatar from '../../images/default-avatar/avatar.svg';
import DefaultCover from '../../images/defaultCover.png';

const Notification = ({authStatus}) => {
  const {colors} = useTheme();
  const {status, data, error, isLoading, refetch, fetchNextPage, hasNextPage} =
    useInfiniteNotifications();

  const handleLoadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };
  let userId = getData('user_id');
  const flattenedData = data?.pages.flatMap(page => page.response);
  const ItemSeparator = styled.View`
    height: 1px;
    background-color: #9900d961;
    width: 100%;
  `;
  const renderItem = ({item}) => {
    return (
      <NotificationBase
        read={item.status !== 'new'}
        left={
          <View style={{width: 100, display: 'flex', alignItems: 'center'}}>
            <DefaultAvatar />
          </View>
        }
        middle={
          <NotificationText>
            Man Great news! Someone just liked your post!
          </NotificationText>
        }
        right={
          <Image
            style={{width: 50, height: 74}}
            source={require('../../images/defaultCover.png')}
          />
        }
      />
    );
  };
  return (
    <SafeAreaView colors={colors}>
      <Container colors={colors}>
        <Header>
          <TitleTxt>{'Notifications'}</TitleTxt>

          <ClosedContainer onPress={() => handleGoBack()}>
            <CloseIcon color={colors.PLAYLEAP_WHITE} width={25} height={25} />
          </ClosedContainer>
        </Header>

        <FlatList
          data={flattenedData}
          renderItem={item => renderItem(item)}
          keyExtractor={(item, index) => item.id}
          ItemSeparatorComponent={ItemSeparator}
          onEndReached={handleLoadMore}
        />
      </Container>
    </SafeAreaView>
  );
};

export default Notification;

const SafeAreaView = styled.SafeAreaView`
  background-color: ${props => props.colors.primary};
  height: 100%;
  width: 100%;
`;
const Container = styled.View`
  flex: 1;
  height: 100%;
  width: 100%;
  background-color: ${props => props.colors.primary};
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: center;
  padding: 10px;
  margin: 10px 10px 0 10px;
`;
const TitleTxt = styled.Text`
  color: white;
  font-size: 16px;
  align-content: center;
`;
const ClosedContainer = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
  margin-top: 10px;
`;
const NotificationText = styled.Text`
  font-weight: 400;
  font-size: 14px;
  letter-spacing: 0.214286px;
  line-height: 17px;
  color: rgba(255, 255, 255, 0.6);
  padding-bottom: 8px;
`;
const HR = styled.View`
  height: 1px;
  margin: 4% 4% 1% 4%;
`;
