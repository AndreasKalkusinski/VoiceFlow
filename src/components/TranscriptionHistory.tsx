import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  Animated,
  PanResponder,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
import { BlurView } from 'expo-blur';
import { TranscriptionHistoryItem } from '../services/historyStorage';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from 'react-i18next';
import { designTokens } from '../utils/design-system';
import { vh, vw } from '../utils/responsive-dimensions';

interface Props {
  history: TranscriptionHistoryItem[];
  onSelectItem: (item: TranscriptionHistoryItem) => void;
  onDeleteItem: (id: string) => void;
  onClose: () => void;
}

export const TranscriptionHistory: React.FC<Props> = ({
  history,
  onSelectItem,
  onDeleteItem,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { isDark } = useTheme();
  const colors = isDark ? designTokens.colors.dark : designTokens.colors.light;
  const { t } = useTranslation();

  const filteredHistory = history.filter((item) =>
    item.text.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const renderItem = ({ item }: { item: TranscriptionHistoryItem }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const swipeAnim = useRef(new Animated.Value(0)).current;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const panResponder = useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) => {
          return Math.abs(gestureState.dx) > 20;
        },
        onPanResponderMove: (_, gestureState) => {
          if (gestureState.dx < 0) {
            swipeAnim.setValue(Math.max(gestureState.dx, -100));
          }
        },
        onPanResponderRelease: (_, gestureState) => {
          if (gestureState.dx < -50) {
            Animated.timing(swipeAnim, {
              toValue: -100,
              duration: 200,
              useNativeDriver: false,
            }).start();
          } else {
            Animated.timing(swipeAnim, {
              toValue: 0,
              duration: 200,
              useNativeDriver: false,
            }).start();
          }
        },
      }),
    ).current;

    const handleDelete = () => {
      Alert.alert(t('history.deleteTitle'), t('history.deleteMessage'), [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('common.delete'),
          style: 'destructive',
          onPress: () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            onDeleteItem(item.id);
          },
        },
      ]);
    };

    const handleCopy = () => {
      Clipboard.setStringAsync(item.text);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    };

    return (
      <View style={styles.itemContainer}>
        <Animated.View
          style={[
            styles.deleteButton,
            {
              transform: [
                {
                  translateX: swipeAnim.interpolate({
                    inputRange: [-100, 0],
                    outputRange: [0, 100],
                  }),
                },
              ],
            },
          ]}
        >
          <TouchableOpacity onPress={handleDelete} style={styles.deleteButtonInner}>
            <Ionicons name="trash" size={24} color="#fff" />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.itemContent,
            {
              backgroundColor: colors.surface,
              transform: [{ translateX: swipeAnim }],
            },
          ]}
        >
          <TouchableOpacity onPress={() => onSelectItem(item)} style={styles.itemTouchable}>
            <View style={styles.itemHeader}>
              <Text style={[styles.itemDate, { color: colors.textSecondary }]}>
                {item.date} • {new Date(item.timestamp).toLocaleTimeString()}
              </Text>
              {item.source === 'shared' && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>Shared</Text>
                </View>
              )}
            </View>

            <Text style={[styles.itemText, { color: colors.text }]} numberOfLines={3}>
              {item.text}
            </Text>

            <View style={styles.itemActions}>
              <TouchableOpacity onPress={handleCopy} style={styles.actionButton}>
                <Ionicons name="copy-outline" size={18} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <BlurView intensity={80} tint={isDark ? 'dark' : 'light'} style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={[styles.title, { color: colors.text }]}>{t('history.title')}</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={28} color={colors.text} />
          </TouchableOpacity>
        </View>

        <View style={[styles.searchContainer, { backgroundColor: colors.surface }]}>
          <Ionicons name="search" size={20} color={colors.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder={t('history.searchPlaceholder')}
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </BlurView>

      <FlatList
        data={filteredHistory}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="document-text-outline" size={64} color={colors.textSecondary} />
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              {searchQuery ? t('history.noResults') : t('history.empty')}
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: vh(5),
    paddingHorizontal: vw(5),
    paddingBottom: vh(2),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: vh(2),
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  closeButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  listContent: {
    paddingVertical: vh(2),
  },
  itemContainer: {
    marginHorizontal: vw(5),
    marginVertical: vh(1),
    position: 'relative',
  },
  itemContent: {
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  itemTouchable: {
    flex: 1,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemDate: {
    fontSize: 12,
    fontWeight: '500',
  },
  badge: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  itemText: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 8,
  },
  itemActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    padding: 8,
  },
  deleteButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 100,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  deleteButtonInner: {
    backgroundColor: '#EF4444',
    width: 80,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: vh(20),
  },
  emptyText: {
    fontSize: 16,
    marginTop: 16,
  },
});
