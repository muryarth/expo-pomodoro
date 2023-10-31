import React from 'react';
import { View, Linking, Text } from 'react-native';
import styles from "./styles";

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