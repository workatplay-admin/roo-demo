// Unit tests for form validation functions
// Following TDD principles - these tests will fail initially

describe('Form Validation', () => {
    
    describe('validateEmail', () => {
        test('should return true for valid email addresses', () => {
            expect(validateEmail('test@example.com')).toBe(true);
            expect(validateEmail('user.name@domain.co.uk')).toBe(true);
            expect(validateEmail('test+tag@example.org')).toBe(true);
        });

        test('should return false for invalid email addresses', () => {
            expect(validateEmail('invalid-email')).toBe(false);
            expect(validateEmail('test@')).toBe(false);
            expect(validateEmail('@example.com')).toBe(false);
            expect(validateEmail('')).toBe(false);
            expect(validateEmail(null)).toBe(false);
            expect(validateEmail(undefined)).toBe(false);
        });
    });

    describe('validateName', () => {
        test('should return true for valid names', () => {
            expect(validateName('John Doe')).toBe(true);
            expect(validateName('Jane')).toBe(true);
            expect(validateName('Mary-Jane Smith')).toBe(true);
        });

        test('should return false for invalid names', () => {
            expect(validateName('')).toBe(false);
            expect(validateName('   ')).toBe(false);
            expect(validateName(null)).toBe(false);
            expect(validateName(undefined)).toBe(false);
        });

        test('should return false for names that are too short or too long', () => {
            expect(validateName('A')).toBe(false); // too short
            expect(validateName('A'.repeat(101))).toBe(false); // too long
        });
    });

    describe('sanitizeInput', () => {
        test('should remove potentially dangerous characters', () => {
            expect(sanitizeInput('<script>alert("xss")</script>')).toBe('scriptalert("xss")/script');
            expect(sanitizeInput('Normal text')).toBe('Normal text');
            expect(sanitizeInput('Text with <b>bold</b>')).toBe('Text with bbold/b');
        });

        test('should handle null and undefined inputs', () => {
            expect(sanitizeInput(null)).toBe('');
            expect(sanitizeInput(undefined)).toBe('');
        });
    });

    describe('validateForm', () => {
        test('should return true for valid form data', () => {
            const formData = {
                name: 'John Doe',
                email: 'john@example.com'
            };
            expect(validateForm(formData)).toBe(true);
        });

        test('should return false for invalid form data', () => {
            expect(validateForm({ name: '', email: 'john@example.com' })).toBe(false);
            expect(validateForm({ name: 'John Doe', email: 'invalid-email' })).toBe(false);
            expect(validateForm({ name: '', email: '' })).toBe(false);
        });
    });
});