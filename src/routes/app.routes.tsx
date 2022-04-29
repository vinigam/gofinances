import React from 'react';
import { Platform } from 'react-native';
import {useTheme} from 'styled-components';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const {Navigator, Screen} = createBottomTabNavigator();

import { Dashboard } from '../screens/Dashboard';
import { Register } from '../screens/Register';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Resumo } from '../screens/Resumo';
export function AppRoutes(){
    const theme = useTheme();
    return (
        <Navigator
            screenOptions={{
                headerShown: false, /*remover cabeçalho */
                tabBarActiveTintColor: theme.colors.secondary, /* cor do botao selecionado */
                tabBarInactiveTintColor: theme.colors.text,/* cor dos botoes não selecionados */
                tabBarLabelPosition: 'beside-icon',
                tabBarStyle: {
                    height: 88,
                    paddingVertical: Platform.OS === 'ios'? 20 : 0,
                }

            }}
        >
            <Screen
                name = "Listagem"
                component = {Dashboard}
                options= {{
                    tabBarIcon: (({size, color}) => 
                    <MaterialIcons
                        name = "format-list-bulleted"
                        size = {size}
                        color = {color}
                    />
                    ),
                }}
            />
            <Screen
                name = "Cadastrar"
                component = {Register}
                options= {{
                    tabBarIcon: (({size, color}) => 
                    <MaterialIcons
                        name = "attach-money"
                        size = {size}
                        color = {color}
                    />
                    ),
                }}
            />
            <Screen
                name = "Resumo"
                component = {Resumo}
                options= {{
                    tabBarIcon: (({size, color}) => 
                    <MaterialIcons
                        name = "pie-chart"
                        size = {size}
                        color = {color}
                    />
                    ),
                }}
            />


        </Navigator>
    )
}