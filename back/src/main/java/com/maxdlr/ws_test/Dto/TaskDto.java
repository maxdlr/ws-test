package com.maxdlr.ws_test.Dto;

import jakarta.annotation.Nonnull;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
public class TaskDto {
    @Nonnull
    private String title;
    @Nonnull
    private String description;

    @Nonnull
    public String getTitle() {
        return title;
    }

    @Nonnull
    public String getDescription() {
        return description;
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
