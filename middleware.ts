import {NextRequest, NextResponse} from "next/server";
import {jwtVerify} from "jose";
import {deleteCookie, setCookie} from "cookies-next";
import {destroyCookie} from "nookies";

const PUBLIC_FILE = /\.(.*)$/;

// @ts-ignore
const verifyJWT = async (jwt) => {
    const {payload} = await jwtVerify(
        jwt,
        new TextEncoder().encode(process.env.JWT_SECRET)
    );
    return payload;
};

// @ts-ignore
export default async function middleware(req: NextRequest, res: NextResponse) {
    const {pathname} = req.nextUrl;

    const jwt = req.cookies.get('jwt_cookie_id');


    if (pathname === "/signin") {
        if (jwt) {
            req.nextUrl.pathname = "/home";
            return NextResponse.redirect(req.nextUrl);
        } else {
            return NextResponse.next();
        }
    }

    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/api") ||
        pathname.startsWith("/static") ||
        PUBLIC_FILE.test(pathname)
    ) {
        return NextResponse.next();
    }

    if (!jwt) {
        req.nextUrl.pathname = "/signin";
        return NextResponse.redirect(req.nextUrl);
    }

    try {
        await verifyJWT(jwt.value);
        return NextResponse.next();
    } catch (e) {
        console.error(e);
        req.nextUrl.pathname = "/signin";
        return NextResponse.redirect(req.nextUrl);
    }
}
