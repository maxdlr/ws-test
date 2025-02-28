package com.maxdlr.ws_test.controller;

import com.maxdlr.ws_test.Dto.TaskDto;
import com.maxdlr.ws_test.model.Task;
import com.maxdlr.ws_test.service.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public ResponseEntity<List<Task>> browse() {
        List<Task> tasks = this.taskService.getAllTasks();
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> read(@PathVariable String id) {
        Task task = this.taskService.getTask(id);
        return ResponseEntity.ok(task);
    }

    @PostMapping
    public ResponseEntity<Task> add(@RequestBody TaskDto taskDto) {
        Task task = this.taskService.addTask(taskDto);
        return ResponseEntity.ok(task);
    }
}
