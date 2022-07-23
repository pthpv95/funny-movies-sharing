import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {
  constructor(public message: string) {
    super(message);
    this.message = message;
    Object.setPrototypeOf(this, BadRequestError.prototype)
  }

  serializeErrors(): { message: string; field?: string | undefined; }[] {
    return [{
      message: this.message
    }]
  }
  statusCode = 400;
}