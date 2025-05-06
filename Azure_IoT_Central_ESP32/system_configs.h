#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_RESET -1
#define SCREEN_ADDRESS 0x3C

#define SOUND_SPEED 0.034

// Sensor Pins
const int trigPins[3] = {5, 14, 26};
const int echoPins[3] = {18, 27, 25};

