---
title: RFID Lab
type: page
date: 2019-03-15
---

In this project, we explore how an RFID reader can wirelessly transmit data and show one method for demodulating the data with simple components.

{{< notice note >}}
This project was developed in collaboration with Melinda Szabo and was turned into a lab for 6.002 (Circuits and Electronics), MIT's introductory electronics course.
The materials and techniques used were selected to work with the curriculum and the teaching goals.
{{< /notice >}}

<!-- I was first exposed to RFID technology as an undergraduate, where I would use my ID card to tap against a card reader to access locked buildings. -->
<!-- Curious about the technology, I was excited to see that the introductory circuits class advertised a lab that explored how MIT's card access system worked. -->
<!-- The version of the lab I took consisted of looking at the FFT of the signal emitted by the card reader and observing how it changed when a card was brought in close proximity. -->
<!-- This didn't quite provide a satisfactory explanation since it did not discuss exactly how bits were encoded nor how the signal could be demodulated. -->
<!-- After working as a lab assistant for this course for three semesters, I began to develop the following extension to the lab to dive a bit deeper. -->

<!-- To understand how an end-to-end RFID system is put together, we will first look at how an RFID tag wirelessly communicates with the reader. -->
<!-- Then, we will discuss how data can be encoded over this signal. -->
<!-- Lastly, we will look at how to parse such a signal and build a card reader. -->

## Background

The RFID technology used in MIT's card access control system is known as *passive RFID*.
In a passive system, the tag iself (i.e. the ID card) does not contain a power source.
Instead, energy from the signal emitted by the card reader is used to power the tag.
When a tag is energized by a reader, it will begin to transmit its pre-programmed ID value which can be read by the reader.

Before going further, it should be noted that there are many different implementations of RFID technology.
The most popular variants for ID cards operate at 125 kHz and 13.56 MHz.
In this lab, we explore the 125 kHz variant.

### Transmitting Information via Load Modulation

The first problem to tackle is how information is sent at all between the card and the reader.

To both power the tag and receive data, the reader contains two coils.
One coil acts as a transmitter, emitting the 125 kHz carrier wave, and the other acts as a receiver.
The tag contains another coil that receives the carrier and is connected to an LC resonant circuit.
The carrier wave induces a voltage in the tag's receiver coil from which power can be harvested.
Additionally, the tag also contains a transistor across its receive coil that can be turned on and off, loading and unloading the resonant circuit respectively.
This causes an amplitude change (modulation) of the induced voltage on the tag.
The effect of this modulation can then be picked up by the receiver coil in the reader.
The reader sees an amplitude-modulated signal on its receiver coil that can be decoded to extract data.
This technique of sending data is known as *load modulation*.

### Encoding Data with Phase-Shift Keying (PSK)

With the ability now to transmit information through backscatter modulation, we can turn our attention to encoding data.

Backscatter modulation gives us the ability to transmit an amplitude-modulated wave.
As such, the most basic approach is to simply encode the bits directly, representing a 1 with a high-amplitude wave and a 0 as a low-amplitude wave.
Direct modulation provides a high data rate (1 bit per cycle) but can suffer from low noise immunity since the disruption of a single cycle will lead to silent data corruption.

Data rate and noise immunity can be traded off for each other though.
Another approach is to use two cycles to send each bit so that data is being sent at the rate f_c/2.
Each bit must consist of a high-amplitude signal and a low-amplitude signal.
If the bit is a 0, we sent a high cycle followed by a low cycle.
If the bit is a 1, we send a low cycle followed by a high cycle.
If 

## Decoding the Signal

The most direct approach to decoding is to feed the signal into the ADC of a microcontroller and handle all signal processing in software.
How fast would an ADC have to sample to process our amplitude-modulated signal?
The Nyquist frequency for the 125 kHz carrier wave is 250 kHz, indicating that our ADC must have a *minimum* sampling rate of 250 kHz.
This would give us just two samples per cycle.
In practice, to be able to detect minor differences in amplitude, we would want more like 16 samples per cycle, increasing our minimum required ADC sampling rate to 2 MHz.
However, the course this lab was designed for uses the Teensy 3.1 development board, which does not have a sufficiently fast ADC[^0].
As a result, for this lab, we chose to perform the signal processing in an analog frontend which would generate fast, logic-level pulses that could be fed into a digital input on the Teensy.

### Analog Frontend

The frontend takes advantage of the fact that two consecutive high or low peaks in the signal corresponds to a phase shift.
We can use a comparator to detect when these high peaks occur and output a clean, logic-level signal for the Teensy.
This approach is shown in Figure 4 with an example phase-shifted waveform.
Notice how the falling edges on the comparator output are farther apart when a phase shift occurs.

{{<figure
  src="phase-shift-detection.png"
  alt="Graph showing when pulses are generated by the phase-shift detector"
  caption="Figure 4: The comparator threshold (red) is set between the amplitudes of the high and low peaks of the modulated signal (purple). The comparator output is shown in orange."
  width=70%
>}}

We implement this approach in the circuit shown in Figure 5.

{{<figure
  src="analog-frontend.png"
  alt="Circuit schematic of the RFID reader"
  caption="Figure 5: Analog frontend for processing the ID card signal."
  width=80%
>}}

The schematic represents the ID card as a signal generator producing an amplitude-modulated sine wave at 125 kHz.
This is picked up by the receive coil (represented by the secondary side of the transformer).
Upon receiving the signal, the first stage of the circuit is a notch filter tuned to attenuate the 125 kHz component of the signal.
This has the effect of incrasing the amplitude difference between the high and low peaks.

The signal is then amplified by the TLV2371 op-amp.
To avoid loading down pickup coil and the notch filter, a non-inverting amplifier configuration was used.[^2]
We found a gain of 20 to be sufficient.

In the final stage of the circuit, an LM311 comparator generates pulses on each high peak.
The LM311 is an open-collector device so the pullup resistor is needed to pull the output high.[^3]
This was necessary during testing, but when it was connected to the Teensy, we just configured the internal pullup resistor to perform this function.
The output of the LM311 goes into a digital input pin on the Teensy.

TODO: show traces if possible

#### Practical Details

Before using this circuit, we need to wind two coils: one to serve as the transmitter to excite the card and another to act as a receiver to pick up the modulated signal.
In a practical system, both of these coils are contained within the card reader.
For a proof-of-concept, the coil construction is not particularly demanding.
Both coils have a 3-inch diameter and can be made by winding 10 turns of 22 AWG wire.

The transmit coil is connected directly to a signal generator set to produce a 20 V peak-to-peak sine wave.
This simulates the signal emitted by the card reader and should cause the ID card to begin emitting the amplitude-modulated signal.
The receive coil is connected in the place of the transformer secondary in Figure 5 above.
When running the circuit, the two coils are stacked vertically, and the ID card is sandwiched in the middle.
A binder clip can be used to hold everything together during operation.

### Firmware

The output of the LM311 comparator is fed into a digital input on the Teensy.
A falling-edge-triggered interrupt can be configured to detect pulses which can then be processed by the main loop.
The attached ISR can then record the elapsed time and signal that an edge was found.

As discussed previously, one bit is sent every 16 pulses.
We can use a state machine to parse the bits as we detect them.
Following from the structure of the ID number on the MIT badges, there are four states: WAITING, TRIGGERED, CONSTANT, and PERSONAL.
The first two states handle initialization and reading the initial sequence of zeros while the last two states handle reading the constant bits and the personal bits respectively.

- `WAITING`: The firmware defaults to the WAITING state.
  In this state, it simply waits until it finds 30 consecutive zeros.
  There is some additional logic to perform the correct initializations for next stage.
  Once 30 zeros are found, the state transitions to `TRIGGERED`.
- `TRIGGERED`: this state simply waits for a phase shift (i.e. a bit flip) before transitioning to the `CONSTANT` state.
  This assumes that the constant starts with a 1 and helps prevent frame-shift errors which might occur if the previous data packet ended with a string of zeros.
- `CONSTANT`: in this state we start reading the constant bits until we have enough bits to transition into the `PERSONAL` state.
- `PERSONAL`: this state accumulates the personal bits.
  Once enough bits have been found, the firmware can perform any authentication checks needed.
  In the lab with students, we checked the personal bits against a hardcoded list in the firmware.

The biggest challenge faced when writing this code is correcting many off-by-one errors during the reading of the different bits.
Because the firmware is interacting with a real-time system, debugging with techniques like print statements needs to be done carefully to avoid interfereing with the timing.

### Detecting Phase-Shifted Signals

The actual method of sending data across the signal is known as phase-shift keying (PSK).
Bits are sent using the wave by creating phase-shifts to signal bit flips.
Before getting into how the data is encoded, we first need to understand the concept of the 125 kHz wave as a carrier wave.
The data is actually encoded on half the frequency of the carrier (i.e. at 62.5 kHz).
This signal is carried by the 125 kHz wave that is sent back to the reader.

{{<figure 
  src="modulation1.png"
  alt="Graph showing a 62.5 kHz signal sent over a 125 kHz carrier frequency."
  caption="Figure 1: Base carrier frequency from the card reader (red), 62.5 kHz data signal (green), the resulting signal sent back to the card reader as the sum of the carrier and the data frequency (purple)."
  width=70%
>}}

Notice in Figure 1 how the resulting purple waveform is actually the sum of the carrier frequency and the data frequency.
Because the data frequency is half the carrier frequency, the carrier frequency has alternating high and low peaks.
The actual data frequency is visible in the envelope of the carrier frequency.
One more important concept for phase-shift encoding is the phase-shift itself.
In our system, we use a form of PSK known as binary PSK (BPSK).
In this protocol, we use 180-degree phase shifts to convey information.
Coincidentally, a 180-degree phase shift corresponds to simply inverting the signal vertically.
Figure 2 shows two different methods of phase shifting.

{{<figure
  src="phase-shift.png"
  alt="Graph showing two ways a phase-shift may occur in a signal."
  caption="Figure 2: The red waveform shows the phase shift occurring at the zero crossing. The blue waveform shows the phase shift occurring at the peak of the wave."
  width=70%
>}}

The red waveform in Figure 2 shows what's called zero-crossing BPSK.
The phase shift occurs when the waveform crosses zero.
This scheme is generally preferable because the sharp edge transition in the blue waveform potentially introduces noise into the system.

Now, we are ready to see the effect of the phase shift on the carrier signal.
Figure 3 is Figure 1 repeated except with a phase shift in the signal that carries the data.

{{<figure
  src="modulation2.png"
  alt="Graph showing the impact of a phase shift on the signal."
  caption="Figure 3: The effect of a phase shift on the signal wave."
  width=70%
>}}

Notice in the normal modulated carrier wave, the 62.5 kHz modulation causes alternating high and low peaks in the carrier.
The effect of the phase shift is to cause two consecutive high points or two consecutive low points.
This is a very distinctive characteristic that we can take advantage of to detect a phase shift.
Note that we are using a more unconventional way of detecting this signal.
More traditional demodulation approaches involve multiplying the signal with the original carrier wave to recover the data.
However, for our purposes, the use of a comparator is sufficient.

We use a comparator set at the right level to detect the peaks in the signal that is broadcast by the card.
Notice in Figure 4 how the falling edges on the comparator waveform are much farther apart when there is a phase shift.
This can be detected by a microcontroller which can now decode this signal.

{{<figure
  src="phase-shift-detection.png"
  alt="Graph showing when pulses are generated by the phase-shift detector"
  caption="Figure 4: a comparator can be used to detect when the modulated signal (purple) goes above a threshold (red). The comparator output is shown in orange."
  width=70%
>}}

As a side note, the details regarding how the RFID tag actually generates this signal and modulates the carrier wave is beyond the scope of this particular project.
I will most likely do another writeup going through the details of that and showing how to use a microcontroller to spoof the card itself.
For now, we will concern ourselves with just reading the card.

### Data Encoding: Phase Shift Keying

The last question that remains about this system is how the data is actually encoded.
That is, how do we use the idea of phase shifting to actually convey an ID number?
The protocol used by our ID system sends one bit every 16 cycles of the data signal (i.e. the 62.5 kHz wave).
If the next bit is different from the current bit (i.e. there is a bit flip), then the tag will phase shift the data signal by 180 degrees.
Otherwise, the next bit will be assumed to be the same as the previous bit.
Because this protocol relies on knowing the previous bit, we need to know what the first bit is.
The protocol also specifies that the data packet will always begin with a long string of 0s.
This gives us the initialization value. [^1]

## Circuit

{{<figure
  src="reader_circuit.png"
  alt="Circuit schematic of the RFID reader"
  caption="Figure 5: Full circuit for reading the data off an ID card."
  width=70%
>}}

The card reader on the far left is modeled as the primary of an air-core transformer.
The RFID card contains a pickup coil which is modeled as the secondary of the transformer.
When testing this in lab, we used a signal generated hooked up directly to a 3-inch diameter coil of wire with about 10 turns on it to simulate the signal the card reader is producing.

The first stage of the circuit cleans up the signal.
The desired information is contained within the 62.5 kHz wave; however, this is still superimposed on a strong 125 kHz signal.
To remove this, we found that a notch filter works well for this purpose. Lf, Cf, and Rf formed the notch filter.

Afterwards, the signal needs to be amplified.
This was done with a TLV2371 op-amp.
To avoid loading down pickup coil and the notch filter, a non-inverting amplifier configuration was used.[^2]
We found a gain of 20 to be sufficient.

In the final stage of the circuit, we actually decode the signal.
The LM311 is an [open-collector device](http://www.learningaboutelectronics.com/Articles/Open-collector-output.php), so the pullup resistor is needed to pull the output high.
This was necessary during testing, but when it was connected to the Teensy, we just configured the internal pullup resistor to perform this function.
The output of the LM311 goes into the Teensy.

## Code

The resulting comparator output was read by a digital pin on a Teensy 3.1 which was the microcontroller used by the class for all the labs.
A falling-edge-triggered interrupt was used to detect edges which would then be processed by the main work loop.
The edge interrupt calls an attached interrupt service routine (ISR).
It is good practice to keep the ISR as short as possible, so the ISR simply records the elapsed time and raises a boolean edgeFound flag which is then polled by the main work loop.

The most straightforward way of approaching the code for the work loop was by implementing a state machine.
There are four states for the microcontroller: WAITING, TRIGGERED, CONSTANT, and PERSONAL.
The first two states handle initialization and reading the initial sequence of zeros while the last two states handle reading the constant bits and the personal bits respectively.
The work loop polls the edgeFound flag, and when it finds and edge, runs through the state machine logic.

- WAITING: The microcontroller defaults to the WAITING state.
  In this state, it simply waits until it finds 30 consecutive zeros.
  There is some additional logic to perform the correct initializations for next stage.
  Once 30 zeros are found, the state transitions to TRIGGERED.
- TRIGGERED: this state simply waits for a phase shift (i.e. a bit flip) before transitioning to the CONSTANT state.
  This assumes that the constant starts with a 1 and helps prevent frame-shift errors which might occur if the previous data packet ended with a string of zeros.
- CONSTANT: in this state we start reading the constant bits until we have enough bits to transition into the PERSONAL state.
- PERSONAL: this state accumulates the personal bits.
  Once enough bits have been found, it first checks the constant bits to determine if the card is indeed for the MIT system and then looks through the database of pre-recorded personal bits and attempts to look up the name associated with the card.

The biggest challenge faced when writing this code is correcting many off-by-one errors during the reading of the different bits.
While the Teensy is running at 96 MHz, the pulses are occuring at a frequency of 62.5 kHz, so print statements need to be used cautiously to ensure that they do not interfere with the timing.

## Future Work

The other half of this project involves implementing an RFID spoofer.
While there currently exist purpose-built, monolithic IC solutions for modulating the incoming 125 kHz signal, it is elucidating to implement a system that can also perform this modulation, for example, through a Teensy.
One benefit of this is that if a brute-force attack is being attempted, it is much faster to simply have a microcontroller run through the different sequences rather than have to re-program an IC for each attempt.

## Acknowledgements

We took inspiration and information from several prior projects:

* [The MIT ID Card System: Analysis and Recommendations](https://groups.csail.mit.edu/mac/classes/6.805/student-papers/fall04-papers/mit_id/)
* [RFID Tunnel Project Report](http://web.mit.edu/6.101/www/s2014/projects/bvasquez_Project_Final_Report.pdf)
* [Arphid - anonymous post](https://media.boingboing.net/wp-content/uploads/2018/04/handout.pdf)

## Footnotes

[^0]: Some quick searching online suggests that, in general, the ADC on the Teensy 3.1 is usually sampled under 100 kHz.
Digging into the [K20P64M72SF1 reference manual](https://www.pjrc.com/teensy/K20P64M72SF1RM.pdf), there is an example short ADC conversion time calculation in section 31.4.5.6.3 that shows that even an 8-bit acquisition driven by a 20 MHz ADC clock takes 1.45 us (about 690 kHz).
Therefore, it seems unlikely that the Teensy will have a sufficiently fast ADC.
More modern microcontrollers such as the STM32 chips on the Nucelo development boards would be better alternatives.

[^1]: In practice, this string of zeros most likely serves as a synchronization sequence for the decoder in commercial RFID readers.
  The string of zeros creates a long sine wave that is uninterrupted by phase shifts.
  This allows something like a phase-locked loop to synchronize the reader's clock with the data signal since the decoding process requires multiplying the modulated signal by the unmodulated version.

[^2]: The non-inverting amplifier configuration sends the signal directly into the non-inverting input of the op-amp.
  Becuase the input impedance of the op-amp is high, this prevents current from flowing out of the circuit and into the amplifier.
  In other words, from the point of view of the notch filter, the op-amp does not exist.
  This is opposed to an inverting configuration in which the signal travels through two resistors which will present a much lower impedance than that of the op-amp.

[^3]: [More information about open-collector outputs.](http://www.learningaboutelectronics.com/Articles/Open-collector-output.php)
