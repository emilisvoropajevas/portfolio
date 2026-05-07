import { useEffect, useState } from "react";


const commands = {
    'help': () => "",
    'clear': () => [],
    'whoami': () => "Emilis Voropajevas",
    'ls': () => "skills.txt  education.txt  interests.txt",
}

const files = {
    'skills.txt': "Python  Javascript  SQL React",
    'education.txt': "BSc Theoretical Physics  MSc Computer Science"
}

export function Terminal() {
    const [outputText, setOutputText] = useState([]); /* Everything outputted to screen */
    const [commandHistory, setCommandHistory] = useState([]);
    const [commandHistoryIndex, setCommandHistoryIndex] = useState(-1);
    const [commandInput, setCommandInput] = useState("");

    useEffect(() => {
        const date = new Date();
        setOutputText([{type: 'output', text: `Last login: ${date.toDateString().split(' ').slice(0,3).join(' ')} ${date.toLocaleTimeString()} on ttys000`}]);

    },[]);

    /* helper function to handle input*/
    const processInput = (rawInput) => {

        const strippedInput = rawInput.trim().toLowerCase();
        const splitStrippedInput = strippedInput.split(' ');
        const commandLine = splitStrippedInput[0];
        const argument = splitStrippedInput[1];

        if (strippedInput === '') {
            return {type: "EMPTY"};
        }
        if (strippedInput === 'clear') {
            return {type: "CLEAR", clearTerminal: commands[strippedInput]()};
        }
        if (commandLine === 'cat') {
            if (!argument) {
                return {type: "NOARG"}
            }
            if (argument in files) {
                return {type: "READFILE", file: files[argument]};
            }
            return {type: "NOFILE", noFileMessage: `cat: ${argument}: No such file or directory`};
        }
        if (strippedInput in commands) {
            return {type: 'EXECUTE', executeCommand: commands[strippedInput]()};
        }
        return {type: 'CMDERROR', commandNotFound: `zsh: command not found ${rawInput}`};
    }


    const handleInput = (e) => {
        if (e.key === 'Enter') {
            const inputEntry = {type: 'input', text: commandInput};
            const result = processInput(commandInput);
            switch(result.type) {
                case 'EMPTY':
                    setOutputText(prev => [...prev, {type: 'input', text: ''}]);
                    break;
                case 'CLEAR':
                    setOutputText(result.clearTerminal);
                    setCommandHistory(prev => [...prev, commandInput]);
                    break;
                case 'NOARG':
                    setOutputText(prev => [...prev, inputEntry, {type: 'output', text: 'Filename not specified'}]);
                    setCommandHistory(prev => [...prev, commandInput]);
                    break;
                case 'READFILE':
                    setOutputText(prev => [...prev, inputEntry, {type: 'output', text: result.file}]);
                    setCommandHistory(prev => [...prev, commandInput]);
                    break;
                case 'NOFILE':
                    setOutputText(prev => [...prev, inputEntry, {type: 'output', text: result.noFileMessage}]);
                    setCommandHistory(prev => [...prev, commandInput]);
                    break;
                case 'EXECUTE':
                    setOutputText(prev => [...prev, inputEntry, {type: 'output', text: result.executeCommand}]);
                    setCommandHistory(prev => [...prev, commandInput]);
                    break;
                case 'CMDERROR':
                    setOutputText(prev => [...prev, inputEntry, {type: 'output', text: result.commandNotFound}]);
                    setCommandHistory(prev => [...prev, commandInput]);
                    break;
            }
            setCommandInput("");
            setCommandHistoryIndex(-1);
        }

        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length === 0) {
                return;
            }
            const newIndex = commandHistoryIndex === -1 ? commandHistory.length - 1 : Math.max(0, commandHistoryIndex -1);
            setCommandHistoryIndex(newIndex);
            setCommandInput(commandHistory[newIndex]);
        }

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (commandHistory.length === 0) {
                return;
            }
            if (commandHistoryIndex === -1) {
                return;
            }
            const isAtEnd = commandHistoryIndex + 1 >= commandHistory.length;
            const newIndex = isAtEnd ? -1 : commandHistoryIndex + 1;
            const newInput = newIndex === -1 ? "": commandHistory[newIndex];

            setCommandHistoryIndex(newIndex);
            setCommandInput(newInput);
        }
    }

    return (
        <div data-slot="card-content" className="px-3 p-4 bg-zinc-900 h-full overflow-y-auto">
            <div className="mb-3 flex items-center gap-2 ">
                <div className="h-3 w-3 rounded-full bg-red-500/70"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500/70"></div>
                <div className="h-3 w-3 rounded-full bg-green-500/70"></div>
                <span className="ml-2 font-mono text-xs text-muted-foreground text-zinc-400"> terminal</span>
            </div>
            <div>
                {outputText.map((entry, index) => (
                    <div key={index} className="font-mono text-white">{entry.type === 'input' ? `user@portfolio ~ % ${entry.text}`: entry.text}</div>
                ))}
                <div className="font-mono text-white">user@portfolio ~ %&nbsp;
                    <input value={commandInput} onChange={(e) => setCommandInput(e.target.value)} onKeyDown={handleInput} className="bg-transparent text-white outline-none border-none"></input> 
                </div>
            </div>
        </div>
    )
}

/* 
What is left? - This was very fun to make

when going past terminal cotainer -> stay on the last text

onclick of border -> refocus on terminal

blinker - tiny rectangle hovers over text i.e lastindex of inputvalue

help command -> introduction text -> pwd?

commandlist -> could adjust more stuff

terminal load animation - blink first line on, then blink second line

Idea for future: Allow users to write their own files using cat? 

Light mode and dark mode terminal?

adjust terminal for mobile view

*/
