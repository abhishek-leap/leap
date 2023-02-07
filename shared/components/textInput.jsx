import styled from '@emotion/native';
import React from 'react';
import {useTheme} from '@react-navigation/native';

const TxtInput = (props) => {
    const {colors} = useTheme();
    const {autoCapitalize, placeholder, secureTextEntry, style, placeholderTextColor, onChangeText,image}  = props

    return(
        <TextInput 
            colors={colors}
            secureTextEntry={secureTextEntry}
            placeholder={placeholder}
            autoCapitalize={autoCapitalize}
            placeholderTextColor={placeholderTextColor}
            onChangeText={onChangeText}
            Image={image}
        />
    );
}
export default TxtInput;

const TextInput = styled.TextInput`
    flex: 1;
    border-radius: 20px;
    padding-vertical: 5px;
    padding-right: 10px;
    background-color: ${props => props.colors.primary};
    color: ${props => props.colors.PLAYLEAP_WHITE};
`;