import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsconfig from './src/aws-exports';
import { StyleSheet, View } from 'react-native';
/** Graphql */
import { createUser } from './src/graphql/mutations'
import { listUsers } from './src/graphql/queries';

Amplify.configure(awsconfig);

const myUser = { name: 'Matt', email: 'mdldavies@gmail.com' };

const App = () => {
  return (
    <View style={styles.container}>
      <button onClick={async () => {
        await API.graphql(graphqlOperation(createUser, {input: myUser}))
      }}>Click Me</button>
      <button onClick={async () => {
        const data = await API.graphql(graphqlOperation(listUsers));
        console.log(data);
      }}>Me Get!</button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
