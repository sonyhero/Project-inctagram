export type SignUpType = {
  userName: string
  email: string
  password: string
}

export type AuthResponseErrorType = {
  statusCode: number
  messages: AuthResponseMessages[]
  error: string
}
export type AuthResponseMessages = {
  message: string
  field: string
}
export type VerificationEmailType = {
  confirmationCode: string
}

export type ResendVerificationEmailType = {
  email: string
  baseUrl: string
}

export type LoginType = {
  email: string
  password: string
}

export type AuthLoginResponseType = {
  accessToken: string
}
export type RecoveryPasswordType = {
  email: string
  recaptcha: string
}
export type CheckRecoveryCodeType = {
  recoveryCode: string
}
export type CheckRecoveryCodeResponseType = {
  email: string
}
export type NewPasswordType = {
  newPassword: string
  recoveryCode: string
}

export type MeResponseType = {
  userId: number
  userName: string
  email: string
}
