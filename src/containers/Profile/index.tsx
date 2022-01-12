import React, { useState } from 'react';
import LottieView from 'lottie-react-native';
import { Button } from 'native-base';
import SlideRightView from '../../components/SlideRightView';
import { View } from 'react-native';

interface Props {
    navigation: any;
}
const Profile: React.FC<Props> = ({navigation}) => {

    const [animation, setAnimation] = useState<any>();

    React.useEffect(() => {
        if(animation) {
            animation.play();
        }
    },[animation])
    return (
        <SlideRightView style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <LottieView
                ref={animation => setAnimation(animation)}
                style={{
                    width: 400,
                    height: 400,
                }}
                source={require('../../../assets/animations/bird-flying.json')}
            />
            <Button onPress={() => navigation.navigate('Home')}>Home</Button>
        </SlideRightView>
    )
}

export default Profile;