import { Input, Stack, Center, Heading, Icon, Button, Link } from 'native-base';
import { MaterialIcons } from "@expo/vector-icons"
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Auth } from 'aws-amplify';
import { formatPhoneNumber } from '../../utils/helpers';

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

interface SignUpProps {
    phoneNumber: string,
    email: string,
    password: string
}
const SignUp: React.FC<Props> = ({navigation}) => {

    const handleSignUp = async (values: SignUpProps) => {
        const { phoneNumber, email , password } = values;
        try {
            await Auth.signUp({
                username: formatPhoneNumber(phoneNumber),
                password: password,
                attributes: {
                    email: email.toLowerCase(),

                }
            });
            navigation.navigate('VerifyCode', {username: phoneNumber});
        } catch (err) {
            console.log(err);
        }
    }

    const [userDetails, setUserDetails] = React.useState({
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
    });
    const [visibility, setVisibility] = React.useState(false);
    return (
        <View style={styles.container}>
            <Stack
                space={4}
                w={{
                    base: "75%",
                    md: "25%",
                }}
            >
            <Center>
                <Heading textAlign="center" mb="10">
                Sign Up
                </Heading>
            </Center>
            <Input 
                variant="rounded" 
                size='2xl'
                placeholder="Email" 
                onChangeText={text => {
                    setUserDetails({
                    ...userDetails,
                    email: text
                })}}
                InputLeftElement={
                    <Icon
                        as={<MaterialIcons name="email" />}
                        size={5}
                        ml="2"
                        color="muted.400"
                    />
                }       
            />
            <Input 
                variant="rounded" 
                size='2xl'
                placeholder="Mobile Number" 
                onChangeText={text => {
                    setUserDetails({
                    ...userDetails,
                    phoneNumber: text
                })}}
                InputLeftElement={
                    <Icon
                        as={<MaterialIcons name="phone" />}
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
                onChangeText={text => setUserDetails({
                    ...userDetails,
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
            <Input 
                variant="rounded"
                size='2xl'
                placeholder='Confirm Password'
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
                onPress={() => handleSignUp(userDetails)}
            >Sign Up</Button>
            </Stack>
            <Link onPress={() => navigation.navigate('Login')} style={{marginTop: '5%'}}>Login</Link>
        </View>
    )
}

export default SignUp;