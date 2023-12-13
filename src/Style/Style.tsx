import { StyleSheet, Dimensions, PixelRatio } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Width from './Width';
import Height from './Height';

const Screen = {
	height: Height.hp100,
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
	paddingTop: {
		paddingTop: Height.hp2,
	},
	paddingBottom: {
		paddingBottom : Height.hp2,
	},
	paddingLeft: {
		paddingLeft: Width.wp2,
	},
	paddingRight: {
		paddingRight: Width.wp2,
	},
	paddingVirtical: {
		paddingLeft: Width.wp2,
		paddingRight: Width.wp2,
	},
	paddingHorizonal: {
		paddingTop: Height.hp2,
		paddingBottom : Height.hp2,
	},
});