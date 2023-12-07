import Config from 'react-native-config';

const ManningSiteDomain = Config.SERVER_DOMAIN ?? '';
const suffix = Config.MOBILE_API_INIT_MOBILE_SUFFIX ?? '';
const ManningSiteUrl = ManningSiteDomain + suffix;
const fetchGetInitMobile: any = async () => {
    console.log("fetching: " + ManningSiteUrl);
    try {
        const response = await fetch(ManningSiteUrl, {
            method: "GET",
        });
        if (response.status === 200) {
            console.log("success fetch from mobile api");
        } else {
            console.log("fail fetch from mobile api, response status: " + response.status);
        }
        const respJson = await response.json();
        console.log(respJson);
        return respJson;
    } catch (error) {
        console.log("fail fetch from mobile api");
        return null;
    }
}

export default fetchGetInitMobile;


