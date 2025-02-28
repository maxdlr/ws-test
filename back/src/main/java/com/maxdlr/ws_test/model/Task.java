package com.maxdlr.ws_test.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

import java.util.Date;

@Entity
@Data
public class Task {

    @Id
    @GeneratedValue
    private Long id;
    private String title;
    private String description;
    private Date createdAt;
}
