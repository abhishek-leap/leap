import { useEffect } from 'react';
import styled from '@emotion/native';
import {useTheme} from '@react-navigation/native';
import { FlatList } from 'react-native';

import CloseIcon from '../../images/close.svg';
import { handleGoBack } from '../../navigation/navigationService';
import { useInfiniteNotifications } from '../../hooks/useInfiniteFeeds';
// import SingleNotification from './components/singleNotification';

const Notification = ({authStatus}) => {
  const {colors} = useTheme();
  const { status, data, error, isLoading, refetch, fetchNextPage } = useInfiniteNotifications();

  // useEffect(() => {
  //   console.log("called here ", data);
  // }, []);
  
  const _renderItem = ({item}) => {
    // let message = '';
    // const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
    // const today  = new Date(item?.createdAt);
    // try {
    //     const bodyObj = JSON.parse(item?.body);
    //     const elements = bodyObj.blocks;
    //     message = elements[0]?.text;
    // } catch {
    //     message = item?.body;
    // }
    console.log("called here ", data.length);
    return (
            <SingleRow>
              {item.body}
            </SingleRow>
        //  <SingleNotification
        //     author={item?.author}
        //     alias={item?.author?.alias}
        //     role={item?.role}
        //     message={message}
        //     dateTime={today.toLocaleDateString("en-US", options)}
        //     feedItem={feedItem}
        //     item={items}
        //     handleSendButton={handleReplyButton}
        //     onPressProfile={onPressProfile}
        //     fromReplyListing={true}
        // />
    )};

  return (
    <SafeAreaView colors={colors}>
        <Container colors={colors}>
        <Header>
            <TitleTxt>
                {'Notifications'}
            </TitleTxt>
            <ClosedContainer onPress={() => handleGoBack()}>
                <CloseIcon color={colors.PLAYLEAP_WHITE} width={25} height={25} />
            </ClosedContainer>
        </Header>
        <FlatList
            data={data}
            renderItem={(item) => _renderItem(item)}
            keyExtractor={(item, index) => item.id}
            ItemSeparatorComponent={<HR colors={colors}/>}
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

const SingleRow = styled.Text`
`;

const HR = styled.View`
    background-color: ${props => props.colors.PLAYLEAP_PINK};
    height: 1px;
    margin: 4% 4% 1% 4%;
`;