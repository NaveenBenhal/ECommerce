import { Platform } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { COLORS } from "./Colors";

export const GlobalCss = {
    CardStyle: {
        backgroundColor: '#FFFF',
        width: '85%',
        padding: 20,
        borderRadius: 10,
        elevation: 5, // Shadow for Android
        shadowColor: '#000', // Shadow color for iOS
        shadowOffset: { width: 0, height: 4 }, // Offset for bottom shadow
        shadowOpacity: 0.3, // Shadow opacity
        shadowRadius: 4, // Shadow blur radius
    },
    PrimaryBtn: {
        marginVertical:RFValue(5),
        backgroundColor: '#3700B3',
        borderRadius: 10,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: RFValue(30),
        color:'#FFFFFF',
    },
    BtnText:{
        fontSize: RFValue(12),
        fontWeight: 'bold',
        color:'#FFFFFF',
    },
    HeaderText:{
        fontSize: RFValue(18),
        textAlign:'center',
        fontWeight: 'bold',
        color:'#3700B3',
        marginBottom: RFValue(10),
    },
    Text:{
        fontSize: RFValue(12),
    },
    ErrorText:{
        color:'red',
        marginTop: RFValue(-5),
        fontSize: RFValue(10),
    },
    DropDownListContainer:{
        width: '100%',
        height: RFValue(35),
        borderRadius: 10,
        justifyContent: 'center',
        paddingHorizontal:RFValue(10)
    },
    dropdownStyle: {
        elevation: 5, // Shadow for Android
        shadowColor: '#000', // Shadow color for iOS
        shadowOffset: { width: 0, height: 4 }, // Offset for bottom shadow
        shadowOpacity: 0.3, // Shadow opacity
        shadowRadius: 4, // Shadow blur radius
        width: '100%',
        backgroundColor: 'white',
        borderColor: COLORS.BorderGray,
        borderWidth: 1,
        borderRadius: 8,
        padding: '2%',
        height: RFValue(35),
    marginBottom:RFValue(10),

    },

}