import { SafeAreaView, StyleSheet, TouchableOpacity, View,Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Card, TextInput, Button, Text } from 'react-native-paper'
import { GlobalCss } from '../../Constats/GlobalCss';
import { RFValue } from 'react-native-responsive-fontsize';
import { navigateBack } from '../../Components/NavigationBack';
import { contactValidator, emailValidator } from '../../Helpers/Validations';
import { RegisterApi } from '../../Api/Auth';

export default function Register({ navigation }) {
  const [textInput, setTextInput] = useState([
    { id: 1, label: "Name", value: "", error: "" },
    { id: 2, label: "Contact Number", value: "", error: "" },
    { id: 3, label: "Email", value: "", error: "" },
    { id: 4, label: "Password", value: "", error: "" }
  ]);

  const handleChange = (id, text) => {
    setTextInput(prevState =>
      prevState.map(i => (i.id === id ? { ...i, value: text,error:null } : i))
    );
  };

  const validateAndSubmit =async () => {
    try {
      let isValid = true;
      const updatedInputs = textInput.map((input) => {
        let error = "";

        if (!input.value.trim()) {
          error = `${input.label} is required`;
          isValid = false;
        } else {
          if (input.label === "Contact Number") {
            const res = contactValidator(input.value);
            if (res) {
              error = res;
              isValid = false; // Only set false when validation fails
            }
          }
          if (input.label === "Email") {
            const res = emailValidator(input.value);
            if (res) {
              error = res;
              isValid = false;
            }
          }
          if (input.label === "Password" && input.value.length < 6) {
            error = "Password must be at least 6 characters";
            isValid = false;
          }
        }

        return { ...input, error };
      });

      setTextInput(updatedInputs);

      if (isValid) {
        console.log("✅ Form submitted successfully", updatedInputs);
        await Submit()
      } else {
        console.log("❌ Validation errors", updatedInputs);
      }
    } catch (e) {
      console.error("validateAndSubmit error:", e);
    }
  };

  async function Submit() {
    try {
      const sendingBody = {
        name: textInput[0].value,
        contact: textInput[1].value,
        email: textInput[2].value,
        password: textInput[3].value
      };
  
      const response = await RegisterApi(sendingBody);
  
      // Check if the API returned an error
      if (response.Status === 200) {
        Alert.alert('Success', response.message, [
          { text: 'Okay', onPress: () => navigation.goBack() },
        ]);
      } else {
        // 🚨 Handle API errors (Email/Contact Exists, etc.)
        console.log('RegisterApi error:', response);
        Alert.alert('Error', response.message || 'Something went wrong');
      }
    } catch (err) {
      // Catches network/server errors
      console.log('Register Submit error:', err?.response?.data);
      Alert.alert('Error', err?.response?.data?.message || 'Something went wrong');
    }
  }
  

  useEffect(() => { navigateBack(navigation) }, [navigation])

  return (
    <SafeAreaView style={styles.container}>
      <Card style={GlobalCss.CardStyle}>
        <View >

          <Text style={GlobalCss.HeaderText}>Register</Text>

          {textInput.map(item => (
            <View key={item.id}>
              <TextInput
                mode="outlined"
                style={styles.input}
                label={item.label}
                value={item.value}
                onChangeText={text => handleChange(item.id, text)}
                secureTextEntry={item.label === 'Password'}
              />
              {item.error && <Text style={[GlobalCss.ErrorText, { marginBottom: 5 }]}>{item.error}</Text>}
            </View>
          ))}

          <TouchableOpacity mode="contained" style={[GlobalCss.PrimaryBtn, { marginTop: RFValue(15) }]}
            onPress={validateAndSubmit}>
            <Text style={GlobalCss.BtnText}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </Card>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
  },
});

