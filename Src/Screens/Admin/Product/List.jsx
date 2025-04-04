import { Alert, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GlobalCss } from '../../../Constats/GlobalCss'
import { Dropdown } from 'react-native-element-dropdown'
import { RFValue } from 'react-native-responsive-fontsize'
import { getProductsApi, getProductTypesApi, getSubProductTypesApi } from '../../../Api/Admin/Product'
import { useSelector } from 'react-redux'
import DataList from './DataList'

export default function ProductList() {
  const { loginRes } = useSelector((state) => state.loginRes)
  const [drodDownData, setDrodDownData] = useState([])
  const [selectedDrodDownData, setSelectedDrodDownData] = useState({ value: null, error: null })
  const [productType, setProductType] = useState([])
  const [selectedProductType, setSelectedProductType] = useState({ value: null, error: null })
  const [subProductType, setSubProductType] = useState([])
  const [selectedSubProductType, setSelectedSubProductType] = useState({ value: null, error: null })
  const [products, setProducts] = useState([])
  const [sendingData, setSendingData] = useState({
    userId: null,
    productId: null,
    subProductId: null
  })
  console.log('sendingData-----', sendingData);

  useEffect(() => {
    getProductTypes()
  }, [])
  useEffect(() => {
    if (loginRes) {
      initialHit(loginRes)
    }
  }, [loginRes])


  useEffect(() => {
    if (sendingData.productId != null && sendingData.subProductId != null && sendingData.userId != null) {
      getData(sendingData)
    }
  }, [sendingData])

  async function getData(sendingData) {
    try {
      const res = await getProductsApi(sendingData)
      console.log('getData PRODUCT RESPONSE: ', JSON.stringify(res, null, 2));
      if (res.status === 200) {
        setProducts(res?.data)
      } else {
        setProducts([])
        Alert.alert('Error', res?.message || 'Something went wrong')
      }
    } catch (err) {
      console.log('Error in getData:', err)
      Alert.alert('Error', err?.response?.data?.message || 'Something went wrong')
    }
  }

  async function initialHit(loginRes) {
    try {
      console.log('loginRes', loginRes?._id);
      const dropData = [{
        id: 1,
        name: 'All',
        userId: 0
      }, {
        id: 2,
        name: 'My Products',
        userId: 0
      }]

      const map = dropData.map((item) => {
        return {
          ...item,
          userId: item.id == 2 ? loginRes?._id : 0,
        }
      })
      console.log('MAP:', map);

      setDrodDownData(map)
      setSelectedDrodDownData({ value: map[0], error: null })
      setSendingData(prevData => ({ ...prevData, userId: map?.[0]?.userId }));

    } catch (e) {

    }
  }

  async function getProductTypes() {
    try {
      const res = await getProductTypesApi()
      // console.log('getProductTypesApi RESPONSE: ', JSON.stringify(res, null, 2));
      if (res.status === 200) {
        const mergedData = [{ _id: 0, ProductTypeName: 'All' }, ...res?.data]
        setProductType(mergedData)
        setSelectedProductType({ value: mergedData[0], error: null })
        console.log('getProductTypes INITIAL', mergedData[0]);
        setSendingData(prevData => ({ ...prevData, productId: mergedData?.[0]?._id }));

        // setProductType(res?.data)
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
      // console.log('getSubProductTypes RESPONSE: ', JSON.stringify(res, null, 2));
      if (res.status === 200) {
        const mergedData = [{ _id: 0, SubProductName: 'All' }, ...res?.data]
        setSubProductType(mergedData)
        setSelectedSubProductType({ value: mergedData[0], error: null })
        setSendingData(prevData => ({ ...prevData, subProductId: mergedData?.[0]?._id }));

        // setSubProductType(res?.data)
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




  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, margin: RFValue(5) }}>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around' }}>
          <Dropdown
            placeholder='select Sub Product'
            data={drodDownData}
            value={selectedDrodDownData.value}
            onChange={(item) => {
              setSelectedDrodDownData({ value: item, error: null })
              setSendingData(prevData => ({ ...prevData, userId: item.userId }));

            }}
            labelField="name"
            valueField="id"
            style={[GlobalCss.dropdownStyle, { width: '48%', }]}
            selectedTextStyle={[GlobalCss.Text, { marginLeft: '2%' }]}
            placeholderStyle={[GlobalCss.Text, { marginLeft: '2%' }]}
            renderItem={(item, index) => {
              return (
                <View key={index} style={GlobalCss.DropDownListContainer}>
                  <Text style={GlobalCss.Text} >{item?.name}</Text>
                </View>
              )
            }}
          />
          <Dropdown
            placeholder='select Product'
            data={productType}
            value={selectedProductType.value}
            onChange={(item) => {
              setSelectedProductType({ value: item, error: null })
              setSendingData(prevData => ({ ...prevData, productId: item._id }));

            }}
            labelField="ProductTypeName"
            valueField="_id"
            style={[GlobalCss.dropdownStyle, { width: '48%', }]}
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

        </View>

        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around' }}>
          <Dropdown
            placeholder='select Sub Product'
            data={subProductType}
            value={selectedSubProductType.value}
            onChange={(item) => {
              setSelectedSubProductType({ value: item, error: null })
              setSendingData(prevData => ({ ...prevData, subProductId: item._id }));

            }}
            labelField="SubProductName"
            valueField="_id"
            style={[GlobalCss.dropdownStyle, { width: '48%', }]}
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
        </View>


        <DataList data={products} />

      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})