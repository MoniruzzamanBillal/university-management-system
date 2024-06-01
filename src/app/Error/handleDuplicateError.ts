import httpStatus from "http-status";
import { TerrorSource, TgenericResponse } from "../interface/error";

export const handleDuplicateError = (error): TgenericResponse => {
  const regex = /name:\s*"([^"]+)"/;
  const match = error.message.match(regex);

  const extractedMessage = match && match[1];

  const errorSources: TerrorSource = [
    {
      path: "",
      message: `${extractedMessage} is already exist`,
    },
  ];

  const statusCode = httpStatus.BAD_REQUEST;

  return {
    statusCode,
    message: " ",
    errorSources,
  };
};
