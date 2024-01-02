import React from 'react';
import StyledView from '../../components/styled/View';
import Header from './_components/Header';
import InlineCalendar from './_components/InlineCalendar';
import BottomBar from '../../components/bottomBar/bottomBar';
import TrainingsDay from './_components/TrainingsDay';

export default function Home({navigation, route}: {navigation: any, route: any}) {
    
    const styles = {
        container: {
            flex: 1,
            gap: 15,
            padding: 15,
        },
    };

    return (
        <StyledView style={styles.container}>
            <Header />
            <InlineCalendar />
            <TrainingsDay navigation={navigation} route={route} />
            <BottomBar />
        </StyledView>
    )
}