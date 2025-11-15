export class NotFoundError extends Error {
  status = 404;
  constructor(msg: string) {
    super(msg);
  }
}

export class BadRequestError extends Error {
  status = 400;
  constructor(msg: string) {
    super(msg);
  }
}

export class UnauthorizedError extends Error {
  status = 401;
  constructor(msg: string) {
    super(msg);
  }
}
