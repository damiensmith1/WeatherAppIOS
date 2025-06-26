import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const HourlyDiv = (prop) => {
    return (
        <View style={styles.hourlyContainer}>
            <View style={styles.hourly}>
                <Text>{prop.time}</Text>
                <Image source={{ uri: prop.url }} style={styles.image}></Image>
                <Text>  {prop.tempHour}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    hourlyContainer: {
        flexDirection: 'row',
        backgroundColor: '#d6e0f5',
        alignItems: 'center',
        borderRadius: 5,
        paddingHorizontal: 20,
        opacity: 1,
    },
    scroll: {
        backgroundColor: 'white',
        marginTop: '1%',
        marginLeft: '2%',
        marginRight: '2%',
    },
    image: {
        height: 50,
        width: 30
    }

});

export default HourlyDiv;