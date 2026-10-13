import { router } from 'expo-router';
import { ChevronRight, Info, Moon, SlidersHorizontal } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';

export default function SettingsScreen() {
  const [displayEnabled, setDisplayEnabled] = useState(true);
  const [startOnCharge, setStartOnCharge] = useState(true);
  const [stopOnDisconnect, setStopOnDisconnect] = useState(true);
  const [showPercentage, setShowPercentage] = useState(true);
  const [intensity, setIntensity] = useState('Medium');
  const [brightness, setBrightness] = useState(20);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View><Text style={styles.kicker}>CONTROL ROOM</Text><Text style={styles.title}>Settings</Text></View>
        <SlidersHorizontal color="#8A96A5" size={22} strokeWidth={1.7} />
      </View>
      <Text style={styles.sectionLabel}>DISPLAY BEHAVIOR</Text>
      <View style={styles.card}>
        <SettingRow label="Enable charging display" value={displayEnabled} onChange={setDisplayEnabled} />
        <SettingRow label="Start when charging begins" value={startOnCharge} onChange={setStartOnCharge} />
        <SettingRow label="Stop when charger disconnects" value={stopOnDisconnect} onChange={setStopOnDisconnect} />
        <SettingRow label="Show battery percentage" value={showPercentage} onChange={setShowPercentage} last />
      </View>
      <Text style={styles.sectionLabel}>PRESENTATION</Text>
      <View style={styles.card}>
        <Text style={styles.fieldLabel}>Animation intensity</Text>
        <View style={styles.segmented}>{['Low', 'Medium', 'High'].map((option) => <Pressable key={option} onPress={() => setIntensity(option)} style={[styles.segment, intensity === option && styles.segmentActive]}><Text style={[styles.segmentText, intensity === option && styles.segmentTextActive]}>{option}</Text></Pressable>)}</View>
        <View style={styles.brightnessHeader}><Text style={styles.fieldLabel}>Screen brightness</Text><Text style={styles.brightnessValue}>{brightness}%</Text></View>
        <View style={styles.sliderTrack}><View style={[styles.sliderFill, { width: `${brightness}%` }]} /><Pressable style={[styles.sliderThumb, { left: `${brightness}%` }]} onPress={() => setBrightness((value) => value >= 80 ? 10 : value + 10)} /></View>
      </View>
      <Pressable style={styles.permissionsRow} onPress={() => router.push('/permissions')}><View style={styles.permissionIcon}><Moon color="#8BCFFF" size={18} /></View><View style={styles.permissionCopy}><Text style={styles.permissionTitle}>Lock-screen access</Text><Text style={styles.permissionDescription}>Review Android display permissions</Text></View><ChevronRight color="#87909D" size={19} /></Pressable>
      <View style={styles.note}><Info color="#8FA7C5" size={19} /><Text style={styles.noteText}>A lit screen uses power even on black. Brightness and animation are kept intentionally low.</Text></View>
      <Pressable style={styles.startButton} onPress={() => router.replace('/')}><Text style={styles.startButtonText}>View charging display</Text></Pressable>
    </ScrollView>
  );
}

function SettingRow({ label, value, onChange, last = false }: { label: string; value: boolean; onChange: (value: boolean) => void; last?: boolean }) {
  return <View style={[styles.row, !last && styles.rowBorder]}><Text style={styles.rowLabel}>{label}</Text><Switch value={value} onValueChange={onChange} trackColor={{ false: '#2A3038', true: '#287EA9' }} thumbColor={value ? '#C7E9FF' : '#78818C'} /> </View>;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' }, content: { padding: 24, paddingBottom: 38 }, header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 18, paddingBottom: 32 }, kicker: { color: '#65707E', fontSize: 10, letterSpacing: 2.1, fontWeight: '600' }, title: { color: '#F5F7FA', fontSize: 28, fontWeight: '500', marginTop: 7 }, sectionLabel: { color: '#65707E', fontSize: 10, letterSpacing: 1.8, marginBottom: 11, marginTop: 7 }, card: { backgroundColor: '#0C0F13', borderRadius: 22, paddingHorizontal: 16, paddingVertical: 5, borderWidth: 1, borderColor: '#171C22', marginBottom: 28 }, row: { minHeight: 58, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, rowBorder: { borderBottomWidth: 1, borderBottomColor: '#20252C' }, rowLabel: { color: '#E5E9EF', fontSize: 15 }, fieldLabel: { color: '#9EA8B6', fontSize: 14, marginTop: 13, marginBottom: 14 }, segmented: { flexDirection: 'row', backgroundColor: '#181D24', borderRadius: 14, padding: 3 }, segment: { flex: 1, height: 41, alignItems: 'center', justifyContent: 'center', borderRadius: 11 }, segmentActive: { backgroundColor: '#75BDF5' }, segmentText: { color: '#929CAA', fontSize: 13 }, segmentTextActive: { color: '#06121D', fontWeight: '600' }, brightnessHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 13 }, brightnessValue: { color: '#C4CBD5', fontSize: 14 }, sliderTrack: { height: 5, backgroundColor: '#303740', borderRadius: 4, marginBottom: 20, position: 'relative' }, sliderFill: { height: 5, backgroundColor: '#65B8F2', borderRadius: 4 }, sliderThumb: { width: 22, height: 22, borderRadius: 11, backgroundColor: '#75BDF5', position: 'absolute', top: -8, marginLeft: -11 }, permissionsRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0C0F13', borderRadius: 18, padding: 17, borderWidth: 1, borderColor: '#171C22' }, permissionIcon: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#132432', alignItems: 'center', justifyContent: 'center' }, permissionCopy: { flex: 1, marginLeft: 13 }, permissionTitle: { color: '#E8ECF2', fontSize: 15, marginBottom: 4 }, permissionDescription: { color: '#818B99', fontSize: 12 }, note: { flexDirection: 'row', gap: 11, backgroundColor: '#101720', borderRadius: 17, padding: 16, marginTop: 20 }, noteText: { color: '#AAB9CC', fontSize: 12, lineHeight: 18, flex: 1 }, startButton: { marginTop: 22, height: 53, backgroundColor: '#76BFF7', borderRadius: 27, alignItems: 'center', justifyContent: 'center' }, startButtonText: { color: '#07111A', fontSize: 15, fontWeight: '700' },
});
