import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { navigateBack } from '../../../Components/NavigationBack'
import { getProductTypesApi, getSubProductTypesApi } from '../../../Api/Admin/Product'
import { GlobalCss } from '../../../Constats/GlobalCss'
import { Card, TextInput } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
import { Dropdown } from 'react-native-element-dropdown'

export default function CreateProduct({ navigation }) {
  useEffect(() => { navigateBack(navigation) }, [navigation])
  useEffect(() => { getProductTypes() }, [])
  const [productType, setProductType] = useState([])
  const [selectedProductType, setSelectedProductType] = useState({ value: null, error: null })
  const [subProductType, setSubProductType] = useState([])
  const [selectedSubProductType, setSelectedSubProductType] = useState({ value: null, error: null })
  const [textInput, setTextInput] = useState([
    { id: 1, label: "Name", value: "", error: "", type: "text" },
    { id: 2, label: "Price", value: "", error: "", type: "number" },
    { id: 3, label: "Description", value: "", error: "", type: "text" },
  ]);
  const handleChange = (id, text) => {
    setTextInput(prevState =>
      prevState.map(i => (i.id === id ? { ...i, value: text, error: null } : i))
    );
  };

  async function getProductTypes(params) {
    try {
      const res = await getProductTypesApi()
      console.log('getProductTypesApi RESPONSE: ', JSON.stringify(res, null, 2));
      if (res.status === 200) {
        setProductType(res?.data)
      } else {
        setProductType([])
        Alert.alert('Error', res?.message || 'Something went wrong')
      }
    } catch (err) {
      setProductType([])
      console.error('Error in getRouteTypes:', err)
      Alert.alert('Error', err?.response?.data?.message || 'Something went wrong')
    }
  }

  useEffect(() => { getSubProductTypes(selectedProductType.value) }, [selectedProductType])

  async function getSubProductTypes(productType) {
    try {
      const res = await getSubProductTypesApi(productType._id)
      console.log('getSubProductTypes RESPONSE: ', JSON.stringify(res, null, 2));
      if (res.status === 200) {
        setSubProductType(res?.data)
      } else {
        setSubProductType([])
        Alert.alert('Error', res?.message || 'Something went wrong')
      }
    } catch (err) {
      setSubProductType([])
      console.error('Error in getSubProductTypes:', err)
      Alert.alert('Error', err?.response?.data?.message || 'Something went wrong')
    }
  }

    const validateAndSubmit = async () => {
      try {
        let isValid = true;
        const updatedInputs = textInput.map((input) => {
          let error = "";
          if (!input.value.trim()) {
            error = `${input.label} is required`;
            isValid = false;
          }else{
            if (input.label === "Price" ) {
              if(Number(input.value)<1)
              error = "Price must greater than 1Rs";
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
        const res = await createProductApi({
          productTypeId: selectedProductType.value,
          subProductId: selectedSubProductType.value,
          name: textInput[0].value,
          price: textInput[1].value,
          description: textInput[2].value,
        })
        console.log('createProductApi RESPONSE: ', JSON.stringify(res, null, 2));
        // if (res.status === 200) {
        //   Alert.alert('Success', 'Product created successfully')
        //   navigation.goBack()
        // } else {
        //   Alert.alert('Error', res?.message || 'Something went wrong')
        // }
      } catch (err) {
        console.error('Error in createProduct:', err)
        Alert.alert('Error', err?.response?.data?.message || 'Something went wrong')
      }
    }



  return (
    <SafeAreaView style={styles.container}>
      <Card style={GlobalCss.CardStyle}>
        <View style={{ justifyContent: 'center' }}>

          <Dropdown
            placeholder='select Product'
            data={productType}
            value={selectedProductType.value}
            onChange={(item) => {
              setSelectedProductType({ value: item, error: null })
            }}
            labelField="ProductTypeName"
            valueField="_id"
            style={GlobalCss.dropdownStyle}
            selectedTextStyle={[GlobalCss.Text, { marginLeft: '2%' }]}
            placeholderStyle={[GlobalCss.Text, { marginLeft: '2%' }]}
            renderItem={(item, index) => {
              return (
                <View key={index} style={GlobalCss.DropDownListContainer}>
                  <Text style={GlobalCss.Text} >{item.ProductTypeName}</Text>
                </View>
              )
            }}
          />
          <Dropdown
            placeholder='select Sub Product'
            data={subProductType}
            value={selectedSubProductType.value}
            onChange={(item) => {
              setSelectedSubProductType({ value: item, error: null })
            }}
            labelField="SubProductName"
            valueField="_id"
            style={GlobalCss.dropdownStyle}
            selectedTextStyle={[GlobalCss.Text, { marginLeft: '2%' }]}
            placeholderStyle={[GlobalCss.Text, { marginLeft: '2%' }]}
            renderItem={(item, index) => {
              return (
                <View key={index} style={GlobalCss.DropDownListContainer}>
                  <Text style={GlobalCss.Text} >{item?.SubProductName}</Text>
                </View>
              )
            }}
          />

          {textInput.map(item => (
            <View key={item.id}>
              <TextInput
                keyboardType={item.type}
                mode="outlined"
                style={styles.input}
                label={item.label}
                value={item.value}
                onChangeText={text => handleChange(item.id, text)}
              />
              {item.error && <Text style={[GlobalCss.ErrorText, { marginBottom: 5 }]}>{item.error}</Text>}
            </View>
          ))}



          <TouchableOpacity mode="contained" style={[GlobalCss.PrimaryBtn, { marginTop: RFValue(15), width: '40%' }]}
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
    marginBottom: RFValue(10),
  },
  button: {
    marginTop: 10,
  },
});