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
@RequestMapping("/api")
public class TaskController {

    private final TaskService taskService;
    private final SimpMessagingTemplate messagingTemplate;

    public TaskController(TaskService taskService, SimpMessagingTemplate messagingTemplate) {
        this.taskService = taskService;
        this.messagingTemplate = messagingTemplate;
    }

    @GetMapping("/tasks")
    public ResponseEntity<List<TaskDto>> getAllTasks() {
        return ResponseEntity.ok(this.taskService.getAllTasks());
    }

    @MessageMapping("/tasks.create")
    public void createTaskWs(TaskDto taskDto) {
        this.taskService.addTask(taskDto);
        messagingTemplate.convertAndSend("/topic/tasks", this.taskService.getAllTasks());
    }

    @MessageMapping("/tasks.delete")
    public void deleteTask(String id) {
        this.taskService.deleteTask(Long.valueOf(id));
        messagingTemplate.convertAndSend("/topic/tasks", this.taskService.getAllTasks());
    }
}
