package com.maxdlr.ws_test.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
public class Task {

    @Id
    @GeneratedValue
    private Long id;
    private String title;
    private String description;
    private Date createdAt;

    public Task setId(Long id) {
        this.id = id;
        return this;
    }

    public Task setTitle(String title) {
        this.title = title;
        return this;
    }

    public Task setDescription(String description) {
        this.description = description;
        return this;
    }

    public Task setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
        return this;
    }
}
