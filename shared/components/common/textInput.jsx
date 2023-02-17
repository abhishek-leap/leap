import styled from '@emotion/native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import SearchIcon from '../../images/search-icon.svg';

const TxtInput = (props) => {
    const {colors} = useTheme();
    const { autoCapitalize, 
            placeholder, 
            secureTextEntry, 
            width, 
            placeholderTextColor, 
            onChangeText, 
            image, 
            value,
            style,
            searchIcon,
            bgcolor
    }  = props

    return(
        <TextView colors={colors} bgcolor={bgcolor}>
            {searchIcon && <SearchView><SearchIcon /></SearchView> }
            <Input
                value={value}
                colors={colors}
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                autoCapitalize={autoCapitalize}
                placeholderTextColor={placeholderTextColor}
                onChangeText={onChangeText}
                Image={image}
                currentWidth={width}
                style={style}
                bgcolor={bgcolor}
            />
        </TextView>
    );
}
export default TxtInput;

const TextView = styled.View`
    flex-direction: row;
    width: ${props => props.currentWidth};
    border-width: 1px;
    border-color: ${props => props.colors.PLAYLEAP_DARK_PINK};
    border-radius: 20px;
    background-color: ${props => props.bgcolor};
`;

const SearchView = styled.View`
    padding: 1% 0 0% 3%;
`;

const Input = styled.TextInput`
    width: ${props => props.currentWidth};
    color: ${props => props.colors.PLAYLEAP_WHITE};
    padding: 2% 0 2% 4%;
`;