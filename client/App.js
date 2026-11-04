import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';

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
import LearnersScreen from './screens/Teacher/LearnersScreen';
import LearnerDetailsScreen from './screens/Teacher/LearnerDetailsScreen';
import TeacherGapsScreen from './screens/Teacher/TeacherGapsScreen';
import TeacherReportsScreen from './screens/Teacher/TeacherReportsScreen';
import TeacherSettingsScreen from './screens/Teacher/TeacherSettingsScreen';
import AssignPracticeScreen from './screens/Teacher/AssignPracticeScreen';
import PracticeAssignedScreen from './screens/Teacher/PracticeAssignedScreen';
import GapDetailsScreen from './screens/Teacher/GapDetailsScreen';
import CreateGroupScreen from './screens/Teacher/CreateGroupScreen';
import SchoolClassesSettingsScreen from './screens/Teacher/SchoolClassesSettingsScreen';
import AccountPasswordSettingsScreen from './screens/Teacher/AccountPasswordSettingsScreen';
import PrivacySettingsScreen from './screens/Teacher/PrivacySettingsScreen';
import HelpSupportSettingsScreen from './screens/Teacher/HelpSupportSettingsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
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
            <Stack.Screen name="TeacherLearners" component={LearnersScreen} />
            <Stack.Screen name="TeacherLearnerDetails" component={LearnerDetailsScreen} />
            <Stack.Screen name="TeacherGaps" component={TeacherGapsScreen} />
            <Stack.Screen name="TeacherReports" component={TeacherReportsScreen} />
            <Stack.Screen name="TeacherSettings" component={TeacherSettingsScreen} />
            <Stack.Screen name="AssignPractice" component={AssignPracticeScreen} />
            <Stack.Screen name="PracticeAssigned" component={PracticeAssignedScreen} />
            <Stack.Screen name="GapDetails" component={GapDetailsScreen} />
            <Stack.Screen name="CreateGroup" component={CreateGroupScreen} />
            <Stack.Screen name="SchoolClassesSettings" component={SchoolClassesSettingsScreen} />
            <Stack.Screen name="AccountPasswordSettings" component={AccountPasswordSettingsScreen} />
            <Stack.Screen name="PrivacySettings" component={PrivacySettingsScreen} />
            <Stack.Screen name="HelpSupportSettings" component={HelpSupportSettingsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </LanguageProvider>
    </AuthProvider>
  );
}