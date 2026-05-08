import { NextResponse } from "next/server";

const COOKIE_NAME = 'token';

export const setAuthCookie = (token: string) => {
    const res = NextResponse.json(
        {message: "Login Successful"},
        {status: 201}
    );
    res.cookies.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 60 * 60 * 24,
    });
    return res;
};

export const clearAuthCookie = (res: NextResponse) => {
    res.cookies.set(COOKIE_NAME, "", {
        httpOnly: true,
        expires: new Date(0),
        path: "/",
    });
};

export const getCookieName = () => COOKIE_NAME;