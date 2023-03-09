import React from 'react';
import styled from '@emotion/native';
import {useTheme} from '@react-navigation/native';
import CloseIcon from '../../images/close.svg';
import { PLACEHOLDER_SEARCH, WINDOW_WIDTH } from '../../constants';
import TxtInput from './textInput';
import { useState } from 'react';

const Picker = ({
    hr, 
    placeholderTextColor, 
    sectionList, 
    displayTitleAsAlias, 
    searching, 
    title, 
    data, 
    onCloseIconClick, 
    handleSelectItem, 
    searchValue, 
    handleSearch, 
    radioButton
}) => {
    const {colors} = useTheme();
    const [selectedItem, setSelectedItem] = useState('');

    _handleSelectedItem = (item) => {
        setSelectedItem(item.name);
        handleSelectItem(item);
    }

    const _renderItem = ({item}) => (
        <PickItem sectionList={sectionList} onPress={() => handleSelectItem(item)}>
                
                <Item>
                    {item.image}
                    {sectionList === true ?
                        <ListItem>{item.userInfo ? item.userInfo[0]?.alias.toUpperCase() : item.userId}</ListItem>
                        :
                        <ListItem>{displayTitleAsAlias === true ? item?.alias : item?.name || item.userId}</ListItem>
                    }
                </Item>
        </PickItem>
    );

    const _flatListRenderItem = ({item}) => (
            <PickItem onPress={() => _handleSelectedItem(item)}>
                <Item>
                    {item.image}
                    <ListItem color={item?.color || 'white'}>{displayTitleAsAlias === true ? item?.alias : item?.name || item.userId}</ListItem>
                </Item>
            </PickItem>
        
    );

    const _radioItemRender = ({item}) => (
        <RadioItem onPress={() => _handleSelectedItem(item)}>
            <Item>
                {item.image}
                {radioButton && <RadioButton selected={item?.name} item={item}/> }
                <ListItem>{displayTitleAsAlias === true ? item?.alias : item?.name || item.userId}</ListItem>
            </Item>
        </RadioItem>
    )

    function RadioButton(props) {
        return (
            <RadioButtonView colors={colors}> 
              {
                props.selected == selectedItem ?
                  <RadioButtonSelectedView colors={colors}/>
                  : null
              }
            </RadioButtonView>
        );
      }

    return (
        <Container>
            <Header>
                <TitleTxt>
                    {title}
                </TitleTxt>
                <ClosedContainer onPress={() => onCloseIconClick()}>
                    <CloseIcon color={colors.PLAYLEAP_WHITE} width={25} height={25} />
                </ClosedContainer>
            </Header>
            {hr &&
                <HR colors={colors}/>
            }
            
            {searching === true &&
                <TextInputOuterView>
                    <TxtInput 
                        value={searchValue}
                        width={WINDOW_WIDTH /1.16 +'px'}
                        onChangeText={(text) => handleSearch(text)}
                        placeholder={PLACEHOLDER_SEARCH}
                        placeholderTextColor={placeholderTextColor ? placeholderTextColor : 'rgba(255, 255, 255, 0.6)'}
                        searchIcon={true}
                        bgcolor={'rgba(153,0,217,0.17)'}
                    />
                </TextInputOuterView>
            }
            {sectionList == true ?
               <SectionList
                sections={data}
                keyExtractor={(item, index) => item.id}
                renderItem={(item) => _renderItem(item)}
                renderSectionHeader={({section: {title, data}}) => (
                    data.length > 0 && <SubTitleTxt>{title}</SubTitleTxt>
                )}
                />
                :
                radioButton == true ?
                    <FlatList
                        data={data}
                        renderItem={(item) => _radioItemRender(item)}
                        keyExtractor={(item, index) => item.id}
                    />
                    :
                    <FlatList
                        data={data}
                        renderItem={(item) => _flatListRenderItem(item)}
                        keyExtractor={(item, index) => item.id}
                    />
                    
            }
        </Container>
    );
}

export default Picker;

const Container = styled.View`
`;

const HR = styled.View`
    background-color: ${props => props.colors.PLAYLEAP_PINK};
    height: 1px;
    margin: 4% 4% 1% 4%;
`;

const Header = styled.View`
    flex-direction: row;
    padding: 10px;
    margin: 10px 10px 0 10px;
`;

const TitleTxt = styled.Text`
  color: white;
  font-size: 16px;
`;

const SubTitleTxt = styled.Text`
  color: white;
  font-size: 16px;
  margin: 5% 0 0 5%;
`;

const ListItem = styled.Text`
    color: ${props => props.color}; //white;
    font-size: 14px;
    padding: 0px 0 5px 15px;
`;

const ClosedContainer = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
  margin-top: 10px;
`;

const PickItem = styled.TouchableOpacity`
    padding-top: 3%;
    padding-left: 3%;
    margin-left: ${props => props.sectionList ? '10%' : '0'};
`;

const RadioItem = styled.TouchableOpacity`
    padding-top: 3%;
    padding-left: 3%;
    margin-left: ${props => props.sectionList ? '10%' : '0'};
`;

const Item = styled.View`
    flex-direction: row;
    padding-top: 10px;
`;

const SectionList = styled.SectionList`

`

const FlatList = styled.FlatList`
`;

const TextInputOuterView = styled.View`
    margin: 10% 7% 2% 7%;
`;

const RadioButtonView = styled.View`
    height: 12px;
    width: 12px;
    border-radius: 12px;
    border-width: 2px;
    border-color: ${props => props.colors.PLAYLEAP_WHITE};
    align-items: center;
    justify-content: center;
    background-color: ${props => props.colors.PLAYLEAP_WHITE};
    padding: 6px;
`;

const RadioButtonSelectedView = styled.View`
    height: 12px;
    width: 12px;
    border-radius: 6px;
    margin: 3px;
    border-color: ${props => props.colors.PLAYLEAP_DARK_BLUE};
    background-color: ${props => props.colors.PLAYLEAP_DARK_BLUE};
`;