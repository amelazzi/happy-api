export const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next)
  } catch (err) {
    next(err)
  }
}

export const oneOfAsyncHandler = (fns) => async (req, res, next) => {
  let err = null
  for (const fn of fns) {
    try {
      return await fn(req, res, next)
    } catch (error) {
      err = error
      continue
    }
  }
  err && next(err)
}
