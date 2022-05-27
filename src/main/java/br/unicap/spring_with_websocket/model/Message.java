package br.unicap.spring_with_websocket.model;

public record Message(String from, String content, String timestamp) {
}
