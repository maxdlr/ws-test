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
@RequestMapping("/api/tasks")
public class TaskController {

    private final String wsEndPoint = "tasks";
    private final TaskService taskService;
    private final SimpMessagingTemplate messagingTemplate;

    public TaskController(TaskService taskService, SimpMessagingTemplate messagingTemplate) {
        this.taskService = taskService;
        this.messagingTemplate = messagingTemplate;
    }

    @GetMapping
    public ResponseEntity<List<TaskDto>> getAllTasks() {
        return ResponseEntity.ok(this.taskService.getAllTasks());
    }

    @MessageMapping("/tasks.add")
    public void createTaskWs(TaskDto taskDto) {
        this.taskService.addTask(taskDto);
        messagingTemplate.convertAndSend("/topic/" + this.wsEndPoint, this.taskService.getAllTasks());
    }

    @MessageMapping("/tasks.save")
    public void saveTaskWs(TaskDto taskDto) {
        this.taskService.updateTask(taskDto);
        messagingTemplate.convertAndSend("/topic/" + this.wsEndPoint, this.taskService.getAllTasks());
    }

    @MessageMapping("/tasks.delete")
    public void deleteTask(String id) {
        this.taskService.deleteTask(Long.valueOf(id));
        messagingTemplate.convertAndSend("/topic/" + this.wsEndPoint, this.taskService.getAllTasks());
    }
}
