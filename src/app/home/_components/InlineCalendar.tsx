import React, {useState, useEffect, useRef} from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { IconButton, Surface, useTheme, Portal, Modal, Text } from 'react-native-paper';
import StyledText from '../../../components/styled/Text';
import Week from './Week';
import { useSelector } from 'react-redux';
import Calendar from './Calendar';

export default function InlineCalendar() {
    const theme = useTheme();
    const flatListRef = useRef(null);
    const [scrollIndex, setScrollIndex] = useState(2);
    const [displayedMonthAndYear, setDisplayedMonthAndYear] = useState(currentMonthAndYear());
    const currentDay: string = useSelector((state: any) => state.currentDay.day);
    const [expanded, setExpanded] = useState(false);

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

    useEffect(() => {
        setDisplayedMonthAndYear(currentMonthAndYear());
    }, [currentDay]);

    const handleScroll = (event: any) => {
        const newScrollIndex = Math.round(event.nativeEvent.contentOffset.x / 344);
        if (newScrollIndex === scrollIndex) return;
        setScrollIndex(newScrollIndex);
        // Increment to the next week if the user scroll to the next week
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
        <View>
            <Portal>
                <Modal
                    visible={expanded}
                    onDismiss={() => setExpanded(false)}
                    contentContainerStyle={{backgroundColor: 'transparent', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                >
                    <View style={{width: '80%'}}>
                        <Calendar dismiss={setExpanded}/>
                    </View>
                </Modal>
            </Portal>

            <View style={styles.container}>
                <Surface elevation={1} style={styles.surfaceContainer}>
                    
                    <View style={styles.topContainer}>

                        <StyledText style={{textTransform: 'capitalize', color: theme.colors.onSurface}} >{displayedMonthAndYear}</StyledText>

                        <View style={styles.buttons}>
                            {/* <StyledIconButton icon="chevron-left" onPress={() => handleMove('backward')}/> */}
                            {/* <StyledIconButton icon="chevron-right" onPress={() => handleMove('forward')}/> */}
                            <StyledIconButton icon="arrow-expand" onPress={() => setExpanded(true)}/>

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
        </View>
    )
}