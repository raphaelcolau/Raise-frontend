import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { IconButton, Surface, useTheme } from 'react-native-paper';
import StyledText from '../../../components/styled/Text';
import Week from './Week';
import { useSelector } from 'react-redux';

export default function WeeklyCalendar() {
    const theme = useTheme();
    const flatListRef = React.useRef(null);
    const [scrollIndex, setScrollIndex] = React.useState(2);
    const [displayedMonthAndYear, setDisplayedMonthAndYear] = React.useState(currentMonthAndYear());
    const currentDay: string = useSelector((state: any) => state.currentDay.day);

    const styles = StyleSheet.create({
        container: {
            with: '100%',
            height: 100,
            borderRadius: 10,
            overflow: 'hidden',
        },
        surfaceContainer: {
            width: '100%',
            height: '100%',
            paddingTop: 5,
            paddingLeft: 10,
            paddingRight: 10,
            paddingBottom: 5,
            gap: -3,
            backgroundColor: theme.colors.surface,
        },
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        topContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        buttons: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        scrollView: {
            width: '100%',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'row',
        },
    });

    function currentMonthAndYear(): string {
        const date = new Date(currentDay);
        const month = date.toLocaleString('fr-FR', { month: 'long' });
        const year = date.getFullYear();

        return `${month} ${year}`;
    }

    const StyledIconButton = (props: any) => <IconButton 
        size={24}
        {...props}
        style={{
            padding: 0,
            margin: 0,
        }}
    />;

    React.useEffect(() => {
        setDisplayedMonthAndYear(currentMonthAndYear());
    }, [currentDay]);

    const handleScroll = (event: any) => {
        const newScrollIndex = Math.round(event.nativeEvent.contentOffset.x / 344);
        if (newScrollIndex === scrollIndex) return;
        setScrollIndex(newScrollIndex);
        // if (flatListRef.current === null) return;
        // (flatListRef.current as any).scrollToIndex({index: newScrollIndex, animated: true})
    };

    const handleMove = (direction: 'forward' | 'backward') => {
        const move = direction === 'forward' ? 1 : -1;
        if (scrollIndex + move < 0 || scrollIndex + move > 3) return;
        setScrollIndex(scrollIndex + move)
        if (flatListRef.current === null) return;
        (flatListRef.current as any).scrollToIndex({index: (scrollIndex + move), animated: true})
    };

    return (
        <View style={styles.container}>
            <Surface elevation={1} style={styles.surfaceContainer}>
                
                <View style={styles.topContainer}>

                    <StyledText style={{textTransform: 'capitalize', color: theme.colors.onSurface}} >{displayedMonthAndYear}</StyledText>

                    <View style={styles.buttons}>
                        <StyledIconButton icon="chevron-left" onPress={() => handleMove('backward')}/>
                        <StyledIconButton icon="chevron-right" onPress={() => handleMove('forward')}/>
                    </View>

                </View>

                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.scrollView}
                    data={[0, 1, 2, 3]}
                    ref={flatListRef}
                    keyExtractor={(item) => item.toString()}
                    renderItem={({item}) => <Week week={item} />}
                    // initialScrollIndex={2}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                />

            </Surface>
        </View>
    )
}