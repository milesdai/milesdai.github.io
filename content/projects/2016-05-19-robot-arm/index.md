---
title: Robot Arm
type: page
date: 2016-05-19
---

## Construction

I built this robot arm with Jarod Throckmorton for the Carmel High School Science Olympiad team. The task was to move various objects (pencils, dice, ping-pong balls, and Lego bricks) into several target areas as quickly as possible. Due to the required versatility, we realized that the final device would have too many actuators to control individually and efficiently. Therefore, a leader-follower approach in which the motions performed on a small version of the arm are mirrored on the main arm makes the most sense.

The device was controlled using two Arduino Uno boards. The positions on the leader arm were encoded with potentiometers and were transmitted to the Arduino which would then mirror the actions on the servos controlling the follower arm. The use of two Arduinos was not strictly necessary, but the parallel processing improved the responsiveness of the device.

The leader arm is constructed out of stacked layers of basewood that were lasercut and then glued together. The follower arm was milled out of aluminum on a CNC machine and has a similar stacked-layer construction.

We used PowerHD high-torque digital servos from Pololu in several different torque ratings with the largest servos (Power HD-1235MG) being used to control the rotation of the arm and the first pivot at the base of the arm. Smaller servos were used farther along the arm.

{{<figure
  src="control-box.jpg"
  alt="Control box assembly"
  caption="Wiring up the signal control box. We made a box to assist with wire management and avoid wiring mistakes when plugging in the components during the competition."
  width=60%
>}}

{{<figure
  src="control-box-assembled.jpg"
  alt="Assembled control box"
  caption="Assembled control box"
  width=60%
>}}

{{<figure
  src="cnc.jpg"
  alt="CNC machining the follower base plates"
  caption="CNC milling to create the base plates for the follower."
  width=60%
>}}

{{<figure
  src="arm-mechanics.jpg"
  alt="Assembled robot arm"
  caption="Assembled robot arm without electronics."
  width=60%
>}}

### Gripper

The gripper is made up of laser-cut acrylic stacked and glued together. It is mounted to a 3D printed housing and has rubber pads on the ends to assist with gripping. The ends turned out to be too small to grab the ping pong balls reliably, so they were replaced with large disks of acrylic padded with rubber were attached to the fingers with epoxy.

{{<figure
  src="initial-gripper.jpg"
  alt="First version gripper."
  caption="First version of the gripper."
  width=40%
>}}

## Results

The robot arm won eighth place out of 60 teams at the 2016 National Science Olympiad tournament with a perfect score.

{{<figure
  src="light-up-robot.jpg"
  alt="Robot with LED strips."
  caption="Final version of the robot illuminated with LED strips."
  width=60%
>}}
