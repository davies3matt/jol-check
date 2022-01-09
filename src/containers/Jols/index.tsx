import { Box, Button, Icon, VStack } from 'native-base';
import React from 'react';
import SlideRightView from '../../components/SlideRightView';
import { viewStyles } from '../../theme/styles';
import AntDesign from '@expo/vector-icons/AntDesign';
/** GraphQL */
import { useListJolsQuery } from '../../generated/graphql';

interface Props {
    navigation: any,
}
const Jols: React.FC<Props> = ({ navigation }) => {

    const { data, loading, refetch } = useListJolsQuery({
        onError: err => console.log(err),
    })

    const [jols, setJols] = React.useState<any>([]);

    React.useEffect(() => {
        if (data && data.listJols && data.listJols.items) {
            setJols(data.listJols.items)
        }
    }, [data]);

    return (
        <SlideRightView styles={viewStyles}>
            <VStack>
            <Button 
                style={{margin: 20, marginBottom: 0, alignSelf: 'flex-end'}} 
                endIcon={<Icon as={AntDesign} name='pluscircleo' size="sm" />}
                size='lg' 
                variant='ghost'
                onPress={() => navigation.navigate('NewJol')}
            >New Jol</Button>
            {jols && jols.map(jol => {
                return (
                    <Box
                    key={jol.id}
                style={{margin: 15}}
                bg={{
                    linearGradient: {
                    colors: ['lightBlue.300', 'violet.800'],
                    start: [0, 0],
                    end: [1, 0],
                    },
                }}
                p="12"
                rounded="xl"
                _text={{
                    fontSize: 'md',
                    fontWeight: 'medium',
                    color: 'warmGray.50',
                    textAlign: 'center',
                }}
                >
                {jol.name}
                </Box>
                )
            })}
            </VStack>
        </SlideRightView>
    )
}

export default Jols;