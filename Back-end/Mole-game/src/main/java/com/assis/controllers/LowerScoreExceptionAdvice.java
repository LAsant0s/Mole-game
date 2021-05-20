package com.assis.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import exceptions.LowerScoreException;

@ControllerAdvice
public class LowerScoreExceptionAdvice {

	@ResponseBody
    @ExceptionHandler(LowerScoreException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	String LowerScoreExceptionHandler(LowerScoreException ex) {
        return ex.getMessage();
	}
}
