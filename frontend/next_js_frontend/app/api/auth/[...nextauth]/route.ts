import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import fetchData from '@/functions/fetchFunction'

const handler = NextAuth({
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/'
    },
    providers: [CredentialsProvider({
        name: "Credentials",
        credentials: {
            email: {},
            pw: {}
        },
        async authorize(credentials, req) {
            const data = {
                email: credentials?.email,
                pw: credentials?.pw
            }

            const user = await fetchData('log', data)
            if (typeof (user) === 'string') {
                return null
            }

            return user
        }
    })]
})

export { handler as GET, handler as POST }