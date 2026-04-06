export interface Blog {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  date: string;
  author: string;
  image: string;
  tags: string[];
}

export const blogs: Blog[] = [
  {
    id: "1",
    title: "Mukesh Kotlin Formatter for VS Code",
    slug: "mukesh-kotlin-formatter-vs-code",
    description: "The ultimate Kotlin formatting experience for Visual Studio Code. A fast, lightweight, and elegant formatting tool powered by ktlint.",
    date: "April 6, 2024",
    author: "Mukesh Murugaiyan",
    image: "/blogs/kotlin-formatter.png",
    tags: ["Kotlin", "VS Code", "Extension", "Development"],
    content: `
# 🚀 Mukesh Kotlin Formatter: The Ultimate VS Code Experience

Kotlin has undeniably become one of the most loved programming languages in the modern development ecosystem. With its expressive syntax and robust null-safety, it’s a powerhouse for Android, Backend, and Multiplatform development. However, while IntelliJ IDEA offers a massive native ecosystem, many developers—especially those in **React Native**, **Flutter/Native-Modules**, or **Serverless** workflows—prefer the sheer speed, and lightweight nature of **Visual Studio Code**.

But there has always been one major bottleneck for Kotlin on VS Code: **formatting**.

Enter the **[Mukesh Kotlin Formatter](https://open-vsx.org/extension/Mukeshm/mukesh-kotlin-formatter)**—a blazing fast, lightweight, and elegant tool powered by the industry-standard **[ktlint](https://pinterest.github.io/ktlint/)**.

---

## 🤔 The Problem: The "Aesthetic Tax" of Native Development

When collaborating on large Kotlin codebases, maintaining a strict aesthetic and standardized formatting is crucial. Without a reliable formatter, you end up with inconsistent indentation, wild line breaks, and PR reviews that devolve into arguments about spacing rather than logic. This is what we call the "Aesthetic Tax"—time spent on things that don't add features.

Look at this typical unformatted snippet:

\`\`\`kotlin
class UserRepository{
fun getUser(id:Int):User?{
  val user= database.find(id)
    if(user!=null){return user}else{
return null    }
}
}
\`\`\`

Painful, right? You *could* fix this manually, but that distracts you from actual software engineering.

---

## ✨ The Solution: Seamless & Instant Standard-Enforcement

The **Mukesh Kotlin Formatter** bridges the gap between VS Code’s lightweight environment and JetBrains' strict ecosystem. By leveraging the official \`ktlint\` under the hood, this extension ensures that your code adheres completely to the official Kotlin style guides (and even Android-specific styles) without you having to think twice.

### Before vs After

With a single keystroke, the messy code transforms into a clean, readable masterpiece:

\`\`\`kotlin
class UserRepository {
    fun getUser(id: Int): User? {
        val user = database.find(id)
        if (user != null) {
            return user
        } else {
            return null
        }
    }
}
\`\`\`

### 💡 Why Devs Love It

- **🏎️ Engine-Level Speed:** Formats your files instantly in a background thread, ensuring your editor never "freezes" or lags during a format-on-save.
- **🧹 Opinionated (in the right way):** It doesn't just fix spaces; it fixes line-wrapping, import ordering, and removes unnecessary curly braces according to the official Kotlin Coding Conventions.
- **🛠️ Zero Configuration:** It’s built on "Convention over Configuration." It works natively out of the box.

---

## ⚡ Mastering the Tool

### Quick Shortcuts
Format your active file instantly using the standard VS Code commands:
- **Windows / Linux:** \`Ctrl + Shift + I\`
- **Mac:** \`⇧ + ⌥ + F\`

> [!TIP]
> Go to your VS Code settings and enable **"Editor: Format On Save"**. This makes your experience truly seamless—your code gets fixed every single time you hit Save!

### Manual Formatting via Command Palette
If you're a keyboard-only power user:
1. Hit \`Ctrl + Shift + P\`.
2. Type **"Mukesh: Format Kotlin File 🚀"**.
3. Press Enter.

---

## 🔧 Prerequisites & Installation

To guarantee top-tier formatting that matches Android Studio and IntelliJ, this extension relies on the official **[ktlint](https://pinterest.github.io/ktlint/)** engine. 

1. **Install ktlint:** Ensure you have **[ktlint installed](https://pinterest.github.io/ktlint/install/cli/)** on your machine and available in your global system \`PATH\`.
2. **VS Code Extension:** Open VS Code, go to the Extensions view (\`Ctrl + Shift + X\`), and search for **[Mukesh Kotlin Formatter](https://open-vsx.org/extension/Mukeshm/mukesh-kotlin-formatter)**.
3. **Set Default Formatter:** When you first format a \`.kt\` file, VS Code might ask which formatter to use. Select **Mukesh Kotlin Formatter** to make it your default.

---

## 🛠️ Advanced: Project-Wide Linting

While this extension handles formatting *while you code*, did you know you can use the underlying engine to check your entire project in the terminal?

\`\`\`bash
# Check all files for linting errors
ktlint "src/**/*.kt"

# Automatically fix all files in the project
ktlint -F "src/**/*.kt"
\`\`\`

Using this extension alongside the CLI ensures your local environment and your CI/CD pipelines are always in perfect sync.

---

### Connect & Discover
Are you building something game-changing? I'd love to see it. Explore more high-performance tools and deep-dive technical articles on my digital playground: **[themukesh.com](https://themukesh.com)**. 

*Crafted with ❤️ by [Mukesh Murugaiyan](https://github.com/Mukesh-Murugaiyan)*
    `,
  },
];
