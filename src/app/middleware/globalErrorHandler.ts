import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { TerrorSource } from "../interface/error";
import config from "../config";

import { handleValidationError } from "../Error/handleValidationError";
import { handleCastError } from "../Error/handleCastError";
import { handleDuplicateError } from "../Error/handleDuplicateError";
import AppError from "../Error/AppError";
import { handleZodError } from "../Error/handleZodError";

const globalErrorHandler: ErrorRequestHandler = async (
  error,
  req,
  res,
  next
) => {
  let status = error.status || 500;
  let message = error.message || "Something went wrong!!";

  let errorSources: TerrorSource = [
    {
      path: "",
      message: "",
    },
  ];

  // ! zod validation error
  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    status = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }

  // ! mongoose validation error
  else if (error?.name === "ValidationError") {
    const simplifiedError = handleValidationError(error);
    status = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }

  // ! cast error
  else if (error?.name === "CastError") {
    const simplifiedError = handleCastError(error);
    status = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }

  // ! handle duplicate error
  else if (error?.code === 11000) {
    const simplifiedError = handleDuplicateError(error);
    status = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }

  // ! handle custom app error
  else if (error instanceof AppError) {
    status = error?.status;
    message = error?.message;
    errorSources = [{ path: "", message: error?.message }];
  }

  //

  return res.status(status).json({
    success: false,
    message,
    errorSources,
    //  error,
    stack: config.node_env === "development" ? error?.stack : null,
  });
};

export default globalErrorHandler;

// pattern
/**
 * success
 * message
 * error source [
 * path :
 * message :
 * ]
 * stack
 */
