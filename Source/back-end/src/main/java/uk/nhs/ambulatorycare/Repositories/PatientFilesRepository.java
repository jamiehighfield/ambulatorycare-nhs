package uk.nhs.ambulatorycare.Repositories;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Repository;

import java.io.File;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import org.w3c.dom.Attr;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;

import javax.xml.transform.Result;
import javax.xml.transform.Source;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.sax.SAXResult;
import javax.xml.transform.stream.StreamSource;

import org.apache.fop.apps.FOPException;
import org.apache.fop.apps.FOUserAgent;
import org.apache.fop.apps.Fop;
import org.apache.fop.apps.FopFactory;
import org.apache.fop.apps.MimeConstants;

import uk.nhs.ambulatorycare.Entities.PatientIdentity;
import uk.nhs.ambulatorycare.Exceptions.EmptyResultSetException;
import uk.nhs.ambulatorycare.Repositories.Interfaces.IPatientFilesRepository;
import uk.nhs.ambulatorycare.Services.FoodItemService;
import uk.nhs.ambulatorycare.Services.FluidIntakeService;
import uk.nhs.ambulatorycare.Entities.FluidItem;
import uk.nhs.ambulatorycare.Entities.FoodItem;
import uk.nhs.ambulatorycare.Entities.Patient;
import uk.nhs.ambulatorycare.Services.AccountsService;

import javax.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Repository
public class PatientFilesRepository extends RepositoryBase implements IPatientFilesRepository {

    @Autowired
    private FoodItemService foodService;

    @Autowired
    private FluidIntakeService fluidService;

    @Autowired
    private AccountsService accountService;

    @Autowired
    private JavaMailSender sender;

    public void createXMLPatientWeek(Long id) {
        //get patient information
        PatientIdentity patient = null;
        try {
            patient = accountService.GetPatientById(id);
        } catch (EmptyResultSetException e) {
            e.printStackTrace();
        }
        //get foods
        List<FoodItem> food = foodService.getFoodByPatient(id);
        //get fluids
        List<FluidItem> fluids = fluidService.getFluidsByPatient(id);
        //Date date = new Date();
        String pattern = "dd-MM-yyyy";
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);

        String date = simpleDateFormat.format(new Date());
        System.out.println(date);
        //create xml file with patient info
        String xmlFilePath = "PatientFiles/xml/patient_" + id + "_" + date + ".xml";
        String name = patient.getFirstName() + " " + patient.getLastName();
        try {
            //create a new document using the document builder
            DocumentBuilderFactory documentFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder documentBuilder = documentFactory.newDocumentBuilder();
            Document document = documentBuilder.newDocument();

            // root element
            Element root = document.createElement("patient");
            document.appendChild(root);

                //patient details
                Element patientInfo = document.createElement("patientInfo");
                    Element firstName = document.createElement("firstName");
                        firstName.appendChild(document.createTextNode(patient.getFirstName()));
                    patientInfo.appendChild(firstName);

                    Element lastName = document.createElement("lastName");
                        lastName.appendChild(document.createTextNode(patient.getLastName()));
                    patientInfo.appendChild(lastName);

                    Element contactNumber = document.createElement("contactNumber");
                        contactNumber.appendChild(document.createTextNode(patient.getContactNumber()));
                    patientInfo.appendChild(contactNumber);
                root.appendChild(patientInfo);

                //Food diary
                Element foodDiary = document.createElement("foodDiary");
                    //for each food item in list of food, add a food item elements with food item attributes: title, description, amount and dateTime
                    for(int i = 0; i < food.size(); i++){
                        FoodItem fi = food.get(i);
                        Element foodItem = document.createElement("foodItem");
                            Element title = document.createElement("title");
                                title.appendChild(document.createTextNode(fi.getTitle()));
                            foodItem.appendChild(title);
                            Element description = document.createElement("description");
                                String desc = fi.getDescription();
                                if(desc.length() > 0){
                                    description.appendChild(document.createTextNode(fi.getDescription()));
                                }else{
                                    description.appendChild(document.createTextNode("null"));
                                }
                            foodItem.appendChild(description);
                            Element amount = document.createElement("amount");
                                amount.appendChild(document.createTextNode(fi.getAmount()));
                            foodItem.appendChild(amount);
                            Element dateTime = document.createElement("dateTime");
                                dateTime.appendChild(document.createTextNode(fi.getDateTime()));
                            foodItem.appendChild(dateTime);
                        foodDiary.appendChild(foodItem);
                    }
                root.appendChild(foodDiary);

                //Fluid intake
                Element fluidIntake = document.createElement("fluidIntake");
                    //for each fluid item in fluids, add a fluid item element with attributes: title, amount and date time
                    for(int i = 0; i < fluids.size(); i++){
                        FluidItem fi = fluids.get(i);
                        Element fluidItem = document.createElement("fluidItem");
                            Element title = document.createElement("title");
                                title.appendChild(document.createTextNode(fi.getTitle()));
                            fluidItem.appendChild(title);
                            Element amount = document.createElement("amount");
                                amount.appendChild(document.createTextNode(fi.getAmount() + "Ml"));
                            fluidItem.appendChild(amount);
                            Element dateTime = document.createElement("dateTime");
                                dateTime.appendChild(document.createTextNode(fi.getDateTime()));
                            fluidItem.appendChild(dateTime);
                        fluidIntake.appendChild(fluidItem);
                    }
                root.appendChild(fluidIntake);

            // create the xml file
            //transform the DOM Object to an XML File
            TransformerFactory transformerFactory = TransformerFactory.newInstance();
            Transformer transformer = transformerFactory.newTransformer();
            DOMSource domSource = new DOMSource(document);
            StreamResult streamResult = new StreamResult(new File(xmlFilePath));

            // If you use
            StreamResult result = new StreamResult(System.out);
            // the output will be pushed to the standard output ...
            // You can use that for debugging

            transformer.transform(domSource, streamResult);

            System.out.println("Done creating XML File");

            createPdfFromXml(xmlFilePath, id, date, name);
        } catch (ParserConfigurationException pce) {
            pce.printStackTrace();
        } catch (TransformerException tfe) {
        tfe.printStackTrace();
        }
    }

    //create PDF from xml file
    public void createPdfFromXml(String filePath, Long id, String date, String name){
        try {
            File xmlfile = new File(filePath);
            File xsltfile = new File("src/main/resources/xsl.styles/patient-file.xsl");
            File pdfFile = new File("PatientFiles/pdf/patient_" + id + "_" + date + ".pdf");
            String pdfFilePath = "PatientFiles/pdf/patient_" + id + "_" + date + ".pdf";
            String fileName = "patient_" + id + "_" + date + ".pdf";

            System.out.println(pdfFile.getAbsolutePath());
            // configure fopFactory as desired
            final FopFactory fopFactory = FopFactory.newInstance(new File(".").toURI());

            FOUserAgent foUserAgent = fopFactory.newFOUserAgent();
            // configure foUserAgent as desired

            // Setup output
            OutputStream out = new FileOutputStream(pdfFile);
            out = new java.io.BufferedOutputStream(out);
            try {
                // Construct fop with desired output format
                Fop fop;

                fop = fopFactory.newFop(MimeConstants.MIME_PDF, foUserAgent, out);

                // Setup XSLT
                TransformerFactory factory = TransformerFactory.newInstance();
                Transformer transformer = factory.newTransformer(new StreamSource(xsltfile));

                // Setup input for XSLT transformation
                Source src = new StreamSource(xmlfile);

                // Resulting SAX events (the generated FO) must be piped through to FOP
                Result res = new SAXResult(fop.getDefaultHandler());

                // Start XSLT transformation and FOP processing
                transformer.transform(src, res);
            } catch (FOPException | TransformerException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            } finally {
                out.close();
            }
            System.out.println("PDF File created");
            sendEmailWithPatientFiles(pdfFilePath, fileName, name);
        }catch(IOException exp){
            exp.printStackTrace();
        }
    }

    public void sendEmailWithPatientFiles(String filePath, String fileName, String name) {
            try {
                sendEmail(filePath, fileName, name);
                System.out.println("Email Sent!");
            }catch(Exception ex) {
                System.out.println("Error in sending email: "+ex);
            }
    }
    private void sendEmail(String filePath, String fileName, String name) throws Exception{
        MimeMessage message = sender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message,true);
        File pdfFile = new File(filePath);
        helper.setTo("ambi.care.cu@gmail.com");
        helper.setText("Please find patient PDF with food diary and fluid intake attached for patient: " + name);
        helper.setSubject("Patient Info");
        helper.addAttachment(fileName, pdfFile);
        sender.send(message);
    }
}


