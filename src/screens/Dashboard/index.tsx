import React, { useCallback, useEffect, useState } from 'react';

import { RFValue } from 'react-native-responsive-fontsize';
import { useFocusEffect } from '@react-navigation/native';
import { HighLightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps} from '../../components/TransactionCard';
import { useTheme } from 'styled-components';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    Container,
    Header,
    UserWrapper,
    Icon,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    HighLightCards,
    Transactions,
    Title,
    TransactionsList,
    LoadContainer
    
} from './styles';
import { LastTransaction } from '../../components/HighlightCard/styles';


interface HighLightProps{
    amount:string
    lastTransaction: string
}
interface HighlightData{
    entries: HighLightProps,
    expensives: HighLightProps,
    total: HighLightProps
}

export function Dashboard(){
    const theme = useTheme()
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState<TransactionCardProps[]>([]);
    const [highlightData, setHighlightData] = useState<HighlightData>({})


    async function loadTransaction (){
        const dataKey = '@gofinances:transactions';
        const response = await AsyncStorage.getItem(dataKey)
    
        const transactions = response? JSON.parse(response) : [];

        let entriesTotal = 0;
        let expensiveTotal = 0;

        const transactionsFormatted :TransactionCardProps[]= transactions.map((item: TransactionCardProps) =>{

            if(item.type === 'positive'){
                entriesTotal+= Number(item.amount);
            }else{
                expensiveTotal += Number(item.amount);
            }

            const amount = Number(item.amount).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})

           
            const date = Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit'
            }).format(new Date(item.date))
            return {
                id: item.id,
                name: item.name,
                amount: item.amount,
                type: item.type,
                category: item.category,
                date: date
            }
           

        })
        const total = entriesTotal - expensiveTotal
        
        function getLastTransaction(type: 'positive' | 'negative'){

            const lastTransactionEntries = new Date(Math.max.apply(Math, transactions.filter((transaction: TransactionCardProps) => transaction.type === type).map
            ((transaction: TransactionCardProps) => new Date(transaction.date))))

           return `${lastTransactionEntries.getDate()} de ${lastTransactionEntries.toLocaleDateString('pt-BR', {
               month:'long'
           })}`
        }

        const lastTransactionEntries = getLastTransaction('negative')
        const lastTransactionExpensives = getLastTransaction('positive')
        const totalInterval = `01 a ${lastTransactionExpensives}`

        

        setHighlightData({
            entries:{
                amount: entriesTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),

                lastTransaction: `Ultima entrada dia ${lastTransactionEntries}`
            },
            expensives: {
                amount: expensiveTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: `Ultima entrada dia ${lastTransactionExpensives}`
            },
            total: {
                amount: total.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: totalInterval
            }
        })

        setData(transactionsFormatted)
        setIsLoading(false)
    }
    
    useEffect(() => { 
        loadTransaction();
    }, [])
    
    useFocusEffect(useCallback(() =>{
        loadTransaction()
    }, []))

    return( 
        
        <Container>
            { isLoading?  
                <LoadContainer>
                    <ActivityIndicator color = {theme.colors.primary} size = "large"/>
                </LoadContainer>:
            <>
            <Header>
                <UserWrapper>
                    <UserInfo>
                    <Photo source = {{ uri :'https://github.com/vinigam.png'}}/>
                    <User>
                        <UserGreeting> Olá,</UserGreeting>
                        <UserName>Irineu</UserName>
                    </User>
                    
                    </UserInfo>
                    <Icon name ='power' size = {RFValue(42)}/>
                
                </UserWrapper>
               
            </Header>
            <HighLightCards>
                <HighLightCard
                type='positive'
                title="Entradas" 
                amount={highlightData.entries.amount}
                lastTransaction= {highlightData.entries.lastTransaction}
                />
                <HighLightCard
                type = 'negative'
                title="Saídas" 
                amount={highlightData.expensives.amount}
                lastTransaction={highlightData.expensives.lastTransaction}
                /><HighLightCard
                type = 'total'
                title="Total" 
                amount={highlightData.total.amount}
                lastTransaction={highlightData.total.lastTransaction}
                />
            </HighLightCards>

            <Transactions>
                <Title>Listagem</Title>
                
                <TransactionsList
                    data = {data}
                    
                    renderItem= {({item})=><TransactionCard data = {item}/>}
                    keyExtractor = {(item:TransactionCardProps) => item.id}
                   
               
                />
            </Transactions>
            </>
        }
        </Container>
    )
}
