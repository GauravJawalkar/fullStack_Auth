import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export function middleware(request: NextRequest) {

    // check what path/url user is on
    const path = request.nextUrl.pathname

    // The one who has a token should not be able to access the login and signup route again
    const publicPath = path === '/login' || path === "/signup"

    // extract the token from the cookies which was created during login
    const token = request.cookies.get('token')?.value || ''

    // If the path is login||signup and the user still has the login token they should not be able to access the login||signup pages redirect them to the home page
    if (publicPath && token) {
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }

    // Check if the token is not present
    if (!publicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }

}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/login', "/", '/profile/:path*', "/profile", '/signup', '/verifyemail']
}