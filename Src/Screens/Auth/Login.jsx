import { Alert, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Card, TextInput, Button, Text } from 'react-native-paper'
import { GlobalCss } from '../../Constats/GlobalCss';
import { RFValue } from 'react-native-responsive-fontsize';
import { contactValidator } from '../../Helpers/Validations';
import { LoginApi } from '../../Api/Auth';
import { useDispatch } from 'react-redux';
import { updateLogRes } from '../../Redux/Common/Actions/AuthAction';

export default function Login({ navigation }) {
  const [textInput, setTextInput] = useState([
    { id: 1, label: 'Contact Number', value: '9990000000' },
    { id: 2, label: 'Password', value: '123456' }
  ]);
const dispatch = useDispatch()
  const handleChange = (id, text) => {
    setTextInput(prevState =>
      prevState.map(i => (i.id === id ? { ...i, value: text, error: null } : i))
    );
  };
  const validateAndSubmit = async () => {
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
        contact: textInput[0].value,
        password: textInput[1].value
      };

      const response = await LoginApi(sendingBody);
      console.log('Login Submit RES:', response?.Status);

      // // Check if the API returned an error
      if (response.Status == 200) {
        dispatch(updateLogRes(response?.loginData))
        navigation.navigate('AdminStack', { screen: 'AdminDashboard' })
      } else {
        console.log('LOGIN error:', response);
        Alert.alert('Error', response.message || 'Something went wrong');
      }
    } catch (err) {
      // Catches network/server errors
      console.log('LOGIN Submit error:', err?.response?.data,err);
      Alert.alert('Error', err?.response?.data?.message || 'Something went wrong');
    }
  }


  return (
    <SafeAreaView style={styles.container}>
      <Card style={GlobalCss.CardStyle}>
        <View >

          <Text style={GlobalCss.HeaderText}>Login</Text>

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

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: RFValue(4) }}>
            <TouchableOpacity style={{}} onPress={() => navigation.navigate('Register')}>
              <Text>
                Sign Up?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.forgotButton} onPress={() => {

              console.log('Forgot Password Pressed')
            }}>
              <Text>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity mode="contained" style={[GlobalCss.PrimaryBtn, { marginTop: RFValue(15) }]}
            onPress={() => validateAndSubmit()}
          >
            <Text style={GlobalCss.BtnText}>
              Submit
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

