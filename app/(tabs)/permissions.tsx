import { router } from 'expo-router';
import { Bell, BatteryCharging, ChevronLeft, ChevronRight, ExternalLink, Info, Smartphone, Wrench } from 'lucide-react-native';
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const permissionItems = [
  { icon: Bell, title: 'Notifications', description: 'Show charging status and controls in notifications.', status: 'Available', color: '#35C784' },
  { icon: Smartphone, title: 'Show over lock screen', description: 'Android may allow the display activity above the lock screen.', status: 'Device dependent', color: '#4FC9F4' },
  { icon: BatteryCharging, title: 'Battery optimization', description: 'Unrestricted background activity can improve automatic start reliability.', status: 'Review needed', color: '#F3A83B' },
  { icon: Wrench, title: 'Manufacturer startup', description: 'Some phones require a separate auto-start setting after reboot.', status: 'Check device', color: '#A39BAE' },
];

export default function PermissionsScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}><Pressable onPress={() => router.back()} style={styles.back}><ChevronLeft color="#F4F7FA" size={24} /></Pressable><View style={styles.headerCopy}><Text style={styles.kicker}>DEVICE ACCESS</Text><Text style={styles.title}>Permissions</Text></View></View>
      <Text style={styles.intro}>The display reads battery information locally. Android decides whether it can appear while the phone is locked.</Text>
      <View style={styles.list}>{permissionItems.map(({ icon: Icon, title, description, status, color }) => <View style={styles.permissionCard} key={title}><View style={styles.iconCircle}><Icon color="#EFF3F8" size={20} strokeWidth={1.8} /></View><View style={styles.copy}><Text style={styles.permissionTitle}>{title}</Text><Text style={styles.description}>{description}</Text></View><View style={[styles.statusPill, { backgroundColor: `${color}18` }]}><View style={[styles.statusDot, { backgroundColor: color }]} /><Text style={[styles.statusText, { color }]}>{status}</Text></View><ChevronRight color="#808A98" size={18} /></View>)}</View>
      <Pressable style={styles.openButton} onPress={() => Linking.openSettings()}><ExternalLink color="#E9F1FA" size={18} /><Text style={styles.openButtonText}>Open system settings</Text></Pressable>
      <View style={styles.warning}><Info color="#AFC4E2" size={22} /><Text style={styles.warningText}>Some phones stop third-party screens while locked. If that happens, use your phone's built-in Always-On Display as the fallback.</Text></View>
      <View style={styles.limitations}><Text style={styles.limitTitle}>What this app can and cannot do</Text><Text style={styles.limitText}>This Expo build can read live battery state and show the charging screen while the app is open. A true Android lock-screen charging mode needs a native Android Activity and foreground service, which are not part of this starter project yet.</Text></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' }, content: { padding: 18, paddingBottom: 40 }, header: { flexDirection: 'row', alignItems: 'center', paddingTop: 17, paddingBottom: 22 }, back: { width: 40, height: 40, justifyContent: 'center' }, headerCopy: { marginLeft: 13 }, kicker: { color: '#65707E', fontSize: 10, letterSpacing: 2, fontWeight: '600' }, title: { color: '#F5F7FA', fontSize: 27, fontWeight: '500', marginTop: 5 }, intro: { color: '#8994A3', fontSize: 13, lineHeight: 20, marginBottom: 19, paddingHorizontal: 4 }, list: { gap: 9 }, permissionCard: { minHeight: 112, backgroundColor: '#0C0F13', borderRadius: 20, padding: 15, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#171C22' }, iconCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#282C34', alignItems: 'center', justifyContent: 'center' }, copy: { flex: 1, marginHorizontal: 12 }, permissionTitle: { color: '#E9EDF2', fontSize: 15, marginBottom: 7 }, description: { color: '#8993A1', fontSize: 12, lineHeight: 17 }, statusPill: { position: 'absolute', right: 13, top: 14, borderRadius: 14, paddingHorizontal: 8, paddingVertical: 5, flexDirection: 'row', alignItems: 'center', gap: 5 }, statusDot: { width: 6, height: 6, borderRadius: 3 }, statusText: { fontSize: 10, fontWeight: '600' }, openButton: { height: 54, marginTop: 24, borderRadius: 28, borderWidth: 1, borderColor: '#6B7889', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 10 }, openButtonText: { color: '#E9EEF5', fontSize: 15, fontWeight: '600' }, warning: { marginTop: 24, borderRadius: 18, backgroundColor: '#111923', padding: 17, flexDirection: 'row', gap: 12 }, warningText: { color: '#B6C4D8', fontSize: 13, lineHeight: 19, flex: 1 }, limitations: { marginTop: 24, padding: 3 }, limitTitle: { color: '#DCE5EF', fontSize: 14, fontWeight: '600', marginBottom: 8 }, limitText: { color: '#748090', fontSize: 12, lineHeight: 18 },
});
