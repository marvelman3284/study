import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { client } from "./app/api/connect";

export async function middleware(request: NextRequest) {
  return;
}

export const config = {
  matcher: "/view/:path+",
};
