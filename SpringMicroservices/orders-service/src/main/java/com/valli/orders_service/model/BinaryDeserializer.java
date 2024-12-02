package com.valli.orders_service.model;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;

import java.io.IOException;
import java.util.Base64;

public class BinaryDeserializer extends JsonDeserializer<Binary> {

    @Override
    public Binary deserialize(JsonParser p, DeserializationContext ctxt) throws IOException, JsonProcessingException {
        JsonNode node = p.getCodec().readTree(p);
        String data = node.get("data").asText();
        byte[] decodedBytes = Base64.getDecoder().decode(data);
        return new Binary(BsonBinarySubType.BINARY, decodedBytes);
    }
}
