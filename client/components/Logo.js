import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors } from '../styles/theme';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function Logo({ light = false }) {
    return (
        <View style={styles.container}>
            <View style={styles.logoIcon}>
              <Ionicons
                name="book"
                size={25}
                color={colors.white}
              />
            </View>

            <Text
                style={[
                    styles.text,
                    light && styles.lightText,
                ]}
            >
                LumaLearn
            </Text>
        </View>

    );
}

const styles = StyleSheet.create({
container: {
flexDirection: 'row',
alignItems: 'center',
gap: 9,
},

logoIcon: {
    width: 43,
    height: 43,
    borderRadius: 13,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

book: {
color: colors.white,
fontSize: 21,
fontWeight: '400',
},

bookLine: {
position: 'absolute',
height: 16,
width: 1,
backgroundColor: colors.white,
left: 16,
},

text: {
color: colors.primaryDark,
fontSize: 19,
fontWeight: '800',
letterSpacing: -0.4,
},

lightText: {
color: colors.white,
},
});
