import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import { theme } from '../core/theme'

export default function PickerSelect({ errorText, description, items, placeholder, onValueChange }) {
    const containerStyle = errorText ? styles.containerError : styles.container;

    return (
        <>
            <View style={containerStyle}>
                <RNPickerSelect
                    onValueChange={onValueChange}
                    items={items}
                    placeholder={placeholder}
                    style={styles.pickerSelect}
                />
            </View>
            {description && !errorText ? (
                <Text style={styles.description}>{description}</Text>
            ) : null}
            {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#414757',
        marginTop: 10,
        marginBottom: 5
    },
    containerError: {
        alignSelf: 'stretch',
        borderWidth: 2,
        borderRadius: 5,
        borderColor: theme.colors.error,
        marginTop: 10,
    },
    pickerSelect: {
        inputIOS: {
            fontSize: 13,
            color: '#414757',
        },
        inputAndroid: {
            fontSize: 13,
            color: '#414757',
        }
    },
    description: {
        fontSize: 13,
        color: theme.colors.secondary,
    },
    error: {
        fontSize: 13,
        color: theme.colors.error,
        alignSelf: 'flex-start',
        marginBottom: 5
    },
})
