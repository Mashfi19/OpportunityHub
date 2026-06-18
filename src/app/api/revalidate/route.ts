import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    const secretToken = process.env.NEXTJS_REVALIDATE_TOKEN || "revalidate_token_secret_123!";

    if (token !== secretToken) {
      return NextResponse.json(
        { error: "Unauthorized revalidation token.", status: 401 },
        { status: 401 }
      );
    }

    const path = searchParams.get("path") || "/opportunities";
    
    // Purge the dynamic routes cache
    revalidatePath(path);
    revalidatePath("/dashboard");
    
    return NextResponse.json({
      revalidated: true,
      path,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal Server Error", status: 500 },
      { status: 500 }
    );
  }
}
