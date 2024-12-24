package com.expensetracker.expensetracker.helper;

public class NotFoundException extends RuntimeException {

    public NotFoundException(String msg){
        super(msg);
    }
    public NotFoundException(){
        super("Resource Not Found");
    }

}
