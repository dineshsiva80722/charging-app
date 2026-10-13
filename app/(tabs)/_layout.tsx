import { Tabs } from 'expo-router';
import { Activity, Settings2, ShieldCheck } from 'lucide-react-native';
import { StyleSheet } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#8FCBFF',
        tabBarInactiveTintColor: '#68707D',
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
        sceneStyle: styles.scene,
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Display', tabBarIcon: ({ color, size }) => <Activity color={color} size={size} strokeWidth={1.8} /> }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings', tabBarIcon: ({ color, size }) => <Settings2 color={color} size={size} strokeWidth={1.8} /> }} />
      <Tabs.Screen name="permissions" options={{ title: 'Access', tabBarIcon: ({ color, size }) => <ShieldCheck color={color} size={size} strokeWidth={1.8} /> }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  scene: { backgroundColor: '#000000' },
  tabBar: {
    backgroundColor: '#050608',
    borderTopColor: '#151920',
    height: 74,
    paddingTop: 9,
    paddingBottom: 10,
  },
  tabLabel: { fontSize: 11, letterSpacing: 0.4 },
});
