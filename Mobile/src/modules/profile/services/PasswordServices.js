export function newPasswordValidator(password) {
    if (password.length < 8) {
      return "Password should contain at least 8 characters to provide more security.";
    }
    
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        return "Password must contain at least one special character (e.g. !@#$&*).";
    }

    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
      return "Password must contain both uppercase and lowercase letters.";
    }

    return "";
  }

  export function confirmPasswordValidator(password, confirmPassword) {

    if (password !== confirmPassword) {
        return "Confirm password does not match the password";
    }

    return "";
  }
  