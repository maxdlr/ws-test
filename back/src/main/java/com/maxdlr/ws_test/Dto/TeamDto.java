package com.maxdlr.ws_test.Dto;

import jakarta.annotation.Nonnull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.util.Date;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
@Data
public class TeamDto {
    private Long id;
    @Nonnull
    private String name;
    private List<Long> taskIdList;
    private Date createdAt;
}
