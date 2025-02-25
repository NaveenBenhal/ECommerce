import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { baseURL, ImageURL } from '../../../Api/BaseUrl'
import { RFValue } from 'react-native-responsive-fontsize'
import { GlobalCss } from '../../../Constats/GlobalCss'

export default function DataList({ data }) {
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                numColumns='2'
                renderItem={({ item, index }) => {
                    return (
                        <View key={index} style={{ borderWidth: 1, width: '48%', borderColor: 'gray', padding: RFValue(10) }}>
                            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    source={{ uri: ImageURL + item.ProductImage }}
                                    style={{ width: RFValue(100), height: RFValue(100) }}
                                />
                            </View>
                            <View style={{ marginTop:RFValue(5) }}>
                                <Text style={GlobalCss.Text}>Name: {item.name}</Text>
                                <Text style={GlobalCss.Text}>Price: {item.price}</Text>
                                <Text style={GlobalCss.Text}>Description: {item.description}</Text>
                            </View>
                        </View>
                    )
                }}
            />
        </View>

    )
}

const styles = StyleSheet.create({})