import { Alert, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { navigateBack } from '../../../Components/NavigationBack'
import { createProductApi, getProductTypesApi, getSubProductTypesApi } from '../../../Api/Admin/Product'
import { GlobalCss } from '../../../Constats/GlobalCss'
import { Card, TextInput } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
import { Dropdown } from 'react-native-element-dropdown'
import { useSelector } from 'react-redux'
import { COLORS } from '../../../Constats/Colors'
import { requestCameraPermission, requestGalleryPermission } from '../../../Helpers/Permissions'
import ImagePicker from 'react-native-image-crop-picker';
import ImageCropPicker from 'react-native-image-crop-picker';
import { formDataImage } from '../../../Helpers/formDataImage'
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
  const [image, setImage] = useState({ value: null, error: null })


  const handleChange = (id, text) => {
    setTextInput(prevState =>
      prevState.map(i => (i.id === id ? { ...i, value: text, error: null } : i))
    );
  };
  const { loginRes } = useSelector((state) => state.loginRes)



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
      console.log('Error in getRouteTypes:', err)
      Alert.alert('Error', err?.response?.data?.message || 'Something went wrong')
    }
  }

  useEffect(() => {
    if (selectedProductType?.value) {
      getSubProductTypes(selectedProductType?.value)

    }
  }, [selectedProductType])

  async function getSubProductTypes(productType) {
    try {
      const res = await getSubProductTypesApi(productType?._id)
      console.log('getSubProductTypes RESPONSE: ', JSON.stringify(res, null, 2));
      if (res.status === 200) {
        setSubProductType(res?.data)
      } else {
        setSubProductType([])
        Alert.alert('Error', res?.message || 'Something went wrong')
      }
    } catch (err) {
      setSubProductType([])
      console.log('Error in getSubProductTypes:', err)
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
        } else {
          if (input.label == "Price") {
            if (Number(input.value) < 1) {
              error = "Price must greater than 1Rs";
              isValid = false;
            }
          }
        }
        return { ...input, error };
      });

      setTextInput(updatedInputs);
      if (!image.value) {
        setImage({ ...image, error: "Add Image" })
        isValid = false
      }

      if (isValid) {
        console.log("✅ Form submitted successfully", updatedInputs);
        await Submit()
      } else {
        console.log("❌ Validation errors", updatedInputs);
        Alert.alert('Error', 'Form contains errors')
      }
    } catch (e) {
      console.log("validateAndSubmit error:", e);
    }
  };

  async function Submit() {
    try {
      // const senidngData = {
      //   productTypeId: {
      //     _id: selectedProductType?.value?._id,
      //     ProductTypeName: selectedProductType?.value?.ProductTypeName,
      //   },
      //   subProductId: {
      //     _id: selectedSubProductType?.value?._id,
      //     SubProductName: selectedSubProductType?.value?.SubProductName,
      //   },
      //   name: textInput[0].value,
      //   price: textInput[1].value,
      //   description: textInput[2].value,
      //   createdBy: loginRes?._id,
      //   ProductImage:Image
      // }
      let formData =await formDataImage(image.value,"ProductImage");
      formData.append("productTypeId", JSON.stringify({
        _id: selectedProductType?.value?._id,
        ProductTypeName: selectedProductType?.value?.ProductTypeName,
      }));

      formData.append("subProductId", JSON.stringify({
        _id: selectedSubProductType?.value?._id,
        SubProductName: selectedSubProductType?.value?.SubProductName,
      }));

      formData.append("name", textInput[0].value);
      formData.append("price", textInput[1].value);
      formData.append("description", textInput[2].value);
      formData.append("createdBy", loginRes?._id);



      console.log('IMAGEE ', JSON.stringify(formData, null, 2));

      const res = await createProductApi(formData)
      console.log('createProductApi RESPONSE: ', JSON.stringify(res, null, 2));
      if (res.status === 201) {
        Alert.alert('Success', 'Product created successfully', [{
          text: 'OK',
          onPress: () => navigation.goBack()
        }])
      } else {
        Alert.alert('Error', res?.message || 'Something went wrong')
      }
    } catch (err) {
      console.log('Error in createProduct:', err)
      Alert.alert('Error', err?.response?.data?.message || 'Something went wrong')
    }
  }


  const AddImage = async () => {
    try {
      const res = await requestGalleryPermission()
      console.log('PERMISSOn', res);
      if (res) {
        const response = await ImagePicker.openPicker({
          compressImageQuality: 0.5,
          cropping: true,
          width: 1600, height: 900
        });
        const respo = [{ ...response }]; // Wrap response in an array if necessary
        console.log('openGallery image-------->', respo, 'image');
        setImage({ value: respo, error: null }); // Update state with the selected photo
      }
    } catch (e) {
      console.log('ERROR openGallery:', e.message); // Improved error logging
    }
  };



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


          <View style={{ marginVertical: '2%', height: RFValue(150), width: '100%', padding: '2%' }}>
            <TouchableOpacity onPress={() => AddImage()} style={{ borderColor: COLORS.BorderGray, borderWidth: 1, height: '100%', borderRadius: RFValue(6), justifyContent: 'center', alignItems: 'center' }}>

              {!image.value ?
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <TouchableOpacity mode="contained" style={[GlobalCss.PrimaryBtn, { marginTop: RFValue(15), }]}
                    onPress={() => AddImage()}
                  >
                    <Text style={GlobalCss.BtnText}>
                      Add Image
                    </Text>

                  </TouchableOpacity>
                  {image.error && <Text style={[GlobalCss.ErrorText, { marginBottom: 5 }]}>{image.error}</Text>}
                </View>
                :
                <Image source={{ uri: image.value[0].path }} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />}
            </TouchableOpacity>
          </View>


          <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity mode="contained" style={[GlobalCss.PrimaryBtn, { marginTop: RFValue(15), width: '40%' }]}
              onPress={() => validateAndSubmit()}
            >
              <Text style={GlobalCss.BtnText}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>

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