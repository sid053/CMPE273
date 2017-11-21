package com.entity;

import javax.persistence.*;


@Entity
public class Userfiles {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer userFileId;


    private Integer fileid ;
    private Integer userid ;

    public Integer getUserFileId() {
        return userFileId;
    }

    public void setUserFileId(Integer userFileId) {
        this.userFileId = userFileId;
    }

    public Integer getFileid() {
        return fileid;
    }

    public void setFileid(Integer fileid) {
        this.fileid = fileid;
    }

    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }


}
