import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const slug = body?.slug;

  if (!slug) {
    return NextResponse.json({ message: "Missing slug" }, { status: 400 });
  }

  try {
    if (slug === "home") {
      revalidatePath("/");
    } else {
      revalidatePath(`/${slug}`);
    }
    return NextResponse.json({ revalidated: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Error revalidating" },
      { status: 500 }
    );
  }
}
