// Simple test runner for browser-based testing
// Mimics Jest-like syntax without external dependencies

class TestRunner {
    constructor() {
        this.tests = [];
        this.describes = [];
        this.currentDescribe = null;
        this.results = {
            passed: 0,
            failed: 0,
            total: 0
        };
    }

    describe(description, callback) {
        const previousDescribe = this.currentDescribe;
        this.currentDescribe = description;
        this.describes.push(description);
        callback();
        this.currentDescribe = previousDescribe;
    }

    test(description, callback) {
        this.tests.push({
            describe: this.currentDescribe,
            description,
            callback
        });
    }

    expect(actual) {
        return {
            toBe: (expected) => {
                if (actual === expected) {
                    return true;
                } else {
                    throw new Error(`Expected ${actual} to be ${expected}`);
                }
            },
            toBeTrue: () => {
                if (actual === true) {
                    return true;
                } else {
                    throw new Error(`Expected ${actual} to be true`);
                }
            },
            toBeFalse: () => {
                if (actual === false) {
                    return true;
                } else {
                    throw new Error(`Expected ${actual} to be false`);
                }
            }
        };
    }

    async runTests() {
        console.log('🧪 Running Tests...\n');
        
        for (const test of this.tests) {
            this.results.total++;
            try {
                await test.callback();
                this.results.passed++;
                console.log(`✅ ${test.describe} - ${test.description}`);
            } catch (error) {
                this.results.failed++;
                console.log(`❌ ${test.describe} - ${test.description}`);
                console.log(`   Error: ${error.message}`);
            }
        }

        this.printResults();
    }

    printResults() {
        console.log('\n📊 Test Results:');
        console.log(`Total: ${this.results.total}`);
        console.log(`Passed: ${this.results.passed}`);
        console.log(`Failed: ${this.results.failed}`);
        
        if (this.results.failed === 0) {
            console.log('🎉 All tests passed!');
        } else {
            console.log(`⚠️  ${this.results.failed} test(s) failed`);
        }
    }
}

// Global test runner instance
const testRunner = new TestRunner();

// Global functions to mimic Jest API
window.describe = (description, callback) => testRunner.describe(description, callback);
window.test = (description, callback) => testRunner.test(description, callback);
window.expect = (actual) => testRunner.expect(actual);

// Function to run all tests
window.runTests = () => testRunner.runTests();