import { Button } from 'native-base';
import React from 'react';
import { Text, View } from 'react-native';

interface Props {
    navigation: any;
}
const Home: React.FC<Props> = ({navigation}) => {
    return(
        <View>
            <Text>Home Page</Text>
            <Button onPress={() => navigation.navigate('Login')}>Press Me</Button>
        </View>
    )
}

export default Home;