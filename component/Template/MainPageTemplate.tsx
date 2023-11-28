import React, {ReactNode} from 'react';
import Footer from "../Footer";
import {ScrollView, Text} from 'react-native';

type Props = { children: React.ReactNode };

const MainPageTemplate: React.FC<Props> = ({children}) => {
    return(
        <ScrollView>
            { children }
            <Footer/>
            <Text>dfdas</Text>
        </ScrollView>
    )
}

export default MainPageTemplate;