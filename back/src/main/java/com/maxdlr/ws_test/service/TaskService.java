package com.maxdlr.ws_test.service;

import com.maxdlr.ws_test.Dto.TaskDto;
import com.maxdlr.ws_test.model.Task;
import com.maxdlr.ws_test.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> getAllTasks() {
        return this.taskRepository.findAll();
    }

    public Task addTask(TaskDto taskDto) {
        Task task = new Task().setTitle(taskDto.getTitle()).setDescription(taskDto.getDescription());
        this.taskRepository.save(task);
        return task;
    }

    public Task getTask(String id) {
        return this.taskRepository.findOneById(Long.valueOf(id));
    }

    public Task getTask(Long id) {
        return this.taskRepository.findOneById(id);
    }
}
