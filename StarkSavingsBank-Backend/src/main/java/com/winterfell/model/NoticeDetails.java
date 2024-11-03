package com.winterfell.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Entity
@Setter @Getter
@Table(name = "notice_details")
public class NoticeDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notice_id")
    private long noticeId;

    @Column(name = "notice_summary")
    private String noticeSummary;

    @Column(name = "notice_details")
    private String noticeDetails;

    @Column(name = "issued_date")
    private String issuedDate;

    @Column(name = "house_affiliation")
    private String houseAffiliation;

    @Column(name = "notice_beg_dt")
    @JsonIgnore
    private Date noticeBeginningDate;

    @Column(name = "notice_end_dt")
    @JsonIgnore
    private Date noticeEndDate;

    @Column(name = "create_dt")
    @JsonIgnore
    private Date createDate;

    @Column(name = "update_dt")
    @JsonIgnore
    private Date updateDate;

}
