import React from 'react';
import { View, Linking, Text, StyleSheet } from 'react-native';

export default Credits = () => {
    return (
        <View style={styles.content}>
            <Text style={[styles.hyperlink, styles.commonText]}
                onPress={() => {
                    Linking.openURL('https://www.zapsplat.com');
                }}
            >
                Sound effects obtained from zapsplat.com
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: 'column-reverse',
        marginVertical: 16,
    },

    hyperlink: {
        color: "#4ca4ff",
    },

    commonText: {
        marginVertical: 5,
        textAlign: "center",
        fontSize: 14,
    }
});