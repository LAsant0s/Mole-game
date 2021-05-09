package exceptions;

public class LowerScoreException extends RuntimeException{
	private static final long serialVersionUID = 1L;
	
	public LowerScoreException(String message) {
		super(message); 
	}
	
}
