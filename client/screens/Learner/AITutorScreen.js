import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const COLORS = {
  primary: '#2D8060',
  darkGreen: '#205B46',
  background: '#F7F9F7',
  white: '#FFFFFF',
  heading: '#26372F',
  body: '#718078',
  border: '#DDE7E0',
  lightGreen: '#E7F4EC',
  mutedGreen: '#EFF3F0',
};

const initialMessages = [
  {
    id: '1',
    text: "Hi Naledi! 👋 Let's explore fractions. What would you like to understand?",
    sender: 'ai',
    time: '09:41',
  },
  {
    id: '2',
    text: 'Why is 1/2 the same as 2/4?',
    sender: 'user',
    time: '09:41',
  },
  {
    id: '3',
    text:
      "Great question! Cut each half into two.\nYou now have 4 pieces, and 2 are shaded. The amount hasn't changed.\n\nWhat if we cut each half into 3?",
    sender: 'ai',
    time: '09:42',
  },
];

export default function AITutorScreen({ navigation, route }) {
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const scrollViewRef = useRef(null);

  const currentLesson =
    route?.params?.lesson || 'Equivalent fractions';

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const sendMessage = (text = inputText) => {
    const trimmedText = text.trim();

    if (!trimmedText) return;

    const newMessage = {
      id: `${Date.now()}`,
      text: trimmedText,
      sender: 'user',
      time: getCurrentTime(),
    };

    setMessages((previousMessages) => [
      ...previousMessages,
      newMessage,
    ]);

    setInputText('');

    // The message appears in the chat.
    // Connect this function to your AI backend to generate a reply.
  };

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  const renderMessage = (message) => {
    const isUser = message.sender === 'user';

    return (
      <View
        key={message.id}
        style={[
          styles.messageRow,
          isUser && styles.userMessageRow,
        ]}
      >
        <View
          style={[
            styles.messageBubble,
            isUser
              ? styles.userBubble
              : styles.aiBubble,
          ]}
        >
          <Text
            style={[
              styles.messageText,
              isUser && styles.userMessageText,
            ]}
          >
            {message.text}
          </Text>

          <Text
            style={[
              styles.messageTime,
              isUser && styles.userMessageTime,
            ]}
          >
            {message.time}
          </Text>
        </View>
      </View>
    );
  };

  const handleSuggestion = (suggestion) => {
    sendMessage(suggestion);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.background}
      />

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>
              A LITTLE HELP, A LOT OF POSSIBILITY
            </Text>

            <Text style={styles.headerTitle}>
              Your AI Tutor
            </Text>
          </View>

          <TouchableOpacity
            style={styles.moreButton}
            onPress={() => {
              // Add chat settings or clear-chat options here.
            }}
          >
            <Ionicons
              name="ellipsis-horizontal"
              size={22}
              color={COLORS.body}
            />
          </TouchableOpacity>
        </View>

        {/* Current lesson */}
        <View style={styles.lessonBanner}>
          <Ionicons
            name="book-outline"
            size={19}
            color={COLORS.primary}
          />

          <View style={styles.lessonInfo}>
            <Text style={styles.lessonEyebrow}>
              YOU'RE LEARNING
            </Text>

            <Text
              style={styles.lessonTitle}
              numberOfLines={1}
            >
              {currentLesson}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              // Dismiss the current lesson context.
            }}
          >
            <Ionicons
              name="close"
              size={17}
              color={COLORS.body}
            />
          </TouchableOpacity>
        </View>

        {/* Language and date */}
        <View style={styles.chatMeta}>
          <TouchableOpacity
            style={styles.languagePill}
            onPress={() => navigation.navigate('Language')}
          >
            <Ionicons
              name="language-outline"
              size={13}
              color={COLORS.primary}
            />

            <Text style={styles.languageText}>
              {selectedLanguage}
            </Text>
          </TouchableOpacity>

          <Text style={styles.dateText}>
            Today · {messages[messages.length - 1]?.time || '09:41'}
          </Text>
        </View>

        {/* Chat messages */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.chatArea}
          contentContainerStyle={styles.chatContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {messages.map(renderMessage)}

          {/* Suggested questions */}
          <View style={styles.suggestionsContainer}>
            <TouchableOpacity
              style={styles.suggestionButton}
              onPress={() => handleSuggestion('Is it 3/6?')}
            >
              <Text style={styles.suggestionText}>
                Is it 3/6?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.suggestionButton}
              onPress={() =>
                handleSuggestion('Explain in isiZulu')
              }
            >
              <Text style={styles.suggestionText}>
                Explain in isiZulu
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Message input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Ask your question..."
            placeholderTextColor={COLORS.body}
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={1000}
            onSubmitEditing={() => sendMessage()}
            blurOnSubmit={false}
          />

          <TouchableOpacity
            style={[
              styles.sendButton,
              !inputText.trim() && styles.sendButtonInactive,
            ]}
            onPress={() => sendMessage()}
            activeOpacity={0.8}
          >
            <Ionicons
              name="arrow-up"
              size={22}
              color={COLORS.white}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.disclaimer}>
          AI can make mistakes. Check important answers.
        </Text>

        {/* Bottom navigation */}
        <View style={styles.bottomNavigation}>
          {[
            { name: 'Home', icon: 'home-outline', route: 'LearnerDashboard' },
            { name: 'Subjects', icon: 'book-outline', route: 'SubjectSelection' },
            { name: 'Tutor', icon: 'sparkles-outline', route: 'AITutor' },
            { name: 'Progress', icon: 'stats-chart-outline', route: 'LearningProgress' },
            { name: 'Profile', icon: 'person-outline', route: 'Profile' },
          ].map((item) => {
            const active = item.name === 'Tutor';

            return (
              <TouchableOpacity
                key={item.name}
                style={styles.navItem}
                onPress={() => {
                  if (!active) {
                    navigation.navigate(item.route);
                  }
                }}
              >
                <View
                  style={[
                    styles.navIcon,
                    active && styles.activeNavIcon,
                  ]}
                >
                  <Ionicons
                    name={item.icon}
                    size={19}
                    color={
                      active ? COLORS.primary : COLORS.body
                    }
                  />
                </View>

                <Text
                  style={[
                    styles.navText,
                    active && styles.activeNavText,
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  container: {
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    paddingTop: 13,
    paddingBottom: 20,
  },

  eyebrow: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.3,
    marginBottom: 3,
  },

  headerTitle: {
    color: COLORS.heading,
    fontSize: 21,
    fontWeight: '800',
  },

  moreButton: {
    padding: 5,
  },

  lessonBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGreen,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginHorizontal: 22,
    gap: 10,
  },

  lessonInfo: {
    flex: 1,
  },

  lessonEyebrow: {
    color: COLORS.primary,
    fontSize: 9,
    fontWeight: '700',
    marginBottom: 3,
  },

  lessonTitle: {
    color: COLORS.heading,
    fontSize: 12,
    fontWeight: '600',
  },

  chatMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 22,
    marginTop: 11,
    marginBottom: 9,
  },

  languagePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGreen,
    borderRadius: 15,
    paddingHorizontal: 9,
    paddingVertical: 5,
    gap: 4,
  },

  languageText: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: '600',
  },

  dateText: {
    color: COLORS.body,
    fontSize: 9,
  },

  chatArea: {
    flex: 1,
  },

  chatContent: {
    paddingHorizontal: 22,
    paddingTop: 1,
    paddingBottom: 12,
  },

  messageRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 11,
  },

  userMessageRow: {
    justifyContent: 'flex-end',
  },

  messageBubble: {
    maxWidth: '94%',
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 9,
    borderRadius: 17,
  },

  aiBubble: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderBottomLeftRadius: 4,
  },

  userBubble: {
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: 4,
  },

  messageText: {
    color: COLORS.heading,
    fontSize: 12,
    lineHeight: 18,
  },

  userMessageText: {
    color: COLORS.white,
  },

  messageTime: {
    color: COLORS.body,
    fontSize: 9,
    textAlign: 'right',
    marginTop: 7,
  },

  userMessageTime: {
    color: '#DDEFE5',
  },

  suggestionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 1,
    marginBottom: 6,
  },

  suggestionButton: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 18,
    paddingHorizontal: 11,
    paddingVertical: 8,
    backgroundColor: COLORS.white,
  },

  suggestionText: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: '600',
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 15,
    marginHorizontal: 22,
    paddingLeft: 12,
    paddingRight: 5,
    minHeight: 49,
    maxHeight: 110,
  },

  textInput: {
    flex: 1,
    color: COLORS.heading,
    fontSize: 12,
    paddingTop: 10,
    paddingBottom: 10,
    maxHeight: 90,
  },

  sendButton: {
    width: 39,
    height: 39,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },

  sendButtonInactive: {
    opacity: 0.9,
  },

  disclaimer: {
    color: COLORS.body,
    fontSize: 9,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 12,
  },

  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 8 : 10,
  },

  navItem: {
    flex: 1,
    alignItems: 'center',
  },

  navIcon: {
    width: 38,
    height: 25,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  activeNavIcon: {
    backgroundColor: COLORS.lightGreen,
  },

  navText: {
    color: COLORS.body,
    fontSize: 9,
    marginTop: 3,
  },

  activeNavText: {
    color: COLORS.darkGreen,
    fontWeight: '800',
  },
});
