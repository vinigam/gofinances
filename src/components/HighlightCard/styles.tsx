import styled,{css} from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';
import theme from '../../global/styles/theme';
import { ProgressViewIOSComponent } from 'react-native';

interface TypeProps {
    type: 'positive' | 'negative' | 'total'
}

export const Container = styled.View<TypeProps>`
    background-color: ${({theme}) => theme.colors.shape};
    ${(props) => props.type === 'total' && css`
        background-color: ${({theme}) => theme.colors.secondary};
    `};
    
    
    width: ${RFValue(300)}px;
    border-radius: 7px;
    padding: 19px 23px;
    padding-bottom: ${RFValue(42)}px;
    margin-right: 16px;

    

`;
export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;
export const Title = styled.Text<TypeProps>`
    font-size: ${RFValue(22)}px;
    color: ${({theme}) => theme.colors.text_dark};
    ${(props) => props.type === 'total' && css`
        color: ${({theme}) => theme.colors.shape};
    `};
    
`;
export const Icon = styled(Feather)<TypeProps>`
    font-size: ${RFValue(40)}px;
    ${(props) => props.type === 'positive' && css`
        color: ${({theme}) => theme.colors.sucess};
    `};
    ${(props) => props.type === 'negative' && css`
        color: ${({theme}) => theme.colors.attention};
    `};
    ${(props) => props.type === 'total' && css`
        color: ${({theme}) => theme.colors.shape};
    `};
`;
export const Footer = styled.View`
    color: ${({theme}) => theme.colors.text_dark};
`;
export const Amount = styled.Text<TypeProps>`
    font-size: ${RFValue(32)}px;
    color: ${({theme}) => theme.colors.text_dark};
    ${(props) => props.type === 'total' && css`
        color: ${({theme}) => theme.colors.shape};
    `};
`;

export const LastTransaction = styled.Text<TypeProps>`
    font-size: ${RFValue(18)}px;
    color: ${({theme}) => theme.colors.text};
    ${(props) => props.type === 'total' && css`
        color: ${({theme}) => theme.colors.shape};
    `};
`;

