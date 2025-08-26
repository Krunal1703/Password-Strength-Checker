document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('password');
    const toggleButton = document.getElementById('togglePassword');
    const strengthMeter = document.getElementById('strengthMeter');
    const strengthText = document.getElementById('strengthText');
    const suggestedPassword = document.getElementById('suggestedPassword');
    const generateButton = document.getElementById('generatePassword');
    
    // Criteria icons
    const lengthIcon = document.getElementById('lengthIcon');
    const uppercaseIcon = document.getElementById('uppercaseIcon');
    const lowercaseIcon = document.getElementById('lowercaseIcon');
    const numberIcon = document.getElementById('numberIcon');
    const specialIcon = document.getElementById('specialIcon');
    
    // Toggle password visibility
    toggleButton.addEventListener('click', function() {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            toggleButton.textContent = '🔒';
        } else {
            passwordInput.type = 'password';
            toggleButton.textContent = '👁️';
        }
    });
    
    // Check password strength on input
    passwordInput.addEventListener('input', checkPasswordStrength);
    
    // Generate strong password
    generateButton.addEventListener('click', generateStrongPassword);
    
    function checkPasswordStrength() {
        const password = passwordInput.value;
        let strength = 0;
        let messages = [];
        
        // Reset criteria icons
        lengthIcon.textContent = '❌';
        uppercaseIcon.textContent = '❌';
        lowercaseIcon.textContent = '❌';
        numberIcon.textContent = '❌';
        specialIcon.textContent = '❌';
        
        // Check password length
        if (password.length >= 12) {
            strength += 20;
            lengthIcon.textContent = '✅';
        } else {
            messages.push('Add more characters (at least 12)');
        }
        
        // Check for uppercase letters
        if (/[A-Z]/.test(password)) {
            strength += 20;
            uppercaseIcon.textContent = '✅';
        } else {
            messages.push('Add uppercase letters');
        }
        
        // Check for lowercase letters
        if (/[a-z]/.test(password)) {
            strength += 20;
            lowercaseIcon.textContent = '✅';
        } else {
            messages.push('Add lowercase letters');
        }
        
        // Check for numbers
        if (/[0-9]/.test(password)) {
            strength += 20;
            numberIcon.textContent = '✅';
        } else {
            messages.push('Add numbers');
        }
        
        // Check for special characters
        if (/[^A-Za-z0-9]/.test(password)) {
            strength += 20;
            specialIcon.textContent = '✅';
        } else {
            messages.push('Add special characters');
        }
        
        // Check for common passwords or patterns
        if (password.length > 0) {
            if (password.length < 6) {
                strength = Math.min(strength, 20);
            }
            
            // Repeated characters
            if (/(.)\1{2,}/.test(password)) {
                strength -= 10;
                messages.push('Avoid repeated characters');
            }
            
            // Common sequences
            if (/123|abc|qwerty|asdf|password/i.test(password)) {
                strength -= 15;
                messages.push('Avoid common sequences');
            }
        }
        
        // Update strength meter
        strengthMeter.style.width = strength + '%';
        
        // Update strength text
        if (password.length === 0) {
            strengthText.textContent = 'Password not entered';
            strengthMeter.style.width = '0%';
            strengthMeter.style.backgroundColor = '#f0f0f0';
            suggestedPassword.textContent = 'Waiting for input...';
        } else {
            if (strength < 40) {
                strengthText.textContent = 'Very Weak';
                strengthMeter.style.backgroundColor = '#e74c3c';
            } else if (strength < 60) {
                strengthText.textContent = 'Weak';
                strengthMeter.style.backgroundColor = '#e67e22';
            } else if (strength < 80) {
                strengthText.textContent = 'Medium';
                strengthMeter.style.backgroundColor = '#f1c40f';
            } else if (strength < 100) {
                strengthText.textContent = 'Strong';
                strengthMeter.style.backgroundColor = '#2ecc71';
            } else {
                strengthText.textContent = 'Very Strong';
                strengthMeter.style.backgroundColor = '#27ae60';
            }
            
            // Generate suggestion based on current input
            suggestPassword(password);
        }
    }
    
    function suggestPassword(currentPassword) {
        // If password is empty, don't suggest anything
        if (!currentPassword) {
            suggestedPassword.textContent = 'Waiting for input...';
            return;
        }
        
        // Start with the current password
        let suggestion = currentPassword;
        
        // Ensure minimum length of 12
        while (suggestion.length < 12) {
            // Add a random character from a set of safe characters
            const chars = 'abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789!@#$%&';
            suggestion += chars[Math.floor(Math.random() * chars.length)];
        }
        
        // Ensure at least one uppercase if missing
        if (!/[A-Z]/.test(suggestion)) {
            // Replace a random character with an uppercase letter
            const pos = Math.floor(Math.random() * suggestion.length);
            const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
            suggestion = suggestion.substring(0, pos) + chars[Math.floor(Math.random() * chars.length)] + suggestion.substring(pos + 1);
        }
        
        // Ensure at least one number if missing
        if (!/[0-9]/.test(suggestion)) {
            // Replace a random character with a number
            const pos = Math.floor(Math.random() * suggestion.length);
            const nums = '23456789';
            suggestion = suggestion.substring(0, pos) + nums[Math.floor(Math.random() * nums.length)] + suggestion.substring(pos + 1);
        }
        
        // Ensure at least one special character if missing
        if (!/[^A-Za-z0-9]/.test(suggestion)) {
            // Replace a random character with a special character
            const pos = Math.floor(Math.random() * suggestion.length);
            const specials = '!@#$%&';
            suggestion = suggestion.substring(0, pos) + specials[Math.floor(Math.random() * specials.length)] + suggestion.substring(pos + 1);
        }
        
        suggestedPassword.textContent = suggestion;
    }
    
    function generateStrongPassword() {
        // Generate a completely new strong password
        const length = 16;
        const charset = 'abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789!@#$%&';
        let newPassword = '';
        
        // Ensure we have at least one of each required character type
        const requiredChars = [
            'ABCDEFGHJKLMNPQRSTUVWXYZ',
            'abcdefghijkmnopqrstuvwxyz',
            '23456789',
            '!@#$%&'
        ];
        
        // Add one of each required character
        for (const charSet of requiredChars) {
            newPassword += charSet[Math.floor(Math.random() * charSet.length)];
        }
        
        // Fill the rest randomly
        for (let i = newPassword.length; i < length; i++) {
            newPassword += charset[Math.floor(Math.random() * charset.length)];
        }
        
        // Shuffle the password
        newPassword = newPassword.split('').sort(() => 0.5 - Math.random()).join('');
        
        // Set the generated password
        passwordInput.value = newPassword;
        passwordInput.type = 'text';
        toggleButton.textContent = '🔒';
        
        // Check its strength
        checkPasswordStrength();
    }
    
    // Initial check for empty password
    checkPasswordStrength();
});