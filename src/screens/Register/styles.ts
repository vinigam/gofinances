import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';


export const Container = styled.View`
    flex: 1;
    background-color: ${({theme})=> theme.colors.background};
`;

export const Header = styled.View`
    background-color: ${({theme})=> theme.colors.primary};
    width: 100%;
    height: ${RFValue(113)}px;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 19px;
`; 
export const Title = styled.Text`
    color: ${({theme})=> theme.colors.shape};
    font-size: ${RFValue(20)}px;
`;

export const Form = styled.View`
    flex: 1;
    justify-content: space-between;
    padding: 24px;
    width: 100%;
`;

export const Fields = styled.View`

`;

export const TransactionTypes= styled.View`
    
    flex-direction: row;

    justify-content: space-between;

    margin-top: 8px;
    margin-bottom: 16px;
`;

export const Error = styled.Text`
    font-size: ${RFValue(16)}px;
    width: 100%;
    color: ${({theme}) => theme.colors.attention
}
`