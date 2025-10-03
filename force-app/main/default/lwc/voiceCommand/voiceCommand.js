import { LightningElement } from 'lwc';

export default class VoiceCommand extends LightningElement {
     transcript = '';

    startListening() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert('Speech Recognition not supported in this browser');
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US'; // aap "hi-IN" bhi use kar sakti ho Hindi ke liye
        recognition.interimResults = false;

        recognition.start();

        recognition.onresult = (event) => {
            this.transcript = event.results[0][0].transcript;
            console.log('User said:', this.transcript);

            let command = this.transcript.toLowerCase();

            if (command.includes('open account')) {
                window.open('/lightning/o/Account/home', '_self');
            } else if (command.includes('open contact')) {
                window.open('/lightning/o/Contact/home', '_self');
            } else if (command.includes('open opportunity')) {
                window.open('/lightning/o/Opportunity/home', '_self');
            } else {
                alert('Command not recognized: ' + this.transcript);
            }
        };
    }
}