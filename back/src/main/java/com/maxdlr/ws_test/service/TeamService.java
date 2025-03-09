package com.maxdlr.ws_test.service;

import com.maxdlr.ws_test.Dto.TeamDto;
import com.maxdlr.ws_test.model.Task;
import com.maxdlr.ws_test.model.Team;
import com.maxdlr.ws_test.model.Team;
import com.maxdlr.ws_test.repository.TaskRepository;
import com.maxdlr.ws_test.repository.TeamRepository;
import com.maxdlr.ws_test.repository.TeamRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class TeamService {
    private final TeamRepository teamRepository;
    private final TaskRepository taskRepository;

    public TeamService(TeamRepository teamRepository, TaskRepository taskRepository) {
        this.teamRepository = teamRepository;
        this.taskRepository = taskRepository;
    }

    public List<TeamDto> getAllTeams() {
        List<Team> teams = this.teamRepository.findAll();

        List<TeamDto> teamDtos = new ArrayList<>();

        for (Team team : teams) {
            TeamDto teamDto = new TeamDto();
            teamDto
                    .setId(team.getId())
                    .setName(team.getName())
                    .setCreatedAt(team.getCreatedAt())
                    .setTaskIdList(team.getTasks().stream().map(Task::getId).toList());
            teamDtos.add(teamDto);
        }
        return teamDtos;
    }

    public void addTeam(TeamDto teamDto) {
        List<Task> tasks = new ArrayList<>();
        teamDto.getTaskIdList().forEach(taskId -> tasks.add(this.taskRepository.findOneById(taskId)));
        Team team = new Team().setName(teamDto.getName()).setCreatedAt(new Date()).setTasks(tasks);
        teamRepository.save(team);
    }

    public void updateTeam(TeamDto teamDto) {
        List<Task> tasks = new ArrayList<>();
        teamDto.getTaskIdList().forEach(taskId -> tasks.add(this.taskRepository.findOneById(taskId)));

        Optional<Team> team = this.teamRepository.findOneById(teamDto.getId());

        if (team.isEmpty()) {
            return;
        }

        team.get().setName(teamDto.getName()).setCreatedAt(new Date()).setTasks(tasks);
        this.teamRepository.save(team.get());
    }

    public void deleteTeam(Long id) {
        this.teamRepository.deleteById(id);
    }
}
