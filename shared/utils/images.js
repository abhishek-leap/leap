import Male from '../images/male.svg';
import Female from '../images/female.svg';
import styled from '@emotion/native';
import {useTheme} from '@react-navigation/native';

export const MailIcon = () => {
    const {colors} = useTheme();
    return <MaleIcon color={colors.PLAYLEAP_WHITE}/>
}

export const FemailIcon = () => {
    const {colors} = useTheme();
    return <FemaleIcon color={colors.PLAYLEAP_WHITE}/>
}

const MaleIcon = styled(Male)`
    margin: 10px 0 10px 10px;
`;

const FemaleIcon = styled(Female)`
    margin: 10px 0 10px 10px;
`;