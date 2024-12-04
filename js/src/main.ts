import * as readline from 'readline';

const puzzles = [
];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function clearTerminal() {
    process.stdout.write('\x1Bc');
}

function showMenu() {
    console.log('Welcome to the program!');
    puzzles.forEach((puzzle, index) => {
      console.log(`${index + 1}. Day ${index + 1}`);
    });
    console.log('q. Exit');
}

async function handleUserInput(input: string) {
    clearTerminal();
    if (input === 'q') {
        console.log('Exiting...');
        rl.close();
        return;
    } else if (Number(input) > 0 && Number(input) <= puzzles.length) {
        await puzzles[Number(input) - 1]();
        rl.question('Press enter to continue...', () => {
            clearTerminal();
            showMenu();
            promptUser();
        });
    } else {
        console.log('Invalid option, please try again.');
        showMenu();
        promptUser();
    }
}

function promptUser() {
    rl.question('Please select an option: ', handleUserInput);
}

function main() {
    clearTerminal();
    showMenu();
    promptUser();
}

main();
