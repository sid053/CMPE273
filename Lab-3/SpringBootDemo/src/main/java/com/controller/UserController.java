package com.controller;

import com.entity.*;
import com.service.FileService;
import com.service.UserFileService;
import com.service.UserService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpSession;
import java.util.List;


@Controller    // This means that this class is a Controller
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path="/user") // This means URL's start with /demo (after Application path)
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private FileService fileService;

    //*********************************************************************************************************************
    @PostMapping(path="/doRegister",consumes = MediaType.APPLICATION_JSON_VALUE) // Map ONLY POST Requests
    public  ResponseEntity<?> addNewUser (@RequestBody User user) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        userService.addUser(user);
        System.out.println("Saved");
        return new ResponseEntity(null,HttpStatus.CREATED);
    }

    //*********************************************************************************************************************


    @PostMapping(path = "/addFiles" ,consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addFiles(@RequestBody Files file){
        fileService.addFile(file);
        System.out.println("The file has been added");
//
//         Userfiles userfiles = new Userfiles();
//         userfiles.setFileid(file.getFileId());
//         userfiles.setUserid(1);
        return new ResponseEntity(HttpStatus.OK);
    }

    //*********************************************************************************************************************
    @RequestMapping(value = "/files/{filename:.+}", method = { RequestMethod.GET })
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) {

        Resource file = fileUploadService.loadFileAsResource(filename);
        return ResponseEntity
                .ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\""+file.getFilename()+"\"")
                .body(file);
    }


    //*********************************************************************************************************************

    @GetMapping(path="/getUsers",produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody Iterable<User> getAllUsers() {
        // This returns a JSON with the users
        return userService.getAllUsers();
    }

    //*********************************************************************************************************************

    @GetMapping(path = "/getFiles",produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody Iterable<Files> getAllFiles(){
        return fileService.getAllFiles();
    }


    //*********************************************************************************************************************
    @PostMapping(path="/login",consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> login(@RequestBody String user, HttpSession session)
    {
        JSONObject jsonObject = new JSONObject(user);
        session.setAttribute("name",jsonObject.getString("username"));
        List<User> User = userService.login(jsonObject.getString("username")
                ,jsonObject.getString("password"));

        if (User.size()>0){
            return new ResponseEntity(HttpStatus.OK);
        }

        return new ResponseEntity(HttpStatus.UNAUTHORIZED);
    }


//*********************************************************************************************************************

    @RequestMapping(value = "/find/{id}", method = { RequestMethod.GET })
    public FileUploadMetadata findById(@PathVariable("id") long id) {
        LOG.info(String.format("Metatdata search using id: %d", id));

        return fileUploadService.findMetatdataById(id);
    }

    @CrossOrigin(origins = { "*" })
    @RequestMapping(value = "/delete/{id}", method = { RequestMethod.GET })
    public ResponseEntity<String> deleteMetadata(@PathVariable("id") long id) {
        LOG.info(String.format("Metatdata delete for id: %d", id));

        return ResponseEntity.ok().body(String.format("Deleted  with Id %d", id));
    }

    //*********************************************************************************************************************
    @PostMapping(value = "/saveData")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public FileUploadMetadata saveMetatdata(
            @RequestParam("id") long id,
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("filename") String filename,
            @RequestParam("createDate") String createDate) {

        if (StringUtils.isBlank(title) || StringUtils.isBlank(description)) {
            throw new FileUploadException("Title and Description cannot be empty or null");
        }


        // System.out.println(req.getSession().getAttributeNames());


        // save metadata
        FileUploadMetadata d = new FileUploadMetadata();
        d.setId(id);
        // escape input to prevent XSS
        d.setTitle(StringEscapeUtils.escapeHtml4(title));
        d.setDescription(StringEscapeUtils.escapeHtml4(description));
        d.setFilename(StringEscapeUtils.escapeHtml4(filename));
        d.setCreateDate(StringEscapeUtils.escapeHtml4(createDate));
        //data.setCurrent_email(session.getAttribute("name").toString());
        //data.setCreateDate(StringEscapeUtils.escapeHtml4(createDate));
        fileUploadService.saveMetatdata(d);

        return d;
    }




    //*********************************************************************************************************************

    @RequestMapping(value = "/fileupload", method = { RequestMethod.POST, RequestMethod.OPTIONS })
    public FileUploadMetadata handleUpload(@RequestParam("uploadedFile") MultipartFile uploadedFile) {

        System.out.println(session.getId());

        FileUploadMetadata metadata = fileUploadService.uploadFile(uploadedFile);

        // return ResponseEntity.ok().build();
        return metadata;
    }

    //*********************************************************************************************************************
    @PostMapping(value = "/logout")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<?> logout(HttpSession session) {
        System.out.println(session.getAttribute("name"));
        session.invalidate();
        return  new ResponseEntity(HttpStatus.OK);
    }
    //*********************************************************************************************************************



}