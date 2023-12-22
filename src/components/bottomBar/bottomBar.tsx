import React from 'react';
import { View, Dimensions } from 'react-native';
import { Tab } from './Tab';

export default function BottomBar() {
    const pages = [
        { key: 'Home', title: 'Accueil', icon: 'home-variant-outline' },
        { key: 'Sport', title: 'Sport', icon: 'handball' },
        { key: 'Nutrition', title: 'Nutrition', icon: 'silverware-fork-knife' },
        { key: 'Progress', title: 'Progrès', icon: 'trending-up' },
    ];

    return (
        <View style={{
            flex: 1,
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: Dimensions.get('window').width,
        }}>
            <View style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
            
                {pages.map((page) => <Tab key={page.key} selected={page.key === "Home"} name={page.key} title={page.title} icon={page.icon} />)}
            
            </View>
        </View>
    )
}