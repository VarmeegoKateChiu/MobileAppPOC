import { Margin } from '@mui/icons-material';
import { StyleSheet, Dimensions, PixelRatio } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Color from './Color';


const Screen = {
	height: hp('100%'),
	width: wp('100%'),
    horizonalMargin : hp('2%'),
    verticalMargin: wp('2%'), 
    horizonalPadding : hp('2%'),
    verticalPadding: wp('2%')
}

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.white
    },

    scrollSize:{
        width: Screen.width
    },
    margin:{
        marginHorizontal:Screen.horizonalMargin,
		marginVertical: Screen.verticalMargin
    },
    primaryTextColor : {
        color : Color.darkGrey
    },
    secondaryTextColor: {
        color: Color.manningsPrimaryColor,
    },
    successTextColor: {
        color: 'green',
    },
    warningTextColor: {
        color: 'yellow',
    },
    errorTextColor: {
        color: 'red'
    },
    infoTextColor : {
        color: 'blue'
    },
    primaryButton:{
        textAlign: 'center',
        color: Color.white,
        backgroundColor: Color.manningsPrimaryColor,
        paddingHorizontal: Screen.horizonalPadding,
        paddingVertical: Screen.verticalPadding,
        marginHorizontal: Screen.horizonalMargin,
        marginVertical: Screen.verticalMargin,
        borderRadius: wp('2%')
    },
    secondButton:{
        textAlign: 'center',
        color: Color.white,
        backgroundColor: Color.grey,
        paddingHorizontal: Screen.horizonalPadding,
        paddingVertical: Screen.verticalPadding,
        marginHorizontal: Screen.horizonalMargin,
        marginVertical: Screen.verticalMargin,
        borderRadius: wp('2%')
    },
    disableButton:{
        textAlign: 'center',
        color: Color.white,
        backgroundColor: Color.lightGrey,
        paddingHorizontal: Screen.horizonalPadding,
        paddingVertical: Screen.verticalPadding,
        marginHorizontal: Screen.horizonalMargin,
        marginVertical: Screen.verticalMargin,
        borderRadius: wp('2%')
    },

	flex: {
		flexDirection: 'row'
	},
	globalMargin: {
		marginHorizontal:Screen.horizonalMargin,
		marginVertical: Screen.verticalMargin
	},
    textInput: {
        width: 200,
        borderRadius: 10,
        borderColor: Color.lightGrey,
        borderStartWidth: 1,
        borderEndWidth: 1,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        marginBottom: 20
    },
    bgImage: {
        flex: 1,
        justifyContent: 'center',
    },
    loginContainer: {
        top: 80,
        justifyContent: 'center',
        alignItems: 'center',
    }

});
