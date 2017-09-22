#include <IRremoteESP8266.h>
#include <IRsend.h>
#include <Tadiran.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <stdio.h>

#include "config.h"

void setup() {
  // put your setup code here, to run once:
    Serial.begin(115200);
    WiFi.mode(WIFI_STA);
    pinMode(STATUS_LED, OUTPUT);
    pinMode(IR_LED_PIN, OUTPUT);
      
    
    WiFi.begin(ssid, password);

    bool wasLit = false;
 
    while (WiFi.status() != WL_CONNECTED) {
      if(!wasLit){
        digitalWrite(STATUS_LED,HIGH);
        wasLit = true;
      }
      else {
        digitalWrite(STATUS_LED,LOW);
        wasLit = false;
      }
      
      delay(500);
      
      Serial.print(".");
    }

    Serial.println("");   
    Serial.println("WiFi connected");
    
    digitalWrite(STATUS_LED,LOW);
}

void loop() {
  // put your main code here, to run repeatedly:
  digitalWrite(STATUS_LED,HIGH);
  sendTempratureUpdate();
  checkForCommand();
  digitalWrite(STATUS_LED,LOW);
  delay(5000);
}

void checkForCommand(){
  HTTPClient http;
  http.begin("http://"+ host + "/GetPendingAction"); //HTTP
  
  int httpCode = http.GET();  
  if(httpCode > 0) {
      // HTTP header has been send and Server response header has been handled
      
  
      // file found at server
      if(httpCode == HTTP_CODE_OK) {
          Serial.println(F("Got command from server"));
          String payload = http.getString();
          Serial.println(payload);
          executeCommand(payload);
      }
  } else if(httpCode == HTTP_CODE_NOT_FOUND){
    Serial.println(F("Not pending command from server"));
  }
  else {
      Serial.printf("[HTTP] GET... failed, error: %s\n", http.errorToString(httpCode).c_str());
  }
  
  http.end();
}

void executeCommand(String command){
  
    IRsend irsend(IR_LED_PIN);    
    Tadiran tadiran(1, 1, 26, 0);


    char* comma = ",";
    
    char cmdBuf[50];
    command.toCharArray(cmdBuf, 50);
    int power = atoi(strtok(cmdBuf, comma));
    int temp = atoi(strtok(NULL, comma));
    int acMode = atoi(strtok(NULL, comma));
    int fan = atoi(strtok(NULL, comma));
        
    tadiran.setMode(acMode);
    tadiran.setTemeprature(temp);
    tadiran.setFan(fan);
    tadiran.setState(power);

    irsend.sendRaw(tadiran.codes, TADIRAN_BUFFER_SIZE, 38);

    Serial.println("Executed command");    
}

void sendTempratureUpdate(){
  
  HTTPClient http;
  int curTemp = getTemp();
  Serial.printf("Updating temprature %d ...", curTemp);
  http.begin("http://"+ host + "/UpdateTemp/" + curTemp); //HTTP
  
  int httpCode = http.GET();  
  if(httpCode > 0) {
      // HTTP header has been send and Server response header has been handled      
      // file found at server
      if(httpCode == HTTP_CODE_OK) {
          String payload = http.getString();
          Serial.print(F("Success"));
          Serial.println();
      }
      else {
        Serial.printf("Fail: %d\n", httpCode);
      }
  } else {
      Serial.printf("[HTTP] GET... failed, error: %s\n", http.errorToString(httpCode).c_str());
  }
  
  http.end();
    
}

int getTemp(){
    int reading = analogRead(TEMP_SENSOR_PIN);  
    
    // converting that reading to voltage, for 3.3v arduino use 3.3
    float voltage = reading * 3.3;
    voltage /= 1024.0;     
    float tempratureC = (voltage - 0.5) * 100 ;
    return round(tempratureC);    
}
