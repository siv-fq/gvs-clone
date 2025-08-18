import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const slug = body.fields?.slug?.["en-US"];

  if (!slug) {
    return NextResponse.json({ message: "Missing slug" }, { status: 400 });
  }

  try {
    revalidatePath(`/${slug}`);
    return NextResponse.json({ revalidated: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Error revalidating" },
      { status: 500 }
    );
  }
}
