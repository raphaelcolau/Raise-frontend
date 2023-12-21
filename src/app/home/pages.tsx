import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Button, Icon, IconButton, Surface, useTheme, Text } from 'react-native-paper';
import StyledView from '../../components/styled/View';
import Header from './_components/Header';
import StyledText from '../../components/styled/Text';



function Day({date, selected}: {date: Date, selected?: boolean}) {
    const theme = useTheme();
    const day = date.getDate();
    const weekDay = date.toLocaleString('fr-FR', { weekday: 'short'}).substring(0, 3);

    const styles = StyleSheet.create({
        container: {
            width: 39,
            height: 51,
            borderRadius: 10,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 3,
            backgroundColor: selected ? theme.colors.primary : 'transparent',
        },
        text: {
            color: selected ? '#000000' : '#FFFFFF',
            textTransform: 'capitalize',
        }
    });

    return (
        <View style={styles.container}>
            <Text variant="bodyMedium" style={styles.text}>{weekDay}</Text>
            <Text variant="bodyLarge" style={{...styles.text, fontWeight: 'bold'}}>{day}</Text>
        </View>
    )
}

/**
 * Renders a week component.
 * @param {number} week - The week number. (0 = current week, 1 = next week, etc.)
 * @returns {JSX.Element} - The rendered week component.
 */
function Week({week, daySelected, setSelectedDay}: {week: number, daySelected?: Date, setSelectedDay: Function}) {
    const dayOfTheWeek = new Date().getDay() - 1;
    const styles = StyleSheet.create({
        dateContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            width: 344,
            justifyContent: 'space-between',
        },
    });

    return (
        <View>
            <View style={styles.dateContainer}>
                {[0, 1, 2, 3, 4, 5, 6].map((index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => setSelectedDay(new Date(new Date().setDate(new Date().getDate() + (index - dayOfTheWeek) - (-week * 7))))}
                    >
                        <Day
                            selected={daySelected?.getDate() === new Date(new Date().setDate(new Date().getDate() + (index - dayOfTheWeek) - (-week * 7))).getDate()}
                            date={new Date(new Date().setDate(new Date().getDate() + (index - dayOfTheWeek) - (-week * 7)))}
                        />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    )
}

function WeeklyCalendar() {
    const theme = useTheme();
    const weekContainerWidth = 344;
    const flatListRef = React.useRef(null);
    const [scrollIndex, setScrollIndex] = React.useState(2);
    const [selectedDay, setSelectedDay] = React.useState(new Date());
    const [displayedMonthAndYear, setDisplayedMonthAndYear] = React.useState(currentMonthAndYear());

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
        const date = selectedDay;
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
    }, [selectedDay]);

    // const handleScroll = (event: any) => {
    //     const newScrollIndex = Math.round(event.nativeEvent.contentOffset.x / 344);
    //     if (newScrollIndex === scrollIndex) return;
    //     setScrollIndex(newScrollIndex);
    //     if (flatListRef.current === null) return;
    //     (flatListRef.current as any).scrollToIndex({index: newScrollIndex, animated: true})
    // };

    const handleMove = (direction: 'forward' | 'backward') => {
        const move = direction === 'forward' ? 1 : -1;
        if (scrollIndex + move < 0 || scrollIndex + move > 4) return;
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
                    data={[-2, -1, 0, 1, 2]}
                    ref={flatListRef}
                    keyExtractor={(item) => item.toString()}
                    renderItem={({item}) => <Week week={item} setSelectedDay={setSelectedDay} daySelected={selectedDay} />}
                    initialScrollIndex={scrollIndex}
                    // onScroll={handleScroll}
                    scrollEventThrottle={16}
                />

            </Surface>
        </View>
    )
}

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
            <WeeklyCalendar />
            {/* <Button mode="contained" onPress={() => navigation.navigate('Login')}>
                Login
            </Button> */}
        </StyledView>
    )
}