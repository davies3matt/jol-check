import { Avatar, Button, Center, FormControl, Heading, Icon, Input, KeyboardAvoidingView, ScrollView, Stack, TextArea } from 'native-base';
import React from 'react';
import SlideRightView from '../../components/SlideRightView';
import { viewStyles } from '../../theme/styles';
import { JolType } from '../../generated/graphql';
import { formatEnums } from '../../utils/helpers';
import Feather from '@expo/vector-icons/Feather';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
/** GraphQL */
import { useCreateJolMutation } from '../../generated/graphql';
import DismissKeyboard from '../../components/DismissKeyboard';
import { TouchableWithoutFeedback, View, Keyboard } from 'react-native';
import { useUserContext } from '../../context/UserContext';

interface Props {
    navigation: any
}
const NewJol: React.FC<Props> = ({ navigation }) => {

    const { refetchJols } = useUserContext();
    const [createJol, {loading}] = useCreateJolMutation({
        onError: (error) => console.log(error),
        onCompleted: () => {
            refetchJols();
            navigation.navigate('Jols');
        }
    })

    interface JolSubmitValues {
        name: string;
        description: string;
        jolTypes: JolType[];
    }
    const jolTypes = Object.values(JolType);
    const initialValues = {
        name: 'Party on Long',
        description: `First Friday of the month 📅  \nLet's get lit! 🔥 `,
        jolTypes: [JolType.GoingOut]
    }

    const [values, setValues] = React.useState<JolSubmitValues>({
        name: initialValues.name,
        description: initialValues.description,
        jolTypes: initialValues.jolTypes
    });

    const handleSubmitJol = async (values: JolSubmitValues) => {
        await createJol({
            variables: {
                input: {
                    name: values.name,
                    type: values.jolTypes,
                    description: values.description
                }
            }
        })
    }

    return (
        <SlideRightView style={viewStyles.container}>
            <ScrollView width={'100%'} contentContainerStyle={viewStyles.container}>
            <TouchableWithoutFeedback
                onPress={() => Keyboard.dismiss()}
            >
            <KeyboardAvoidingView 
            behavior='padding'
            style={viewStyles.container}
            width={'100%'}
            >
            <Stack
                space={4}
                w={{
                    base: "75%",
                    md: "25%",
                }}
            >
            <Center>
                <Avatar
                    size={200}
                    bg="cyan.100"
                    source={require('../../../assets/Images/party-group.png')}
                >
                </Avatar>
                <MaterialCommunityIcons style={{position: 'absolute', bottom: 0, right: 75}} name="camera-plus-outline" size={30} color="black" />
            </Center>
            <FormControl>
            <FormControl.Label><Heading style={{margin: 0}} size='sm'>Name:</Heading></FormControl.Label>
            <Input 
                variant="outline"
                size='2xl'
                value={values.name}
                onPressIn={() => values.name === initialValues.name ? setValues({
                    ...values,
                    name: ''
                }) : null}
                onChangeText={text => setValues({
                    ...values,
                    name: text
                })}
                style={{
                    fontStyle: values.name === initialValues.name ? 'italic' : 'normal',
                    color: values.name === initialValues.name ? '#a5a5a5' : 'black'
                }}
            />
            </FormControl>
            <FormControl>
            <FormControl.Label><Heading style={{margin: 0}} size='sm'>Type:</Heading></FormControl.Label>
                    {jolTypes.map((type, index) => {
                        if (index % 2 === 0) {
                            return <Button.Group
                                style={{margin: 5}}
                                key={index}
                            >
                                {jolTypes[index] &&  <Button
                                    width={100}
                                    onPress={() => {
                                            if(!values.jolTypes.includes(jolTypes[index])) {
                                                let newList = values.jolTypes;
                                                newList.push(jolTypes[index])  
                                                setValues({
                                                    ...values,
                                                    jolTypes: newList
                                                });
                                            } else {
                                                setValues({
                                                    ...values,
                                                    jolTypes: values.jolTypes.filter(type => type !== jolTypes[index])
                                                })
                                            }
                                    }}
                                    key={index}
                                    variant={values.jolTypes.includes(jolTypes[index]) ? 'solid' : 'outline'}
                                    rightIcon={<Icon as={Feather} name={values.jolTypes.includes(jolTypes[index]) ? 'check-square'  : 'square'} size="xs" />}
                                >{formatEnums(type)}</Button>}
                                {jolTypes[index + 1] &&  <Button
                                    key={index + 1}
                                    onPress={() => {
                                            if(!values.jolTypes.includes(jolTypes[index + 1])) {
                                                let newList = values.jolTypes;
                                                newList.push(jolTypes[index + 1])  
                                                setValues({
                                                    ...values,
                                                    jolTypes: newList
                                                });
                                            } else {
                                                setValues({
                                                    ...values,
                                                    jolTypes: values.jolTypes.filter(type => type !== jolTypes[index + 1])
                                                })
                                            }
                                    }}
                                    variant={values.jolTypes.includes(jolTypes[index + 1]) ? 'solid' : 'outline'}
                                    rightIcon={<Icon as={Feather} name={values.jolTypes.includes(jolTypes[index + 1]) ? 'check-square'  : 'square'} size="xs" />}
                                >{formatEnums(jolTypes[index + 1])}</Button>}
                            </Button.Group>
                        }
                    })}
            </FormControl>
            <FormControl>
            <FormControl.Label><Heading style={{margin: 0}} size='sm'>Description:</Heading></FormControl.Label>
                <View>
                <TextArea 
                    value={values.description}
                    onPressIn={() => values.description === initialValues.description ? setValues({
                        ...values,
                        description: ''
                    }) : null}
                    onChangeText={text => setValues({
                        ...values,
                        description: text
                    })}
                    style={{
                        fontSize: 16,
                        fontStyle: values.description === initialValues.description ? 'italic' : 'normal',
                        color: values.description === initialValues.description ? '#a5a5a5' : 'black'
                    }}
                />
                </View>
            </FormControl>
            <Button
                variant='subtle'
                isLoading={loading}
                isLoadingText='Submitting'
                onPress={() => handleSubmitJol(values)}
            >Add</Button>
            </Stack>
            </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
            </ScrollView>
        </SlideRightView>
    )
}

export default NewJol;