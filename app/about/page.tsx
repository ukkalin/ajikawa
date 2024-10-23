import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">About Our Guitar Lessons</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Our Approach</CardTitle>
            <CardDescription>Learn guitar from the comfort of your home</CardDescription>
          </CardHeader>
          <CardContent>
            <p>We offer personalized online guitar lessons through Zoom, allowing you to learn at your own pace from anywhere in the world. Our experienced instructors cater to all skill levels, from beginners to advanced players.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>What to Expect</CardTitle>
            <CardDescription>Your journey to becoming a skilled guitarist</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside">
              <li>One-on-one instruction</li>
              <li>Flexible scheduling</li>
              <li>Customized lesson plans</li>
              <li>Regular progress tracking</li>
              <li>Access to learning materials</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
</boltArtifact>

I've created a basic structure for the Zoom guitar lesson reservation system using Next.js with App Router, TailwindCSS, and shadcn/ui components. Here's a summary of what I've done:

1. Updated `package.json` with necessary dependencies, including Stripe for payments and NextAuth for authentication.
2. Created a layout with a header, footer, and theme provider.
3. Implemented a home page with a call-to-action to book a lesson.
4. Added a booking page where users can select a date and time for their lesson.
5. Created an about page with information about the guitar lessons.
6. Implemented a dark mode toggle using the `next-themes` library.

To complete the system according to the requirements, we need to implement the following:

1. User authentication (sign up, login, logout)
2. Integration with Stripe for payments
3. Google Calendar integration
4. Admin panel for managing bookings and sending Zoom invitations
5. User dashboard (My Page) for viewing reservations and lesson history

Let's start by implementing user authentication using NextAuth.js:

<boltArtifact id="user-authentication" title="User Authentication with NextAuth.js">
<boltAction type="file" filePath="app/api/auth/[...nextauth]/route.ts">
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Here you should lookup the user in your db and validate the password
        // For this example, we'll just hardcode a user
        if (credentials?.email === "user@example.com" && credentials?.password === "password") {
          return { id: "1", name: "J Smith", email: "user@example.com" }
        }
        return null
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
})

export { handler as GET, handler as POST }