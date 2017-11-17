package com.service;

import com.entity.Files;
import com.repository.FileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FileService {
    @Autowired
    private FileRepository fileRepository;
    public Iterable<Files> getAllFiles(){
        return fileRepository.findAll();
    }

    public void addFile(Files file){
        System.out.println("****************");

        System.out.println(file);

        System.out.println("****************");
        fileRepository.save(file);
    }
}