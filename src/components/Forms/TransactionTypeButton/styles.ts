import styled, {css} from "styled-components/native";
import { TouchableOpacity } from "react-native";

import Feather from 'react-native-vector-icons/Feather';
import { RFValue } from "react-native-responsive-fontsize";
import theme from "../../../global/styles/theme";

interface IconProps{
    type: 'positive' | 'negative';
}
interface ContainerProps{
    isActive: boolean;
    type: 'positive' | 'negative';
}
export const Container = styled(TouchableOpacity)<ContainerProps>`
    width: 48%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-width: ${({isActive})=> isActive ? 0: 1.5}px;
    border-style: solid ;
    border-color: ${({theme})=> theme.colors.text};
    border-radius: 5px;

    padding: 16px;

    ${({isActive, type})=> isActive && type === 'negative' && css `
        background-color: ${({theme})=> theme.colors.attention_light}
    `}
    ${({isActive, type})=> isActive && type === 'positive' && css `
        background-color: ${({theme})=> theme.colors.sucess_light}
    `}
`;

export const Icon = styled(Feather)<IconProps>`
    font-size: ${RFValue(24)}px;
    margin-right: 12px;
    color: ${({theme, type}) => type === 'positive' ? theme.colors.sucess : theme.colors.attention};
  
`; 

export const Title = styled.Text`
    font-size: ${RFValue(22)}px;

`;