import {ScrollView, StyleSheet, Text, View} from "react-native";
import {Input} from "@rneui/base";

const styles = StyleSheet.create({

    input: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'black',
        height: 20,
        width: 50
    }

})
const LoginTextInput = ({ name, onInputChange }: any) => {
    const handleInputChange = (value: string) => {
        onInputChange(name, value);
    };
    return (
        <>
            <ScrollView>
                <Text>userAccount props: {name}</Text>
                <View >
                    <Input style={styles.input} onChangeText={handleInputChange}>
                    </Input>

                </View>
            </ScrollView>
        </>

    );
}

export default LoginTextInput;