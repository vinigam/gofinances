import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { 
    Container,
    Icon,
    Title,
    
} from './styles';

const icons = {
    positive: 'arrow-up-circle',
    negative: 'arrow-down-circle'
}
interface Props extends TouchableOpacityProps{
    type: 'positive' | 'negative';
    title: string;
    isActive: boolean;
}


export function TransactionTypeButton({type, title,isActive, ...rest}:Props){
    return(
        <Container 
            {...rest}
            type = {type}
             isActive = {isActive}
        >
            <Icon type = {type} name = {icons[type]}/>
                <Title>
                    {title}
                </Title>
            
            
        </Container>
    )
}