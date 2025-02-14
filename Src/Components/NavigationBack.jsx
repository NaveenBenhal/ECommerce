import { Text, TouchableOpacity } from "react-native"
import Icon from  'react-native-vector-icons/Feather'
export const navigateBack = (navigation) => {
    navigation.setOptions({
        headerLeft: () => {
            return <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ flexDirection: 'row', justifyContent: "center", alignItems: "center" }}>
                <Text style={{ color: '#fff', marginTop: 0}}><Icon color={'#FFF'} size={30} name="chevron-left" /></Text>
                <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Back</Text>
            </TouchableOpacity>
        }
    })
}