package com.maxdlr.ws_test.Dto;

import jakarta.annotation.Nonnull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
@Data
public class TaskDto {
    private Long id;
    @Nonnull
    private String title;
    @Nonnull
    private String description;
    private Date createdAt;
    private Long teamId;

}
