import { StyleSheet, Dimensions, PixelRatio } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Width from './Width';

const Screen = {
	height: hp('100%'),
	width: Width.wp100,
}
export default StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	flex: {
		flexDirection: 'row'
	},
});