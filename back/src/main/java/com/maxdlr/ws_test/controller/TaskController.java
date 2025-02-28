package com.maxdlr.ws_test.controller;

import com.maxdlr.ws_test.model.Task;
import com.maxdlr.ws_test.service.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public ResponseEntity<List<Task>> browseTasks() {
        List<Task> tasks = this.taskService.getAllTasks();
        return ResponseEntity.ok(tasks);
    }
}
