import React from 'react';
import { ThemeProvider} from 'styled-components';
import { NavigationContainer } from '@react-navigation/native';
import theme from './src/global/styles/theme';

/*import { Dashboard} from './src/screens/Dashboard';*/
import { Register } from './src/screens/Register';
/*import { CategorySelect } from './src/screens/CategorySelect';*/
import {AppRoutes} from './src/routes/app.routes';
export default function App(){
  return (
      <ThemeProvider theme ={theme}>

        <NavigationContainer>
          <AppRoutes/>
        </NavigationContainer>
            
      </ThemeProvider>

  )
    
}

