import { MIDIVal } from "@midival/core";
import { NodeMIDIAccess } from "@midival/node";
import * as midi from "midi";

MIDIVal.configureAccessObject(new NodeMIDIAccess(midi));

import { MIDIVal, MIDIValInput } from "@midival/core";

MIDIVal.connect()
.then(access => {
    if (!access.inputs) {
        console.warn("No inputs yet");
        return;
    }
    const input = new MIDIValInput(access.inputs[0]);
    input.onAllNoteOn(message => {
        console.log("Note On", message.note, message.velocity);
    });
});

import { MIDIVal, MIDIValInput } from "@midival/core";

MIDIVal.connect()
.then(access => {
    if (!access.inputs) {
        console.warn("No inputs yet");
        return;
    }
    const input = new MIDIValInput(access.inputs[0]);
    input.onAllNoteOn(message => {
        console.log("Note On", message.note, message.velocity);
    });
});

MIDIVal.connect()
.then(access => {
    if (!access.outputs) {
        console.warn("No outputs yet");
        return;
    }
    const output = new MIDIValOutput(access.outputs[0]);
    output.sendNoteOn(64, 127);
    setTimeout(() => {
        output.sendNoteOff(64);
    }, 200);
});

const unsubscribe = input.onAllNoteOn((msg) => console.log(msg))

setTimeout(unsubscribe, 10000); // unsubscrbe after 10s.

input.onAllNoteOn(message => {
    console.log(`[Note On] Note: ${mesage.note} Velocity: ${message.velocity} Channel: ${message.channel}`)
})

input.onNoteOn(60, triggerHighHat)
input.onNoteOn(62, triggerSnareDrum)
input.onNoteOn(64, triggerBassDrum)

input.onAllNoteOff(message => {
    console.log(`[Note Off] Note: ${message.note} Velocity: ${message.velocity} Channel: ${message.channel}`)
})

input.onNoteOff(60, stopHighHat)
input.onNoteOff(62, stopSnareDrum)
input.onNoteOff(64, stopBassDrum)

input.onAllControlChangeMessage(msg => {
    console.log(`[CC] Control: ${msg.control} Value: ${msg.value} Channel: ${msg.channel}`)
})

input.onControlChangeMessage(1, msg => {
    console.log(`Modulation wheel value: ${msg.value}`)
})

import { ControlChange } from '@midival/constants'

input.onControlChangeMessage(ControlChange.ModulationWheel, msg => {
    console.log(`Modulation wheel value: ${msg.value}`)
})
