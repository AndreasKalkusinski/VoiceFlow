import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { GlassCard } from './GlassCard';
import { useTheme } from '../hooks/useTheme';
import * as Haptics from 'expo-haptics';
import { hp, spacing, fontSizes } from '../utils/responsive';

interface ModelOption {
  id: string;
  name: string;
  description?: string;
}

interface ModelDropdownProps {
  label: string;
  value: string;
  options: ModelOption[];
  onValueChange: (value: string) => void;
  loading?: boolean;
  placeholder?: string;
}

export const ModelDropdown: React.FC<ModelDropdownProps> = ({
  label,
  value,
  options,
  onValueChange,
  loading = false,
  placeholder = 'Select a model',
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { colors, isDark } = useTheme();

  const selectedOption = options.find((opt) => opt.id === value);

  const handleSelect = (optionId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onValueChange(optionId);
    setModalVisible(false);
  };

  const openModal = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.textSecondary }]}>{label}</Text>

      <TouchableOpacity onPress={openModal} disabled={loading}>
        <GlassCard style={styles.dropdownButton}>
          <View style={styles.dropdownContent}>
            {loading ? (
              <ActivityIndicator size="small" color={colors.primary} />
            ) : (
              <>
                <Text style={[styles.selectedText, { color: colors.text }]}>
                  {selectedOption?.name || value || placeholder}
                </Text>
                <Text style={[styles.arrow, { color: colors.textSecondary }]}>▼</Text>
              </>
            )}
          </View>
        </GlassCard>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <BlurView
              intensity={80}
              tint={isDark ? 'dark' : 'light'}
              style={StyleSheet.absoluteFillObject}
            />

            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>{label}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={[styles.closeButton, { color: colors.primary }]}>✕</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={options}
              keyExtractor={(item) => item.id}
              style={styles.optionsList}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleSelect(item.id)}
                  style={[
                    styles.optionItem,
                    item.id === value && [
                      styles.selectedOption,
                      { backgroundColor: colors.primary + '20' },
                    ],
                  ]}
                >
                  <View>
                    <Text
                      style={[
                        styles.optionText,
                        { color: colors.text },
                        item.id === value && { color: colors.primary, fontWeight: '600' },
                      ]}
                    >
                      {item.name}
                    </Text>
                    {item.description && (
                      <Text style={[styles.optionDescription, { color: colors.textSecondary }]}>
                        {item.description}
                      </Text>
                    )}
                  </View>
                  {item.id === value && (
                    <Text style={[styles.checkmark, { color: colors.primary }]}>✓</Text>
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: fontSizes.small,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  dropdownButton: {
    padding: spacing.sm,
  },
  dropdownContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedText: {
    fontSize: fontSizes.medium,
    flex: 1,
  },
  arrow: {
    fontSize: fontSizes.small,
    marginLeft: spacing.xs,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: hp(70),
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalTitle: {
    fontSize: fontSizes.large,
    fontWeight: '700',
  },
  closeButton: {
    fontSize: fontSizes.xl,
    fontWeight: '600',
  },
  optionsList: {
    paddingBottom: spacing.xl,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  selectedOption: {
    borderLeftWidth: 3,
    borderLeftColor: '#6366F1',
  },
  optionText: {
    fontSize: fontSizes.medium,
    marginBottom: spacing.xs / 2,
  },
  optionDescription: {
    fontSize: fontSizes.tiny,
  },
  checkmark: {
    fontSize: fontSizes.large,
    fontWeight: '700',
  },
});
