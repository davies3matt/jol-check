import { Input, Stack, Center, Heading, Icon, Button, Link, Image } from 'native-base';
import { MaterialIcons } from "@expo/vector-icons"
import React from 'react';
import { Keyboard, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useAuthContext } from '../../context/AuthContext';
import { formatPhoneNumber } from '../../utils/helpers';
import SlideRightView from '../../components/SlideRightView';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

interface Props {
    navigation: any;   
}
const Login: React.FC<Props> = ({navigation}) => {

    const { signIn } = useAuthContext();

    const [loginDetails, setLoginDetails] = React.useState<LoginDetails>({
        username: '',
        password: '',
    });
    const { isAuthenticating } = useAuthContext();


    interface LoginDetails {
        username: string,
        password: string
    }
    const [visibility, setVisibility] = React.useState(false);
    return (
        <SlideRightView style={styles.container}>
            <TouchableWithoutFeedback
                onPress={() => Keyboard.dismiss()}
            >
            <Stack
                space={4}
                w={{
                    base: "75%",
                    md: "25%",
                }}
            >
            <Image 
                width={500}
                height={100}
                source={require('../../../assets/Images/jol-check.png')}
                alt='jol-check-logo'
            />
            <Center>
                <Heading textAlign="center" mb="10">
                Login
                </Heading>
            </Center>
            <Input 
                variant="rounded" 
                size='2xl'
                placeholder="Mobile Number" 
                onChangeText={text => setLoginDetails({
                    ...loginDetails,
                    username: text
                })}
                InputLeftElement={
                    <Icon
                        as={<MaterialIcons name="person" />}
                        size={5}
                        ml="2"
                        color="muted.400"
                    />
                }       
            />
            <Input 
                variant="rounded"
                size='2xl'
                placeholder='Password'
                onChangeText={text => setLoginDetails({
                    ...loginDetails,
                    password: text
                })}
                type={visibility ? '' : 'password'}
                InputLeftElement={
                    <Icon
                        as={<MaterialIcons name="lock" />}
                        size={5}
                        ml="2"
                        color="muted.400"
                    />
                }
                InputRightElement={
                    <Icon
                        style={{marginRight: '5%'}}
                        onPress={() => setVisibility(!visibility)}
                        as={<MaterialIcons name={visibility ? 'visibility'  : 'visibility-off'} />}
                        size={5}
                        ml="2"
                        color="muted.400"
                    />
                }
            />
            <Button
                variant='subtle'
                onPress={async () => {
                    signIn({
                        username: formatPhoneNumber(loginDetails.username),
                        password: loginDetails.password
                    })
                }}
                isLoading={isAuthenticating}
                isLoadingText='Submitting'
            >Login</Button>
            </Stack>
            </TouchableWithoutFeedback>
            <Link onPress={() => navigation.navigate('SignUp')} style={{marginTop: '5%'}}>Create Account</Link>
            <Link onPress={() => navigation.navigate('VerifyCode')} style={{marginTop: '5%'}}>Verify Account</Link>
        </SlideRightView>
    )
}

export default Login;