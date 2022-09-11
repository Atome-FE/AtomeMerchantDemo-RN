/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { useState } from 'react';
import type { Node } from 'react';
import { Button } from 'react-native';
import { isAtomeAppInstalled } from 'react-native-atome-paylater';
import { setPaymentUrl } from 'react-native-atome-paylater';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Section = ({ children, title }): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [result, setResult] = useState('No');

  const init = async () => {
    const installed = await isAtomeAppInstalled();
    console.log(installed);
    setResult(actualResult => installed ? 'Yes' : 'No')
  };


  const demoHandlePaymantUrl = () => {
    fetch('https://demo-app-test.apaylater.net/api/orders', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: 1234,
        currency: 'SGD',
        paymentResultUrl: 'atomedemo://appdemo.apaylater.net'
      })
    }).then(response => {
      if (response.ok) return response.json();
      throw response;
    })
      .then(json => {
        setPaymentUrl(json.data.appPaymentUrl);
      }).catch(err => {
        console.error(err);
      });
  }

  React.useEffect(() => {
    init();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Is Atome App Installed? {result}</Text>
      <Text></Text>
      <Button
        onPress={demoHandlePaymantUrl}
        title="Open Atome with payment URL"
        color="#841584"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default App;
