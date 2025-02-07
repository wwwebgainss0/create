import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '@flexn/create';
import { getScaledValue } from '@rnv/renative';
import Screen from './../screen';
import { Button } from '../../components/Button';
import { Ratio } from '../../utils';

const Overflow = () => {
    const [layer1Buttons] = useState(Array(5).fill(0));
    const [layer2Buttons] = useState(Array(5).fill(0));
    const [layer3Buttons] = useState(Array(5).fill(0));

    return (
        <View style={{ backgroundColor: '#222222', flex: 1 }}>
            <Screen
                style={{ backgroundColor: '#222222', position: 'absolute' }}
                focusOptions={{ nextFocusRight: ['layer2'], focusKey: 'layer1', group: 'layer1', stealFocus: true }}
            >
                <View style={{ position: 'absolute' }}>
                    {layer1Buttons.map((_, i) => (
                        <Button
                            key={i}
                            style={{ ...styles.button, ...styles.button1Pos }}
                            title={`Layer 1 Button ${i + 1}`}
                            textStyle={styles.buttonTextStyle}
                        />
                    ))}
                </View>
            </Screen>
            <Screen
                style={{ backgroundColor: '#222222', position: 'absolute' }}
                focusOptions={{ nextFocusLeft: ['layer1'], focusKey: 'layer2', group: 'layer2', stealFocus: false }}
            >
                <View style={{ position: 'absolute' }}>
                    {layer2Buttons.map((_, i) => (
                        <Button
                            key={i}
                            style={{ ...styles.button2, ...styles.button2Pos }}
                            title={`Layer 2 Button ${i + 1}`}
                            textStyle={styles.buttonTextStyle}
                        />
                    ))}
                </View>
            </Screen>
            <Screen style={{ backgroundColor: '#222222', position: 'absolute' }} focusOptions={{ stealFocus: false }}>
                <View style={{ position: 'absolute' }}>
                    {layer3Buttons.map((_, i) => (
                        <Button
                            key={i}
                            style={{ ...styles.button2, ...styles.button3Pos }}
                            title={`Layer 3 Button ${i + 1}`}
                            textStyle={styles.buttonTextStyle}
                        />
                    ))}
                </View>
            </Screen>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        marginHorizontal: getScaledValue(20),
        borderWidth: getScaledValue(2),
        borderRadius: getScaledValue(25),
        borderColor: '#62DBFB',
        height: getScaledValue(50),
        width: Ratio(500),
        marginTop: getScaledValue(20),
    },
    button2: {
        marginHorizontal: getScaledValue(20),
        borderWidth: getScaledValue(2),
        borderRadius: getScaledValue(25),
        borderColor: 'red',
        height: getScaledValue(50),
        width: Ratio(500),
        marginTop: getScaledValue(20),
    },
    buttonTextStyle: {
        color: '#ffffff',
        fontSize: Ratio(20),
    },
    packshot: {
        width: Ratio(200),
        height: Ratio(200),
        margin: Ratio(5),
    },
    image: {
        width: '100%',
        height: '100%',
    },
    button1Pos: {
        left: Ratio(50),
    },
    button2Pos: {
        left: Ratio(50),
        top: Ratio(110),
    },
    button3Pos: {
        left: Ratio(700),
        // top: Ratio(110),
    },
});

export default Overflow;
