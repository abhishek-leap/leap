import React from 'react';
import styled from '@emotion/native';
import {useTheme} from '@react-navigation/native';
import { FlatList } from 'react-native';
import { useDispatch } from "react-redux";

import { selectedGender, selectedCountry } from "../redux-ui-state/slices/authenticationSlice";
import Male from '../images/male.svg';
import Female from '../images/female.svg';
import CloseIcon from '../images/close.svg';

const Picker = ({title, data, onCloseIconClick, store_key}) => {
    const {colors} = useTheme();
    const dispatch = useDispatch();

    const handleSelecteItem = (item) => {
        if(store_key == "SelectedGender") {
            dispatch(selectedGender({name: item.name, value: item.code}));
        } else if (store_key == "SelectedCountry") {
            dispatch(selectedCountry({name: item.name, value: item.code}));
        }
        
        onCloseIconClick();
    }
    const _renderItem = ({item}) => (
        <PickItem onPress={() => handleSelecteItem(item)}>
            {store_key == "SelectedGender" ?
                <GenderItem>
                    {item.id == 0 ?
                    <MaleIcon color={colors.PLAYLEAP_WHITE}/>
                    :
                    <FemaleIcon color={colors.PLAYLEAP_WHITE}/>
                    }
                    <ListItem>{item.name}</ListItem>
                </GenderItem>
                :
                <ListItem>{item.name}</ListItem> 
            }
        </PickItem>
    );

    return (
        <Container>
            <Header>
                <TitleTxt>
                    {title}
                </TitleTxt>
                <ClosedContainer onPress={() => onCloseIconClick()}>
                    <CloseIcon width={25} height={25} />
                </ClosedContainer>
            </Header>
            <HR colors={colors}/>
            <FlatList
                data={data}
                renderItem={(item) => _renderItem(item)}
            />
        </Container>
    );
}

export default Picker;

const Container = styled.View`

`;

const HR = styled.View`
    background-color: ${props => props.colors.PLAYLEAP_PINK};
    height: 1px;
    margin: 0 20px 0 10px;
`;

const Header = styled.View`
    flex-direction: row;
    padding: 10px;
`;

const TitleTxt = styled.Text`
  color: white;
  font-size: 16px;
`;

const ListItem = styled.Text`
    color: white;
    font-size: 14px;
    padding: 10px 0 5px 15px;
`;

const ClosedContainer = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
  margin-top: 10px;
`;

const PickItem = styled.TouchableOpacity`

`;

const MaleIcon = styled(Male)`
    margin: 10px 0 10px 10px;
`;

const FemaleIcon = styled(Female)`
    margin: 10px 0 10px 10px;
`;

const GenderItem = styled.View`
    flex-direction: row;
`;