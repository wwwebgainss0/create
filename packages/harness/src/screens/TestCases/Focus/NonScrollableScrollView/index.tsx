import React from 'react';
import { PosterCard, ScrollView } from '@flexn/sdk';
import Screen from '../../../../components/Screen';

const NonScrollableScrollView = () => {
    return (
        <Screen>
            <ScrollView>
                <PosterCard
                    src={{ uri: `https://placekitten.com/250/250` }}
                    style={{ width: 250, height: 250, marginHorizontal: 15 }}
                    focusOptions={{
                        focusKey: 'card2',
                        nextFocusRight: 'card1',
                        animatorOptions: {
                            type: 'scale',
                            scale: 1.5,
                        },
                    }}
                />
                <PosterCard
                    src={{ uri: `https://placekitten.com/250/250` }}
                    style={{ width: 250, height: 250, marginHorizontal: 15, top: 200 }}
                    focusOptions={{
                        focusKey: 'card3',
                        animatorOptions: {
                            type: 'scale',
                            scale: 1.5,
                        },
                    }}
                />
            </ScrollView>
        </Screen>
    );
};

export default NonScrollableScrollView;
