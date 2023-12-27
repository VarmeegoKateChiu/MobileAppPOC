import Config from 'react-native-config';
import UserAgent from 'react-native-user-agent';
import {useContext} from 'react';
import {UserContext} from '../../Context/UserContext'

const serverDomain = Config.SERVER_DOMAIN ?? '';
const suffix = Config.MOBILE_LOGIN_SUFFIX ?? '';
const mobileLoginApi = serverDomain + suffix;

const fetchPostMobileLoginApi: any = async (userAccount: string, userPassword: string, rememberMe: boolean) => {
    const [userDisplayName,setUserDisplayName] = useContext(UserContext);
    try {
        console.log("fetchPostMobileLoginApi :: fetching: "+ mobileLoginApi);
        const userAgent = UserAgent.getUserAgent() +  " /" + (Config.APP_USER_AGENT ?? 'Mannings App');
        const response = await fetch(mobileLoginApi, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'User-Agent': userAgent
            },
            body: JSON.stringify({
                j_username: userAccount,
                j_password: userPassword,
                rememberMe: rememberMe
            }),
        });
        if (!response.ok) {
            console.log("fail login, status code: " + response.status);
            return null;
        }

        const data: string = await response.json();
        console.log("Login successful" + data.userDisplayName);
        setUserDisplayName(data.userDisplayName);

        return respJson;

    } catch (error) {

        console.log("fail login");
        return null;
    }
}

export default fetchPostMobileLoginApi;