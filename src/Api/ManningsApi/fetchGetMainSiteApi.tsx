import Config from 'react-native-config';

const ManningSiteDomain = Config.SERVER_DOMAIN ?? '';
const ManningSiteSuffix = Config.MANNING_SITE_SUFFIX ?? '';
const ManningSiteUrl = ManningSiteDomain + ManningSiteSuffix;
const fetchGetMainSiteApi: any = async () => {
    console.log("fetching: " + ManningSiteUrl);
    try {
        const response = await fetch(ManningSiteUrl, {
            method: "GET",
        });
        if (response.status === 200) {
            console.log("success fetch manning main site");
        } else {
            console.log("fail fetch manning main site, response status: " + response.status);
        }
        const respJson = await response.json();
        console.log(respJson);
        return respJson;
    } catch (error) {
        console.log("fail fetch manning main site");
        return null;
    }
}

export default fetchGetMainSiteApi;


