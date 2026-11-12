import React from 'react';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { ThemeProvider, useTheme } from '../theme/ThemeContext';

const icons = { index: 'home', about: 'person', skills: 'flash', portfolio: 'briefcase', score: 'stats-chart', gallery: 'images', contact: 'mail' };

function TabsLayout() {
  const { colors, isDark } = useTheme();
  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: colors.accent,
          tabBarInactiveTintColor: colors.sub,
          tabBarStyle: { backgroundColor: colors.tabBg, borderTopColor: colors.border, height: 64, paddingTop: 6, paddingBottom: 8 },
          tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
          tabBarIcon: ({ color, size }) => <Ionicons name={icons[route.name]} size={size} color={color} />,
        })}
      >
        <Tabs.Screen name="index" options={{ title: 'Home' }} />
        <Tabs.Screen name="about" options={{ title: 'Tentang' }} />
        <Tabs.Screen name="skills" options={{ title: 'Skills' }} />
        <Tabs.Screen name="portfolio" options={{ title: 'Karya' }} />
        <Tabs.Screen name="score" options={{ title: 'My Score' }} />
        <Tabs.Screen name="gallery" options={{ href: null }} />
        <Tabs.Screen name="contact" options={{ title: 'Kontak' }} />
      </Tabs>
    </>
  );
}
export default function RootLayout() {
  return <ThemeProvider><TabsLayout /></ThemeProvider>;
}
