---
title: Harry Potter Clock
type: page
date: 2018-02-24
---

## Background

For MakeMIT 2018, my team and I decided to recreate the Weasley Family clock from Harry Potter. In the movies, there is a clock that uses multiple hands to display the location of each person in the family. We endeavored to make this happen using the popular IoT board, the ESP8266.

## Operation

People are able to update their locations through a web app that uses MIT Kerberos authentication to identify the user. This is sent to a server that is polled by the ESP8266. When someone updates their position, the board will move the servo to the correct position. Gearing on the back of the board was required to step up the angular range of the servos to the full 360 degrees.

{{<figure
  src="clockfront.jpg"
  alt="Clock face"
  caption="Clock face: each circle belongs to a person, and the symbols represent the location of each individual."
  width=40%
>}}

{{<figure
  src="clockback.jpg"
  alt="Clock face"
  caption="The gearing system for the servos and the ESP8266 mounted to the back."
  width=40%
>}}
