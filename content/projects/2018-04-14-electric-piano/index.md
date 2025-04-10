---
title: Electric Piano
type: page
date: 2018-04-14
---

MIT hosts an annual event called Campus Preview Weekend (CPW) for admitted students in April. During this event, student groups across campus will put on events to entice the pre-frosh to come to MIT (and maybe even join their group). In my dorm, Next House, I lead a student group called Next Make in which a group of people interested in electrical and mechanical projects come together to work on a project in their spare time. Next Make hosts a "Solder Your Own Circuit Board" event during CPW in which the club members design a PCB and have the pre-frosh come solder components to the board. Afterwards, they can take home a nice little PCB that they put together.

This year, we decided to make an electric piano with 8 pushbuttons as keys and a 555 timer to generate the tones. In addition, I added a potentiometer to tune the device and a photoresistor to create a pitch-bending, light-theremin effect. When switched on, the pitch bend allows the user to distort the sound by waving their hand over the photoresistor.

## Circuit

The circuit was a simple piano circuit that used a stack of resistors in series to create variable resistances that controlled the frequency output by a 555 timer.

{{<figure
  src="schematic.png"
  alt="schematic of the piano circuit"
  caption="Piano circuit"
  width=80%
>}}

## PCB Layout

I designed the PCB in Eagle and had it manufactured by PCBWay which had a surprisingly good turnaround time. I believe the PCBs arrived under a week from the time I ordered them. The immersion gold contacts on the black soldermask looked fantastic.

{{<figure
  src="boardlayout.png"
  alt="PCB board layout"
  caption="PCB Layout"
  width=60%
>}}

{{<figure
  src="pcbrendering.png"
  alt="PCB Rendering"
  caption="Eagle PCB Rendering"
  width=60%
>}}

{{<figure
  src="pianopcb.jpg"
  alt="Piano PCB photo"
  caption="Final manufactured board"
  width=60%
>}}
