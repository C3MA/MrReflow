![Invent This, Invent That](schematics/IT2-logo.png)

# ESPReflow
Firmware for SMT reflow controller.

> **!!! WARNING: This project deals with mains power and high current !!!**
> Please be careful if you wish to replicate any of it's functionality and never work on a PCB or any open wires that are connected to the mains !
> Author has no responsibility for your safety and wellbeing, so please take care of yourself.

This is a simplified version of the original one from https://github.com/foxis/ESPReflow,
it uses the simpler jquery webfrontend, a normal 3d printer thermistor and no additional IO chip, also the pcb integrates a small powersupply to allow direct wiring into the oven

## Modes of operation
### Reflow

In this mode the controller will perform reflow algorithm following selected reflow profile.
Controller will turn off the mode once the temperature reaches safe values after the profile is completed.

### Calibrate

In this mode a selected calibration algorithm will be used to find optimal PID controller parameters.
Controller will turn off the mode once the temperature reaches safe values after the calibration is completed.

### Keep Target

In this mode the controller will reach and maintain target temperature. Useful to check PID configuration. `default` PID configuration will be used in this mode.

# Flashing

There are two ways to flash the controller - via serial or via OTA.

## Serial

Find `RX/TX/GND` pins on the board, connect your serial adapter and flash either Arduino, PlatformIO or whatever flasher you like.
**NOTE: `RX/TX` pins are NOT 5V tolerant. Please use 3.3V serial adapter or level shifter from 5V**

## OTA

When the controller is first turned on it creates an AP with the name `ESPReflow` and the ip address `192.168.4.1`. Connect to the controller, wait until the page loads and go to `Setup`, enter WiFi SSID and credentials. Save the configuration and reboot.
After this is done it will connect to the specified WiFi AP and will register it's own domain as `ReflowControl.local`.
Tuning and operation of the controller can then be done.

## OTA HTTP upload

You can upload a firmware binary using `Setup` - just upload the new firmware on the WebUI.

# Usage

## Connect your hotplate/oven

### Hot plate

### IR Hot plate
![IR hotplate in action](doc/ir-hotplate-on.jpg)

## K-type thermal probe

Thermocouple must be placed on a dummy board, that would approximately resemble the target boards. For best results that board must be placed in a similar matter as the target board. Furthermore, since hotplates do not heat evenly(even some ovens), care must be taken to allow dummy board be heated the same way as the target board(i.e. it must be placed approximately the same distance and orientation as the target board in respect to the heating elements). Otherwise you may burn the target board.

## PID tuning

PID tuning must be done for every heating device individually. You can do it by trial and error, or ESPReflow can do it for you. There are several auto tuning algorithms available (a slightly modified [PID-aTune library fork](https://github.com/t0mpr1c3/Arduino-PID-AutoTune-Library)):

*		ZIEGLER_NICHOLS_PI
*		ZIEGLER_NICHOLS_PID
*		TYREUS_LUYBEN_PI
*		TYREUS_LUYBEN_PID
*		CIANCONE_MARLIN_PI
*		CIANCONE_MARLIN_PID
*		AMIGOF_PI
*		PESSEN_INTEGRAL_PID
*		SOME_OVERSHOOT_PID
*		NO_OVERSHOOT_PID"

## Reflow profile

# Problem Solving

## Unable to properly tune IR Hot plate

During development a cheap IR hot plate was used. I found that if you place your temperature probe and the boards on the hot plate itself it would be very hard to control the temperature of the board properly. So, I used aluminium raisers, that raise the board around 5-10mm from the hot plate so that IR radiation would heat the boards instead of the glass plate.
