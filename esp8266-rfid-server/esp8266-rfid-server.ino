
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ESP8266mDNS.h>
#include <SPI.h>
#include <MFRC522.h>

// Vivo hotspot credentials.
// The laptop and ESP8266 must use this same hotspot.
const char *UPSTREAM_WIFI_NAME = "vivo V70 Elite";
const char *UPSTREAM_WIFI_PASSWORD = "Xaviersorna1206";
const char *DEVICE_HOSTNAME = "smartport-rfid";

// NodeMCU wiring:
// SDA  = D2
// RST  = D1
// MOSI = D7
// MISO = D6
// SCK  = D5
constexpr uint8_t RFID_SS_PIN = D2;
constexpr uint8_t RFID_RST_PIN = D1;

// NodeMCU built-in LED is D4 / GPIO2 and is active LOW.
constexpr uint8_t RFID_LED_PIN = D4;
constexpr bool RFID_LED_ACTIVE_LOW = true;

// LED remains ON for 2 seconds after successful card scan
constexpr unsigned long RFID_LED_TIME = 2000;

MFRC522 reader(RFID_SS_PIN, RFID_RST_PIN);
ESP8266WebServer server(80);

unsigned long ledOnUntil = 0;

void setRfidLed(bool on) {
    digitalWrite(
        RFID_LED_PIN,
        on == RFID_LED_ACTIVE_LOW ? LOW : HIGH
    );
}

// ----------------------------------------------------
// Send JSON response
// ----------------------------------------------------
void sendJson(int statusCode, const String &body) {
    server.sendHeader("Access-Control-Allow-Origin", "*");
    server.sendHeader("Cache-Control", "no-store");
    server.send(statusCode, "application/json", body);
}


// ----------------------------------------------------
// Read RFID card UID
// ----------------------------------------------------
String readUid() {

    if (!reader.PICC_IsNewCardPresent() ||
        !reader.PICC_ReadCardSerial()) {
        return "";
    }

    String uid;

    for (byte index = 0; index < reader.uid.size; index++) {

        if (index > 0) {
            uid += " ";
        }

        if (reader.uid.uidByte[index] < 0x10) {
            uid += "0";
        }

        uid += String(reader.uid.uidByte[index], HEX);
    }

    uid.toUpperCase();

    // Stop communication with the card
    reader.PICC_HaltA();
    reader.PCD_StopCrypto1();

    return uid;
}


// ----------------------------------------------------
// /rfid endpoint
// ----------------------------------------------------
void handleRfid() {

    String uid = readUid();

    // Card successfully scanned
    if (uid.length() > 0) {

        setRfidLed(true);

        // Keep LED ON for 2 seconds
        ledOnUntil = millis() + RFID_LED_TIME;
    }

    sendJson(
        200,
        String("{\"uid\":\"") +
        uid +
        "\",\"status\":\"" +
        (uid.length() > 0 ? "card_read" : "waiting_for_card") +
        "\"}"
    );
}


// ----------------------------------------------------
// /health endpoint
// ----------------------------------------------------
void handleHealth() {

    sendJson(
        200,
        "{\"status\":\"online\",\"reader\":\"RC522\"}"
    );
}


// ----------------------------------------------------
// Unknown endpoint
// ----------------------------------------------------
void handleNotFound() {

    sendJson(
        404,
        "{\"error\":\"endpoint_not_found\",\"message\":\"Use GET /rfid or GET /health\"}"
    );
}


// ----------------------------------------------------
// SETUP
// ----------------------------------------------------
void setup() {

    Serial.begin(115200);
    delay(100);

    // Configure built-in LED
    pinMode(RFID_LED_PIN, OUTPUT);

    setRfidLed(false);

    Serial.println();
    Serial.println("Starting Smart Port RFID server...");


    // ------------------------------------------------
    // Start SPI
    // ------------------------------------------------
    SPI.begin();

    // Initialize RC522
    reader.PCD_Init();

    delay(50);

    byte version = reader.PCD_ReadRegister(reader.VersionReg);

    if (version == 0x00 || version == 0xFF) {

        Serial.println("ERROR: RC522 was not detected.");
        Serial.println(
            "Check 3.3V, GND, SDA=D2, RST=D1, MOSI=D7, MISO=D6, and SCK=D5."
        );

    } else {

        Serial.print("RC522 detected. Firmware version: 0x");
        Serial.println(version, HEX);
    }


    // ------------------------------------------------
    // Connect to WiFi hotspot
    // ------------------------------------------------
    WiFi.mode(WIFI_STA);

    Serial.print("Connecting to Vivo hotspot: ");
    Serial.println(UPSTREAM_WIFI_NAME);

    WiFi.begin(
        UPSTREAM_WIFI_NAME,
        UPSTREAM_WIFI_PASSWORD
    );

    unsigned long connectionStarted = millis();

    while (
        WiFi.status() != WL_CONNECTED &&
        millis() - connectionStarted < 20000
    ) {

        delay(500);
        Serial.print(".");
    }

    Serial.println();


    // ------------------------------------------------
    // WiFi connected
    // ------------------------------------------------
    if (WiFi.status() == WL_CONNECTED) {

        WiFi.hostname(DEVICE_HOSTNAME);

        // Start mDNS
        if (MDNS.begin(DEVICE_HOSTNAME)) {

            MDNS.addService("http", "tcp", 80);

            Serial.println(
                "Automatic website address:"
            );

            Serial.println(
                "http://smartport-rfid.local/rfid"
            );

        } else {

            Serial.println(
                "WARNING: Automatic hostname unavailable; "
                "use the printed IP address."
            );
        }


        Serial.print(
            "Vivo hotspot connected. Use this endpoint: http://"
        );

        Serial.print(WiFi.localIP());

        Serial.println("/rfid");

        Serial.print("Health endpoint: http://");

        Serial.print(WiFi.localIP());

        Serial.println("/health");

    } else {

        Serial.println(
            "ERROR: Could not connect to Vivo hotspot."
        );

        Serial.println(
            "Check the hotspot name, password, and that the hotspot is ON."
        );
    }


    // ------------------------------------------------
    // Web server routes
    // ------------------------------------------------
    server.on(
        "/rfid",
        HTTP_GET,
        handleRfid
    );

    server.on(
        "/health",
        HTTP_GET,
        handleHealth
    );

    server.onNotFound(
        handleNotFound
    );


    // Start web server
    server.begin();

    Serial.println(
        "RFID server ready. Use the IP printed above."
    );

    Serial.println(
        "Waiting for RFID card..."
    );
}


// ----------------------------------------------------
// LOOP
// ----------------------------------------------------
void loop() {

    // Handle web requests
    server.handleClient();

    // Update mDNS
    if (WiFi.status() == WL_CONNECTED) {
        MDNS.update();
    }


    // ------------------------------------------------
    // Turn LED OFF after 2 seconds
    // ------------------------------------------------
    if (
        ledOnUntil != 0 &&
        millis() >= ledOnUntil
    ) {

        setRfidLed(false);

        ledOnUntil = 0;
    }
}
