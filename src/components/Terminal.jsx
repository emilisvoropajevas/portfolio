import { useEffect, useRef, useState } from "react";


const commands = {
    'commandslist': () => "welcome  clear  whoami  ls",
    'welcome': () => "Welcome to the terminal! Glad you were curious to try it out! :) hope you like it",
    'clear': () => [],
    'whoami': () => "Emilis Voropajevas",
    'ls': () => "funfact.txt  dream.txt",
}

const files = {
    'dream.txt': "My dream is to become a good engineer who can build anything :D",
    'funfact.txt': "My first feat of engineering was building a vending machine out of lego as a kid :)"
}

export function Terminal() {
    const [outputText, setOutputText] = useState([]);
    const [commandHistory, setCommandHistory] = useState([]);
    const [commandHistoryIndex, setCommandHistoryIndex] = useState(-1);
    const [commandInput, setCommandInput] = useState("");

    const commandRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        const date = new Date();
        setOutputText([{type: 'output', text: `Last login: ${date.toDateString().split(' ').slice(0,3).join(' ')} ${date.toLocaleTimeString()} on ttys000`}]);
    },[]);

    useEffect(() => {
        if (!commandRef.current) return;
        commandRef.current.scrollTop = commandRef.current.scrollHeight;
    },[outputText])

    const handleClick = () => {
        if (!inputRef.current) return;
        inputRef.current.focus();
    }

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
        <div ref={commandRef} data-slot="card-content" className="p-4 bg-zinc-900 h-full overflow-y-auto" onClick={handleClick}>
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
                <div className="font-mono text-white relative">
                    user@portfolio ~ %&nbsp;
                    <span>{commandInput}</span>
                    <span className="inline-block w-2 h-4 bg-white   animate-blink"></span>
                    <input ref={inputRef} value={commandInput} onChange={(e) => setCommandInput(e.target.value)} onKeyDown={handleInput} className="bg-transparent text-white absolute outline-none border-none opacity-0 w-0"></input> 
                </div>
            </div>
        </div>
    )
}