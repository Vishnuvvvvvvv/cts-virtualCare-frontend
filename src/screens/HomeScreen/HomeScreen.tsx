import React from 'react';
import { Button, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
const HomeScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Virtual Care</Text>
        <View style={styles.circle}></View>
      </View>

      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <View style={styles.profileDetails}>
          <Image
            source={{ uri: 'https://via.placeholder.com/80' }} // Replace with profile image URL
            style={styles.profileImageLarge}
          />
          <View>
            <Text style={styles.profileText}>Name: John David</Text>
            <Text style={styles.profileText}>Age: 54 years</Text>
            <Text style={styles.profileText}>Gender: Male</Text>
          </View>
        </View>
      </View>

      {/* Today's Reminder Section */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Today's Reminder</Text>
        <ScrollView contentContainerStyle={styles.remindersContainer} horizontal={true}>
        
          <TouchableOpacity style={styles.reminderButton}>
            <Image
              source={{ uri: 'https://via.placeholder.com/50' }}
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Daily Medicine</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.reminderButton}>
            <Image
              source={{ uri: 'https://via.placeholder.com/50' }}
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Daily Diet</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.reminderButton}>
            <Image
              source={{ uri: 'https://via.placeholder.com/50' }}
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Checkup</Text>
          </TouchableOpacity>
          </ScrollView>
        
      </View>
      
      {/* Monitor Health Section */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Monitor Health</Text>
        <View style={styles.monitorContainer}>
          <TouchableOpacity style={styles.monitorButton}>
            <Image
              source={{ uri: 'https://via.placeholder.com/50' }}
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Medications</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.monitorButton}>
            <Image
              source={{ uri: 'https://via.placeholder.com/50' }}
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Health Report</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.monitorButton}>
            <Image
              source={{ uri: 'https://via.placeholder.com/50' }}
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Test Dates</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.monitorButton}>
            <Image
              source={{ uri: 'https://via.placeholder.com/50' }}
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Exercise</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff', 
    flexGrow: 1,  
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1, 
    borderBottomColor: '#000', 
    paddingBottom: 10, 
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5a3d8e',
  },
  circle: {
    width: 25,
    height: 25,
    borderRadius: 25,
    backgroundColor: '#5a3d8e',  // Purple circle
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#E6D7FF',
    borderRadius: 10,
    padding: 15,
  },
  profileDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  profileText: {
    fontSize: 16,
    color: '#5a3d8e',
  },
  profileImageLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
    borderColor: '#E6D7FF',
    borderWidth: 2,
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#E6D7FF',
    borderRadius: 10,
    padding: 15,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5a3d8e',
    marginBottom: 10,
  },
  remindersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  reminderButton: {
    width: '30%',
    alignItems: 'center',
    backgroundColor: '#c2a7d6',
    borderRadius: 10,
    padding: 10,
  },
  buttonText: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    marginTop: 5,
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#e6d7f9',
  },
  monitorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  monitorButton: {
    width: '45%',
    alignItems: 'center',
    backgroundColor: '#c2a7d6',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
});

