//package com.entity;
//
//import javax.persistence.*;
//
//
//@Entity
//public class UserFiles {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.AUTO)
//    private Integer userFileId;
//
//    public Integer getUserFileId() {
//        return userFileId;
//    }
//
//    public void setUserFileId(Integer userFileId) {
//        this.userFileId = userFileId;
//    }
//
//    @ManyToOne
//    @JoinColumn(name="fileId",table="Files")
//    private Files file;
//
//    public Files getFile() {
//        return file;
//    }
//
//    public void setFile(Files file) {
//        this.file = file;
//    }
//
//}
