import React from "react";
import { View, StyleSheet } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import styles from "./styles";

const renderSchedule = (ciclesLength, subciclesLength, currentProgress) => {
    const cicles = [];

    for (let countCicles = 0; countCicles < ciclesLength; countCicles++) {
        let row = []
        for (let countSubcicles = 0; countSubcicles < subciclesLength; countSubcicles++) {
            row.push(
                <Ionicons name="square-outline" size={15} color="black" />
            );
        }
        cicles.push(
            <View style={styles.cicle}>
                {row}
            </View>
        );
    }

    return cicles;
}

export default function Schedule({ ciclesLength = 3, subciclesLength = 4, currentProgress }) {
    return (
        <View style={styles.content}>
            {renderSchedule(ciclesLength, subciclesLength, currentProgress)}
        </View>
    );
}