import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './context/AuthContext';

//Auth Navigation
import SplashScreen from './screens/Auth/SplashScreen';
import WelcomeScreen from './screens/Auth/WelcomeScreen';
import LoginScreen from './screens/Auth/LoginScreen';
import RegisterScreen from './screens/Auth/RegistrationScreen';
import LanguageScreen from './screens/Auth/LanguageScreen';

//Learner Navigation
import DashboardScreen from './screens/Learner/LearnerDashboad';
import SubjectSelectionScreen from './screens/Learner/SubjectSelectionScreen';
import LessonDetailsScreen from './screens/Learner/LessonDetailsScreen';
import LessonLearningScreen from './screens/Learner/LessonLearningScreen';
import AITutorScreen from './screens/Learner/AITutorScreen';
import QuizIntroductionScreen from './screens/Learner/QuizIntroductonScreen';
import QuizQuestionsScreen from './screens/Learner/QuizQuestionsScreen';
import QuizResultsScreen from './screens/Learner/QuizResultsScreen';
import QuizReviewScreen from './screens/Learner/QuizReviewScreen';
import LearningProgressScreen from './screens/Learner/LearningProgressScreen';
import LearningGapDetailsScreen from './screens/Learner/LearningGapDetailsScreen';
import ProfileScreen from './screens/Learner/ProfileScreen';
import SettingsScreen from './screens/Learner/SettingsScreen';

//Teacher Navigation
import TeacherDashboardScreen from './screens/Teacher/TeacherDashboardScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
            animation: 'fade',
            contentStyle: {
              backgroundColor: '#F7F9F7',
            },
          }}
        >
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Language" component={LanguageScreen} />

          <Stack.Screen name="LearnerDashboard" component={DashboardScreen} />
          <Stack.Screen name="SubjectSelection" component={SubjectSelectionScreen} />
          <Stack.Screen name="LessonDetails" component={LessonDetailsScreen} />
          <Stack.Screen name="LessonLearning" component={LessonLearningScreen} />
          <Stack.Screen name="QuizIntroduction" component={QuizIntroductionScreen} />
          <Stack.Screen name="QuizQuestions" component={QuizQuestionsScreen} />
          <Stack.Screen name="QuizResults" component={QuizResultsScreen} />
          <Stack.Screen name="QuizReview" component={QuizReviewScreen} />
          <Stack.Screen name="AITutor" component={AITutorScreen} />
          <Stack.Screen name="LearningProgress" component={LearningProgressScreen} />
          <Stack.Screen name="LearningGapDetails" component={LearningGapDetailsScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />

          <Stack.Screen name="TeacherDashboard" component={TeacherDashboardScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

