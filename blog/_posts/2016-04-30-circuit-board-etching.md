---
title: Circuit Board Etching
layout: post
thumbnail: /assets/img/pcb-etch/pcbEtch3.jpg
tags:
  - PCB Design
  - Electrical Engineering
---

If you want a single custom PCB, it might make more sense to etch your own board than to send it off for fabrication.
<!--more-->

<div class="center">
    <img src="/assets/img/pcb-etch/pcbEtch1.jpg" alt="Etching setup" class="three-image-row">
    <img src="/assets/img/pcb-etch/pcbEtch2.jpg" alt="PCB after etching" class="three-image-row">
    <img src="/assets/img/pcb-etch/pcbEtch3.jpg" alt="PCB after cleaning" class="three-image-row">
</div>
*Etching setup (left). PCB immediately after removal from the etching bath (middle). PCB after cleaning (right).*

## Procedure

<p class="message">
  <b>Warning:</b> Etching PCBs involves corrosive chemicals and generates chemical waste. Protective equipment is necessary, and a waste disposal procedure must be in place. The etching solution cannot be poured down the drain.
</p>

The PCB was created using the toner transfer method. There are more in-depth tutorials for this online, but basically, the pads and traces are printed onto a glossy paper. This pattern is transferred using an iron on to copper clad board. The toner serves as a mask that protects the copper underneath from being attacked by the etchant. The areas where the toner did not fully transfer were filled in with white-out which we found worked best at preventing unintended etching.

We used 3% hydrogen peroxide and 10 M hydrochloric acid (diluted down to approximately 1 M) sold as muriatic acid at the hardware store. Exact quantities and ratios are not critical, but it is worthwhile to run some tests first before trying on your final board. Also, the acidified copper waste (green solution) can either be stored for future use (the \\(CuCl_2\\) is also a very good etchant!) or disposed of properly by neutralizing with aluminum foil or taking it to a hazardous waste disposal area.

## Chemistry

The chemistry behind this etchant is fairly interesting. In the initial solution, hydrogen peroxide (\\(H_2O_2\\)) is the oxidizing agent that will attack the copper in the acidic conditions to produce \\(Cu^{2+}\\).

\$\$Cu(s) + H_2O_2(aq) + 2H^+(aq) \rightarrow Cu^{2+}(aq) + 2H_2O(l)\$\$

The green solution is due to the copper(II) chloride that is produced. (In the presence of copper, the hydrogen peroxide also decomposes into water and oxygen which explains the gas bubbles that are formed, but this is not relevant to the etching.)

The \\(CuCl_2\\) that is produced in this reaction is also an oxidizing agent, so the resulting green solution can be reused! It undergoes the following synproportionation redox reation with metallic copper:
\$\$Cu(s) + CuCl_2(aq) \rightarrow 2CuCl(aq)\$\$
The formation of brown copper(I) chloride indicates that the solution is saturating its etching capacity. To regenerate the green copper(II) solution, add more acid and hydrogen peroxide to re-oxidize the copper(I). This solution theoretically produces no waste as long as you intend to keep etching PCBs.
