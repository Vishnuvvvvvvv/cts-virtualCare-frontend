import React from 'react';
import { Button, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Text style={styles.headerText}>Virtual Care</Text>
        <View style={styles.profileDetails}>
          <Text style={styles.profileText}>Name: John David</Text>
          <Text style={styles.profileText}>Age: 54 years</Text>
          <Text style={styles.profileText}>Gender: Male</Text>
          <Image
            source={{ uri: 'https://via.placeholder.com/50' }} // Replace with icon URL
            style={styles.profileImage}
          />
        </View>
      </View>

      {/* Today's Reminder Section */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Today's Reminder</Text>
        <View style={styles.remindersContainer}>
          <TouchableOpacity style={styles.reminderButton}>
            <Text>Daily Medicine</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.reminderButton}>
            <Text>Daily Diet</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.reminderButton}>
            <Text>Checkup</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Monitor Health Section */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Monitor Health</Text>
        <View style={styles.monitorContainer}>
          <TouchableOpacity style={styles.monitorButton}>
            <Text>Medications</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.monitorButton}>
            <Text>Health Report</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.monitorButton}>
            <Text>Test Dates</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.monitorButton}>
            <Text>Exercise</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  profileDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
  },
  profileText: {
    fontSize: 16,
    color: '#333',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  remindersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  reminderButton: {
    width: '30%',
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  monitorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  monitorButton: {
    width: '45%',
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 10,
  },
});
