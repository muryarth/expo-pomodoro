import React from "react";
import { TouchableOpacity, Text } from "react-native";
import styles from "./styles";

export default StyledButton = ({ title, action, style }) => {

    const defineButtonStyle = (buttonStyle) => {
        if (buttonStyle == "secondaryButton") {
            return styles.secondaryButton;
        }
        return styles.primaryButton;
    }

    return (
        <>
            <TouchableOpacity style={defineButtonStyle(style)} onPress={action}>
                <Text>{title}</Text>
            </TouchableOpacity>
        </>
    );
}