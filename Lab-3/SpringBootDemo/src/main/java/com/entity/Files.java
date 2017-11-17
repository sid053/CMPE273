package com.entity;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Entity;


@Entity
public class Files {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer fileId;

    private String fileName;

    private String filePath;

    //getters

    public Integer getFileId() {
        return fileId;
    }

    public String getFileName() {
        return fileName;
    }

    public String getFilePath() {
        return filePath;
    }

    //setters


    public void setFileId(Integer fileId) {
        this.fileId = fileId;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

}
