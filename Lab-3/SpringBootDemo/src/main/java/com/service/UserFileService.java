package com.service;

import com.entity.Files;
import com.entity.Userfiles;
import com.repository.UserFileRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class UserFileService {
@Autowired
private UserFileRepository userFileRepository;


    public void addUserService(Userfiles userfile){

        userFileRepository.save(userfile);

    }

}
