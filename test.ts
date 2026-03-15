import { superform } from "./packages/core/src/index.js"

// Helper for consistent result output
async function runValidationTest(name: string, result: any) {
    if (result instanceof Promise) result = await result
    const isValid = result === null || (typeof result === "object" && result.success === true)
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

async function runComplexTest() {
    console.log("===== COMPLEX NESTED FORM TEST =====")

    // Complex schema: User Profile with deeply nested structure, arrays, enums, optionals, and async refinements
    const profileSchema = superform.object({
        personal: superform.object({
            firstName: superform.string().min(2),
            lastName: superform.string().min(2),
            email: superform.string().email(),
            birthYear: superform.number().min(1920).max(new Date().getFullYear())
        }),
        account: superform.object({
            username: superform.string().min(5).async(async (v) => {
                const reserved = ["root", "admin", "system"];
                if (reserved.includes(v)) return "Reserved username";
                return null;
            }),
            password: superform.string().min(8),
        }),
        preferences: superform.object({
            languages: superform.array().min(1).max(3),
            notifications: superform.object({
                email: superform.boolean(),
                sms: superform.boolean(),
                push: superform.boolean()
            })
        }),
    });

    const result = await profileSchema.validate({
        personal: {
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            birthYear: 1990
        },
        account: {
            username: "johndoe",
            password: "password123"
        },
        preferences: {
            languages: ["en", "fr"],
            notifications: {
                email: true,
                sms: false
            }
        }
    });

    await runValidationTest("Complex Test", result);
}

runComplexTest();