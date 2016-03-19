# flying-squid-schematic

Flying-squid plugin providing /listSchemas and /loadSchema commands.
You can add schema through a simple http api and then add them in your world by just calling /loadSchema in game.

## Usage

To use it : `npm install flying-squid-schematic` in your flying-squid instance.
And then add something like this in your settings:
```json
"flying-squid-schematic": {
    "port":12000,
    "endPoint":"localhost"
  }
```

## History

### 1.0.1

* bump schematic-to-world

### 1.0.0

* bump dependencies

### 0.0.1

* update schematic-to-world to fix a bug with mc-schematic

### 0.0.0

* basic functionality
