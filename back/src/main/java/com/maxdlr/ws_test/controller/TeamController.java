package com.maxdlr.ws_test.controller;

import com.maxdlr.ws_test.Dto.TeamDto;
import com.maxdlr.ws_test.model.Task;
import com.maxdlr.ws_test.model.Team;
import com.maxdlr.ws_test.repository.TaskRepository;
import com.maxdlr.ws_test.repository.TeamRepository;
import com.maxdlr.ws_test.service.TeamService;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/teams")
public class TeamController {
    private final String wsEndPoint = "teams";
    private final TeamService teamService;
    private final SimpMessagingTemplate messagingTemplate;
    private final TeamRepository teamRepository;
    private final TaskRepository taskRepository;


    public TeamController(TeamService teamService, SimpMessagingTemplate messagingTemplate, TeamRepository teamRepository, TaskRepository taskRepository) {
        this.teamService = teamService;
        this.messagingTemplate = messagingTemplate;
        this.teamRepository = teamRepository;
        this.taskRepository = taskRepository;
    }

    @GetMapping
    public ResponseEntity<List<TeamDto>> getAllTeams() {
        Optional<Team> existingTeam = this.teamRepository.findOneById(1L);

        if (existingTeam.isEmpty()) {
            this.teamService.addTeam(new TeamDto().setName("Maxime").setTaskIdList(List.of(1L, 2L, 3L)));
        }

        if (existingTeam.isPresent()) {
            List<Task> tasks = new ArrayList<>();
            List.of(1L, 2L, 3L).forEach(taskId -> tasks.add(this.taskRepository.findOneById(taskId)));
            existingTeam.get().setTasks(tasks);
            this.teamRepository.save(existingTeam.get());
        }

        return ResponseEntity.ok(this.teamService.getAllTeams());
    }

    @MessageMapping("/teams.add")
    public void createTeamWs(TeamDto teamDto) {
        this.teamService.addTeam(teamDto);
        messagingTemplate.convertAndSend("/topic/" + this.wsEndPoint, this.teamService.getAllTeams());
    }

    @MessageMapping("/teams.save")
    public void saveTeamWs(TeamDto teamDto) {
        this.teamService.updateTeam(teamDto);
        messagingTemplate.convertAndSend("/topic/" + this.wsEndPoint, this.teamService.getAllTeams());
    }

    @MessageMapping("/teams.delete")
    public void deleteTeam(String id) {
        this.teamService.deleteTeam(Long.valueOf(id));
        messagingTemplate.convertAndSend("/topic/" + this.wsEndPoint, this.teamService.getAllTeams());
    }
}
