export type ActionResult<T = void> =
  | { ok: true; data?: T }
  | {
      ok: false
      error: string
      fieldErrors?: Record<string, string[]>
    }

export function actionError(
  error: string,
  fieldErrors?: Record<string, string[]>
): ActionResult {
  return { ok: false, error, fieldErrors }
}

export function actionSuccess<T>(data?: T): ActionResult<T> {
  return { ok: true, data }
}
