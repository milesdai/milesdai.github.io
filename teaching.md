---
title: Teaching
layout: default
---

I have an interest in general science/engineering education activities and a passion for teaching.
This is a selection of the teaching endeavors I have been a part of and the associated material I helped develop for them.
Some of these are official paid positions while others are unofficial courses I have taught such as through the MIT Educational Studies Program.

{% include toc.md %}

## MIT Courses

### 6.004: Computation Structures

*Teaching Assistant (Spring 2020, Spring 2021)*

[6.004](6004.mit.edu) is MIT's introductory computer architecture class.
As a TA, I was taught recitations, wrote quizzes, and managed the backend autograding infrastructure.

### 6.888: Secure Hardware Design

*Teaching Assistant (Fall 2020)*

[6.888](http://csg.csail.mit.edu/6.888Yan/) was a special subject offered in Fall 2020 that explored the principles of hardware attacks and how to design effective mitigations.
The course was taught by Professor Mengjia Yan and had a research-oriented, seminar-style structure.

As a TA, I was responsible for giving presentations on research papers and managing course logistics.
I also helped design the lab portion of the course which had students implement a covert communication channel between processes and steal a secret in a capture-the-flag-style assignment through a cache side channel.

[Cache Side Channel Lab](/assets/docs/6-888-lab.pdf)

[Keystone Paper Presentation](/assets/docs/6-888-keystone.pdf)

[Morpheus Paper Presentation](/assets/docs/6-888-morpheus.pdf)

[Graphene Paper Presentation](/assets/docs/6-888-graphene.pdf)

### 6.002: Circuits and Electronics

*Lab Assistant (Fall 2018-Fall 2019)*

6.002 is MIT's introductory circuits class.
Topics include circuit analysis, op-amp applications, and transistors.
Throughout the course, students build an ultrasound distance sensor to learn about various op-amp configurations.

As a lab assistant, I was responsible for testing out labs, debugging circuits, and teaching students how to use the test equipment.

In addition, as a side project, I helped develop an [RFID lab]({% post_url /projects/2019-03-15-rfid %}) for the course along with one of the TAs.

## MIT Educational Studies Program

These were courses that I developed for high school students through MIT's Educational Studies Program.
Some of these are adaptations of MIT courses while others are entirely of my own design.

### How Do Computers Work?

*Splash 2019*

This was my 2-hour take on 6.004 (MIT's introductory computer architecture course) and was designed for students in grades 9-12.

The inspiration for this class came from my TA experience in 6.004. I loved 6.004 because it peeled back all the abstractions in the computer for me. I loved how I could understand the whole computing stack down to the transistor level.

In the course of being a TA for this class, I realized that while the course covers a lot of details, the core intuition behind how a computer functions can be taught in a relatively short amount of time.
I went through the 6.004 syllabus and cut out all unnecessary details until I reached a barebones curriculum.
This was assembled into a single 2-hour lecture that takes students on a journey from a lone transistor all the way to the full computer processor.

### Beyond Arduino

*Splash for MIT*

This class aims to bridge the gap between Arduino and more serious firmware programming by taking a look at the Atmega328P microcontroller used on the Arduino board. Students learn about basic AVR architecture (a modified Harvard architecture), registers, and how to interact with the hardware in C and AVR assembly.

### Introduction to Organic Chemistry

*HSSP Spring 2017, Summer 2017, Summer 2018*

This was a 6-week course I developed to introduce students in grades 10-12 to organic chemistry. We aimed to provide a primer to the most important material covered in the first half of a first-semester organic chemistry course.

The goal of this course was to address a specific lack of intuition that I observed in the way organic chemistry is traditionally taught.
It is impossible to cover any significant amount of chemistry in a mere 6 weeks, so I focused heavily on developing chemical intuition and showing students how rich and practical chemistry can be performed with an understanding of relatively few rules.
This course was carefully refined over 3 semesters to produce an engaging and useful curriculum that received very positive feedback from students.

### Circuit Lab

*Splash 2018*

This course was designed to prepare students for the Science Olympiad Circuit Lab event. Since a single 2-hour class was too short to cover any significant amount of electronics theory, I decided to focus more on the lab component. The course had an emphasis on learning how to use breadboards and power supplies since I noticed through volunteering at Circuit Lab events in the past that this has traditionally been a challenging task for high school students to learn on their own.

### Basics of TI-BASIC

*Splash 2017*

This course introduced fundamental programming concepts through TI-BASIC, the built-in programming language on the TI-83 series of calculators. This course was designed to introduce students to a simple, readily-accessible language that many of them already had on their calculators. For students new to programming, we built a quadratic equation solver. For students who already had programming experience, we built a simple pong game.

The choice of langauge was not arbitrary. TI-BASIC was my first programming language, and I felt that it allowed me to intuitively figure out many programming constructs such as loops, conditionals, and functions without needing to read extensive documentation. Most of the syntax was intuitive, and most importantly, students did not need to bother with compilation details or setting up programming environments which can often be a large barrier of entry to learning to code. In this way, we can give students to tools to explore essential programming concepts on their own.
