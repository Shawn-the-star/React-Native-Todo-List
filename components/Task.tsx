import React from 'react'
import { Entypo, FontAwesome5 } from '@expo/vector-icons'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

type TaskProps = {
    text: string
}

export default function Task(props: TaskProps) {

    return (
        <View style={styles.container}>
            <FontAwesome5 style={styles.clip} name={'sticky-note'} size={20} color={'lightblue'} />
            <View style={styles.rightContainer}>
                <Text style={styles.text}>{props.text}</Text>
                <Entypo name={'circle'} size={20} color={'lightblue'} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: 'auto',
        marginBottom: 20,
        marginHorizontal: 5,
        padding: 17,
        backgroundColor: 'white',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5
    },
    rightContainer: {
        width: "90%",
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text: {
        fontSize: 14,
    },
    clip: {
        marginRight: 15,
    },
})