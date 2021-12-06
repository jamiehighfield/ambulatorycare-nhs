package uk.nhs.ambulatorycare.Entities;

public class SecurityQuestion {

    private SecurityQuestion() { }

    public SecurityQuestion(long id, String questionText) {
        this.questionText = questionText;
    }

    private long id;

    private String questionText;

    public long getId() {
        return id;
    }

    public String getQuestionText() {
        return questionText;
    }
}