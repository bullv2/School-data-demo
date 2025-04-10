import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { mockParentData } from '../services/mockData';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NotificationPosition } from '../navigation/types';

interface NotificationPanelProps {
  visible: boolean;
  onClose: () => void;
  position?: NotificationPosition;
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({ 
  visible, 
  onClose,
  position 
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const scaleAnim = React.useRef(new Animated.Value(0)).current;
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();
  const { height, width } = Dimensions.get('window');

  useEffect(() => {
    if (visible) {
      setIsMounted(true);
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setIsMounted(false);
      });
    }
  }, [visible]);

  if (!visible && !isMounted) return null;

  const getTransformOrigin = () => {
    if (!position) return { x: width, y: 0 };
    return {
      x: position.x + position.width / 2,
      y: position.y + position.height / 2
    };
  };

  const origin = getTransformOrigin();

  return (
    <>
      <Animated.View 
        style={[
          styles.overlay,
          {
            opacity: fadeAnim,
          }
        ]}
        pointerEvents={visible ? "auto" : "none"}
      />
      <Animated.View 
        style={[
          styles.container,
          {
            opacity: fadeAnim,
            transform: [
              { 
                scale: scaleAnim 
              },
              {
                translateX: scaleAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [origin.x - width / 2, 0]
                })
              },
              {
                translateY: scaleAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [origin.y - height / 2, 0]
                })
              }
            ],
            top: insets.top,
            maxHeight: height * 0.8,
          }
        ]}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Notifications</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>
        
        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {mockParentData.notifications.map((notification, index) => (
            <View 
              key={index} 
              style={[
                styles.notificationItem,
                !notification.read && styles.unreadNotification
              ]}
            >
              <View style={styles.notificationIcon}>
                <Ionicons 
                  name={notification.type === 'academic' ? 'school' : 'alert-circle'} 
                  size={20} 
                  color="#007AFF" 
                />
              </View>
              <View style={styles.notificationContent}>
                <Text style={styles.notificationTitle}>{notification.title}</Text>
                <Text style={styles.notificationMessage}>{notification.message}</Text>
                <Text style={styles.notificationTime}>{notification.time}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: 999,
  },
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 64,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    zIndex: 1000,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
  },
  closeButton: {
    padding: 8,
    marginRight: -8,
  },
  content: {
    flexGrow: 0,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#F2F2F7',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  unreadNotification: {
    backgroundColor: '#E5F2FF',
  },
  notificationIcon: {
    marginRight: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 6,
  },
  notificationMessage: {
    fontSize: 15,
    color: '#666666',
    marginBottom: 8,
    lineHeight: 20,
  },
  notificationTime: {
    fontSize: 13,
    color: '#8E8E93',
    marginTop: 'auto',
  },
}); 