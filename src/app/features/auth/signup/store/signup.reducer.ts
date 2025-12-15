import { createReducer, on } from '@ngrx/store';
import { SignupState, initialSignupState } from './signup.state';
import * as SignupActions from './signup.actions';

export const signupReducer = createReducer(
  initialSignupState,

  // Account Type Selection
  on(SignupActions.selectAccountType, (state, { accountType }) => ({
    ...state,
    selectedAccountType: accountType,
    currentStep: 1,
  })),

  // Step 1
  on(SignupActions.submitStep1, (state, { data }) => ({
    ...state,
    step1Data: data,
    loading: true,
    error: null,
  })),

  on(SignupActions.submitStep1Success, (state, { response, email }) => ({
    ...state,
    userId: response.userId,
    email: email,
    currentStep: 2,
    loading: false,
    error: null,
  })),

  on(SignupActions.submitStep1Failure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Step 2
  on(SignupActions.submitStep2, (state, { data }) => ({
    ...state,
    step2Data: data,
    loading: true,
    error: null,
  })),

  on(SignupActions.submitStep2Success, (state, { response }) => ({
    ...state,
    vendorId: response.vendorId,
    currentStep: 3,
    loading: false,
    error: null,
  })),

  on(SignupActions.submitStep2Failure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // OTP
  on(SignupActions.sendOtp, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(SignupActions.sendOtpSuccess, (state) => ({
    ...state,
    loading: false,
  })),

  on(SignupActions.sendOtpFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(SignupActions.verifyOtp, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(SignupActions.verifyOtpSuccess, (state) => ({
    ...state,
    otpVerified: true,
    loading: false,
  })),

  on(SignupActions.verifyOtpFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(SignupActions.resendOtp, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(SignupActions.resendOtpSuccess, (state) => ({
    ...state,
    loading: false,
  })),

  on(SignupActions.resendOtpFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Reset
  on(SignupActions.resetSignup, () => initialSignupState),

  // Clear Error
  on(SignupActions.clearError, (state) => ({
    ...state,
    error: null,
  }))
);
