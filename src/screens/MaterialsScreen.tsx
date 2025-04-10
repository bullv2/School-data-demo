import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { translations } from '../i18n/translations';

// Mock data for educational materials
const mockMaterials = {
  subjects: [
    {
      id: '1',
      name: 'Mathematics',
      materials: [
        { id: '1', title: 'Algebra Basics', type: 'PDF', size: '2.3 MB' },
        { id: '2', title: 'Geometry Formulas', type: 'PDF', size: '1.8 MB' },
        { id: '3', title: 'Calculus Introduction', type: 'Video', size: '45 MB' }
      ]
    },
    {
      id: '2',
      name: 'Science',
      materials: [
        { id: '4', title: 'Physics Laws', type: 'PDF', size: '3.1 MB' },
        { id: '5', title: 'Chemistry Lab Guide', type: 'PDF', size: '4.2 MB' },
        { id: '6', title: 'Biology Notes', type: 'Document', size: '1.5 MB' }
      ]
    },
    {
      id: '3',
      name: 'Literature',
      materials: [
        { id: '7', title: 'Shakespeare Collection', type: 'PDF', size: '5.6 MB' },
        { id: '8', title: 'Poetry Analysis', type: 'Document', size: '900 KB' },
        { id: '9', title: 'Essay Writing Guide', type: 'PDF', size: '2.1 MB' }
      ]
    }
  ]
};

// Mock data for video library
const mockVideos = [
  {
    id: '1',
    title: 'Introduction to Calculus',
    subject: 'Mathematics',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80',
    duration: '45:00',
    instructor: 'Dr. Smith',
    description: 'Fundamental concepts of calculus and their applications.'
  },
  {
    id: '2',
    title: 'Physics Laws in Action',
    subject: 'Science',
    thumbnail: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800&q=80',
    duration: '38:15',
    instructor: 'Prof. Johnson',
    description: 'Demonstration of key physics laws with real-world examples.'
  },
  {
    id: '3',
    title: 'English Literature Classics',
    subject: 'Literature',
    thumbnail: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&q=80',
    duration: '42:30',
    instructor: 'Ms. Williams',
    description: 'Analysis of classic literary works and their themes.'
  }
];

const MaterialsScreen = () => {
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);
  const t = translations.en.materials; // Use English translations for now

  const toggleSubject = (subjectId: string) => {
    setExpandedSubject(expandedSubject === subjectId ? null : subjectId);
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'PDF':
        return 'document-text';
      case 'Video':
        return 'videocam';
      default:
        return 'document';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Educational Materials</Text>
      {mockMaterials.subjects.map((subject) => (
        <View key={subject.id} style={styles.subjectContainer}>
          <TouchableOpacity
            style={styles.subjectHeader}
            onPress={() => toggleSubject(subject.id)}
          >
            <Text style={styles.subjectName}>{subject.name}</Text>
            <Ionicons
              name={expandedSubject === subject.id ? 'chevron-up' : 'chevron-down'}
              size={24}
              color="#666"
            />
          </TouchableOpacity>
          
          {expandedSubject === subject.id && (
            <View style={styles.materialsContainer}>
              {subject.materials.map((material) => (
                <TouchableOpacity
                  key={material.id}
                  style={styles.materialItem}
                  onPress={() => {/* Handle material selection */}}
                >
                  <View style={styles.materialInfo}>
                    <Ionicons
                      name={getFileIcon(material.type)}
                      size={24}
                      color="#4a90e2"
                      style={styles.materialIcon}
                    />
                    <View>
                      <Text style={styles.materialTitle}>{material.title}</Text>
                      <Text style={styles.materialMeta}>
                        {material.type} • {material.size}
                      </Text>
                    </View>
                  </View>
                  <Ionicons name="download-outline" size={24} color="#666" />
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      ))}
      
      {/* Video Library Section */}
      <View style={styles.videoSection}>
        <Text style={styles.videoHeader}>{t.videoLibrary}</Text>
        {mockVideos.map((video) => (
          <View key={video.id} style={styles.videoCard}>
            <Image
              source={{ uri: video.thumbnail }}
              style={styles.thumbnail}
              resizeMode="cover"
            />
            <View style={styles.videoInfo}>
              <Text style={styles.videoTitle}>{video.title}</Text>
              <View style={styles.videoMeta}>
                <View style={styles.metaItem}>
                  <Ionicons name="book-outline" size={16} color="#666" />
                  <Text style={styles.metaText}>{video.subject}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Ionicons name="time-outline" size={16} color="#666" />
                  <Text style={styles.metaText}>{video.duration}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Ionicons name="person-outline" size={16} color="#666" />
                  <Text style={styles.metaText}>{video.instructor}</Text>
                </View>
              </View>
              <Text style={styles.videoDescription} numberOfLines={2}>
                {video.description}
              </Text>
              <TouchableOpacity style={styles.watchButton}>
                <Text style={styles.watchButtonText}>{t.watchNow}</Text>
                <Ionicons name="play-circle-outline" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  subjectContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  subjectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  subjectName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  materialsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  materialItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  materialInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  materialIcon: {
    marginRight: 12,
  },
  materialTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  materialMeta: {
    fontSize: 14,
    color: '#666',
  },
  videoSection: {
    marginTop: 24,
  },
  videoHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  videoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  thumbnail: {
    width: '100%',
    height: 200,
    backgroundColor: '#f0f0f0',
  },
  videoInfo: {
    padding: 16,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  videoMeta: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metaText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  videoDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  watchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4a90e2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  watchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
});

export default MaterialsScreen; 