## How does Chok Glosses calculate practice strength
### 5 minute read

#### Formula based calculation
Our old <span class='blue'>pre0.1</span> used to use a custom equation which would take in these parameters:
- The card's previous strength
- Did the user ask for help
- How long did it take them
- Did they get it correct

Using these parameters, the system would model an exponential equation that adjusts the difficulty. This equation would reward or penalize the user depending on whether they got the card right or wrong respectively. The size of the reward or penalty would vary based on factors like how long they took to answer or whether they asked for help.

Here's a copy of the function: (for the archivers)
```js
function calculateStrength(
    prevStrength: number, // big significance
    help: boolean, // medium significance
    time: number, // small significance
    correct: boolean // big significance
) {
    const target = correct ? 1 : 0;
    let rate = 0.3;

    if (help) {
        rate *= 0.5;
    }

    const timeDecay = 1 / Math.pow(Math.E, time * 0.01);
    rate *= timeDecay;

    const newStrength = prevStrength + rate * (target - prevStrength);

    console.log(prevStrength, newStrength);
    return newStrength;
}
```

#### Spaced repetition
In <span class='blue'>pre0.2</span>, Chok Glosses implemented spaced repetition, allowing for more accurate measurements of card strength. 
Hence, the percentage from the previous method was retained, but it was repurposed.

With spaced repetition, the strength of a card was a part of 9 different discrete categories, each representing the days which the knowledge has been retained for:
- <span class='blue'>0%:</span> 0 days / incorrect attempt
- <span class='blue'>12.5%:</span> 1 day
- <span class='blue'>25%:</span> 2 days
- <span class='blue'>37.5%:</span> 4 days
- <span class='blue'>50%:</span> 8 days
- <span class='blue'>62.5%:</span> 16 days
- <span class='blue'>75%:</span> 32 days
- <span class='blue'>87.5%:</span> 64 days
- <span class='blue'>100%:</span> 128 days