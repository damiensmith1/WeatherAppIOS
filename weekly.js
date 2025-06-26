import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const DailyDiv = (prop) => {
    return (
        <View style={styles.container}>
            <View style={styles.daily}>
                <Text>{prop.day}</Text>
                <Image source={{ uri: prop.uri }} style={styles.image}></Image>
                <Text> {prop.tempDay}</Text>
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
        marginBottom: '10%',
    },
    daily: {
        borderWidth: 0.5,
        borderRadius: 5,
        paddingRight: 25,
        paddingLeft: 25,
        paddingTop: '10%',
        paddingBottom: '10%',
    },
    image: {
        height: 50,
        width: 30
    }
});

export default DailyDiv;