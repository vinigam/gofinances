import React, {useState, useEffect} from 'react';
import {
    Modal, 
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native';
import uuid from 'react-native-uuid';
import { Input } from '../../components/Forms/Input';
import { Button } from '../../components/Forms/Button';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';
import { CategorySelect } from '../CategorySelect';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionTypes,
    Error
} from './styles';



export function Register(){ 

    const dataKey = '@gofinances:transactions';

    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [name_error, setName_error] = useState(false)
    const [price, setPrice] = useState('');
    const [price_error, setPrice_error] = useState(false)
    const [error, setError] = useState<Boolean[]>([]);
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryMOdalOPen] = useState(false);

    const [category, setCategory] = useState({
        key:'category',
        name: 'Categoria',
    });

    async function handleSubmit(){
       
        if(name_error){

            if(price_error){

                if(!transactionType){
                    return Alert.alert('selecione uma transação')
                    

                    
                }else{
                    if(category.key === 'category'){

                        return Alert.alert('Selecione uma categoria')
       
                    }
                    const newTransaction = {
                        id: String(uuid.v4()),
                        name:name,
                        amount: price,
                        type: transactionType,
                        category: category.key,
                        date: new Date()
                    }
                    try{
                        const data = await AsyncStorage.getItem(dataKey);
                        const currentData = data ? JSON.parse(data) : [];
                        const dataFormatted = [
                            ...currentData,
                            newTransaction

                        ]
                        await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted)) 
                        
                        setName('');
                        setPrice('')
                        setTransactionType('');
                        setCategory({
                            key:'category',
                            name: 'Categoria',
                        })

                       navigation.navigate('Listagem');

                    }catch(error){
                     
                        Alert.alert('Não foi possível salvar');
                    }
                }
            }
                
        }
        
    
    
    }
        
        

        
    
    function handleName(text: string){
        if (text.length === 0){
            setName_error(false)
        }else{
            setName_error(true)
        }
        setName(text)
    }
    function handlePrice(text: string){
        if (text.length === 0){
            setPrice_error(false)
        }else{
            setPrice_error(true)
        }
        setPrice(text)
    }
    function handleTransactionTypeSelect(type: 'positive' | 'negative'){
        setTransactionType(type);
    }
    function handleCloseSelectCategoryModal(){
        setCategoryMOdalOPen(false);
    }
    function handleOpenSelectCategoryModal(){
        setCategoryMOdalOPen(true);
    }

    useEffect(()=>{
        async function loadData(){
                const data = await AsyncStorage.getItem(dataKey);
             
        }
        loadData()
        
       /*async function removeAll(){
           await AsyncStorage.removeItem(dataKey)
       }
       removeAll()
       */
    }, []);
    return(
     
    <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
        <Container>
                <Header>
                    <Title>Cadastro</Title>
                </Header>
            <Form>
                <Fields>
                    <Input 
                        placeholder='Nome'
                        onChangeText={text => handleName(text)}
                        autoCapitalize = "sentences"
                        autoCorrect = {false}
                        
                       
                    />
                    {!name_error&& <Error>{'Informe um nome'}</Error>}
                    <Input
                        placeholder='Preço'
                        onChangeText={text => handlePrice(text)}
                        keyboardType = "numeric"
                    />
                    {!price_error && <Error>{'Informe um valor'}</Error>}
                    <TransactionTypes>

                            <TransactionTypeButton
                                type  = 'positive'
                                title = "income"
                                onPress = {() => handleTransactionTypeSelect('positive')}
                                isActive= {transactionType === 'positive'}
                            />

                            <TransactionTypeButton
                                type  = 'negative'
                                title = "outcome"
                                onPress = {() => handleTransactionTypeSelect('negative')}
                                isActive = {transactionType === 'negative'}
                            />
                        
                    </TransactionTypes>

                    {error[2] && <Error>{'Informe uma transação'}</Error>}

                    <CategorySelectButton 
                        title= {category.name}
                        onPress = {handleOpenSelectCategoryModal}
                    />

                    {error[3] && <Error>{'Informe uma categoria'}</Error>}
                </Fields>
                <Button 
                    title='Enviar'
                    onPress = {handleSubmit}
                />
                </Form>
                <Modal visible = {categoryModalOpen}>
                    <CategorySelect
                        category = {category}
                        setCategory= {setCategory}
                        closeSelectCategory = {handleCloseSelectCategoryModal}
                    />
                </Modal>
        </Container>
    </TouchableWithoutFeedback>
            
    )
}