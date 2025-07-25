import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import {useState} from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { styles } from '../../assets/styles/auth.styles.js' 
import {Ionicons} from '@expo/vector-icons'
import { COLORS } from '../../constants/colors.js'

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        console.log('Sign-in not complete:', signInAttempt)
        setError("Sign-in not complete. Please check your credentials or follow the next steps.")
      }
    } catch (err) {
      if(err.errors?.[0].code === "form_password_incorrect") {
        setError("Incorrect password. Please try again.")
      } else {
        setError("An error occurred while signing in. Please try again.")
      }
    }
  }

  return (
    <KeyboardAwareScrollView 
        style={{flex: 1}}
        contentContainerStyle={{flexGrow: 1}}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        extraScrollHeight={30}
    >
      <View style={styles.container}>
        <Image 
          source={require('../../assets/images/revenue-i4.png')}
          style={styles.illustration}
        />
        <Text style={styles.title}>Welcome Back</Text>

        { error ? 
        <View style={styles.errorBox}>
            <Ionicons name="alert-circle" size={20} color={COLORS.expense} />
            <Text style={styles.errorText}>{error || "Something went wrong"}</Text>
            <TouchableOpacity onPress={() => setError("")}> 
                <Ionicons name="close" size={20} color={COLORS.textLight} />
            </TouchableOpacity>
        </View>
        : null
        }
        <TextInput
          style={[styles.input, error && styles.errorInput]}
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter email"
          placeholderTextColor="#9A8478"
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        />
        <TextInput
          style={[styles.input, error && styles.errorInput]}
          value={password}
          placeholder="Enter password"
          secureTextEntry={true}
          placeholderTextColor="#9A8478"
          onChangeText={(password) => setPassword(password)}
        />
        <TouchableOpacity style={styles.button} onPress={onSignInPress}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Don&apos;t have an accout?</Text>
            <Link href="/sign-up" asChild>
              <TouchableOpacity>
                <Text style={styles.linkText}>Sign Up</Text >
              </TouchableOpacity>
            </Link>
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}