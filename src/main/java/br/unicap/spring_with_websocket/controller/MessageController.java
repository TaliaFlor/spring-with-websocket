package br.unicap.spring_with_websocket.controller;

import br.unicap.spring_with_websocket.model.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.HtmlUtils;

import java.text.SimpleDateFormat;
import java.util.Date;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/message")
public class MessageController {

    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public Message send(Message message) {
        String time = new SimpleDateFormat("HH:mm").format(new Date());
        return new Message(message.from(), message.content(), time);
    }

}
