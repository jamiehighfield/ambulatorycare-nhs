package uk.nhs.ambulatorycare.Exceptions;

//This is thrown when a result set returned from a query was empty.
public class EmptyResultSetException extends Exception {

    public EmptyResultSetException() {
        super("The result set returned from the query was empty.");
    }
}
