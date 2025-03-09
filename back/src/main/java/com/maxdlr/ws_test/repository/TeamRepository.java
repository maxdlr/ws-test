package com.maxdlr.ws_test.repository;

import com.maxdlr.ws_test.model.Team;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TeamRepository extends JpaRepository<Team, Long> {
    Optional<Team> findOneById(Long id);
}
