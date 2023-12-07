import Config from 'react-native-config';

const serverDomain = Config.SERVER_DOMAIN ?? '';
const suffix = Config.MOBILE_AUTO_LOGIN_SUFFIX ?? '';
const mobileLoginApi = serverDomain + suffix;
const fetchPostMobileAutoLogin: any = async (userAccount: string, userPassword: string) => {
    try {
        console.log("fetchPostMobileAutoLoginApi :: fetching: "+ mobileLoginApi);
        const response = await fetch(mobileLoginApi, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                j_username: userAccount,
                j_password: userPassword,
            }),
        });
        if (response.status === 200) {
            console.log("success login");
        } else {
            console.log("fail login, status code: " + response.status);
            return null;
        }


        const respJson: string = await response.json();
        console.log(respJson);
        return respJson;

    } catch (error) {

        console.log("fail login");
        return null;
    }
}

export default fetchPostMobileAutoLogin;