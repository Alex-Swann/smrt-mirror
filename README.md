# S.M.R.T mk II

## TODO

- ~~User stories?~~
- Set up Rails app (with MongoDB/Mongoid)
- Set up Raspbian on a Raspberry Pi (enable SSH and wifi)
- Clone rails repo to Raspberry pi
- Set up RP to auto-kiosk-mode a browser and load the rails app

-----------------

## User stories
```
As a User
So that I can check the time and date handsfree
I want a smart mirror to tell me the time and date
```

```
As a User
So that I can dress appropriately
I want a smart mirror to show me the local weather
```

```
As a User
So that I can plan my journey to work
I want a smart mirror to alert me of any disruptions on my usual journey
```

```
As a User
So that I can configure a smart mirror to my liking
I want to add widgets from a control panel
```

```
As a User
So that I can see information that is relevant to me
I want to customise the widgets
```

```
As a User
So that I can further configure a smart mirror
I want to position widgets where I like
```

```
As a green User
So that I can save electricity
I want to put a smart mirror to sleep with a gesture
```

-----------------

## MVP
- Customisable dashboard
  - Widgets
    - TfL updates
    - Weather
    - Time / Date

## Nice to haves (~priority order)
- Gestures (leapmotion)
  - Sleep / Wake app
  - Switch users
  - Close notifications
- Mobile (pushbullet) notifications
- Further dashboard widgets
  - Emails
  - Calendars
  - News feed
- Multiple user accounts
- Themes: fonts, styles
- Screensaver art when idle
- Drag-and-drop to set widget layout
- Audio alarm

----------------

### Suggested data structure
```
{
  name: 'Jane',
  widgets: {
    time: {
      format: 'dd-mm-yy, h:MM'
      gridPosition: '0,0'
    },
    weather: {
      location: 'N4 1AB',
      gridPosition: '0,1'
    },
    travel: {
      tubes: ['piccadilly', 'victoria'],
      buses: [259, 279],
      gridPosition: '0,2',
      gridSize: '3,1'
    }
  }
}  
```
