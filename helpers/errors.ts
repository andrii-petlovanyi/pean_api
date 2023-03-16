class CustomError extends Error {
  public status: number;

  constructor(message: string) {
    super(message);
    this.status = 400;
  }
}

class ConflictError extends CustomError {
  constructor(message: string) {
    super(message);
    this.status = 409;
  }
}

class NotAuthorizedError extends CustomError {
  constructor(message: string) {
    super(message);
    this.status = 401;
  }
}

export { CustomError, ConflictError, NotAuthorizedError };
