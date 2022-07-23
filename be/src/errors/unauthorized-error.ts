import { CustomError } from "./custom-error";

export class UnauthorizedError extends CustomError {
  serializeErrors(): { message: string; field?: string | undefined; }[] {
    return [{
      message: this.message
    }]
  }
  constructor(public message: string) {
    super(message);
    this.message = message;
    Object.setPrototypeOf(this, UnauthorizedError.prototype)
  }
  statusCode = 401;
}