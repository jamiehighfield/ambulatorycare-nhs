package uk.nhs.ambulatorycare.Controllers;

import org.springframework.security.core.context.SecurityContextHolder;
import uk.nhs.ambulatorycare.Authentication.UserIdentity;
import uk.nhs.ambulatorycare.Authentication.UserIdentityDetails;

public abstract class ControllerBase {

    public ActionResult Redirect(String path) {
        if (path == null) {
            return null;
        }

        return new ActionResult("redirect:" + path);
    }

    public ActionResult View(String name) {
        if (name == null) {
            return null;
        }

        return new ActionResult("Views/" + name);
    }

    public ActionResult View(String name, Object model) {
        if (name == null) {
            return null;
        }

        if (model == null) {
            return null;
        }

        ActionResult modelAndView = new ActionResult("Views/" + name);

        modelAndView.addObject("Model", model);

        return modelAndView;
    }

    //This method gets the current JWT token from the request and deserialises it into a UserIdentity object.
    public UserIdentity GetUser() {
        return ((UserIdentityDetails)SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUserIdentity();
    }
}