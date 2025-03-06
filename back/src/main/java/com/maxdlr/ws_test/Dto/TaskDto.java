package com.maxdlr.ws_test.Dto;

import jakarta.annotation.Nonnull;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
public class TaskDto {

    private Long id;

    @Nonnull
    private String title;
    @Nonnull
    private String description;

    private Date createdAt;

    public Date getCreatedAt() {
        return createdAt;
    }

    public TaskDto setCreatedAt(Date CreatedAt) {
        this.createdAt = CreatedAt;
        return this;
    }

    @Nonnull
    public String getTitle() {
        return title;
    }

    @Nonnull
    public String getDescription() {
        return description;
    }

    public Long getId() {
        return id;
    }

    public TaskDto setId(Long id) {
        this.id = id;
        return this;
    }

    public TaskDto setTitle(@Nonnull String title) {
        this.title = title;
        return this;
    }

    public TaskDto setDescription(@Nonnull String description) {
        this.description = description;
        return this;
    }
}
