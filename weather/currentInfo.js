import * as React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const CurrentInfo = (prop) => {
    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <Image source={{ uri: prop.uri }} style={styles.image}></Image>
                <Text> {prop.value} </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#d6e0f5',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 15,
        width: '20%'
    },
    info: {
        padding: '10%',
        borderRadius: 5,
        opacity: 0.5
    },
    image: {
        height: 50,
        width: 50,
    }
});

export default CurrentInfo;