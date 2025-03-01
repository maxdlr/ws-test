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

    // WebSocket endpoint for creating tasks
    @MessageMapping("/tasks.create")
//    @SendTo("/topic/tasks")
    public void createTaskWs(TaskDto taskDto) {
        System.out.println("create task taskDto = " + taskDto);
        this.taskService.addTask(taskDto);
        List<TaskDto> tasks = this.taskService.getAllTasks();
        messagingTemplate.convertAndSend("/topic/tasks", tasks);
    }
}
