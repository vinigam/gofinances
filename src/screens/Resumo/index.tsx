import React from 'react';
import { HistorytCard } from '../../components/HistoryCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {VictoryPie} from 'victory-native';
import {useTheme} from 'styled-components';
import { useEffect, useState } from 'react';
import { BottomTabView, useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import {addMonths, format} from 'date-fns';
import {ptBR} from 'date-fns/locale';
import { 
    Container,
    Header,
    Title,
    Content,
    ChartContainer,
    MonthSelect,
    MonthSelectButton,
    MonthSelectIcon,
    Month,



} from './styles';
import { categories } from '../../utils/categories';
import { RFValue } from 'react-native-responsive-fontsize';



interface TransactionData {
    id: string;
    type: 'positive' | 'negative';
    name: string;
    amount: string;
    category: string,
    date: string;


}

interface CategoryData {
    key: string,
    name: string,
    total: number,
    totalFormatted: string,
    color: string,
    percent: string
}
export function Resumo(){
    const [isLoading, setIsLoading] = useState(true)
    const theme = useTheme()
    const [selectedDate,setSelectedDate] = useState(new Date())
    const [totalByCategories, setTotalByCategories] = useState <CategoryData[]>([]);
    
    
function handleDateChange(action: 'next' | 'prev'){
    if(action === 'next'){
        setSelectedDate(addMonths(selectedDate, 1))
        
    }else{
        setSelectedDate(addMonths(selectedDate, -1))
       
    }
}

    async function loadData(){
        const dataKey = '@gofinances:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const responseFormatted = response ? JSON.parse(response): [];

        const expensives = responseFormatted.filter((expensive: TransactionData) => 
            expensive.type === 'negative' && 
            new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
            new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
        
        );
  
        const expensiveTotal = expensives.reduce((acumulator: number, expensive:TransactionData)=>{
            return acumulator + Number(expensive.amount);
        }, 0);

        const totalCategory: CategoryData[] = [];

        categories.forEach(category => {
            let categorySum = 0;
            expensives.forEach((expensive: TransactionData) =>{
                if(expensive.category === category.key){
                    categorySum += Number(expensive.amount);
                }
            })
            if(categorySum> 0){
                const total = categorySum.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })

                const percent = `${(categorySum/expensiveTotal* 100).toFixed(0)}%`
             

                totalCategory.push({
                    key: category.key,
                    name: category.name,
                    total: categorySum,
                    totalFormatted: total,
                    color: category.color,
                    percent: percent
                });
            }
            
        });
        
 
        setTotalByCategories(totalCategory)


    }

    useEffect(()=>{

        loadData();
    }, [selectedDate])
    return(
        <Container>
            <Header>
                <Title> Resumo por categoria </Title>
            </Header>
            <Content 
                showsVerticalScrollIndicator= {false}

                contentContainerStyle={{
                    padding: 24,

                    paddingBottom: useBottomTabBarHeight()
                }}
            >

                <MonthSelect>

                    <MonthSelectButton onPress = {() => handleDateChange('prev')}>
                        <MonthSelectIcon name ="chevron-left"/>
                    </MonthSelectButton>
           

                    <Month>{format(selectedDate, 'MMMM, yyyy', {locale: ptBR})}</Month >

                    <MonthSelectButton  onPress = {() => handleDateChange('next') }>
                        <MonthSelectIcon name = "chevron-right"/>
                    </MonthSelectButton>
                 
                </MonthSelect>
                <ChartContainer>
                    
                    <VictoryPie
                        data = {totalByCategories}
                            colorScale= {totalByCategories.map(category =>category.color)}
                            style = {{
                                labels: {
                                    fontSize: RFValue(18),
                                    fontWeight: 'bold',
                                    fill: theme.colors.shape
                                }
                            }}
                            labelRadius={50}
                            x = "percent"
                            y = "total"
                            
                    />
                    

                </ChartContainer>
                    

                {
                   totalByCategories.map((item: CategoryData)=>(
                        <HistorytCard
                            key = {item.key}
                            title = {item.name}
                            amount= {item.totalFormatted}
                            color = {item.color}
                        />
                    ))
                }   
           </Content>
        </Container>
    )
}