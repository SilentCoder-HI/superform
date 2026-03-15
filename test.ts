import { superform } from "./packages/core/src/index.js"

// Helper function to run and log results
async function runValidationTest(name: string, result: any) {
    if (result instanceof Promise) result = await result
    const isValid = result === null || (result && typeof result === "object" && result.success === true)
    if (isValid) {
        console.log(`✅ ${name} VALID`)
    } else {
        const error = typeof result === "object" ? result.errors : result
        console.log(`❌ ${name} INVALID → ${JSON.stringify(error)}`)
        console.log(`❌ ${name} INVALID → ${JSON.stringify(error)}`)
        console.log(`❌ ${name} INVALID → ${JSON.stringify(error)}`)
        console.log(`❌ ${name} INVALID → ${JSON.stringify(error)}`)
    }
}

async function runAllTests() {

    console.log("===== STRING & EMAIL TEST =====")
    const emailSchema = superform.string().email()
    const passwordSchema = superform.string().min(8)

    await runValidationTest("Email test 1", emailSchema.validate("user@gmail.com"))
    await runValidationTest("Email test 2", emailSchema.validate("bademail"))
    await runValidationTest("Password test 1", passwordSchema.validate("12345678"))
    await runValidationTest("Password test 2", passwordSchema.validate("123"))

    console.log("\n===== NUMBER SCHEMA TEST =====")
    const ageSchema = superform.number().min(18).max(100)
    await runValidationTest("Age test 1", ageSchema.validate(25))
    await runValidationTest("Age test 2", ageSchema.validate(10))
    await runValidationTest("Age test 3", ageSchema.validate(150))

    console.log("\n===== ARRAY SCHEMA TEST =====")
    const hobbiesSchema = superform.array().min(1).max(5)
    await runValidationTest("Hobbies test 1", hobbiesSchema.validate(["reading", "gaming"]))
    await runValidationTest("Hobbies test 2", hobbiesSchema.validate([]))
    await runValidationTest("Hobbies test 3", hobbiesSchema.validate(["a", "b", "c", "d", "e", "f"]))

    console.log("\n===== OBJECT SCHEMA TEST =====")
    const userSchema = superform.object({
        name: superform.string().min(3),
        email: superform.string().email(),
        age: superform.number().min(18)
    })

    const users = [
        { name: "Ali", email: "ali@gmail.com", age: 25 },
        { name: "Bo", email: "wrongemail", age: 15 }
    ]

    for (const [i, user] of users.entries()) {
        const result = await userSchema.validate(user)
        if (result.success) {
            console.log(`✅ User ${i + 1} VALID`)
        } else {
            console.log(`❌ User ${i + 1} INVALID`, result.errors)
        }
    }

    console.log("\n===== ASYNC VALIDATION TEST =====")
    const usernameSchema = superform.string().async(async (value) => {
        // Simulate API check
        const taken = ["admin", "test"]
        if (taken.includes(value)) return "Username already taken"
        return null
    })

    await runValidationTest("Username test 1", usernameSchema.validate("newuser"))
    await runValidationTest("Username test 2", usernameSchema.validate("admin"))

    console.log("\n===== COMBINED FORM TEST =====")
    const formSchema = superform.object({
        username: superform.string().min(4).async(async (v) => (v === "admin" ? "Username taken" : null)),
        email: superform.string().email(),
        password: superform.string().min(8),
        age: superform.number().min(18)
    })

    const forms = [
        { username: "john", email: "john@gmail.com", password: "mypassword", age: 22 },
        { username: "admin", email: "bademail", password: "123", age: 15 }
    ]

    for (const [i, form] of forms.entries()) {
        const result = await formSchema.validate(form)
        if (result.success) {
            console.log(`✅ Form ${i + 1} VALID`)
        } else {
            console.log(`❌ Form ${i + 1} INVALID`, result.errors)
        }
    }

}

runAllTests()