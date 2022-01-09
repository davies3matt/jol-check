import { Button } from 'native-base';
import React, { useState } from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import { useAuthContext } from '../../context/AuthContext';

interface Props {
    navigation: any;
}
const Home: React.FC<Props> = ({navigation}) => {
    const { signOut } = useAuthContext();
    const [animation , setAnimation] = useState<any>();

    React.useEffect(() => {
        if (animation) {
            animation.play();
        }
     },[animation]);

    return(
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <LottieView
                ref={animation => {
                    setAnimation(animation);
                }}
                style={{
                    width: 400,
                    height: 400,
                }}
                loop={false}
                source={require('../../../assets/animations/home.json')}
            
            />
            <Button style={{width: 100, marginTop: 25}} onPress={() => navigation.navigate('Jols')}>Jols</Button>
            <Button style={{width: 100, marginTop: 10}} onPress={() => navigation.navigate('Profile')}>Profile</Button>
            <Button
                style={{width: 100, marginTop: 10}}
             onPress={() => {
                signOut();
            }}>Sign Out</Button>
        </View>
    )
}

export default Home;