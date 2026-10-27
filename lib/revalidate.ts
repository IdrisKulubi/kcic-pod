import { revalidateTag as nextRevalidateTag } from "next/cache"

export function revalidateCmsTag(tag: string) {
  nextRevalidateTag(tag, "max")
}
