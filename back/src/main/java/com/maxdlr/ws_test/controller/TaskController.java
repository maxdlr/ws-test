package com.maxdlr.ws_test.controller;

import com.maxdlr.ws_test.Dto.TaskDto;
import com.maxdlr.ws_test.model.Task;
import com.maxdlr.ws_test.service.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping()
public class TaskController {

    private final TaskService taskService;
    private final SimpMessagingTemplate messagingTemplate;

    public TaskController(TaskService taskService, SimpMessagingTemplate messagingTemplate) {
        this.taskService = taskService;
        this.messagingTemplate = messagingTemplate;
    }

    @GetMapping("/api/tasks")
    public ResponseEntity<List<Task>> getAllTasks() {
        TaskDto taskDto = new TaskDto();
        taskDto.setDescription("description test").setTitle("test");
        System.out.println("taskDto = " + taskDto);
        this.taskService.addTask(taskDto);
        List<Task> tasks = this.taskService.getAllTasks();
        return ResponseEntity.ok(tasks);
    }

    @PostMapping("/api/tasks")
    public ResponseEntity<Task> createTask(@RequestBody TaskDto taskDto) {
        Task savedTask = this.taskService.addTask(taskDto);
        // Notify all clients about the new task
        messagingTemplate.convertAndSend("/topic/tasks", savedTask);
        return ResponseEntity.ok(savedTask);
    }

    // WebSocket endpoint for creating tasks
    @MessageMapping("/tasks.create")
    @SendTo("/topic/tasks")
    public Task createTaskWs(TaskDto taskDto) {
        return this.taskService.addTask(taskDto);
    }
}
