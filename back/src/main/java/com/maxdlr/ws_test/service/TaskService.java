package com.maxdlr.ws_test.service;

import com.maxdlr.ws_test.Dto.TaskDto;
import com.maxdlr.ws_test.model.Task;
import com.maxdlr.ws_test.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<TaskDto> getAllTasks() {
        List<Task> tasks = this.taskRepository.findAll();
        List<TaskDto> taskDtos = new ArrayList<>();

        for (Task task : tasks) {
            TaskDto taskDto = new TaskDto();
            taskDto
                    .setId(task.getId())
                    .setDescription(task.getDescription())
                    .setTitle(task.getTitle())
                    .setCreatedAt(task.getCreatedAt());
            taskDtos.add(taskDto);
        }
        return taskDtos;
    }

    public Task addTask(TaskDto taskDto) {
        Task task = new Task()
                .setTitle(taskDto.getTitle())
                .setDescription(taskDto.getDescription())
                .setCreatedAt(new Date());
        this.taskRepository.save(task);
        return task;
    }

    public Task getTask(String id) {
        return this.taskRepository.findOneById(Long.valueOf(id));
    }

    public Task getTask(Long id) {
        return this.taskRepository.findOneById(id);
    }

    public void deleteTask(Long id) {
        this.taskRepository.deleteById(id);
    }
}
