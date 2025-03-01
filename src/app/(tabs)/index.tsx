import React, { useState, } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
} from 'react-native';

import storage from '@/storage';
import { STORAGE_KEY, } from '@/constants/Storage';

export default function TabOneScreen() {
  const [input, setInput] = useState("");
  const [text, setText] = useState("");

  const saveTextToStorage = async (text: string) => {
    try {
      await storage.save({
        key: STORAGE_KEY,
        data: { text, },
      });
    } catch (err) {
      console.error(err);
    }
  };
  
  const loadTextFromStorage = async (text: string) => {
    await storage.load({
      key: STORAGE_KEY,
      autoSync: true,
      syncInBackground: false,
    })
      .then(ret => {
        setText(ret.text);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const onSaveButtonPress = async () => {
    await saveTextToStorage(input);
  };

  const onLoadButtonPress = async () => {
    await loadTextFromStorage(input);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.saveView}>
        <Text>Insert text:</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={setInput}
          value={input}
        />
        <Button 
          title="Save"
          onPress={onSaveButtonPress}
        />
      </View>
      <View style={styles.loadView}>
        <Button
          title="Load"
          onPress={onLoadButtonPress}
        />
        {text && <Text>{text}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#000",
    width: 350,
    borderRadius: 2,
  },
  saveView: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 20,
    borderRadius: 10,
  },
  loadView: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 20,
    borderRadius: 10,
  },
});
