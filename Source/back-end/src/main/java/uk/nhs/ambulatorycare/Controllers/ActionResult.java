package uk.nhs.ambulatorycare.Controllers;

import org.springframework.web.servlet.ModelAndView;

public class ActionResult extends ModelAndView {

    public ActionResult(String view) {
        super(view);
    }
}