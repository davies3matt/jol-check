import { Input, Stack, Center, Heading, Icon, Button, Link } from 'native-base';
import { MaterialIcons } from "@expo/vector-icons"
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

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

    const [loginDetails, setLoginDetails] = React.useState({
        username: '',
        password: '',
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
                Login
                </Heading>
            </Center>
            <Input 
                variant="rounded" 
                size='2xl'
                placeholder="Mobile Number" 
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
                onPress={() => navigation.navigate('Home')}
            >Login</Button>
            </Stack>
            <Link onPress={() => navigation.navigate('SignUp')} style={{marginTop: '5%'}}>Create Account</Link>
        </View>
    )
}

export default Login;