import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Phone, Mail } from 'lucide-react'
import PhoneInput from 'react-phone-number-input'
import { signInWithGoogle, signInWithPhone, verifyOTP } from '@/lib/supabase'
import { useToast } from '@/hooks/use-toast'
import 'react-phone-number-input/style.css'

interface LoginPageProps {
  onSuccess: () => void
}

export const LoginPage = ({ onSuccess }: LoginPageProps) => {
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [otpCode, setOtpCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showOTP, setShowOTP] = useState(false)
  const [error, setError] = useState('')
  const { toast } = useToast()

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    setError('')
    
    try {
      const { error } = await signInWithGoogle()
      if (error) {
        setError(error.message)
      } else {
        toast({
          title: "Success!",
          description: "Redirecting to Google sign-in...",
        })
      }
    } catch (err) {
      setError('Failed to sign in with Google')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePhoneSignIn = async () => {
    if (!phoneNumber) {
      setError('Please enter a valid phone number')
      return
    }

    setIsLoading(true)
    setError('')
    
    try {
      const { error } = await signInWithPhone(phoneNumber)
      if (error) {
        setError(error.message)
      } else {
        setShowOTP(true)
        toast({
          title: "OTP Sent!",
          description: "Check your phone for the verification code.",
        })
      }
    } catch (err) {
      setError('Failed to send OTP')
    } finally {
      setIsLoading(false)
    }
  }

  const handleOTPVerification = async () => {
    if (!otpCode || otpCode.length !== 6) {
      setError('Please enter a valid 6-digit OTP')
      return
    }

    setIsLoading(true)
    setError('')
    
    try {
      const { error } = await verifyOTP(phoneNumber, otpCode)
      if (error) {
        setError(error.message)
      } else {
        toast({
          title: "Welcome!",
          description: "Successfully signed in.",
        })
        onSuccess()
      }
    } catch (err) {
      setError('Failed to verify OTP')
    } finally {
      setIsLoading(false)
    }
  }

  const resetPhoneFlow = () => {
    setShowOTP(false)
    setOtpCode('')
    setError('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Welcome to BookWise
          </CardTitle>
          <CardDescription>
            Learn from the best authors and build better habits
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="google" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="google">Google</TabsTrigger>
              <TabsTrigger value="phone">Phone</TabsTrigger>
            </TabsList>
            
            <TabsContent value="google" className="space-y-4">
              <Button
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full h-12 bg-white hover:bg-gray-50 text-gray-900 border border-gray-300"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                )}
                Continue with Google
              </Button>
            </TabsContent>
            
            <TabsContent value="phone" className="space-y-4">
              {!showOTP ? (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <PhoneInput
                      international
                      countryCallingCodeEditable={false}
                      defaultCountry="US"
                      value={phoneNumber}
                      onChange={(value) => setPhoneNumber(value || '')}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                  <Button
                    onClick={handlePhoneSignIn}
                    disabled={isLoading || !phoneNumber}
                    className="w-full h-12"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <Phone className="w-4 h-4 mr-2" />
                    )}
                    Send OTP
                  </Button>
                </>
              ) : (
                <>
                  <div className="space-y-2 text-center">
                    <label className="text-sm font-medium">Enter OTP</label>
                    <p className="text-xs text-muted-foreground">
                      We sent a code to {phoneNumber}
                    </p>
                    <div className="flex justify-center">
                      <InputOTP
                        maxLength={6}
                        value={otpCode}
                        onChange={(value) => setOtpCode(value)}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                  </div>
                  <Button
                    onClick={handleOTPVerification}
                    disabled={isLoading || otpCode.length !== 6}
                    className="w-full h-12"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <Mail className="w-4 h-4 mr-2" />
                    )}
                    Verify OTP
                  </Button>
                  <Button
                    onClick={resetPhoneFlow}
                    variant="outline"
                    className="w-full"
                  >
                    Change Phone Number
                  </Button>
                </>
              )}
            </TabsContent>
          </Tabs>
          
          {error && (
            <Alert className="mt-4" variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  )
}