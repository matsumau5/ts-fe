import { ValidationErrorItem } from "@hapi/joi";
import { ClientError } from "../error/ClientError";

export const handleValidationError = ([
  validationError
]: ValidationErrorItem[]) => {
  switch (validationError.type) {
    case "object.allowUnknown": {
      throw new ClientError("入力エラー");
    }

    case "object.child": {
      // just show first validation error only
      const { type, context } = validationError.context!.reason[0];

      switch (type) {
        case "any.empty":
          throw new ClientError(`${context.label}データがありません。`);

        case "any.required":
          throw new ClientError(`${context.label}必須入力です。`);

        case "string.min":
          throw new ClientError(
            `${context.label}入力は最小${context.limit}文字以上である必要があります。`
          );

        case "string.max":
          throw new ClientError(
            `${context.label}入力は最大 ${context.limit}文字までです。`
          );

        /**
         * All possible error messages:
         * https://github.com/hapijs/joi/blob/v15.0.1/lib/language.js
         */
        default:
          throw new Error("validation error");
      }
    }

    default:
      throw new Error("validation error");
  }
};
