#include <SPI.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <WiFi.h>
#include <HTTPClient.h>

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_RESET -1
#define SCREEN_ADDRESS 0x3C

Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

#define SOUND_SPEED 0.034

// Wi-Fi Ayarları
const char* ssid = "iPhone";
const char* password = "Ng00775718";
const char* apiUrl = "https://4047-176-220-240-223.ngrok-free.app/api/v1/DistanceHub";

// Sensör Pinleri
const int trigPins[3] = {5, 14, 26};
const int echoPins[3] = {18, 27, 25};

// Durumlar
String lastStatuses[3] = {"", "", ""};

// Mesafe Ölçüm Fonksiyonu
float measureDistance(int trigPin, int echoPin) {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  long duration = pulseIn(echoPin, HIGH);
  return duration * SOUND_SPEED / 2;
}

// API'ye veri gönder
void sendDataToAPI(float distance, int locationId) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(apiUrl);
    http.addHeader("Content-Type", "application/json");

    String payload = "{\"distance\": " + String(distance) + ", \"locationId\": " + String(locationId) + "}";
    int httpCode = http.POST(payload);

    if (httpCode > 0) {
      Serial.print("HTTP Response Code: ");
      Serial.println(httpCode);
      String response = http.getString();
      Serial.println("Response: " + response);
    } else {
      Serial.print("Error on sending POST request: ");
      Serial.println(httpCode);
    }

    http.end();
  } else {
    Serial.println("Error: WiFi not connected");
  }
}

void setup() {
  Serial.begin(115200);
  
  for (int i = 0; i < 3; i++) {
    pinMode(trigPins[i], OUTPUT);
    pinMode(echoPins[i], INPUT);
  }

  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println("\nConnected to WiFi");

  if (!display.begin(SSD1306_SWITCHCAPVCC, SCREEN_ADDRESS)) {
    Serial.println(F("SSD1306 allocation failed"));
    while (true);
  }

  display.display();
  delay(2000);
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(SSD1306_WHITE);
}

void loop() {
  display.clearDisplay();

  for (int i = 0; i < 3; i++) {
    float distance = measureDistance(trigPins[i], echoPins[i]);
    String currentStatus = (distance < 14) ? "full" : "empty";

    Serial.print("Sensor ");
    Serial.print(i + 1);
    Serial.print(" - Distance (cm): ");
    Serial.println(distance);

    // OLED'e yaz
    display.setCursor(0, i * 20);
    display.setTextSize(2);
    display.print("A");
    display.print(i + 1);
    display.print(": ");
    display.print((currentStatus == "full") ? "FULL" : "EMPTY");

    // Eğer durum değiştiyse API'ye gönder
    if (currentStatus != lastStatuses[i]) {
      sendDataToAPI(distance, i + 1); // locationId = 1, 2, 3
      lastStatuses[i] = currentStatus;
    }
  }

  display.display();
  delay(1000);
}

