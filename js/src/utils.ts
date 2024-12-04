import * as fs from 'fs';
import * as readline from 'readline';

export function readAllLines(filePath: string): string[] {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return fileContent.split('\n');
}

export async function* readLines(filePath: string): AsyncIterableIterator<string> {
    const fileStream = fs.createReadStream(filePath, { encoding: 'utf-8' });
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    for await (const line of rl) {
        yield line;
    }
}

export function insertInOrder(list: number[], number: number) {
  for (let i = 0; i < list.length; i++) {
    if (list[i] > number) {
      list.splice(i, 0, number);
      return;
    }
  }
  list.push(number);
}
