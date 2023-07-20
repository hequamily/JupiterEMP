import React, { useEffect } from 'react';

const MidiEventLogger = () => {
  useEffect(() => {
    // Check for browser support
    if (navigator.requestMIDIAccess) {
      // Request access to MIDI devices
      navigator.requestMIDIAccess()
        .then(onMIDISuccess, onMIDIFailure);
    } else {
      console.log('Web MIDI API is not supported in this browser.');
    }
  }, []);

  // Success callback for MIDI access
  const onMIDISuccess = (midiAccess) => {
    // Get the list of MIDI inputs
    const inputs = midiAccess.inputs;

    // Iterate through each MIDI input
    inputs.forEach(function(input) {
      // Listen for MIDI messages
      input.onmidimessage = onMIDIMessage;
    });
  };

  // Failure callback for MIDI access
  const onMIDIFailure = (error) => {
    console.log('Failed to access MIDI devices:', error);
  };

  // Handle MIDI messages
  const onMIDIMessage = (message) => {
    // Display MIDI event information
    console.log('MIDI Event:', message.data);
  };

  return <div>MIDI Event Logger</div>;
};

export default MidiEventLogger;
