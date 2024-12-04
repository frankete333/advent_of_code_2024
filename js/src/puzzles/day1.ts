import { readAllLines, insertInOrder } from '../utils';

const list1 = [];
const list2 = [];

export async function puzzle() {
  await load_lists();

  await puzzle_1();
  await puzzle_2();
}

async function load_lists() {
  const content = await readAllLines('./data/day1.txt');

  for (let line of content) {
    const [number1, number2] = line.split('   ');
    const num1 = parseInt(number1);
    const num2 = parseInt(number2);

    if (!Number.isNaN(num1) && !Number.isNaN(num2)) {
      insertInOrder(list1, num1);
      insertInOrder(list2, num2);
    }
  }
}

async function puzzle_1() {
  let count = 0;
  for (let i = 0; i < list1.length; i++) {
    const diff = Math.abs(list1[i] - list2[i]);
    count += diff;
  }

  console.log(`The answer is: ${count}`);
}

async function puzzle_2() {
  let subIndex = 0;
  let lastResult = 0;
  let result = 0;

  for (let i = 0; i < list1.length; i++) {
    let count = 0;
    const elem = list1[i];
    if (elem === list1[i - 1]) {
      result += lastResult;
      continue;
    }

    while (list2[subIndex] <= elem) {
      if (list2[subIndex] === elem) {
        count++;
      }

      subIndex++;
    }

    lastResult = count * elem;
    result += lastResult;
  }

  console.log(`The answer is: ${result}`);
}

