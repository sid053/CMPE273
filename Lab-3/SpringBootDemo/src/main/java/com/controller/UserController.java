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
    @PostMapping(value = "/logout")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<?> logout(HttpSession session) {
        System.out.println(session.getAttribute("name"));
        session.invalidate();
        return  new ResponseEntity(HttpStatus.OK);
    }
    //*********************************************************************************************************************



}