import styled from 'styled-components/native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';
import { FlatList } from 'react-native';
import { TransactionCardProps } from '../../components/TransactionCard';

export const Container = styled.View`
    flex: 1;
    
   
    background-color: ${({theme}) => theme.colors.background};


`;

export const Header = styled.View`
    width:100%;
    height: ${RFPercentage(42)}px;
      
    background-color: ${({theme})=> theme.colors.primary};

    justify-content: center;
    align-items: flex-start;
    flex-direction: row;
`;
export const UserWrapper = styled.View `
    width: 100%;
    padding: 0 24px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;
export const UserInfo = styled.View`
    flex-direction: row;
    align-items: center;
`;
export const Photo = styled.Image`
    width: ${RFValue(48)}px;
    height: ${RFValue(48)}px;
    border-radius: 10px;
`;
export const User = styled.View`
    margin-left: ${RFValue(15)}px;

`;
export const UserGreeting = styled.Text`
    color: ${({theme})=> theme.colors.shape};
    font-size: ${RFValue(25)}px;
    
`;
export const UserName = styled.Text`
    color: ${({theme})=> theme.colors.shape};
    font-size: ${RFValue(25)}px;
    
`;

export const Icon = styled(Feather)`
    color: ${({ theme })=> theme.colors.secondary};
    font-size: ${RFValue(25)}px;
`;

export const HighLightCards = styled.ScrollView.attrs({
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    contentContainerStyle: {paddingHorizontal: 24}
})`
    width: 100%;
    position: absolute;
    margin-top: ${RFPercentage(20)}px;
`;

export const Transactions = styled.View`
    flex: 1%;
    padding: 0 24px;
    margin-top: ${RFPercentage(12)}px;
`;
export const Title = styled.Text`
    font-size: ${RFValue(18)}px;
    color: ${({theme}) => theme.colors.text_dark};
    margin-bottom: 17px;
`;
export const TransactionsList = styled(
    FlatList as new () => FlatList<TransactionCardProps>
).attrs({
    showsVerticalScrollIndicator: false
})`
    
`;

export const LoadContainer = styled.View`
    flex: 1;
    
   
    background-color: ${({theme}) => theme.colors.background};

    justify-content: center;
    align-items: center;
`;
