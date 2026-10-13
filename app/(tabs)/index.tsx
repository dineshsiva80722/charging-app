import { BatteryState, useBatteryLevel, useBatteryState } from 'expo-battery';
import { router } from 'expo-router';
import { Bolt, ChevronUp, Settings2 } from 'lucide-react-native';
import { useEffect, useMemo, useState } from 'react';
import { Dimensions, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

const { width } = Dimensions.get('window');
const ringSize = Math.min(width - 88, 360);
const radius = ringSize / 2 - 23;
const circumference = 2 * Math.PI * radius;

function formatState(state: BatteryState | null) {
  if (state === BatteryState.CHARGING) return 'CHARGING';
  if (state === BatteryState.FULL) return 'FULL';
  return 'NOT CHARGING';
}

export default function DisplayScreen() {
  const [active, setActive] = useState(true);
  const [percentage, setPercentage] = useState(82);
  const [batteryState, setBatteryState] = useState<BatteryState | null>(null);
  const isCharging = batteryState === BatteryState.CHARGING || batteryState === BatteryState.FULL;
  const dashOffset = circumference - (circumference * percentage) / 100;
  const stateLabel = useMemo(() => formatState(batteryState), [batteryState]);

  return (
    <>
      {Platform.OS !== 'web' && <NativeBatteryMonitor onLevelChange={setPercentage} onStateChange={setBatteryState} onUnknown={() => setActive(false)} />}
      <View style={styles.container}>
      <View style={styles.topBar}>
        <View>
          <Text style={styles.eyebrow}>NIGHT CHARGE</Text>
          <Text style={styles.title}>Charging display</Text>
        </View>
        <Pressable onPress={() => router.push('/settings')} style={styles.iconButton} accessibilityLabel="Open settings">
          <Settings2 color="#A7B0BE" size={20} strokeWidth={1.8} />
        </Pressable>
      </View>

      <View style={styles.displayArea}>
        <View style={styles.ringGlow} />
        <Svg width={ringSize} height={ringSize} style={styles.ring}>
          <Defs>
            <LinearGradient id="ringGradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <Stop offset="0%" stopColor="#5E4BFF" />
              <Stop offset="38%" stopColor="#20D6FF" />
              <Stop offset="72%" stopColor="#FFD079" />
              <Stop offset="100%" stopColor="#B66AFF" />
            </LinearGradient>
          </Defs>
          <Circle cx={ringSize / 2} cy={ringSize / 2} r={radius} stroke="#202B32" strokeWidth={14} fill="none" />
          <Circle
            cx={ringSize / 2}
            cy={ringSize / 2}
            r={radius}
            stroke="url(#ringGradient)"
            strokeWidth={14}
            strokeLinecap="round"
            fill="none"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={dashOffset}
            transform={`rotate(-90 ${ringSize / 2} ${ringSize / 2})`}
          />
        </Svg>
        <View style={styles.centerContent}>
          <Text style={styles.percent}>{percentage}<Text style={styles.percentSymbol}>%</Text></Text>
          <Bolt color={isCharging ? '#FFFFFF' : '#616B78'} fill={isCharging ? '#FFFFFF' : 'transparent'} size={28} strokeWidth={1.8} />
        </View>
      </View>

      <View style={styles.statusBlock}>
        <View style={[styles.statusDot, isCharging && styles.statusDotActive]} />
        <Text style={styles.statusText}>{stateLabel} <Text style={styles.statusDivider}>·</Text> LIVE FROM ANDROID</Text>
      </View>
      <Text style={styles.caption}>{active ? 'Display session ready' : 'Connect a charger to begin'}</Text>

      <View style={styles.bottomControls}>
        <Pressable style={[styles.primaryButton, active && styles.primaryButtonActive]} onPress={() => setActive((value) => !value)}>
          <View style={[styles.buttonDot, active && styles.buttonDotActive]} />
          <Text style={styles.primaryButtonText}>{active ? 'Stop display' : 'Start display'}</Text>
        </Pressable>
        <Pressable style={styles.settingsLink} onPress={() => router.push('/settings')}>
          <ChevronUp color="#7F8998" size={16} />
          <Text style={styles.settingsLinkText}>Swipe up for settings</Text>
        </Pressable>
      </View>
    </View>
    </>
  );
}

function NativeBatteryMonitor({ onLevelChange, onStateChange, onUnknown }: { onLevelChange: (level: number) => void; onStateChange: (state: BatteryState) => void; onUnknown: () => void }) {
  const batteryLevel = useBatteryLevel();
  const batteryState = useBatteryState();

  useEffect(() => {
    if (batteryLevel !== null) onLevelChange(Math.round(batteryLevel * 100));
  }, [batteryLevel, onLevelChange]);

  useEffect(() => {
    if (batteryState === BatteryState.UNKNOWN) onUnknown();
    else onStateChange(batteryState);
  }, [batteryState, onStateChange, onUnknown]);

  return null;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000', paddingHorizontal: 24 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 24 },
  eyebrow: { color: '#65707E', fontSize: 10, letterSpacing: 2.2, fontWeight: '600' },
  title: { color: '#F6F8FB', fontSize: 22, fontWeight: '500', marginTop: 7 },
  iconButton: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#11151A', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#20262E' },
  displayArea: { alignItems: 'center', justifyContent: 'center', flex: 1, minHeight: 390 },
  ring: { position: 'absolute' },
  ringGlow: { position: 'absolute', width: ringSize - 28, height: ringSize - 28, borderRadius: ringSize, backgroundColor: '#08333D', opacity: 0.16 },
  centerContent: { alignItems: 'center', justifyContent: 'center' },
  percent: { color: '#F6F8FB', fontSize: 76, fontWeight: '300', letterSpacing: -4, lineHeight: 86 },
  percentSymbol: { fontSize: 40, letterSpacing: -1 },
  statusBlock: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9 },
  statusDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#5C6571' },
  statusDotActive: { backgroundColor: '#4FC9F4', shadowColor: '#4FC9F4', shadowOpacity: 0.9, shadowRadius: 8 },
  statusText: { color: '#AAB4C2', fontSize: 11, letterSpacing: 1.4 },
  statusDivider: { color: '#45505E' },
  caption: { color: '#566170', textAlign: 'center', marginTop: 12, fontSize: 13 },
  bottomControls: { paddingBottom: 22, paddingTop: 24, alignItems: 'center' },
  primaryButton: { height: 52, width: '100%', borderRadius: 28, borderWidth: 1, borderColor: '#2A323C', backgroundColor: '#090B0E', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 },
  primaryButtonActive: { borderColor: '#244C64', backgroundColor: '#0B1720' },
  buttonDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#68717E' },
  buttonDotActive: { backgroundColor: '#49C9F1' },
  primaryButtonText: { color: '#E6EBF2', fontSize: 15, fontWeight: '600' },
  settingsLink: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 18 },
  settingsLinkText: { color: '#7D8796', fontSize: 12 },
});
